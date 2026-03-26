import { useState } from "react";
import { Bell, Search, Bot, Send } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

export function DashboardHeader() {
  const [aiQuery, setAiQuery] = useState("");
  const navigate = useNavigate();

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiQuery.trim()) {
      navigate("/ai-assistant");
    }
  };

  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="text-lg font-bold text-foreground">Dashboard</h1>
      </div>
      <div className="flex items-center gap-2">
        {/* AI Assistant CTA */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 text-primary border-primary/30 hover:bg-primary/10">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <h4 className="font-semibold text-foreground">AI Personal Assistant</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Ask anything about your properties, tenants, or tasks.
              </p>
              <form onSubmit={handleAiSubmit} className="flex gap-2">
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
            </div>
          </PopoverContent>
        </Popover>

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
    </header>
  );
}
