import { PageHero } from "@/components/PageHero";
import { SEO, breadcrumbJsonLd } from "@/components/SEO";

const Terms = () => (
  <>
    <SEO
      title="Terms of Service"
      description="The terms governing use of veridiapress.com and Veridia Press print services."
      path="/terms"
      jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }])}
    />
    <PageHero eyebrow="Legal" title="Terms of Service" lede="Plain-language terms covering quotes, proofs, payment, and acceptance." />
    <section className="py-16">
      <div className="container-x prose max-w-3xl">
        <h2 className="font-display text-2xl uppercase mt-0">Quotes</h2>
        <p className="text-foreground/75">Quotes are valid for 30 days unless otherwise noted. Final pricing depends on furnished art, paper market conditions, and approved overs/unders (±5%).</p>
        <h2 className="font-display text-2xl uppercase mt-10">Proofs & approval</h2>
        <p className="text-foreground/75">Production begins on signed proof approval. Color tolerance is ΔE ≤ 4 against G7 master.</p>
        <h2 className="font-display text-2xl uppercase mt-10">Payment</h2>
        <p className="text-foreground/75">Net 30 for established accounts; 50% deposit on first orders.</p>
      </div>
    </section>
  </>
);
export default Terms;
