I'll create a comprehensive implementation plan for building this ChatGPT-like web interface. Let me first explore the existing codebase structure.
Let me examine the existing source files and configuration:
Now I have a complete picture of the existing codebase. Let me also check if there's a tailwind configuration file.
Now I have all the information I need to create a comprehensive implementation plan. Let me summarize the current state and create a detailed plan.</think>## Implementation Plan for ChatGPT-like Web Interface

### Current State Analysis

The project is a Next.js 16.1.6 application with TypeScript and TailwindCSS 4 (inline theme) already set up. The project uses:
- React 19.2.3
- App Router (not Pages Router) ✓
- TailwindCSS with inline theme configuration via globals.css ✓
- ESLint with Next.js config
- TypeScript strict mode ✓

**No additional npm packages are currently installed.**

### Required Dependencies to Install

The following packages need to be installed via `npm install`:

```bash
npm install react-markdown remark-gfm react-syntax-highlighter lucide-react uuid clsx tailwind-merge
npm install --save-dev @types/react-syntax-highlighter
```

### File Creation and Modification Plan

#### Phase 1: Core Types & Utilities (Foundation)

**1. Create `src/lib/types.ts`** (NEW)
- Define `Message` interface with: `id`, `role` ('user' | 'assistant'), `content`, `timestamp`
- Define `Conversation` interface with: `id`, `title`, `messages[]`, `createdAt`, `updatedAt`

**2. Create `src/lib/mockResponses.ts`** (NEW)
- `getMockResponse(userMessage: string): Promise<string>` function
- Returns mock markdown response with paragraphs, code block, and bulleted list
- Simulates 1-3 second delay

**3. Create `src/lib/utils.ts`** (NEW)
- `cn()` function using `clsx` and `tailwind-merge` for conditional class names

#### Phase 2: Custom Hooks

**4. Create `src/hooks/useTheme.ts`** (NEW)
- `useTheme()` hook returning `{ theme, toggleTheme, setTheme }`
- Persists theme in localStorage
- Defaults to 'light' or system preference
- Applies 'dark' class to html element on mount

**5. Create `src/hooks/useConversations.ts`** (NEW)
- Manages conversation state with React hooks
- Functions: `createConversation()`, `deleteConversation()`, `selectConversation()`, `addMessage()`, `clearCurrentConversation()`
- Active conversation tracking
- Auto-generates conversation titles from first message

#### Phase 3: UI Components

**6. Create `src/components/ThemeProvider.tsx`** (NEW)
- Context provider for theme management
- Wraps children, provides theme value via useTheme hook
- Handles server-side rendering (no hydration mismatch)

**7. Create `src/components/CodeBlock.tsx`** (NEW)
- Receives code string and optional language
- Uses `react-syntax-highlighter` for highlighting
- Copy button to clipboard functionality
- Tailwind styling for code container

**8. Create `src/components/TypingIndicator.tsx`** (NEW)
- Three animated dots with CSS animation
- Styled as assistant message bubble

**9. Create `src/components/MessageBubble.tsx`** (NEW)
- Renders single message with appropriate styling (user=right/blue, assistant=left/gray)
- Uses `react-markdown` with `remark-gfm` for markdown rendering
- Custom renderer for code blocks using CodeBlock component
- Timestamp display

**10. Create `src/components/InputArea.tsx`** (NEW)
- Auto-growing textarea (max 6 lines)
- Send button icon (lucide-react `Send`)
- Disabled state when empty
- Handles Enter to send, Shift+Enter for new line
- Clears after sending
- Props: `onSendMessage(message: string)`, `disabled?: boolean`

**11. Create `src/components/ChatArea.tsx`** (NEW)
- Message list with flex column auto-scroll
- Renders MessageBubble components for each message
- Shows TypingIndicator when waiting for response
- Empty state centered: "How can I help you today?"
- Auto-scrolls to bottom when new messages arrive
- Reference to scroll container

**12. Create `src/components/Header.tsx`** (NEW)
- App title/logo
- Theme toggle button (lucide-react `Sun`/`Moon` icons)
- Hamburger menu button for mobile (lucide-react `Menu`)
- Props: `onMenuToggle()`, `showMenuButton?`

**13. Create `src/components/Sidebar.tsx`** (NEW)
- "New Chat" button with + icon (lucide-react `Plus`)
- List of conversations with titles
- Last message preview (truncated)
- Active conversation highlighting
- Click to load conversation
- Delete button (lucide-react `Trash2`) on hover
- Collapsible on mobile (overlay when open, hidden when closed)
- Props: `conversations[]`, `activeId`, `onNewChat()`, `onSelectChat(id)`, `onDeleteChat(id)`, `isOpen`, `onClose()`

#### Phase 4: App Integration

**14. Modify `src/app/globals.css`** (UPDATE)
- Add dark mode class selector (`.dark` prefix)
- Define theme color variables for light/dark modes
- Add smooth transition: `* { transition: background-color 0.3s ease, color 0.3s ease; }`
- Custom scrollbar styling for chat area
- Animation keyframes for typing indicator

**15. Modify `src/app/layout.tsx`** (UPDATE)
- Import ThemeProvider
- Wrap children in ThemeProvider
- Add meta tags for proper viewport
- Update metadata title/description

**16. Replace content of `src/app/page.tsx`** (UPDATE)
- Import all components and hooks
- Use useTheme hook for theme state
- Use useConversations hook for conversation management
- Main layout: Header at top, Sidebar + ChatArea side-by-side, InputArea at bottom
- Mobile: conditional sidebar overlay
- Handle sending messages: add user message → show typing → get mock response → add assistant message
- Handle conversation switching, creation, deletion

### Implementation Order

**Recommended sequence:**
1. Install dependencies
2. Phase 1: Types & Utilities (lib/)
3. Phase 2: Hooks (hooks/)
4. Phase 3: UI Components - bottom-up (CodeBlock → TypingIndicator → MessageBubble → InputArea → ChatArea → Header → Sidebar)
5. Phase 4: App Integration (layout.tsx → globals.css → page.tsx)

### Verification Steps

After each phase, verify:

1. **Type Checking**: `npx tsc --noEmit` - must exit with code 0
2. **Build**: `npm run build` - must succeed with zero errors
3. **Lint**: `npm run lint` - must pass (ESLint)
4. **Dev Server**: `npm run dev` - app should start without errors

**Final verification checklist:**
- [ ] App loads in browser
- [ ] Theme toggle works smoothly, persists on refresh
- [ ] New chat creates conversation
- [ ] Type message and press Enter sends it
- [ ] User message appears right-aligned with colored bubble
- [ ] Typing indicator shows during delay
- [ ] Assistant response appears left-aligned with markdown rendered
- [ ] Code blocks show syntax highlighting and copy button works
- [ ] Click conversation in sidebar loads its messages
- [ ] Delete conversation removes it from list
- [ ] Shift+Enter creates new line
- [ ] Mobile sidebar toggles with hamburger
- [ ] No TypeScript errors
- [ ] Build succeeds
- [ ] Lint passes

### Key Technical Decisions

1. **Theme Implementation**: Use class-based dark mode (`dark` class on html element) rather than data attribute for TailwindCSS compatibility
2. **State Management**: Use React context (ThemeProvider) and custom hooks - no external state library
3. **Auto-scroll**: Use React ref to scroll container and useEffect to scroll on messages change
4. **Textarea growth**: Use `rows` attribute with calculation based on content, max 6 rows
5. **Markdown**: Use `react-markdown` with custom components for code blocks
6. **Responsive**: Breakpoint at 768px for mobile behavior
7. **Performance**: Use `React.memo` on MessageBubble to prevent unnecessary re-renders

### Estimated Implementation Time

- Dependencies installation: 2 minutes
- Phase 1 (Types & Utils): 10 minutes
- Phase 2 (Hooks): 15 minutes
- Phase 3 (Components): 40 minutes
- Phase 4 (Integration): 15 minutes
- Testing & Refinement: 10 minutes

**Total: ~90 minutes**
Now I have all the information I need to create a comprehensive implementation plan. Let me summarize the current state and create a detailed plan.</think>## Implementation Plan for ChatGPT-like Web Interface

**Total: ~90 minutes**