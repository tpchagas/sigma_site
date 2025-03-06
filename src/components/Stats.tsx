
import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    { value: '62%', label: 'Redução no tempo de tarefas manuais' },
    { value: '10h', label: 'Economia semanal por funcionário' },
    { value: '50%', label: 'Aumento na precisão de previsões' },
    { value: '2x', label: 'Mais rápido no atendimento ao cliente' },
  ];

  return (
    <section id="stats" className="py-20 bg-sigma-dark">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 rounded-xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-sigma-neon mb-4">{stat.value}</h3>
              <p className="text-white text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;