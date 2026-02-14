# Implementation Plan: ChatGPT-like Web Interface

Let me first examine the current project structure to understand what already exists.
Let me check the existing source files to understand what's already there.
---

Based on my analysis of the existing Next.js project with TypeScript 5, strict mode, and TailwindCSS v4, here is the detailed implementation plan:

## Prerequisites

**Install required npm packages:**
```bash
npm install react-markdown remark-gfm react-syntax-highlighter lucide-react uuid tailwind-merge clsx
npm install --save-dev @types/react-syntax-highlighter
```

---

## File Creation and Modification Plan

### Phase 1: Setup and Dependencies

#### 1. Install npm packages
- Install: `react-markdown`, `remark-gfm`, `react-syntax-highlighter`, `lucide-react`, `uuid`, `tailwind-merge`, `clsx`
- Install dev: `@types/react-syntax-highlighter`

### Phase 2: Type Definitions (lib/types.ts)

#### 2. Create `src/lib/types.ts`
**New file** - Define TypeScript interfaces
```typescript
export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Phase 3: Utility Libraries

#### 3. Create `src/lib/mockResponses.ts`
**New file** - Mock AI response generator
- Function: `generateMockResponse(userMessage: string): string` - Returns markdown response with paragraphs (3), code block (TypeScript), and bulleted list

#### 4. Create `src/lib/utils.ts`
**New file** - Utility function for class merging
- Function: `cn(...inputs: ClassValue[]): string` - Uses `clsx` and `tailwind-merge` for conditional class names

### Phase 4: Custom Hooks

#### 5. Create `src/hooks/useTheme.ts`
**New file** - Theme toggle hook with localStorage persistence
- Hook returns: `theme: 'light' | 'dark'`, `toggleTheme: () => void`
- Read from localStorage on mount, default to 'light'
- Persist to localStorage on change

#### 6. Create `src/hooks/useConversations.ts`
**New file** - Conversation state management hook
- State: `conversations: Conversation[]`, `activeConversationId: string | null`
- Functions: `createConversation()`, `deleteConversation()`, `selectConversation()`, `addMessage()`, `getActiveConversation()`
- Initial state: one empty conversation

### Phase 5: Base Components

#### 7. Create `src/components/ThemeProvider.tsx`
**New file** - Theme context provider
- Context: `ThemeContext` with `theme` and `toggleTheme`
- Provider component applies `dark` class to html element when theme is dark
- Use `useEffect` to sync DOM class with theme state

#### 8. Create `src/components/TypingIndicator.tsx`
**New file** - Animated dots component
- Three dots pulsing with CSS animations (`@keyframes pulse`)
- Styled with Tailwind: three span elements with opacity animations

#### 9. Create `src/components/CodeBlock.tsx`
**New file** - Code block with syntax highlighting and copy button
- Props: `code: string`, `language?: string`
- Uses `react-syntax-highlighter` for syntax highlighting
- Copy button with state: `copied: boolean` (resets after 2 seconds)
- Tailwind styling for code block container with dark/light theme support

### Phase 6: Message Components

#### 10. Create `src/components/MessageBubble.tsx`
**New file** - Single message bubble component
- Props: `message: Message`
- User messages: right-aligned, blue-600 text in bg-blue-50, rounded-tl-lg
- Assistant messages: left-aligned, bg-gray-100 dark:bg-gray-800, rounded-tr-lg
- Uses `react-markdown` with `remarkGfm` for markdown rendering
- Custom renderer for `code` elements (passes to `CodeBlock` component)

### Phase 7: Chat UI Components

#### 11. Create `src/components/ChatArea.tsx`
**New file** - Main message list with auto-scroll
- Props: `messages: Message[]`, `isTyping: boolean`
- Uses ref for scroll container: `const messagesEndRef = useRef<HTMLDivElement>(null)`
- Auto-scroll to bottom when messages or isTyping changes
- Empty state: centered "How can I help you today?" when no messages
- Shows `TypingIndicator` when `isTyping` is true

#### 12. Create `src/components/InputArea.tsx`
**New file** - Textarea input with send button
- Props: `onSendMessage: (content: string) => void`, `disabled: boolean`
- Textarea state: `input: string`, `autoResize: boolean`
- Auto-grow behavior: adjust `rows` based on content (max 6 lines)
- Send button: disabled when `input` is empty or `disabled` prop is true
- Keyboard: Enter sends, Shift+Enter adds newline
- Icons from `lucide-react`: `Send` icon

### Phase 8: Layout Components

#### 13. Create `src/components/Header.tsx`
**New file** - Top header bar
- Props: `onToggleSidebar: () => void`, `isMobile: boolean`
- App title: "AI Chat"
- Theme toggle button with icons: `Sun` (for light) / `Moon` (for dark)
- Hamburger menu button: `Menu` icon (shown only on mobile)
- Flex layout with proper spacing

#### 14. Create `src/components/Sidebar.tsx`
**New file** - Conversation list sidebar
- Props: 
  - `conversations: Conversation[]`
  - `activeConversationId: string | null`
  - `onSelectConversation: (id: string) => void`
  - `onNewConversation: () => void`
  - `onDeleteConversation: (id: string) => void`
  - `isOpen: boolean`, `onClose: () => void` (for mobile)
- New Chat button at top with `Plus` icon
- List of conversations with:
  - Title (truncated if too long)
  - Last message preview (truncated)
  - Delete button (`Trash2` icon) shown on hover
  - Active conversation highlighted
- Responsive: overlay on mobile, persistent on desktop

### Phase 9: Main Page Integration

#### 15. Modify `src/app/page.tsx`
**Replace entire file** - Main page composing all components
- Import all components and hooks
- Use `useConversations` hook for state management
- Use `useTheme` hook for theme toggle
- Manage `isTyping: boolean` state during mock response delay
- Layout: Grid with sidebar (col-span-1) and chat area (col-span-4)
- Mobile: conditional rendering of sidebar based on `sidebarOpen` state
- Handle message sending: add user message, set typing, wait 1-3s, add assistant response

### Phase 10: Layout and Theme Setup

#### 16. Modify `src/app/layout.tsx`
**Add ThemeProvider wrapper** around children
- Import `ThemeProvider`
- Update metadata: title "AI Chat", description "ChatGPT-like interface"
- Add `suppressHydrationWarning` to html element (for theme SSR compatibility)
- Wrap `{children}` with `<ThemeProvider>{children}</ThemeProvider>`

#### 17. Modify `src/app/globals.css`
**Add theme variables and code block styles**
- Dark mode configuration for Tailwind (using `class` strategy)
- Custom scrollbar styles for chat area
- Smooth transition for theme switch: `transition: background-color 0.3s, color 0.3s`
- Theme-specific colors for message bubbles
- Code block syntax highlighting overrides for light/dark themes
- Smooth CSS transition on `body` element

## Implementation Order

1. Install dependencies
2. Create type definitions (`lib/types.ts`)
3. Create utilities (`lib/mockResponses.ts`, `lib/utils.ts`)
4. Create hooks (`hooks/useTheme.ts`, `hooks/useConversations.ts`)
5. Create base components (`ThemeProvider.tsx`, `TypingIndicator.tsx`, `CodeBlock.tsx`)
6. Create message components (`MessageBubble.tsx`)
7. Create chat UI components (`ChatArea.tsx`, `InputArea.tsx`)
8. Create layout components (`Header.tsx`, `Sidebar.tsx`)
9. Integrate in main page (`page.tsx`)
10. Update layout with theme provider (`layout.tsx`)
11. Update global styles (`globals.css`)

## Verification Steps

**After each phase, verify:**

1. **Type check:** Run `npx tsc --noEmit` - must exit with code 0
2. **Build:** Run `npm run build` - must exit with code 0
3. **Lint:** Run `npm run lint` - must exit with code 0

**Final verification:**
1. Start dev server: `npm run dev`
2. Open browser at `http://localhost:3000`
3. Verify all features:
   - Theme toggle works and persists in localStorage
   - New chat button creates new conversation
   - Typing and sending messages works
   - Mock AI response appears after delay with typing indicator
   - Markdown and code blocks render correctly
   - Copy button on code blocks works
   - Sidebar conversation list updates
   - Deleting conversations works
   - Responsive design: test at desktop, tablet (1024px), and mobile (768px and smaller)
   - Keyboard accessibility: Tab navigation works, Enter sends messages
4. Run final type check, build, and lint - all must pass

## Critical Integration Notes

**All new files must be imported:**
- `lib/types.ts` → imported by `hooks/useConversations.ts`, `components/MessageBubble.tsx`, `components/ChatArea.tsx`
- `lib/mockResponses.ts` → imported by `app/page.tsx`
- `lib/utils.ts` → imported by `MessageBubble.tsx`, `CodeBlock.tsx`, `Sidebar.tsx`
- `hooks/useTheme.ts` → imported by `ThemeProvider.tsx`, `components/Header.tsx`
- `hooks/useConversations.ts` → imported by `app/page.tsx`
- `hooks/*` → all imported by `app/page.tsx`
- `components/*` → all imported by `app/page.tsx` or `app/layout.tsx`

**No file should remain unimported.**
---

**No file should remain unimported.**