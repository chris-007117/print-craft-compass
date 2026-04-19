import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import capCommercial from "@/assets/cap-commercial.jpg";
import capPackaging from "@/assets/cap-packaging.jpg";
import capLargeformat from "@/assets/cap-largeformat.jpg";
import capFinishing from "@/assets/cap-finishing.jpg";
import { SEO, breadcrumbJsonLd } from "@/components/SEO";

const items = [
  { slug: "commercial-print", title: "Commercial Print", img: capCommercial, body: "Annual reports, brochures, catalogs, direct mail. Heidelberg XL 106 offset and HP Indigo 12000 digital. Run lengths 250 to 250,000.", specs: ["6-color offset + coater", "HP Indigo 12000 digital", "G7 Master color", "Variable data printing"] },
  { slug: "packaging", title: "Packaging & Folding Cartons", img: capPackaging, body: "Folding cartons, sleeves, set-up boxes, sterile-barrier-ready medical packaging. Soft-touch, foil, emboss, and structural die-cutting in-house.", specs: ["Folding cartons up to 24pt", "Validated medical workflows", "Soft-touch & touch-feel coatings", "Structural design & prototyping"] },
  { slug: "large-format", title: "Large Format & Display", img: capLargeformat, body: "Retail signage, trade show graphics, point-of-purchase displays, environmental graphics, vehicle wraps. Latex and UV-LED flatbed up to 10 ft wide.", specs: ["Up to 120\" wide", "Direct-to-substrate UV", "Soft signage / dye-sub fabric", "Mounting & finishing in-house"] },
  { slug: "finishing", title: "Finishing & Fulfillment", img: capFinishing, body: "Foil stamping, embossing, die-cutting, perfect binding, saddle-stitching, kitting, fulfillment, and warehousing. Everything that turns a print job into a finished product.", specs: ["Foil & emboss in-house", "Pick-pack-kit fulfillment", "30,000 sq ft warehousing", "API order integration"] },
];

const Capabilities = () => (
  <>
    <SEO
      title="Capabilities — Print, Packaging, Large Format, Finishing"
      description="Offset, digital, folding cartons, pressure-sensitive labels, wide-format, foil, emboss, kitting, fulfillment. Color-managed end to end. G7 Master qualified."
      path="/capabilities"
      jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Capabilities", path: "/capabilities" }])}
    />
    <PageHero
      eyebrow="Capabilities"
      title="Everything under one roof. Color-managed end to end."
      lede="Press, packaging, large format, finishing, and fulfillment in two Arizona facilities. One project manager, one quote, one accountable team."
    />

    <section className="py-20">
      <div className="container-x space-y-20">
        {items.map((i, idx) => (
          <div key={i.slug} className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${idx % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <Link to={`/capabilities/${i.slug}`}>
              <img src={i.img} alt={i.title} width={1280} height={960} loading="lazy" className="aspect-[4/3] object-cover w-full" />
            </Link>
            <div>
              <span className="eyebrow text-copper">0{idx + 1}</span>
              <h2 className="display-md mt-4">{i.title}</h2>
              <p className="mt-5 text-foreground/75 text-lg leading-relaxed">{i.body}</p>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {i.specs.map(s => (
                  <li key={s} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-2 h-px w-4 bg-copper flex-shrink-0" /> {s}
                  </li>
                ))}
              </ul>
              <Link to={`/capabilities/${i.slug}`} className="inline-flex items-center gap-2 mt-8 text-copper text-sm font-semibold uppercase tracking-wider hover:gap-3 transition-all">
                Detail page <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-copper text-bone py-16">
      <div className="container-x flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className="display-md max-w-xl">Have a brief? Let's price it.</h2>
        <Link to="/quote" className="bg-charcoal text-bone px-8 py-4 text-sm font-semibold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-charcoal-soft">
          Request a Quote <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  </>
);

export default Capabilities;
