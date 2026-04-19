import { Link } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import caseMed from "@/assets/case-meddevice.jpg";
import caseTech from "@/assets/case-tech.jpg";
import { ArrowRight } from "lucide-react";
import { SEO, breadcrumbJsonLd } from "@/components/SEO";

const cases = [
  { slug: "meddevice-surgical-kit", img: caseMed, client: "MedDevice Co.", title: "Surgeon kit reimagined", tag: "Healthcare", stats: ["605% ROI", "42% response lift", "$4.2M incremental"] },
  { slug: "lumen-ai-launch", img: caseTech, client: "Lumen AI", title: "Hardware launch packaging at global scale", tag: "Technology", stats: ["1.2M units", "11 countries", "Zero re-prints"] },
];

const Work = () => (
  <>
    <SEO
      title="Work — Case Studies with Measurable Outcomes"
      description="Veridia Press case studies: ROI math, response lift, on-time delivery at scale. Healthcare and technology projects with the numbers behind the work."
      path="/work"
      jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }])}
    />
    <PageHero
      eyebrow="Work"
      title="Case studies with numbers, not adjectives."
      lede="Selected projects with measurable outcomes. Every case study includes the ROI math we used to scope and justify the work."
    />

    <section className="py-20">
      <div className="container-x grid md:grid-cols-2 gap-10">
        {cases.map(c => (
          <Link key={c.slug} to={`/work/${c.slug}`} className="group block">
            <div className="aspect-[4/3] overflow-hidden bg-charcoal mb-6">
              <img src={c.img} alt={c.title} width={1280} height={960} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-copper">{c.tag} · {c.client}</p>
            <h2 className="font-display text-3xl uppercase tracking-tight mt-3 group-hover:text-copper transition-colors">{c.title}</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-sm text-muted-foreground">
              {c.stats.map(s => <span key={s} className="font-medium text-foreground">{s}</span>)}
            </div>
            <span className="inline-flex items-center gap-2 mt-5 text-sm uppercase tracking-wider text-copper">
              Read case study <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  </>
);

export default Work;
