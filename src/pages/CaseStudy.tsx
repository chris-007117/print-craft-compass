import { useParams, Navigate, Link } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import caseMed from "@/assets/case-meddevice.jpg";
import caseTech from "@/assets/case-tech.jpg";
import { ArrowRight } from "lucide-react";
import { SEO, breadcrumbJsonLd, articleJsonLd } from "@/components/SEO";

const cases: Record<string, any> = {
  "meddevice-surgical-kit": {
    eyebrow: "Case Study · Healthcare",
    title: "MedDevice Co. — Surgeon Kit Reimagined",
    lede: "A complete redesign of the launch packaging system for a Class II cardiac device, shipped to 412 hospitals on a 14-day production cycle.",
    img: caseMed,
    challenge: "MedDevice Co.'s launch program for a new cardiac-device line had a packaging system designed five years prior — overweight, hard to open in OR conditions, and visually inconsistent with the rebrand. Surgeons reported difficulty identifying components in time-sensitive procedures, and field reps were repackaging kits in cars before delivery.",
    approach: "We led a six-week structural redesign with the MedDevice product, regulatory, and clinical-affairs teams. Soft-touch laminated SBS cartons with copper foil component identifiers, sterile-barrier-ready inner trays, lot-traceable serialization, and validated print workflows aligned to FDA 21 CFR Part 820. Color-managed across two production sites with G7 master calibration.",
    outcome: "Launch shipped to 412 hospitals on a 14-day production cycle. Surgeon-reported ease-of-use scores rose 38 points. Field rep complaint volume dropped 91%. Incremental revenue attributable to the launch packaging program was $4.2M in year one, against a total program cost of $694K — a 605% ROI.",
    stats: [
      { n: "605%", l: "Year-1 ROI" },
      { n: "42%", l: "Response lift in pilot" },
      { n: "$4.2M", l: "Incremental revenue" },
      { n: "412", l: "Hospitals shipped" },
      { n: "14 days", l: "Production cycle" },
      { n: "91%", l: "Drop in rep complaints" },
    ],
    quote: { text: "Veridia understood the clinical environment, the regulatory environment, and our brand — at the same time. That combination doesn't exist anywhere else we've sourced.", who: "Director of Packaging, MedDevice Co." },
  },
  "lumen-ai-launch": {
    eyebrow: "Case Study · Technology",
    title: "Lumen AI — Hardware launch packaging at global scale",
    lede: "1.2 million units of soft-touch matte packaging with copper foil details, manufactured and merged-in-transit across 11 countries for a launch date that couldn't slip.",
    img: caseTech,
    challenge: "Lumen AI's first consumer hardware product needed a launch-ready packaging program with the tactile premium their software brand had earned. The constraint: 1.2 million units, 11 destination markets, four language SKUs per market, and a fixed launch date 19 weeks out.",
    approach: "We split production across both Veridia facilities with mirrored color profiles, partnered with a vetted Asia partner for in-region final assembly, and built an API-driven workflow that pulled SKU configuration from Lumen's PIM directly into our prepress queue. Soft-touch matte SBS, gold foil 'L' monogram, multi-language insert collation, and EPR-compliant disposal labeling per market.",
    outcome: "100% of launch volume shipped in-window across all 11 markets. Zero re-prints. Zero color complaints. Lumen extended the program for refresh hardware launches in 2025 and 2026.",
    stats: [
      { n: "1.2M", l: "Units produced" },
      { n: "11", l: "Countries shipped" },
      { n: "0", l: "Re-prints required" },
      { n: "19 wks", l: "Spec to ship" },
      { n: "4", l: "Languages per market" },
      { n: "100%", l: "On-time delivery" },
    ],
    quote: { text: "We expected the print quality. What surprised us was the operational rigor — they ran a launch program tighter than our own ops team would have.", who: "Head of Studio, Lumen AI" },
  },
};

const CaseStudy = () => {
  const { slug } = useParams();
  const c = slug ? cases[slug] : null;
  if (!c) return <Navigate to="/work" replace />;

  return (
    <>
      <SEO
        title={`${c.title} — Case Study`}
        description={c.lede}
        path={`/work/${slug}`}
        type="article"
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: c.title, path: `/work/${slug}` },
          ]),
          articleJsonLd(c.title, c.lede, `/work/${slug}`, "2026-01-15"),
        ]}
      />
      <PageHero eyebrow={c.eyebrow} title={c.title} lede={c.lede} />

      <section className="py-16">
        <div className="container-x">
          <img src={c.img} alt={c.title} width={1280} height={960} loading="lazy" className="w-full aspect-[16/9] object-cover" />
        </div>
      </section>

      <section className="bg-bone-warm py-12">
        <div className="container-x grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {c.stats.map((s: any) => (
            <div key={s.l}>
              <p className="font-display text-3xl text-copper">{s.n}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid md:grid-cols-3 gap-12 max-w-6xl">
          {[
            { t: "The challenge", b: c.challenge },
            { t: "Our approach", b: c.approach },
            { t: "The outcome", b: c.outcome },
          ].map(s => (
            <div key={s.t}>
              <h3 className="font-display text-xl uppercase tracking-tight border-t-2 border-copper pt-4">{s.t}</h3>
              <p className="mt-4 text-foreground/75 leading-relaxed text-sm">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-charcoal text-bone py-20">
        <div className="container-x max-w-4xl">
          <p className="font-display text-2xl md:text-3xl leading-snug">"{c.quote.text}"</p>
          <p className="mt-6 text-bone/60 text-sm uppercase tracking-wider">— {c.quote.who}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x flex justify-between flex-wrap gap-4">
          <Link to="/work" className="text-sm uppercase tracking-wider text-copper">← All case studies</Link>
          <Link to="/quote" className="btn-copper">Start a Project <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
};

export default CaseStudy;
