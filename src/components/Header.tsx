import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";

const nav = [
  { to: "/capabilities", label: "Capabilities" },
  { to: "/industries", label: "Industries" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/insights", label: "Insights" },
  { to: "/contact", label: "Contact" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  // Dark transparent header on home, solid on inner pages
  const isHome = loc.pathname === "/";

  return (
    <header className={`sticky top-0 z-50 ${isHome ? 'bg-charcoal/90 backdrop-blur-md' : 'bg-charcoal'} border-b border-bone/10`}>
      <div className="container-x flex h-16 items-center justify-between">
        <Logo light />
        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `text-xs font-medium uppercase tracking-[0.18em] transition-colors ${
                  isActive ? 'text-copper' : 'text-bone/80 hover:text-bone'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="tel:+14085551987" className="hidden md:flex items-center gap-2 text-bone/70 hover:text-bone text-xs">
            <Phone className="h-3.5 w-3.5" /> 408.555.1987
          </a>
          <Link to="/quote" className="hidden sm:inline-flex btn-copper !py-2.5 !px-4 text-xs">
            Request a Quote
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-bone p-2 -mr-2"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-charcoal border-t border-bone/10">
          <nav className="container-x py-6 flex flex-col gap-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-sm font-medium uppercase tracking-[0.18em] border-b border-bone/10 ${
                    isActive ? 'text-copper' : 'text-bone/90'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Link to="/quote" onClick={() => setOpen(false)} className="btn-copper mt-4 self-start">
              Request a Quote
            </Link>
            <a href="tel:+14085551987" className="mt-3 text-bone/70 text-sm">408.555.1987</a>
          </nav>
        </div>
      )}
    </header>
  );
};
