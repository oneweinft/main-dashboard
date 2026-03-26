import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Home, MapPin, Bed, Bath, Car, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const inspections = [
  { address: "24 Casterly Rock, NSW", keyNo: "344", beds: 3, baths: 2, cars: 1 },
  { address: "24 Casterly Rock, NSW", keyNo: "344", beds: 3, baths: 2, cars: 1 },
  { address: "24 Casterly Rock, NSW", keyNo: "344", beds: 3, baths: 2, cars: 1 },
  { address: "24 Casterly Rock, NSW", keyNo: "344", beds: 3, baths: 2, cars: 1 },
];

const Inspections = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6">
            <div className="bg-card rounded-xl border border-border p-6 space-y-6">
              {/* Address Bar */}
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Home className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  79/677 Blinhorn St, CALAMVALE 4116
                </span>
              </div>

              {/* Action Buttons & Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Calculate Route
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Select Month
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Send Entry Notice
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Property</span>
                  <div className="relative">
                    <Input placeholder="Select Properties..." className="w-[180px] pr-8" />
                    <MapPin className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Select defaultValue="next-week">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="next-week">Next Week</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="try">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="try">Try Properties</SelectItem>
                    <SelectItem value="all">All Properties</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Properties List */}
                <div className="space-y-4">
                  {inspections.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-4 bg-secondary/30 rounded-lg border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="w-24 h-20 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Home className="h-8 w-8 text-muted-foreground/40" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-foreground">{item.address}</h3>
                          <Badge className="bg-primary/10 text-primary border-primary/20 cursor-pointer hover:bg-primary/20">
                            Proceed
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Bed className="h-3.5 w-3.5" /> {item.beds}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="h-3.5 w-3.5" /> {item.baths}
                          </span>
                          <span className="flex items-center gap-1">
                            <Car className="h-3.5 w-3.5" /> {item.cars}
                          </span>
                          <span className="flex items-center gap-1">
                            <Key className="h-3.5 w-3.5" /> Key no. {item.keyNo}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Placeholder */}
                <div className="rounded-lg border border-border overflow-hidden bg-muted min-h-[400px] flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="h-12 w-12 text-muted-foreground/40 mx-auto" />
                    <p className="text-sm text-muted-foreground">Map view</p>
                    <p className="text-xs text-muted-foreground/60">Integrate with Google Maps or Mapbox</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Inspections;
