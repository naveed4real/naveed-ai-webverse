
import { useEffect, useRef, useState } from 'react';
import { Code, Layout, Brain, Smartphone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
}

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching services:', error);
        return;
      }

      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
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
  }, [isVisible]);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-12 h-12 text-portfolio-accent" />;
      case 'Code':
        return <Code className="w-12 h-12 text-portfolio-accent" />;
      case 'Brain':
        return <Brain className="w-12 h-12 text-portfolio-accent" />;
      case 'Smartphone':
        return <Smartphone className="w-12 h-12 text-portfolio-accent" />;
      default:
        return <Layout className="w-12 h-12 text-portfolio-accent" />;
    }
  };

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-portfolio-dark/50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-portfolio-accent/5 blur-[100px]"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-500/5 blur-[120px]"></div>
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-portfolio-dark/90 via-portfolio-dark to-portfolio-dark/80"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTIwIDBjMTEuMDQ2IDAgMjAgOC45NTQgMjAgMjBzLTguOTU0IDIwLTIwIDIwUzAgMzEuMDQ2IDAgMjAgOC45NTQgMCAyMCAwem0wIDNjLTkuMzc0IDAtMTcgNy42MjYtMTcgMTdzNy42MjYgMTcgMTcgMTcgMTctNy42MjYgMTctMTctNy42MjYtMTctMTctMTd6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="transition-all duration-700 transform opacity-100 translate-y-0">
          <h2 className="section-title">Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className={`glass-card p-6 transition-all duration-700 border border-white/10 hover:border-portfolio-accent/50 backdrop-blur-md group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mb-5 relative">
                  <div className="absolute -inset-1 rounded-full bg-portfolio-accent/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative">{getIconComponent(service.icon)}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-portfolio-accent transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
                
                <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-t border-l border-portfolio-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
