import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import capCommercial from "@/assets/cap-commercial.jpg";
import capPackaging from "@/assets/cap-packaging.jpg";
import capLargeformat from "@/assets/cap-largeformat.jpg";
import capFinishing from "@/assets/cap-finishing.jpg";
import { SEO, breadcrumbJsonLd, serviceJsonLd } from "@/components/SEO";

const data: Record<string, { title: string; eyebrow: string; lede: string; img: string; specs: string[]; substrates: string[]; finishes: string[] }> = {
  "commercial-print": {
    title: "Commercial Print",
    eyebrow: "Capability · 01",
    lede: "Offset and digital production for annual reports, brochures, catalogs, lookbooks, and direct mail.",
    img: capCommercial,
    specs: ["Heidelberg Speedmaster XL 106 (6-color + coater)", "HP Indigo 12000 digital press", "Max sheet 41\" × 29\"", "G7 Master Qualified color", "Pantone, GRACoL, FOGRA workflows", "Variable data printing"],
    substrates: ["Uncoated 60# – 130# cover", "Coated gloss / matte / silk", "Mohawk Superfine, Strathmore, Fedrigoni", "Synthetic substrates (Yupo, Polyart)", "FSC certified-fiber stocks"],
    finishes: ["Aqueous coating (gloss / matte / satin)", "Spot UV", "Soft-touch lamination", "Foil stamping (gold, silver, copper, holographic)", "Embossing and debossing", "Die-cutting"],
  },
  "packaging": {
    title: "Packaging & Folding Cartons",
    eyebrow: "Capability · 02",
    lede: "Folding cartons, sleeves, and set-up boxes for medical, technology, and consumer brands.",
    img: capPackaging,
    specs: ["Folding cartons 12pt – 24pt", "Set-up rigid boxes", "Sleeves and belly-bands", "Sterile-barrier-ready medical packaging", "FDA 21 CFR Part 820 aligned", "Lot traceability and serialization"],
    substrates: ["SBS C1S/C2S 12 – 24 pt", "Recycled board (CRB, URB)", "Microflute E and F", "Soft-touch laminated stocks", "Metallized polyester laminates"],
    finishes: ["Soft-touch laminations", "Copper, gold, holographic foil", "Multi-level embossing", "Spot UV with grit", "Window patching", "Specialty die-cutting"],
  },
  "large-format": {
    title: "Large Format & Display",
    eyebrow: "Capability · 03",
    lede: "Retail signage, trade show graphics, vehicle wraps, and environmental graphics.",
    img: capLargeformat,
    specs: ["Print width up to 120\"", "UV-LED flatbed (rigid up to 2\")", "Latex roll-to-roll for fabric and vinyl", "Dye-sublimation soft signage", "Cut-contour and laser routing", "Installation services in CA"],
    substrates: ["Vinyl (calendared, cast, perforated)", "Fabric (poly knit, blockout)", "Acrylic, PVC, foam-core, MDO", "Aluminum and Dibond", "Window and floor graphics film"],
    finishes: ["Lamination (UV, anti-graffiti)", "Mounting and routing", "Grommets, pole pockets, hemming", "Custom hardware and kits", "Fire-rated treatments"],
  },
  "finishing": {
    title: "Finishing & Fulfillment",
    eyebrow: "Capability · 04",
    lede: "Foil, emboss, bind, kit, store, and ship — all in-house.",
    img: capFinishing,
    specs: ["Foil stamping (Bobst & Heidelberg)", "Multi-level embossing", "Die-cutting (steel rule and laser)", "Perfect, saddle, Wire-O, PUR binding", "Pick-pack-kit fulfillment", "30,000 sq ft secure warehousing"],
    substrates: ["Any commercial print substrate", "Specialty fine papers", "Soft-touch and synthetic stocks", "Foil-friendly coatings"],
    finishes: ["Cold and hot foil", "Multi-level (sculpted) emboss", "Spot gloss UV with raised effect", "Edge painting and gilding", "Custom packaging assembly", "API-driven fulfillment workflows"],
  },
};

const CapabilityDetail = () => {
  const { slug } = useParams();
  const d = slug ? data[slug] : null;
  if (!d) return <Navigate to="/capabilities" replace />;

  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.title} lede={d.lede} />

      <section className="py-16">
        <div className="container-x">
          <img src={d.img} alt={d.title} width={1280} height={960} loading="lazy" className="w-full aspect-[16/8] object-cover" />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x grid lg:grid-cols-3 gap-10">
          {[
            { t: "Equipment & Specs", items: d.specs },
            { t: "Substrates", items: d.substrates },
            { t: "Finishes", items: d.finishes },
          ].map(col => (
            <div key={col.t}>
              <h3 className="font-display text-lg uppercase tracking-tight border-b border-foreground/15 pb-3 mb-5">{col.t}</h3>
              <ul className="space-y-3">
                {col.items.map(s => (
                  <li key={s} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-copper mt-0.5 flex-shrink-0" /> <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-charcoal text-bone py-16">
        <div className="container-x flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="display-md max-w-xl">Ready to spec your project?</h2>
            <p className="text-bone/70 mt-3">A senior project manager replies within 24 hours.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/quote" className="btn-copper">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/samples" className="btn-ghost-light">Order Samples</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CapabilityDetail;
