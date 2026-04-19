import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const Layout = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
};
