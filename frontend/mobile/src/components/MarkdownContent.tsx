import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { Components } from "react-markdown";
import "katex/dist/katex.min.css";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="mt-4 mb-2 text-xl font-bold text-foreground first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-3.5 mb-2 text-lg font-bold text-foreground/90 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-3 mb-1.5 text-base font-bold text-foreground/85 first:mt-0">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-2.5 mb-1 text-sm font-bold text-foreground/80 first:mt-0">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mb-2.5 text-sm leading-[1.8] text-foreground/80 last:mb-0">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-foreground/75">{children}</em>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-primary underline underline-offset-2 decoration-primary/30 hover:text-primary/80 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-2.5 ml-1 list-disc space-y-1 pl-5 text-sm leading-[1.75] text-foreground/80 marker:text-muted-foreground/50 last:mb-0">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-2.5 ml-1 list-decimal space-y-1 pl-5 text-sm leading-[1.75] text-foreground/80 marker:text-muted-foreground/50 last:mb-0">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-0.5">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-3 border-l-[3px] border-primary/30 bg-primary-soft/30 py-2 pl-4 pr-3 text-sm italic text-foreground/70 rounded-r-lg last:mb-0">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground/85">
          {children}
        </code>
      );
    }
    return (
      <code
        className={`block font-mono text-[13px] leading-[1.7] text-foreground/85 ${className || ""}`}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-3 overflow-x-auto rounded-xl border border-border/50 bg-card p-4 shadow-sm last:mb-0">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-4 border-border/40" />,
  table: ({ children }) => (
    <div className="my-3 overflow-x-auto rounded-xl border border-border/50 last:mb-0">
      <table className="min-w-full divide-y divide-border/40 text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-muted/40 text-foreground/70">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 text-sm text-foreground/80 border-t border-border/20">
      {children}
    </td>
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt || ""}
      className="my-3 max-w-full rounded-xl border border-border/30 last:mb-0"
    />
  ),
};

export function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
