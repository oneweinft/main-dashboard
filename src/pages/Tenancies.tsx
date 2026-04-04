import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Key, Search, Plus, Users, Home, UserX, Eye, Calendar, DollarSign, Phone, Mail } from "lucide-react";
import { useData, type Property } from "@/context/DataContext";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Tenancy {
  id: string;
  tenantName: string;
  email: string;
  phone: string;
  property: string;
  leaseStart: string;
  leaseEnd: string;
  rent: number;
  status: "active" | "expiring" | "month-to-month";
}

interface VacatedTenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  previousProperty: string;
  moveInDate: string;
  moveOutDate: string;
  reason: string;
  bondReturned: boolean;
}

const statusColor: Record<Tenancy["status"], string> = {
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  expiring: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "month-to-month": "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

const defaultTenancies: Tenancy[] = [
  { id: "tn1", tenantName: "Sarah Mitchell", email: "sarah.m@email.com", phone: "0412 345 678", property: "24 Casterly Rock Dr, Bondi", leaseStart: "2025-01-15", leaseEnd: "2026-01-14", rent: 950, status: "active" },
  { id: "tn2", tenantName: "James Cooper", email: "j.cooper@email.com", phone: "0423 456 789", property: "15 High St, Southbank", leaseStart: "2024-09-01", leaseEnd: "2025-08-31", rent: 620, status: "expiring" },
  { id: "tn3", tenantName: "Emma Wilson", email: "emma.w@email.com", phone: "0434 567 890", property: "56 Elm Cres, Fitzroy", leaseStart: "2024-06-01", leaseEnd: "2025-05-31", rent: 1200, status: "month-to-month" },
  { id: "tn4", tenantName: "Liam O'Brien", email: "liam.ob@email.com", phone: "0445 678 901", property: "33 King William St, Adelaide", leaseStart: "2025-03-01", leaseEnd: "2026-02-28", rent: 550, status: "active" },
];

const defaultVacated: VacatedTenant[] = [
  { id: "vt1", name: "Rachel Kim", email: "r.kim@email.com", phone: "0401 111 222", previousProperty: "8 Park Ave, Richmond", moveInDate: "2023-06-01", moveOutDate: "2025-01-31", reason: "Relocated interstate", bondReturned: true },
  { id: "vt2", name: "Tom Bradley", email: "t.bradley@email.com", phone: "0402 333 444", previousProperty: "9 Ocean Pde, Manly", moveInDate: "2024-01-15", moveOutDate: "2025-03-10", reason: "Lease not renewed", bondReturned: false },
  { id: "vt3", name: "Priya Sharma", email: "priya.s@email.com", phone: "0403 555 666", previousProperty: "12 Sunset Blvd, Surfers Paradise", moveInDate: "2023-11-01", moveOutDate: "2024-10-31", reason: "Purchased own home", bondReturned: true },
  { id: "vt4", name: "Daniel Frost", email: "d.frost@email.com", phone: "0404 777 888", previousProperty: "102 River Rd, Parramatta", moveInDate: "2024-03-01", moveOutDate: "2025-02-15", reason: "End of fixed term", bondReturned: true },
];

const Tenancies = () => {
  const { properties } = useData();
  const { toast } = useToast();
  const [tab, setTab] = useState("active");
  const [search, setSearch] = useState("");
  const [vacatedSearch, setVacatedSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [tenancies] = useState<Tenancy[]>(defaultTenancies);
  const [vacated] = useState<VacatedTenant[]>(defaultVacated);
  const [form, setForm] = useState({ name: "", email: "", phone: "", property: "", leaseStart: "", leaseEnd: "", rent: "500" });

  const filteredTenancies = tenancies.filter((t) => {
    const matchSearch = t.tenantName.toLowerCase().includes(search.toLowerCase()) || t.email.toLowerCase().includes(search.toLowerCase());
    if (tab === "active") return matchSearch;
    if (tab === "expiring") return matchSearch && t.status === "expiring";
    if (tab === "periodic") return matchSearch && t.status === "month-to-month";
    return matchSearch;
  });

  const filteredVacated = vacated.filter((v) =>
    v.name.toLowerCase().includes(vacatedSearch.toLowerCase()) ||
    v.email.toLowerCase().includes(vacatedSearch.toLowerCase()) ||
    v.previousProperty.toLowerCase().includes(vacatedSearch.toLowerCase()) ||
    v.reason.toLowerCase().includes(vacatedSearch.toLowerCase())
  );

  const stats = {
    total: tenancies.length,
    active: tenancies.filter((t) => t.status === "active").length,
    expiring: tenancies.filter((t) => t.status === "expiring").length,
    vacated: vacated.length,
  };

  const handleAdd = () => {
    if (!form.name || !form.property) {
      toast({ title: "Required", description: "Tenant name and property are required.", variant: "destructive" });
      return;
    }
    toast({ title: "Tenant Added", description: `${form.name} has been added to the tenancy list.` });
    setForm({ name: "", email: "", phone: "", property: "", leaseStart: "", leaseEnd: "", rent: "500" });
    setOpen(false);
  };

  const vacantProperties = properties.filter((p) => p.status === "vacant" || p.status === "listed");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Key className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground">Tenancies</h1>
                  <p className="text-sm text-muted-foreground">Manage tenants and lease agreements</p>
                </div>
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2"><Plus className="h-4 w-4" /> Add Tenant</Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader><DialogTitle>Add New Tenant</DialogTitle></DialogHeader>
                  <div className="grid gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label>Tenant Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" /></div>
                      <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tenant@email.com" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="0412 345 678" /></div>
                      <div><Label>Property</Label>
                        <Select value={form.property} onValueChange={(v) => setForm({ ...form, property: v })}>
                          <SelectTrigger><SelectValue placeholder="Select property" /></SelectTrigger>
                          <SelectContent>
                            {vacantProperties.map((p) => (
                              <SelectItem key={p.id} value={`${p.address}, ${p.suburb}`}>{p.address}, {p.suburb}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div><Label>Lease Start</Label><Input type="date" value={form.leaseStart} onChange={(e) => setForm({ ...form, leaseStart: e.target.value })} /></div>
                      <div><Label>Lease End</Label><Input type="date" value={form.leaseEnd} onChange={(e) => setForm({ ...form, leaseEnd: e.target.value })} /></div>
                      <div><Label>Rent (pw)</Label><Input type="number" value={form.rent} onChange={(e) => setForm({ ...form, rent: e.target.value })} /></div>
                    </div>
                    <Button onClick={handleAdd} className="w-full">Add Tenant</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Total Tenants", value: stats.total, icon: Users },
                { label: "Active Leases", value: stats.active, icon: Home },
                { label: "Expiring Soon", value: stats.expiring, icon: Calendar },
                { label: "Vacated", value: stats.vacated, icon: UserX },
              ].map((s) => (
                <Card key={s.label}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <s.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{s.label}</p>
                      <p className="text-xl font-bold text-foreground">{s.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabs */}
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="active">Active ({stats.active})</TabsTrigger>
                <TabsTrigger value="expiring">Expiring</TabsTrigger>
                <TabsTrigger value="periodic">Periodic</TabsTrigger>
                <TabsTrigger value="vacated">Vacated Log</TabsTrigger>
              </TabsList>

              {/* Active / Expiring / Periodic tenancies */}
              {["active", "expiring", "periodic"].map((tabKey) => (
                <TabsContent key={tabKey} value={tabKey}>
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          {tabKey === "active" ? "Active Tenants" : tabKey === "expiring" ? "Expiring Leases" : "Periodic Tenancies"}
                        </CardTitle>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input placeholder="Search by tenant name..." className="pl-9 w-[240px]" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                      <Table className="min-w-[700px]">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Tenant Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Property</TableHead>
                            <TableHead>Lease Period</TableHead>
                            <TableHead>Rent (pw)</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-10"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredTenancies.map((t) => (
                            <TableRow key={t.id}>
                              <TableCell>
                                <span className="font-medium text-foreground">{t.tenantName}</span>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col gap-0.5">
                                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Mail className="h-3 w-3" />{t.email}</span>
                                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Phone className="h-3 w-3" />{t.phone}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-muted-foreground text-sm">{t.property}</TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                {new Date(t.leaseStart).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "2-digit" })} — {new Date(t.leaseEnd).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "2-digit" })}
                              </TableCell>
                              <TableCell className="font-medium text-foreground">${t.rent}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className={statusColor[t.status]}>{t.status === "month-to-month" ? "Periodic" : t.status}</Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                              </TableCell>
                            </TableRow>
                          ))}
                          {filteredTenancies.length === 0 && (
                            <TableRow><TableCell colSpan={7} className="h-24 text-center text-muted-foreground">No tenants found.</TableCell></TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}

              {/* Vacated Log — search-focused */}
              <TabsContent value="vacated">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col gap-3">
                      <CardTitle className="text-base">Vacated Renters Log</CardTitle>
                      <p className="text-sm text-muted-foreground">Search former tenants by name, property, or reason for vacating.</p>
                      <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search vacated renters by name, property, reason..."
                          className="pl-9"
                          value={vacatedSearch}
                          onChange={(e) => setVacatedSearch(e.target.value)}
                          autoFocus
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tenant Name</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Previous Property</TableHead>
                          <TableHead>Tenancy Period</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Bond</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredVacated.map((v) => (
                          <TableRow key={v.id}>
                            <TableCell>
                              <span className="font-medium text-foreground">{v.name}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-0.5">
                                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Mail className="h-3 w-3" />{v.email}</span>
                                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Phone className="h-3 w-3" />{v.phone}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">{v.previousProperty}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {new Date(v.moveInDate).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "2-digit" })} — {new Date(v.moveOutDate).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "2-digit" })}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">{v.reason}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={v.bondReturned ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-amber-500/15 text-amber-400 border-amber-500/30"}>
                                {v.bondReturned ? "Returned" : "Pending"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredVacated.length === 0 && (
                          <TableRow><TableCell colSpan={6} className="h-24 text-center text-muted-foreground">No vacated renters match your search.</TableCell></TableRow>
                        )}
                      </TableBody>
                    </Table>
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

export default Tenancies;
