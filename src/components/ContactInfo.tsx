
import { Mail, Phone, Github, Linkedin } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="transition-all duration-700 delay-200 transform opacity-100 translate-y-0">
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
  );
};

export default ContactInfo;
