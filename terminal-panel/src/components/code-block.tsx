"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = {
  title: string;
  language: string;
  code: string;
};

export function CodeBlock({ title, language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <section className="panel-card">
      <div className="code-toolbar">
        <strong>{title}</strong>
        <button type="button" className="copy-btn" onClick={handleCopy}>
          {copied ? "Kopyalandı" : "Kodu Kopyala"}
        </button>
      </div>
      <SyntaxHighlighter language={language} style={oneDark}>
        {code}
      </SyntaxHighlighter>
    </section>
  );
}
