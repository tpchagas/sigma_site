import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      icon: (
        <svg className="w-12 h-12 text-sigma-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Automação de Processos',
      description: 'Automatize tarefas repetitivas e libere o potencial da sua equipe para trabalhos mais estratégicos com nossos agentes de IA.'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-sigma-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      title: 'Atendimento ao Cliente',
      description: 'Ofereça suporte 24/7 com nossos assistentes virtuais inteligentes que aprendem continuamente para melhorar as interações.'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-sigma-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Análise de Dados',
      description: 'Transforme dados brutos em insights valiosos com nossa plataforma de análise preditiva e visualização inteligente.'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-sigma-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: 'Soluções Personalizadas',
      description: 'Desenvolvemos agentes de IA específicos para as necessidades do seu negócio, integrando-se perfeitamente aos seus sistemas existentes.'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-sigma-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Automação de Vendas',
      description: 'Aumente suas conversões com agentes de vendas virtuais que qualificam leads, acompanham clientes e otimizam seu funil de vendas.'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-sigma-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Segurança e Compliance',
      description: 'Nossas soluções são desenvolvidas com foco em segurança e em conformidade com as regulamentações de proteção de dados.'
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-sigma-dark">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block px-3 py-1 bg-sigma-light text-sigma-neon rounded-full text-sm font-medium mb-4">
              Nossos Serviços
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Soluções de IA para Seu Negócio
            </h2>
            <p className="text-sigma-muted text-xl max-w-3xl mx-auto">
              Transforme sua empresa com nossa plataforma de agentes de IA personalizados para diversas necessidades
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-xl p-8 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-sigma-neon/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-sigma-muted">{service.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <a 
            href="#contato" 
            className="bg-sigma-neon text-sigma-dark hover:bg-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 inline-flex items-center"
          >
            Solicite uma Demonstração
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;