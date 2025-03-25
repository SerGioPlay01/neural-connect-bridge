
import React from 'react';
import ApiKeyManager from '../components/ApiKeyManager';
import { useChat } from '../context/ChatContext';
import { Trash2, Zap } from 'lucide-react';
import { MAX_FREE_REQUESTS } from '../utils/freeTierService';

const Settings = () => {
  const { clearConversations, conversations, freeTierUsage, hasFreeTierRemaining } = useChat();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-8">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">Free Tier Usage</h2>
            <div className={`px-3 py-1 rounded-full text-sm ${
              hasFreeTierRemaining 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
            }`}>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                {freeTierUsage}/{MAX_FREE_REQUESTS} used
              </span>
            </div>
          </div>
          <div className="glass-panel p-4">
            <div className="flex items-center gap-4">
              <div className="w-full bg-secondary h-2 rounded-full">
                <div 
                  className={`h-2 rounded-full ${hasFreeTierRemaining ? 'bg-primary' : 'bg-gray-400'}`} 
                  style={{ width: `${(freeTierUsage / MAX_FREE_REQUESTS) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm whitespace-nowrap">
                {MAX_FREE_REQUESTS - freeTierUsage} remaining
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              NeuralHub provides {MAX_FREE_REQUESTS} free requests to try the service without adding your own API keys.
              {hasFreeTierRemaining 
                ? ` You have ${MAX_FREE_REQUESTS - freeTierUsage} free requests remaining.` 
                : ' You have used all your free requests. Please add your API keys to continue using the service.'}
            </p>
          </div>
        </section>
        
        <section className="space-y-4">
          <ApiKeyManager />
        </section>
        
        <section className="border-t border-border pt-6">
          <h2 className="text-xl font-medium mb-4">Chat History</h2>
          <div className="flex items-center justify-between glass-panel p-4">
            <div>
              <p className="font-medium">Clear All Conversations</p>
              <p className="text-sm text-muted-foreground">
                This will permanently delete all your chat history ({conversations.length} conversations).
              </p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete all conversations? This action cannot be undone.')) {
                  clearConversations();
                }
              }}
              className="flex items-center gap-1.5 bg-destructive text-destructive-foreground px-3 py-1.5 rounded-md text-sm hover:bg-destructive/90 transition-colors"
              disabled={conversations.length === 0}
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        </section>
        
        <section className="border-t border-border pt-6">
          <h2 className="text-xl font-medium mb-4">About</h2>
          <div className="glass-panel p-4">
            <p className="text-sm text-muted-foreground">
              <strong>NeuralHub</strong> - Version 1.0.0
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Your universal interface for interacting with various AI models using your own API keys.
              All data stays in your browser and is never sent to our servers.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
