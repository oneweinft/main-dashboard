import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  DollarSign, TrendingUp, TrendingDown, Download, Upload, FileSpreadsheet,
  ArrowUpRight, ArrowDownRight, PieChart, FileText, Search, Plus, BarChart3,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
} from "recharts";
import { useData, type Transaction } from "@/context/DataContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const revenueData = [
  { month: "Jul", income: 82400, expenses: 31200 },
  { month: "Aug", income: 85100, expenses: 29800 },
  { month: "Sep", income: 84600, expenses: 33100 },
  { month: "Oct", income: 87200, expenses: 30500 },
  { month: "Nov", income: 86800, expenses: 32400 },
  { month: "Dec", income: 89500, expenses: 34200 },
  { month: "Jan", income: 91200, expenses: 31800 },
  { month: "Feb", income: 90800, expenses: 30100 },
  { month: "Mar", income: 93400, expenses: 32700 },
];

const importFormats = [
  { label: "CSV (.csv)", desc: "Comma-separated values", icon: FileSpreadsheet },
  { label: "Excel (.xlsx)", desc: "Microsoft Excel workbook", icon: FileSpreadsheet },
  { label: "MYOB Export", desc: "MYOB accounting data", icon: FileText },
  { label: "Xero Export", desc: "Xero accounting data", icon: FileText },
];

const exportFormats = [
  { label: "CSV Report", desc: "Full transaction history", icon: FileSpreadsheet },
  { label: "Excel Report", desc: "Formatted financial report", icon: FileSpreadsheet },
  { label: "PDF Statement", desc: "Owner/tenant statement", icon: FileText },
  { label: "Tax Summary", desc: "End-of-year tax report", icon: FileText },
  { label: "BAS Report", desc: "GST/BAS compliance export", icon: BarChart3 },
];

const statusColor: Record<Transaction["status"], string> = {
  completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  failed: "bg-red-500/15 text-red-400 border-red-500/30",
};

const Financials = () => {
  const { transactions, addTransaction, properties } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [txFilter, setTxFilter] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0, 10), description: "", property: "", category: "Rent", type: "income" as "income" | "expense", amount: "", status: "completed" as Transaction["status"] });

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  const filteredTx = transactions.filter((t) => {
    const matchSearch = t.description.toLowerCase().includes(search.toLowerCase()) || t.property.toLowerCase().includes(search.toLowerCase());
    if (txFilter === "all") return matchSearch;
    if (txFilter === "income") return matchSearch && t.type === "income";
    if (txFilter === "expense") return matchSearch && t.type === "expense";
    return matchSearch;
  });

  const handleAddTx = () => {
    if (!form.description || !form.amount) { toast({ title: "Required", description: "Description and amount are required.", variant: "destructive" }); return; }
    addTransaction({ date: form.date, description: form.description, property: form.property || "General", category: form.category, type: form.type, amount: parseFloat(form.amount), status: form.status });
    toast({ title: "Transaction Added", description: `${form.description} — $${form.amount}` });
    setForm({ date: new Date().toISOString().slice(0, 10), description: "", property: "", category: "Rent", type: "income", amount: "", status: "completed" });
    setAddOpen(false);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Financials</h1>
                  <p className="text-sm text-muted-foreground">Revenue, expenses & import/export tools</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2" onClick={() => navigate("/migration")}>
                  <Upload className="h-4 w-4" /> Import via Migration
                </Button>
                <Dialog open={addOpen} onOpenChange={setAddOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2"><Plus className="h-4 w-4" /> Add Transaction</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Add Transaction</DialogTitle></DialogHeader>
                    <div className="grid gap-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div><Label>Date</Label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
                        <div><Label>Type</Label>
                          <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as "income" | "expense" })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="income">Income</SelectItem><SelectItem value="expense">Expense</SelectItem></SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Rent Payment" /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><Label>Property</Label>
                          <Select value={form.property} onValueChange={(v) => setForm({ ...form, property: v })}>
                            <SelectTrigger><SelectValue placeholder="Select property" /></SelectTrigger>
                            <SelectContent>{properties.map((p) => <SelectItem key={p.id} value={p.address}>{p.address}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>
                        <div><Label>Category</Label>
                          <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>{["Rent", "Maintenance", "Insurance", "Admin", "Compliance", "General"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><Label>Amount ($)</Label><Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0.00" /></div>
                        <div><Label>Status</Label>
                          <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as Transaction["status"] })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="completed">Completed</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="failed">Failed</SelectItem></SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button onClick={handleAddTx} className="w-full">Add Transaction</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transactions">Transactions ({transactions.length})</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "Total Income", value: `$${totalIncome.toLocaleString()}`, change: "+8.2%", up: true, icon: TrendingUp },
                    { label: "Total Expenses", value: `$${totalExpenses.toLocaleString()}`, change: "+3.1%", up: false, icon: TrendingDown },
                    { label: "Net Profit", value: `$${(totalIncome - totalExpenses).toLocaleString()}`, change: "+12.4%", up: true, icon: DollarSign },
                    { label: "Avg Rent Yield", value: "5.8%", change: "+0.3%", up: true, icon: PieChart },
                  ].map((s) => (
                    <Card key={s.label}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">{s.label}</p>
                          <s.icon className={`h-4 w-4 ${s.up ? "text-emerald-400" : "text-red-400"}`} />
                        </div>
                        <p className="mt-1 text-2xl font-bold text-foreground">{s.value}</p>
                        <div className="mt-1 flex items-center gap-1 text-xs">
                          {s.up ? <ArrowUpRight className="h-3 w-3 text-emerald-400" /> : <ArrowDownRight className="h-3 w-3 text-red-400" />}
                          <span className={s.up ? "text-emerald-400" : "text-red-400"}>{s.change}</span>
                          <span className="text-muted-foreground">vs last period</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-base font-bold text-primary">Income vs Expenses</CardTitle></CardHeader>
                  <CardContent>
                    <div className="h-[260px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", color: "hsl(var(--foreground))", fontSize: 12 }} formatter={(v: number) => [`$${v.toLocaleString()}`, undefined]} />
                          <Bar dataKey="income" name="Income" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="expenses" name="Expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-4 mt-4">
                <div className="flex gap-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search transactions..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
                  </div>
                  <Select value={txFilter} onValueChange={setTxFilter}>
                    <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="income">Income</SelectItem><SelectItem value="expense">Expenses</SelectItem></SelectContent>
                  </Select>
                </div>
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead><TableHead>Description</TableHead><TableHead>Property</TableHead><TableHead>Category</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTx.map((t) => (
                          <TableRow key={t.id}>
                            <TableCell className="text-muted-foreground">{t.date}</TableCell>
                            <TableCell className="font-medium text-foreground">{t.description}</TableCell>
                            <TableCell className="text-muted-foreground">{t.property}</TableCell>
                            <TableCell><Badge variant="outline">{t.category}</Badge></TableCell>
                            <TableCell className={`font-medium ${t.type === "income" ? "text-emerald-400" : "text-red-400"}`}>
                              {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
                            </TableCell>
                            <TableCell><Badge variant="outline" className={statusColor[t.status]}>{t.status}</Badge></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="export" className="space-y-4 mt-4">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Download className="h-5 w-5 text-primary" /> Export Financial Reports</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">Generate and download financial reports for owners, tax filing, and compliance.</p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {exportFormats.map((f) => (
                        <Card key={f.label} className="cursor-pointer transition-colors hover:bg-accent">
                          <CardContent className="flex items-center gap-3 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10"><f.icon className="h-5 w-5 text-primary" /></div>
                            <div className="flex-1"><p className="font-medium text-foreground">{f.label}</p><p className="text-xs text-muted-foreground">{f.desc}</p></div>
                            <Download className="h-4 w-4 text-muted-foreground" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 rounded-lg border border-border p-4">
                      <div><p className="text-sm font-medium text-foreground">Date Range</p><p className="text-xs text-muted-foreground">Select the reporting period</p></div>
                      <div className="ml-auto flex gap-2">
                        {["This Month", "This Quarter", "This FY", "Custom"].map((p) => (
                          <Button key={p} variant={p === "This Month" ? "default" : "outline"} size="sm">{p}</Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Financials;
