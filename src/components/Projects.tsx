
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Github, ExternalLink, Linkedin } from 'lucide-react';

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
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

  if (loading) {
    return (
      <section id="projects" className="section-padding bg-portfolio-dark">
        <div className="container mx-auto">
          <h2 className="section-title text-white">My <span className="text-portfolio-accent">Projects</span></h2>
          <div className="text-white">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding bg-portfolio-dark">
      <div className="container mx-auto">
        <h2 className="section-title text-white">My <span className="text-portfolio-accent">Projects</span></h2>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 capitalize ${
                activeFilter === category
                  ? 'bg-portfolio-accent text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="glass-card p-6 hover:transform hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={project.image_url || '/placeholder.svg'}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-portfolio-dark bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-portfolio-accent rounded-full hover:scale-110 transition-transform"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  )}
                  {project.repo_url && (
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-portfolio-accent rounded-full hover:scale-110 transition-transform"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                  )}
                  {project.linkedin_url && (
                    <a
                      href={project.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-portfolio-accent rounded-full hover:scale-110 transition-transform"
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                  )}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
              <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-portfolio-accent bg-opacity-20 text-portfolio-accent rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
