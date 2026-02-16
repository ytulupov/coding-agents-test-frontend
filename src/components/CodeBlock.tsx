'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';
import type { Theme } from '../lib/types';

interface CodeBlockProps {
  code: string;
  language?: string;
  theme: Theme;
}

export function CodeBlock({ code, language = 'typescript', theme }: CodeBlockProps): React.ReactElement {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        type="button"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
        )}
      </button>
      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' ? vscDarkPlus : vs}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: '0.375rem',
          maxHeight: '400px',
          overflow: 'auto',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}