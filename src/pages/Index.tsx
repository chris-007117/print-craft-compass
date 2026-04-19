import { Link } from "react-router-dom";
import { ArrowRight, Play, Award, Leaf, ShieldCheck, FileBadge, Star } from "lucide-react";
import { ClientLogos } from "@/components/ClientLogos";
import { useEffect } from "react";
import heroPress from "@/assets/hero-press.jpg";
import capCommercial from "@/assets/cap-commercial.jpg";
import capPackaging from "@/assets/cap-packaging.jpg";
import capLargeformat from "@/assets/cap-largeformat.jpg";
import capFinishing from "@/assets/cap-finishing.jpg";
import facility from "@/assets/facility.jpg";
import caseMed from "@/assets/case-meddevice.jpg";
import { useState } from "react";

const capabilities = [
  { slug: "commercial-print", title: "Commercial Print", desc: "Offset & digital. Annual reports, brochures, catalogs.", img: capCommercial },
  { slug: "packaging", title: "Packaging", desc: "Folding cartons, sleeves, soft-touch finishes.", img: capPackaging },
  { slug: "large-format", title: "Large Format", desc: "Displays, signage, retail environments.", img: capLargeformat },
  { slug: "finishing", title: "Finishing", desc: "Foil, emboss, die-cut, kitting, fulfillment.", img: capFinishing },
];

const industries = [
  { id: "healthcare", label: "Healthcare", body: "FDA-aligned IFUs, surgical kits, sterile-barrier-ready packaging. Full lot traceability and validated workflows for medical device leaders." },
  { id: "technology", label: "Technology", body: "Launch-ready unboxing experiences, developer collateral, and event production for hardware and SaaS brands shipping at global scale." },
  { id: "consumer", label: "Consumer", body: "Premium retail packaging, lookbooks, and direct mail with the soft-touch laminations and copper foils that make a shelf stop you cold." },
  { id: "education", label: "Education", body: "Viewbooks, capital campaign packages, alumni magazines printed on certified-fiber stocks for independent schools and universities." },
];

const testimonials = [
  { name: "Lauren Park", title: "VP, Brand Marketing", co: "Meridian Health", quote: "Forma & Press is the partner we wish every vendor would be — color-managed, on-time, and obsessive about the small things that protect our brand." },
  { name: "Daniel Okafor", title: "Director of Packaging", co: "Stratos Bio", quote: "They retooled our launch packaging in 11 days. Our QA team called the result 'better than the prototype.' That never happens." },
  { name: "Maya Hirsch", title: "Creative Director", co: "Verdant Skincare", quote: "The copper foil work on our anniversary edition is the best print job I've shipped in fifteen years. Period." },
  { name: "James Carrillo", title: "COO", co: "NovaCardio", quote: "Compliance, traceability, G7 color — Forma handles all of it without us managing them. They feel like an extension of the team." },
  { name: "Priya Nair", title: "Head of Studio", co: "Lumen AI", quote: "Editorial-grade craft at enterprise SLAs. We stopped shopping vendors three years ago." },
];

const Index = () => {
  const [activeIndustry, setActiveIndustry] = useState("healthcare");
  const [tIdx, setTIdx] = useState(0);

  // Auto-rotate testimonials every 7s, pausing on manual selection.
  useEffect(() => {
    const id = setInterval(() => setTIdx((i) => (i + 1) % testimonials.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-charcoal text-bone overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroPress} alt="Premium offset printing press in motion" width={1920} height={1280} className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />
        </div>
        {/* Sunburst */}
        <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[700px] h-[700px] sunburst opacity-80 animate-spin-slow pointer-events-none" />

        <div className="relative container-x py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <span className="eyebrow text-copper">Forma & Press · Since 1987</span>
            <h1 className="display-xl mt-6 text-bone">
              Print,<br/><span className="text-copper">perfected.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-bone/75 max-w-xl leading-relaxed">
              Bay Area commercial print and packaging for healthcare, technology, and consumer brands. G7 Master qualified. Family-owned, four decades deep.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/quote" className="btn-copper">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/samples" className="btn-ghost-light">Order Sample Pack</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <section className="bg-bone-warm py-12 md:py-16 border-b border-foreground/10">
        <div className="container-x">
          <p className="eyebrow text-muted-foreground mb-8 text-center justify-center flex">Trusted by brands that ship globally</p>
          <ClientLogos />
        </div>
      </section>

      {/* FEATURED CASE STUDY */}
      <section className="bg-charcoal text-bone py-20 md:py-28">
        <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <img src={caseMed} alt="MedDevice Co. surgical kit packaging" width={1280} height={960} loading="lazy" className="w-full aspect-[4/3] object-cover" />
            <div className="absolute -bottom-6 -left-6 bg-copper px-6 py-4">
              <p className="font-display text-3xl text-bone leading-none">605%</p>
              <p className="text-xs uppercase tracking-wider text-bone/80 mt-1">ROI</p>
            </div>
          </div>
          <div>
            <span className="eyebrow text-copper">Featured Case Study</span>
            <h2 className="display-md mt-5 text-bone">MedDevice Co. — Surgeon Kit Reimagined</h2>
            <p className="mt-6 text-bone/70 text-lg leading-relaxed">
              A complete redesign of the launch packaging system for a Class II cardiac device. Validated workflow, lot-traceable cartons, soft-touch lamination with copper foil — shipped to 412 hospitals on a 14-day cycle.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div><p className="font-display text-2xl text-copper">42%</p><p className="text-xs text-bone/60 uppercase tracking-wider mt-1">Response lift</p></div>
              <div><p className="font-display text-2xl text-copper">$4.2M</p><p className="text-xs text-bone/60 uppercase tracking-wider mt-1">Incremental rev</p></div>
              <div><p className="font-display text-2xl text-copper">14 days</p><p className="text-xs text-bone/60 uppercase tracking-wider mt-1">Turnaround</p></div>
            </div>
            <Link to="/work/meddevice-surgical-kit" className="inline-flex items-center gap-2 mt-10 text-copper hover:text-copper-bright text-sm font-semibold uppercase tracking-wider">
              Read Case Study <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CAPABILITIES GRID */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="eyebrow text-copper">Capabilities</span>
              <h2 className="display-lg mt-4 max-w-2xl">Everything under one roof.</h2>
            </div>
            <Link to="/capabilities" className="btn-ghost-dark self-start">All Capabilities <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((c) => (
              <Link key={c.slug} to={`/capabilities/${c.slug}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-charcoal">
                  <img src={c.img} alt={c.title} width={1280} height={960} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="pt-5">
                  <h3 className="font-display text-xl uppercase tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                  <span className="inline-flex items-center gap-2 mt-4 text-xs uppercase tracking-wider text-copper group-hover:gap-3 transition-all">Explore <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-bone-warm py-20 md:py-28">
        <div className="container-x">
          <span className="eyebrow text-copper">Industries</span>
          <h2 className="display-lg mt-4 max-w-2xl">Specialized for regulated, premium, and complex.</h2>

          <div className="mt-12 grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
              {industries.map((i) => (
                <button
                  key={i.id}
                  onClick={() => setActiveIndustry(i.id)}
                  className={`text-left px-5 py-4 border-l-2 transition-all whitespace-nowrap lg:whitespace-normal ${
                    activeIndustry === i.id
                      ? 'border-copper bg-background text-foreground'
                      : 'border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/30'
                  }`}
                >
                  <span className="font-display text-lg uppercase tracking-tight">{i.label}</span>
                </button>
              ))}
            </div>
            <div className="lg:col-span-8 bg-background p-8 md:p-12">
              {industries.filter(i => i.id === activeIndustry).map(i => (
                <div key={i.id} className="animate-fade-up">
                  <h3 className="font-display text-3xl uppercase">{i.label}</h3>
                  <p className="mt-5 text-lg text-foreground/75 leading-relaxed">{i.body}</p>
                  <Link to="/industries" className="inline-flex items-center gap-2 mt-8 text-copper text-sm font-semibold uppercase tracking-wider">
                    Explore Industry <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CRAFT / PROCESS */}
      <section className="py-20 md:py-28">
        <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] bg-charcoal overflow-hidden group cursor-pointer">
            <img src={facility} alt="Forma & Press production facility" width={1600} height={1024} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-copper flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="h-7 w-7 text-bone fill-bone ml-1" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 text-bone">
              <p className="text-xs uppercase tracking-[0.2em] opacity-70">Watch us work</p>
              <p className="font-display text-xl mt-1">Inside the press hall</p>
            </div>
          </div>
          <div>
            <span className="eyebrow text-copper">The craft</span>
            <h2 className="display-md mt-5">Color-managed every step. Hand-checked every sheet.</h2>
            <ul className="mt-8 space-y-6">
              {[
                { t: "G7 Master color, every press", b: "Validated calibration on Heidelberg XL 106 and HP Indigo 12000 — proof to print, sheet to sheet." },
                { t: "FSC chain-of-custody", b: "Certified-fiber stocks, soy-based inks, and zero-VOC coatings as the default — not the upgrade." },
                { t: "Validated for regulated work", b: "Lot traceability, change-control, and document-controlled procedures for medical, financial, and pharma clients." },
              ].map((p) => (
                <li key={p.t} className="flex gap-4">
                  <span className="mt-2 h-px w-8 bg-copper flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">{p.t}</h4>
                    <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed">{p.b}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TRUST STACK */}
      <section className="bg-charcoal-soft text-bone py-16 border-y border-bone/5">
        <div className="container-x">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
            {[
              { Icon: Award, t: "G7 Master", s: "Color Qualified" },
              { Icon: Leaf, t: "FSC® C-145288", s: "Chain of Custody" },
              { Icon: ShieldCheck, t: "SOC 2 Type II", s: "Audited annually" },
              { Icon: FileBadge, t: "SGP Certified", s: "Sustainable Green Printing" },
            ].map(({ Icon, t, s }) => (
              <div key={t} className="flex items-center gap-4 border border-bone/10 p-5">
                <Icon className="h-9 w-9 text-copper flex-shrink-0" />
                <div>
                  <p className="font-display uppercase text-sm tracking-wider">{t}</p>
                  <p className="text-xs text-bone/60">{s}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center pt-12 border-t border-bone/10">
            {[
              { n: "1987", l: "Family-owned since" },
              { n: "38", l: "Years in business" },
              { n: "4.2M", l: "Impressions weekly" },
              { n: "320+", l: "Active brand clients" },
            ].map(s => (
              <div key={s.l}>
                <p className="font-display text-4xl md:text-5xl text-copper">{s.n}</p>
                <p className="text-xs uppercase tracking-wider text-bone/60 mt-2">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-bone-warm">
        <div className="container-x">
          <span className="eyebrow text-copper">What clients say</span>
          <h2 className="display-md mt-4 max-w-3xl">A partner that protects the brand.</h2>

          <div className="mt-12 bg-background p-8 md:p-14 max-w-4xl">
            <p className="font-display text-2xl md:text-3xl leading-snug text-foreground">
              "{testimonials[tIdx].quote}"
            </p>
            <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-copper/20 flex items-center justify-center text-copper font-display text-lg">
                  {testimonials[tIdx].name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold">{testimonials[tIdx].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[tIdx].title} · {testimonials[tIdx].co}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTIdx(i)}
                    className={`h-1.5 transition-all ${i === tIdx ? 'w-10 bg-copper' : 'w-5 bg-foreground/20 hover:bg-foreground/40'}`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY STRIP */}
      <section className="py-16 border-y border-foreground/10">
        <div className="container-x grid sm:grid-cols-3 gap-8 text-center">
          {[
            { n: "412 tons", l: "Paper recycled in 2024" },
            { n: "1,840 trees", l: "Planted via FSC partnerships" },
            { n: "100%", l: "Soy & vegetable-based inks" },
          ].map(s => (
            <div key={s.l}>
              <Leaf className="h-6 w-6 text-copper mx-auto mb-3" />
              <p className="font-display text-3xl md:text-4xl">{s.n}</p>
              <p className="text-sm text-muted-foreground mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INSIGHTS PREVIEW */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="eyebrow text-copper">Insights</span>
              <h2 className="display-md mt-4">From the press hall.</h2>
            </div>
            <Link to="/insights" className="btn-ghost-dark">All Insights <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { tag: "Color", title: "Why G7 calibration matters when your brand crosses borders", date: "Mar 2026" },
              { tag: "Packaging", title: "Soft-touch laminations: spec sheet for premium unboxing", date: "Feb 2026" },
              { tag: "Sustainability", title: "Beyond FSC — the deinking question nobody asks", date: "Jan 2026" },
            ].map(p => (
              <Link key={p.title} to="/insights" className="group block">
                <div className="aspect-[4/3] bg-secondary mb-5 overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-br from-charcoal to-copper-deep group-hover:scale-105 transition-transform duration-700" />
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-copper">{p.tag} · {p.date}</p>
                <h3 className="font-display text-xl mt-3 leading-tight group-hover:text-copper transition-colors">{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-copper text-bone py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 sunburst opacity-30 mix-blend-overlay" />
        <div className="container-x relative text-center">
          <h2 className="display-lg max-w-3xl mx-auto">Let's make something exceptional.</h2>
          <p className="mt-6 text-bone/85 max-w-xl mx-auto text-lg">Tell us about the project. We'll come back with paper, finish, schedule, and price within 24 hours.</p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/quote" className="bg-charcoal text-bone px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-charcoal-soft transition-colors inline-flex items-center gap-2">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/samples" className="border border-bone px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-bone hover:text-copper transition-colors">
              Order Sample Pack
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
