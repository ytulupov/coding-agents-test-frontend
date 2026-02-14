'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'typescript' }: CodeBlockProps) {
  const [ copied, setCopied ] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-2">
      <div className="absolute top-2 right-2 z-10">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-white text-xs font-medium transition-colors opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        customStyle={{
          borderRadius: '0.5rem',
          padding: '1rem',
          margin: '0',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
        codeTagProps={{
          className: cn('text-sm', 'font-mono'),
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}