
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Settings, BookOpen, Layers } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-12rem)] justify-center items-center">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-400 rounded-full blur opacity-75"></div>
            <div className="relative bg-background rounded-full p-4">
              <Layers className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent animate-fade-in">
          Welcome to NeuralHub
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-300">
          Your universal interface for interacting with multiple AI models using your own API keys.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in animation-delay-500">
          <Link 
            to="/chat" 
            className="button-shine flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
          >
            <MessageSquare className="w-5 h-5" />
            Start Chatting
          </Link>
          
          <Link 
            to="/settings" 
            className="flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-all"
          >
            <Settings className="w-5 h-5" />
            Setup API Keys
          </Link>
        </div>
      </div>
      
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 animate-fade-in animation-delay-700">
        <div className="glass-panel p-6 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Unified Interface</h3>
          <p className="text-muted-foreground">
            Chat with multiple AI models through a single, elegant interface.
          </p>
        </div>
        
        <div className="glass-panel p-6 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Your API Keys</h3>
          <p className="text-muted-foreground">
            Use your own API keys, with all data staying in your browser.
          </p>
        </div>
        
        <div className="glass-panel p-6 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Detailed Guides</h3>
          <p className="text-muted-foreground">
            Easy-to-follow instructions for connecting to each AI service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
