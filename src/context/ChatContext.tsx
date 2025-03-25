
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useApiKeys } from './ApiKeyContext';

// Define message types
type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  model?: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  model: string;
}

interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  currentModel: string;
  isLoading: boolean;
  createConversation: (title?: string) => void;
  setCurrentConversation: (id: string | null) => void;
  addMessage: (content: string, role: MessageRole, model?: string) => void;
  sendMessage: (content: string) => Promise<void>;
  updateConversationTitle: (id: string, title: string) => void;
  deleteConversation: (id: string) => void;
  setCurrentModel: (model: string) => void;
  clearConversations: () => void;
  availableModels: { id: string, name: string, service: string }[];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [currentModel, setCurrentModel] = useState('openai:gpt-4o');
  const [isLoading, setIsLoading] = useState(false);
  const { getApiKey } = useApiKeys();

  const availableModels = [
    { id: 'openai:gpt-4o', name: 'GPT-4o', service: 'openai' },
    { id: 'openai:gpt-4o-mini', name: 'GPT-4o Mini', service: 'openai' },
    { id: 'anthropic:claude-3-opus', name: 'Claude 3 Opus', service: 'anthropic' },
    { id: 'anthropic:claude-3-sonnet', name: 'Claude 3 Sonnet', service: 'anthropic' },
    { id: 'anthropic:claude-3-haiku', name: 'Claude 3 Haiku', service: 'anthropic' },
    { id: 'mistral:mistral-large', name: 'Mistral Large', service: 'mistral' },
    { id: 'mistral:mistral-medium', name: 'Mistral Medium', service: 'mistral' },
    { id: 'mistral:mistral-small', name: 'Mistral Small', service: 'mistral' },
    { id: 'perplexity:llama-3.1-sonar-large', name: 'Llama 3.1 Large', service: 'perplexity' },
    { id: 'perplexity:llama-3.1-sonar-small', name: 'Llama 3.1 Small', service: 'perplexity' },
  ];

  const currentConversation = currentConversationId 
    ? conversations.find(conv => conv.id === currentConversationId) || null 
    : null;

  // Load conversations from localStorage on mount
  useEffect(() => {
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
      try {
        setConversations(JSON.parse(savedConversations));
      } catch (error) {
        console.error('Failed to parse conversations from localStorage', error);
        localStorage.removeItem('conversations');
      }
    }

    // Set current conversation to the most recent one if it exists
    const savedCurrentId = localStorage.getItem('currentConversationId');
    if (savedCurrentId) {
      setCurrentConversationId(savedCurrentId);
    }

    // Load current model preference
    const savedModel = localStorage.getItem('currentModel');
    if (savedModel) {
      setCurrentModel(savedModel);
    }
  }, []);

  // Save to localStorage whenever conversations change
  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  // Save current conversation ID to localStorage
  useEffect(() => {
    if (currentConversationId) {
      localStorage.setItem('currentConversationId', currentConversationId);
    } else {
      localStorage.removeItem('currentConversationId');
    }
  }, [currentConversationId]);

  // Save current model preference
  useEffect(() => {
    localStorage.setItem('currentModel', currentModel);
  }, [currentModel]);

  const createConversation = (title?: string) => {
    const now = Date.now();
    const newConversation: Conversation = {
      id: crypto.randomUUID(),
      title: title || `New Conversation ${conversations.length + 1}`,
      messages: [],
      createdAt: now,
      updatedAt: now,
      model: currentModel
    };
    
    setConversations([newConversation, ...conversations]);
    setCurrentConversationId(newConversation.id);
    return newConversation.id;
  };

  const setCurrentConversation = (id: string | null) => {
    setCurrentConversationId(id);
  };

  const addMessage = (content: string, role: MessageRole, model?: string) => {
    if (!currentConversationId) {
      // Create a new conversation if none exists
      const id = createConversation();
      setCurrentConversationId(id);
    }
    
    setConversations(prevConversations => 
      prevConversations.map(conv => {
        if (conv.id === currentConversationId) {
          const newMessage: Message = {
            id: crypto.randomUUID(),
            role,
            content,
            timestamp: Date.now(),
            model: model || currentModel
          };
          
          // Update conversation
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            updatedAt: Date.now(),
            // Update title for new conversations with first user message
            title: conv.messages.length === 0 && role === 'user' 
              ? content.substring(0, 30) + (content.length > 30 ? '...' : '') 
              : conv.title
          };
        }
        return conv;
      })
    );
  };

  const sendMessage = async (content: string) => {
    // Add user message
    addMessage(content, 'user');
    
    // Get the model service from the model ID
    const [service] = currentModel.split(':');
    const apiKey = getApiKey(service);
    
    if (!apiKey) {
      toast.error(`No API key found for ${service}. Please add your API key in Settings.`);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate AI response for now - in a real app, this would be an API call
      // to the appropriate AI service based on the model selection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate different responses based on the selected model
      let response = `This is a simulated response from the ${currentModel} model.`;
      
      if (content.includes('?')) {
        response += ' I noticed you asked a question. In a real implementation, I would process this through the selected AI service API.';
      } else {
        response += ' Your input has been received and would be processed by the real AI service.';
      }
      
      addMessage(response, 'assistant');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateConversationTitle = (id: string, title: string) => {
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === id ? { ...conv, title } : conv
      )
    );
  };

  const deleteConversation = (id: string) => {
    setConversations(prevConversations => 
      prevConversations.filter(conv => conv.id !== id)
    );
    
    // If the deleted conversation was the current one, set current to null
    if (currentConversationId === id) {
      setCurrentConversationId(null);
    }
    
    toast.info('Conversation deleted');
  };

  const clearConversations = () => {
    setConversations([]);
    setCurrentConversationId(null);
    toast.info('All conversations cleared');
  };

  return (
    <ChatContext.Provider value={{
      conversations,
      currentConversation,
      currentModel,
      isLoading,
      createConversation,
      setCurrentConversation,
      addMessage,
      sendMessage,
      updateConversationTitle,
      deleteConversation,
      setCurrentModel,
      clearConversations,
      availableModels
    }}>
      {children}
    </ChatContext.Provider>
  );
};
