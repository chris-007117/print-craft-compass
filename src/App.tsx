import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Capabilities from "./pages/Capabilities";
import CapabilityDetail from "./pages/CapabilityDetail";
import Industries from "./pages/Industries";
import Work from "./pages/Work";
import CaseStudy from "./pages/CaseStudy";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogTaxonomy from "./pages/BlogTaxonomy";
import InsightsRedirect from "./pages/InsightsRedirect";
import Quote from "./pages/Quote";
import Samples from "./pages/Samples";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Accessibility from "./pages/Accessibility";
import AIPolicy from "./pages/AIPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/capabilities" element={<Capabilities />} />
            <Route path="/capabilities/:slug" element={<CapabilityDetail />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/category/:category" element={<BlogTaxonomy kind="category" />} />
            <Route path="/blog/tag/:tag" element={<BlogTaxonomy kind="tag" />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/insights" element={<InsightsRedirect />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/samples" element={<Samples />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/ai-policy" element={<AIPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
