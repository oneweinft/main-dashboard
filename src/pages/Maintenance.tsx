import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

const statusTabs = [
  { label: "New Requests", count: 18, color: "destructive" as const },
  { label: "Waiting on PM", count: 6, color: "default" as const },
  { label: "Approved by Landlord", count: 44, color: "destructive" as const },
  { label: "Waiting LL Approval", count: 127, color: "secondary" as const },
  { label: "Waiting Tenants Info", count: 127, color: "secondary" as const },
  { label: "All Requests", count: null, color: "outline" as const },
];

const jobs = [
  { id: "Job No. 2075816", description: "Dinner Room Lighting Other", name: "Raymond", address: "8 Savanna Place, EIGHT MILE PLAINS, Queensland 413", origin: "Tenants", jobStatus: "Invoice Submitted", maintenanceType: "General Wear and Tear", orderNumber: "0" },
  { id: "Job No. 3333764", description: "", name: "Raymond", address: "8 Savanna Place, EIGHT MILE PLAINS, Queensland 413", origin: "Tenants", jobStatus: "Quoted", maintenanceType: "General Wear and Tear", orderNumber: "0" },
  { id: "Job No. 3333764", description: "", name: "Raymond", address: "8 Savanna Place, EIGHT MILE PLAINS, Queensland 413", origin: "Tenants", jobStatus: "Quoted", maintenanceType: "General Wear and Tear", orderNumber: "0" },
  { id: "Job No. 3333764", description: "", name: "Raymond", address: "8 Savanna Place, EIGHT MILE PLAINS, Queensland 413", origin: "Tenants", jobStatus: "Quoted", maintenanceType: "General Wear and Tear", orderNumber: "0" },
  { id: "Job No. 3333764", description: "", name: "Raymond", address: "8 Savanna Place, EIGHT MILE PLAINS, Queensland 413", origin: "Tenants", jobStatus: "Quoted", maintenanceType: "General Wear and Tear", orderNumber: "0" },
  { id: "Job No. 3333764", description: "", name: "Raymond", address: "8 Savanna Place, EIGHT MILE PLAINS, Queensland 413", origin: "Tenants", jobStatus: "Quoted", maintenanceType: "General Wear and Tear", orderNumber: "0" },
  { id: "Job No. 3333764", description: "", name: "Raymond", address: "8 Savanna Place, EIGHT MILE PLAINS, Queensland 413", origin: "Tenants", jobStatus: "Quoted", maintenanceType: "General Wear and Tear", orderNumber: "0" },
  { id: "Job No. 3333764", description: "", name: "Raymond", address: "8 Savanna Place, EIGHT MILE PLAINS, Queensland 413", origin: "Tenants", jobStatus: "Quoted", maintenanceType: "General Wear and Tear", orderNumber: "0" },
  { id: "Job No. 3333764", description: "", name: "Raymond", address: "8 Savanna Place, EIGHT MILE PLAINS, Queensland 413", origin: "Tenants", jobStatus: "Quoted", maintenanceType: "General Wear and Tear", orderNumber: "0" },
];

const detailFields = [
  { label: "Name", value: "Raymond" },
  { label: "Phone", value: "754431795" },
  { label: "Address", value: "8 Savanna Place, EIGHT MILE PLAINS, Queensland 413" },
  { label: "Origin", value: "Tenants" },
  { label: "Job Status", value: "Invoice Submitted" },
  { label: "Maintenance Type", value: "General Wear and Tear" },
  { label: "Order Number", value: "0" },
  { label: "Quoted/Offered Job", value: "Quoted" },
  { label: "Requests", value: "" },
  { label: "Quote Withhold", value: "☐" },
  { label: "Created Date", value: "00/00/0000" },
  { label: "Start Date", value: "00/00/0000" },
  { label: "Actual Completion Date", value: "00/00/0000" },
  { label: "Job Due Date", value: "00/00/0000" },
  { label: "Trade", value: "Stairs" },
  { label: "Tradie", value: "Warren" },
];

const Maintenance = () => {
  const [activeTab, setActiveTab] = useState("New Requests");
  const [selectedJob, setSelectedJob] = useState(0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold text-foreground">Requests</h1>

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2">
              {statusTabs.map((tab) => (
                <Button
                  key={tab.label}
                  size="sm"
                  variant={activeTab === tab.label ? "default" : "outline"}
                  onClick={() => setActiveTab(tab.label)}
                  className="gap-1.5 text-xs"
                >
                  {tab.label}
                  {tab.count !== null && (
                    <Badge variant={tab.color} className="text-[10px] h-5 min-w-5 px-1.5">
                      {tab.count}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>

            {/* Content: Table + Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Jobs Table */}
              <div className="lg:col-span-3 bg-card rounded-xl border border-border p-4 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Input placeholder="Search..." className="h-8 text-xs w-24" />
                  <div className="flex gap-2 ml-2">
                    {["Month", "Month", "Month", "Month"].map((m, i) => (
                      <Input key={i} placeholder={m} className="h-8 text-xs w-20" />
                    ))}
                  </div>
                </div>

                {/* Column Filter Badges */}
                <div className="flex flex-wrap gap-2">
                  {["Phone", "Address", "Origin", "Job Status", "Maintenance Type", "Order Number", "Advertising", "Deductions"].map((col) => (
                    <Badge key={col} variant="default" className="text-xs cursor-pointer">
                      {col}
                    </Badge>
                  ))}
                </div>

                {/* Job Rows */}
                <div className="space-y-1">
                  {jobs.map((job, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedJob(i)}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs cursor-pointer transition-colors ${
                        selectedJob === i
                          ? "bg-primary/10 border border-primary/30"
                          : i % 2 === 0
                          ? "bg-muted/30"
                          : "bg-card"
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <span className="text-primary font-medium whitespace-nowrap">{job.id}</span>
                        {job.description && (
                          <span className="text-foreground truncate">{job.description}</span>
                        )}
                        <span className="text-muted-foreground whitespace-nowrap">{job.name}</span>
                        <span className="text-muted-foreground truncate hidden md:inline">{job.address}</span>
                      </div>
                      <Button size="sm" variant="default" className="text-[10px] h-6 px-3 shrink-0">
                        Expand
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detail Panel */}
              <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5 space-y-4">
                <h2 className="text-sm font-bold text-foreground">
                  Dinner Room Lighting Other (Job 2075816)
                </h2>
                <div className="space-y-3">
                  {detailFields.map((field) => (
                    <div key={field.label} className="flex items-start gap-3">
                      <span className="text-xs font-medium text-muted-foreground w-36 shrink-0">
                        {field.label}
                      </span>
                      {field.label === "Requests" ? (
                        <Input className="h-7 text-xs flex-1" defaultValue={field.value} />
                      ) : (
                        <span className="text-xs text-foreground">{field.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Maintenance;
