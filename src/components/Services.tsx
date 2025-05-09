
import { Code, Layout, Lightbulb, Smartphone } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const animatedElements = useRef<NodeListOf<Element> | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    animatedElements.current = sectionRef.current.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-slide-up');
          }, index * 100);
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

  const services: Service[] = [
    {
      icon: <Layout className="w-10 h-10 text-portfolio-accent" />,
      title: "Web Design",
      description: "Creating responsive and visually dynamic websites with a modern aesthetic and performance-first approach using the latest tools and technologies."
    },
    {
      icon: <Code className="w-10 h-10 text-portfolio-accent" />,
      title: "Web Development",
      description: "Building functional, robust web applications with clean code and modern frameworks that perform well across all devices and browsers."
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-portfolio-accent" />,
      title: "AI Integration",
      description: "Leveraging the latest AI tools and technologies to enhance web applications with smart features, automation, and personalized user experiences."
    },
    {
      icon: <Smartphone className="w-10 h-10 text-portfolio-accent" />,
      title: "Responsive Design",
      description: "Ensuring websites look and function flawlessly across all devices from smartphones to desktops with fluid layouts and adaptive components."
    }
  ];

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-portfolio-dark/50">
      <div className="container mx-auto">
        <h2 className="section-title">Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="glass-card p-6 animate-on-scroll opacity-0 transition-all duration-500 hover:border-portfolio-accent/50"
            >
              <div className="mb-5">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
