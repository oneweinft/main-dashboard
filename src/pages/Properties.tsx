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
import {
  Building2, Search, Plus, MapPin, Home, Users, DollarSign, Filter, Eye,
} from "lucide-react";
import { useData, type Property } from "@/context/DataContext";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const statusColor: Record<Property["status"], string> = {
  occupied: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  vacant: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  maintenance: "bg-red-500/15 text-red-400 border-red-500/30",
  listed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

const Properties = () => {
  const { properties, addProperty } = useData();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ address: "", suburb: "", state: "NSW", type: "House", bedrooms: "3", bathrooms: "1", parking: "1", rent: "500", status: "vacant" as Property["status"], owner: "" });

  const filtered = properties.filter((p) => {
    const matchSearch = p.address.toLowerCase().includes(search.toLowerCase()) || p.suburb.toLowerCase().includes(search.toLowerCase()) || p.owner.toLowerCase().includes(search.toLowerCase());
    if (tab === "all") return matchSearch;
    return matchSearch && p.status === tab;
  });

  const stats = {
    total: properties.length,
    occupied: properties.filter((p) => p.status === "occupied").length,
    vacant: properties.filter((p) => p.status === "vacant").length,
    revenue: properties.filter((p) => p.status === "occupied").reduce((s, p) => s + p.rent, 0),
  };

  const handleAdd = () => {
    if (!form.address || !form.owner) { toast({ title: "Required", description: "Address and owner are required.", variant: "destructive" }); return; }
    addProperty({ address: form.address, suburb: form.suburb, state: form.state, type: form.type, bedrooms: parseInt(form.bedrooms), bathrooms: parseInt(form.bathrooms), parking: parseInt(form.parking), rent: parseFloat(form.rent), status: form.status, owner: form.owner });
    toast({ title: "Property Added", description: `${form.address} has been added.` });
    setForm({ address: "", suburb: "", state: "NSW", type: "House", bedrooms: "3", bathrooms: "1", parking: "1", rent: "500", status: "vacant", owner: "" });
    setOpen(false);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground">Properties</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground">Manage your property portfolio</p>
                </div>
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2"><Plus className="h-4 w-4" /> Add Property</Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader><DialogTitle>Add New Property</DialogTitle></DialogHeader>
                  <div className="grid gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label>Address</Label><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="123 Main St" /></div>
                      <div><Label>Suburb</Label><Input value={form.suburb} onChange={(e) => setForm({ ...form, suburb: e.target.value })} placeholder="Bondi" /></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div><Label>State</Label>
                        <Select value={form.state} onValueChange={(v) => setForm({ ...form, state: v })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>{["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div><Label>Type</Label>
                        <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>{["House", "Apartment", "Townhouse", "Unit", "Villa"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div><Label>Status</Label>
                        <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as Property["status"] })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>{["vacant", "occupied", "maintenance", "listed"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <div><Label>Beds</Label><Input type="number" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} /></div>
                      <div><Label>Baths</Label><Input type="number" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} /></div>
                      <div><Label>Parking</Label><Input type="number" value={form.parking} onChange={(e) => setForm({ ...form, parking: e.target.value })} /></div>
                      <div><Label>Rent (pw)</Label><Input type="number" value={form.rent} onChange={(e) => setForm({ ...form, rent: e.target.value })} /></div>
                    </div>
                    <div><Label>Owner</Label><Input value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} placeholder="Owner name" /></div>
                    <Button onClick={handleAdd} className="w-full">Add Property</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Total Properties", value: stats.total, icon: Building2 },
                { label: "Occupied", value: stats.occupied, icon: Home },
                { label: "Vacant", value: stats.vacant, icon: MapPin },
                { label: "Monthly Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign },
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

            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Tabs value={tab} onValueChange={setTab}>
                    <TabsList>
                      <TabsTrigger value="all">All ({properties.length})</TabsTrigger>
                      <TabsTrigger value="occupied">Occupied</TabsTrigger>
                      <TabsTrigger value="vacant">Vacant</TabsTrigger>
                      <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                      <TabsTrigger value="listed">Listed</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search properties..." className="pl-9 w-[220px]" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Address</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Bed/Bath/Car</TableHead>
                      <TableHead>Rent (pw)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>
                          <div><span className="font-medium text-foreground">{p.address}</span><span className="block text-xs text-muted-foreground">{p.suburb}, {p.state}</span></div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{p.type}</TableCell>
                        <TableCell className="text-muted-foreground">{p.bedrooms} / {p.bathrooms} / {p.parking}</TableCell>
                        <TableCell className="font-medium text-foreground">${p.rent}</TableCell>
                        <TableCell><Badge variant="outline" className={statusColor[p.status]}>{p.status}</Badge></TableCell>
                        <TableCell className="text-muted-foreground">{p.tenant || "—"}</TableCell>
                        <TableCell className="text-muted-foreground">{p.owner}</TableCell>
                        <TableCell><Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button></TableCell>
                      </TableRow>
                    ))}
                    {filtered.length === 0 && (
                      <TableRow><TableCell colSpan={8} className="h-24 text-center text-muted-foreground">No properties found.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Properties;
