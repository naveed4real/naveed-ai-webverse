
import { useState, useRef } from 'react';
import { Link, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Real Estate Website",
      description: "A modern real estate platform with property listings, search functionality, and user authentication.",
      image: "/placeholder.svg",
      category: "web",
      technologies: ["React", "CSS", "Firebase"],
      demoUrl: "#",
      repoUrl: "#"
    },
    {
      id: 2,
      title: "Portfolio Design",
      description: "A sleek, responsive portfolio template for professionals.",
      image: "/placeholder.svg",
      category: "design",
      technologies: ["HTML", "CSS", "JavaScript"],
      demoUrl: "#",
      repoUrl: "#"
    },
    {
      id: 3,
      title: "AI Task Manager",
      description: "Task management app with AI-powered prioritization and scheduling.",
      image: "/placeholder.svg",
      category: "ai",
      technologies: ["React", "Node.js", "AI API"],
      demoUrl: "#",
      repoUrl: "#"
    }
  ];

  const categories = ['all', 'web', 'design', 'ai'];
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" ref={sectionRef} className="section-padding bg-portfolio-dark">
      <div className="container mx-auto">
        <h2 className="section-title">My Projects</h2>
        
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-portfolio-accent text-white' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="glass-card overflow-hidden group"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-portfolio-dark/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-4">
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-portfolio-dark hover:bg-portfolio-accent hover:text-white transition-colors duration-300"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a 
                        href={project.repoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-portfolio-dark hover:bg-portfolio-accent hover:text-white transition-colors duration-300"
                      >
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="text-xs px-2 py-1 rounded-md bg-white/5 text-portfolio-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
