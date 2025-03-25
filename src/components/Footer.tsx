
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border bg-background/80 backdrop-blur-lg py-4">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          © {new Date().getFullYear()} NeuralHub. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
