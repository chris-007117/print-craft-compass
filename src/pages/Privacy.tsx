import { PageHero } from "@/components/PageHero";
import { SEO, breadcrumbJsonLd } from "@/components/SEO";

const Privacy = () => (
  <>
    <SEO
      title="Privacy Policy"
      description="How Veridia Press collects, uses, and protects your information."
      path="/privacy"
      jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }])}
    />
    <PageHero eyebrow="Legal" title="Privacy Policy" lede="Last updated April 2026. We collect only what we need to quote and ship your work." />
    <section className="py-16">
      <div className="container-x prose max-w-3xl">
        <h2 className="font-display text-2xl uppercase mt-0">What we collect</h2>
        <p className="text-foreground/75">Contact details you submit through forms (name, email, phone, company), uploaded artwork, and basic analytics (pages viewed, referrer, device).</p>
        <h2 className="font-display text-2xl uppercase mt-10">How we use it</h2>
        <p className="text-foreground/75">To prepare quotes, deliver printed work, and send Insights only to subscribers. We do not sell your data.</p>
        <h2 className="font-display text-2xl uppercase mt-10">Your rights</h2>
        <p className="text-foreground/75">Email <a href="mailto:privacy@veridiapress.com" className="text-copper">privacy@veridiapress.com</a> to access, correct, or delete your data.</p>
      </div>
    </section>
  </>
);
export default Privacy;
