import { Link } from "react-router-dom";

export const Logo = ({ light = false }: { light?: boolean }) => (
  <Link to="/" className="flex items-center gap-2.5 group" aria-label="Veridia Press home">
    <span className="relative flex h-9 w-9 items-center justify-center">
      <span className="absolute inset-0 bg-copper rotate-45" />
      <span className="relative font-display text-charcoal text-base leading-none font-bold">V</span>
    </span>
    <span className={`font-display text-lg uppercase tracking-tight ${light ? 'text-bone' : 'text-foreground'}`}>
      Veridia <span className="text-copper">Press</span>
    </span>
  </Link>
);
