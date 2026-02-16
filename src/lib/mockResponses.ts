const mockResponses: Record<string, string> = {
  default: `Here's a response that includes **markdown formatting**, a code block, and a bulleted list:

## Example Code

Here's a TypeScript function for generating unique IDs:

\`\`\`typescript
function generateUniqueId(): string {
  return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36);
}

console.log(generateUniqueId()); // e.g., "id-x8y2z3w4-1k9m2n"
\`\`\`

### Key Points

- This function uses random characters for uniqueness
- The timestamp adds extra randomness
- It returns a string ready to use in your code
- *Perfect* for database keys or temporary identifiers

Feel free to ask if you have any questions about this code or need something else!`,
  hello: `Hello! 👋

I'm here to help you with your questions. Here's a quick code example:

\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("World"))
\`\`\`

**Things I can help with:**
- Writing code snippets
- Explaining concepts
- Debugging issues
- Answering questions

What would you like to know?`,
  code: `Here's some example code for you!

## JavaScript Array Methods

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// Map: transform each element
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Filter: select elements
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// Reduce: aggregate to single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15
\`\`\`

These are fundamental array methods you'll use often.
- \`map()\` transforms arrays
- \`filter()\` selects subsets
- \`reduce()\` combines elements

*Happy coding!*`,
  help: `I'd be happy to help! Here are some things I can do:

1. **Write code** - Generate snippets in various languages
2. **Explain concepts** - Break down complex topics
3. **Debug issues** - Help find and fix problems
4. **Answer questions** - Provide information on many topics

## Example: React Component

\`\`\`typescript
import { useState } from 'react';

interface CounterProps {
  initial?: number;
}

export default function Counter({ initial = 0 }: CounterProps) {
  const [count, setCount] = useState(initial);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

Just let me know what you need!`,
};

export async function getMockResponse(userMessage: string): Promise<string> {
  // Simulate a delay of 1-3 seconds
  const delay = Math.random() * 2000 + 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const lowerMessage = userMessage.toLowerCase();

  // Check for keywords to return specific responses
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return mockResponses.hello;
  }
  if (lowerMessage.includes("code") || lowerMessage.includes("function") || lowerMessage.includes("example")) {
    return mockResponses.code;
  }
  if (lowerMessage.includes("help") || lowerMessage.includes("can you do")) {
    return mockResponses.help;
  }

  // Default response
  return mockResponses.default;
}