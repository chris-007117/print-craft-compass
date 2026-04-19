import { useState } from "react";
import { z } from "zod";
import { PageHero } from "@/components/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Check, Package } from "lucide-react";
import { SEO, breadcrumbJsonLd } from "@/components/SEO";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  industry: z.string().max(60).optional().or(z.literal("")),
  address_line1: z.string().trim().min(2).max(180),
  address_line2: z.string().trim().max(180).optional().or(z.literal("")),
  city: z.string().trim().min(1).max(80),
  state: z.string().trim().min(1).max(40),
  postal_code: z.string().trim().min(3).max(20),
  country: z.string().trim().min(2).max(60),
});

const inputCls = "w-full bg-background border border-foreground/15 px-4 py-3 text-sm focus:outline-none focus:border-copper transition-colors";

const Samples = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", company: "", industry: "",
    address_line1: "", address_line2: "", city: "", state: "", postal_code: "", country: "United States",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const upd = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const ee: Record<string, string> = {};
      r.error.issues.forEach(i => { ee[String(i.path[0])] = i.message; });
      setErrors(ee);
      return;
    }
    setErrors({}); setLoading(true);
    const payload = {
      name: r.data.name,
      email: r.data.email,
      company: r.data.company || null,
      industry: r.data.industry || null,
      address_line1: r.data.address_line1,
      address_line2: r.data.address_line2 || null,
      city: r.data.city,
      state: r.data.state,
      postal_code: r.data.postal_code,
      country: r.data.country,
    };
    const { error } = await supabase.from("sample_requests").insert(payload);
    setLoading(false);
    if (error) { toast({ title: "Couldn't submit", description: error.message, variant: "destructive" }); return; }
    setSubmitted(true);
  };

  if (submitted) return (
    <>
      <PageHero eyebrow="Sample pack on the way" title="Your samples ship within 2 business days." lede="You'll receive a curated pack of premium substrates, foil and emboss demonstrations, and structural packaging samples." />
      <section className="py-20"><div className="container-x text-center"><div className="h-20 w-20 rounded-full bg-copper/15 mx-auto flex items-center justify-center"><Check className="h-10 w-10 text-copper" /></div></div></section>
    </>
  );

  return (
    <>
      <PageHero eyebrow="Free Sample Pack" title="See it. Touch it. Specify with confidence." lede="A curated pack of premium substrates, foil and emboss demonstrations, soft-touch laminations, and structural packaging samples — shipped free anywhere in the US." />

      <section className="py-16">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-4 bg-bone-warm p-8 h-fit">
            <Package className="h-9 w-9 text-copper" />
            <h3 className="font-display text-xl uppercase mt-5">Inside the pack</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {["12 premium uncoated & coated stocks","Soft-touch lamination samples","Copper, gold & holographic foil chips","Multi-level emboss demos","Spot UV gloss specimens","Folding carton structural samples"].map(s => (
                <li key={s} className="flex gap-2"><Check className="h-4 w-4 text-copper mt-0.5 flex-shrink-0" />{s}</li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">Free shipping in the US, 2 business days. International on request.</p>
          </aside>

          <form onSubmit={onSubmit} className="lg:col-span-8 space-y-5 bg-background">
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="text-xs uppercase tracking-wider mb-2 block">Name *</label><input className={inputCls} value={form.name} onChange={e=>upd("name",e.target.value)} maxLength={120}/>{errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}</div>
              <div><label className="text-xs uppercase tracking-wider mb-2 block">Email *</label><input type="email" className={inputCls} value={form.email} onChange={e=>upd("email",e.target.value)} maxLength={255}/>{errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}</div>
              <div><label className="text-xs uppercase tracking-wider mb-2 block">Company</label><input className={inputCls} value={form.company} onChange={e=>upd("company",e.target.value)} maxLength={120}/></div>
              <div><label className="text-xs uppercase tracking-wider mb-2 block">Industry</label>
                <select className={inputCls} value={form.industry} onChange={e=>upd("industry",e.target.value)}>
                  <option value="">Select…</option>
                  {["Healthcare","Technology","Consumer / Retail","Education","Financial","Other"].map(o=> <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="font-display text-lg uppercase mb-4">Shipping address</h4>
              <div className="space-y-5">
                <div><label className="text-xs uppercase tracking-wider mb-2 block">Address line 1 *</label><input className={inputCls} value={form.address_line1} onChange={e=>upd("address_line1",e.target.value)} maxLength={180}/>{errors.address_line1 && <p className="text-xs text-destructive mt-1">{errors.address_line1}</p>}</div>
                <div><label className="text-xs uppercase tracking-wider mb-2 block">Address line 2</label><input className={inputCls} value={form.address_line2} onChange={e=>upd("address_line2",e.target.value)} maxLength={180}/></div>
                <div className="grid sm:grid-cols-3 gap-5">
                  <div><label className="text-xs uppercase tracking-wider mb-2 block">City *</label><input className={inputCls} value={form.city} onChange={e=>upd("city",e.target.value)} maxLength={80}/>{errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}</div>
                  <div><label className="text-xs uppercase tracking-wider mb-2 block">State *</label><input className={inputCls} value={form.state} onChange={e=>upd("state",e.target.value)} maxLength={40}/>{errors.state && <p className="text-xs text-destructive mt-1">{errors.state}</p>}</div>
                  <div><label className="text-xs uppercase tracking-wider mb-2 block">ZIP *</label><input className={inputCls} value={form.postal_code} onChange={e=>upd("postal_code",e.target.value)} maxLength={20}/>{errors.postal_code && <p className="text-xs text-destructive mt-1">{errors.postal_code}</p>}</div>
                </div>
                <div><label className="text-xs uppercase tracking-wider mb-2 block">Country *</label><input className={inputCls} value={form.country} onChange={e=>upd("country",e.target.value)} maxLength={60}/></div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-copper mt-4 disabled:opacity-60">{loading ? "Sending…" : "Send My Sample Pack"} <ArrowRight className="h-4 w-4" /></button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Samples;
