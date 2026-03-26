import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, GripVertical, Calendar, User } from "lucide-react";

type TaskStatus = "backlog" | "open" | "working" | "approval" | "done";

interface Task {
  id: string;
  title: string;
  project: string;
  planStart: string;
  planEnd: string;
  actualStart: string;
  actualEnd: string;
  assignee: string;
  status: TaskStatus;
}

const columns: { key: TaskStatus; label: string; color: string }[] = [
  { key: "backlog", label: "BACKLOG", color: "bg-gray-100 border-gray-300" },
  { key: "open", label: "OPEN TASKS", color: "bg-amber-50 border-amber-300" },
  { key: "working", label: "WORKING ON", color: "bg-blue-50 border-blue-300" },
  { key: "approval", label: "WAITING FOR APPROVAL", color: "bg-orange-50 border-orange-300" },
  { key: "done", label: "DONE", color: "bg-emerald-50 border-emerald-300" },
];

const initialTasks: Task[] = [
  { id: "T001", title: "New Backlog Item", project: "Property Maintenance", planStart: "Oct 24, 2026", planEnd: "Oct 24, 2026", actualStart: "Nov 3, 2026", actualEnd: "Nov 4, 2026", assignee: "Sarah M.", status: "backlog" },
  { id: "T002", title: "Update Compliance Records", project: "Compliance Audit", planStart: "Nov 16, 2026", planEnd: "Nov 20, 2026", actualStart: "Nov 3, 2026", actualEnd: "Nov 8, 2026", assignee: "John D.", status: "backlog" },
  { id: "T003", title: "Review Tenant Applications", project: "Tenant Onboarding", planStart: "Nov 9, 2026", planEnd: "Nov 15, 2026", actualStart: "Nov 3, 2026", actualEnd: "Nov 10, 2026", assignee: "Sarah M.", status: "backlog" },
  { id: "T004", title: "Schedule Property Inspections", project: "Inspections", planStart: "Aug 29, 2026", planEnd: "Aug 28, 2026", actualStart: "Nov 3, 2026", actualEnd: "Nov 4, 2026", assignee: "Mark T.", status: "open" },
  { id: "T005", title: "Create Maintenance Manual", project: "Documentation", planStart: "Sep 5, 2026", planEnd: "Sep 10, 2026", actualStart: "Nov 3, 2026", actualEnd: "Nov 8, 2026", assignee: "Sarah M.", status: "open" },
  { id: "T006", title: "Write Onboarding Requirements", project: "Onboarding", planStart: "Aug 29, 2026", planEnd: "Sep 7, 2026", actualStart: "Nov 3, 2026", actualEnd: "Nov 12, 2026", assignee: "John D.", status: "open" },
  { id: "T007", title: "Fix Plumbing Issue – Unit 12", project: "Property Maintenance", planStart: "Oct 14, 2026", planEnd: "Oct 16, 2026", actualStart: "Oct 18, 2026", actualEnd: "Oct 21, 2026", assignee: "Mark T.", status: "working" },
  { id: "T008", title: "Update Documentation Portal", project: "Documentation", planStart: "Oct 28, 2026", planEnd: "Nov 15, 2026", actualStart: "Oct 26, 2026", actualEnd: "Sep 17, 2026", assignee: "Sarah M.", status: "working" },
  { id: "T009", title: "Develop Migration Scripts", project: "Migration", planStart: "Oct 21, 2026", planEnd: "Nov 3, 2026", actualStart: "Aug 29, 2026", actualEnd: "Nov 12, 2026", assignee: "John D.", status: "working" },
  { id: "T010", title: "Test New Renter Portal", project: "Tenant Onboarding", planStart: "Oct 14, 2026", planEnd: "Oct 14, 2026", actualStart: "Oct 14, 2026", actualEnd: "Oct 14, 2026", assignee: "Sarah M.", status: "approval" },
  { id: "T011", title: "Final Testing of Reports", project: "Reports", planStart: "Nov 21, 2026", planEnd: "Nov 3, 2026", actualStart: "Aug 31, 2026", actualEnd: "Aug 28, 2026", assignee: "Mark T.", status: "approval" },
  { id: "T012", title: "QA Testing – Compliance Module", project: "Compliance Audit", planStart: "Oct 1, 2026", planEnd: "Nov 3, 2026", actualStart: "Aug 29, 2026", actualEnd: "Aug 28, 2026", assignee: "John D.", status: "approval" },
  { id: "T013", title: "Bug Fixes – Dashboard", project: "Dashboard", planStart: "Nov 4, 2026", planEnd: "Nov 6, 2026", actualStart: "Aug 29, 2026", actualEnd: "Aug 28, 2026", assignee: "Sarah M.", status: "done" },
  { id: "T014", title: "Approve Inspection Specs", project: "Inspections", planStart: "Oct 24, 2026", planEnd: "Oct 25, 2026", actualStart: "Aug 29, 2026", actualEnd: "Aug 28, 2026", assignee: "Mark T.", status: "done" },
  { id: "T015", title: "Review Migration Specs", project: "Migration", planStart: "Oct 22, 2026", planEnd: "Oct 23, 2026", actualStart: "Aug 29, 2026", actualEnd: "Aug 18, 2026", assignee: "John D.", status: "done" },
  { id: "T016", title: "Write Compliance Specification", project: "Compliance Audit", planStart: "Sep 8, 2026", planEnd: "Oct 21, 2026", actualStart: "Aug 29, 2026", actualEnd: "Oct 18, 2026", assignee: "Sarah M.", status: "done" },
];

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDrop = (status: TaskStatus) => {
    if (!draggedTask) return;
    setTasks(prev =>
      prev.map(t => t.id === draggedTask ? { ...t, status } : t)
    );
    setDraggedTask(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const getTasksByStatus = (status: TaskStatus) =>
    tasks.filter(t => t.status === status);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto">
            {/* Hero */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-10 text-white">
              <div className="max-w-[1600px] mx-auto">
                <h1 className="text-3xl font-bold mb-2">Task Board</h1>
                <p className="text-emerald-100 text-lg">
                  Track and manage property management tasks across all stages.
                </p>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="max-w-[1600px] mx-auto px-8 py-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {columns.map(col => (
                  <div key={col.key} className={`rounded-lg border p-4 ${col.color}`}>
                    <p className="text-xs font-medium text-muted-foreground uppercase">{col.label}</p>
                    <p className="text-2xl font-bold mt-1">{getTasksByStatus(col.key).length}</p>
                  </div>
                ))}
              </div>

              {/* Kanban Board */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {columns.map(col => (
                  <div
                    key={col.key}
                    className={`rounded-lg border-2 ${col.color} min-h-[500px] flex flex-col`}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(col.key)}
                  >
                    <div className="px-3 py-3 border-b border-inherit">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {col.label}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {getTasksByStatus(col.key).length}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-2 space-y-2 flex-1">
                      {/* Add task placeholder */}
                      <button className="w-full text-left text-xs text-muted-foreground hover:text-emerald-600 px-2 py-1.5 rounded hover:bg-white/60 transition-colors flex items-center gap-1">
                        <Plus className="h-3 w-3" /> Add task
                      </button>

                      {getTasksByStatus(col.key).map(task => (
                        <Card
                          key={task.id}
                          draggable
                          onDragStart={() => handleDragStart(task.id)}
                          className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow border bg-white group"
                        >
                          <CardContent className="p-3 space-y-2">
                            <div className="flex items-start justify-between gap-1">
                              <div className="flex items-start gap-1.5">
                                <GripVertical className="h-3.5 w-3.5 text-muted-foreground/40 mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <p className="font-medium text-sm leading-tight">{task.title}</p>
                              </div>
                              <button
                                onClick={() => removeTask(task.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-500 shrink-0"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-emerald-200 text-emerald-700 bg-emerald-50">
                              {task.project}
                            </Badge>
                            <div className="text-[10px] text-muted-foreground space-y-0.5">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-2.5 w-2.5" />
                                <span>Plan: {task.planStart} to {task.planEnd}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-2.5 w-2.5" />
                                <span>Actual: {task.actualStart} to {task.actualEnd}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                              <User className="h-2.5 w-2.5" />
                              <span>{task.assignee}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
