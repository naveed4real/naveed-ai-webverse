
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
import { Plus, Edit, Trash2, Layout, Code, Brain, Smartphone } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
  created_at: string;
}

interface ServicesManagerProps {
  onUpdate: () => void;
}

const ServicesManager = ({ onUpdate }: ServicesManagerProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    featured: false
  });

  const iconOptions = [
    { value: 'Layout', label: 'Layout', icon: Layout },
    { value: 'Code', label: 'Code', icon: Code },
    { value: 'Brain', label: 'Brain', icon: Brain },
    { value: 'Smartphone', label: 'Smartphone', icon: Smartphone }
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: "Failed to fetch services",
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
      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(formData)
          .eq('id', editingService.id);

        if (error) throw error;
        toast({ title: "Success", description: "Service updated successfully" });
      } else {
        const { error } = await supabase
          .from('services')
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Success", description: "Service created successfully" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchServices();
      onUpdate();
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: "Error",
        description: "Failed to save service",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description || '',
      icon: service.icon || '',
      featured: service.featured
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Service deleted successfully" });
      fetchServices();
      onUpdate();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: '',
      featured: false
    });
    setEditingService(null);
  };

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(option => option.value === iconName);
    if (iconOption) {
      const IconComponent = iconOption.icon;
      return <IconComponent className="w-6 h-6" />;
    }
    return <Layout className="w-6 h-6" />;
  };

  if (loading && services.length === 0) {
    return <div>Loading services...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Services Management</CardTitle>
            <CardDescription>Manage your service offerings</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </DialogTitle>
                <DialogDescription>
                  Fill in the service details below
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Service Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="icon">Icon</Label>
                  <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.icon className="w-4 h-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <Label htmlFor="featured">Featured Service</Label>
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : (editingService ? 'Update' : 'Create')}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {services.map((service) => (
            <div key={service.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-portfolio-accent">
                    {getIconComponent(service.icon)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    <div className="mt-2">
                      <Badge variant={service.featured ? "default" : "outline"}>
                        {service.featured ? "Featured" : "Regular"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(service)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(service.id)}>
                    <Trash2 className="w-4 h-4" />
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

export default ServicesManager;
