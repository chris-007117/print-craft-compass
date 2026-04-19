import { ReactNode } from "react";

export const PageHero = ({ eyebrow, title, lede, children }: { eyebrow: string; title: string; lede?: string; children?: ReactNode }) => (
  <section className="bg-charcoal text-bone py-20 md:py-28 relative overflow-hidden">
    <div className="absolute -right-32 -top-32 w-[500px] h-[500px] sunburst opacity-60 pointer-events-none animate-spin-slow" />
    <div className="container-x relative">
      <span className="eyebrow text-copper">{eyebrow}</span>
      <h1 className="display-lg mt-5 max-w-4xl text-bone">{title}</h1>
      {lede && <p className="mt-6 text-lg md:text-xl text-bone/75 max-w-2xl leading-relaxed">{lede}</p>}
      {children}
    </div>
  </section>
);
