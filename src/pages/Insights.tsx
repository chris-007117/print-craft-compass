import { PageHero } from "@/components/PageHero";
import { ArrowRight } from "lucide-react";
import { SEO, breadcrumbJsonLd } from "@/components/SEO";

const posts = [
  { tag: "Color", date: "Mar 12, 2026", title: "Why G7 calibration matters when your brand crosses borders", excerpt: "Brand color is the single most-cited print failure in global launches. Here's how G7 master calibration solves it — and what to ask your printer to prove it." },
  { tag: "Packaging", date: "Feb 24, 2026", title: "Soft-touch laminations: a spec sheet for premium unboxing", excerpt: "Every soft-touch isn't created equal. A practical guide to specifying the right film for the right product — covering scuff resistance, ink-keying, and finish texture." },
  { tag: "Sustainability", date: "Jan 30, 2026", title: "Beyond FSC — the deinking question nobody asks", excerpt: "FSC certification is the floor, not the ceiling. Why deinkability and recovered-fiber percentages matter more than the chain-of-custody label your brief asks for." },
];

const Insights = () => (
  <>
    <SEO
      title="Insights — Notes from the Press Hall"
      description="Practical print thinking for design directors, brand teams, and print buyers. G7 color, soft-touch laminations, sustainable substrates, and more."
      path="/insights"
      jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }])}
    />
    <PageHero
      eyebrow="Insights"
      title="Notes from the press hall."
      lede="Practical print thinking for design directors, brand teams, and print buyers. Quarterly long-form, no fluff."
    />

    <section className="py-20">
      <div className="container-x">
        <div className="grid md:grid-cols-3 gap-10">
          {posts.map((p, i) => (
            <article key={i} className="group">
              <div className="aspect-[4/3] mb-5 overflow-hidden">
                <div className={`h-full w-full ${i === 0 ? 'bg-gradient-to-br from-charcoal to-copper' : i === 1 ? 'bg-gradient-to-br from-copper to-copper-deep' : 'bg-gradient-to-br from-slate-soft to-charcoal'} group-hover:scale-105 transition-transform duration-700`} />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-copper">{p.tag} · {p.date}</p>
              <h2 className="font-display text-2xl mt-3 leading-tight uppercase tracking-tight group-hover:text-copper transition-colors">{p.title}</h2>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{p.excerpt}</p>
              <span className="inline-flex items-center gap-2 mt-5 text-xs uppercase tracking-wider text-copper">
                Read article <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Insights;
