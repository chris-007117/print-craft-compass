import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { SEO, breadcrumbJsonLd } from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { fetchPostBySlug, incrementView, insertMidArticleCTA, type BlogPost } from "@/lib/blog";
import { CategoryPill } from "@/components/blog/CategoryPill";
import { PostMeta } from "@/components/blog/PostMeta";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { QuoteRequestCTA } from "@/components/blog/QuoteRequestCTA";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import NotFound from "./NotFound";

const SITE_URL = "https://veridiapress.com";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");

  useEffect(() => {
    if (!slug) return;
    setStatus("loading");
    fetchPostBySlug(slug)
      .then((p) => {
        if (!p) { setStatus("missing"); return; }
        setPost(p);
        setStatus("ready");
        incrementView(slug);
      })
      .catch(() => setStatus("missing"));
  }, [slug]);

  if (status === "loading") {
    return <div className="container-x py-32 text-center text-muted-foreground">Loading…</div>;
  }
  if (status === "missing" || !post) {
    return <NotFound />;
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const publishedISO = post.published_at!;
  const updatedISO = post.updated_at;
  const categorySlug = post.category ? post.category.toLowerCase().replace(/\s+/g, "-") : null;
  const { before, after } = insertMidArticleCTA(post.body);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description,
    image: post.hero_image_url ? [post.hero_image_url] : [],
    datePublished: publishedISO,
    dateModified: updatedISO,
    author: { "@type": "Organization", name: post.author_name || "Veridia Press", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Veridia Press",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: (post.tags || []).join(", "),
    articleSection: post.category || undefined,
  };

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    ...(post.category && categorySlug ? [{ name: post.category, path: `/blog/category/${categorySlug}` }] : []),
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <SEO
        title={post.meta_title || post.title}
        description={post.meta_description}
        path={`/blog/${post.slug}`}
        image={post.hero_image_url || undefined}
        type="article"
        jsonLd={[articleSchema, breadcrumbJsonLd(breadcrumbs)]}
      />
      <Helmet>
        <meta property="article:published_time" content={publishedISO} />
        <meta property="article:modified_time" content={updatedISO} />
        <meta property="article:author" content={post.author_name || "Veridia Press"} />
        {post.category && <meta property="article:section" content={post.category} />}
        {(post.tags || []).map((t) => (
          <meta key={t} property="article:tag" content={t} />
        ))}
      </Helmet>

      <article className="pt-10 pb-16">
        <div className="container-x">
          {/* Breadcrumb */}
          <nav className="text-xs text-muted-foreground mb-8 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-copper-deep">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/blog" className="hover:text-copper-deep">Blog</Link>
            {post.category && categorySlug && (
              <>
                <ChevronRight className="h-3 w-3" />
                <Link to={`/blog/category/${categorySlug}`} className="hover:text-copper-deep">{post.category}</Link>
              </>
            )}
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground/70 line-clamp-1">{post.title}</span>
          </nav>

          {/* Hero image */}
          {post.hero_image_url && (
            <div className="aspect-[21/9] md:aspect-[24/9] overflow-hidden rounded-lg bg-muted mb-10">
              <img
                src={post.hero_image_url}
                alt={post.hero_image_alt || post.title}
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          )}

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-10 lg:gap-16">
            <aside>
              <TableOfContents body={post.body} />
            </aside>

            <div className="max-w-[680px] mx-auto lg:mx-0 w-full">
              {post.category && <div className="mb-5"><CategoryPill category={post.category} /></div>}
              <h1 className="font-display text-4xl md:text-5xl lg:text-[3rem] leading-[1.05] uppercase tracking-tight">
                {post.title}
              </h1>
              <div className="mt-6 mb-10 pb-10 border-b border-border">
                <PostMeta
                  authorName={post.author_name || "Veridia Press"}
                  authorAvatarUrl={post.author_avatar_url}
                  publishedAt={publishedISO}
                  readingTimeMinutes={post.reading_time_minutes || 5}
                  showAvatar
                />
              </div>

              {/* Body */}
              <MarkdownRenderer content={before} />
              {after && <QuoteRequestCTA variant="inline" />}
              {after && <MarkdownRenderer content={after} />}

              {/* End-of-article CTA */}
              <QuoteRequestCTA variant="prominent" />

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-border">
                <ShareButtons url={url} title={post.title} />
              </div>

              {/* Author bio */}
              <div className="mt-10">
                <AuthorBio name={post.author_name || "Veridia Press"} avatarUrl={post.author_avatar_url} />
              </div>

              {/* Related */}
              <RelatedPosts currentId={post.id} category={post.category} />

              {/* Last updated */}
              <p className="mt-10 text-xs text-muted-foreground">
                Last updated {format(new Date(updatedISO), "MMMM d, yyyy")}
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPostPage;
