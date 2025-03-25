
import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import ChatInterface from '../components/ChatInterface';
import ChatHistory from '../components/ChatHistory';
import { MessageSquare, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const Chat = () => {
  const { 
    createConversation, 
    currentConversation, 
    availableModels, 
    currentModel, 
    setCurrentModel 
  } = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-[calc(100vh-10rem)] relative">
      {/* Sidebar */}
      <div 
        className={`
          w-64 border-r border-border transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:opacity-0'}
          absolute md:relative z-10 md:z-auto h-full bg-background md:bg-transparent
        `}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Conversations</h2>
            <button
              onClick={() => createConversation()}
              className="p-1 rounded-full hover:bg-secondary transition-colors"
              aria-label="New conversation"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <ChatHistory />
        </div>
      </div>
      
      {/* Toggle sidebar button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-background border border-border rounded-r-md p-1 text-muted-foreground hover:text-foreground md:hidden z-20"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>
      
      {/* Main chat area */}
      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        <div className="mb-4">
          <select
            value={currentModel}
            onChange={(e) => setCurrentModel(e.target.value)}
            className="w-full md:w-auto px-3 py-1.5 bg-background border border-border rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
          >
            {availableModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} ({model.service})
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1 glass-panel p-4 overflow-hidden">
          {currentConversation ? (
            <ChatInterface />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <MessageSquare className="w-12 h-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">No conversation selected</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Select an existing conversation from the sidebar or start a new one.
              </p>
              <button
                onClick={() => createConversation()}
                className="button-shine flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Conversation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
