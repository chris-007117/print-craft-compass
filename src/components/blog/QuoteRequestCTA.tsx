import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const QuoteRequestCTA = ({ variant = "inline" }: { variant?: "inline" | "prominent" }) => {
  if (variant === "prominent") {
    return (
      <aside className="mt-16 bg-charcoal text-bone p-8 md:p-10 relative overflow-hidden noise">
        <p className="eyebrow text-copper mb-4">Next step</p>
        <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight leading-tight">
          Need custom printing for your business?
        </h3>
        <p className="mt-3 text-bone/70 max-w-xl">
          Tell us what you're making — paper, finish, schedule. We'll come back with a real quote in 24 hours.
        </p>
        <Link to="/quote" className="btn-copper mt-6">
          Request a Quote <ArrowRight className="h-4 w-4" />
        </Link>
      </aside>
    );
  }
  return (
    <aside className="my-10 border border-copper/30 bg-copper/5 p-6 md:p-7 not-prose">
      <p className="font-display text-lg md:text-xl uppercase tracking-tight leading-snug">
        Need custom printing for your business?
      </p>
      <p className="mt-2 text-sm text-muted-foreground">Get a quote from Veridia Press — paper, finish, schedule, price in 24 hours.</p>
      <Link to="/quote" className="btn-copper mt-4 !py-2.5 !px-5 text-xs">
        Request a Quote <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </aside>
  );
};
