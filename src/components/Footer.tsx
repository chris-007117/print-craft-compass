import { Link } from "react-router-dom";
import { useState } from "react";
import { Logo } from "./Logo";
import { Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().trim().email().max(255);

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const subscribe = async (e: React.FormEvent) => {
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
      toast({ title: "Subscribed", description: "Welcome to Insights from Veridia Press." });
      setEmail("");
    }
  };

  return (
    <footer className="bg-charcoal text-bone/80 relative noise">
      <div className="container-x py-16 lg:py-20 relative">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-5 text-sm leading-relaxed max-w-sm">
              Premium commercial print and packaging for ambitious brands. Family-rooted craft, $50M-grade execution.
            </p>
            <form onSubmit={subscribe} className="mt-6 flex max-w-sm">
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border border-bone/20 px-4 py-3 text-sm text-bone placeholder:text-bone/40 focus:outline-none focus:border-copper"
              />
              <button type="submit" disabled={loading} className="bg-copper px-4 hover:bg-copper-bright transition-colors" aria-label="Subscribe">
                <ArrowRight className="h-4 w-4 text-charcoal" />
              </button>
            </form>
            <p className="mt-3 text-xs text-bone/50">Quarterly Insights. No spam.</p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-bone mb-4">Capabilities</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/capabilities/commercial-print" className="hover:text-copper">Commercial Print</Link></li>
              <li><Link to="/capabilities/packaging" className="hover:text-copper">Packaging</Link></li>
              <li><Link to="/capabilities/large-format" className="hover:text-copper">Large Format</Link></li>
              <li><Link to="/capabilities/finishing" className="hover:text-copper">Finishing</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-bone mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-copper">About</Link></li>
              <li><Link to="/work" className="hover:text-copper">Case Studies</Link></li>
              <li><Link to="/industries" className="hover:text-copper">Industries</Link></li>
              <li><Link to="/blog" className="hover:text-copper">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-copper">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-bone mb-4">Locations</h4>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-copper font-medium uppercase text-xs tracking-wider mb-2">Scottsdale HQ</p>
                <p>8410 N Scottsdale Rd<br/>Scottsdale, AZ 85253</p>
                <p className="mt-2"><a href="tel:+16025551987" className="hover:text-copper">602.555.1987</a></p>
                <p className="text-xs text-bone/60 mt-1">Mon–Fri 7a–7p MT</p>
              </div>
              <div>
                <p className="text-copper font-medium uppercase text-xs tracking-wider mb-2">Phoenix Production</p>
                <p>4520 W Buckeye Rd<br/>Phoenix, AZ 85043</p>
                <p className="mt-2"><a href="tel:+16025552987" className="hover:text-copper">602.555.2987</a></p>
                <p className="text-xs text-bone/60 mt-1">Mon–Fri 7a–6p MT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-14 pt-10 border-t border-bone/10">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-bone/50">Certified</span>
            {["G7 Master Qualified", "FSC® C-145288", "SOC 2 Type II", "SGP Certified", "ISO 14001"].map(c => (
              <span key={c} className="text-xs uppercase tracking-wider text-bone/80 border border-bone/15 px-3 py-1.5">{c}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-bone/10">
        <div className="container-x py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-bone/50">
          <p>© {new Date().getFullYear()} Veridia Press, Inc. All rights reserved.</p>
          <div className="flex items-center gap-5 flex-wrap">
            <a href="#" aria-label="Instagram" className="hover:text-copper"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-copper"><Linkedin className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-copper"><Twitter className="h-4 w-4" /></a>
            <Link to="/privacy" className="hover:text-copper">Privacy</Link>
            <Link to="/terms" className="hover:text-copper">Terms</Link>
            <Link to="/accessibility" className="hover:text-copper">Accessibility</Link>
            <Link to="/ai-policy" className="hover:text-copper">AI Usage</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
