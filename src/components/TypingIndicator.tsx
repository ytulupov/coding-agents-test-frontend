export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 p-3">
      <div className="flex gap-1">
        <span className="block h-2 w-2 rounded-full bg-gray-400 animate-bounce-dot" />
        <span className="block h-2 w-2 rounded-full bg-gray-400 animate-bounce-dot" />
        <span className="block h-2 w-2 rounded-full bg-gray-400 animate-bounce-dot" />
      </div>
    </div>
  );
}