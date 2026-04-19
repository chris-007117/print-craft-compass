import { Link } from "react-router-dom";

export const CategoryPill = ({ category, asLink = true }: { category: string; asLink?: boolean }) => {
  const slug = category.toLowerCase().replace(/\s+/g, "-");
  const cls = "inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 bg-copper/10 text-copper-deep border border-copper/20";
  if (!asLink) return <span className={cls}>{category}</span>;
  return <Link to={`/blog/category/${slug}`} className={`${cls} hover:bg-copper/20 transition-colors`}>{category}</Link>;
};
