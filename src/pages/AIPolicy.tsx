import { PageHero } from "@/components/PageHero";
import { SEO, breadcrumbJsonLd } from "@/components/SEO";

const AIPolicy = () => (
  <>
    <SEO
      title="AI Usage Policy"
      description="How Veridia Press uses, restricts, and discloses artificial intelligence in production and on this site."
      path="/ai-policy"
      jsonLd={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "AI Policy", path: "/ai-policy" }])}
    />
    <PageHero eyebrow="Legal" title="AI Usage Policy" lede="Where AI helps us — and where humans always sign off." />
    <section className="py-16">
      <div className="container-x prose max-w-3xl">
        <h2 className="font-display text-2xl uppercase mt-0">In production</h2>
        <p className="text-foreground/75">We use AI for color-prediction, preflight automation, and copy assistance on internal documentation. Press operators and project managers approve every job before it runs.</p>
        <h2 className="font-display text-2xl uppercase mt-10">On this website</h2>
        <p className="text-foreground/75">AI assisted in drafting some marketing copy and imagery. Humans reviewed and approved everything published. We block GPTBot, ClaudeBot, CCBot, Bytespider, and Google-Extended from training on our content.</p>
        <h2 className="font-display text-2xl uppercase mt-10">Your data</h2>
        <p className="text-foreground/75">We never feed customer artwork, quotes, or PII into third-party AI systems.</p>
      </div>
    </section>
  </>
);
export default AIPolicy;
