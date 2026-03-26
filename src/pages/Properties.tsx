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
  Building2, Search, Plus, MapPin, Home, Users, DollarSign, Filter,
  ArrowUpDown, Eye,
} from "lucide-react";

type Property = {
  id: number;
  address: string;
  suburb: string;
  state: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  rent: number;
  status: "occupied" | "vacant" | "maintenance" | "listed";
  tenant?: string;
  owner: string;
};

const properties: Property[] = [
  { id: 1, address: "24 Casterly Rock Dr", suburb: "Bondi", state: "NSW", type: "House", bedrooms: 4, bathrooms: 2, parking: 2, rent: 950, status: "occupied", tenant: "Sarah Mitchell", owner: "David Chen" },
  { id: 2, address: "15 High St", suburb: "Southbank", state: "QLD", type: "Apartment", bedrooms: 2, bathrooms: 1, parking: 1, rent: 620, status: "occupied", tenant: "James Cooper", owner: "Maria Santos" },
  { id: 3, address: "8 Park Ave", suburb: "Richmond", state: "VIC", type: "Townhouse", bedrooms: 3, bathrooms: 2, parking: 1, rent: 780, status: "vacant", owner: "Robert Taylor" },
  { id: 4, address: "102 River Rd", suburb: "Parramatta", state: "NSW", type: "Apartment", bedrooms: 1, bathrooms: 1, parking: 1, rent: 480, status: "listed", owner: "David Chen" },
  { id: 5, address: "56 Elm Cres", suburb: "Fitzroy", state: "VIC", type: "House", bedrooms: 5, bathrooms: 3, parking: 2, rent: 1200, status: "occupied", tenant: "Emma Wilson", owner: "Maria Santos" },
  { id: 6, address: "9 Ocean Pde", suburb: "Manly", state: "NSW", type: "Unit", bedrooms: 2, bathrooms: 1, parking: 1, rent: 700, status: "maintenance", owner: "Robert Taylor" },
  { id: 7, address: "33 King William St", suburb: "Adelaide", state: "SA", type: "Apartment", bedrooms: 3, bathrooms: 2, parking: 2, rent: 550, status: "occupied", tenant: "Liam O'Brien", owner: "David Chen" },
  { id: 8, address: "12 Sunset Blvd", suburb: "Surfers Paradise", state: "QLD", type: "House", bedrooms: 4, bathrooms: 2, parking: 2, rent: 880, status: "vacant", owner: "Maria Santos" },
];

const statusColor: Record<Property["status"], string> = {
  occupied: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  vacant: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  maintenance: "bg-red-500/15 text-red-400 border-red-500/30",
  listed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

const Properties = () => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  const filtered = properties.filter((p) => {
    const matchSearch =
      p.address.toLowerCase().includes(search.toLowerCase()) ||
      p.suburb.toLowerCase().includes(search.toLowerCase()) ||
      p.owner.toLowerCase().includes(search.toLowerCase());
    if (tab === "all") return matchSearch;
    return matchSearch && p.status === tab;
  });

  const stats = {
    total: properties.length,
    occupied: properties.filter((p) => p.status === "occupied").length,
    vacant: properties.filter((p) => p.status === "vacant").length,
    revenue: properties.filter((p) => p.status === "occupied").reduce((s, p) => s + p.rent, 0),
  };

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
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Properties</h1>
                  <p className="text-sm text-muted-foreground">Manage your property portfolio</p>
                </div>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Add Property
              </Button>
            </div>

            {/* Stats */}
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

            {/* Filters & Table */}
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
                      <Input
                        placeholder="Search properties..."
                        className="pl-9 w-[220px]"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
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
                          <div>
                            <span className="font-medium text-foreground">{p.address}</span>
                            <span className="block text-xs text-muted-foreground">
                              {p.suburb}, {p.state}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{p.type}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {p.bedrooms} / {p.bathrooms} / {p.parking}
                        </TableCell>
                        <TableCell className="font-medium text-foreground">
                          ${p.rent}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusColor[p.status]}>
                            {p.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {p.tenant || "—"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{p.owner}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filtered.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                          No properties found.
                        </TableCell>
                      </TableRow>
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
