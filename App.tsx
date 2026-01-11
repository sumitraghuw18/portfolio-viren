
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, MessageSquare, X, Send, Terminal, Sparkles, Cpu, Code, ShieldCheck } from 'lucide-react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import AIChat from './components/AIChat';
import AnimatedBackground from './components/AnimatedBackground';
import TerminalModal from './components/TerminalModal';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030014] selection:bg-purple-500/30">
      <AnimatedBackground />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#030014]/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-purple-500/20">
              V
            </div>
            <span className="text-xl font-display font-bold tracking-tight hidden sm:block">Viren Pandey</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-6"
          >
            <button onClick={() => scrollTo('projects')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Projects</button>
            <button onClick={() => scrollTo('skills')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Skills</button>
            <a href="https://github.com/viren-pandey" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/viren-pandey" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
              <Linkedin size={20} />
            </a>
          </motion.div>
        </div>
      </nav>

      <main className="relative z-10 pt-20">
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <section id="skills" className="py-24">
          <Skills />
        </section>
        <section id="projects" className="py-24 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
          <Projects />
        </section>
        <section id="education" className="py-24">
          <Education />
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/10 bg-[#030014]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-gray-500 text-sm">
            © 2024 Viren Pandey. Built with React & AI.
          </div>
          <div className="flex space-x-6">
            <a href="mailto:pandeyviren78@gmail.com" className="text-gray-400 hover:text-purple-400 flex items-center space-x-2 transition-colors">
              <Mail size={16} />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col space-y-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsTerminalOpen(true)}
          className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-xl transition-colors shadow-xl"
          title="Open Terminal"
        >
          <Terminal size={20} className="text-gray-400" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/40 relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          {isChatOpen ? <X size={28} /> : <MessageSquare size={28} />}
        </motion.button>
      </div>

      {/* AI Assistant Overlay */}
      <AnimatePresence>
        {isChatOpen && (
          <AIChat onClose={() => setIsChatOpen(false)} />
        )}
      </AnimatePresence>

      {/* Terminal Overlay */}
      <AnimatePresence>
        {isTerminalOpen && (
          <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
