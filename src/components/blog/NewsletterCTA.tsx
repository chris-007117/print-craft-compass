import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().trim().email().max(255);

export const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast({ title: "Invalid email", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("newsletter_signups").insert({ email: parsed.data });
    setLoading(false);
    if (error && !error.message.includes("duplicate")) {
      toast({ title: "Couldn't subscribe", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Subscribed", description: "You're on the list." });
      setEmail("");
    }
  };

  return (
    <section className="mt-20 bg-charcoal text-bone relative overflow-hidden noise">
      <div className="container-x py-16 md:py-20 text-center relative">
        <p className="eyebrow text-copper justify-center mb-5">Newsletter</p>
        <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight max-w-2xl mx-auto leading-tight">
          Get print industry insights delivered monthly.
        </h2>
        <p className="mt-4 text-bone/70 max-w-lg mx-auto">
          Long-form notes on color, paper, packaging, and craft. No spam, ever.
        </p>
        <form onSubmit={submit} className="mt-8 flex max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent border border-bone/30 px-4 py-3 text-sm text-bone placeholder:text-bone/40 focus:outline-none focus:border-copper"
          />
          <button type="submit" disabled={loading} className="bg-copper px-5 hover:bg-copper-bright transition-colors text-charcoal font-semibold text-sm uppercase tracking-wider inline-flex items-center gap-2">
            Subscribe <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
};
