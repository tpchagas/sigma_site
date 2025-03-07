import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-sigma-dark/80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sigma-dark"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            A maneira mais fácil de incorporar <span className="text-sigma-neon neon-glow">IA</span> à sua empresa
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-sigma-muted mb-10 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Automatize processos, otimize equipes e aumente a produtividade com nossa plataforma de agentes de IA
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a 
              href="#servicos" 
              className="bg-sigma-neon text-sigma-dark hover:bg-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300"
            >
              Conheça Nossos Serviços
            </a>
            <a 
              href="#contato" 
              className="border border-white text-white hover:border-sigma-neon hover:text-sigma-neon px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300"
            >
              Entre em Contato
            </a>
          </motion.div>
          
          <motion.div 
            className="perspective-container w-full max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="card-rotate-hover relative">
              <video 
                src="https://sigmalabs.com.br/present.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto rounded-xl shadow-2xl border border-sigma-light/50"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center">
      </div>
    </section>
  );
};

export default Hero;