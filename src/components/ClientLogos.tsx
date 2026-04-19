// Reusable inline SVG client logos — fictional but credible enterprise marks.
import { ReactNode } from "react";

const Mark = ({ children, label }: { children: ReactNode; label: string }) => (
  <div className="flex items-center justify-center h-12 px-4 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" aria-label={label}>
    {children}
  </div>
);

export const ClientLogos = () => (
  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-8 items-center">
    <Mark label="Meridian Health">
      <div className="flex items-center gap-2 text-foreground">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 12l10 10 10-10L12 2z" stroke="currentColor" strokeWidth="2"/></svg>
        <span className="font-display text-base uppercase tracking-tight">Meridian</span>
      </div>
    </Mark>
    <Mark label="Stratos Bio">
      <span className="font-display text-base uppercase tracking-[0.15em] text-foreground">stratos<sup className="text-copper">+</sup></span>
    </Mark>
    <Mark label="NovaCardio">
      <div className="flex items-center gap-1.5 text-foreground">
        <span className="block h-2 w-2 rounded-full bg-foreground" />
        <span className="font-semibold tracking-tight">NovaCardio</span>
      </div>
    </Mark>
    <Mark label="Helix Surgical">
      <span className="font-display text-base uppercase tracking-tight italic text-foreground">Helix<span className="text-copper">.</span></span>
    </Mark>
    <Mark label="Orbit Robotics">
      <div className="flex items-center gap-2 text-foreground">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>
        <span className="font-semibold uppercase text-sm tracking-wider">Orbit</span>
      </div>
    </Mark>
    <Mark label="Pacific Microdevice">
      <span className="font-display text-base uppercase text-foreground tracking-tight">PACIFIC<span className="text-copper">/</span>MD</span>
    </Mark>
    <Mark label="Lumen AI">
      <span className="font-display text-lg lowercase italic text-foreground">lumen<span className="text-copper font-bold">.ai</span></span>
    </Mark>
    <Mark label="Foundry42">
      <span className="font-mono text-sm font-bold tracking-tighter text-foreground">FOUNDRY<span className="text-copper">42</span></span>
    </Mark>
    <Mark label="Verdant Skincare">
      <span className="font-display text-base uppercase tracking-[0.25em] text-foreground">VERDANT</span>
    </Mark>
    <Mark label="Cascade Coffee">
      <div className="flex items-center gap-1.5 text-foreground">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 8c0-2 2-4 8-4s8 2 8 4-2 4-8 4-8-2-8-4z M4 16c0-2 2-4 8-4s8 2 8 4-2 4-8 4-8-2-8-4z" stroke="currentColor" strokeWidth="1.5"/></svg>
          <span className="font-display uppercase text-sm tracking-wider">Cascade</span>
        </div>
    </Mark>
    <Mark label="Marin Academy">
      <span className="font-display text-sm uppercase tracking-[0.3em] text-foreground">MARIN<br/>ACADEMY</span>
    </Mark>
    <Mark label="Northpoint">
      <div className="flex items-center gap-1 text-foreground">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 22,22 2,22"/></svg>
        <span className="font-semibold tracking-tight">Northpoint</span>
      </div>
    </Mark>
  </div>
);
