import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { UserCircle, Briefcase, HardHat, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const portals = [
  {
    title: "Renter Portal",
    icon: UserCircle,
    description: "Manage tenant communications, maintenance requests, and lease information.",
    stats: { active: 142, pending: 8, resolved: 234 },
  },
  {
    title: "Rental Provider Portal",
    icon: Briefcase,
    description: "Landlord access for property performance, statements, and approvals.",
    stats: { active: 67, pending: 3, resolved: 189 },
  },
  {
    title: "Tradie Portal",
    icon: HardHat,
    description: "Contractor job management, work orders, and invoice submissions.",
    stats: { active: 35, pending: 12, resolved: 156 },
  },
];

const recentActivity = [
  { type: "Renter", action: "Maintenance request submitted", time: "2 min ago", status: "pending" },
  { type: "Landlord", action: "Invoice approved", time: "15 min ago", status: "completed" },
  { type: "Tradie", action: "Work order accepted", time: "1 hr ago", status: "active" },
  { type: "Renter", action: "Lease renewal signed", time: "3 hrs ago", status: "completed" },
  { type: "Landlord", action: "Statement downloaded", time: "5 hrs ago", status: "completed" },
];

const ServicesPortal = () => {
  const navigate = useNavigate();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Services Portal</h1>
              <p className="text-muted-foreground mt-1">Unified access for renters, landlords, and contractors</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {portals.map((portal) => (
                <Card key={portal.title} className="hover:border-primary/30 transition-all hover:shadow-lg cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
                        <portal.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{portal.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{portal.description}</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-secondary">
                        <p className="text-lg font-bold text-foreground">{portal.stats.active}</p>
                        <p className="text-xs text-muted-foreground">Active</p>
                      </div>
                      <div className="p-2 rounded-lg bg-secondary">
                        <p className="text-lg font-bold text-warning">{portal.stats.pending}</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                      <div className="p-2 rounded-lg bg-secondary">
                        <p className="text-lg font-bold text-primary">{portal.stats.resolved}</p>
                        <p className="text-xs text-muted-foreground">Resolved</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={() => {
                        if (portal.title === "Renter Portal") navigate("/renter-portal");
                      }}
                    >
                      Open Portal
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">{item.type}</Badge>
                        <span className="text-sm text-foreground">{item.action}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {item.time}
                        </span>
                        <Badge
                          className={
                            item.status === "completed"
                              ? "bg-primary/15 text-primary border-primary/20"
                              : item.status === "pending"
                              ? "bg-warning/15 text-warning border-warning/20"
                              : "bg-info/15 text-info border-info/20"
                          }
                        >
                          {item.status === "completed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ServicesPortal;
