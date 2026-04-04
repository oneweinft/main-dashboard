import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useState } from "react";
import { Search, Shield, Plus, Upload, Download, AlertTriangle, CheckCircle2, Clock, XCircle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

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
  { status: "Pool Exists", property: "65 Phalaris Street", suburb: "ROCHEDALE", pm: "John Smith", flag: "Y", satellite: "N", scc: "Certificate", certExpiry: "23/12/2026", company: "LJ Hooker Mount Gravatt", lastInvoice: "23/12/2026", amount: "$ 126" },
  { status: "Pool Exists", property: "12 Bayview Terrace", suburb: "CARINDALE", pm: "Jane Doe", flag: "Y", satellite: "N", scc: "Certificate", certExpiry: "19/12/2026", company: "Ray White Carindale", lastInvoice: "21/07/2025", amount: "$ 126" },
  { status: "Pool Exists", property: "88 Palm Ave", suburb: "HOLLAND PARK", pm: "John Smith", flag: "N", satellite: "Y", scc: "Expired", certExpiry: "01/03/2025", company: "LJ Hooker Mount Gravatt", lastInvoice: "01/03/2024", amount: "$ 126" },
  { status: "No Pool", property: "34 Creek Road", suburb: "MT GRAVATT", pm: "Sarah Lee", flag: "N", satellite: "N", scc: "N/A", certExpiry: "N/A", company: "Place Estate Agents", lastInvoice: "N/A", amount: "N/A" },
  { status: "Pool Exists", property: "7 Hillcrest Dr", suburb: "UPPER MT GRAVATT", pm: "John Smith", flag: "Y", satellite: "N", scc: "Certificate", certExpiry: "15/09/2026", company: "LJ Hooker Mount Gravatt", lastInvoice: "15/09/2025", amount: "$ 126" },
  { status: "Pool Exists", property: "19 Wattle St", suburb: "SUNNYBANK", pm: "Jane Doe", flag: "Y", satellite: "N", scc: "Certificate", certExpiry: "30/06/2027", company: "Ray White Carindale", lastInvoice: "30/06/2026", amount: "$ 126" },
];

const smokeAlarmData = [
  { property: "24 Casterly Rock Dr", suburb: "BONDI", pm: "John Smith", alarmType: "Photoelectric", lastTest: "15/01/2026", nextDue: "15/01/2027", status: "Compliant", certificate: "SA-2026-001", expiry: "15/01/2027" },
  { property: "15 High St", suburb: "SOUTHBANK", pm: "Jane Doe", alarmType: "Photoelectric", lastTest: "20/11/2025", nextDue: "20/11/2026", status: "Expiring Soon", certificate: "SA-2025-044", expiry: "20/11/2026" },
  { property: "8 Park Ave", suburb: "RICHMOND", pm: "Sarah Lee", alarmType: "Ionisation", lastTest: "01/06/2024", nextDue: "01/06/2025", status: "Non-Compliant", certificate: "—", expiry: "Expired" },
  { property: "102 River Rd", suburb: "PARRAMATTA", pm: "John Smith", alarmType: "Photoelectric", lastTest: "10/03/2026", nextDue: "10/03/2027", status: "Compliant", certificate: "SA-2026-088", expiry: "10/03/2027" },
  { property: "56 Elm Cres", suburb: "FITZROY", pm: "Jane Doe", alarmType: "Photoelectric", lastTest: "05/08/2025", nextDue: "05/08/2026", status: "Expiring Soon", certificate: "SA-2025-112", expiry: "05/08/2026" },
  { property: "9 Ocean Pde", suburb: "MANLY", pm: "Sarah Lee", alarmType: "Photoelectric", lastTest: "12/12/2025", nextDue: "12/12/2026", status: "Compliant", certificate: "SA-2025-200", expiry: "12/12/2026" },
  { property: "33 King William St", suburb: "ADELAIDE", pm: "John Smith", alarmType: "Interconnected", lastTest: "—", nextDue: "Overdue", status: "Non-Compliant", certificate: "—", expiry: "—" },
  { property: "12 Sunset Blvd", suburb: "SURFERS PARADISE", pm: "Jane Doe", alarmType: "Photoelectric", lastTest: "28/02/2026", nextDue: "28/02/2027", status: "Compliant", certificate: "SA-2026-055", expiry: "28/02/2027" },
];

const inspectionData = [
  { property: "24 Casterly Rock Dr", suburb: "BONDI", type: "Entry", scheduledDate: "05/04/2026", pm: "John Smith", status: "Scheduled", lastCompleted: "05/10/2025", outcome: "—" },
  { property: "15 High St", suburb: "SOUTHBANK", type: "Routine", scheduledDate: "10/04/2026", pm: "Jane Doe", status: "Scheduled", lastCompleted: "10/10/2025", outcome: "Satisfactory" },
  { property: "8 Park Ave", suburb: "RICHMOND", type: "Exit", scheduledDate: "—", pm: "Sarah Lee", status: "Pending Tenant", lastCompleted: "01/04/2025", outcome: "Minor Issues" },
  { property: "56 Elm Cres", suburb: "FITZROY", type: "Routine", scheduledDate: "15/04/2026", pm: "Jane Doe", status: "Overdue", lastCompleted: "15/10/2024", outcome: "Satisfactory" },
  { property: "9 Ocean Pde", suburb: "MANLY", type: "Routine", scheduledDate: "20/04/2026", pm: "Sarah Lee", status: "Scheduled", lastCompleted: "20/10/2025", outcome: "Satisfactory" },
  { property: "33 King William St", suburb: "ADELAIDE", type: "Entry", scheduledDate: "25/04/2026", pm: "John Smith", status: "Completed", lastCompleted: "25/03/2026", outcome: "Satisfactory" },
];

const insuranceData = [
  { property: "24 Casterly Rock Dr", owner: "David Chen", provider: "QBE Insurance", policyNo: "QBE-2025-44201", type: "Landlord", premium: "$1,850", startDate: "01/01/2026", expiryDate: "01/01/2027", status: "Active" },
  { property: "15 High St", owner: "Maria Santos", provider: "Allianz", policyNo: "ALZ-2025-88432", type: "Landlord", premium: "$1,200", startDate: "15/03/2025", expiryDate: "15/03/2026", status: "Expired" },
  { property: "8 Park Ave", owner: "Robert Taylor", provider: "AAMI", policyNo: "AAMI-2026-12003", type: "Building", premium: "$2,400", startDate: "01/07/2025", expiryDate: "01/07/2026", status: "Expiring Soon" },
  { property: "56 Elm Cres", owner: "Maria Santos", provider: "QBE Insurance", policyNo: "QBE-2026-55102", type: "Landlord + Contents", premium: "$2,100", startDate: "01/02/2026", expiryDate: "01/02/2027", status: "Active" },
  { property: "9 Ocean Pde", owner: "Robert Taylor", provider: "Suncorp", policyNo: "SUN-2025-33210", type: "Landlord", premium: "$1,600", startDate: "01/09/2025", expiryDate: "01/09/2026", status: "Expiring Soon" },
];

const tradieData = [
  { name: "Mike's Plumbing", trade: "Plumber", licence: "PLB-44821", licenceExpiry: "30/06/2027", insurance: "Active", insuranceExpiry: "01/01/2027", abn: "12 345 678 901", status: "Compliant" },
  { name: "Spark Electrical", trade: "Electrician", licence: "ELC-99012", licenceExpiry: "15/12/2026", insurance: "Active", insuranceExpiry: "15/12/2026", abn: "98 765 432 109", status: "Compliant" },
  { name: "TopCoat Painters", trade: "Painter", licence: "PNT-20345", licenceExpiry: "01/03/2025", insurance: "Expired", insuranceExpiry: "01/03/2025", abn: "55 123 456 789", status: "Non-Compliant" },
  { name: "CoolAir HVAC", trade: "HVAC Technician", licence: "HVAC-77231", licenceExpiry: "20/09/2026", insurance: "Active", insuranceExpiry: "20/09/2026", abn: "33 987 654 321", status: "Compliant" },
  { name: "LockSafe Security", trade: "Locksmith", licence: "LCK-11002", licenceExpiry: "10/05/2026", insurance: "Expiring", insuranceExpiry: "10/05/2026", abn: "77 456 789 012", status: "Expiring Soon" },
];

const gasData = [
  { property: "24 Casterly Rock Dr", suburb: "BONDI", applianceType: "Gas Heater", lastService: "10/01/2026", nextDue: "10/01/2027", technician: "CoolAir HVAC", certificate: "GAS-2026-101", status: "Compliant" },
  { property: "15 High St", suburb: "SOUTHBANK", applianceType: "Gas Cooktop", lastService: "—", nextDue: "Overdue", technician: "—", certificate: "—", status: "Non-Compliant" },
  { property: "56 Elm Cres", suburb: "FITZROY", applianceType: "Ducted Heating", lastService: "15/06/2025", nextDue: "15/06/2026", technician: "CoolAir HVAC", certificate: "GAS-2025-088", status: "Expiring Soon" },
  { property: "33 King William St", suburb: "ADELAIDE", applianceType: "Gas Hot Water", lastService: "20/11/2025", nextDue: "20/11/2026", technician: "Mike's Plumbing", certificate: "GAS-2025-200", status: "Compliant" },
];

const electricalData = [
  { property: "24 Casterly Rock Dr", suburb: "BONDI", rcdTest: "Pass", lastTest: "05/02/2026", nextDue: "05/02/2027", switchboard: "Compliant", technician: "Spark Electrical", certificate: "ELEC-2026-010", status: "Compliant" },
  { property: "8 Park Ave", suburb: "RICHMOND", rcdTest: "Fail", lastTest: "10/08/2025", nextDue: "Overdue", switchboard: "Non-Compliant", technician: "Spark Electrical", certificate: "—", status: "Non-Compliant" },
  { property: "9 Ocean Pde", suburb: "MANLY", rcdTest: "Pass", lastTest: "20/12/2025", nextDue: "20/12/2026", switchboard: "Compliant", technician: "Spark Electrical", certificate: "ELEC-2025-155", status: "Compliant" },
  { property: "12 Sunset Blvd", suburb: "SURFERS PARADISE", rcdTest: "Pass", lastTest: "01/03/2026", nextDue: "01/03/2027", switchboard: "Compliant", technician: "Spark Electrical", certificate: "ELEC-2026-032", status: "Compliant" },
];

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    "Compliant": "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
    "Active": "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
    "Completed": "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
    "Scheduled": "bg-sky-500/15 text-sky-700 border-sky-500/30",
    "Expiring Soon": "bg-amber-500/15 text-amber-700 border-amber-500/30",
    "Expiring": "bg-amber-500/15 text-amber-700 border-amber-500/30",
    "Non-Compliant": "bg-destructive/15 text-destructive border-destructive/30",
    "Expired": "bg-destructive/15 text-destructive border-destructive/30",
    "Overdue": "bg-destructive/15 text-destructive border-destructive/30",
    "Pending Tenant": "bg-orange-500/15 text-orange-700 border-orange-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${variants[status] || "bg-muted text-muted-foreground border-border"}`}>
      {status}
    </span>
  );
}

function SummaryCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) {
  return (
    <div className={`flex items-center gap-3 rounded-lg border border-border p-4`}>
      <div className={`rounded-full p-2 ${color}`}><Icon className="h-4 w-4" /></div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}

const Compliance = () => {
  const [activeTab, setActiveTab] = useState("pools");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const renderTabContent = () => {
    switch (activeTab) {
      case "pools":
        return <PoolsTab searchTerm={searchTerm} />;
      case "smoke":
        return <SmokeAlarmTab searchTerm={searchTerm} />;
      case "inspection":
        return <InspectionTab searchTerm={searchTerm} />;
      case "insurance":
        return <InsuranceTab searchTerm={searchTerm} />;
      case "tradies":
        return <TradiesTab searchTerm={searchTerm} />;
      case "gas":
        return <GasTab searchTerm={searchTerm} />;
      case "electrical":
        return <ElectricalTab searchTerm={searchTerm} />;
      case "rental":
        return <RentalStandardsTab />;
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h1 className="text-xl sm:text-2xl font-bold text-primary italic">Compliance</h1>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
                  <Button onClick={() => navigate("/soc2-checklist")} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                    <Shield className="h-4 w-4" /> SOC 2 Checklist
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex overflow-x-auto gap-2 pb-1">
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

              {/* Search bar */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search properties, contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-4 w-4" /> Filter</Button>
              </div>

              {renderTabContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

/* ─── POOLS TAB ─── */
function PoolsTab({ searchTerm }: { searchTerm: string }) {
  const filtered = poolData.filter(r => !searchTerm || Object.values(r).some(v => v.toLowerCase().includes(searchTerm.toLowerCase())));
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <SummaryCard icon={CheckCircle2} label="Compliant" value={262} color="bg-emerald-500/15 text-emerald-600" />
        <SummaryCard icon={XCircle} label="Non-Compliant" value={76} color="bg-destructive/15 text-destructive" />
        <SummaryCard icon={Clock} label="Expiring Soon" value={31} color="bg-amber-500/15 text-amber-600" />
        <SummaryCard icon={AlertTriangle} label="Unregistered" value={12} color="bg-orange-500/15 text-orange-600" />
      </div>
      <div className="border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/50">
              {["Pool Status", "Property", "Suburb", "PM", "Flag", "Satellite", "SCC", "Cert Expiry", "Company", "Last Invoiced", "Amount"].map(h => (
                <th key={h} className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-t border-border hover:bg-secondary/30 transition-colors">
                <td className="p-3 text-foreground font-medium whitespace-nowrap">{row.status}</td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{row.property}</td>
                <td className="p-3 text-muted-foreground">{row.suburb}</td>
                <td className="p-3 text-muted-foreground">{row.pm}</td>
                <td className="p-3 text-muted-foreground">{row.flag}</td>
                <td className="p-3 text-muted-foreground">{row.satellite}</td>
                <td className="p-3"><StatusBadge status={row.scc === "Expired" ? "Expired" : row.scc === "N/A" ? "N/A" : "Compliant"} /></td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{row.certExpiry}</td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{row.company}</td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{row.lastInvoice}</td>
                <td className="p-3 text-foreground font-medium">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── SMOKE ALARM TAB ─── */
function SmokeAlarmTab({ searchTerm }: { searchTerm: string }) {
  const filtered = smokeAlarmData.filter(r => !searchTerm || Object.values(r).some(v => v.toLowerCase().includes(searchTerm.toLowerCase())));
  const compliant = smokeAlarmData.filter(r => r.status === "Compliant").length;
  const nonCompliant = smokeAlarmData.filter(r => r.status === "Non-Compliant").length;
  const expiring = smokeAlarmData.filter(r => r.status === "Expiring Soon").length;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <SummaryCard icon={CheckCircle2} label="Compliant" value={compliant} color="bg-emerald-500/15 text-emerald-600" />
        <SummaryCard icon={XCircle} label="Non-Compliant" value={nonCompliant} color="bg-destructive/15 text-destructive" />
        <SummaryCard icon={Clock} label="Expiring Soon" value={expiring} color="bg-amber-500/15 text-amber-600" />
      </div>
      <div className="border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/50">
              {["Property", "Suburb", "PM", "Alarm Type", "Last Test", "Next Due", "Status", "Certificate", "Expiry"].map(h => (
                <th key={h} className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-t border-border hover:bg-secondary/30 transition-colors">
                <td className="p-3 text-foreground font-medium whitespace-nowrap">{row.property}</td>
                <td className="p-3 text-muted-foreground">{row.suburb}</td>
                <td className="p-3 text-muted-foreground">{row.pm}</td>
                <td className="p-3 text-muted-foreground">{row.alarmType}</td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{row.lastTest}</td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{row.nextDue}</td>
                <td className="p-3"><StatusBadge status={row.status} /></td>
                <td className="p-3 text-muted-foreground">{row.certificate}</td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{row.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── INSPECTION TAB ─── */
function InspectionTab({ searchTerm }: { searchTerm: string }) {
  const filtered = inspectionData.filter(r => !searchTerm || Object.values(r).some(v => v.toLowerCase().includes(searchTerm.toLowerCase())));
  const scheduled = inspectionData.filter(r => r.status === "Scheduled").length;
  const overdue = inspectionData.filter(r => r.status === "Overdue").length;
  const completed = inspectionData.filter(r => r.status === "Completed").length;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <SummaryCard icon={Clock} label="Scheduled" value={scheduled} color="bg-sky-500/15 text-sky-600" />
        <SummaryCard icon={AlertTriangle} label="Overdue" value={overdue} color="bg-destructive/15 text-destructive" />
        <SummaryCard icon={CheckCircle2} label="Completed" value={completed} color="bg-emerald-500/15 text-emerald-600" />
        <SummaryCard icon={Clock} label="Pending" value={1} color="bg-orange-500/15 text-orange-600" />
      </div>
      <div className="border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/50">
              {["Property", "Suburb", "Type", "Scheduled Date", "PM", "Status", "Last Completed", "Outcome"].map(h => (
                <th key={h} className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-t border-border hover:bg-secondary/30 transition-colors">
                <td className="p-3 text-foreground font-medium whitespace-nowrap">{row.property}</td>
                <td className="p-3 text-muted-foreground">{row.suburb}</td>
                <td className="p-3 text-muted-foreground">{row.type}</td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{row.scheduledDate}</td>
                <td className="p-3 text-muted-foreground">{row.pm}</td>
                <td className="p-3"><StatusBadge status={row.status} /></td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{row.lastCompleted}</td>
                <td className="p-3 text-muted-foreground">{row.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── INSURANCE TAB ─── */
function InsuranceTab({ searchTerm }: { searchTerm: string }) {
  const filtered = insuranceData.filter(r => !searchTerm || Object.values(r).some(v => v.toLowerCase().includes(searchTerm.toLowerCase())));
  const active = insuranceData.filter(r => r.status === "Active").length;
  const expired = insuranceData.filter(r => r.status === "Expired").length;
  const expiring = insuranceData.filter(r => r.status === "Expiring Soon").length;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <SummaryCard icon={CheckCircle2} label="Active Policies" value={active} color="bg-emerald-500/15 text-emerald-600" />
        <SummaryCard icon={XCircle} label="Expired" value={expired} color="bg-destructive/15 text-destructive" />
        <SummaryCard icon={Clock} label="Expiring Soon" value={expiring} color="bg-amber-500/15 text-amber-600" />
      </div>
      <div className="border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/50">
              {["Property", "Owner", "Provider", "Policy No.", "Type", "Premium", "Start", "Expiry", "Status"].map(h => (
                <th key={h} className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-t border-border hover:bg-secondary/30 transition-colors">
                <td className="p-3 text-foreground font-medium whitespace-nowrap">{row.property}</td>
                <td className="p-3 text-muted-foreground">{row.owner}</td>
                <td className="p-3 text-muted-foreground">{row.provider}</td>
                <td className="p-3 text-muted-foreground font-mono text-xs">{row.policyNo}</td>
                <td className="p-3 text-muted-foreground">{row.type}</td>
                <td className="p-3 text-foreground font-medium">{row.premium}</td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{row.startDate}</td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{row.expiryDate}</td>
                <td className="p-3"><StatusBadge status={row.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── TRADIES TAB ─── */
function TradiesTab({ searchTerm }: { searchTerm: string }) {
  const filtered = tradieData.filter(r => !searchTerm || Object.values(r).some(v => v.toLowerCase().includes(searchTerm.toLowerCase())));
  const compliant = tradieData.filter(r => r.status === "Compliant").length;
  const nonCompliant = tradieData.filter(r => r.status === "Non-Compliant").length;
  const expiring = tradieData.filter(r => r.status === "Expiring Soon").length;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <SummaryCard icon={CheckCircle2} label="Compliant" value={compliant} color="bg-emerald-500/15 text-emerald-600" />
        <SummaryCard icon={XCircle} label="Non-Compliant" value={nonCompliant} color="bg-destructive/15 text-destructive" />
        <SummaryCard icon={Clock} label="Expiring Soon" value={expiring} color="bg-amber-500/15 text-amber-600" />
      </div>
      <div className="border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/50">
              {["Name", "Trade", "Licence", "Licence Expiry", "Insurance", "Insurance Expiry", "ABN", "Status"].map(h => (
                <th key={h} className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-t border-border hover:bg-secondary/30 transition-colors">
                <td className="p-3 text-foreground font-medium whitespace-nowrap">{row.name}</td>
                <td className="p-3 text-muted-foreground">{row.trade}</td>
                <td className="p-3 text-muted-foreground font-mono text-xs">{row.licence}</td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{row.licenceExpiry}</td>
                <td className="p-3"><StatusBadge status={row.insurance === "Expired" ? "Expired" : row.insurance === "Expiring" ? "Expiring Soon" : "Active"} /></td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{row.insuranceExpiry}</td>
                <td className="p-3 text-muted-foreground font-mono text-xs">{row.abn}</td>
                <td className="p-3"><StatusBadge status={row.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── GAS/HEATING TAB ─── */
function GasTab({ searchTerm }: { searchTerm: string }) {
  const filtered = gasData.filter(r => !searchTerm || Object.values(r).some(v => v.toLowerCase().includes(searchTerm.toLowerCase())));
  const compliant = gasData.filter(r => r.status === "Compliant").length;
  const nonCompliant = gasData.filter(r => r.status === "Non-Compliant").length;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <SummaryCard icon={CheckCircle2} label="Compliant" value={compliant} color="bg-emerald-500/15 text-emerald-600" />
        <SummaryCard icon={XCircle} label="Non-Compliant" value={nonCompliant} color="bg-destructive/15 text-destructive" />
        <SummaryCard icon={Clock} label="Expiring Soon" value={1} color="bg-amber-500/15 text-amber-600" />
      </div>
      <div className="border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/50">
              {["Property", "Suburb", "Appliance Type", "Last Service", "Next Due", "Technician", "Certificate", "Status"].map(h => (
                <th key={h} className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-t border-border hover:bg-secondary/30 transition-colors">
                <td className="p-3 text-foreground font-medium whitespace-nowrap">{row.property}</td>
                <td className="p-3 text-muted-foreground">{row.suburb}</td>
                <td className="p-3 text-muted-foreground">{row.applianceType}</td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{row.lastService}</td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{row.nextDue}</td>
                <td className="p-3 text-muted-foreground">{row.technician}</td>
                <td className="p-3 text-muted-foreground font-mono text-xs">{row.certificate}</td>
                <td className="p-3"><StatusBadge status={row.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── ELECTRICAL SAFETY TAB ─── */
function ElectricalTab({ searchTerm }: { searchTerm: string }) {
  const filtered = electricalData.filter(r => !searchTerm || Object.values(r).some(v => v.toLowerCase().includes(searchTerm.toLowerCase())));
  const compliant = electricalData.filter(r => r.status === "Compliant").length;
  const nonCompliant = electricalData.filter(r => r.status === "Non-Compliant").length;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <SummaryCard icon={CheckCircle2} label="Compliant" value={compliant} color="bg-emerald-500/15 text-emerald-600" />
        <SummaryCard icon={XCircle} label="Non-Compliant" value={nonCompliant} color="bg-destructive/15 text-destructive" />
        <SummaryCard icon={Clock} label="Next Due" value={4} color="bg-sky-500/15 text-sky-600" />
      </div>
      <div className="border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/50">
              {["Property", "Suburb", "RCD Test", "Last Test", "Next Due", "Switchboard", "Technician", "Certificate", "Status"].map(h => (
                <th key={h} className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className="border-t border-border hover:bg-secondary/30 transition-colors">
                <td className="p-3 text-foreground font-medium whitespace-nowrap">{row.property}</td>
                <td className="p-3 text-muted-foreground">{row.suburb}</td>
                <td className="p-3"><StatusBadge status={row.rcdTest === "Pass" ? "Compliant" : "Non-Compliant"} /></td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{row.lastTest}</td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">{row.nextDue}</td>
                <td className="p-3"><StatusBadge status={row.switchboard === "Compliant" ? "Compliant" : "Non-Compliant"} /></td>
                <td className="p-3 text-muted-foreground">{row.technician}</td>
                <td className="p-3 text-muted-foreground font-mono text-xs">{row.certificate}</td>
                <td className="p-3"><StatusBadge status={row.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── RENTAL STANDARDS REPORT TAB ─── */
function RentalStandardsTab() {
  const standards = [
    { category: "Locks & Security", items: 8, compliant: 7, nonCompliant: 1 },
    { category: "Plumbing & Drainage", items: 6, compliant: 5, nonCompliant: 1 },
    { category: "Structural Soundness", items: 5, compliant: 5, nonCompliant: 0 },
    { category: "Ventilation & Light", items: 4, compliant: 3, nonCompliant: 1 },
    { category: "Electrical Safety", items: 6, compliant: 4, nonCompliant: 2 },
    { category: "Fire Safety", items: 4, compliant: 4, nonCompliant: 0 },
    { category: "Cleanliness & Repair", items: 7, compliant: 6, nonCompliant: 1 },
    { category: "Privacy & Security", items: 3, compliant: 3, nonCompliant: 0 },
  ];
  const totalItems = standards.reduce((s, r) => s + r.items, 0);
  const totalCompliant = standards.reduce((s, r) => s + r.compliant, 0);
  const pct = Math.round((totalCompliant / totalItems) * 100);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <SummaryCard icon={CheckCircle2} label="Overall Compliance" value={pct} color="bg-emerald-500/15 text-emerald-600" />
        <SummaryCard icon={AlertTriangle} label="Items Reviewed" value={totalItems} color="bg-sky-500/15 text-sky-600" />
        <SummaryCard icon={XCircle} label="Non-Compliant Items" value={totalItems - totalCompliant} color="bg-destructive/15 text-destructive" />
      </div>
      <div className="border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/50">
              {["Category", "Total Items", "Compliant", "Non-Compliant", "Compliance %"].map(h => (
                <th key={h} className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {standards.map((row, i) => {
              const rowPct = Math.round((row.compliant / row.items) * 100);
              return (
                <tr key={i} className="border-t border-border hover:bg-secondary/30 transition-colors">
                  <td className="p-3 text-foreground font-medium">{row.category}</td>
                  <td className="p-3 text-muted-foreground">{row.items}</td>
                  <td className="p-3 text-muted-foreground">{row.compliant}</td>
                  <td className="p-3">{row.nonCompliant > 0 ? <span className="text-destructive font-medium">{row.nonCompliant}</span> : <span className="text-muted-foreground">0</span>}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${rowPct}%` }} />
                      </div>
                      <span className="text-xs font-medium text-foreground">{rowPct}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Compliance;
