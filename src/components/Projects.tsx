
import { useState, useRef, useEffect } from 'react';
import { Link, ExternalLink, Github, Folder } from 'lucide-react';

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
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(sectionRef.current);
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-padding bg-portfolio-dark relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-portfolio-accent/5 blur-[100px]"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-500/5 blur-[120px]"></div>
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-portfolio-dark via-portfolio-dark/90 to-portfolio-dark/70"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aC0yNHYtOGgyNHY4em0wLTE2aC04djhoOHYtOHptMTYgMTZoLTh2LThoOHY4eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title flex items-center">
            <Folder className="mr-2 text-portfolio-accent" size={24} />
            My Projects
          </h2>
          
          <div className="flex flex-wrap gap-3 justify-center mb-12 mt-10">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-5 py-2 rounded-full transition-all duration-500 ${
                  activeCategory === category 
                    ? 'bg-portfolio-accent text-white shadow-lg shadow-portfolio-accent/20' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`glass-card overflow-hidden group transition-all duration-700 transform ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-portfolio-dark/90 opacity-80"></div>
                  <div className="absolute inset-0 bg-portfolio-dark/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-4">
                      {project.demoUrl && (
                        <a 
                          href={project.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-portfolio-dark hover:bg-portfolio-accent hover:text-white transition-colors duration-300"
                          aria-label={`View ${project.title} demo`}
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
                          aria-label={`View ${project.title} source code`}
                        >
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-5 border-t border-white/5">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-portfolio-accent transition-colors duration-300">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 rounded-md bg-white/5 text-portfolio-accent border border-portfolio-accent/20"
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
      </div>
    </section>
  );
};

export default Projects;
