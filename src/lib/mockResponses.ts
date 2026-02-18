export interface MockResponse {
  content: string;
}

const mockTemplates: string[] = [
  `Of course! Here's an example of what you're looking for.

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);
\`\`\`

Here are some key points:

- The function uses TypeScript type annotations
- It takes a \`name\` parameter of type string
- Returns a formatted string
- Uses template literals for string interpolation

Let me know if you need more details!`,

  `Great question! Let me break this down for you.

\`\`\`python
def calculate_fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return calculate_fibonacci(n - 1) + calculate_fibonacci(n - 2)

# Print first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {calculate_fibonacci(i)}")
\`\`\`

This demonstrates:

- Recursive function definition
- Base case handling
- Type hints in Python
- Loop iteration

Is there anything specific you'd like me to explain further?`,

  `Here's a simple implementation.

\`\`\`javascript
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Usage example
const debouncedSearch = debounce((query) => {
  console.log("Searching for: " + query);
}, 300);

debouncedSearch("hello");
debouncedSearch("hello world"); // Only this will execute
\`\`\`

Key features of this debounce function:

1. **Closure**: Maintains timeoutId access
2. ** clearTimeout**: Cancels previous calls
3. **Spread operator**: Preserves arguments
4. **Apply**: Maintains 'this' context

Need help implementing anything else?`,

  `Absolutely! Let me show you both approaches.

**Option 1: Using async/await**
\`\`\`typescript
async function fetchData(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  return response.json();
}
\`\`\`

**Option 2: Using Promises directly**
\`\`\`typescript
function fetchData(url: string) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      return response.json();
    });
}
\`\`\`

When to use each:

- **async/await**: More readable, sequential operations
- **Promises**: Better for parallel operations with \`Promise.all\`

Both are great choices depending on your use case!`
];

export function generateMockResponse(): string {
  const randomIndex = Math.floor(Math.random() * mockTemplates.length);
  return mockTemplates[randomIndex];
}

export async function getMockResponse(): Promise<string> {
  const delay = Math.random() * 2000 + 1000; // Random delay between 1-3 seconds
  await new Promise(resolve => setTimeout(resolve, delay));
  return generateMockResponse();
}