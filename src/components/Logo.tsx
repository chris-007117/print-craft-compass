import { Link } from "react-router-dom";

export const Logo = ({ light = false }: { light?: boolean }) => (
  <Link to="/" className="flex items-center gap-2 group" aria-label="Forma & Press home">
    <span className="relative flex h-8 w-8 items-center justify-center">
      <span className="absolute inset-0 rounded-full bg-copper" />
      <span className="relative font-display text-bone text-lg leading-none">F</span>
    </span>
    <span className={`font-display text-lg uppercase tracking-tight ${light ? 'text-bone' : 'text-foreground'}`}>
      Forma <span className="text-copper">&</span> Press
    </span>
  </Link>
);
