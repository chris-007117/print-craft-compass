import { useEffect, useState } from "react";
import { fetchRelatedPosts, type BlogPost } from "@/lib/blog";
import { BlogCard } from "./BlogCard";

export const RelatedPosts = ({ currentId, category }: { currentId: string; category: string | null }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  useEffect(() => {
    fetchRelatedPosts(currentId, category).then(setPosts).catch(() => setPosts([]));
  }, [currentId, category]);

  if (posts.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-border">
      <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight mb-10">Keep reading</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((p) => <BlogCard key={p.id} post={p} />)}
      </div>
    </section>
  );
};
