
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-portfolio-dark py-10 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8">
          <div className="mb-4 md:mb-0">
            <a href="#home" className="text-2xl font-bold">
              <span className="text-portfolio-accent">N</span>aveed
            </a>
            <p className="text-sm text-gray-400 mt-2">
              © {new Date().getFullYear()} Naveed Ahmed. All rights reserved.
            </p>
          </div>
          
          <button 
            onClick={scrollToTop} 
            className="p-2 rounded-full bg-portfolio-accent hover:bg-portfolio-accent/80 transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
