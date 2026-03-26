import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Shield, Lock, Eye, FileText, Users, Server, AlertTriangle,
  CheckCircle2, Clock, Search, Download, ChevronDown, ChevronUp,
} from "lucide-react";

type ControlStatus = "compliant" | "partial" | "non_compliant" | "not_started";
type Priority = "critical" | "high" | "medium" | "low";

interface Control {
  id: string;
  name: string;
  description: string;
  category: string;
  status: ControlStatus;
  priority: Priority;
  owner: string;
  lastReview: string;
  nextReview: string;
  evidence: string[];
  checked: boolean;
}

const controls: Control[] = [
  // Security Controls
  { id: "SC-01", name: "Encryption at Rest", description: "All sensitive data must be encrypted at rest using AES-256 or equivalent", category: "security", status: "compliant", priority: "critical", owner: "Security Team", lastReview: "2026-03-01", nextReview: "2026-06-01", evidence: ["Encryption policy doc", "AWS KMS config"], checked: true },
  { id: "SC-02", name: "Encryption in Transit", description: "All data transmissions must use TLS 1.2+ encryption", category: "security", status: "compliant", priority: "critical", owner: "DevOps", lastReview: "2026-03-15", nextReview: "2026-06-15", evidence: ["SSL certificate audit", "HSTS config"], checked: true },
  { id: "SC-03", name: "Vulnerability Scanning", description: "Automated vulnerability scans must run weekly on all production systems", category: "security", status: "partial", priority: "high", owner: "Security Team", lastReview: "2026-02-20", nextReview: "2026-05-20", evidence: ["Scan reports"], checked: false },
  { id: "SC-04", name: "Penetration Testing", description: "Annual third-party penetration testing of all external-facing systems", category: "security", status: "compliant", priority: "high", owner: "Security Team", lastReview: "2026-01-15", nextReview: "2027-01-15", evidence: ["Pentest report 2026", "Remediation log"], checked: true },
  { id: "SC-05", name: "Firewall Configuration", description: "Network firewalls configured with deny-all default and explicit allow rules", category: "security", status: "compliant", priority: "critical", owner: "DevOps", lastReview: "2026-03-10", nextReview: "2026-06-10", evidence: ["Firewall rule audit"], checked: true },
  { id: "SC-06", name: "Intrusion Detection", description: "IDS/IPS monitoring on all production network segments", category: "security", status: "non_compliant", priority: "high", owner: "Security Team", lastReview: "2026-01-05", nextReview: "2026-04-05", evidence: [], checked: false },

  // Access Controls
  { id: "AC-01", name: "Multi-Factor Authentication", description: "MFA required for all user accounts accessing production systems", category: "access", status: "compliant", priority: "critical", owner: "IT Admin", lastReview: "2026-03-20", nextReview: "2026-06-20", evidence: ["MFA policy", "Enrollment report"], checked: true },
  { id: "AC-02", name: "Role-Based Access Control", description: "Access granted based on least-privilege principle with defined roles", category: "access", status: "compliant", priority: "critical", owner: "IT Admin", lastReview: "2026-03-01", nextReview: "2026-06-01", evidence: ["RBAC matrix", "Access review log"], checked: true },
  { id: "AC-03", name: "Access Reviews", description: "Quarterly access reviews for all systems with privileged access", category: "access", status: "partial", priority: "high", owner: "IT Admin", lastReview: "2026-02-15", nextReview: "2026-05-15", evidence: ["Q1 review incomplete"], checked: false },
  { id: "AC-04", name: "Password Policy", description: "Minimum 12 characters, complexity requirements, 90-day rotation", category: "access", status: "compliant", priority: "high", owner: "IT Admin", lastReview: "2026-03-10", nextReview: "2026-06-10", evidence: ["Password policy doc", "Config screenshot"], checked: true },
  { id: "AC-05", name: "Session Management", description: "Automatic session timeout after 15 minutes of inactivity", category: "access", status: "partial", priority: "medium", owner: "Dev Team", lastReview: "2026-02-28", nextReview: "2026-05-28", evidence: ["Partial implementation"], checked: false },
  { id: "AC-06", name: "Offboarding Process", description: "Access revoked within 24 hours of employee termination", category: "access", status: "compliant", priority: "critical", owner: "HR / IT Admin", lastReview: "2026-03-05", nextReview: "2026-06-05", evidence: ["Offboarding checklist", "Audit log"], checked: true },

  // Audit & Monitoring
  { id: "AM-01", name: "Audit Logging", description: "All system access and changes logged with tamper-proof audit trails", category: "audit", status: "compliant", priority: "critical", owner: "DevOps", lastReview: "2026-03-18", nextReview: "2026-06-18", evidence: ["Log config", "Retention policy"], checked: true },
  { id: "AM-02", name: "Log Retention", description: "Audit logs retained for minimum 12 months with secure archival", category: "audit", status: "compliant", priority: "high", owner: "DevOps", lastReview: "2026-03-01", nextReview: "2026-06-01", evidence: ["Retention policy", "S3 lifecycle config"], checked: true },
  { id: "AM-03", name: "Security Monitoring", description: "24/7 monitoring of security events with automated alerting", category: "audit", status: "partial", priority: "high", owner: "Security Team", lastReview: "2026-02-25", nextReview: "2026-05-25", evidence: ["Alert rules — partial coverage"], checked: false },
  { id: "AM-04", name: "Incident Response Plan", description: "Documented incident response procedures with defined escalation paths", category: "audit", status: "compliant", priority: "critical", owner: "Security Team", lastReview: "2026-03-12", nextReview: "2026-06-12", evidence: ["IRP document v3.2", "Tabletop exercise log"], checked: true },
  { id: "AM-05", name: "Change Management", description: "All production changes tracked, approved, and documented", category: "audit", status: "compliant", priority: "high", owner: "Dev Team", lastReview: "2026-03-15", nextReview: "2026-06-15", evidence: ["Change log", "Approval workflow"], checked: true },
  { id: "AM-06", name: "Backup & Recovery Testing", description: "Monthly backup verification and annual disaster recovery test", category: "audit", status: "non_compliant", priority: "critical", owner: "DevOps", lastReview: "2025-12-01", nextReview: "2026-03-01", evidence: [], checked: false },

  // Data Privacy
  { id: "DP-01", name: "Data Classification", description: "All data classified as public, internal, confidential, or restricted", category: "privacy", status: "partial", priority: "high", owner: "Compliance", lastReview: "2026-02-10", nextReview: "2026-05-10", evidence: ["Classification policy — in progress"], checked: false },
  { id: "DP-02", name: "Data Retention Policy", description: "Defined retention periods for all data categories with automated deletion", category: "privacy", status: "compliant", priority: "high", owner: "Compliance", lastReview: "2026-03-01", nextReview: "2026-06-01", evidence: ["Retention schedule", "Deletion scripts"], checked: true },
  { id: "DP-03", name: "Privacy Impact Assessment", description: "PIA conducted for all new systems processing personal data", category: "privacy", status: "compliant", priority: "medium", owner: "Compliance", lastReview: "2026-03-05", nextReview: "2026-06-05", evidence: ["PIA template", "Completed assessments"], checked: true },
  { id: "DP-04", name: "Tenant Data Isolation", description: "Logical or physical separation of tenant data in multi-tenant systems", category: "privacy", status: "compliant", priority: "critical", owner: "Dev Team", lastReview: "2026-03-20", nextReview: "2026-06-20", evidence: ["RLS policies", "Architecture doc"], checked: true },
  { id: "DP-05", name: "Vendor Risk Assessment", description: "Security assessment of all third-party vendors processing data", category: "privacy", status: "not_started", priority: "high", owner: "Compliance", lastReview: "—", nextReview: "2026-04-15", evidence: [], checked: false },
];

const statusConfig: Record<ControlStatus, { label: string; color: string; icon: React.ElementType }> = {
  compliant: { label: "Compliant", color: "bg-primary/15 text-primary border-primary/20", icon: CheckCircle2 },
  partial: { label: "Partial", color: "bg-warning/15 text-warning border-warning/20", icon: Clock },
  non_compliant: { label: "Non-Compliant", color: "bg-destructive/15 text-destructive border-destructive/20", icon: AlertTriangle },
  not_started: { label: "Not Started", color: "bg-muted text-muted-foreground border-border", icon: Clock },
};

const priorityConfig: Record<Priority, string> = {
  critical: "bg-destructive/15 text-destructive border-destructive/20",
  high: "bg-warning/15 text-warning border-warning/20",
  medium: "bg-info/15 text-info border-info/20",
  low: "bg-muted text-muted-foreground border-border",
};

const categories = [
  { value: "all", label: "All Controls", icon: Shield },
  { value: "security", label: "Security", icon: Lock },
  { value: "access", label: "Access", icon: Users },
  { value: "audit", label: "Audit & Monitoring", icon: Eye },
  { value: "privacy", label: "Data Privacy", icon: FileText },
];

function ControlRow({ control, onToggle, expanded, onExpand }: {
  control: Control;
  onToggle: () => void;
  expanded: boolean;
  onExpand: () => void;
}) {
  const status = statusConfig[control.status];
  const StatusIcon = status.icon;

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/30 transition-colors" onClick={onExpand}>
        <Checkbox checked={control.checked} onCheckedChange={onToggle} onClick={(e) => e.stopPropagation()} />
        <span className="text-xs font-mono text-muted-foreground w-14 shrink-0">{control.id}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{control.name}</p>
        </div>
        <Badge variant="outline" className={`text-xs shrink-0 ${priorityConfig[control.priority]}`}>
          {control.priority}
        </Badge>
        <Badge variant="outline" className={`text-xs shrink-0 gap-1 ${status.color}`}>
          <StatusIcon className="h-3 w-3" />
          {status.label}
        </Badge>
        <span className="text-xs text-muted-foreground shrink-0 hidden md:block">{control.owner}</span>
        {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
      </div>
      {expanded && (
        <div className="border-t border-border bg-muted/20 p-4 space-y-3">
          <p className="text-sm text-muted-foreground">{control.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div><span className="text-muted-foreground block">Owner</span><span className="font-medium text-foreground">{control.owner}</span></div>
            <div><span className="text-muted-foreground block">Last Review</span><span className="font-medium text-foreground">{control.lastReview}</span></div>
            <div><span className="text-muted-foreground block">Next Review</span><span className="font-medium text-foreground">{control.nextReview}</span></div>
            <div><span className="text-muted-foreground block">Evidence</span><span className="font-medium text-foreground">{control.evidence.length > 0 ? control.evidence.join(", ") : "None uploaded"}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

const SOC2Checklist = () => {
  const [search, setSearch] = useState("");
  const [controlState, setControlState] = useState(controls);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = controlState.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === "all" || c.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const total = controlState.length;
  const compliant = controlState.filter((c) => c.status === "compliant").length;
  const partial = controlState.filter((c) => c.status === "partial").length;
  const nonCompliant = controlState.filter((c) => c.status === "non_compliant").length;
  const notStarted = controlState.filter((c) => c.status === "not_started").length;
  const overallScore = Math.round(((compliant + partial * 0.5) / total) * 100);

  const toggleCheck = (id: string) => {
    setControlState((prev) => prev.map((c) => c.id === id ? { ...c, checked: !c.checked } : c));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">SOC 2 Compliance Checklist</h1>
                    <p className="text-sm text-muted-foreground">Trust Services Criteria — Security, Availability, Confidentiality</p>
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" /> Export Report
                </Button>
              </div>

              {/* Score Cards */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card className="border-border">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-primary">{overallScore}%</p>
                    <p className="text-xs text-muted-foreground mt-1">Overall Score</p>
                    <Progress value={overallScore} className="mt-2 h-2" />
                  </CardContent>
                </Card>
                {[
                  { label: "Compliant", count: compliant, color: "text-primary" },
                  { label: "Partial", count: partial, color: "text-warning" },
                  { label: "Non-Compliant", count: nonCompliant, color: "text-destructive" },
                  { label: "Not Started", count: notStarted, color: "text-muted-foreground" },
                ].map((s) => (
                  <Card key={s.label} className="border-border">
                    <CardContent className="p-4 text-center">
                      <p className={`text-3xl font-bold ${s.color}`}>{s.count}</p>
                      <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Search */}
              <div className="flex items-center gap-3 bg-card rounded-xl border border-border p-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search controls..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                </div>
                <span className="text-sm text-muted-foreground">{filtered.length} of {total} controls</span>
              </div>

              {/* Category Tabs + List */}
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-4">
                <TabsList className="bg-muted/50 p-1">
                  {categories.map((cat) => (
                    <TabsTrigger key={cat.value} value={cat.value} className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <cat.icon className="h-4 w-4" />
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {categories.map((cat) => (
                  <TabsContent key={cat.value} value={cat.value} className="space-y-3">
                    {filtered.map((control) => (
                      <ControlRow
                        key={control.id}
                        control={control}
                        onToggle={() => toggleCheck(control.id)}
                        expanded={expandedId === control.id}
                        onExpand={() => setExpandedId(expandedId === control.id ? null : control.id)}
                      />
                    ))}
                    {filtered.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">No controls found</div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SOC2Checklist;
