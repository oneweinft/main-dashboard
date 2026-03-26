import { useState } from "react";
import {
  Home,
  FileText,
  ScrollText,
  Search,
  DollarSign,
  MessageSquare,
  Wrench,
  Shield,
  Bell,
  ArrowRight,
  Sparkles,
  CalendarDays,
  LayoutDashboard,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { title: "Dashboard", icon: LayoutDashboard, active: true },
  { title: "Applications", icon: FileText },
  { title: "Lease & Onboarding", icon: ScrollText },
  { title: "Inspection Center", icon: Search },
  { title: "Financial Hub", icon: DollarSign },
  { title: "Communications", icon: MessageSquare },
  { title: "Maintenance", icon: Wrench },
  { title: "Compliance & Legal", icon: Shield },
  { title: "Notifications", icon: Bell },
];

const quickAccessItems = [
  { title: "Applications", icon: FileText },
  { title: "Financial Hub", icon: DollarSign },
  { title: "Maintenance", icon: Wrench },
  { title: "Notifications", icon: Bell },
];

const summaryCards = [
  { label: "Tenancy Status", icon: Home, value: "Active", sub: "12 Parkview Ave, Unit 3B" },
  { label: "Next Payment", icon: DollarSign, value: "$1,850", sub: "Due Mar 15, 2026" },
  { label: "Next Inspection", icon: CalendarDays, value: "Mar 22", sub: "Routine — 10:00 AM" },
  { label: "AGI Score", icon: Sparkles, value: "92/100", sub: "Excellent tenant profile" },
];

const RenterPortal = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-border flex flex-col p-4 bg-sidebar">
        <div className="flex items-center gap-2 mb-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/services-portal")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
        </div>
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm font-bold text-foreground">Renter Portal</p>
            <p className="text-[10px] text-muted-foreground">Lease Hub</p>
          </div>
        </div>

        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Navigation</p>
        <nav className="space-y-1 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.title}
              onClick={() => setActiveNav(item.title)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeNav === item.title
                  ? "bg-primary/15 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
            <p className="text-xs text-muted-foreground">Your tenancy at a glance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryCards.map((card) => (
            <div key={card.label} className="rounded-xl border border-border bg-card p-4 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <card.icon className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs">{card.label}</span>
              </div>
              <p className="text-xl font-bold text-foreground">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.sub}</p>
            </div>
          ))}
        </div>

        <h2 className="text-sm font-bold text-foreground mb-3">Quick Access</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {quickAccessItems.map((item) => (
            <button
              key={item.title}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground hover:border-primary/30 transition-colors"
            >
              {item.title}
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              AGI Recommendation
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your lease renewal window opens in 60 days. Based on market analysis, renewing early could save you up to 5% on your monthly rent. Consider starting the conversation with your agent.
          </p>
        </div>
      </main>
    </div>
  );
};

export default RenterPortal;
