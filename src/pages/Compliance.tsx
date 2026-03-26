import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useState } from "react";
import { Search, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const complianceTabs = [
  { id: "pools", label: "Pools" },
  { id: "smoke", label: "Smoke Alarm", count: 8 },
  { id: "inspection", label: "Inspection", count: 14 },
  { id: "insurance", label: "Insurance", count: 137 },
  { id: "tradies", label: "Tradies", count: 153 },
  { id: "gas", label: "Gas/Heating" },
  { id: "electrical", label: "Electrical Safety" },
  { id: "rental", label: "Rental Standards Report" },
];

const poolData = [
  { status: "Pool Exists", property: "65 Phalaris Street", suburb: "ROCHEDALE", pm: "John Smith", flag: "Y", satellite: "N", scc: "Certificate", certExpiry: "23/12/2026", company: "LJ Hooker Mount Gravatt / Sunnybank Hills", lastInvoice: "23/12/2026", amount: "$ 126" },
  { status: "Pool Exists", property: "65 Phalaris Street", suburb: "ROCHEDALE", pm: "John Smith", flag: "Y", satellite: "N", scc: "Certificate", certExpiry: "19/12/2026", company: "LJ Hooker Mount Gravatt / Sunnybank Hills", lastInvoice: "21/07/2018", amount: "$ 126" },
  { status: "Pool Exists", property: "65 Phalaris Street", suburb: "ROCHEDALE", pm: "John Smith", flag: "Y", satellite: "N", scc: "Certificate", certExpiry: "23/12/2026", company: "LJ Hooker Mount Gravatt / Sunnybank Hills", lastInvoice: "23/12/2026", amount: "$ 126" },
  { status: "Pool Exists", property: "65 Phalaris Street", suburb: "ROCHEDALE", pm: "John Smith", flag: "Y", satellite: "N", scc: "Certificate", certExpiry: "23/12/2026", company: "LJ Hooker Mount Gravatt / Sunnybank Hills", lastInvoice: "23/12/2026", amount: "$ 126" },
  { status: "Pool Exists", property: "65 Phalaris Street", suburb: "ROCHEDALE", pm: "John Smith", flag: "Y", satellite: "N", scc: "Certificate", certExpiry: "23/12/2026", company: "LJ Hooker Mount Gravatt / Sunnybank Hills", lastInvoice: "23/12/2026", amount: "$ 126" },
  { status: "Pool Exists", property: "65 Phalaris Street", suburb: "ROCHEDALE", pm: "John Smith", flag: "Y", satellite: "N", scc: "Certificate", certExpiry: "23/12/2026", company: "LJ Hooker Mount Gravatt / Sunnybank Hills", lastInvoice: "23/12/2026", amount: "$ 126" },
];

const Compliance = () => {
  const [activeTab, setActiveTab] = useState("pools");
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6">
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-primary italic">Compliance</h1>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2">
                {complianceTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                    {tab.count && (
                      <Badge variant="secondary" className={`text-xs px-1.5 py-0.5 ${activeTab === tab.id ? "bg-primary-foreground/20 text-primary-foreground" : ""}`}>
                        {tab.count}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>

              {/* Sub-header */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">PM COMPLIANCE</span>
                <span className="text-sm font-medium text-primary cursor-pointer hover:underline">Pool Safety</span>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Status */}
                <div className="border border-border rounded-lg p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-primary">Status</h3>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-2 text-center">
                      <span className="text-xs text-muted-foreground block">Non-Compliant</span>
                      <span className="text-lg font-bold text-primary">20.60%</span>
                    </div>
                    <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-2 text-center">
                      <span className="text-xs text-muted-foreground block">Last Week</span>
                      <span className="text-lg font-bold text-primary">+0.00%</span>
                    </div>
                  </div>
                </div>

                {/* Properties */}
                <div className="border border-border rounded-lg p-4 space-y-2">
                  <h3 className="text-sm font-semibold text-primary">Properties</h3>
                  <div className="grid grid-cols-2 gap-1 text-sm">
                    <span className="text-muted-foreground">Compliant</span>
                    <span className="text-foreground font-medium text-right">262</span>
                    <span className="text-muted-foreground">Non-Compliant</span>
                    <span className="text-foreground font-medium text-right">76</span>
                    <span className="text-muted-foreground">Inspected</span>
                    <span className="text-foreground font-medium text-right">31</span>
                  </div>
                </div>

                {/* Service */}
                <div className="border border-border rounded-lg p-4 space-y-2">
                  <h3 className="text-sm font-semibold text-primary">Service</h3>
                  <div className="grid grid-cols-4 gap-1 text-sm">
                    <span className="text-muted-foreground">Expired</span>
                    <span className="text-foreground font-medium">262</span>
                    <span className="text-muted-foreground">Registered</span>
                    <span className="text-foreground font-medium">262</span>
                    <span className="text-muted-foreground">Not Inspected</span>
                    <span className="text-foreground font-medium">76</span>
                    <span className="text-muted-foreground">No Pool</span>
                    <span className="text-foreground font-medium">76</span>
                    <span className="text-muted-foreground">Unregistered</span>
                    <span className="text-foreground font-medium">31</span>
                    <span className="text-muted-foreground">Unknown</span>
                    <span className="text-foreground font-medium">31</span>
                  </div>
                  <div className="text-sm text-right">
                    <span className="text-muted-foreground">not Recorded</span>{" "}
                    <span className="text-foreground font-medium">262</span>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="flex justify-end">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Search className="h-4 w-4 mr-1" /> Search
                </Button>
              </div>

              {/* Table */}
              <div className="border border-border rounded-lg overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/50">
                      {["Pool Status", "Property", "Suburb", "PM Responsible", "Flag", "Satellite", "SCC", "Certificate Expiry", "Company", "Last Invoiced", "Amount"].map((h) => (
                        <th key={h} className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {poolData.map((row, i) => (
                      <tr key={i} className="border-t border-border hover:bg-secondary/30 transition-colors">
                        <td className="p-3 text-foreground font-medium whitespace-nowrap">{row.status}</td>
                        <td className="p-3 text-muted-foreground whitespace-nowrap">{row.property}</td>
                        <td className="p-3 text-muted-foreground">{row.suburb}</td>
                        <td className="p-3 text-muted-foreground">{row.pm}</td>
                        <td className="p-3 text-muted-foreground">{row.flag}</td>
                        <td className="p-3 text-muted-foreground">{row.satellite}</td>
                        <td className="p-3 text-muted-foreground">{row.scc}</td>
                        <td className="p-3 text-muted-foreground whitespace-nowrap">{row.certExpiry}</td>
                        <td className="p-3 text-muted-foreground whitespace-nowrap">{row.company}</td>
                        <td className="p-3 text-muted-foreground whitespace-nowrap">{row.lastInvoice}</td>
                        <td className="p-3 text-foreground font-medium">{row.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-end">
                <Button variant="outline" size="sm">Next Page</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Compliance;
