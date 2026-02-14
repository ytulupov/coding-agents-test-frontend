export function generateMockResponse(userMessage: string): string {
  const responses = [
    `I understand you said: "${userMessage}". Here's a response with some useful information.\n\nFirst, let me explain the concept:\n\nThis is a **mock response** designed to demonstrate the chat interface. The interface supports:\n\n- Markdown rendering with *bold* and _italic_ text\n- Code blocks with syntax highlighting\n- Proper message formatting\n\nHere's an example code snippet:\n\n\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`;
}

const exampleUser: User = {
  id: '1',
  name: 'Alice',
  email: 'alice@example.com',
};

console.log(greetUser(exampleUser));
\`\`\`\n\nLet me know if you need any additional help!`,

    `Great question! Let me help you with that.\n\n## Getting Started\n\nTo begin, you'll need to understand the key concepts:\n\n1. First point to consider\n2. Second important detail\n3. Third thing to remember\n\n### Code Example\n\n\`\`\`typescript
// Example TypeScript function
function calculateSum(numbers: number[]): number {
  return numbers.reduce((sum, num) => sum + num, 0);
}

const result = calculateSum([1, 2, 3, 4, 5]);
console.log(result); // Output: 15
\`\`\`\n\nI hope this helps! Feel free to ask follow-up questions.`,

    `Thanks for your message! I'd be happy to help.\n\nHere are some key points to keep in mind:\n\n- **Start simple**: Break down complex problems into smaller parts\n- **Practice regularly**: Consistency is key to improvement\n- **Ask questions**: Don't hesitate to seek clarification\n\n### Example Implementation\n\n\`\`\`python
class ChatMessage:
    def __init__(self, role: str, content: str):
        self.role = role
        self.content = content

    def to_dict(self):
        return {
            'role': self.role,
            'content': self.content
        }

message = ChatMessage('assistant', 'Hello there!')
print(message.to_dict())
\`\`\`\n\nLet me know if there's anything else you'd like to discuss!`,

    `That's an interesting point! Let me provide a detailed response.\n\nWhen approaching this topic, consider the following aspects:\n\n- **Understanding the context** is crucial\n- **Planning ahead** saves time in the long run\n- **Testing thoroughly** ensures quality results\n\n## Sample Code\n\n\`\`\`typescript
async function fetchData(url: string): Promise<unknown> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
\`\`\`\n\nIs there anything specific I can help you with?`,
  ];

  // Select a response based on a simple hash of the user message
  const index = userMessage.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % responses.length;
  return responses[index];
}

export function getDelayTime(): number {
  return Math.random() * 2000 + 1000; // 1-3 seconds
}