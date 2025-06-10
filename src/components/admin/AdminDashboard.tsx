
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';
import ProjectsManager from './ProjectsManager';
import SkillsManager from './SkillsManager';
import ServicesManager from './ServicesManager';
import ContactManager from './ContactManager';
import SettingsManager from './SettingsManager';
import { LogOut, BarChart3, FolderOpen, Code, Briefcase, Mail, Settings } from 'lucide-react';

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    services: 0,
    messages: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
    fetchStats();
  }, [user]);

  const checkAdminStatus = async () => {
    try {
      // First check if profile exists, if not create it
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create it with admin role
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{
            id: user.id,
            email: user.email,
            full_name: user.email,
            role: 'admin'
          }]);

        if (insertError) {
          console.error('Error creating admin profile:', insertError);
          toast({
            title: "Error",
            description: "Failed to create admin profile. Please contact support.",
            variant: "destructive"
          });
          return;
        }
        setIsAdmin(true);
      } else if (profileError) {
        console.error('Error checking admin status:', profileError);
        toast({
          title: "Error",
          description: "Failed to verify admin status.",
          variant: "destructive"
        });
        return;
      } else {
        setIsAdmin(profile?.role === 'admin');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const [projectsCount, skillsCount, servicesCount, messagesCount] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact' }),
        supabase.from('skills').select('id', { count: 'exact' }),
        supabase.from('services').select('id', { count: 'exact' }),
        supabase.from('contact_messages').select('id', { count: 'exact' })
      ]);

      setStats({
        projects: projectsCount.count || 0,
        skills: skillsCount.count || 0,
        services: servicesCount.count || 0,
        messages: messagesCount.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-portfolio-dark">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-portfolio-dark">
        <Card className="w-full max-w-md bg-portfolio-dark border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Access Denied</CardTitle>
            <CardDescription className="text-gray-300">You don't have admin privileges.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleSignOut} className="w-full bg-portfolio-accent hover:bg-portfolio-accent/80">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-portfolio-dark text-white">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            <span className="text-portfolio-accent">A</span>dmin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">Welcome, {user.email}</span>
            <Button onClick={handleSignOut} variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-portfolio-dark border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-portfolio-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.projects}</div>
            </CardContent>
          </Card>
          <Card className="bg-portfolio-dark border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Skills</CardTitle>
              <Code className="h-4 w-4 text-portfolio-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.skills}</div>
            </CardContent>
          </Card>
          <Card className="bg-portfolio-dark border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Services</CardTitle>
              <Briefcase className="h-4 w-4 text-portfolio-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.services}</div>
            </CardContent>
          </Card>
          <Card className="bg-portfolio-dark border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Messages</CardTitle>
              <Mail className="h-4 w-4 text-portfolio-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.messages}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="projects" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5 bg-portfolio-dark border border-white/10">
            <TabsTrigger value="projects" className="text-white data-[state=active]:bg-portfolio-accent data-[state=active]:text-white">Projects</TabsTrigger>
            <TabsTrigger value="skills" className="text-white data-[state=active]:bg-portfolio-accent data-[state=active]:text-white">Skills</TabsTrigger>
            <TabsTrigger value="services" className="text-white data-[state=active]:bg-portfolio-accent data-[state=active]:text-white">Services</TabsTrigger>
            <TabsTrigger value="messages" className="text-white data-[state=active]:bg-portfolio-accent data-[state=active]:text-white">Messages</TabsTrigger>
            <TabsTrigger value="settings" className="text-white data-[state=active]:bg-portfolio-accent data-[state=active]:text-white">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <ProjectsManager onUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsManager onUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManager onUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="messages">
            <ContactManager onUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
