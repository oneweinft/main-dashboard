import { useState } from "react";
import {
  Briefcase,
  Search,
  DollarSign,
  FileText,
  Shield,
  Bell,
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  ArrowLeft,
  ClipboardCheck,
  ScrollText,
  Download,
  Building2,
  TrendingUp,
  Home,
  Receipt,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { title: "Dashboard", icon: LayoutDashboard, active: true },
  { title: "Inspections", icon: ClipboardCheck },
  { title: "Statements", icon: FileText },
  { title: "Compliance", icon: Shield },
  { title: "Authorities", icon: Landmark },
  { title: "Lease", icon: ScrollText },
  { title: "Invoices", icon: Receipt },
  { title: "Downloadables", icon: Download },
  { title: "Notifications", icon: Bell },
];

const portfolioCards = [
  { label: "Portfolio Value", icon: Building2, value: "$673,762", sub: "3 Properties · 6 Units" },
  { label: "Asset Return", icon: TrendingUp, value: "22.3%", sub: "Appreciation + Levered" },
  { label: "Occupancy", icon: Home, value: "100%", sub: "Fully Occupied" },
  { label: "Monthly Income", icon: DollarSign, value: "$6,785", sub: "Net rental income" },
];

const financialCards = [
  { label: "Debt", value: "$358,150" },
  { label: "Properties", value: "3" },
  { label: "Units", value: "6" },
  { label: "Cash Flow", value: "$2,577" },
];

const properties = [
  {
    address: "520 526 Juniper Dr.",
    acquired: "September 11, 2013",
    price: "$234,000",
    sqft: "3,910",
    units: 4,
    beds: 8,
    baths: 4,
    income: "$3,385",
    expenses: "$1,936",
    occupancy: "100%",
    loanToValue: "48.7%",
  },
  {
    address: "2040 Capitol Blvd.",
    acquired: "September 22, 2016",
    price: "$101,000",
    sqft: "2,100",
    units: 2,
    beds: 4,
    baths: 2,
    income: "$1,800",
    expenses: "$920",
    occupancy: "100%",
    loanToValue: "52.1%",
  },
];

const recentInvoices = [
  { id: "INV-001", vendor: "ABC Plumbing", amount: "$450", status: "Paid", date: "Mar 10, 2026" },
  { id: "INV-002", vendor: "Green Lawns Co", amount: "$200", status: "Pending", date: "Mar 15, 2026" },
  { id: "INV-003", vendor: "City Electric", amount: "$380", status: "Overdue", date: "Feb 28, 2026" },
];

const downloadables = [
  { name: "Q1 2026 Statement", type: "PDF", date: "Mar 2026" },
  { name: "Annual Tax Summary", type: "PDF", date: "Jan 2026" },
  { name: "Insurance Certificate", type: "PDF", date: "Dec 2025" },
  { name: "Compliance Report", type: "PDF", date: "Mar 2026" },
];

type Section = typeof sidebarItems[number]["title"];

const RentalProviderPortal = () => {
  const [activeNav, setActiveNav] = useState<Section>("Dashboard");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeNav) {
      case "Inspections":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Inspections</h2>
            <p className="text-sm text-muted-foreground">Upcoming and completed property inspections</p>
            {properties.map((p) => (
              <div key={p.address} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{p.address}</p>
                  <p className="text-xs text-muted-foreground">Next inspection: Apr 5, 2026 — Routine</p>
                </div>
                <span className="text-xs rounded-full bg-primary/15 text-primary px-3 py-1 font-medium">Scheduled</span>
              </div>
            ))}
          </div>
        );

      case "Statements":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Statements</h2>
            <p className="text-sm text-muted-foreground">Monthly and annual financial statements</p>
            {["March 2026", "February 2026", "January 2026"].map((month) => (
              <div key={month} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{month} Statement</p>
                  <p className="text-xs text-muted-foreground">Income: $6,785 · Expenses: $3,208</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  <Download className="h-3 w-3 mr-1" /> Download
                </Button>
              </div>
            ))}
          </div>
        );

      case "Compliance":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Compliance</h2>
            <p className="text-sm text-muted-foreground">Regulatory compliance and safety checks</p>
            {["Smoke Alarms", "Electrical Safety", "Gas Safety", "Pool Compliance"].map((item) => (
              <div key={item} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{item}</p>
                  <p className="text-xs text-muted-foreground">Last checked: Jan 2026 · Next due: Jan 2027</p>
                </div>
                <span className="text-xs rounded-full bg-primary/15 text-primary px-3 py-1 font-medium">Compliant</span>
              </div>
            ))}
          </div>
        );

      case "Authorities":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Authorities</h2>
            <p className="text-sm text-muted-foreground">Authority contacts and regulatory bodies</p>
            {["Consumer Affairs Victoria", "Local Council", "EPA Victoria", "Fire Authority"].map((auth) => (
              <div key={auth} className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-semibold text-foreground">{auth}</p>
                <p className="text-xs text-muted-foreground mt-1">Contact: 1300 XXX XXX · Status: Active</p>
              </div>
            ))}
          </div>
        );

      case "Lease":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Lease Management</h2>
            <p className="text-sm text-muted-foreground">Active leases across your portfolio</p>
            {properties.map((p) => (
              <div key={p.address} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">{p.address}</p>
                  <span className="text-xs rounded-full bg-primary/15 text-primary px-3 py-1 font-medium">Active</span>
                </div>
                <p className="text-xs text-muted-foreground">Lease term: 12 months · Rent: {p.income}/mo · Renewal: Sep 2026</p>
              </div>
            ))}
          </div>
        );

      case "Invoices":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Invoices</h2>
            <p className="text-sm text-muted-foreground">Track and manage vendor invoices</p>
            {recentInvoices.map((inv) => (
              <div key={inv.id} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{inv.vendor}</p>
                  <p className="text-xs text-muted-foreground">{inv.id} · {inv.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-bold text-foreground">{inv.amount}</p>
                  <span className={`text-xs rounded-full px-3 py-1 font-medium ${
                    inv.status === "Paid" ? "bg-primary/15 text-primary" :
                    inv.status === "Pending" ? "bg-accent text-accent-foreground" :
                    "bg-destructive/15 text-destructive"
                  }`}>{inv.status}</span>
                </div>
              </div>
            ))}
          </div>
        );

      case "Downloadables":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Downloadables</h2>
            <p className="text-sm text-muted-foreground">Documents available for download</p>
            {downloadables.map((doc) => (
              <div key={doc.name} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-destructive/15 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.type} · {doc.date}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  <Download className="h-3 w-3 mr-1" /> Download
                </Button>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <>
            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {portfolioCards.map((card) => (
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

            {/* Financial Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {financialCards.map((card) => (
                <div key={card.label} className="rounded-xl border border-border bg-card p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{card.label}</p>
                  <p className="text-lg font-bold text-foreground">{card.value}</p>
                </div>
              ))}
            </div>

            {/* Properties */}
            <h2 className="text-sm font-bold text-foreground mb-3">Properties</h2>
            <div className="space-y-4 mb-8">
              {properties.map((prop) => (
                <div key={prop.address} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-foreground">{prop.address}</h3>
                      <p className="text-xs text-muted-foreground">Acquired on {prop.acquired} for {prop.price}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="rounded-lg bg-secondary p-3 text-center">
                      <p className="text-sm font-bold text-primary">{prop.income}</p>
                      <p className="text-xs text-muted-foreground">Monthly Income</p>
                    </div>
                    <div className="rounded-lg bg-secondary p-3 text-center">
                      <p className="text-sm font-bold text-foreground">{prop.expenses}</p>
                      <p className="text-xs text-muted-foreground">Monthly Expenses</p>
                    </div>
                    <div className="rounded-lg bg-secondary p-3 text-center">
                      <p className="text-sm font-bold text-primary">{prop.occupancy}</p>
                      <p className="text-xs text-muted-foreground">Occupancy</p>
                    </div>
                    <div className="rounded-lg bg-secondary p-3 text-center">
                      <p className="text-sm font-bold text-foreground">{prop.loanToValue}</p>
                      <p className="text-xs text-muted-foreground">Loan-to-Value</p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                    <span>{prop.sqft} sq ft</span>
                    <span>{prop.units} Units</span>
                    <span>{prop.beds} Beds</span>
                    <span>{prop.baths} Baths</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Invoices */}
            <h2 className="text-sm font-bold text-foreground mb-3">Recent Invoices</h2>
            <div className="space-y-2 mb-8">
              {recentInvoices.map((inv) => (
                <div key={inv.id} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{inv.vendor}</p>
                    <p className="text-xs text-muted-foreground">{inv.id} · {inv.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-bold text-foreground">{inv.amount}</p>
                    <span className={`text-xs rounded-full px-3 py-1 font-medium ${
                      inv.status === "Paid" ? "bg-primary/15 text-primary" :
                      inv.status === "Pending" ? "bg-accent text-accent-foreground" :
                      "bg-destructive/15 text-destructive"
                    }`}>{inv.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* AGI Insight */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">AGI Portfolio Insight</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your portfolio occupancy is at 100%. Market analysis suggests a 3-5% rent increase is achievable across your properties at next renewal. Cash flow could improve by $340/mo with refinancing at current rates.
              </p>
            </div>
          </>
        );
    }
  };

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
          <Briefcase className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm font-bold text-foreground">Rental Provider</p>
            <p className="text-[10px] text-muted-foreground">Portfolio Hub</p>
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
            {activeNav === "Dashboard" ? (
              <LayoutDashboard className="h-5 w-5 text-primary" />
            ) : (
              <Briefcase className="h-5 w-5 text-primary" />
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{activeNav}</h1>
            <p className="text-xs text-muted-foreground">
              {activeNav === "Dashboard" ? "Your portfolio at a glance" : `Manage ${activeNav.toLowerCase()}`}
            </p>
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default RentalProviderPortal;
