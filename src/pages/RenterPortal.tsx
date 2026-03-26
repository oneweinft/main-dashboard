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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="min-h-screen flex bg-[hsl(180,10%,8%)] text-[hsl(160,30%,90%)]">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-[hsl(180,10%,15%)] flex flex-col p-4">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="h-6 w-6 text-[hsl(160,80%,50%)]" />
          <div>
            <p className="text-sm font-bold text-[hsl(160,30%,95%)]">Renter Portal</p>
            <p className="text-[10px] text-[hsl(160,20%,55%)]">Lease Hub</p>
          </div>
        </div>

        <p className="text-[10px] uppercase tracking-widest text-[hsl(160,20%,45%)] mb-3">Navigation</p>
        <nav className="space-y-1 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.title}
              onClick={() => setActiveNav(item.title)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeNav === item.title
                  ? "bg-[hsl(160,80%,50%)]/15 text-[hsl(160,80%,50%)] font-medium"
                  : "text-[hsl(160,20%,60%)] hover:text-[hsl(160,30%,80%)] hover:bg-[hsl(180,10%,12%)]"
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
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-[hsl(160,80%,50%)]/15 flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5 text-[hsl(160,80%,50%)]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[hsl(160,30%,95%)]">Dashboard</h1>
            <p className="text-xs text-[hsl(160,20%,55%)]">Your tenancy at a glance</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-[hsl(180,10%,18%)] bg-[hsl(180,10%,10%)] p-4 space-y-2"
            >
              <div className="flex items-center gap-2 text-[hsl(160,20%,55%)]">
                <card.icon className="h-3.5 w-3.5 text-[hsl(160,80%,50%)]" />
                <span className="text-xs">{card.label}</span>
              </div>
              <p className="text-xl font-bold text-[hsl(160,30%,95%)]">{card.value}</p>
              <p className="text-xs text-[hsl(160,20%,55%)]">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Quick Access */}
        <h2 className="text-sm font-bold text-[hsl(160,30%,95%)] mb-3">Quick Access</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {quickAccessItems.map((item) => (
            <button
              key={item.title}
              className="flex items-center justify-between rounded-xl border border-[hsl(180,10%,18%)] bg-[hsl(180,10%,10%)] px-4 py-3 text-sm text-[hsl(160,30%,90%)] hover:border-[hsl(160,80%,50%)]/30 transition-colors"
            >
              {item.title}
              <ArrowRight className="h-4 w-4 text-[hsl(160,20%,55%)]" />
            </button>
          ))}
        </div>

        {/* AGI Recommendation */}
        <div className="rounded-xl border border-[hsl(160,80%,50%)]/20 bg-[hsl(160,80%,50%)]/5 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-[hsl(160,80%,50%)]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[hsl(160,80%,50%)]">
              AGI Recommendation
            </span>
          </div>
          <p className="text-sm text-[hsl(160,20%,65%)] leading-relaxed">
            Your lease renewal window opens in 60 days. Based on market analysis, renewing early could save you up to 5% on your monthly rent. Consider starting the conversation with your agent.
          </p>
        </div>
      </main>
    </div>
  );
};

export default RenterPortal;
