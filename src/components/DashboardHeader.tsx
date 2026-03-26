import { useState } from "react";
import { Bell, Search, Bot, Send, X } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export function DashboardHeader() {
  const [aiQuery, setAiQuery] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const navigate = useNavigate();

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiQuery.trim()) {
      navigate("/ai-assistant");
    }
  };

  return (
    <header className="flex h-14 items-center justify-between border-b px-4 relative">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="text-lg font-bold text-foreground">Dashboard</h1>
      </div>
      <div className="flex items-center gap-2">
        {/* AI Assistant CTA */}
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-primary border-primary/30 hover:bg-primary/10"
          onClick={() => setAiOpen((prev) => !prev)}
        >
          <Bot className="h-4 w-4" />
          <span className="hidden sm:inline">AI Assistant</span>
        </Button>

        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          JD
        </div>
      </div>

      {/* Persistent AI dropdown */}
      <AnimatePresence>
        {aiOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: [0, -4, 0],
              scale: 1,
            }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              y: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            className="absolute right-4 top-[calc(100%+8px)] z-50 w-80 rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg"
          >
            {/* Glow effect */}
            <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-sm -z-10" />

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Bot className="h-5 w-5 text-primary" />
                </motion.div>
                <h4 className="font-semibold text-foreground">AI Personal Assistant</h4>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-foreground"
                onClick={() => setAiOpen(false)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              Ask anything about your properties, tenants, or tasks.
            </p>

            <form onSubmit={handleAiSubmit} className="flex gap-2 mb-2">
              <Input
                placeholder="Ask AI something..."
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="flex-1 text-sm"
              />
              <Button type="submit" size="icon" variant="default">
                <Send className="h-4 w-4" />
              </Button>
            </form>

            <Button
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={() => navigate("/ai-assistant")}
            >
              Open full AI Assistant →
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
