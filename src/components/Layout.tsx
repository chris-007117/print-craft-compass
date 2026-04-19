import { Header } from "./Header";
import { Footer } from "./Footer";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

export const Layout = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  const hideStickyCta = pathname === "/quote";
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1"><Outlet /></main>
      <Footer />
      {/* Sticky mobile quote CTA — high-intent conversion shortcut on small screens */}
      {!hideStickyCta && (
        <Link
          to="/quote"
          className="sm:hidden fixed bottom-4 right-4 z-40 btn-copper shadow-lg !py-3 !px-4 text-xs"
        >
          Request Quote <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
};
