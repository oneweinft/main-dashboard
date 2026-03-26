import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DollarSign, TrendingUp, TrendingDown, Download, Upload, FileSpreadsheet,
  ArrowUpRight, ArrowDownRight, BarChart3, PieChart, FileText, Filter, Search,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line, CartesianGrid,
} from "recharts";

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

type Transaction = {
  id: number;
  date: string;
  description: string;
  property: string;
  category: string;
  type: "income" | "expense";
  amount: number;
  status: "completed" | "pending" | "failed";
};

const transactions: Transaction[] = [
  { id: 1, date: "2025-03-25", description: "Rent Payment", property: "24 Casterly Rock Dr", category: "Rent", type: "income", amount: 950, status: "completed" },
  { id: 2, date: "2025-03-24", description: "Plumbing Repair", property: "8 Park Ave", category: "Maintenance", type: "expense", amount: 380, status: "completed" },
  { id: 3, date: "2025-03-24", description: "Rent Payment", property: "15 High St", category: "Rent", type: "income", amount: 620, status: "completed" },
  { id: 4, date: "2025-03-23", description: "Insurance Premium", property: "56 Elm Cres", category: "Insurance", type: "expense", amount: 245, status: "pending" },
  { id: 5, date: "2025-03-22", description: "Rent Payment", property: "56 Elm Cres", category: "Rent", type: "income", amount: 1200, status: "completed" },
  { id: 6, date: "2025-03-22", description: "Body Corporate Fees", property: "15 High St", category: "Admin", type: "expense", amount: 890, status: "completed" },
  { id: 7, date: "2025-03-21", description: "Rent Payment", property: "33 King William St", category: "Rent", type: "income", amount: 550, status: "failed" },
  { id: 8, date: "2025-03-20", description: "Property Inspection", property: "9 Ocean Pde", category: "Compliance", type: "expense", amount: 150, status: "completed" },
  { id: 9, date: "2025-03-19", description: "Management Fee", property: "24 Casterly Rock Dr", category: "Admin", type: "expense", amount: 76, status: "completed" },
  { id: 10, date: "2025-03-18", description: "Rent Payment", property: "9 Ocean Pde", category: "Rent", type: "income", amount: 700, status: "pending" },
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
  const [tab, setTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [txFilter, setTxFilter] = useState("all");

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  const filteredTx = transactions.filter((t) => {
    const matchSearch =
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.property.toLowerCase().includes(search.toLowerCase());
    if (txFilter === "all") return matchSearch;
    if (txFilter === "income") return matchSearch && t.type === "income";
    if (txFilter === "expense") return matchSearch && t.type === "expense";
    return matchSearch;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6 space-y-6">
            {/* Header */}
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
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" /> Import
                </Button>
                <Button className="gap-2">
                  <Download className="h-4 w-4" /> Export
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="import">Import</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
              </TabsList>

              {/* Overview */}
              <TabsContent value="overview" className="space-y-6 mt-4">
                {/* Summary cards */}
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
                          {s.up ? (
                            <ArrowUpRight className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 text-red-400" />
                          )}
                          <span className={s.up ? "text-emerald-400" : "text-red-400"}>{s.change}</span>
                          <span className="text-muted-foreground">vs last period</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-bold text-primary">Income vs Expenses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[260px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                          <Tooltip
                            contentStyle={{
                              borderRadius: 8,
                              border: "1px solid hsl(var(--border))",
                              background: "hsl(var(--card))",
                              color: "hsl(var(--foreground))",
                              fontSize: 12,
                            }}
                            formatter={(v: number) => [`$${v.toLocaleString()}`, undefined]}
                          />
                          <Bar dataKey="income" name="Income" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="expenses" name="Expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Transactions */}
              <TabsContent value="transactions" className="space-y-4 mt-4">
                <div className="flex gap-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search transactions..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
                  </div>
                  <Select value={txFilter} onValueChange={setTxFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expenses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Property</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
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
                            <TableCell>
                              <Badge variant="outline" className={statusColor[t.status]}>{t.status}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Import */}
              <TabsContent value="import" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Upload className="h-5 w-5 text-primary" /> Import Financial Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Upload financial records from your accounting software or spreadsheets. Supported formats:
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {importFormats.map((f) => (
                        <button
                          key={f.label}
                          className="flex items-center gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-accent"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <f.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{f.label}</p>
                            <p className="text-xs text-muted-foreground">{f.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-10 text-center">
                      <div>
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 font-medium text-foreground">Drag & drop files here</p>
                        <p className="text-sm text-muted-foreground">or click to browse</p>
                        <Button variant="outline" className="mt-4">Select Files</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Export */}
              <TabsContent value="export" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Download className="h-5 w-5 text-primary" /> Export Financial Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Generate and download financial reports for owners, tax filing, and compliance.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {exportFormats.map((f) => (
                        <Card key={f.label} className="cursor-pointer transition-colors hover:bg-accent">
                          <CardContent className="flex items-center gap-3 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                              <f.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{f.label}</p>
                              <p className="text-xs text-muted-foreground">{f.desc}</p>
                            </div>
                            <Download className="h-4 w-4 text-muted-foreground" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 rounded-lg border border-border p-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">Date Range</p>
                        <p className="text-xs text-muted-foreground">Select the reporting period</p>
                      </div>
                      <div className="ml-auto flex gap-2">
                        {["This Month", "This Quarter", "This FY", "Custom"].map((p) => (
                          <Button key={p} variant={p === "This Month" ? "default" : "outline"} size="sm">
                            {p}
                          </Button>
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
