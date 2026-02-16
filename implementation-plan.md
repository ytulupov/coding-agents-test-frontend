Let me read the existing source files to understand the current project structure:
Let me also check the existing globals.css and look for any tailwind config:
Now I have a clear understanding of the existing project. Let me create a detailed implementation plan for building the ChatGPT-like web interface.</think>---

## Implementation Plan: ChatGPT-like Web Interface

Based on the existing Next.js 14+ project with TypeScript and TailwindCSS v4, here is a detailed step-by-step implementation plan:

---

### Phase 1: Install Dependencies

**File:** `package.json`

**Changes:**
- Add the following npm packages:
  - `react-markdown` - for Markdown rendering
  - `remark-gfm` - GitHub Flavored Markdown support
  - `react-syntax-highlighter` - for code syntax highlighting
  - `@types/react-syntax-highlighter` - TypeScript types for syntax highlighter
  - `lucide-react` - for icons
  - `uuid` - for ID generation
  - `clsx` and `tailwind-merge` - for conditional class merging

**Verification:** Run `npm install` to ensure all packages install correctly.

### Phase 2: Create Type Definitions

**New File:** `src/lib/types.ts`

**Changes:**
- Define `Message` interface with: `id`, `role` ('user' | 'assistant'), `content`, `timestamp`
- Define `Conversation` interface with: `id`, `title`, `messages` (array of Message), `preview` (string), `createdAt`

**Verification:** No `any` types, all interfaces fully typed.

### Phase 3: Create Utilities & Mock Data

**New File:** `src/lib/mockResponses.ts`

**Changes:**
- Create `generateMockResponse()` function that returns a mock markdown response with:
  - Text paragraphs
  - A code block (TypeScript or Python)
  - A bulleted list
- Create `getRandomDelay()` function returning 1000-3000ms for simulating network delay
- Create `generateConversationTitle()` function to generate titles from first message

**New File:** `src/lib/utils.ts`

**Changes:**
- Create `cn()` utility function (using clsx and tailwind-merge) for merging classes

**Verification:** All functions properly typed with TypeScript.

### Phase 4: Create Custom Hooks

**New File:** `src/hooks/useTheme.ts`

**Changes:**
- Create React context `ThemeContext` with type: `{ theme: 'light' | 'dark', toggleTheme: () => void }`
- Implement `useTheme` hook that:
  - Reads theme from localStorage on mount
  - Falls back to system preference via `matchMedia('(prefers-color-scheme: dark)')`
  - Toggles theme and updates localStorage
  - Adds/removes 'dark' class on document.documentElement

**New File:** `src/hooks/useConversations.ts`

**Changes:**
- Create `useConversations` hook with:
  - State: `conversations` (array), `activeConversationId` (string | null), `isLoading` (boolean)
  - `createNewConversation()`: Creates new conversation with generated ID
  - `deleteConversation(id)`: Removes conversation by ID
  - `setActiveConversation(id)`: Sets active conversation
  - `sendMessage(content)`: Adds user message, simulates delay with typing indicator, adds mock response
  - `getActiveConversation()`: Returns current active conversation
- Store conversations in localStorage for persistence

**Verification:** All hooks properly typed, no `any` types.

### Phase 5: Create Theme Provider Component

**New File:** `src/components/ThemeProvider.tsx`

**Changes:**
- Create `ThemeProvider` component wrapping children
- Uses `useTheme` hook logic internally as a context provider
- Add `'use client'` directive at top

**Verification:** Properly exports `ThemeProvider` and `useTheme`.

### Phase 6: Create UI Components

**New File:** `src/components/CodeBlock.tsx`

**Changes:**
- Component props: `{ language, code, onCopy }`
- Uses `react-syntax-highlighter` with dark/light theme support
- Renders code with syntax highlighting
- Includes "Copy" button with icon from lucide-react
- Copy to clipboard functionality with success feedback

**New File:** `src/components/TypingIndicator.tsx`

**Changes:**
- Renders animated dots (CSS animation or using Tailwind)
- Three bouncing dots to simulate "thinking" state
- Centered horizontally

**New File:** `src/components/MessageBubble.tsx`

**Changes:**
- Props: `{ message }` where message is of type `Message`
- Renders different styles for user vs assistant messages:
  - User: right-aligned, blue/green bubble
  - Assistant: left-aligned, gray/dark bubble
- Uses `react-markdown` with `remark-gfm` for assistant messages
- Custom renderers for code blocks using `CodeBlock` component
- Responsive width with max-width constraints

**New File:** `src/components/ChatArea.tsx`

**Changes:**
- Props: `{ messages, isLoading }`
- Scrollable message list with auto-scroll to bottom
- Renders list of `MessageBubble` components
- Shows `TypingIndicator` when `isLoading` is true
- Shows empty state ("How can I help you today?") when no messages
- Uses ref and `useEffect` for auto-scroll behavior

**New File:** `src/components/InputArea.tsx`

**Changes:**
- Props: `{ onSend, disabled }`
- Multiline textarea with:
  - Auto-growing height (using `ref` and `onInput`)
  - Max 6 lines, then scroll appears
  - Disabled state (grayed out when no text)
- Send button (PaperPlane icon from lucide-react):
  - Disabled when textarea is empty
  - Enabled when text present
- Keyboard handlers:
  - Enter sends message
  - Shift+Enter creates new line
- Clears textarea after sending
- Uses `cn()` utility for conditional classes

**New File:** `src/components/Sidebar.tsx`

**Changes:**
- Props: `{ conversations, activeConversationId, onSelectConversation, onNewConversation, onDeleteConversation, isOpen, isMobile, onToggle }`
- "New Chat" button at top with Plus icon
- List of conversations:
  - Each shows title and truncated preview
  - Active conversation highlighted
  - Hover shows delete button (Trash icon)
  - Click to select conversation
- Responsive behavior:
  - Desktop: Always visible, fixed width (e.g., 260px)
  - Mobile/Tablet: Overlay/sidebar with close button
- Uses `clsx`/`tailwind-merge` for conditional classes

**New File:** `src/components/Header.tsx`

**Changes:**
- Props: `{ theme, toggleTheme, onToggleSidebar }`
- App title/logo (e.g., "ChatUI")
- Theme toggle button (Sun/Moon icons from lucide-react)
- Hamburger menu button for mobile (Menu icon)
- Responsive: hamburger only visible on mobile

**Verification:** All components properly typed and implement required features.

### Phase 7: Update App Files

**File:** `src/app/globals.css`

**Changes:**
- Add theme CSS variables for smooth transitions:
  - `--bg-primary`, `--bg-secondary`, `--text-primary`, `--text-secondary`
  - `--accent-color`, etc.
- Add smooth transition: `transition: background-color 0.3s, color 0.3s;` on `body`
- Add CSS for typing indicator animation
- Ensure Tailwind dark mode works with class-based toggling

**File:** `src/app/layout.tsx`

**Changes:**
- Import `ThemeProvider`
- Wrap `children` with `ThemeProvider`
- Update metadata: title to "ChatGPT-like Interface"
- Update `html` element with `suppressHydrationWarning` to prevent hydration mismatch

**File:** `src/app/page.tsx`

**Changes:**
- Complete rewrite to compose all components
- Use `useConversations` hook for state management
- State: `isSidebarOpen` (for mobile), `isMobile` (detected via media query or window width)
- Layout:
  - Header at top (full width)
  - Sidebar on left (collapsible on mobile)
  - Main content area:
    - ChatArea (fills available space)
    - InputArea (at bottom)
- Responsive grid/flex layout

**Verification:** Main page renders all components, sidebar toggles on mobile.

### Phase 8: Verification Steps

After implementation, verify:

1. **Type Checking:**
   ```bash
   npx tsc --noEmit
   ```
   Must exit with code 0 (no TypeScript errors)

2. **Build:**
   ```bash
   npm run build
   ```
   Must exit with code 0 (zero errors)

3. **Linting:**
   ```bash
   npm run lint
   ```
   Must pass with zero errors/warnings

4. **Functional Testing:**
   - App loads and displays correctly
   - Sidebar shows conversations, "New Chat" button works
   - Clicking a conversation loads its messages
   - Sending a message shows typing indicator, then mock response
   - Messages render with markdown, code blocks with copy button
   - Theme toggle switches between light/dark, persists after refresh
   - Mobile: sidebar toggles with hamburger menu
   - Desktop: sidebar always visible
   - Keyboard: Enter sends, Shift+Enter new lines
   - Auto-scroll to new messages works
   - Delete conversation removes it from list
   - Empty state shows when no messages

5. **Integration Check:**
   - All newly created files are imported by existing files (`page.tsx`, `layout.tsx`)
   - No orphaned/dead code

### File Structure Summary

```
src/
  app/
    layout.tsx          [MODIFY] - Add ThemeProvider wrapper
    page.tsx            [MODIFY] - Complete composition of all components
    globals.css         [MODIFY] - Add theme variables, animations
  components/
    ChatArea.tsx        [CREATE] - Message list with scroll
    MessageBubble.tsx   [CREATE] - Single message with markdown/code
    InputArea.tsx       [CREATE] - Textarea + send button
    Sidebar.tsx         [CREATE] - Conversation list
    Header.tsx          [CREATE] - Top bar with theme toggle
    TypingIndicator.tsx [CREATE] - Animated dots
    CodeBlock.tsx       [CREATE] - Code with syntax highlighting
    ThemeProvider.tsx   [CREATE] - Dark/light theme context
  lib/
    mockResponses.ts    [CREATE] - Mock AI response generator
    types.ts            [CREATE] - TypeScript interfaces
    utils.ts            [CREATE] - cn() utility function
  hooks/
    useConversations.ts [CREATE] - Conversation state management hook
    useTheme.ts         [CREATE] - Theme toggle hook with localStorage
```

This plan addresses all required features while following the strict constraints: TypeScript (strict mode, no `any` types), Next.js 14+ App Router, TailwindCSS only for styling, allowed npm packages only, and all React state/context only (no external state libraries).
Now I have a clear understanding of the existing project. Let me create a detailed implementation plan for building the ChatGPT-like web interface.</think>---

This plan addresses all required features while following the strict constraints: TypeScript (strict mode, no `any` types), Next.js 14+ App Router, TailwindCSS only for styling, allowed npm packages only, and all React state/context only (no external state libraries).