import { useState, useMemo } from "react";
import { Bell, Search, Bot, Send, X, Mic, Calculator, DollarSign } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function MiniOrb({ isListening }: { isListening: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      {[1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 60 + i * 18,
            height: 60 + i * 18,
            background: `radial-gradient(circle, hsla(160, 80%, 50%, ${0.06 - i * 0.02}) 0%, transparent 70%)`,
          }}
          animate={{
            scale: isListening ? [1, 1.12, 1] : [1, 1.04, 1],
            opacity: isListening ? [0.5, 1, 0.5] : [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.div
        className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, hsl(160, 80%, 75%), hsl(160, 80%, 50%) 40%, hsl(170, 70%, 35%) 70%, hsl(180, 60%, 15%) 100%)",
          boxShadow:
            "0 0 30px 8px hsla(160, 80%, 50%, 0.3), 0 0 60px 20px hsla(160, 80%, 50%, 0.15), inset 0 0 20px 5px hsla(160, 80%, 70%, 0.3)",
        }}
        animate={{
          scale: isListening ? [1, 1.08, 1] : [1, 1.03, 1],
          rotate: [0, 360],
        }}
        transition={{
          scale: { duration: isListening ? 1.5 : 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      >
        <motion.div
          className="absolute inset-2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, hsla(155, 100%, 90%, 0.9), hsla(160, 80%, 50%, 0.3) 50%, transparent 70%)",
          }}
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, hsla(160, 80%, 50%, 0.15), transparent, hsla(160, 70%, 40%, 0.1), transparent)",
          }}
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}

type RentPeriod = "daily" | "weekly" | "fortnightly" | "monthly" | "6monthly" | "yearly";

const periodLabels: Record<RentPeriod, string> = {
  daily: "Daily",
  weekly: "Weekly",
  fortnightly: "Fortnightly",
  monthly: "Calendar monthly",
  "6monthly": "6 monthly",
  yearly: "Yearly",
};

// Convert any period amount to a daily rate
const periodToDailyFactor: Record<RentPeriod, number> = {
  daily: 1,
  weekly: 1 / 7,
  fortnightly: 1 / 14,
  monthly: 12 / 365,
  "6monthly": 2 / 365,
  yearly: 1 / 365,
};

// Convert a daily rate to each period amount
const dailyToPeriodFactor: Record<RentPeriod, number> = {
  daily: 1,
  weekly: 7,
  fortnightly: 14,
  monthly: 365 / 12,
  "6monthly": 365 / 2,
  yearly: 365,
};

export function DashboardHeader() {
  const [aiQuery, setAiQuery] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const [rentOpen, setRentOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [rentInputPeriod, setRentInputPeriod] = useState<RentPeriod>("weekly");
  const [rentAmount, setRentAmount] = useState("550");
  const navigate = useNavigate();

  const weeklyRent = useMemo(() => {
    const val = parseFloat(rentAmount) || 0;
    return val * periodToWeekly[rentInputPeriod];
  }, [rentAmount, rentInputPeriod]);

  const rentBreakdown = useMemo(() => {
    const periods: RentPeriod[] = ["daily", "weekly", "fortnightly", "monthly", "6monthly", "yearly"];
    return periods.map((p) => ({
      period: p,
      label: periodLabels[p],
      amount: weeklyRent * weeklyToPeriod[p],
      isInput: p === rentInputPeriod,
    }));
  }, [weeklyRent, rentInputPeriod]);

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiQuery.trim()) {
      navigate("/ai-assistant");
    }
  };

  return (
    <header className="flex h-12 sm:h-14 items-center justify-between border-b border-border px-3 sm:px-4 relative bg-card">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <SidebarTrigger />
        <h1 className="text-base sm:text-lg font-bold text-foreground truncate">Dashboard</h1>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 sm:gap-2 text-primary border-primary/30 hover:bg-primary/10 h-8 px-2 sm:px-3"
          onClick={() => { setRentOpen((prev) => !prev); setAiOpen(false); }}
        >
          <Calculator className="h-4 w-4" />
          <span className="hidden md:inline text-sm">Rent Calc</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 sm:gap-2 text-primary border-primary/30 hover:bg-primary/10 h-8 px-2 sm:px-3"
          onClick={() => { setAiOpen((prev) => !prev); setRentOpen(false); }}
        >
          <Bot className="h-4 w-4" />
          <span className="hidden md:inline text-sm">AI Assistant</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="relative text-muted-foreground h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        <div className="ml-1 sm:ml-2 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          JD
        </div>
      </div>

      <AnimatePresence>
        {rentOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-2 sm:right-4 top-[calc(100%+8px)] z-50 w-[calc(100vw-1rem)] sm:w-96 max-w-md rounded-2xl border border-border bg-background p-5 sm:p-6 shadow-xl"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-6 w-6 text-muted-foreground hover:text-foreground"
              onClick={() => setRentOpen(false)}
            >
              <X className="h-3.5 w-3.5" />
            </Button>

            <h3 className="text-lg font-bold text-primary mb-4">Rent calculator</h3>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm text-muted-foreground shrink-0">The</span>
              <Select value={rentInputPeriod} onValueChange={(v) => setRentInputPeriod(v as RentPeriod)}>
                <SelectTrigger className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(periodLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground shrink-0">rent is</span>
              <div className="flex items-center gap-1 border border-border rounded-md px-2">
                <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  type="number"
                  value={rentAmount}
                  onChange={(e) => setRentAmount(e.target.value)}
                  className="border-0 p-0 h-9 w-20 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>

            <div className="space-y-3">
              {rentBreakdown.map((row) => (
                <div key={row.period} className="flex items-center justify-between py-1">
                  <span className={`text-sm ${row.isInput ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                    {row.label}
                  </span>
                  <div className="flex items-center gap-2">
                    {row.isInput && <span className="h-2 w-2 rounded-full bg-primary" />}
                    <span className={`text-sm tabular-nums ${row.isInput ? "font-semibold text-foreground" : "text-foreground"}`}>
                      $ {row.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aiOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: [0, -4, 0], scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              y: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            }}
            className="absolute right-2 sm:right-4 top-[calc(100%+8px)] z-50 w-[calc(100vw-1rem)] sm:w-80 max-w-sm rounded-2xl border border-primary/15 bg-background p-4 sm:p-5 shadow-[0_0_40px_hsla(160,80%,50%,0.1)]"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-6 w-6 text-muted-foreground hover:text-foreground"
              onClick={() => setAiOpen(false)}
            >
              <X className="h-3.5 w-3.5" />
            </Button>

            <div className="flex flex-col items-center gap-3 sm:gap-4 pt-2">
              <MiniOrb isListening={isListening} />

              <motion.p
                className="text-xs tracking-widest text-primary/80"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {isListening ? "Listening..." : "Available..."}
              </motion.p>

              <button
                onClick={() => setIsListening((p) => !p)}
                className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-all ${
                  isListening
                    ? "bg-primary/20 shadow-[0_0_15px_hsla(160,80%,50%,0.3)]"
                    : "bg-secondary hover:bg-muted"
                }`}
              >
                <Mic className={`h-4 w-4 ${isListening ? "text-primary" : "text-muted-foreground"}`} />
              </button>

              <form onSubmit={handleAiSubmit} className="flex w-full gap-2">
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2">
                  <input
                    type="text"
                    placeholder="Ask AI something..."
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!aiQuery.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary transition-all hover:bg-primary/25 disabled:opacity-30"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground hover:text-foreground text-xs"
                onClick={() => navigate("/ai-assistant")}
              >
                Open full AI Assistant →
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
