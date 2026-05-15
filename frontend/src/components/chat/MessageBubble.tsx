import React, { useState } from 'react';
import { Copy, Check, User, Bot } from 'lucide-react';
import { clsx } from 'clsx';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { formatTimestamp } from '../../utils/formatters';
import type { Message } from '../../types/chat.types';

interface MessageBubbleProps {
  message: Message;
  isUser: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);

  const handleCopyCode = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div
      className={clsx(
        'flex gap-3 mb-6 animate-slide-up',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
        </div>
      )}

      {/* Message Content */}
      <div
        className={clsx(
          'max-w-[85%] md:max-w-[75%] rounded-2xl shadow-lg',
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white px-5 py-4'
            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-5 py-4 border border-slate-200 dark:border-slate-700'
        )}
      >
        {/* Message Text */}
        <div className={clsx(
          'prose max-w-none',
          isUser ? 'prose-invert' : 'prose-slate dark:prose-invert'
        )}>
          <ReactMarkdown
            components={{
              // Paragraphs
              p: ({ children }) => (
                <p className="mb-3 last:mb-0 leading-relaxed text-base">
                  {children}
                </p>
              ),
              
              // Headings
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold mb-3 mt-4 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-bold mb-2 mt-3 first:mt-0">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold mb-2 mt-3 first:mt-0">
                  {children}
                </h3>
              ),
              
              // Lists
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-1 mb-3">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-1 mb-3">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed">{children}</li>
              ),
              
              // Links
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    'underline font-medium hover:opacity-80 transition-opacity',
                    isUser ? 'text-blue-100' : 'text-blue-600 dark:text-blue-400'
                  )}
                >
                  {children}
                </a>
              ),
              
              // Code blocks and inline code
              code({ inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                const codeString = String(children).replace(/\n$/, '');
                const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;

                return !inline && match ? (
                  <div className="relative group my-4 rounded-xl overflow-hidden shadow-lg">
                    {/* Code Header */}
                    <div className="flex items-center justify-between bg-slate-800 dark:bg-slate-900 px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-xs text-slate-400 font-mono ml-2">
                          {match[1]}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyCode(codeString, codeId)}
                        className="text-slate-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-slate-700"
                      >
                        {copiedCode === codeId ? (
                          <div className="flex items-center gap-1.5">
                            <Check size={14} className="text-green-400" />
                            <span className="text-xs">Copied!</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <Copy size={14} />
                            <span className="text-xs">Copy</span>
                          </div>
                        )}
                      </button>
                    </div>
                    
                    {/* Code Content */}
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      className="!mt-0 !mb-0 !rounded-none text-sm"
                      customStyle={{
                        margin: 0,
                        padding: '1rem',
                        background: '#1e293b',
                      }}
                      {...props}
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code
                    className={clsx(
                      'px-2 py-0.5 rounded-md text-sm font-mono',
                      isUser
                        ? 'bg-blue-700/50 text-blue-50'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                    )}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              
              // Blockquotes
              blockquote: ({ children }) => (
                <blockquote className={clsx(
                  'border-l-4 pl-4 py-2 my-3 italic',
                  isUser
                    ? 'border-blue-300 text-blue-50'
                    : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400'
                )}>
                  {children}
                </blockquote>
              ),
            }}
          >
            {message.text}
          </ReactMarkdown>
        </div>
        
        {/* Timestamp */}
        <div
          className={clsx(
            'text-xs mt-3 pt-2 border-t',
            isUser
              ? 'text-blue-100 border-blue-400/30'
              : 'text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
          )}
        >
          {formatTimestamp(message.timestamp)}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

// Made with Bob
