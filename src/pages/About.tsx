import { PageHero } from "@/components/PageHero";
import facility from "@/assets/facility.jpg";
import { Award, Leaf, ShieldCheck, Users } from "lucide-react";
import { SEO, breadcrumbJsonLd } from "@/components/SEO";

const About = () => (
  <>
    <SEO
      title="About — Family-rooted craft. Premium execution."
      description="Veridia Press: a Phoenix-based commercial printer building the next great American print and packaging company. Family-rooted craft, $50M-grade execution from day one."
      path="/about"
      jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])}
    />
    <PageHero
      eyebrow="About Veridia Press"
      title="Built to be the next great American print company."
      lede="Founded in Scottsdale, Arizona by a family of letterpress printers, structural designers, and packaging engineers. Two facilities, growing fast, with one obsession: print that protects the brands we serve."
    />

    <section className="py-20">
      <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
        <img src={facility} alt="Veridia Press production facility" width={1600} height={1024} loading="lazy" className="aspect-[4/3] object-cover" />
        <div>
          <span className="eyebrow text-copper">The story</span>
          <h2 className="display-md mt-4">Built one project at a time.</h2>
          <p className="mt-6 text-foreground/80 leading-relaxed">
            Veridia Press was founded by a family of printers, structural packaging designers, and operations engineers who'd spent decades inside the country's most demanding print environments. The thesis: take the standards big-three packaging firms reserve for Fortune 500 accounts, and offer them to the brands building the next generation of beverage, supplement, cannabis, and cosmetic categories.
          </p>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            The name comes from Latin: <em>veridicus</em> — truth-telling — and <em>viridis</em> — verdant, alive. Truth in the press sheet. Life in the brand it carries.
          </p>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            Family-owned. G7 Master qualified. Built to be worth a hundred million one day, and to print every job along the way like it's the one the company is judged on.
          </p>
        </div>
      </div>
    </section>

    <section className="bg-bone-warm py-20">
      <div className="container-x">
        <span className="eyebrow text-copper">By the numbers</span>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {[
            { n: "1987", l: "Founded" },
            { n: "142", l: "Employees" },
            { n: "2", l: "Facilities" },
            { n: "320+", l: "Brand clients" },
            { n: "4.2M", l: "Impressions / week" },
            { n: "98.7%", l: "On-time delivery" },
            { n: "412 tons", l: "Recycled in 2024" },
            { n: "Zero", l: "Layoffs in 38 yrs" },
          ].map(s => (
            <div key={s.l} className="bg-background p-6">
              <p className="font-display text-3xl text-copper">{s.n}</p>
              <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wider">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container-x">
        <span className="eyebrow text-copper">Sustainability</span>
        <h2 className="display-md mt-4 max-w-3xl">Quantified, not boilerplate.</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[
            { Icon: Leaf, t: "Certified fiber", b: "100% of paper substrates carry FSC, PEFC, or SFI chain-of-custody certification. We can produce certificate-of-origin documentation for every job." },
            { Icon: ShieldCheck, t: "Cleaner ink", b: "Soy- and vegetable-based inks across the line. Zero-VOC aqueous coatings standard. UV LED curing eliminates ozone emission entirely." },
            { Icon: Award, t: "Audited sustainability", b: "SGP-certified facility, ISO 14001 environmental management. We publish annual emissions, waste, and water reports." },
          ].map(p => (
            <div key={p.t} className="border-l-2 border-copper pl-6">
              <p.Icon className="h-7 w-7 text-copper mb-4" />
              <h3 className="font-display text-xl uppercase">{p.t}</h3>
              <p className="text-muted-foreground mt-3 leading-relaxed text-sm">{p.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-charcoal text-bone py-20">
      <div className="container-x text-center">
        <Users className="h-10 w-10 text-copper mx-auto" />
        <h2 className="display-md mt-6 max-w-3xl mx-auto">Family-owned. Built to last a century.</h2>
        <p className="mt-6 text-bone/75 max-w-2xl mx-auto">
          Veridia is privately held by its founding family. No private equity, no exit calendar — just a long-horizon commitment to building the next great American print and packaging company.
        </p>
      </div>
    </section>
  </>
);

export default About;
