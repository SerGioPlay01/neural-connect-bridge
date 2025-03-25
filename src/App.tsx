
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApiKeyProvider } from "./context/ApiKeyContext";
import { ChatProvider } from "./context/ChatContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import Guide from "./pages/Guide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ApiKeyProvider>
        <ChatProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ChatProvider>
      </ApiKeyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
