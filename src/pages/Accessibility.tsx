import { PageHero } from "@/components/PageHero";
import { SEO, breadcrumbJsonLd } from "@/components/SEO";

const Accessibility = () => (
  <>
    <SEO
      title="Accessibility Statement"
      description="Veridia Press is committed to WCAG 2.1 AA accessibility across veridiapress.com."
      path="/accessibility"
      jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Accessibility", path: "/accessibility" }])}
    />
    <PageHero eyebrow="Legal" title="Accessibility Statement" lede="We design, build, and test against WCAG 2.1 AA." />
    <section className="py-16">
      <div className="container-x prose max-w-3xl">
        <p className="text-foreground/75">This site targets WCAG 2.1 Level AA. We test color contrast (4.5:1 body, 3:1 large), keyboard navigation, semantic landmarks, alt text on imagery, and respect for <code>prefers-reduced-motion</code>.</p>
        <h2 className="font-display text-2xl uppercase mt-10">Report a barrier</h2>
        <p className="text-foreground/75">Email <a href="mailto:accessibility@veridiapress.com" className="text-copper">accessibility@veridiapress.com</a>. We respond within five business days.</p>
      </div>
    </section>
  </>
);
export default Accessibility;
