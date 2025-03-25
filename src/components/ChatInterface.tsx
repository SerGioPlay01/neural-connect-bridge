
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Info } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { MAX_FREE_REQUESTS } from '../utils/freeTierService';
import { useApiKeys } from '../context/ApiKeyContext';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { 
    currentConversation, 
    sendMessage, 
    isLoading, 
    currentModel, 
    availableModels,
    freeTierUsage,
    hasFreeTierRemaining
  } = useChat();
  const { apiKeys } = useApiKeys();
  
  // Get service from current model
  const [service] = currentModel.split(':');
  
  // Check if user has an API key for the current service
  const hasApiKey = apiKeys.some(key => key.service === service && key.isActive);
  
  // Determine if we're in free tier mode
  const usingFreeTier = !hasApiKey && hasFreeTierRemaining;
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [currentConversation?.messages]);
  
  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input.trim());
      setInput('');
    }
  };
  
  // Get model display name from ID
  const getModelName = () => {
    const model = availableModels.find(m => m.id === currentModel);
    return model ? model.name : currentModel;
  };
  
  // Handle textarea height auto-expand
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="mb-3 flex items-center justify-center gap-2">
        <div className="px-3 py-1 rounded-full bg-secondary text-xs text-secondary-foreground">
          {getModelName()}
        </div>
        
        {usingFreeTier && (
          <div className="px-3 py-1 rounded-full bg-green-100 text-xs text-green-800 dark:bg-green-900 dark:text-green-100 flex items-center gap-1">
            <Info className="w-3 h-3" />
            Free tier: {freeTierUsage}/{MAX_FREE_REQUESTS} used
          </div>
        )}
        
        {!hasApiKey && !hasFreeTierRemaining && (
          <div className="px-3 py-1 rounded-full bg-amber-100 text-xs text-amber-800 dark:bg-amber-900 dark:text-amber-100 flex items-center gap-1">
            <Info className="w-3 h-3" />
            Add API key in Settings
          </div>
        )}
      </div>
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 mb-4 border border-border rounded-lg"
      >
        {!currentConversation?.messages.length ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Use your API keys with various AI models to chat, ask questions, and more.
              {!hasApiKey && hasFreeTierRemaining && (
                <span className="block mt-2 text-green-600 dark:text-green-400">
                  You have {MAX_FREE_REQUESTS - freeTierUsage} free requests remaining!
                </span>
              )}
            </p>
          </div>
        ) : (
          currentConversation.messages.map((message) => (
            <div 
              key={message.id} 
              className={`chat-bubble ${
                message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div className="text-xs opacity-60 mt-1 text-right">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="chat-bubble chat-bubble-assistant flex items-center space-x-2">
            <div className="animate-pulse flex space-x-2">
              <div className="h-2 w-2 bg-current rounded-full"></div>
              <div className="h-2 w-2 bg-current rounded-full animation-delay-200"></div>
              <div className="h-2 w-2 bg-current rounded-full animation-delay-400"></div>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          ref={inputRef}
          className="w-full p-4 pr-14 rounded-lg border border-border bg-background resize-none min-h-[56px] max-h-[160px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          placeholder={
            !hasApiKey && !hasFreeTierRemaining 
              ? "Add an API key in Settings to start chatting..." 
              : "Type your message..."
          }
          value={input}
          onChange={handleTextareaChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          disabled={isLoading || (!hasApiKey && !hasFreeTierRemaining)}
          rows={1}
        />
        <button
          type="submit"
          className="absolute right-3 bottom-3 p-2 text-primary hover:text-primary/80 disabled:text-muted-foreground transition-colors"
          disabled={!input.trim() || isLoading || (!hasApiKey && !hasFreeTierRemaining)}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
