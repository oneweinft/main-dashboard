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
  Clock,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  Send,
  Download,
  ClipboardCheck,
  XCircle,
  Video,
  Camera,
  Mic,
  MicOff,
  VideoOff,
  Monitor,
  PhoneOff,
  Users,
  ExternalLink,
  PlayCircle,
  FileVideo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const sidebarItems = [
  { title: "Dashboard", icon: LayoutDashboard },
  { title: "Lease & Onboarding", icon: ScrollText },
  { title: "Inspection Center", icon: ClipboardCheck },
  { title: "Financial Hub", icon: DollarSign },
  { title: "Maintenance", icon: Wrench },
  { title: "Communications", icon: MessageSquare },
  { title: "Notices", icon: FileText },
  { title: "Notifications", icon: Bell },
];

const summaryCards = [
  { label: "Tenancy Status", icon: Home, value: "Active", sub: "12 Parkview Ave, Unit 3B" },
  { label: "Next Payment", icon: DollarSign, value: "$1,850", sub: "Due Apr 1, 2026" },
  { label: "Next Inspection", icon: CalendarDays, value: "Apr 12", sub: "Routine — 10:00 AM" },
  { label: "AGI Score", icon: Sparkles, value: "92/100", sub: "Excellent tenant profile" },
];

// Lease data
const leaseDetails = {
  property: "12 Parkview Ave, Unit 3B",
  landlord: "Greenfield Property Group",
  manager: "Sarah Mitchell — Ray White Carlton",
  startDate: "Oct 1, 2025",
  endDate: "Sep 30, 2026",
  term: "12 Months",
  rent: "$1,850/month",
  bond: "$3,700",
  bondLodged: "RTBA #BND-882451",
  paymentMethod: "Direct Debit — ANZ ****4821",
  status: "Active",
  specialConditions: [
    "No pets without prior written approval",
    "Tenant responsible for garden maintenance",
    "No smoking inside the premises",
  ],
};

// Inspection data
const inspections = [
  { type: "Entry", date: "Oct 5, 2025", status: "Completed", notes: "Move-in condition report — all items documented, 48 photos taken. Minor scuff on hallway wall noted.", rating: "Good" },
  { type: "Routine", date: "Jan 15, 2026", status: "Completed", notes: "Property well maintained. Garden in good condition. No issues raised.", rating: "Excellent" },
  { type: "Routine", date: "Apr 12, 2026", status: "Scheduled", notes: "Upcoming routine inspection — 10:00 AM. Entry notice issued Mar 26, 2026.", rating: "—" },
  { type: "Routine", date: "Jul 15, 2026", status: "Planned", notes: "Tentative — subject to confirmation.", rating: "—" },
];

// Rental payments
const rentalPayments = [
  { date: "Mar 1, 2026", amount: "$1,850", method: "Direct Debit", status: "Paid", reference: "PAY-20260301" },
  { date: "Feb 1, 2026", amount: "$1,850", method: "Direct Debit", status: "Paid", reference: "PAY-20260201" },
  { date: "Jan 1, 2026", amount: "$1,850", method: "Direct Debit", status: "Paid", reference: "PAY-20260101" },
  { date: "Dec 1, 2025", amount: "$1,850", method: "Direct Debit", status: "Paid", reference: "PAY-20251201" },
  { date: "Nov 1, 2025", amount: "$1,850", method: "Direct Debit", status: "Paid", reference: "PAY-20251101" },
  { date: "Oct 1, 2025", amount: "$1,850", method: "Direct Debit", status: "Paid", reference: "PAY-20251001" },
];

// Maintenance
const maintenanceJobs = [
  { id: "MR-401", description: "Leaking kitchen tap — constant drip", status: "In Progress", priority: "High", submitted: "Mar 20, 2026", tradie: "ABC Plumbing", eta: "Mar 28, 2026" },
  { id: "MR-400", description: "Bathroom exhaust fan not working", status: "Awaiting Approval", priority: "Medium", submitted: "Mar 18, 2026", tradie: "—", eta: "—" },
  { id: "MR-395", description: "Broken blind — bedroom 2", status: "Completed", priority: "Low", submitted: "Feb 25, 2026", tradie: "QuickFix Handyman", eta: "Completed Mar 3" },
  { id: "MR-388", description: "Hot water unit — intermittent cold", status: "Completed", priority: "Urgent", submitted: "Feb 10, 2026", tradie: "HeatPro Services", eta: "Completed Feb 12" },
  { id: "MR-380", description: "Front door lock stiff", status: "Completed", priority: "Medium", submitted: "Jan 15, 2026", tradie: "Secure Locksmiths", eta: "Completed Jan 18" },
];

// Communications
const commLogs = [
  { type: "Email" as const, direction: "Inbound", from: "sarah.m@raywhite.com", subject: "Routine inspection scheduled — Apr 12", time: "Mar 26, 10:15 AM", status: "Read" },
  { type: "SMS" as const, direction: "Outbound", from: "You", subject: "Confirmed access for inspection Apr 12", time: "Mar 26, 10:30 AM", status: "Sent" },
  { type: "AI Call" as const, direction: "Inbound", from: "AI Receptionist", subject: "Maintenance update — kitchen tap repair ETA Mar 28", time: "Mar 24, 2:00 PM", status: "Answered" },
  { type: "Email" as const, direction: "Inbound", from: "accounts@raywhite.com", subject: "Rent receipt — March 2026", time: "Mar 1, 9:00 AM", status: "Read" },
  { type: "SMS" as const, direction: "Inbound", from: "0412 345 678", subject: "Plumber will arrive between 9-11 AM Thursday", time: "Mar 25, 4:30 PM", status: "Read" },
  { type: "AI Call" as const, direction: "Outbound", from: "You → PM Office", subject: "After-hours maintenance request — hot water", time: "Feb 10, 8:45 PM", status: "Voicemail" },
  { type: "Email" as const, direction: "Outbound", from: "You", subject: "Request for blind repair — bedroom 2", time: "Feb 25, 11:00 AM", status: "Sent" },
  { type: "SMS" as const, direction: "Inbound", from: "Ray White", subject: "Lease renewal reminder — expires Sep 30", time: "Mar 15, 10:00 AM", status: "Read" },
];

// Notices
const notices = [
  { title: "Notice of Entry — Routine Inspection", date: "Mar 26, 2026", type: "Entry Notice", status: "Active", details: "Inspection scheduled Apr 12, 2026 at 10:00 AM. 14 days notice provided." },
  { title: "Rent Increase Notice", date: "Mar 1, 2026", type: "Rent Notice", status: "Acknowledged", details: "Rent increase from $1,800 to $1,850 effective Apr 1, 2026. 60 days notice given." },
  { title: "Notice of Entry — Maintenance", date: "Mar 24, 2026", type: "Entry Notice", status: "Active", details: "Plumber access for kitchen tap repair. 24-hour notice provided." },
  { title: "Smoke Alarm Compliance Check", date: "Jan 10, 2026", type: "Compliance", status: "Completed", details: "Annual smoke alarm check completed. All detectors operational." },
  { title: "Change of Property Manager", date: "Nov 15, 2025", type: "General Notice", status: "Acknowledged", details: "PM changed from David Lee to Sarah Mitchell effective Dec 1, 2025." },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Completed": case "Paid": case "Read": case "Answered": case "Acknowledged": case "Active":
      return "bg-primary/15 text-primary";
    case "Scheduled": case "In Progress": case "Sent":
      return "bg-primary/10 text-primary";
    case "Awaiting Approval": case "Planned": case "Voicemail":
      return "bg-accent/15 text-accent-foreground";
    case "Cancelled": case "Missed":
      return "bg-destructive/15 text-destructive";
    default:
      return "bg-secondary text-muted-foreground";
  }
};

const priorityColor = (p: string) => {
  switch (p) {
    case "Urgent": return "bg-destructive/15 text-destructive";
    case "High": return "bg-accent/15 text-accent-foreground";
    case "Medium": return "bg-primary/15 text-primary";
    case "Low": return "bg-secondary text-muted-foreground";
    default: return "bg-secondary text-foreground";
  }
};

const commIcon = (type: "Email" | "SMS" | "AI Call") => {
  switch (type) {
    case "Email": return <Mail className="h-4 w-4 text-primary" />;
    case "SMS": return <MessageSquare className="h-4 w-4 text-primary" />;
    case "AI Call": return <Phone className="h-4 w-4 text-primary" />;
  }
};

type Section = typeof sidebarItems[number]["title"];

const RenterPortal = () => {
  const [activeNav, setActiveNav] = useState<Section>("Dashboard");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeNav) {
      case "Lease & Onboarding":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Lease Details</h2>
            <p className="text-sm text-muted-foreground">Your current lease agreement</p>

            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-foreground">{leaseDetails.property}</h3>
                <span className="text-xs rounded-full px-3 py-1 font-medium bg-primary/15 text-primary">{leaseDetails.status}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Landlord", value: leaseDetails.landlord },
                  { label: "Property Manager", value: leaseDetails.manager },
                  { label: "Lease Term", value: leaseDetails.term },
                  { label: "Start Date", value: leaseDetails.startDate },
                  { label: "End Date", value: leaseDetails.endDate },
                  { label: "Monthly Rent", value: leaseDetails.rent },
                  { label: "Bond Amount", value: leaseDetails.bond },
                  { label: "Bond Reference", value: leaseDetails.bondLodged },
                  { label: "Payment Method", value: leaseDetails.paymentMethod },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Special Conditions</p>
                <ul className="space-y-1">
                  {leaseDetails.specialConditions.map((c, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <AlertCircle className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="outline" size="sm" className="text-xs">
                <Download className="h-3 w-3 mr-1" /> Download Lease Agreement
              </Button>
            </div>
          </div>
        );

      case "Inspection Center":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Inspections</h2>
            <p className="text-sm text-muted-foreground">Entry report, routine inspections & schedule</p>

            {inspections.map((insp, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px]">{insp.type}</Badge>
                    <p className="text-sm font-semibold text-foreground">{insp.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {insp.rating !== "—" && (
                      <span className="text-xs text-muted-foreground">Rating: {insp.rating}</span>
                    )}
                    <span className={`text-xs rounded-full px-3 py-1 font-medium ${statusColor(insp.status)}`}>{insp.status}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{insp.notes}</p>
                {insp.status === "Completed" && (
                  <Button variant="outline" size="sm" className="text-xs mt-3">
                    <Download className="h-3 w-3 mr-1" /> View Report
                  </Button>
                )}
              </div>
            ))}
          </div>
        );

      case "Financial Hub":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Rental Payment History</h2>
            <p className="text-sm text-muted-foreground">Track all rent payments and receipts</p>

            <div className="grid grid-cols-3 gap-3 mb-2">
              <div className="rounded-xl border border-border bg-card p-4 text-center">
                <p className="text-xl font-bold text-primary">$11,100</p>
                <p className="text-xs text-muted-foreground">Total Paid (6 months)</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 text-center">
                <p className="text-xl font-bold text-foreground">$0</p>
                <p className="text-xs text-muted-foreground">Outstanding</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 text-center">
                <p className="text-xl font-bold text-primary">6/6</p>
                <p className="text-xs text-muted-foreground">On-Time Payments</p>
              </div>
            </div>

            {rentalPayments.map((pay) => (
              <div key={pay.reference} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{pay.date}</p>
                  <p className="text-xs text-muted-foreground">{pay.reference} · {pay.method}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-bold text-foreground">{pay.amount}</p>
                  <span className={`text-xs rounded-full px-3 py-1 font-medium ${statusColor(pay.status)}`}>
                    <CheckCircle2 className="h-3 w-3 inline mr-1" />{pay.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case "Maintenance":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">Maintenance</h2>
                <p className="text-sm text-muted-foreground">Jobs, requests & repair history</p>
              </div>
              <Button size="sm"><Wrench className="h-4 w-4 mr-1" /> New Request</Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
              {["In Progress", "Awaiting Approval", "Completed", "All"].map((s) => {
                const count = s === "All" ? maintenanceJobs.length : maintenanceJobs.filter(j => j.status === s).length;
                return (
                  <div key={s} className="rounded-lg border border-border bg-card p-3 text-center">
                    <p className="text-lg font-bold text-foreground">{count}</p>
                    <p className="text-[10px] text-muted-foreground">{s}</p>
                  </div>
                );
              })}
            </div>

            {maintenanceJobs.map((job) => (
              <div key={job.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{job.id}</p>
                    <Badge className={`text-[10px] ${priorityColor(job.priority)}`}>{job.priority}</Badge>
                  </div>
                  <span className={`text-xs rounded-full px-3 py-1 font-medium ${statusColor(job.status)}`}>{job.status}</span>
                </div>
                <p className="text-sm text-foreground">{job.description}</p>
                <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Submitted: {job.submitted}</span>
                  <span>Tradie: {job.tradie}</span>
                  <span>ETA: {job.eta}</span>
                </div>
              </div>
            ))}
          </div>
        );

      case "Communications":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Communications Log</h2>
            <p className="text-sm text-muted-foreground">Calls, texts, emails & AI receptionist logs</p>

            <div className="grid grid-cols-3 gap-3 mb-2">
              {[
                { label: "Emails", count: commLogs.filter(c => c.type === "Email").length, icon: <Mail className="h-4 w-4 text-primary" /> },
                { label: "SMS", count: commLogs.filter(c => c.type === "SMS").length, icon: <MessageSquare className="h-4 w-4 text-primary" /> },
                { label: "AI Calls", count: commLogs.filter(c => c.type === "AI Call").length, icon: <Phone className="h-4 w-4 text-primary" /> },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">{s.icon}</div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{s.count}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {commLogs.map((log, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
                    {commIcon(log.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{log.subject}</p>
                      <Badge variant="outline" className="text-[10px]">{log.type}</Badge>
                      <Badge variant="outline" className="text-[10px]">{log.direction}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{log.from}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {log.time}
                  </span>
                  <span className={`text-xs rounded-full px-3 py-1 font-medium ${statusColor(log.status)}`}>{log.status}</span>
                </div>
              </div>
            ))}
          </div>
        );

      case "Notices":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Notices</h2>
            <p className="text-sm text-muted-foreground">Entry notices, rent notices & general communications</p>

            {notices.map((notice, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px]">{notice.type}</Badge>
                    <p className="text-sm font-semibold text-foreground">{notice.title}</p>
                  </div>
                  <span className={`text-xs rounded-full px-3 py-1 font-medium ${statusColor(notice.status)}`}>{notice.status}</span>
                </div>
                <p className="text-sm text-muted-foreground">{notice.details}</p>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" /> Issued: {notice.date}
                </p>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

            {/* Quick Access */}
            <h2 className="text-sm font-bold text-foreground mb-3">Quick Access</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {[
                { title: "Lease & Onboarding", nav: "Lease & Onboarding" },
                { title: "Financial Hub", nav: "Financial Hub" },
                { title: "Maintenance", nav: "Maintenance" },
                { title: "Communications", nav: "Communications" },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => setActiveNav(item.nav as Section)}
                  className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground hover:border-primary/30 transition-colors"
                >
                  {item.title}
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>

            {/* Upcoming */}
            <h2 className="text-sm font-bold text-foreground mb-3">Upcoming</h2>
            <div className="space-y-2 mb-8">
              <div className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Rent Due — $1,850</p>
                    <p className="text-xs text-muted-foreground">Apr 1, 2026 · Direct Debit</p>
                  </div>
                </div>
                <span className="text-xs rounded-full px-3 py-1 font-medium bg-primary/10 text-primary">6 days</span>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
                    <ClipboardCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Routine Inspection</p>
                    <p className="text-xs text-muted-foreground">Apr 12, 2026 · 10:00 AM</p>
                  </div>
                </div>
                <span className="text-xs rounded-full px-3 py-1 font-medium bg-primary/10 text-primary">17 days</span>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
                    <Wrench className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Kitchen Tap Repair — Plumber</p>
                    <p className="text-xs text-muted-foreground">Mar 28, 2026 · ABC Plumbing</p>
                  </div>
                </div>
                <span className="text-xs rounded-full px-3 py-1 font-medium bg-primary/10 text-primary">2 days</span>
              </div>
            </div>

            {/* Recent Comms */}
            <h2 className="text-sm font-bold text-foreground mb-3">Recent Communications</h2>
            <div className="space-y-2 mb-8">
              {commLogs.slice(0, 3).map((log, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
                      {commIcon(log.type)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{log.subject}</p>
                      <p className="text-xs text-muted-foreground">{log.from} · {log.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px]">{log.type}</Badge>
                </div>
              ))}
            </div>

            {/* AGI */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">AGI Recommendation</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your lease renewal window opens in 60 days. Based on market analysis, renewing early could save you up to 5% on your monthly rent. Your payment history is perfect — use this as leverage in negotiations.
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
          <Button variant="ghost" size="sm" onClick={() => navigate("/services-portal")} className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
        </div>
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="h-6 w-6 text-sidebar-primary" />
          <div>
            <p className="text-sm font-bold text-sidebar-foreground">Renter Portal</p>
            <p className="text-[10px] text-sidebar-foreground/50">Lease Hub</p>
          </div>
        </div>

        <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40 mb-3">Navigation</p>
        <nav className="space-y-1 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.title}
              onClick={() => setActiveNav(item.title)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeNav === item.title
                  ? "bg-sidebar-primary/20 text-sidebar-primary font-medium"
                  : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
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
              <Home className="h-5 w-5 text-primary" />
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{activeNav}</h1>
            <p className="text-xs text-muted-foreground">
              {activeNav === "Dashboard" ? "Your tenancy at a glance" : `Manage ${activeNav.toLowerCase()}`}
            </p>
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default RenterPortal;
