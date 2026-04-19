import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export const MarkdownRenderer = ({ content }: { content: string }) => (
  <div className="prose-blog">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]]}
      components={{
        h2: ({ node, ...props }) => <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight mt-14 mb-6 leading-tight scroll-mt-24" {...props} />,
        h3: ({ node, ...props }) => <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight mt-10 mb-4 leading-tight" {...props} />,
        p: ({ node, ...props }) => <p className="text-[18px] leading-[1.75] text-foreground/90 mb-6" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-[18px] leading-[1.75] text-foreground/90 marker:text-copper" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-[18px] leading-[1.75] text-foreground/90 marker:text-copper" {...props} />,
        li: ({ node, ...props }) => <li className="pl-1" {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-copper bg-muted/40 pl-6 pr-4 py-4 my-8 italic text-lg text-foreground/85" {...props} />
        ),
        a: ({ node, ...props }) => <a className="text-copper-deep underline underline-offset-4 decoration-copper/40 hover:decoration-copper-deep transition-colors" {...props} />,
        img: ({ node, ...props }) => (
          <img className="rounded-lg my-8 w-full" loading="lazy" decoding="async" {...props} />
        ),
        code: ({ node, className, children, ...props }) => {
          const isBlock = (className || "").includes("language-");
          if (isBlock) {
            return (
              <pre className="bg-charcoal text-bone rounded-lg p-5 overflow-x-auto my-6 text-sm">
                <code className={className} {...props}>{children}</code>
              </pre>
            );
          }
          return <code className="bg-muted px-1.5 py-0.5 rounded text-[0.95em]" {...props}>{children}</code>;
        },
        hr: () => <hr className="my-12 border-border" />,
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);
