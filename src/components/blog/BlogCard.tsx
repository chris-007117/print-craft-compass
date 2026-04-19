import { Link } from "react-router-dom";
import type { BlogPost } from "@/lib/blog";
import { CategoryPill } from "./CategoryPill";
import { PostMeta } from "./PostMeta";

export const BlogCard = ({ post }: { post: BlogPost }) => (
  <article className="group">
    <Link to={`/blog/${post.slug}`} className="block">
      <div className="aspect-[16/9] overflow-hidden bg-muted mb-5">
        {post.hero_image_url ? (
          <img
            src={post.hero_image_url}
            alt={post.hero_image_alt || post.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-charcoal to-copper-deep" />
        )}
      </div>
      {post.category && (
        <div className="mb-3" onClick={(e) => e.stopPropagation()}>
          <CategoryPill category={post.category} />
        </div>
      )}
      <h3 className="font-display text-xl leading-tight uppercase tracking-tight line-clamp-2 group-hover:text-copper-deep transition-colors">
        {post.title}
      </h3>
      {post.excerpt && (
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
      )}
      <div className="mt-4 pt-4 border-t border-border">
        <PostMeta
          authorName={post.author_name || "Veridia Press"}
          publishedAt={post.published_at!}
          readingTimeMinutes={post.reading_time_minutes || 5}
        />
      </div>
    </Link>
  </article>
);
