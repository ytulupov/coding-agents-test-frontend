export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-4" role="status" aria-label="Assistant is typing">
      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Thinking</span>
      <span className="flex gap-1">
        <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </span>
    </div>
  );
}