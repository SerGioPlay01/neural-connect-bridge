
import React, { useState } from 'react';
import { useApiKeys } from '../context/ApiKeyContext';
import { Eye, EyeOff, Trash2, Plus, Save, X } from 'lucide-react';

const ApiKeyManager: React.FC = () => {
  const { apiKeys, addApiKey, removeApiKey, toggleApiKey } = useApiKeys();
  const [newService, setNewService] = useState('');
  const [newKey, setNewKey] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});

  const toggleShowKey = (id: string) => {
    setShowKey(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newService.trim() && newKey.trim()) {
      addApiKey(newService.trim(), newKey.trim());
      setNewService('');
      setNewKey('');
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setNewService('');
    setNewKey('');
    setIsAdding(false);
  };

  const services = [
    { id: 'openai', name: 'OpenAI' },
    { id: 'anthropic', name: 'Anthropic' },
    { id: 'mistral', name: 'Mistral AI' },
    { id: 'perplexity', name: 'Perplexity AI' },
    { id: 'google', name: 'Google AI' },
    { id: 'custom', name: 'Custom Service' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">API Keys</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="button-shine flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm hover:bg-primary/90 transition-colors"
          disabled={isAdding}
        >
          <Plus className="w-4 h-4" />
          Add Key
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="glass-panel p-4 space-y-4 animate-fade-in">
          <div>
            <label htmlFor="service" className="block text-sm font-medium mb-1">
              Service
            </label>
            <select
              id="service"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              required
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
              API Key
            </label>
            <input
              id="apiKey"
              type="password"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Enter your API key"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1.5 border border-border rounded-md text-sm hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button-shine flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm hover:bg-primary/90 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </form>
      )}

      {apiKeys.length > 0 ? (
        <div className="glass-panel divide-y divide-border">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="p-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div>
                  <div className="font-medium">
                    {services.find(s => s.id === apiKey.service)?.name || apiKey.service}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground flex items-center">
                    <code className="px-1 py-0.5 bg-secondary rounded text-xs font-mono">
                      {showKey[apiKey.id] ? apiKey.key : apiKey.key.substring(0, 3) + '••••••••••••••••' + apiKey.key.substring(apiKey.key.length - 3)}
                    </code>
                    <button
                      onClick={() => toggleShowKey(apiKey.id)}
                      className="ml-1.5 text-muted-foreground hover:text-foreground"
                      aria-label={showKey[apiKey.id] ? "Hide API key" : "Show API key"}
                    >
                      {showKey[apiKey.id] ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-5 relative rounded-full bg-secondary cursor-pointer"
                  onClick={() => toggleApiKey(apiKey.id)}
                >
                  <div className={`
                    absolute top-0.5 h-4 w-4 rounded-full transition-all
                    ${apiKey.isActive ? 'bg-green-500 right-0.5' : 'bg-gray-400 left-0.5'}
                  `} />
                </div>
                <button
                  onClick={() => removeApiKey(apiKey.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Remove API key"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 glass-panel">
          <p className="text-muted-foreground">No API keys added yet</p>
          <p className="text-sm mt-1">
            Add API keys to interact with different AI models
          </p>
        </div>
      )}
    </div>
  );
};

export default ApiKeyManager;
