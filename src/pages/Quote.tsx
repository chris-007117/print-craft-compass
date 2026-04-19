import { useState, useRef } from "react";
import { z } from "zod";
import { PageHero } from "@/components/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ArrowLeft, Check, Upload, FileText, X } from "lucide-react";
import { SEO, breadcrumbJsonLd } from "@/components/SEO";

const step1Schema = z.object({ project_type: z.string().min(1, "Select a project type") });
const step2Schema = z.object({
  size: z.string().max(120).optional(),
  quantity: z.string().max(60).optional(),
  paper: z.string().max(120).optional(),
  finish: z.string().max(120).optional(),
});
const step3Schema = z.object({
  timeline: z.string().min(1, "Select a timeline"),
  message: z.string().trim().max(2000).optional(),
});
const step4Schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(120),
  email: z.string().trim().email("Valid email required").max(255),
  company: z.string().trim().max(120).optional(),
  phone: z.string().trim().max(40).optional(),
});

const projectTypes = ["Commercial Print", "Folding Cartons / Packaging", "Large Format / Display", "Finishing & Fulfillment", "Multi-discipline / Not sure"];
const timelines = ["ASAP (rush)", "2–3 weeks", "1–2 months", "Quarterly / planned", "Just exploring"];
const STEPS = ["Project", "Specs", "Timeline", "Contact"];

const Field = ({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) => (
  <div>
    <label className="block text-xs uppercase tracking-wider text-foreground/70 mb-2">{label}</label>
    {children}
    {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
  </div>
);

const inputCls = "w-full bg-background border border-foreground/15 px-4 py-3 text-sm focus:outline-none focus:border-copper transition-colors";

const Quote = () => {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [data, setData] = useState({
    project_type: "", size: "", quantity: "", paper: "", finish: "",
    timeline: "", message: "", name: "", email: "", company: "", phone: "",
  });

  const update = (k: string, v: string) => setData(d => ({ ...d, [k]: v }));

  const validateStep = (): boolean => {
    const schemas = [step1Schema, step2Schema, step3Schema, step4Schema];
    const r = schemas[step].safeParse(data);
    if (!r.success) {
      const e: Record<string, string> = {};
      r.error.issues.forEach(i => { e[String(i.path[0])] = i.message; });
      setErrors(e);
      return false;
    }
    setErrors({});
    return true;
  };

  const next = () => { if (validateStep()) setStep(s => Math.min(s + 1, STEPS.length - 1)); };
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const onFile = (f: File | null) => {
    if (!f) return;
    if (f.size > 50 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 50MB.", variant: "destructive" });
      return;
    }
    setFile(f);
  };

  const submit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    let fileUrl: string | null = null;
    try {
      if (file) {
        const path = `${Date.now()}-${file.name.replace(/[^a-z0-9.\-_]/gi, "_")}`;
        const { error: upErr } = await supabase.storage.from("artwork").upload(path, file);
        if (upErr) throw upErr;
        fileUrl = path;
      }
      const { error } = await supabase.from("quote_requests").insert({ ...data, file_url: fileUrl });
      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      toast({ title: "Submission failed", description: err.message ?? "Try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <PageHero eyebrow="Request received" title="Thank you. We're on it." lede="A senior project manager will review your brief and reply within 24 hours — typically the same business day." />
        <section className="py-20">
          <div className="container-x text-center max-w-xl mx-auto">
            <div className="h-20 w-20 rounded-full bg-copper/15 mx-auto flex items-center justify-center">
              <Check className="h-10 w-10 text-copper" />
            </div>
            <p className="mt-8 text-muted-foreground">For urgent projects, call <a href="tel:+14085551987" className="text-copper font-semibold">408.555.1987</a> and reference your email address.</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Request a Quote" title="Tell us about the project." lede="Four short steps. We'll come back with paper recommendations, schedule, and pricing within 24 hours." />

      <section className="py-16">
        <div className="container-x max-w-3xl">
          {/* Stepper */}
          <ol className="flex items-center gap-2 mb-12">
            {STEPS.map((s, i) => (
              <li key={s} className="flex-1 flex items-center gap-2">
                <div className={`flex items-center gap-3 ${i <= step ? 'text-foreground' : 'text-muted-foreground'}`}>
                  <span className={`h-8 w-8 flex items-center justify-center text-xs font-display border ${i < step ? 'bg-copper text-bone border-copper' : i === step ? 'border-copper text-copper' : 'border-foreground/20'}`}>
                    {i < step ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                  <span className="hidden sm:inline text-xs uppercase tracking-wider">{s}</span>
                </div>
                {i < STEPS.length - 1 && <span className={`flex-1 h-px ${i < step ? 'bg-copper' : 'bg-foreground/15'}`} />}
              </li>
            ))}
          </ol>

          <div className="bg-bone-warm p-6 md:p-10 animate-fade-up" key={step}>
            {step === 0 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl uppercase">What kind of project?</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {projectTypes.map(p => (
                    <button
                      key={p}
                      onClick={() => update("project_type", p)}
                      className={`text-left px-4 py-4 border transition-all ${data.project_type === p ? 'border-copper bg-background' : 'border-foreground/15 bg-background/50 hover:border-foreground/30'}`}
                    >
                      <span className="text-sm font-medium">{p}</span>
                    </button>
                  ))}
                </div>
                {errors.project_type && <p className="text-xs text-destructive">{errors.project_type}</p>}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl uppercase">Specs (best guesses are fine)</h2>
                <Field label="Size or format"><input className={inputCls} placeholder='e.g. 8.5"×11" booklet, 4"×6" carton' value={data.size} onChange={e => update("size", e.target.value)} maxLength={120}/></Field>
                <Field label="Quantity"><input className={inputCls} placeholder="e.g. 5,000" value={data.quantity} onChange={e => update("quantity", e.target.value)} maxLength={60}/></Field>
                <Field label="Paper / substrate"><input className={inputCls} placeholder="e.g. 100# silk cover, 18pt SBS" value={data.paper} onChange={e => update("paper", e.target.value)} maxLength={120}/></Field>
                <Field label="Finishes"><input className={inputCls} placeholder="e.g. soft-touch lam, copper foil, die-cut" value={data.finish} onChange={e => update("finish", e.target.value)} maxLength={120}/></Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl uppercase">Timeline & details</h2>
                <Field label="When do you need this?" error={errors.timeline}>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {timelines.map(t => (
                      <button key={t} onClick={() => update("timeline", t)} className={`text-left px-4 py-3 border text-sm ${data.timeline === t ? 'border-copper bg-background' : 'border-foreground/15 bg-background/50 hover:border-foreground/30'}`}>{t}</button>
                    ))}
                  </div>
                </Field>
                <Field label="Anything else we should know?">
                  <textarea className={`${inputCls} min-h-[120px] resize-y`} value={data.message} onChange={e => update("message", e.target.value)} maxLength={2000} placeholder="Brand context, deadlines, sustainability priorities…" />
                </Field>
                <Field label="Upload artwork or brief (optional, max 50MB)">
                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); onFile(e.dataTransfer.files?.[0] ?? null); }}
                    onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed border-foreground/20 hover:border-copper cursor-pointer p-8 text-center transition-colors bg-background"
                  >
                    {file ? (
                      <div className="flex items-center justify-center gap-3 text-sm">
                        <FileText className="h-5 w-5 text-copper" />
                        <span className="font-medium">{file.name}</span>
                        <button onClick={e => { e.stopPropagation(); setFile(null); }} aria-label="Remove file"><X className="h-4 w-4 text-muted-foreground" /></button>
                      </div>
                    ) : (
                      <div className="text-muted-foreground">
                        <Upload className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm">Drag & drop or <span className="text-copper">browse</span></p>
                        <p className="text-xs mt-1">PDF, AI, INDD, ZIP — up to 50MB</p>
                      </div>
                    )}
                    <input ref={fileRef} type="file" className="hidden" onChange={e => onFile(e.target.files?.[0] ?? null)} />
                  </div>
                </Field>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl uppercase">Where do we send the quote?</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Name *" error={errors.name}><input className={inputCls} value={data.name} onChange={e => update("name", e.target.value)} maxLength={120}/></Field>
                  <Field label="Company"><input className={inputCls} value={data.company} onChange={e => update("company", e.target.value)} maxLength={120}/></Field>
                  <Field label="Email *" error={errors.email}><input type="email" className={inputCls} value={data.email} onChange={e => update("email", e.target.value)} maxLength={255}/></Field>
                  <Field label="Phone"><input type="tel" className={inputCls} value={data.phone} onChange={e => update("phone", e.target.value)} maxLength={40}/></Field>
                </div>
                <p className="text-xs text-muted-foreground pt-2">By submitting you agree to be contacted by Forma & Press regarding this quote. We never share your information.</p>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <button onClick={prev} disabled={step === 0} className="btn-ghost-dark disabled:opacity-30 disabled:cursor-not-allowed"><ArrowLeft className="h-4 w-4" /> Back</button>
            {step < STEPS.length - 1
              ? <button onClick={next} className="btn-copper">Continue <ArrowRight className="h-4 w-4" /></button>
              : <button onClick={submit} disabled={submitting} className="btn-copper disabled:opacity-60">{submitting ? "Submitting…" : "Submit Request"} <ArrowRight className="h-4 w-4" /></button>}
          </div>
        </div>
      </section>
    </>
  );
};

export default Quote;
