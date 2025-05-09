
import { useEffect, useRef } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const animatedElements = useRef<NodeListOf<Element> | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    animatedElements.current = sectionRef.current.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    animatedElements.current.forEach(el => {
      observer.observe(el);
    });

    return () => {
      if (animatedElements.current) {
        animatedElements.current.forEach(el => {
          observer.unobserve(el);
        });
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-portfolio-dark">
      <div className="container mx-auto">
        <h2 className="section-title animate-on-scroll opacity-0">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          <div className="animate-on-scroll opacity-0" style={{ transitionDelay: '200ms' }}>
            <div className="h-full w-full overflow-hidden rounded-xl relative">
              <div className="aspect-square bg-gray-800 rounded-xl relative overflow-hidden">
                {/* Placeholder for profile picture */}
                <div className="absolute inset-0 flex items-center justify-center bg-portfolio-dark/50">
                  <span className="text-lg text-gray-400">Profile Photo</span>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-full h-full bg-portfolio-accent/10 mix-blend-overlay"></div>
                <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-portfolio-accent/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>

          <div className="animate-on-scroll opacity-0" style={{ transitionDelay: '400ms' }}>
            <h3 className="text-2xl font-bold mb-4">
              I'm a <span className="text-portfolio-accent">Computer Science</span> student
            </h3>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              I'm a Computer Science student at Air University Aerospace & Aviation Campus, passionate about building websites and apps powered by AI. I constantly explore emerging tools like Cursor, Trae, and other AI-enhanced platforms to craft responsive, innovative digital experiences.
            </p>
            
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-3">Education</h4>
              <div className="glass-card p-5">
                <p className="font-medium">Bachelors of Computer Science</p>
                <p className="text-gray-400">Air University, Aerospace & Aviation Campus</p>
                <p className="text-portfolio-accent mt-2">(Currently in 6th semester)</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="/resume.pdf" 
                className="px-6 py-3 bg-portfolio-accent hover:bg-portfolio-accent/80 text-white rounded-md transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 border border-white/20 hover:border-white text-white rounded-md transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
