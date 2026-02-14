export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2">
      <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
      <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" style={{ animationDelay: '0.2s' }} />
      <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" style={{ animationDelay: '0.4s' }} />
      <style>{`
        .typing-dot {
          animation: typing-pulse 1.4s infinite ease-in-out;
        }
        @keyframes typing-pulse {
          0%, 60%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          30% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}