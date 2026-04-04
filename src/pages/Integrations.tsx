import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Link2, Search, ExternalLink, Plug, Globe, Server, Webhook,
  Droplets, Zap, Shield, Building2, Landmark, Phone, FileText,
  Truck, Home, BarChart3, DollarSign, Users, Scale, Flame,
} from "lucide-react";

type Integration = {
  name: string;
  description: string;
  category: string;
  methods: ("api" | "ftp" | "webhook")[];
  status: "connected" | "available" | "coming_soon";
  url: string;
  icon: React.ElementType;
};

const integrations: Integration[] = [
  // Government & Regulatory
  { name: "Consumer Affairs Victoria", description: "Residential tenancy bonds, compliance notices, and regulatory updates", category: "government", methods: ["api", "webhook"], status: "available", url: "https://www.consumer.vic.gov.au", icon: Shield },
  { name: "VCAT", description: "Victorian Civil & Administrative Tribunal — hearing schedules, applications, orders", category: "government", methods: ["api"], status: "available", url: "https://www.vcat.vic.gov.au", icon: Scale },
  { name: "Land Use Victoria", description: "Title searches, property data, and land registry services", category: "government", methods: ["api", "ftp"], status: "available", url: "https://www.land.vic.gov.au", icon: Landmark },
  { name: "Victorian Building Authority", description: "Building permits, compliance certificates, and inspector registers", category: "government", methods: ["api", "webhook"], status: "coming_soon", url: "https://www.vba.vic.gov.au", icon: Building2 },
  { name: "Energy Safe Victoria", description: "Gas and electrical safety compliance, certificates, and incident reporting", category: "government", methods: ["api"], status: "available", url: "https://www.esv.vic.gov.au", icon: Zap },
  { name: "EPA Victoria", description: "Environmental compliance, contamination reports, and noise regulations", category: "government", methods: ["api", "webhook"], status: "coming_soon", url: "https://www.epa.vic.gov.au", icon: Shield },

  // Utilities
  { name: "Melbourne Water", description: "Water usage data, billing integration, and service interruption alerts", category: "utilities", methods: ["api", "webhook"], status: "available", url: "https://www.melbournewater.com.au", icon: Droplets },
  { name: "South East Water", description: "Water and sewerage billing, meter reads, and account management", category: "utilities", methods: ["api", "webhook"], status: "available", url: "https://www.southeastwater.com.au", icon: Droplets },
  { name: "Yarra Valley Water", description: "Water supply, billing data, and concession processing", category: "utilities", methods: ["api"], status: "available", url: "https://www.yvw.com.au", icon: Droplets },
  { name: "AusNet Services", description: "Electricity distribution, outage notifications, and meter data", category: "utilities", methods: ["api", "webhook"], status: "available", url: "https://www.ausnetservices.com.au", icon: Zap },
  { name: "CitiPower & Powercor", description: "Electricity distribution network, supply data, and outage alerts", category: "utilities", methods: ["api", "webhook"], status: "available", url: "https://www.citipower.com.au", icon: Zap },
  { name: "Jemena", description: "Gas and electricity distribution, meter data, and network services", category: "utilities", methods: ["api"], status: "coming_soon", url: "https://www.jemena.com.au", icon: Flame },
  { name: "Origin Energy", description: "Energy retail billing, account management, and usage data", category: "utilities", methods: ["api", "ftp"], status: "available", url: "https://www.originenergy.com.au", icon: Zap },
  { name: "AGL", description: "Energy and gas retail, billing integration, and concessions", category: "utilities", methods: ["api", "ftp"], status: "available", url: "https://www.agl.com.au", icon: Zap },
  { name: "EnergyAustralia", description: "Electricity and gas billing, usage analytics, and account data", category: "utilities", methods: ["api"], status: "coming_soon", url: "https://www.energyaustralia.com.au", icon: Zap },

  // Property & Advertising
  { name: "realestate.com.au", description: "Property listing syndication, enquiry management, and analytics", category: "property", methods: ["api", "ftp", "webhook"], status: "connected", url: "https://www.realestate.com.au", icon: Home },
  { name: "Domain", description: "Property advertising, listing management, and lead capture", category: "property", methods: ["api", "webhook"], status: "connected", url: "https://www.domain.com.au", icon: Home },
  { name: "ReNet", description: "Property management CRM integration and data sync", category: "property", methods: ["api", "ftp"], status: "available", url: "https://www.renet.com.au", icon: Home },
  { name: "rent.com.au", description: "Rental listing syndication and tenant application processing", category: "property", methods: ["api", "webhook"], status: "available", url: "https://www.rent.com.au", icon: Home },
  { name: "Homely", description: "Property listings, suburb profiles, and review management", category: "property", methods: ["api"], status: "available", url: "https://www.homely.com.au", icon: Home },
  { name: "RateMyAgent", description: "Agent reviews, performance analytics, and marketing integration", category: "property", methods: ["api", "webhook"], status: "available", url: "https://www.ratemyagent.com.au", icon: BarChart3 },

  // Financial
  { name: "MYOB", description: "Accounting sync — trust accounts, invoicing, BAS, and reconciliation", category: "financial", methods: ["api", "webhook"], status: "connected", url: "https://www.myob.com/au", icon: DollarSign },
  { name: "Xero", description: "Cloud accounting integration — invoices, payments, and bank feeds", category: "financial", methods: ["api", "webhook"], status: "available", url: "https://www.xero.com/au", icon: DollarSign },
  { name: "Australia Post", description: "Rent payment processing via Post Billpay", category: "financial", methods: ["api", "ftp"], status: "available", url: "https://www.auspost.com.au", icon: Truck },
  { name: "Centrepay", description: "Centrelink rent deduction service for eligible tenants", category: "financial", methods: ["api", "ftp"], status: "available", url: "https://www.servicesaustralia.gov.au/centrepay", icon: DollarSign },

  // Moving & Connections
  { name: "MyConnect", description: "Utility connection service for new tenants — electricity, gas, internet", category: "connections", methods: ["api", "webhook"], status: "available", url: "https://www.myconnect.com.au", icon: Plug },
  { name: "Direct Connect", description: "Tenant utility connections — energy, internet, and pay TV setup", category: "connections", methods: ["api", "webhook"], status: "available", url: "https://www.directconnect.com.au", icon: Plug },
  { name: "Movinghub", description: "Moving services, utility connections, and change of address", category: "connections", methods: ["api"], status: "coming_soon", url: "https://www.movinghub.com.au", icon: Truck },
  { name: "ConnectNow", description: "Utility and service connections for tenants and property managers", category: "connections", methods: ["api", "webhook"], status: "available", url: "https://www.connectnow.com.au", icon: Plug },
  { name: "Compare & Connect", description: "Utility comparison and connection services", category: "connections", methods: ["api"], status: "coming_soon", url: "https://www.compareandconnect.com.au", icon: Plug },

  // Telecommunications
  { name: "NBN Co", description: "Broadband connection status, availability checks, and fault reporting", category: "utilities", methods: ["api", "webhook"], status: "available", url: "https://www.nbnco.com.au", icon: Globe },
  { name: "Telstra", description: "Telecommunications services, billing, and service status", category: "utilities", methods: ["api"], status: "coming_soon", url: "https://www.telstra.com.au", icon: Phone },
];

const categories = [
  { value: "all", label: "All" },
  { value: "government", label: "Government & Regulatory" },
  { value: "utilities", label: "Utilities & Telco" },
  { value: "property", label: "Property & Advertising" },
  { value: "financial", label: "Financial" },
  { value: "connections", label: "Moving & Connections" },
];

const methodConfig = {
  api: { label: "API", icon: Globe, color: "bg-primary/15 text-primary border-primary/20" },
  ftp: { label: "FTP", icon: Server, color: "bg-info/15 text-info border-info/20" },
  webhook: { label: "Webhook", icon: Webhook, color: "bg-warning/15 text-warning border-warning/20" },
};

const statusConfig = {
  connected: { label: "Connected", color: "bg-primary/15 text-primary border-primary/20" },
  available: { label: "Available", color: "bg-muted text-muted-foreground border-border" },
  coming_soon: { label: "Coming Soon", color: "bg-secondary text-secondary-foreground border-border" },
};

const Integrations = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = integrations.filter((i) => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || i.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const connected = integrations.filter((i) => i.status === "connected").length;
  const available = integrations.filter((i) => i.status === "available").length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                    <Link2 className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
                    <p className="text-sm text-muted-foreground">
                      {connected} connected · {available} available · API, FTP & Webhook
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "API Integrations", count: integrations.filter((i) => i.methods.includes("api")).length, icon: Globe, desc: "REST & GraphQL" },
                  { label: "FTP Integrations", count: integrations.filter((i) => i.methods.includes("ftp")).length, icon: Server, desc: "Secure file transfer" },
                  { label: "Webhook Integrations", count: integrations.filter((i) => i.methods.includes("webhook")).length, icon: Webhook, desc: "Real-time events" },
                ].map((stat) => (
                  <Card key={stat.label} className="border-border">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stat.count}</p>
                        <p className="text-xs text-muted-foreground">{stat.label} · {stat.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Search & Filter */}
              <div className="flex items-center gap-3 bg-card rounded-xl border border-border p-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search integrations..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                </div>
              </div>

              {/* Category Tabs */}
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-4">
                <TabsList className="bg-muted/50 p-1 flex-wrap h-auto">
                  {categories.map((cat) => (
                    <TabsTrigger key={cat.value} value={cat.value} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {categories.map((cat) => (
                  <TabsContent key={cat.value} value={cat.value}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filtered.map((integration) => {
                        const status = statusConfig[integration.status];
                        return (
                          <Card key={integration.name} className="border-border hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <integration.icon className="h-5 w-5 text-primary" />
                                  </div>
                                  <div>
                                    <CardTitle className="text-base">{integration.name}</CardTitle>
                                  </div>
                                </div>
                                <Badge variant="outline" className={status.color}>
                                  {status.label}
                                </Badge>
                              </div>
                              <CardDescription className="mt-2">{integration.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex items-center justify-between">
                                <div className="flex gap-1.5">
                                  {integration.methods.map((method) => {
                                    const m = methodConfig[method];
                                    return (
                                      <Badge key={method} variant="outline" className={`text-xs ${m.color}`}>
                                        <m.icon className="h-3 w-3 mr-1" />
                                        {m.label}
                                      </Badge>
                                    );
                                  })}
                                </div>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" asChild>
                                    <a href={integration.url} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4" />
                                    </a>
                                  </Button>
                                  {integration.status !== "coming_soon" && (
                                    <Button
                                      size="sm"
                                      variant={integration.status === "connected" ? "outline" : "default"}
                                      className={integration.status === "connected" ? "border-primary text-primary hover:bg-primary/10" : "bg-primary text-primary-foreground hover:bg-primary/90"}
                                    >
                                      {integration.status === "connected" ? "Configure" : "Connect"}
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                    {filtered.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">No integrations found</div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Integrations;
