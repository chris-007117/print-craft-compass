import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { SEO, breadcrumbJsonLd } from "@/components/SEO";
import { fetchPublishedPosts, type BlogPost } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";

const BlogTaxonomy = ({ kind }: { kind: "category" | "tag" }) => {
  const params = useParams<{ category?: string; tag?: string }>();
  const slug = (kind === "category" ? params.category : params.tag) || "";
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublishedPosts().then(setPosts).catch(() => setPosts([])).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (kind === "category") {
      return posts.filter((p) => p.category && p.category.toLowerCase().replace(/\s+/g, "-") === slug);
    }
    return posts.filter((p) => (p.tags || []).map((t) => t.toLowerCase()).includes(slug.toLowerCase()));
  }, [posts, slug, kind]);

  const label = kind === "category"
    ? (filtered[0]?.category || slug.replace(/-/g, " "))
    : slug.replace(/-/g, " ");

  const path = kind === "category" ? `/blog/category/${slug}` : `/blog/tag/${slug}`;
  const title = kind === "category" ? `${label} — Insights` : `Posts tagged "${label}"`;

  return (
    <>
      <SEO
        title={title}
        description={`Articles in ${label} from Veridia Press — commercial print and packaging insights.`}
        path={path}
        jsonLd={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: label, path },
        ])}
      />
      <PageHero
        eyebrow={kind === "category" ? "Category" : "Tag"}
        title={`${label}.`}
        lede={kind === "category"
          ? `Articles in ${label} — guides, trends, and expertise.`
          : `All articles tagged "${label}".`}
      />
      <section className="py-16 lg:py-20">
        <div className="container-x">
          {loading ? (
            <p className="text-center text-muted-foreground py-20">Loading…</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No articles in this {kind} yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {filtered.map((p) => <BlogCard key={p.id} post={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogTaxonomy;
