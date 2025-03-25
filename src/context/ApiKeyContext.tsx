
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

type ApiKey = {
  id: string;
  service: string;
  key: string;
  isActive: boolean;
};

type ApiKeyContextType = {
  apiKeys: ApiKey[];
  addApiKey: (service: string, key: string) => void;
  updateApiKey: (id: string, key: string) => void;
  removeApiKey: (id: string) => void;
  toggleApiKey: (id: string) => void;
  getApiKey: (service: string) => string | null;
};

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const useApiKeys = () => {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error('useApiKeys must be used within an ApiKeyProvider');
  }
  return context;
};

export const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  // Load API keys from localStorage on mount
  useEffect(() => {
    const savedKeys = localStorage.getItem('apiKeys');
    if (savedKeys) {
      try {
        setApiKeys(JSON.parse(savedKeys));
      } catch (error) {
        console.error('Failed to parse API keys from localStorage', error);
        localStorage.removeItem('apiKeys');
      }
    }
  }, []);

  // Save API keys to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  const addApiKey = (service: string, key: string) => {
    // Check if this service already has an API key
    const existingKeyIndex = apiKeys.findIndex(k => k.service === service);
    
    if (existingKeyIndex >= 0) {
      // Update the existing key
      const updatedKeys = [...apiKeys];
      updatedKeys[existingKeyIndex] = {
        ...updatedKeys[existingKeyIndex],
        key,
        isActive: true
      };
      setApiKeys(updatedKeys);
      toast.success(`Updated API key for ${service}`);
    } else {
      // Add a new key
      setApiKeys([
        ...apiKeys,
        {
          id: crypto.randomUUID(),
          service,
          key,
          isActive: true
        }
      ]);
      toast.success(`Added API key for ${service}`);
    }
  };

  const updateApiKey = (id: string, key: string) => {
    const updatedKeys = apiKeys.map(apiKey => 
      apiKey.id === id ? { ...apiKey, key } : apiKey
    );
    setApiKeys(updatedKeys);
    toast.success('API key updated');
  };

  const removeApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast.info('API key removed');
  };

  const toggleApiKey = (id: string) => {
    const updatedKeys = apiKeys.map(apiKey => 
      apiKey.id === id ? { ...apiKey, isActive: !apiKey.isActive } : apiKey
    );
    setApiKeys(updatedKeys);
    
    const key = updatedKeys.find(k => k.id === id);
    if (key) {
      toast.info(`${key.service} API key ${key.isActive ? 'activated' : 'deactivated'}`);
    }
  };

  const getApiKey = (service: string): string | null => {
    const key = apiKeys.find(k => k.service === service && k.isActive);
    return key ? key.key : null;
  };

  return (
    <ApiKeyContext.Provider value={{ 
      apiKeys, 
      addApiKey, 
      updateApiKey, 
      removeApiKey, 
      toggleApiKey,
      getApiKey
    }}>
      {children}
    </ApiKeyContext.Provider>
  );
};
