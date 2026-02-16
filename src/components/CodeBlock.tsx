"use client";

import { useState } from "react";
import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type SyntaxLanguage =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "cpp"
  | "c"
  | "csharp"
  | "go"
  | "rust"
  | "ruby"
  | "php"
  | "swift"
  | "kotlin"
  | "sql"
  | "html"
  | "css"
  | "scss"
  | "json"
  | "yaml"
  | "markdown"
  | "bash"
  | "powershell"
  | "text";

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: string;
}

const languageMap: Record<string, SyntaxLanguage> = {
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
  python: "python",
  py: "python",
  java: "java",
  cpp: "cpp",
  c: "c",
  csharp: "csharp",
  cs: "csharp",
  go: "go",
  rust: "rust",
  ruby: "ruby",
  php: "php",
  swift: "swift",
  kotlin: "kotlin",
  sql: "sql",
  html: "html",
  css: "css",
  scss: "scss",
  json: "json",
  yaml: "yaml",
  markdown: "markdown",
  md: "markdown",
  bash: "bash",
  shell: "bash",
  sh: "bash",
  powershell: "powershell",
};

export function CodeBlock({ children, className = "", language = "text" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const normalizedLanguage = languageMap[language.toLowerCase()] || "text";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={cn("relative group my-4 rounded-lg overflow-hidden", className)}>
      {/* Header bar with language and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 dark:bg-zinc-900 border-b border-zinc-700 dark:border-zinc-800">
        <span className="text-xs text-zinc-400 uppercase tracking-wide">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-600"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={normalizedLanguage}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1rem",
            backgroundColor: "#1e1e1e",
            fontSize: "0.875rem",
            lineHeight: "1.6",
          }}
          codeTagProps={{
            className: "font-mono",
            style: {
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace",
            },
          }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}