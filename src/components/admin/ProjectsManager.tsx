import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, ExternalLink, Github, Linkedin } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  demo_url: string;
  repo_url: string;
  linkedin_url: string;
  technologies: string[];
  category: string;
  featured: boolean;
  status: string;
  created_at: string;
}

interface ProjectsManagerProps {
  onUpdate: () => void;
}

const ProjectsManager = ({ onUpdate }: ProjectsManagerProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    demo_url: '',
    repo_url: '',
    linkedin_url: '',
    technologies: '',
    category: '',
    featured: false,
    status: 'active'
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to fetch projects",
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
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim())
      };

      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);

        if (error) throw error;
        toast({ title: "Success", description: "Project updated successfully" });
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);

        if (error) throw error;
        toast({ title: "Success", description: "Project created successfully" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchProjects();
      onUpdate();
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description || '',
      image_url: project.image_url || '',
      demo_url: project.demo_url || '',
      repo_url: project.repo_url || '',
      linkedin_url: project.linkedin_url || '',
      technologies: project.technologies.join(', '),
      category: project.category || '',
      featured: project.featured,
      status: project.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Project deleted successfully" });
      fetchProjects();
      onUpdate();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      demo_url: '',
      repo_url: '',
      linkedin_url: '',
      technologies: '',
      category: '',
      featured: false,
      status: 'active'
    });
    setEditingProject(null);
  };

  if (loading && projects.length === 0) {
    return <div className="text-white">Loading projects...</div>;
  }

  return (
    <Card className="bg-portfolio-dark border-white/10">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-white">Projects Management</CardTitle>
            <CardDescription className="text-gray-300">Manage your portfolio projects</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-portfolio-accent hover:bg-portfolio-accent/80">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-portfolio-dark border-white/10">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  Fill in the project details below
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-white">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="bg-portfolio-dark border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-white">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger className="bg-portfolio-dark border-white/20 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-portfolio-dark border-white/20">
                        <SelectItem value="web">Web</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="ai">AI</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="bg-portfolio-dark border-white/20 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="demo_url" className="text-white">Demo URL</Label>
                    <Input
                      id="demo_url"
                      value={formData.demo_url}
                      onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                      className="bg-portfolio-dark border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="repo_url" className="text-white">Repository URL</Label>
                    <Input
                      id="repo_url"
                      value={formData.repo_url}
                      onChange={(e) => setFormData({ ...formData, repo_url: e.target.value })}
                      className="bg-portfolio-dark border-white/20 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="linkedin_url" className="text-white">LinkedIn Profile URL</Label>
                  <Input
                    id="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="bg-portfolio-dark border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="image_url" className="text-white">Image URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="bg-portfolio-dark border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="technologies" className="text-white">Technologies (comma-separated)</Label>
                  <Input
                    id="technologies"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="React, TypeScript, Node.js"
                    className="bg-portfolio-dark border-white/20 text-white"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="accent-portfolio-accent"
                  />
                  <Label htmlFor="featured" className="text-white">Featured Project</Label>
                </div>
                <Button type="submit" disabled={loading} className="bg-portfolio-accent hover:bg-portfolio-accent/80">
                  {loading ? 'Saving...' : (editingProject ? 'Update' : 'Create')}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="border border-white/10 rounded-lg p-4 space-y-2 bg-portfolio-dark">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-gray-300">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-portfolio-accent/20 text-portfolio-accent border-portfolio-accent/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={project.featured ? "default" : "outline"} className={project.featured ? "bg-portfolio-accent text-white" : "border-white/20 text-white"}>
                      {project.featured ? "Featured" : "Regular"}
                    </Badge>
                    <Badge variant="outline" className="border-white/20 text-white">{project.category}</Badge>
                    <Badge variant="outline" className="border-white/20 text-white">{project.status}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  {project.demo_url && (
                    <Button size="sm" variant="outline" asChild className="border-portfolio-accent/50 text-portfolio-accent hover:bg-portfolio-accent/10 hover:border-portfolio-accent">
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer" title="View Demo">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.repo_url && (
                    <Button size="sm" variant="outline" asChild className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-500">
                      <a href={project.repo_url} target="_blank" rel="noopener noreferrer" title="View Repository">
                        <Github className="w-4 h-4 mr-1" />
                        Repo
                      </a>
                    </Button>
                  )}
                  {project.linkedin_url && (
                    <Button size="sm" variant="outline" asChild className="border-blue-600/50 text-blue-500 hover:bg-blue-600/10 hover:border-blue-600">
                      <a href={project.linkedin_url} target="_blank" rel="noopener noreferrer" title="View LinkedIn">
                        <Linkedin className="w-4 h-4 mr-1" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => handleEdit(project)} className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500" title="Edit Project">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)} className="bg-red-600 hover:bg-red-700 text-white" title="Delete Project">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsManager;
