import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X, GripVertical, Calendar, User, Bot, Send, Bell, CheckCircle } from "lucide-react";
import { useData } from "@/context/DataContext";
import { useNavigate } from "react-router-dom";

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
  { key: "backlog", label: "BACKLOG", color: "bg-muted/50 border-border" },
  { key: "open", label: "OPEN TASKS", color: "bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700" },
  { key: "working", label: "WORKING ON", color: "bg-blue-50/50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-700" },
  { key: "approval", label: "WAITING FOR APPROVAL", color: "bg-orange-50/50 dark:bg-orange-950/20 border-orange-300 dark:border-orange-700" },
  { key: "done", label: "DONE", color: "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700" },
];

const projects = ["Property Maintenance", "Compliance Audit", "Tenant Onboarding", "Inspections", "Documentation", "Onboarding", "Migration", "Reports", "Dashboard"];
const assignees = ["Sarah M.", "John D.", "Mark T.", "Unassigned"];

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

const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addToColumn, setAddToColumn] = useState<TaskStatus>("backlog");
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const { notifications, markNotificationSentToAI, addAILog } = useData();
  const navigate = useNavigate();

  // New task form state
  const [newTitle, setNewTitle] = useState("");
  const [newProject, setNewProject] = useState(projects[0]);
  const [newAssignee, setNewAssignee] = useState(assignees[0]);
  const [newPlanStart, setNewPlanStart] = useState("");
  const [newPlanEnd, setNewPlanEnd] = useState("");

  const handleDragStart = (taskId: string) => setDraggedTask(taskId);
  const handleDrop = (status: TaskStatus) => {
    if (!draggedTask) return;
    setTasks(prev => prev.map(t => t.id === draggedTask ? { ...t, status } : t));
    setDraggedTask(null);
  };
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const removeTask = (taskId: string) => setTasks(prev => prev.filter(t => t.id !== taskId));
  const getTasksByStatus = (status: TaskStatus) => tasks.filter(t => t.status === status);

  const openAddDialog = (column: TaskStatus) => {
    setAddToColumn(column);
    setNewTitle("");
    setNewProject(projects[0]);
    setNewAssignee(assignees[0]);
    setNewPlanStart("");
    setNewPlanEnd("");
    setAddDialogOpen(true);
  };

  const handleAddTask = () => {
    if (!newTitle.trim()) return;
    const newTask: Task = {
      id: `T${Date.now()}`,
      title: newTitle.trim(),
      project: newProject,
      assignee: newAssignee,
      planStart: newPlanStart || today,
      planEnd: newPlanEnd || today,
      actualStart: "",
      actualEnd: "",
      status: addToColumn,
    };
    setTasks(prev => [...prev, newTask]);
    setAddDialogOpen(false);
  };

  const toggleNotification = (id: string) => {
    setSelectedNotifications(prev =>
      prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
    );
  };

  const sendSelectedToAI = () => {
    if (selectedNotifications.length === 0) return;
    const selected = notifications.filter(n => selectedNotifications.includes(n.id));
    const digest = selected.map(n => `• [${n.type.toUpperCase()}] ${n.title}: ${n.description}`).join("\n");
    addAILog({
      timestamp: new Date().toISOString(),
      query: `Daily digest – ${selected.length} notification(s) sent for AI processing`,
      response: `Received ${selected.length} dashboard notifications for analysis:\n${digest}\n\nI'll monitor these items and provide updates as needed.`,
      source: "assistant",
    });
    markNotificationSentToAI(selectedNotifications);
    setSelectedNotifications([]);
  };

  const unsentNotifications = notifications.filter(n => !n.sentToAI);

  const notificationTypeColors: Record<string, string> = {
    maintenance: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    compliance: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    rent: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    inspection: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    tenant: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    task: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    general: "bg-muted text-muted-foreground",
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 overflow-auto">
            {/* Hero */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 sm:px-8 py-6 sm:py-10 text-white">
              <div className="max-w-[1600px] mx-auto">
                <h1 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2">Task Board</h1>
                <p className="text-emerald-100 text-sm sm:text-lg">
                  Track and manage property management tasks across all stages.
                </p>
              </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-3 sm:px-8 py-4 sm:py-6">
              {/* AI Digest Panel */}
              {unsentNotifications.length > 0 && (
                <Card className="mb-6 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold text-sm text-foreground">Dashboard Notifications</h3>
                        <Badge variant="secondary" className="text-xs">{unsentNotifications.length} new</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs gap-1"
                          onClick={() => {
                            if (selectedNotifications.length === unsentNotifications.length) {
                              setSelectedNotifications([]);
                            } else {
                              setSelectedNotifications(unsentNotifications.map(n => n.id));
                            }
                          }}
                        >
                          {selectedNotifications.length === unsentNotifications.length ? "Deselect All" : "Select All"}
                        </Button>
                        <Button
                          size="sm"
                          className="text-xs gap-1 bg-primary hover:bg-primary/90"
                          disabled={selectedNotifications.length === 0}
                          onClick={sendSelectedToAI}
                        >
                          <Bot className="h-3.5 w-3.5" />
                          Send to AI ({selectedNotifications.length})
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {unsentNotifications.map(n => (
                        <button
                          key={n.id}
                          onClick={() => toggleNotification(n.id)}
                          className={`flex items-start gap-2 p-2.5 rounded-lg border text-left transition-all ${
                            selectedNotifications.includes(n.id)
                              ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                              : "border-border hover:border-muted-foreground/30"
                          }`}
                        >
                          <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                            selectedNotifications.includes(n.id)
                              ? "bg-primary border-primary"
                              : "border-muted-foreground/40"
                          }`}>
                            {selectedNotifications.includes(n.id) && (
                              <CheckCircle className="h-3 w-3 text-primary-foreground" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <Badge className={`text-[10px] px-1.5 py-0 ${notificationTypeColors[n.type] || notificationTypeColors.general}`}>
                                {n.type}
                              </Badge>
                            </div>
                            <p className="text-xs font-medium text-foreground truncate">{n.title}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{n.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    {notifications.some(n => n.sentToAI) && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-muted-foreground hover:text-foreground gap-1"
                          onClick={() => navigate("/ai-assistant")}
                        >
                          <Bot className="h-3.5 w-3.5" />
                          View AI Digest in Assistant →
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Summary Stats */}
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
                      <button
                        onClick={() => openAddDialog(col.key)}
                        className="w-full text-left text-xs text-muted-foreground hover:text-primary px-2 py-1.5 rounded hover:bg-background/60 transition-colors flex items-center gap-1"
                      >
                        <Plus className="h-3 w-3" /> Add task
                      </button>

                      {getTasksByStatus(col.key).map(task => (
                        <Card
                          key={task.id}
                          draggable
                          onDragStart={() => handleDragStart(task.id)}
                          className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow border bg-card group"
                        >
                          <CardContent className="p-3 space-y-2">
                            <div className="flex items-start justify-between gap-1">
                              <div className="flex items-start gap-1.5">
                                <GripVertical className="h-3.5 w-3.5 text-muted-foreground/40 mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <p className="font-medium text-sm leading-tight">{task.title}</p>
                              </div>
                              <button
                                onClick={() => removeTask(task.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive shrink-0"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/30 text-primary bg-primary/5">
                              {task.project}
                            </Badge>
                            <div className="text-[10px] text-muted-foreground space-y-0.5">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-2.5 w-2.5" />
                                <span>Plan: {task.planStart} to {task.planEnd}</span>
                              </div>
                              {task.actualStart && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-2.5 w-2.5" />
                                  <span>Actual: {task.actualStart} to {task.actualEnd}</span>
                                </div>
                              )}
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

      {/* Add Task Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Task to {columns.find(c => c.key === addToColumn)?.label}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="task-title" className="text-sm">Task Title</Label>
              <Input
                id="task-title"
                placeholder="Enter task title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm">Project</Label>
                <Select value={newProject} onValueChange={setNewProject}>
                  <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {projects.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Assignee</Label>
                <Select value={newAssignee} onValueChange={setNewAssignee}>
                  <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {assignees.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm">Plan Start</Label>
                <Input type="date" value={newPlanStart} onChange={(e) => setNewPlanStart(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Plan End</Label>
                <Input type="date" value={newPlanEnd} onChange={(e) => setNewPlanEnd(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Column</Label>
              <Select value={addToColumn} onValueChange={(v) => setAddToColumn(v as TaskStatus)}>
                <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {columns.map(c => <SelectItem key={c.key} value={c.key}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTask} disabled={!newTitle.trim()} className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-1" /> Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
