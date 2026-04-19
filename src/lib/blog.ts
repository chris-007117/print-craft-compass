import { supabase } from "@/integrations/supabase/client";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  hero_image_url: string | null;
  hero_image_alt: string | null;
  meta_title: string | null;
  meta_description: string;
  focus_keyword: string | null;
  category: string | null;
  tags: string[] | null;
  author_name: string | null;
  author_avatar_url: string | null;
  reading_time_minutes: number | null;
  published_at: string | null;
  updated_at: string;
  featured: boolean | null;
  view_count: number | null;
};

export const fetchPublishedPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("published_blog_posts")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPost[];
};

export const fetchPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from("published_blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data ?? null) as BlogPost | null;
};

export const fetchRelatedPosts = async (
  currentId: string,
  category: string | null,
  limit = 3
): Promise<BlogPost[]> => {
  let query = supabase
    .from("published_blog_posts")
    .select("*")
    .neq("id", currentId)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (category) query = query.eq("category", category);
  const { data, error } = await query;
  if (error) throw error;
  if ((data?.length ?? 0) >= limit) return data as BlogPost[];
  // backfill with most recent
  const { data: fill } = await supabase
    .from("published_blog_posts")
    .select("*")
    .neq("id", currentId)
    .order("published_at", { ascending: false })
    .limit(limit);
  const seen = new Set((data ?? []).map((p) => p.id));
  const merged = [...(data ?? []), ...((fill ?? []).filter((p) => !seen.has(p.id)))];
  return merged.slice(0, limit) as BlogPost[];
};

export const incrementView = (slug: string) => {
  supabase.rpc("increment_post_view", { post_slug: slug });
};

export const extractHeadings = (markdown: string): { id: string; text: string }[] => {
  const lines = markdown.split("\n");
  const headings: { id: string; text: string }[] = [];
  let inFence = false;
  for (const line of lines) {
    if (line.trim().startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m) {
      const text = m[1].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      headings.push({ id, text });
    }
  }
  return headings;
};

export const insertMidArticleCTA = (markdown: string): { before: string; after: string } => {
  const lines = markdown.split("\n");
  let h2Count = 0;
  let splitIdx = -1;
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    if (/^##\s+/.test(lines[i])) {
      h2Count++;
      if (h2Count === 4) { splitIdx = i; break; }
    }
  }
  if (splitIdx === -1) return { before: markdown, after: "" };
  return { before: lines.slice(0, splitIdx).join("\n"), after: lines.slice(splitIdx).join("\n") };
};
