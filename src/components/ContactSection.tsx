import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await emailjs.send(
        'service_ukitm5g', // Substitua pelo seu Service ID
        'template_qizf6x6', // Substitua pelo seu Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          message: formData.message,
          to_name: 'Contato Sigma Labs',
          reply_to: formData.email
        },
        'cuPegEEhlxZ4yHTNK' // Substitua pela sua Public Key
      );

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
      console.error('Erro ao enviar email:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-20 bg-sigma-dark">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block px-3 py-1 bg-sigma-light text-sigma-neon rounded-full text-sm font-medium mb-4">
              Contato
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Entre em Contato Conosco
            </h2>
            <p className="text-sigma-muted text-xl max-w-3xl mx-auto">
              Estamos prontos para ajudar sua empresa a implementar soluções de IA que realmente fazem a diferença
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="glass-card rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-sigma-neon rounded-full p-3 mr-4">
                    <Phone size={20} className="text-sigma-dark" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Telefone</h4>
                    <a href="tel:1151995833" className="text-sigma-muted hover:text-sigma-neon transition-colors">
                      (11) 5199-5833
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-sigma-neon rounded-full p-3 mr-4">
                    <Mail size={20} className="text-sigma-dark" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Email</h4>
                    <a href="mailto:contato@sigmalabs.com.br" className="text-sigma-muted hover:text-sigma-neon transition-colors">
                      contato@sigmalabs.com.br
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-sigma-neon rounded-full p-3 mr-4">
                    <MapPin size={20} className="text-sigma-dark" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Endereço</h4>
                    <p className="text-sigma-muted">
                      Av. Paulista, 1000 - Bela Vista,<br />
                      São Paulo - SP, 01310-100
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-white mb-6">Redes Sociais</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61573834195728" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-full bg-sigma-light flex items-center justify-center text-white hover:bg-sigma-neon hover:text-sigma-dark transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/sigmalabs.ia" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-full bg-sigma-light flex items-center justify-center text-white hover:bg-sigma-neon hover:text-sigma-dark transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a 
                    href="https://www.tiktok.com/@sigmalabs.ia" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-full bg-sigma-light flex items-center justify-center text-white hover:bg-sigma-neon hover:text-sigma-dark transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
                    </svg>
                  </a>
                  <a 
                    href="https://www.youtube.com/@sigmalabssolutions" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-full bg-sigma-light flex items-center justify-center text-white hover:bg-sigma-neon hover:text-sigma-dark transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="glass-card rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Envie uma Mensagem</h3>
              
              {isSuccess ? (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-white">
                  <h4 className="font-bold text-lg">Mensagem enviada com sucesso!</h4>
                  <p>Entraremos em contato em breve. Obrigado por seu interesse.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-white">
                      <p>{error}</p>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2">Nome</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-sigma-light border border-sigma-light/80 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sigma-neon"
                      placeholder="Seu nome"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-sigma-light border border-sigma-light/80 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sigma-neon"
                      placeholder="seu.email@empresa.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-white font-medium mb-2">Empresa</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full bg-sigma-light border border-sigma-light/80 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sigma-neon"
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-white font-medium mb-2">Mensagem</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-sigma-light border border-sigma-light/80 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sigma-neon"
                      placeholder="Como podemos ajudar?"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-sigma-neon text-sigma-dark font-medium py-3 rounded-lg transition-all duration-300 
                      ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-white'}`}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;