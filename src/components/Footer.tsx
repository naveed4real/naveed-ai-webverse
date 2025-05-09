
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className="bg-portfolio-dark py-10 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aC0yNHYtOGgyNHY4em0wLTE2aC04djhoOHYtOHptMTYgMTZoLTh2LThoOHY4eiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8">
          <div className="mb-4 md:mb-0">
            <a href="#home" className="text-2xl font-bold group">
              <span className="text-portfolio-accent group-hover:text-white transition-colors duration-300">N</span>
              <span className="group-hover:text-portfolio-accent transition-colors duration-300">aveed</span>
            </a>
            <p className="text-sm text-gray-400 mt-2">
              © {new Date().getFullYear()} Naveed Ahmed. All rights reserved.
            </p>
          </div>
          
          {/* Show scroll button conditionally */}
          <button 
            onClick={scrollToTop} 
            className={`p-3 rounded-full bg-portfolio-accent hover:bg-portfolio-accent/80 transition-all duration-500 shadow-lg shadow-portfolio-accent/20 ${
              showScrollButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } fixed bottom-8 right-8 z-50`}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
