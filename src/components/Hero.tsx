
import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="min-h-screen relative flex flex-col items-center justify-center pt-20 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-portfolio-dark opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-portfolio-dark"></div>
      </div>

      <div className="container mx-auto z-10 flex flex-col items-center text-center">
        <div 
          className={`mb-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="inline-block py-1 px-3 border border-portfolio-accent text-portfolio-accent text-sm mb-6">
            Hello, I am
          </span>
        </div>

        <h1 
          className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Naveed Ahmed
        </h1>

        <h2 
          className={`text-xl md:text-2xl text-gray-300 mb-8 transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Web Designer & Developer
        </h2>

        <p 
          className={`max-w-xl text-gray-400 mb-10 transition-all duration-1000 delay-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Crafting Smart Web Solutions with AI-Enhanced Design
        </p>

        <div 
          className={`flex flex-wrap gap-4 justify-center transition-all duration-1000 delay-900 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <a 
            href="#contact" 
            className="px-6 py-3 bg-portfolio-accent hover:bg-portfolio-accent/80 text-white rounded-md transition-all duration-300"
          >
            Get In Touch
          </a>
          <a 
            href="#projects" 
            className="px-6 py-3 border border-white/20 hover:border-white text-white rounded-md transition-all duration-300"
          >
            View Projects
          </a>
        </div>
      </div>

      <a 
        href="#about"
        className={`absolute bottom-10 animate-bounce transition-all duration-1000 delay-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        aria-label="Scroll down"
      >
        <ArrowDown className="text-white/70 hover:text-white transition-colors duration-300" />
      </a>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-portfolio-accent/20 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-portfolio-accent/10 blur-3xl"></div>
    </section>
  );
};

export default Hero;
