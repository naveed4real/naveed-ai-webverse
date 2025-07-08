
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 lg:px-16 ${
        scrolled ? 'bg-portfolio-dark/80 backdrop-blur-lg py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold">
          <span className="text-portfolio-accent">N</span>aveed
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {['Home', 'About', 'Skills', 'Projects', 'Services', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-white hover:text-portfolio-accent transition-colors duration-300
                after:content-[''] after:absolute after:left-0 after:bottom-[-5px]
                after:h-[2px] after:w-0 after:bg-portfolio-accent after:transition-all after:duration-300
                hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {navOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {navOpen && (
        <div className="md:hidden bg-portfolio-dark/95 backdrop-blur-lg absolute left-0 right-0 py-4 px-4">
          <nav className="flex flex-col space-y-4">
            {['Home', 'About', 'Skills', 'Projects', 'Services', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-portfolio-accent py-2 transition-colors duration-300"
                onClick={() => setNavOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
