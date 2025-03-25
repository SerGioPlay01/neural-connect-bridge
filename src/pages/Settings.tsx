
import React from 'react';
import ApiKeyManager from '../components/ApiKeyManager';
import { useChat } from '../context/ChatContext';
import { Trash2 } from 'lucide-react';

const Settings = () => {
  const { clearConversations, conversations } = useChat();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-8">
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
