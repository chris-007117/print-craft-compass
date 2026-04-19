import { useState, useRef } from "react";
import { z } from "zod";
import { PageHero } from "@/components/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Check, Phone, Mail, MapPin, Upload, FileText, X } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  subject: z.string().trim().min(2).max(180),
  message: z.string().trim().min(10).max(2000),
});

const inputCls = "w-full bg-background border border-foreground/15 px-4 py-3 text-sm focus:outline-none focus:border-copper";

const Contact = () => {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const upd = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const onFile = (f: File | null) => {
    if (!f) return;
    if (f.size > 25 * 1024 * 1024) { toast({ title: "Max 25MB", variant: "destructive" }); return; }
    setFile(f);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const ee: Record<string, string> = {};
      r.error.issues.forEach(i => { ee[String(i.path[0])] = i.message; });
      setErrors(ee); return;
    }
    setErrors({}); setLoading(true);
    let fileUrl: string | null = null;
    try {
      if (file) {
        const path = `contact/${Date.now()}-${file.name.replace(/[^a-z0-9.\-_]/gi,"_")}`;
        const { error: upErr } = await supabase.storage.from("artwork").upload(path, file);
        if (upErr) throw upErr;
        fileUrl = path;
      }
      const { error } = await supabase.from("contacts").insert({ ...r.data, file_url: fileUrl });
      if (error) throw error;
      setDone(true);
    } catch (err: any) {
      toast({ title: "Couldn't send", description: err.message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to a real human, not a chatbot." lede="A senior project manager will reply within 1 business day. Faster if you call." />

      <section className="py-16">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-4 space-y-8">
            <div>
              <p className="eyebrow text-copper mb-3">San Jose HQ</p>
              <p className="font-display text-lg uppercase">Forma & Press</p>
              <p className="text-sm text-muted-foreground mt-2 flex gap-2"><MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />2840 Industrial Way<br/>San Jose, CA 95131</p>
              <p className="text-sm mt-3 flex gap-2 items-center"><Phone className="h-4 w-4 text-copper" /><a href="tel:+14085551987" className="hover:text-copper">408.555.1987</a></p>
              <p className="text-sm flex gap-2 items-center mt-1.5"><Mail className="h-4 w-4 text-copper" /><a href="mailto:hello@formaandpress.com" className="hover:text-copper">hello@formaandpress.com</a></p>
              <p className="text-xs text-muted-foreground mt-2">Mon–Fri 7a–7p PT</p>
            </div>
            <div>
              <p className="eyebrow text-copper mb-3">Sacramento</p>
              <p className="text-sm text-muted-foreground flex gap-2"><MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />1112 North 16th St<br/>Sacramento, CA 95811</p>
              <p className="text-sm mt-3 flex gap-2 items-center"><Phone className="h-4 w-4 text-copper" /><a href="tel:+19165551987" className="hover:text-copper">916.555.1987</a></p>
              <p className="text-xs text-muted-foreground mt-2">Mon–Fri 7a–6p PT</p>
            </div>

            <div className="aspect-[4/3] bg-charcoal flex items-center justify-center text-bone/40 text-xs uppercase tracking-wider">
              Map placeholder
            </div>
          </aside>

          {done ? (
            <div className="lg:col-span-8 bg-bone-warm p-10 text-center">
              <div className="h-16 w-16 rounded-full bg-copper/15 mx-auto flex items-center justify-center"><Check className="h-8 w-8 text-copper" /></div>
              <h3 className="font-display text-2xl uppercase mt-6">Message received</h3>
              <p className="text-muted-foreground mt-3 max-w-md mx-auto">A team member will respond within 1 business day. For urgent matters, call us directly.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="lg:col-span-8 space-y-5 bg-bone-warm p-6 md:p-10">
              <div className="grid sm:grid-cols-2 gap-5">
                <div><label className="text-xs uppercase tracking-wider mb-2 block">Name *</label><input className={inputCls} value={form.name} onChange={e=>upd("name",e.target.value)} maxLength={120}/>{errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}</div>
                <div><label className="text-xs uppercase tracking-wider mb-2 block">Email *</label><input type="email" className={inputCls} value={form.email} onChange={e=>upd("email",e.target.value)} maxLength={255}/>{errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}</div>
                <div className="sm:col-span-2"><label className="text-xs uppercase tracking-wider mb-2 block">Company</label><input className={inputCls} value={form.company} onChange={e=>upd("company",e.target.value)} maxLength={120}/></div>
                <div className="sm:col-span-2"><label className="text-xs uppercase tracking-wider mb-2 block">Subject *</label><input className={inputCls} value={form.subject} onChange={e=>upd("subject",e.target.value)} maxLength={180}/>{errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}</div>
                <div className="sm:col-span-2"><label className="text-xs uppercase tracking-wider mb-2 block">Message *</label><textarea className={`${inputCls} min-h-[140px] resize-y`} value={form.message} onChange={e=>upd("message",e.target.value)} maxLength={2000}/>{errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}</div>
                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-wider mb-2 block">Attach a file (optional, max 25MB)</label>
                  <div onClick={() => fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();onFile(e.dataTransfer.files?.[0]??null)}} className="border-2 border-dashed border-foreground/20 hover:border-copper p-6 cursor-pointer text-center bg-background">
                    {file ? (
                      <div className="flex items-center justify-center gap-3 text-sm"><FileText className="h-5 w-5 text-copper" />{file.name}<button type="button" onClick={e=>{e.stopPropagation();setFile(null)}}><X className="h-4 w-4" /></button></div>
                    ) : (
                      <div className="text-muted-foreground text-sm"><Upload className="h-5 w-5 mx-auto mb-2" />Drop a file or <span className="text-copper">browse</span></div>
                    )}
                    <input ref={fileRef} type="file" className="hidden" onChange={e=>onFile(e.target.files?.[0]??null)} />
                  </div>
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-copper mt-2 disabled:opacity-60">{loading ? "Sending…" : "Send Message"} <ArrowRight className="h-4 w-4" /></button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Contact;
