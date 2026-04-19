import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Link } from "react-router-dom";
import { ArrowRight, HeartPulse, Cpu, ShoppingBag, GraduationCap } from "lucide-react";
import { SEO, breadcrumbJsonLd } from "@/components/SEO";

const tabs = [
  {
    id: "healthcare", label: "Healthcare", Icon: HeartPulse,
    headline: "Validated for the work that can't go wrong.",
    body: "From IFUs and surgical kit packaging to clinical trial materials, we operate inside the workflows our medical-device clients require. Document-controlled procedures, lot traceability, change-control management, and validated color make Veridia Press the partner of choice for FDA-regulated brands.",
    bullets: ["FDA 21 CFR Part 820 aligned procedures", "ISO 13485 process compatibility", "Sterile-barrier-ready packaging", "Controlled-document fulfillment", "Full chain-of-custody traceability"],
    clients: ["Meridian Health", "NovaCardio", "Helix Surgical", "Pacific MicroDevice", "Stratos Bio"],
  },
  {
    id: "technology", label: "Technology", Icon: Cpu,
    headline: "Launch-ready unboxing at global scale.",
    body: "Hardware launches and developer events demand color, schedule, and structural craft that match the product. We've shipped six- and seven-figure carton runs to launch dates that can't slip — and managed reverse logistics for refurb programs at scale.",

    bullets: ["Soft-touch matte and copper foil packaging", "Developer kits and event production", "On-package sustainability storytelling", "Global merge-in-transit fulfillment", "API-driven order integration"],
    clients: ["Lumen AI", "Orbit Robotics", "Foundry42", "Northpoint", "Arc Systems"],
  },
  {
    id: "consumer", label: "Consumer", Icon: ShoppingBag,
    headline: "Premium retail, made to be touched.",
    body: "For DTC and shelf brands, the tactile is the differentiator. Soft-touch laminations, sculpted embosses, copper foil, edge painting — the things that make a customer pause. We obsess over the unboxing experience because it's the first sensory contact a customer has with the product.",
    bullets: ["Premium folding carton packaging", "Lookbooks and seasonal catalogs", "Hang tags, labels, and POS displays", "Direct mail with personalization", "Sample packs and influencer kits"],
    clients: ["Verdant Skincare", "Cascade Coffee", "Brixton Apparel", "Halo Botanical"],
  },
  {
    id: "education", label: "Education", Icon: GraduationCap,
    headline: "For institutions that take recruitment seriously.",
    body: "Independent schools, colleges, and universities choose Forma & Press for viewbooks, capital campaign packages, alumni magazines, and admissions materials. Certified-fiber substrates, archival inks, and binding methods that survive a decade in a parent's bookshelf.",
    bullets: ["Viewbooks and admissions packages", "Capital campaign collateral", "Alumni magazines and annual reports", "Certified-fiber substrates", "Archival-grade binding"],
    clients: ["Marin Academy", "Castilleja School", "St. Ignatius Prep", "Mills College"],
  },
];

const Industries = () => {
  const [active, setActive] = useState(tabs[0].id);
  const t = tabs.find(x => x.id === active)!;

  return (
    <>
      <SEO
        title="Industries — Healthcare, Tech, Consumer, Education"
        description="Specialized print and packaging for FDA-regulated healthcare, hardware launches, premium consumer brands, and higher education."
        path="/industries"
        jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }])}
      />
      <PageHero
        eyebrow="Industries"
        title="Specialized for the regulated, the premium, and the complex."
        lede="Four industries that demand more from print. We bring the validated workflows, certified materials, and sustained craft each one requires."
      />

      <section className="py-16 md:py-20">
        <div className="container-x">
          <div className="flex flex-wrap gap-2 border-b border-foreground/15 mb-12">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`px-5 py-4 -mb-px text-sm uppercase tracking-wider font-medium border-b-2 transition-all flex items-center gap-2 ${
                  active === tab.id ? 'border-copper text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.Icon className="h-4 w-4" /> {tab.label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-12 gap-12 animate-fade-up" key={t.id}>
            <div className="lg:col-span-7">
              <h2 className="display-md">{t.headline}</h2>
              <p className="mt-6 text-foreground/75 text-lg leading-relaxed">{t.body}</p>
              <ul className="mt-8 space-y-3">
                {t.bullets.map(b => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-2.5 h-px w-6 bg-copper flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link to="/quote" className="inline-flex items-center gap-2 mt-10 btn-copper">
                Discuss your project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <aside className="lg:col-span-5 bg-bone-warm p-8">
              <p className="eyebrow text-copper mb-4">Selected clients</p>
              <ul className="space-y-3">
                {t.clients.map(c => (
                  <li key={c} className="font-display text-2xl uppercase tracking-tight border-b border-foreground/10 pb-3">
                    {c}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default Industries;
