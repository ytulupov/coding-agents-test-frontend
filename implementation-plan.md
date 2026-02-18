# ChatGPT-like Web Interface - Implementation Plan

## Overview
This plan outlines building a ChatGPT-like chat interface with Next.js 14+, TypeScript, and TailwindCSS. The implementation will include all required features: message list with markdown rendering, code blocks with syntax highlighting, conversation management, dark/light theme, responsive design, and mock AI responses.

---

## Phase 1: Install Dependencies

### Step 1.1: Install Required Packages
```bash
npm install react-markdown remark-gfm lucide-react clsx tailwind-merge
npm install react-syntax-highlighter @types/react-syntax-highlighter
npm install uuid @types/uuid
```

**Verification:** No npm install errors, packages appear in `package.json` under dependencies.

## Phase 2: Core Type Definitions

### Step 2.1: Create `src/lib/types.ts`
Define TypeScript interfaces for the application:
- `Message` interface (id, role, content, timestamp)
- `Conversation` interface (id, title, messages, createdAt, updatedAt)
- Export types

**Verification:** No TypeScript type errors

## Phase 3: Mock AI Responses

### Step 3.1: Create `src/lib/mockResponses.ts`
Implement mock response generator:
- Function to generate mock markdown responses with code blocks
- Include text paragraphs, code examples, bulleted lists
- Simulate random delay (1-3 seconds)

**Verification:** Function returns properly formatted strings

## Phase 4: Theme System

### Step 4.1: Create `src/hooks/useTheme.ts`
Implement custom hook for theme management:
- `useTheme()` hook that reads/writes to localStorage
- Toggle function for dark/light mode
- Initialize from system preference if no saved preference

### Step 4.2: Create `src/components/ThemeProvider.tsx`
Create context provider component:
- ThemeContext with theme and toggle function
- Add 'dark' class to html element when dark mode
- Wrap children in provider

**Verification:** Theme persists across page reloads, toggle works correctly

## Phase 5: Global Styles

### Step 5.1: Modify `src/app/globals.css`
Add Tailwind directives and CSS variables:
- Tailwind directives(@tailwind)
- Custom CSS variables for theme colors
- scrollbar styling
- smooth transitions for theme switch

**Verification:** Tailwind classes work, dark/light colors apply correctly

## Phase 6: State Management Hooks

### Step 6.1: Create `src/hooks/useConversations.ts`
Implement conversation state management:
- State for list of conversations and active conversation ID
- Functions for:
  - Creating new conversation
  - Selecting conversation
  - Adding messages to conversation
  - Deleting conversation
  - Persisting to localStorage

**Verification:** Conversations persist across reloads, operations work correctly

## Phase 7: Custom UI Components

### Step 7.1: Create `src/components/TypingIndicator.tsx`
Animated typing indicator:
- Three animated dots
- CSS animation for bouncing effect

### Step 7.2: Create `src/components/CodeBlock.tsx`
Code block with syntax highlighting:
- Use `react-syntax-highlighter` based on language
- Copy button that copies code to clipboard
- Language indicator

### Step 7.3: Create `src/components/MessageBubble.tsx`
Single message component:
- Conditional styling for user vs assistant
- User: right-aligned, colored bubble
- Assistant: left-aligned, different color
- Markdown rendering for assistant messages
- Code highlighting via CodeBlock component
- Timestamp display

### Step 7.4: Create `src/components/ChatArea.tsx`
Main chat message area:
- Scrollable message list
- Auto-scroll to latest message
- Render MessageBubble for each message
- Show TypingIndicator when loading
- Empty state with "How can I help you today?"

### Step 7.5: Create `src/components/InputArea.tsx`
Message input component:
- Auto-growing textarea (max 6 lines)
- Send button (paper plane icon from lucide-react)
- Disabled state when textarea is empty
- Send on Enter, new line on Shift+Enter
- Clear textarea after sending

### Step 7.6: Create `src/components/Header.tsx`
Top header component:
- App title/logo
- Dark/light theme toggle button
- Hamburger menu button for mobile sidebar toggle

### Step 7.7: Create `src/components/Sidebar.tsx`
Conversation sidebar component:
- "New Chat" button with + icon at top
- List of conversations with:
  - Title display
  - Last message preview (truncated)
  - Highlight for active conversation
  - Delete button on hover
- Click to load conversation
- Responsive behavior (hidden on mobile, visible on desktop)

**Verification:** Each component renders correctly, proper TypeScript typing, appropriate styling

## Phase 8: Main Page Layout

### Step 8.1: Modify `src/app/layout.tsx`
Update root layout:
- Import ThemeProvider
- Wrap children in ThemeProvider
- Set proper metadata

### Step 8.2: Modify `src/app/page.tsx`
Create main page component:
- Import all custom components
- Import state management hooks
- Layout: sidebar + main content area (header + chat + input)
- Integrate useConversations for state
- Handle sidebar toggle state for mobile
- Wire up message sending with mock responses

**Verification:** Page renders with all components, interactions function correctly

## Phase 9: Verification and Testing

### Step 9.1: Type Checking
```bash
npx tsc --noEmit
```
**Expected:** Zero errors, exit code 0

### Step 9.2: Build
```bash
npm run build
```
**Expected:** Build succeeds with zero errors

### Step 9.3: Linting
```bash
npm run lint
```
**Expected:** Zero errors and warnings

### Step 9.4: Manual Testing Checklist
- [ ] Dark/light theme toggle works and persists
- [ ] Create new chat works
- [ ] Sending messages works
- [ ] Typing indicator shows during mock delay
- [ ] Messages render with markdown and code highlighting
- [ ] Code copy button works
- [ ] Delete conversation works
- [ ] Switch between conversations works
- [ ] Sidebar toggles on mobile
- [ ] Responsive design works on desktop/tablet/mobile
- [ ] Enter sends, Shift+Enter creates new line
- [ ] Auto-scroll to latest message

## File Creation/Modification Summary

| Phase | File | Action |
|-------|------|--------|
| 1 | `package.json` | Modify: add dependencies |
| 2 | `src/lib/types.ts` | Create |
| 3 | `src/lib/mockResponses.ts` | Create |
| 4 | `src/hooks/useTheme.ts` | Create |
| 4 | `src/components/ThemeProvider.tsx` | Create |
| 5 | `src/app/globals.css` | Modify |
| 6 | `src/hooks/useConversations.ts` | Create |
| 7 | `src/components/TypingIndicator.tsx` | Create |
| 7 | `src/components/CodeBlock.tsx` | Create |
| 7 | `src/components/MessageBubble.tsx` | Create |
| 7 | `src/components/ChatArea.tsx` | Create |
| 7 | `src/components/InputArea.tsx` | Create |
| 7 | `src/components/Header.tsx` | Create |
| 7 | `src/components/Sidebar.tsx` | Create |
| 8 | `src/app/layout.tsx` | Modify |
| 8 | `src/app/page.tsx` | Modify |

**Total Files:** 2 modified + 12 created = 14 changes
# ChatGPT-like Web Interface - Implementation Plan

**Total Files:** 2 modified + 12 created = 14 changes