import { useState } from "react";
import {
  HardHat,
  LayoutDashboard,
  ClipboardList,
  DollarSign,
  Mail,
  Phone,
  MessageSquare,
  Bell,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Clock,
  XCircle,
  Send,
  FileText,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { title: "Dashboard", icon: LayoutDashboard },
  { title: "Work Orders", icon: ClipboardList },
  { title: "Current Jobs", icon: HardHat },
  { title: "Payments", icon: DollarSign },
  { title: "Communications", icon: MessageSquare },
  { title: "Notifications", icon: Bell },
];

const summaryCards = [
  { label: "Active Jobs", value: "8", sub: "3 urgent", icon: HardHat },
  { label: "Outstanding", value: "$12,450", sub: "5 invoices", icon: DollarSign },
  { label: "Completed", value: "156", sub: "This quarter", icon: CheckCircle2 },
  { label: "AGI Score", value: "95/100", sub: "Top rated tradie", icon: Sparkles },
];

type Job = {
  id: string;
  property: string;
  description: string;
  status: "Outstanding" | "In Progress" | "Approved" | "Cancelled" | "Completed";
  priority: "Urgent" | "High" | "Medium" | "Low";
  amount: string;
  date: string;
};

const jobs: Job[] = [
  { id: "WO-1024", property: "520 Juniper Dr, Unit 2", description: "Hot water system replacement", status: "In Progress", priority: "Urgent", amount: "$2,800", date: "Mar 24, 2026" },
  { id: "WO-1023", property: "2040 Capitol Blvd", description: "Blocked drain — kitchen", status: "Outstanding", priority: "High", amount: "$450", date: "Mar 23, 2026" },
  { id: "WO-1022", property: "12 Parkview Ave, Unit 3B", description: "Electrical safety check", status: "Approved", priority: "Medium", amount: "$380", date: "Mar 22, 2026" },
  { id: "WO-1021", property: "520 Juniper Dr, Unit 4", description: "Leaking tap — bathroom", status: "Completed", priority: "Low", amount: "$180", date: "Mar 20, 2026" },
  { id: "WO-1020", property: "88 River Rd", description: "Air conditioning service", status: "Cancelled", priority: "Medium", amount: "$600", date: "Mar 18, 2026" },
  { id: "WO-1019", property: "2040 Capitol Blvd", description: "Roof tile repair", status: "Outstanding", priority: "High", amount: "$1,200", date: "Mar 17, 2026" },
];

type Payment = {
  id: string;
  workOrder: string;
  amount: string;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
};

const payments: Payment[] = [
  { id: "PAY-301", workOrder: "WO-1021", amount: "$180", status: "Paid", date: "Mar 22, 2026" },
  { id: "PAY-300", workOrder: "WO-1018", amount: "$950", status: "Paid", date: "Mar 18, 2026" },
  { id: "PAY-299", workOrder: "WO-1022", amount: "$380", status: "Pending", date: "Mar 25, 2026" },
  { id: "PAY-298", workOrder: "WO-1015", amount: "$2,100", status: "Overdue", date: "Mar 10, 2026" },
];

type CommLog = {
  type: "Email" | "SMS" | "AI Call";
  direction: "Inbound" | "Outbound";
  contact: string;
  subject: string;
  time: string;
  status: "Sent" | "Received" | "Missed";
};

const commLogs: CommLog[] = [
  { type: "Email", direction: "Outbound", contact: "tenant@email.com", subject: "Work order WO-1024 update", time: "10 min ago", status: "Sent" },
  { type: "SMS", direction: "Outbound", contact: "0412 345 678", subject: "Arrival ETA — 2:30 PM today", time: "1 hr ago", status: "Sent" },
  { type: "AI Call", direction: "Outbound", contact: "Property Manager", subject: "Schedule confirmation for WO-1023", time: "2 hrs ago", status: "Sent" },
  { type: "Email", direction: "Inbound", contact: "pm@agency.com", subject: "Approval for WO-1022 received", time: "3 hrs ago", status: "Received" },
  { type: "SMS", direction: "Inbound", contact: "0423 456 789", subject: "Tenant confirms access for Thursday", time: "5 hrs ago", status: "Received" },
  { type: "AI Call", direction: "Inbound", contact: "Tenant — Unit 3B", subject: "Missed call — voicemail left", time: "Yesterday", status: "Missed" },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Outstanding": return "bg-accent text-accent-foreground";
    case "In Progress": return "bg-primary/15 text-primary";
    case "Approved": return "bg-primary/15 text-primary";
    case "Completed": return "bg-primary/15 text-primary";
    case "Cancelled": return "bg-destructive/15 text-destructive";
    case "Paid": return "bg-primary/15 text-primary";
    case "Pending": return "bg-accent text-accent-foreground";
    case "Overdue": return "bg-destructive/15 text-destructive";
    default: return "bg-secondary text-foreground";
  }
};

const priorityColor = (priority: string) => {
  switch (priority) {
    case "Urgent": return "bg-destructive/15 text-destructive";
    case "High": return "bg-accent text-accent-foreground";
    case "Medium": return "bg-primary/15 text-primary";
    case "Low": return "bg-secondary text-muted-foreground";
    default: return "bg-secondary text-foreground";
  }
};

type Section = typeof sidebarItems[number]["title"];

const TradiePortal = () => {
  const [activeNav, setActiveNav] = useState<Section>("Dashboard");
  const [showWorkOrderForm, setShowWorkOrderForm] = useState(false);
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeNav) {
      case "Work Orders":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">Work Orders</h2>
                <p className="text-sm text-muted-foreground">Submit and manage work orders</p>
              </div>
              <Button onClick={() => setShowWorkOrderForm(!showWorkOrderForm)} size="sm">
                <Plus className="h-4 w-4 mr-1" /> New Work Order
              </Button>
            </div>

            {showWorkOrderForm && (
              <div className="rounded-xl border border-primary/20 bg-card p-5 space-y-4">
                <h3 className="text-sm font-bold text-foreground">New Work Order</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Property</label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select property" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="520-juniper">520 Juniper Dr</SelectItem>
                        <SelectItem value="2040-capitol">2040 Capitol Blvd</SelectItem>
                        <SelectItem value="12-parkview">12 Parkview Ave</SelectItem>
                        <SelectItem value="88-river">88 River Rd</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Trade Category</label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select trade" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="hvac">HVAC</SelectItem>
                        <SelectItem value="carpentry">Carpentry</SelectItem>
                        <SelectItem value="roofing">Roofing</SelectItem>
                        <SelectItem value="general">General Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Priority</label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Estimated Cost</label>
                    <Input placeholder="$0.00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Description</label>
                  <Textarea placeholder="Describe the work required..." className="min-h-[80px]" />
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Submit Work Order</Button>
                  <Button variant="outline" size="sm" onClick={() => setShowWorkOrderForm(false)}>Cancel</Button>
                </div>
              </div>
            )}

            {jobs.map((job) => (
              <div key={job.id} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-foreground">{job.id}</p>
                    <Badge className={`text-[10px] ${priorityColor(job.priority)}`}>{job.priority}</Badge>
                  </div>
                  <p className="text-sm text-foreground">{job.description}</p>
                  <p className="text-xs text-muted-foreground">{job.property} · {job.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-bold text-foreground">{job.amount}</p>
                  <span className={`text-xs rounded-full px-3 py-1 font-medium ${statusColor(job.status)}`}>{job.status}</span>
                </div>
              </div>
            ))}
          </div>
        );

      case "Current Jobs":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Current Jobs</h2>
            <p className="text-sm text-muted-foreground">Filter and manage active jobs by status</p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-2">
              {["Outstanding", "In Progress", "Approved", "Completed", "Cancelled"].map((status) => {
                const count = jobs.filter(j => j.status === status).length;
                return (
                  <div key={status} className={`rounded-lg p-3 text-center border border-border bg-card`}>
                    <p className="text-lg font-bold text-foreground">{count}</p>
                    <p className="text-[10px] text-muted-foreground">{status}</p>
                  </div>
                );
              })}
            </div>

            {jobs.filter(j => j.status !== "Completed" && j.status !== "Cancelled").map((job) => (
              <div key={job.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{job.id} — {job.description}</p>
                    <Badge className={`text-[10px] ${priorityColor(job.priority)}`}>{job.priority}</Badge>
                  </div>
                  <span className={`text-xs rounded-full px-3 py-1 font-medium ${statusColor(job.status)}`}>{job.status}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{job.property} · {job.date} · {job.amount}</p>
                <div className="flex gap-2">
                  {job.status === "Outstanding" && (
                    <>
                      <Button size="sm" variant="outline" className="text-xs"><CheckCircle2 className="h-3 w-3 mr-1" /> Accept</Button>
                      <Button size="sm" variant="outline" className="text-xs text-destructive"><XCircle className="h-3 w-3 mr-1" /> Decline</Button>
                    </>
                  )}
                  {job.status === "In Progress" && (
                    <Button size="sm" variant="outline" className="text-xs"><CheckCircle2 className="h-3 w-3 mr-1" /> Mark Complete</Button>
                  )}
                  {job.status === "Approved" && (
                    <Button size="sm" variant="outline" className="text-xs"><FileText className="h-3 w-3 mr-1" /> Submit Invoice</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case "Payments":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Payments</h2>
            <p className="text-sm text-muted-foreground">Track invoices and payment status</p>

            <div className="grid grid-cols-3 gap-3 mb-2">
              {[
                { label: "Total Paid", value: "$1,130", color: "text-primary" },
                { label: "Pending", value: "$380", color: "text-accent-foreground" },
                { label: "Overdue", value: "$2,100", color: "text-destructive" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center">
                  <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            {payments.map((pay) => (
              <div key={pay.id} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{pay.id}</p>
                  <p className="text-xs text-muted-foreground">Work Order: {pay.workOrder} · {pay.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-bold text-foreground">{pay.amount}</p>
                  <span className={`text-xs rounded-full px-3 py-1 font-medium ${statusColor(pay.status)}`}>{pay.status}</span>
                </div>
              </div>
            ))}
          </div>
        );

      case "Communications":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">Communications</h2>
                <p className="text-sm text-muted-foreground">Text, email, and AI receptionist call logs</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs"><Mail className="h-3 w-3 mr-1" /> Send Email</Button>
                <Button size="sm" variant="outline" className="text-xs"><Send className="h-3 w-3 mr-1" /> Send SMS</Button>
                <Button size="sm" variant="outline" className="text-xs"><Phone className="h-3 w-3 mr-1" /> AI Call</Button>
              </div>
            </div>

            {/* Quick send */}
            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
              <h3 className="text-sm font-bold text-foreground">Quick Message</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Select>
                  <SelectTrigger><SelectValue placeholder="Channel" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="ai-call">AI Receptionist Call</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Recipient (email or phone)" className="col-span-2 sm:col-span-1" />
                <Input placeholder="Subject / Reference" />
              </div>
              <Textarea placeholder="Type your message..." className="min-h-[60px]" />
              <Button size="sm"><Send className="h-3 w-3 mr-1" /> Send</Button>
            </div>

            {/* Logs */}
            <h3 className="text-sm font-bold text-foreground">Communication Logs</h3>
            {commLogs.map((log, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
                    {log.type === "Email" ? <Mail className="h-4 w-4 text-primary" /> :
                     log.type === "SMS" ? <MessageSquare className="h-4 w-4 text-primary" /> :
                     <Phone className="h-4 w-4 text-primary" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{log.subject}</p>
                      <Badge variant="outline" className="text-[10px]">{log.type}</Badge>
                      <Badge variant="outline" className="text-[10px]">{log.direction}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{log.contact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {log.time}
                  </span>
                  <span className={`text-xs rounded-full px-3 py-1 font-medium ${
                    log.status === "Sent" ? "bg-primary/15 text-primary" :
                    log.status === "Received" ? "bg-primary/15 text-primary" :
                    "bg-destructive/15 text-destructive"
                  }`}>{log.status}</span>
                </div>
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

            {/* Active Jobs Quick View */}
            <h2 className="text-sm font-bold text-foreground mb-3">Active Jobs</h2>
            <div className="space-y-2 mb-8">
              {jobs.filter(j => j.status !== "Completed" && j.status !== "Cancelled").map((job) => (
                <div key={job.id} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{job.id}</p>
                      <Badge className={`text-[10px] ${priorityColor(job.priority)}`}>{job.priority}</Badge>
                    </div>
                    <p className="text-xs text-foreground">{job.description}</p>
                    <p className="text-xs text-muted-foreground">{job.property}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-bold text-foreground">{job.amount}</p>
                    <span className={`text-xs rounded-full px-3 py-1 font-medium ${statusColor(job.status)}`}>{job.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Comms */}
            <h2 className="text-sm font-bold text-foreground mb-3">Recent Communications</h2>
            <div className="space-y-2 mb-8">
              {commLogs.slice(0, 3).map((log, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
                      {log.type === "Email" ? <Mail className="h-4 w-4 text-primary" /> :
                       log.type === "SMS" ? <MessageSquare className="h-4 w-4 text-primary" /> :
                       <Phone className="h-4 w-4 text-primary" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{log.subject}</p>
                      <p className="text-xs text-muted-foreground">{log.contact} · {log.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px]">{log.type}</Badge>
                </div>
              ))}
            </div>

            {/* AGI Insight */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">AGI Job Insight</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You have 2 outstanding jobs with high priority. Accepting WO-1023 quickly could improve your response rating by 3 points. Your average completion time is 2.1 days — 40% faster than average in your area.
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
          <HardHat className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm font-bold text-foreground">Tradie Portal</p>
            <p className="text-[10px] text-muted-foreground">Job Hub</p>
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
              <HardHat className="h-5 w-5 text-primary" />
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{activeNav}</h1>
            <p className="text-xs text-muted-foreground">
              {activeNav === "Dashboard" ? "Your jobs at a glance" : `Manage ${activeNav.toLowerCase()}`}
            </p>
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default TradiePortal;
