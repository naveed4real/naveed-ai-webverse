import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, Github, Linkedin, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!formRef.current) return;
    
    // EmailJS parameters with the provided credentials
    const serviceId = 'service_25pnn0p';
    const templateId = 'template_a0rkd8i';
    const publicKey = 'LczSNS9EbRR5E5aI-';
    
    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('Email sending failed:', error.text);
        toast({
          title: "Message failed to send",
          description: "There was an error sending your message. Please try again.",
          variant: "destructive"
        });
        setIsSubmitting(false);
      });
  };

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
            <div className={`transition-all duration-700 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-gray-300 mb-8 backdrop-blur-sm bg-black/5 p-5 rounded-lg border border-white/5">
                Feel free to reach out to me with any questions, project inquiries, or just to say hello!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-12 h-12 rounded-full bg-portfolio-accent/10 flex items-center justify-center mr-4 group-hover:bg-portfolio-accent/20 transition-colors duration-300">
                    <Mail className="text-portfolio-accent" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:naveedahmad657@gmail.com" className="hover:text-portfolio-accent transition-colors duration-300">
                      naveedahmad657@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="w-12 h-12 rounded-full bg-portfolio-accent/10 flex items-center justify-center mr-4 group-hover:bg-portfolio-accent/20 transition-colors duration-300">
                    <Phone className="text-portfolio-accent" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a href="tel:+923348737415" className="hover:text-portfolio-accent transition-colors duration-300">
                      +92 334 8737415
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-medium mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-portfolio-accent transition-colors duration-300 group"
                    aria-label="GitHub profile"
                  >
                    <Github size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a 
                    href="https://linkedin.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-portfolio-accent transition-colors duration-300 group"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-700 delay-400 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-2xl font-bold mb-6">Send Message</h3>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="w-full">
                  <label htmlFor="from_name" className="block text-sm mb-2">Name</label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:border-portfolio-accent focus:ring-1 focus:ring-portfolio-accent transition-colors duration-300 text-white placeholder-gray-400"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="w-full">
                  <label htmlFor="reply_to" className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    id="reply_to"
                    name="reply_to"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:border-portfolio-accent focus:ring-1 focus:ring-portfolio-accent transition-colors duration-300 text-white placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="w-full">
                  <label htmlFor="message" className="block text-sm mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:border-portfolio-accent focus:ring-1 focus:ring-portfolio-accent transition-colors duration-300 text-white placeholder-gray-400 resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-portfolio-accent hover:bg-portfolio-accent/80 text-white rounded-md transition-all duration-300 flex items-center gap-2 shadow-lg shadow-portfolio-accent/20 disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
