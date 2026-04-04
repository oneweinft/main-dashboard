import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download } from "lucide-react";
import { useState } from "react";

const reportTabs = ["All", "Advertised", "Unadvertised"];

const churnData = [
  { address: "65 Phynes Street", propertyId: "20140462", pm: "Jane Doe", categories: "for sale", agency: "Y", price: "N", soldDate: "00/10/0003", expiryDate: "13/12/2026", inactiveDate: "09/08/2024", lastUpdated: "23/12/2026 18:43:37", reason: "Landlord/Owner Moving In" },
  { address: "65 Phynes Street", propertyId: "20140462", pm: "Jane Doe", categories: "for sale", agency: "Y", price: "N", soldDate: "00/10/0003", expiryDate: "13/12/2026", inactiveDate: "09/08/2024", lastUpdated: "23/12/2026 18:43:37", reason: "Landlord/Owner Moving In" },
  { address: "65 Phynes Street", propertyId: "20140462", pm: "Jane Doe", categories: "for sale", agency: "Y", price: "N", soldDate: "00/10/0003", expiryDate: "13/12/2026", inactiveDate: "09/08/2024", lastUpdated: "23/12/2026 18:43:37", reason: "Landlord/Owner Moving In" },
  { address: "65 Phynes Street", propertyId: "20140462", pm: "Jane Doe", categories: "for sale", agency: "Y", price: "N", soldDate: "00/10/0003", expiryDate: "13/12/2026", inactiveDate: "09/08/2024", lastUpdated: "23/12/2026 18:43:37", reason: "Landlord/Owner Moving In" },
  { address: "65 Phynes Street", propertyId: "20140462", pm: "Jane Doe", categories: "for sale", agency: "Y", price: "N", soldDate: "00/10/0003", expiryDate: "13/12/2026", inactiveDate: "09/08/2024", lastUpdated: "23/12/2026 18:43:37", reason: "Landlord/Owner Moving In" },
  { address: "65 Phynes Street", propertyId: "20140462", pm: "Jane Doe", categories: "for sale", agency: "Y", price: "N", soldDate: "00/10/0003", expiryDate: "13/12/2026", inactiveDate: "09/08/2024", lastUpdated: "23/12/2026 18:43:37", reason: "Landlord/Owner Moving In" },
  { address: "65 Phynes Street", propertyId: "20140462", pm: "Jane Doe", categories: "for sale", agency: "Y", price: "N", soldDate: "00/10/0003", expiryDate: "13/12/2026", inactiveDate: "09/08/2024", lastUpdated: "23/12/2026 18:43:37", reason: "Landlord/Owner Moving In" },
  { address: "65 Phynes Street", propertyId: "20140462", pm: "Jane Doe", categories: "for sale", agency: "Y", price: "N", soldDate: "00/10/0003", expiryDate: "13/12/2026", inactiveDate: "09/08/2024", lastUpdated: "23/12/2026 18:43:37", reason: "Landlord/Owner Moving In" },
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchBy, setSearchBy] = useState("Keyword");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
            <div className="bg-card rounded-xl border border-border p-6 space-y-6">
              {/* Title & Report Type */}
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">Churn Analysis</h1>
                <span className="text-sm text-muted-foreground">Pool Safety</span>
              </div>

              {/* Tabs */}
              <div className="flex gap-2">
                {reportTabs.map((tab) => (
                  <Button
                    key={tab}
                    size="sm"
                    variant={activeTab === tab ? "default" : "outline"}
                    onClick={() => setActiveTab(tab)}
                    className={activeTab === tab ? "" : "text-muted-foreground"}
                  >
                    {tab}
                  </Button>
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                This report shows you properties from your portfolio that have been found.
              </p>

              {/* Search Filters */}
              <div className="flex flex-wrap items-end gap-3 rounded-lg border border-border p-4">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Search by:</label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={searchBy === "Keyword" ? "default" : "outline"}
                      onClick={() => setSearchBy("Keyword")}
                      className="text-xs h-8"
                    >
                      Keyword
                    </Button>
                    <Button
                      size="sm"
                      variant={searchBy === "Commencement" ? "default" : "outline"}
                      onClick={() => setSearchBy("Commencement")}
                      className="text-xs h-8"
                    >
                      Commencement
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  <Input type="date" defaultValue="2025-06-05" className="h-8 text-xs w-36" />
                </div>
                <span className="text-xs text-muted-foreground pb-1">to</span>
                <div className="space-y-1">
                  <Input type="date" defaultValue="2025-01-03" className="h-8 text-xs w-36" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Property Manager</label>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-8 text-xs w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="jane">Jane Doe</SelectItem>
                      <SelectItem value="john">John Smith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button size="sm" className="h-8 text-xs gap-1">
                  <Search className="h-3 w-3" />
                  Search
                </Button>
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  Clear
                </Button>
              </div>

              {/* Export */}
              <Button size="sm" variant="outline" className="gap-1 text-xs border-primary text-primary hover:bg-primary/10">
                <Download className="h-3 w-3" />
                Export
              </Button>

              {/* Table */}
              <div className="overflow-x-auto rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary">
                      <TableHead className="text-primary-foreground text-xs font-medium">Address</TableHead>
                      <TableHead className="text-primary-foreground text-xs font-medium">Property ID</TableHead>
                      <TableHead className="text-primary-foreground text-xs font-medium">Property Manager/Office</TableHead>
                      <TableHead className="text-primary-foreground text-xs font-medium">Categories</TableHead>
                      <TableHead className="text-primary-foreground text-xs font-medium">Agency</TableHead>
                      <TableHead className="text-primary-foreground text-xs font-medium">Price</TableHead>
                      <TableHead className="text-primary-foreground text-xs font-medium">Sold/Advertised Date</TableHead>
                      <TableHead className="text-primary-foreground text-xs font-medium">Expiry Date</TableHead>
                      <TableHead className="text-primary-foreground text-xs font-medium">Inactive Date</TableHead>
                      <TableHead className="text-primary-foreground text-xs font-medium">Last Updated</TableHead>
                      <TableHead className="text-primary-foreground text-xs font-medium">Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {churnData.map((row, i) => (
                      <TableRow key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                        <TableCell className="text-xs text-primary underline cursor-pointer font-medium">{row.address}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{row.propertyId}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{row.pm}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{row.categories}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{row.agency}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{row.price}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{row.soldDate}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{row.expiryDate}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{row.inactiveDate}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{row.lastUpdated}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{row.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Reports;
