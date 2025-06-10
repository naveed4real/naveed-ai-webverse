
-- Create admin roles enum
CREATE TYPE public.user_role AS ENUM ('admin', 'user');

-- Create profiles table with roles
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role user_role DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create projects table for portfolio management
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  demo_url TEXT,
  repo_url TEXT,
  technologies TEXT[],
  category TEXT,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE public.skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  replied BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site settings table
CREATE TABLE public.site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.is_admin());

-- RLS Policies for projects (public read, admin write)
CREATE POLICY "Anyone can view projects" ON public.projects
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage projects" ON public.projects
  FOR ALL USING (public.is_admin());

-- RLS Policies for skills (public read, admin write)
CREATE POLICY "Anyone can view skills" ON public.skills
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage skills" ON public.skills
  FOR ALL USING (public.is_admin());

-- RLS Policies for services (public read, admin write)
CREATE POLICY "Anyone can view services" ON public.services
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL USING (public.is_admin());

-- RLS Policies for contact messages (admin only)
CREATE POLICY "Admins can manage contact messages" ON public.contact_messages
  FOR ALL USING (public.is_admin());

-- RLS Policies for site settings (public read, admin write)
CREATE POLICY "Anyone can view site settings" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage site settings" ON public.site_settings
  FOR ALL USING (public.is_admin());

-- Create trigger function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'user'
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default skills data
INSERT INTO public.skills (name, proficiency, category) VALUES
  ('HTML', 90, 'Frontend'),
  ('CSS', 85, 'Frontend'),
  ('JavaScript', 80, 'Frontend'),
  ('React', 75, 'Frontend'),
  ('UI/UX Design', 60, 'Design'),
  ('Python', 82, 'Backend'),
  ('TypeScript', 78, 'Frontend'),
  ('Responsive Design', 85, 'Frontend');

-- Insert default services data
INSERT INTO public.services (title, description, icon, featured) VALUES
  ('Web Design', 'Creating responsive and visually dynamic websites with a modern aesthetic and performance-first approach using the latest tools and technologies.', 'Layout', true),
  ('Web Development', 'Building functional, robust web applications with clean code and modern frameworks that perform well across all devices and browsers.', 'Code', true),
  ('AI Integration', 'Leveraging the latest AI tools and technologies to enhance web applications with smart features, automation, and personalized user experiences.', 'Brain', true),
  ('Responsive Design', 'Ensuring websites look and function flawlessly across all devices from smartphones to desktops with fluid layouts and adaptive components.', 'Smartphone', true);

-- Insert default projects data
INSERT INTO public.projects (title, description, image_url, demo_url, repo_url, technologies, category, featured) VALUES
  ('Real Estate Website', 'A modern real estate platform with property listings, search functionality, and user authentication.', '/placeholder.svg', '#', '#', ARRAY['React', 'CSS', 'Firebase'], 'web', true),
  ('Portfolio Design', 'A sleek, responsive portfolio template for professionals.', '/placeholder.svg', '#', '#', ARRAY['HTML', 'CSS', 'JavaScript'], 'design', true),
  ('AI Task Manager', 'Task management app with AI-powered prioritization and scheduling.', '/placeholder.svg', '#', '#', ARRAY['React', 'Node.js', 'AI API'], 'ai', true);

-- Insert default site settings
INSERT INTO public.site_settings (key, value, description) VALUES
  ('site_title', '"Portfolio"', 'Main site title'),
  ('site_description', '"Personal portfolio website"', 'Site description for SEO'),
  ('hero_title', '"Hi, I am John Doe"', 'Hero section title'),
  ('hero_subtitle', '"Full Stack Developer"', 'Hero section subtitle'),
  ('contact_email', '"contact@example.com"', 'Contact email address'),
  ('social_github', '"https://github.com"', 'GitHub profile URL'),
  ('social_linkedin', '"https://linkedin.com"', 'LinkedIn profile URL'),
  ('social_twitter', '"https://twitter.com"', 'Twitter profile URL');
