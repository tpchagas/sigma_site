import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-sigma-dark">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;