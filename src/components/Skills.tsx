import { useEffect, useRef, useState } from 'react';
import { Code, Layout, Brain } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Skill {
  id: string;
  name: string;
  proficiency: number;
  category: string;
}

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillBarsRef = useRef<NodeListOf<Element> | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true });

      if (error) {
        console.error('Error fetching skills:', error);
        return;
      }

      setSkills(data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    
    skillBarsRef.current = sectionRef.current.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          const progressBars = entry.target.querySelectorAll('.skill-progress');
          progressBars.forEach((bar, index) => {
            const htmlBar = bar as HTMLElement;
            const width = htmlBar.dataset.width || '0';
            setTimeout(() => {
              htmlBar.style.width = `${width}%`;
            }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    observer.observe(sectionRef.current);
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [skills]);

  return (
    <section id="skills" ref={sectionRef} className="section-padding bg-portfolio-dark/50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-portfolio-accent/5 blur-[100px]"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px]"></div>
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-portfolio-dark via-portfolio-dark to-black/80"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTUgMTVoMTVNMTUgMTV2MTVNMTUgMTVIME0xNSAxNVYwIiBzdHJva2U9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-10"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title">My Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Code className="mr-2 text-portfolio-accent" size={24} />
                Technical Skills
              </h3>
              <div className="space-y-6 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10">
                {skills.map((skill, index) => (
                  <div key={skill.id} className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-portfolio-accent">{skill.proficiency}%</span>
                    </div>
                    <div className="skill-bar bg-white/10 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="skill-progress h-full bg-gradient-to-r from-portfolio-accent to-portfolio-accent/70 rounded-full" 
                        data-width={skill.proficiency} 
                        style={{ width: "0%" }}
                      >
                        <div className="absolute right-0 top-0 h-full w-1 bg-white/30 blur-[2px]"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Brain className="mr-2 text-portfolio-accent" size={24} />
                What I Do
              </h3>
              <div className="space-y-6">
                <div className="glass-card p-5 transition-all duration-500 hover:transform hover:-translate-y-2 border border-white/10 hover:border-portfolio-accent/30 backdrop-blur-md relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-portfolio-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative z-10">
                    <h4 className="text-xl font-semibold mb-2 flex items-center">
                      <Layout className="mr-2 text-portfolio-accent" size={18} />
                      Web Development
                    </h4>
                    <p className="text-gray-300">Building responsive and visually appealing websites using modern technologies.</p>
                  </div>
                </div>
                
                <div className="glass-card p-5 transition-all duration-500 hover:transform hover:-translate-y-2 border border-white/10 hover:border-portfolio-accent/30 backdrop-blur-md relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-portfolio-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative z-10">
                    <h4 className="text-xl font-semibold mb-2 flex items-center">
                      <Brain className="mr-2 text-portfolio-accent" size={18} />
                      AI-Enhanced Design
                    </h4>
                    <p className="text-gray-300">Leveraging AI tools to create cutting-edge user interfaces and experiences.</p>
                  </div>
                </div>
                
                <div className="glass-card p-5 transition-all duration-500 hover:transform hover:-translate-y-2 border border-white/10 hover:border-portfolio-accent/30 backdrop-blur-md relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-portfolio-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative z-10">
                    <h4 className="text-xl font-semibold mb-2 flex items-center">
                      <Code className="mr-2 text-portfolio-accent" size={18} />
                      Backend Development
                    </h4>
                    <p className="text-gray-300">Creating robust server-side applications and APIs using Python and other technologies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
