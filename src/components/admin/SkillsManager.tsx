
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  proficiency: number;
  category: string;
  created_at: string;
}

interface SkillsManagerProps {
  onUpdate: () => void;
}

const SkillsManager = ({ onUpdate }: SkillsManagerProps) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    proficiency: 50,
    category: ''
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast({
        title: "Error",
        description: "Failed to fetch skills",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingSkill) {
        const { error } = await supabase
          .from('skills')
          .update(formData)
          .eq('id', editingSkill.id);

        if (error) throw error;
        toast({ title: "Success", description: "Skill updated successfully" });
      } else {
        const { error } = await supabase
          .from('skills')
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Success", description: "Skill created successfully" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchSkills();
      onUpdate();
    } catch (error) {
      console.error('Error saving skill:', error);
      toast({
        title: "Error",
        description: "Failed to save skill",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      proficiency: skill.proficiency,
      category: skill.category || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Skill deleted successfully" });
      fetchSkills();
      onUpdate();
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      proficiency: 50,
      category: ''
    });
    setEditingSkill(null);
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  if (loading && skills.length === 0) {
    return <div>Loading skills...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Skills Management</CardTitle>
            <CardDescription>Manage your technical skills and proficiency levels</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                </DialogTitle>
                <DialogDescription>
                  Fill in the skill details below
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Skill Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="AI">AI</SelectItem>
                      <SelectItem value="Database">Database</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="proficiency">Proficiency: {formData.proficiency}%</Label>
                  <Input
                    id="proficiency"
                    type="range"
                    min="0"
                    max="100"
                    value={formData.proficiency}
                    onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                    className="mt-2"
                  />
                  <Progress value={formData.proficiency} className="mt-2" />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : (editingSkill ? 'Update' : 'Create')}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-3">{category}</h3>
              <div className="grid gap-3">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(skill)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(skill.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={skill.proficiency} className="flex-1" />
                      <span className="text-sm font-medium">{skill.proficiency}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsManager;
