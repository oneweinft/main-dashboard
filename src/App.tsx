import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import AIAssistant from "./pages/AIAssistant.tsx";
import AIReceptionist from "./pages/AIReceptionist.tsx";
import Documents from "./pages/Documents.tsx";
import Inspections from "./pages/Inspections.tsx";
import ServicesPortal from "./pages/ServicesPortal.tsx";
import Compliance from "./pages/Compliance.tsx";
import Reports from "./pages/Reports.tsx";
import Maintenance from "./pages/Maintenance.tsx";
import RenterPortal from "./pages/RenterPortal.tsx";
import RentalProviderPortal from "./pages/RentalProviderPortal.tsx";
import TradiePortal from "./pages/TradiePortal.tsx";
import Migration from "./pages/Migration.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import Tasks from "./pages/Tasks.tsx";
import Contacts from "./pages/Contacts.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/ai-receptionist" element={<AIReceptionist />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/inspections" element={<Inspections />} />
          <Route path="/services-portal" element={<ServicesPortal />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/renter-portal" element={<RenterPortal />} />
          <Route path="/rental-provider-portal" element={<RentalProviderPortal />} />
          <Route path="/tradie-portal" element={<TradiePortal />} />
          <Route path="/migration" element={<Migration />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/contacts" element={<Contacts />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
