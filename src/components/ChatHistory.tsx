
import React, { useState } from 'react';
import { useChat, Conversation } from '../context/ChatContext';
import { MessageSquare, Trash2, Edit, Check, X } from 'lucide-react';

const ChatHistory: React.FC = () => {
  const { 
    conversations, 
    currentConversation, 
    setCurrentConversation, 
    deleteConversation,
    updateConversationTitle 
  } = useChat();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const startEditing = (conversation: Conversation) => {
    setEditingId(conversation.id);
    setEditTitle(conversation.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const saveEditing = (id: string) => {
    if (editTitle.trim()) {
      updateConversationTitle(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  if (conversations.length === 0) {
    return (
      <div className="text-center p-4">
        <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium">No conversations yet</h3>
        <p className="text-muted-foreground">Start chatting to create history</p>
      </div>
    );
  }

  return (
    <div className="space-y-1 p-1 max-h-[calc(100vh-240px)] overflow-y-auto">
      {conversations.map((conversation) => (
        <div 
          key={conversation.id}
          className={`
            relative group rounded-md transition-all 
            ${currentConversation?.id === conversation.id 
              ? 'bg-secondary text-secondary-foreground' 
              : 'hover:bg-secondary/50'
            }
          `}
        >
          {editingId === conversation.id ? (
            <div className="p-2 flex items-center">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-1 bg-background border-border border rounded px-2 py-1 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveEditing(conversation.id);
                  if (e.key === 'Escape') cancelEditing();
                }}
              />
              <div className="flex ml-1">
                <button
                  onClick={() => saveEditing(conversation.id)}
                  className="p-1 text-green-500 hover:text-green-600"
                  aria-label="Save"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={cancelEditing}
                  className="p-1 text-destructive hover:text-destructive/80"
                  aria-label="Cancel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              className="w-full text-left p-3 flex items-start"
              onClick={() => setCurrentConversation(conversation.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{conversation.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatDate(conversation.updatedAt)}
                </div>
              </div>
              
              <div className="flex ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startEditing(conversation);
                  }}
                  className="p-1 text-muted-foreground hover:text-foreground"
                  aria-label="Edit conversation title"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conversation.id);
                  }}
                  className="p-1 text-muted-foreground hover:text-destructive"
                  aria-label="Delete conversation"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
