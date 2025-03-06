import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full fixed top-0 z-50 transition-all duration-300 bg-sigma-dark/80 backdrop-blur-md border-b border-sigma-light">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div onClick={scrollToTop} className="flex items-center cursor-pointer">
            <img 
              src="https://sigmalabs.com.br/sigmawhite.png"
              alt="Sigma Labs Logo" 
              className="h-32 w-auto mr-2"
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={scrollToTop} className="text-white hover:text-sigma-neon transition-colors">
              Início
            </button>
            <button onClick={() => scrollToSection('sobre')} className="text-white hover:text-sigma-neon transition-colors">
              Sobre Nós
            </button>
            <button onClick={() => scrollToSection('servicos')} className="text-white hover:text-sigma-neon transition-colors">
              Serviços
            </button>
            <button onClick={() => scrollToSection('contato')} className="text-white hover:text-sigma-neon transition-colors">
              Contato
            </button>
          </nav>
          
          {/* Contact Phone */}
          <div className="hidden md:flex items-center">
            <a 
              href="https://wa.me/551151995833" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sigma-neon px-4 py-2 rounded-full border border-sigma-neon hover:bg-sigma-neon hover:text-sigma-dark transition-all duration-300"
            >
              <Phone size={16} className="mr-2" />
              <span>(11) 5199-5833</span>
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={scrollToTop}
                className="text-white hover:text-sigma-neon transition-colors px-4 py-2 text-left"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('sobre')}
                className="text-white hover:text-sigma-neon transition-colors px-4 py-2 text-left"
              >
                Sobre Nós
              </button>
              <button 
                onClick={() => scrollToSection('servicos')}
                className="text-white hover:text-sigma-neon transition-colors px-4 py-2 text-left"
              >
                Serviços
              </button>
              <button 
                onClick={() => scrollToSection('contato')}
                className="text-white hover:text-sigma-neon transition-colors px-4 py-2 text-left"
              >
                Contato
              </button>
              <a 
                href="https://wa.me/551151995833"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sigma-neon px-4 py-2"
              >
                <Phone size={16} className="mr-2" />
                <span>(11) 5199-5833</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;