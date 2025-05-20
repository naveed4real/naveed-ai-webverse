
import { useRef, useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
    <section id="contact" ref={sectionRef} className="section-padding bg-portfolio-dark relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-portfolio-accent/5 blur-[100px]"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-blue-500/5 blur-[120px]"></div>
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-portfolio-dark via-portfolio-dark/90 to-portfolio-dark/80"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aC0yNHYtOGgyNHY4em0wLTE2aC04djhoOHYtOHptMTYgMTZoLTh2LThoOHY4eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title flex items-center">
            <Mail className="mr-2 text-portfolio-accent" size={24} />
            Get In Touch
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
