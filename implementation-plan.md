# Implementation Plan: ChatGPT-like Web Interface

## Overview
This plan outlines the implementation of a fully functional ChatGPT-like chat application UI using Next.js 14+ (App Router), TypeScript (strict mode), and TailwindCSS.

---

## Step 1: Install Required Dependencies

First, install the allowed npm packages for the project:

```bash
npm install react-markdown remark-gfm react-syntax-highlighter lucide-react uuid clsx tailwind-merge
npm install -D @types/react-syntax-highlighter
```

## Step 2: Create Type Definitions

**File: `src/lib/types.ts`**

Define TypeScript interfaces for the entire application:

```typescript
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
  createdAt: number;
  updatedAt: number;
}
```

## Step 3: Create Mock Response Generator

**File: `src/lib/mockResponses.ts`**

A function that generates mock AI responses with markdown, code blocks, and formatted content:

```typescript
import { Message } from './types';

export function generateMockResponse(userMessage: string): Message {
  const responses = [
    `Here's a TypeScript example of a reusable utility function:

\`\`\`typescript
function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
\`\`\`

This function helps optimize performance by limiting how often a function can be called.

**Key features:**
- Type-safe with generics
- Full TypeScript support
- Cancelable with clearTimeout`,
    // More variations...
  ];
}
```

## Step 4: Create Theme Provider and Hook

**File: `src/hooks/useTheme.ts`**

Custom hook for managing dark/light theme with localStorage persistence:

```typescript
'use client';

import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // ... implementation
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

**File: `src/components/ThemeProvider.tsx`**

Wrapper component that provides theme context to the app.

## Step 5: Create Conversation Management Hook

**File: `src/hooks/useConversations.ts`**

Custom hook for managing conversations and messages:

import { useState, useCallback } from 'react';
import { Conversation, Message, MessageRole } from '../lib/types';
import { generateMockResponse } from '../lib/mockResponses';
import { v4 as uuidv4 } from 'uuid';

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  // ... implementation
}
```

## Step 6: Create UI Components

### 6.1 Code Block Component

**File: `src/components/CodeBlock.tsx`**

Displays code with syntax highlighting and a copy button:

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import clsx from 'clsx';
```

### 6.2 Typing Indicator Component

**File: `src/components/TypingIndicator.tsx`**

Animated dots indicating the assistant is "thinking":

import React from 'react';
import clsx from 'clsx';
```

### 6.3 Message Bubble Component

**File: `src/components/MessageBubble.tsx`**

Single message with markdown rendering and code blocks:

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';
import clsx from 'clsx';
import type { Message } from '../lib/types';
```

### 6.4 Chat Area Component

**File: `src/components/ChatArea.tsx`**

Message list with auto-scroll and empty state:

import React, { useEffect, useRef, type ReactNode } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import clsx from 'clsx';
import type { Message as MessageType } from '../lib/types';
```

### 6.5 Input Area Component

**File: `src/components/InputArea.tsx`**

Textarea with auto-resize, send button, and keyboard handling:

import React, { useState, useRef, type KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import clsx from 'clsx';
```

### 6.6 Sidebar Component

**File: `src/components/Sidebar.tsx`**

Conversation list with new chat and delete functionality:

import React from 'react';
import { Plus, Trash2, MessageSquare } from 'lucide-react';
import clsx from 'clsx';
import type { Conversation } from '../lib/types';
```

### 6.7 Header Component

**File: `src/components/Header.tsx`**

Top bar with app title, theme toggle, and mobile menu:

import React from 'react';
import { Sun, Moon, Menu } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../hooks/useTheme';
```

## Step 7: Update Root Layout

**File: `src/app/layout.tsx`**

Add ThemeProvider wrapper and proper HTML attributes:

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Chat',
  description: 'ChatGPT-like interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

## Step 8: Create Main Page

**File: `src/app/page.tsx`**

Compose all components into the main page:

import React, { useState } from 'react';
import Header from '../components/Header';
import ChatArea from '../components/ChatArea';
import InputArea from '../components/InputArea';
import Sidebar from '../components/Sidebar';
import { useConversations } from '../hooks/useConversations';
import { useTheme } from '../hooks/useTheme';
import clsx from 'clsx';
```

## Step 9: Configure TailwindCSS

**File: `src/app/globals.css`**

Add Tailwind directives and theme CSS variables:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light theme colors */
    --background: #ffffff;
    --foreground: #0f172a;
    --sidebar-bg: #f9fafb;
    --sidebar-border: #e5e7eb;
    --message-user-bg: #3b82f6;
    --message-user-text: #ffffff;
    --message-assistant-bg: #f3f4f6;
    --message-assistant-text: #1f2937;
    --input-bg: #ffffff;
    --input-border: #e5e7eb;
    --hover-bg: #f3f4f6;
  }

  .dark {
    /* Dark theme colors */
    --background: #212121;
    --foreground: #fafafa;
    --sidebar-bg: #171717;
    --sidebar-border: #404040;
    --message-user-bg: #3b82f6;
    --message-user-text: #ffffff;
    --message-assistant-bg: #404040;
    --message-assistant-text: #fafafa;
    --input-bg: #212121;
    --input-border: #404040;
    --hover-bg: #404040;
  }
}

* {
  @apply transition-colors duration-200;
}

body {
  @apply bg-background text-foreground;
}
```

**File: `tailwind.config.ts`**

Add darkMode configuration (may need to create or modify):

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};

export default config;
```

## Step 10: Verification Process

### 10.1 Type Check
```bash
npx tsc --noEmit
```
Expected: Zero TypeScript errors

### 10.2 Build
```bash
npm run build
```
Expected: Build succeeds with zero errors

### 10.3 Lint
```bash
npm run lint
```
Expected: All linting passes

### 10.4 Manual Testing (run dev server)
```bash
npm run dev
```

Verify:
1. **Theme Toggle**: Switch between dark/light modes, persists on refresh
2. **Chat Area**: Messages display correctly, user right-aligned, assistant left-aligned
3. **Markdown Rendering**: Bold, italic, headers, lists render properly
4. **Code Blocks**: Syntax highlighting works, copy button functions
5. **Typing Indicator**: Show while assistant "thinks", disappears after response
6. **Input Area**: Textarea grows with content, Enter sends, Shift+Enter new line
7. **Sidebar**: New chat button works, conversations list, clicking loads messages, delete works
8. **Empty State**: Shows "How can I help you today?" when no messages
9. **Auto-scroll**: Chat scrolls to latest message automatically
10. **Mobile Responsive**: Sidebar hidden by default, hamburger menu toggles overlay
11. **Keyboard Navigation**: Tab navigation works, Enter sends message

## Summary of Files to Create

| File | Type | Purpose |
|------|------|---------|
| `src/lib/types.ts` | Create | TypeScript interfaces |
| `src/lib/mockResponses.ts` | Create | Mock AI response generator |
| `src/hooks/useTheme.ts` | Create | Theme management hook |
| `src/components/ThemeProvider.tsx` | Create | Theme context provider |
| `src/hooks/useConversations.ts` | Create | Conversation state management |
| `src/components/CodeBlock.tsx` | Create | Code syntax highlighting |
| `src/components/TypingIndicator.tsx` | Create | Animated typing indicator |
| `src/components/MessageBubble.tsx` | Create | Single message component |
| `src/components/ChatArea.tsx` | Create | Message list container |
| `src/components/InputArea.tsx` | Create | Text input component |
| `src/components/Sidebar.tsx` | Create | Conversation list |
| `src/components/Header.tsx` | Create | Top navigation bar |

## Summary of Files to Modify

| File | Changes |
|------|---------|
| `src/app/layout.tsx` | Add ThemeProvider wrapper |
| `src/app/page.tsx` | Compose all components |
| `src/app/globals.css` | Add Tailwind directives and CSS variables |
| `tailwind.config.ts` | Add darkMode: 'class' configuration |
# Implementation Plan: ChatGPT-like Web Interface

| File | Changes |
|------|---------|
| `src/app/layout.tsx` | Add ThemeProvider wrapper |
| `src/app/page.tsx` | Compose all components |
| `src/app/globals.css` | Add Tailwind directives and CSS variables |
| `tailwind.config.ts` | Add darkMode: 'class' configuration |