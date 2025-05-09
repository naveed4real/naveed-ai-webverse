
import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="min-h-screen relative flex flex-col items-center justify-center pt-20 px-4 md:px-8 overflow-hidden">
      {/* Modern background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-portfolio-dark via-[#1a1a2e] to-portfolio-dark opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz48L3N2Zz4=')]"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-portfolio-accent/5 blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-blue-500/5 blur-[120px]"></div>

      <div className="container mx-auto z-10 flex flex-col items-center text-center relative">
        {/* Animated introduction label */}
        <div 
          className={`mb-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="inline-block py-1.5 px-4 rounded-full border border-portfolio-accent/30 text-portfolio-accent text-sm mb-6 backdrop-blur-sm bg-black/20">
            Hello, I am
          </span>
        </div>

        {/* Modern name display with gradient */}
        <h1 
          className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">Naveed Ahmed</span>
        </h1>

        {/* Role with modern styling */}
        <h2 
          className={`text-xl md:text-2xl text-gray-300 mb-8 transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="relative">
            Web Designer & Developer
            <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-portfolio-accent to-transparent"></span>
          </span>
        </h2>

        {/* Tagline with better styling */}
        <p 
          className={`max-w-xl text-gray-400 mb-10 transition-all duration-1000 delay-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Crafting Smart Web Solutions with AI-Enhanced Design
        </p>

        {/* Modern call-to-action buttons */}
        <div 
          className={`flex flex-wrap gap-4 justify-center transition-all duration-1000 delay-900 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <a 
            href="#contact" 
            className="px-6 py-3 bg-portfolio-accent hover:bg-portfolio-accent/90 text-white rounded-md transition-all duration-300 shadow-lg shadow-portfolio-accent/20 flex items-center gap-2"
          >
            Get In Touch
            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse"></span>
          </a>
          <a 
            href="#projects" 
            className="px-6 py-3 border border-white/10 hover:border-white/30 text-white rounded-md transition-all duration-300 backdrop-blur-sm bg-white/5 hover:bg-white/10"
          >
            View Projects
          </a>
        </div>

        {/* Tech pattern decoration */}
        <div className="absolute -bottom-10 left-0 right-0 h-20 opacity-20">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTYgdi02aDZ2NnptMCAxMmgtNnYtNmg2djZ6bTEyLTEyaC02di02aDZ2NnptMCAxMmgtNnYtNmg2djZ6bTEyLTEyaC02di02aDZ2NnptMCAxMmgtNnYtNmg2djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
        </div>
      </div>

      {/* Scroll down indicator with improved styling */}
      <a 
        href="#about"
        className={`absolute bottom-10 animate-bounce transition-all duration-1000 delay-1200 transform z-10 flex flex-col items-center gap-2 ${isVisible ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-10'}`}
        aria-label="Scroll down"
      >
        <span className="text-xs text-gray-400">Scroll Down</span>
        <ArrowDown className="text-portfolio-accent hover:text-white transition-colors duration-300" />
      </a>
    </section>
  );
};

export default Hero;
