export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastMessagePreview: string;
  createdAt: number;
  updatedAt: number;
}

export type Theme = 'light' | 'dark';