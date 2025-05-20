
import { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

type FormData = {
  from_name: string;
  reply_to: string;
  message: string;
};

const ContactForm = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    from_name: '',
    reply_to: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // EmailJS parameters
    const serviceId = 'service_25pnn0p';
    const templateId = 'template_hz291vb';
    const publicKey = 'LczSNS9EbRR5E5aI-';
    
    // Create template parameters that properly identify the sender
    const templateParams = {
      from_name: formData.from_name,
      from_email: formData.reply_to, // This will show as the sender's email
      reply_to: formData.reply_to,   // This allows you to reply directly to them
      message: formData.message,
      to_name: 'Naveed Ahmad', // Your name as the recipient
    };
    
    // Call EmailJS with the explicit parameters
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setFormData({ from_name: '', reply_to: '', message: '' });
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

  return (
    <div className="transition-all duration-700 delay-400 transform opacity-100 translate-y-0">
      <h3 className="text-2xl font-bold mb-6">Send Message</h3>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="w-full">
          <label htmlFor="from_name" className="block text-sm mb-2">Name</label>
          <input
            type="text"
            id="from_name"
            name="from_name"
            value={formData.from_name}
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
            value={formData.reply_to}
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
  );
};

export default ContactForm;
