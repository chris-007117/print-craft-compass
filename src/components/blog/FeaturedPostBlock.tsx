import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { CategoryPill } from "./CategoryPill";
import { PostMeta } from "./PostMeta";

export const FeaturedPostBlock = ({ post }: { post: BlogPost }) => (
  <article className="group mb-16 lg:mb-20">
    <Link to={`/blog/${post.slug}`} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-muted">
        {post.hero_image_url ? (
          <img
            src={post.hero_image_url}
            alt={post.hero_image_alt || post.title}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-charcoal to-copper-deep" />
        )}
      </div>
      <div className="lg:col-span-5">
        <p className="eyebrow text-copper-deep mb-5">Featured</p>
        {post.category && (
          <div className="mb-4" onClick={(e) => e.stopPropagation()}>
            <CategoryPill category={post.category} />
          </div>
        )}
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] uppercase tracking-tight group-hover:text-copper-deep transition-colors">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">{post.excerpt}</p>
        )}
        <div className="mt-6">
          <PostMeta
            authorName={post.author_name || "Veridia Press"}
            publishedAt={post.published_at!}
            readingTimeMinutes={post.reading_time_minutes || 5}
          />
        </div>
        <span className="inline-flex items-center gap-2 mt-6 text-xs uppercase tracking-wider text-copper-deep font-semibold">
          Read article <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  </article>
);
