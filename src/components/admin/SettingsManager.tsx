
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

interface SiteSetting {
  id: string;
  key: string;
  value: any;
  description: string;
}

const SettingsManager = () => {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;

      const settingsMap = (data || []).reduce((acc, setting) => {
        acc[setting.key] = typeof setting.value === 'string' ? JSON.parse(setting.value) : setting.value;
        return acc;
      }, {} as Record<string, any>);

      setSettings(settingsMap);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value: JSON.stringify(value),
        updated_at: new Date().toISOString()
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('site_settings')
          .upsert(update, { onConflict: 'key' });

        if (error) throw error;
      }

      toast({ title: "Success", description: "Settings saved successfully" });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (loading) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site Settings</CardTitle>
          <CardDescription>Manage your website's global settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* General Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-4">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="site_title">Site Title</Label>
                <Input
                  id="site_title"
                  value={settings.site_title || ''}
                  onChange={(e) => updateSetting('site_title', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={settings.contact_email || ''}
                  onChange={(e) => updateSetting('contact_email', e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="site_description">Site Description</Label>
              <Textarea
                id="site_description"
                value={settings.site_description || ''}
                onChange={(e) => updateSetting('site_description', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Hero Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hero_title">Hero Title</Label>
                <Input
                  id="hero_title"
                  value={settings.hero_title || ''}
                  onChange={(e) => updateSetting('hero_title', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
                <Input
                  id="hero_subtitle"
                  value={settings.hero_subtitle || ''}
                  onChange={(e) => updateSetting('hero_subtitle', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="social_github">GitHub URL</Label>
                <Input
                  id="social_github"
                  value={settings.social_github || ''}
                  onChange={(e) => updateSetting('social_github', e.target.value)}
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <Label htmlFor="social_linkedin">LinkedIn URL</Label>
                <Input
                  id="social_linkedin"
                  value={settings.social_linkedin || ''}
                  onChange={(e) => updateSetting('social_linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <Label htmlFor="social_twitter">Twitter URL</Label>
                <Input
                  id="social_twitter"
                  value={settings.social_twitter || ''}
                  onChange={(e) => updateSetting('social_twitter', e.target.value)}
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
          </div>

          <Button onClick={handleSave} disabled={saving} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsManager;
