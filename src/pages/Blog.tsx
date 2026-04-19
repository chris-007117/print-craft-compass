import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SEO, breadcrumbJsonLd } from "@/components/SEO";
import { fetchPublishedPosts, type BlogPost } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { FeaturedPostBlock } from "@/components/blog/FeaturedPostBlock";
import { NewsletterCTA } from "@/components/blog/NewsletterCTA";

const PAGE_SIZE = 12;

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPublishedPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 250);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => { setPage(1); }, [activeCategory, debounced]);

  const featured = useMemo(() => posts.find((p) => p.featured), [posts]);
  const nonFeatured = useMemo(() => posts.filter((p) => !p.featured), [posts]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.category && set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filtered = useMemo(() => {
    let list = nonFeatured;
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (debounced.trim()) {
      const q = debounced.toLowerCase();
      list = list.filter((p) =>
        p.title.toLowerCase().includes(q) || (p.excerpt || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [nonFeatured, activeCategory, debounced]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Insights from Veridia Press",
    url: "https://veridiapress.com/blog",
    blogPost: posts.slice(0, 10).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://veridiapress.com/blog/${p.slug}`,
      datePublished: p.published_at,
    })),
  };

  return (
    <>
      <SEO
        title="Insights from Veridia Press — Commercial print guides & ideas"
        description="Guides, trends, and expertise from the world of commercial print and packaging — written by the team at Veridia Press."
        path="/blog"
        jsonLd={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]),
          blogJsonLd,
        ]}
      />

      <PageHero
        eyebrow="Insights"
        title="Insights from Veridia Press."
        lede="Guides, trends, and expertise from the world of commercial print and packaging."
      />

      <section className="py-16 lg:py-20">
        <div className="container-x">
          {loading ? (
            <p className="text-center text-muted-foreground py-20">Loading articles…</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No articles yet — check back soon.</p>
          ) : (
            <>
              {featured && <FeaturedPostBlock post={featured} />}

              {/* Filters */}
              <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2 scrollbar-thin">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setActiveCategory(c)}
                      className={`whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] px-4 py-2 border transition-colors ${
                        activeCategory === c
                          ? "bg-charcoal text-bone border-charcoal"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="relative md:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search articles…"
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-card border border-border focus:outline-none focus:border-copper"
                  />
                </div>
              </div>

              {/* Grid */}
              {paged.length === 0 ? (
                <p className="text-center text-muted-foreground py-16">No articles match that search.</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                  {paged.map((p) => <BlogCard key={p.id} post={p} />)}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-14 flex justify-center items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 text-xs uppercase tracking-wider border border-border disabled:opacity-40 hover:border-copper transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-xs text-muted-foreground px-3">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 text-xs uppercase tracking-wider border border-border disabled:opacity-40 hover:border-copper transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <NewsletterCTA />
    </>
  );
};

export default Blog;
