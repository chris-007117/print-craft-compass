import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { fetchPublishedPosts, type BlogPost } from "@/lib/blog";

type Entry = {
  title: string;
  description: string;
  url: string;
  keywords: string;
};

const capabilities: Entry[] = [
  { title: "Commercial Print", description: "Offset & digital. Annual reports, brochures, catalogs, direct mail.", url: "/capabilities/commercial-print", keywords: "offset digital heidelberg indigo brochure catalog annual report variable data" },
  { title: "Packaging & Folding Cartons", description: "Folding cartons, sleeves, sterile-barrier medical packaging.", url: "/capabilities/packaging", keywords: "carton box sleeve medical sterile pharma cosmetic luxury foil emboss" },
  { title: "Large Format & Display", description: "Retail signage, trade-show graphics, vehicle wraps, environmental.", url: "/capabilities/large-format", keywords: "signage banner display wide format trade show vehicle wrap pop point of purchase" },
  { title: "Finishing & Fulfillment", description: "Foil, emboss, die-cut, kitting, warehousing, fulfillment.", url: "/capabilities/finishing", keywords: "foil emboss die cut bind saddle stitch kit fulfillment warehouse" },
  { title: "All Capabilities", description: "Press, packaging, large format, finishing, fulfillment.", url: "/capabilities", keywords: "services overview" },
];

const work: Entry[] = [
  { title: "MedDevice Co. — Surgeon Kit Reimagined", description: "605% ROI · 42% response lift · $4.2M incremental revenue.", url: "/work/meddevice-surgical-kit", keywords: "healthcare medical device case study roi packaging surgical kit class ii cardiac" },
  { title: "Lumen AI — Hardware Launch Packaging", description: "1.2M units · 11 countries · zero re-prints.", url: "/work/lumen-ai-launch", keywords: "technology launch hardware ai unboxing global scale case study" },
  { title: "All Case Studies", description: "Selected projects with measurable outcomes.", url: "/work", keywords: "portfolio case studies work" },
];

const pages: Entry[] = [
  { title: "Request a Quote", description: "Tell us about the project — paper, finish, schedule, price in 24 hours.", url: "/quote", keywords: "quote price estimate rfq request" },
  { title: "Order Sample Pack", description: "Free curated paper, foil, and finish samples shipped to you.", url: "/samples", keywords: "samples paper stock swatch free packet" },
  { title: "Contact", description: "Talk to a print strategist. Phoenix · Scottsdale.", url: "/contact", keywords: "contact phone email address office location" },
  { title: "About Veridia Press", description: "Family-rooted craft. Premium commercial print and packaging.", url: "/about", keywords: "about company team story mission history" },
  { title: "Industries We Serve", description: "Healthcare, technology, consumer, education.", url: "/industries", keywords: "industries vertical healthcare technology consumer cannabis beverage cosmetics supplement" },
  { title: "All Blog Articles", description: "Guides, trends, and expertise from the press hall.", url: "/blog", keywords: "blog articles insights guides" },
];

interface Props { open: boolean; onOpenChange: (open: boolean) => void; }

export const SiteSearch = ({ open, onOpenChange }: Props) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (!open || posts.length > 0) return;
    fetchPublishedPosts().then(setPosts).catch(() => setPosts([]));
  }, [open, posts.length]);

  const go = (url: string) => {
    onOpenChange(false);
    navigate(url);
  };

  const blogEntries: Entry[] = posts.map((p) => ({
    title: p.title,
    description: p.excerpt || p.meta_description,
    url: `/blog/${p.slug}`,
    keywords: `${p.category || ""} ${(p.tags || []).join(" ")} ${p.focus_keyword || ""}`,
  }));

  const ALL: { group: string; items: Entry[] }[] = [
    { group: "Capabilities", items: capabilities },
    { group: "Case Studies", items: work },
    { group: "Blog Articles", items: blogEntries },
    { group: "Pages", items: pages },
  ];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search capabilities, case studies, blog…" />
      <CommandList>
        <CommandEmpty>No results — try "packaging", "ROI", or "soy ink".</CommandEmpty>
        {ALL.map((section, i) => (
          section.items.length > 0 && (
            <div key={section.group}>
              {i > 0 && <CommandSeparator />}
              <CommandGroup heading={section.group}>
                {section.items.map((item) => (
                  <CommandItem
                    key={`${section.group}-${item.url}-${item.title}`}
                    value={`${item.title} ${item.description} ${item.keywords}`}
                    onSelect={() => go(item.url)}
                    className="flex flex-col items-start gap-0.5 py-2.5"
                  >
                    <span className="font-medium text-sm">{item.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">{item.description}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          )
        ))}
      </CommandList>
    </CommandDialog>
  );
};

export const useSearchHotkey = (setOpen: (open: boolean) => void) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);
};

export const SearchTrigger = ({ onClick, variant = "icon" }: { onClick: () => void; variant?: "icon" | "pill" | "full" }) => {
  if (variant === "pill") {
    return (
      <button
        onClick={onClick}
        className="hidden xl:inline-flex items-center gap-2 px-3 py-2 text-xs text-bone/60 hover:text-bone border border-bone/15 hover:border-bone/30 transition-colors"
        aria-label="Search site"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search</span>
        <kbd className="ml-2 font-mono text-[10px] text-bone/50">⌘K</kbd>
      </button>
    );
  }
  if (variant === "full") {
    return (
      <button
        onClick={onClick}
        className="w-full flex items-center gap-3 py-3 px-4 text-sm text-bone/80 border border-bone/15 hover:border-copper transition-colors"
      >
        <Search className="h-4 w-4" />
        <span>Search the site…</span>
        <kbd className="ml-auto font-mono text-[10px] text-bone/50">⌘K</kbd>
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="text-bone/70 hover:text-bone p-2 transition-colors"
      aria-label="Open search"
    >
      <Search className="h-4 w-4" />
    </button>
  );
};
