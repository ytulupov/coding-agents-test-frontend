"use client";

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
        <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">AI</span>
      </div>

      <div className="flex-1 flex items-center gap-1 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-tl-sm max-w-[calc(100%-2rem)]">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: "1.4s",
              }}
            />
          ))}
        </div>
        <style jsx>{`
          @keyframes bounce {
            0%, 60%, 100% {
              transform: translateY(0);
            }
            30% {
              transform: translateY(-4px);
            }
          }
        `}</style>
      </div>
    </div>
  );
}