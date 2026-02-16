const mock_responses: readonly string[] = [
  `I'd be happy to help you with your question! Here's a detailed response:

Let me break this down into key points for you:

- First, consider the main aspects of your request
- Second, think about how each component interacts
- Finally, implement the solution step by step

Here's an example code snippet to illustrate:

\`\`\`typescript
interface Example {
  id: string;
  value: number;
}

function processExample(data: Example): number {
  return data.value * 2;
}

// Usage
const example: Example = { id: '123', value: 42 };
console.log(processExample(example)); // Output: 84
\`\`\`

Is there anything specific you'd like me to clarify further?`,

  `Great question! Let me provide you with a comprehensive answer.

## Understanding the Concept

The key points to understand are:

1. **Core functionality** - This is the foundation
2. **Edge cases** - Always consider them
3. **Performance** - Keep it in mind

## Code Example

Here's a practical example:

\`\`\`python
def calculate fibonacci(n: int) -> int:
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    return calculate_fibonacci(n - 1) + calculate_fibonacci(n - 2)

# Better approach with memoization
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci_optimized(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci_optimized(n - 1) + fibonacci_optimized(n - 2)
\`\`\`

Let me know if you need more details!`,

  `I'll help you understand this topic better.

Here's what you need to know:

- Start with the basics and build up
- Practice makes perfect
- Don't be afraid to ask questions

## Implementation

Check out this example:

\`\`\`typescript
const tasks: Array<{ id: string; completed: boolean }> = [
  { id: '1', completed: false },
  { id: '2', completed: true },
];

function toggleTask(id: string): void {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
  }
}
\`\`\`

This demonstrates a simple task management pattern. Feel free to ask follow-up questions!`
];

export function generateMockResponse(user_message: string): string {
  // Return a different response based on the user message hash
  const hash = user_message.split('').reduce((acc, char) => {
    return (acc << 5) - acc + char.charCodeAt(0);
  }, 0);

  const index = Math.abs(hash) % mock_responses.length;
  return mock_responses[index] ?? mock_responses[0];
}

export function simulateAiResponse(
  user_message: string,
  delay_ms: number = 1500
): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockResponse(user_message));
    }, delay_ms);
  });
}