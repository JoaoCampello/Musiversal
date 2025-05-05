import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Initialize React Query client for data fetching
const queryClient = new QueryClient();

/**
 * Main App Component
 * 
 * Sets up the application with providers for:
 * - React Query data fetching
 * - Tooltips
 * - Toast notifications (both regular and Sonner)
 * - Routing with React Router
 * 
 * @returns {JSX.Element} - Rendered application
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Notification systems */}
      <Toaster />
      <Sonner />
      
      {/* Application routing */}
      <BrowserRouter>
        <Routes>
          {/* Main page route */}
          <Route path="/" element={<Index />} />
          {/* Catch-all route for handling 404s */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
