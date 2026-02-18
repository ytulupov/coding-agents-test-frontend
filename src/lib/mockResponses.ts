import { v4 as uuidv4 } from 'uuid';
import { Message } from './types';

const mockTemplates = [
  `Here's some helpful information about your question.

**Key Points:**
- This is a demonstration of the chat interface
- All responses are generated on the client side
- The interface supports multiple features

**Example Code:**
\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

Let me know if you have any other questions!`,

  `Great question! Let me break this down for you.

The concept you're asking about is fundamental to modern web development. Here's a practical example:

\`\`\`python
def calculate_fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return calculate_fibonacci(n - 1) + calculate_fibonacci(n - 2)

# Print first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {calculate_fibonacci(i)}")
\`\`\`

**Additional considerations:**
1. Performance optimization using memoization
2. Error handling for negative inputs
3. Documentation and type annotations

Is there anything specific you'd like me to explain further?`,

  `I'd be happy to help with that!

Based on what you've described, here's a recommended approach:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
}
\`\`\`

**Next steps:**
- Implement error handling
- Add loading states
- Consider caching strategies
- Write unit tests

Would you like me to elaborate on any of these points?`,

  `Excellent! Here's what I found:

*Markdown formatting supports:*
- **Bold text** and *italic text*
- Lists (both ordered and unordered)
- Headers like we're using here
- Code blocks with syntax highlighting

\`\`\`typescript
const features = [
  'Dark/Light theme',
  'Responsive design',
  'Auto-scrolling chat',
  'Copy code button',
  'Typing indicator'
];
\`\`\`

Feel free to ask follow-up questions!`,

  `Here's a comprehensive answer to your query:

**Overview:**
This demonstrates the full capabilities of the chat interface including rich text formatting and code blocks.

\`\`\`javascript
// Array operations example
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
const filtered = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

console.log({ doubled, filtered, sum });
\`\`\`

**Quick tip:** Use keyboard shortcuts for faster navigation - Shift+Enter for new lines, Enter to send messages.

Is there anything else you'd like to explore?`
];

const getRandomResponse = (): string => {
  const index = Math.floor(Math.random() * mockTemplates.length);
  return mockTemplates[index];
};

const generateRandomDelay = (): number => {
  return Math.random() * 2000 + 1000; // 1-3 seconds
};

export const createMockAssistantMessage = (): Message => {
  return {
    id: uuidv4(),
    role: 'assistant',
    content: getRandomResponse(),
    timestamp: Date.now()
  };
};

export const getMockResponseDelay = (): number => {
  return generateRandomDelay();
};