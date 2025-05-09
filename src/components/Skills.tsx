
import { useEffect, useRef } from 'react';

interface Skill {
  name: string;
  proficiency: number;
  category: string;
}

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillBarsRef = useRef<NodeListOf<Element> | null>(null);

  const skills: Skill[] = [
    { name: "HTML", proficiency: 90, category: "Frontend" },
    { name: "CSS", proficiency: 85, category: "Frontend" },
    { name: "JavaScript", proficiency: 80, category: "Frontend" },
    { name: "React", proficiency: 75, category: "Frontend" },
    { name: "UI/UX Design", proficiency: 70, category: "Design" },
    { name: "AI Tools (Cursor, Trae)", proficiency: 85, category: "AI" },
    { name: "VS Code", proficiency: 90, category: "Tools" },
    { name: "Responsive Design", proficiency: 85, category: "Frontend" }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    
    skillBarsRef.current = sectionRef.current.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll('.skill-progress');
          progressBars.forEach((bar) => {
            const htmlBar = bar as HTMLElement;
            const width = htmlBar.dataset.width || '0';
            htmlBar.style.width = `${width}%`;
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
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-padding bg-portfolio-dark/50">
      <div className="container mx-auto">
        <h2 className="section-title">My Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-portfolio-accent">{skill.proficiency}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      data-width={skill.proficiency} 
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">What I Do</h3>
            <div className="space-y-6">
              <div className="glass-card p-5 transition-transform hover:translate-y-[-5px] duration-300">
                <h4 className="text-xl font-semibold mb-2">Web Development</h4>
                <p className="text-gray-300">Building responsive and visually appealing websites using modern technologies.</p>
              </div>
              
              <div className="glass-card p-5 transition-transform hover:translate-y-[-5px] duration-300">
                <h4 className="text-xl font-semibold mb-2">AI-Enhanced Design</h4>
                <p className="text-gray-300">Leveraging AI tools to create cutting-edge user interfaces and experiences.</p>
              </div>
              
              <div className="glass-card p-5 transition-transform hover:translate-y-[-5px] duration-300">
                <h4 className="text-xl font-semibold mb-2">Responsive Design</h4>
                <p className="text-gray-300">Creating websites that look great on all devices, from mobile to desktop.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
