
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MessageSquare, Settings, BookOpen, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle resize to reset menu state on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <NavLink to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              NeuralHub
            </span>
          </NavLink>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink 
            to="/chat" 
            className={({ isActive }) => 
              `nav-link flex items-center gap-1.5 ${isActive ? 'active' : ''}`
            }
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat</span>
          </NavLink>
          <NavLink 
            to="/guide" 
            className={({ isActive }) => 
              `nav-link flex items-center gap-1.5 ${isActive ? 'active' : ''}`
            }
          >
            <BookOpen className="w-4 h-4" />
            <span>Instructions</span>
          </NavLink>
          <NavLink 
            to="/settings" 
            className={({ isActive }) => 
              `nav-link flex items-center gap-1.5 ${isActive ? 'active' : ''}`
            }
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </NavLink>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-secondary transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in">
            <div className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-background p-6 shadow-lg animate-slide-up">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  NeuralHub
                </span>
                <button 
                  className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-secondary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col space-y-4">
                <NavLink 
                  to="/chat" 
                  className={({ isActive }) => 
                    `flex items-center space-x-2 p-2 rounded-md ${isActive ? 'bg-secondary' : 'hover:bg-secondary/50'} transition-colors`
                  }
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Chat</span>
                </NavLink>
                <NavLink 
                  to="/guide" 
                  className={({ isActive }) => 
                    `flex items-center space-x-2 p-2 rounded-md ${isActive ? 'bg-secondary' : 'hover:bg-secondary/50'} transition-colors`
                  }
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Instructions</span>
                </NavLink>
                <NavLink 
                  to="/settings" 
                  className={({ isActive }) => 
                    `flex items-center space-x-2 p-2 rounded-md ${isActive ? 'bg-secondary' : 'hover:bg-secondary/50'} transition-colors`
                  }
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </NavLink>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
