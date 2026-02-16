/**
 * Generates a random delay between 1000-3000ms to simulate network latency
 */
export function getRandomDelay(): number {
  return Math.floor(Math.random() * 2000) + 1000;
}

/**
 * Mock AI responses with markdown content
 */
const mockResponses = [
  `Here's a TypeScript example that demonstrates async/await patterns:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
}

// Usage
const user = await fetchUser(1);
console.log(user.name);
\`\`\`

Key points about this code:
- The function is marked as \`async\` to allow await syntax
- \`Promise<User>\` indicates the return type
- Error handling with try/catch is recommended
- Always check \`response.ok\` before parsing JSON`,

  `I can help you with that! Here's a Python function to calculate factorial:

\`\`\`python
def factorial(n: int) -> int:
    """Calculate the factorial of a positive integer."""
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)

# Example usage
print(factorial(5))  # Output: 120
\`\`\`

Some important notes:
- This uses **recursion** to solve the problem
- The base case handles 0 and 1
- Try/catch blocks can handle errors elegantly
- For large numbers, consider using iteration instead`,

  `Great question! Let me explain the concept with a simple example:

When working with arrays in JavaScript, you often need to transform data. The \`map()\` function is perfect for this.

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const withIndex = numbers.map((num, index) => ({
  value: num,
  position: index
}));
\`\`\`

Useful array methods:
- **map()**: Transform each element
- **filter()**: Select elements that match a condition
- **reduce()**: Combine all elements into a single value
- **find()**: Get the first matching element`
];

/**
 * Generates a mock markdown response
 */
export function generateMockResponse(): string {
  const index = Math.floor(Math.random() * mockResponses.length);
  return mockResponses[index];
}

/**
 * Generates a conversation title from the first user message
 */
export function generateConversationTitle(message: string): string {
  const maxLength = 30;
  const cleaned = message
    .replace(/[?!.,;:]/g, '')
    .trim()
    .substring(0, maxLength);
  return cleaned.length === maxLength
    ? cleaned + '...'
    : cleaned || 'New Conversation';
}