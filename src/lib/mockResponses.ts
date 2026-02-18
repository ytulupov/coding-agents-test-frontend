import { v4 as uuidv4 } from 'uuid';

export function generateMockResponse(): string {
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
    `I'll help you understand React hooks with this example:

\`\`\`typescript
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  );
}
\`\`\`

**React Hooks explained:**
- \`useState\`: Manage local state
- \`useEffect\`: Handle side effects
- Dependencies array controls when effects run`,
    `Here's a Python example for data processing:

\`\`\`python
from typing import List, Optional

def process_data(items: List[dict], key: str) -> List[str]:
    """Extract values from a list of dictionaries."""
    result = []
    for item in items:
        value = item.get(key)
        if value is not None:
            result.append(str(value))
    return result

# Usage
data = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
]
names = process_data(data, "name")
\`\`\`

**Python features demonstrated:**
- Type hints for better code clarity
- Error handling with optional keys
- List comprehension alternative available`
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

export function createAssistantMessage(): string {
  const id = uuidv4();
  return id;
}