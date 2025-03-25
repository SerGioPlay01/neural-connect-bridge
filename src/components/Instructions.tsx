
import React from 'react';
import { BookOpen, Key, MessageSquare, Settings } from 'lucide-react';

const Instructions: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to NeuralHub</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Your unified interface for interacting with various AI models using your own API keys.
        </p>
      </div>

      <div className="space-y-10">
        <section className="glass-panel p-6 animate-fade-in">
          <div className="flex items-center mb-4">
            <Key className="w-5 h-5 mr-2 text-primary" />
            <h2 className="text-xl font-semibold">Setting Up API Keys</h2>
          </div>
          <div className="space-y-4">
            <p>
              To use NeuralHub, you'll need to add your own API keys for the AI services you want to use:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Go to the <strong>Settings</strong> page</li>
              <li>Click "Add Key" and select the service</li>
              <li>Enter your API key and save</li>
              <li>Toggle the key on/off as needed</li>
            </ol>
            <div className="bg-secondary/50 p-4 rounded-md mt-2">
              <p className="text-sm">
                <strong>Note:</strong> Your API keys are stored locally in your browser and are never sent to our servers.
                We only use them to make requests directly to the respective AI services on your behalf.
              </p>
            </div>
          </div>
        </section>

        <section className="glass-panel p-6 animate-fade-in">
          <div className="flex items-center mb-4">
            <MessageSquare className="w-5 h-5 mr-2 text-primary" />
            <h2 className="text-xl font-semibold">Using the Chat Interface</h2>
          </div>
          <div className="space-y-4">
            <p>
              The chat interface allows you to interact with different AI models:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Select a model from the dropdown at the top of the chat</li>
              <li>Type your message in the input field and press Enter or click the send button</li>
              <li>View the AI's response in the chat window</li>
              <li>Chat history is saved automatically</li>
              <li>Create new conversations or browse your past ones in the sidebar</li>
            </ul>
          </div>
        </section>

        <section className="glass-panel p-6 animate-fade-in">
          <div className="flex items-center mb-4">
            <Settings className="w-5 h-5 mr-2 text-primary" />
            <h2 className="text-xl font-semibold">Supported AI Services</h2>
          </div>
          <div className="space-y-4">
            <p>
              NeuralHub currently supports the following AI services:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-secondary/50 p-4 rounded-md">
                <h3 className="font-medium mb-1">OpenAI</h3>
                <p className="text-sm text-muted-foreground">
                  Access GPT-4o and GPT-4o Mini models
                </p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-md">
                <h3 className="font-medium mb-1">Anthropic</h3>
                <p className="text-sm text-muted-foreground">
                  Use Claude 3 Opus, Sonnet and Haiku models
                </p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-md">
                <h3 className="font-medium mb-1">Mistral AI</h3>
                <p className="text-sm text-muted-foreground">
                  Connect to Mistral Large, Medium and Small models
                </p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-md">
                <h3 className="font-medium mb-1">Perplexity AI</h3>
                <p className="text-sm text-muted-foreground">
                  Utilize Llama 3.1 Sonar Large and Small models
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-panel p-6 animate-fade-in">
          <div className="flex items-center mb-4">
            <BookOpen className="w-5 h-5 mr-2 text-primary" />
            <h2 className="text-xl font-semibold">Getting API Keys</h2>
          </div>
          <div className="space-y-4">
            <p>
              Here's how to obtain API keys for the supported services:
            </p>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">OpenAI</h3>
                <p className="text-sm text-muted-foreground">
                  Visit <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI's API Keys page</a> to create an account and generate API keys.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Anthropic</h3>
                <p className="text-sm text-muted-foreground">
                  Get Claude API access from <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Anthropic's Console</a>.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Mistral AI</h3>
                <p className="text-sm text-muted-foreground">
                  Get API keys from <a href="https://console.mistral.ai/api-keys/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mistral AI's console</a>.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Perplexity AI</h3>
                <p className="text-sm text-muted-foreground">
                  Get API keys from <a href="https://www.perplexity.ai/settings/api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Perplexity AI settings</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Instructions;
