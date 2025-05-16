
import { useEffect, useRef, useState } from 'react';
import { FileText } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      // Only set visible once and never back to false
      if (entries[0].isIntersecting && !isVisible) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]); // Include isVisible in the dependency array

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-portfolio-dark relative overflow-hidden">
      {/* Modern decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px]"></div>
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDMwaC02di02aDZ2NnptMCAxMmgtNnYtNmg2djZ6bTEyLTEyaC02di02aDZ2NnptMCAxMmgtNnYtNmg2djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="transition-all duration-700 transform opacity-100 translate-y-0">
          <h2 className="section-title">About Me</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
              <Card className="h-full w-full overflow-hidden rounded-xl border-0 bg-transparent">
                <CardContent className="p-0">
                  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur-sm shadow-xl transition-all duration-500 hover:border-portfolio-accent/50 hover:shadow-portfolio-accent/10">
                    <AspectRatio ratio={1} className="w-full">
                      <img 
                        src="/lovable-uploads/17e68f15-7635-4b43-8bf9-f93b30a0501e.png"
                        alt="Profile Photo"
                        className="object-contain w-full h-full"
                      />
                    </AspectRatio>
                    
                    {/* Decorative overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50"></div>
                    <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-portfolio-accent/20 rounded-full blur-2xl"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-portfolio-accent/5 mix-blend-overlay"></div>
                    
                    {/* Corner accent */}
                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-portfolio-accent/30 backdrop-blur-md"></div>
                    <div className="absolute top-0 left-0 w-full h-full border border-white/10 rounded-xl"></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                I'm a <span className="relative">
                  <span className="text-portfolio-accent">Computer Science</span>
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-portfolio-accent to-transparent"></span>
                </span> student
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed backdrop-blur-sm bg-black/5 p-5 rounded-lg border border-white/5">
                I'm a Computer Science student at Air University Aerospace & Aviation Campus, passionate about building websites and apps powered by AI. I constantly explore emerging tools like Cursor, Trae, and other AI-enhanced platforms to craft responsive, innovative digital experiences.
              </p>
              
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-3 flex items-center">
                  <FileText className="mr-2 text-portfolio-accent" size={20} />
                  Education
                </h4>
                <div className="glass-card p-5 backdrop-blur-md relative overflow-hidden group hover:border-portfolio-accent/30 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-portfolio-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative z-10">
                    <p className="font-medium">Bachelors of Computer Science</p>
                    <p className="text-gray-400">Air University, Aerospace & Aviation Campus</p>
                    <p className="text-portfolio-accent mt-2">(Currently in 6th semester)</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/resume.pdf" 
                  className="px-6 py-3 bg-portfolio-accent hover:bg-portfolio-accent/80 text-white rounded-md transition-all duration-300 shadow-lg shadow-portfolio-accent/20"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download CV
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-3 border border-white/10 hover:border-white/30 text-white rounded-md transition-all duration-300 backdrop-blur-sm bg-white/5 hover:bg-white/10"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
