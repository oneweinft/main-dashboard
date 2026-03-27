import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Users, Search, Plus, Mail, Phone, Building2, Archive, UserCheck,
  Wrench, Briefcase, UserPlus, Filter, Bot, MessageSquare,
} from "lucide-react";
import { useData } from "@/context/DataContext";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  property?: string;
  status: "active" | "archived";
  type: string;
};

const renters: Contact[] = [
  { id: 1, name: "Sarah Mitchell", email: "sarah.m@email.com", phone: "0412 345 678", property: "24 Casterly Rock, NSW", status: "active", type: "renter" },
  { id: 2, name: "James Cooper", email: "j.cooper@email.com", phone: "0423 456 789", property: "15 High St, QLD", status: "active", type: "renter" },
  { id: 3, name: "Emma Wilson", email: "emma.w@email.com", phone: "0434 567 890", property: "8 Park Ave, VIC", status: "archived", type: "renter" },
  { id: 4, name: "Liam O'Brien", email: "liam.ob@email.com", phone: "0445 678 901", property: "102 River Rd, NSW", status: "archived", type: "renter" },
];

const rentalProviders: Contact[] = [
  { id: 5, name: "David Chen", email: "d.chen@email.com", phone: "0456 789 012", property: "24 Casterly Rock, NSW", status: "active", type: "provider" },
  { id: 6, name: "Maria Santos", email: "m.santos@email.com", phone: "0467 890 123", property: "15 High St, QLD", status: "active", type: "provider" },
  { id: 7, name: "Robert Taylor", email: "r.taylor@email.com", phone: "0478 901 234", property: "8 Park Ave, VIC", status: "archived", type: "provider" },
];

const properties: Contact[] = [
  { id: 8, name: "24 Casterly Rock, NSW", email: "—", phone: "—", property: "Residential", status: "active", type: "property" },
  { id: 9, name: "15 High St, QLD", email: "—", phone: "—", property: "Residential", status: "active", type: "property" },
  { id: 10, name: "8 Park Ave, VIC", email: "—", phone: "—", property: "Commercial", status: "archived", type: "property" },
];

const trades: Contact[] = [
  { id: 11, name: "Mike's Plumbing", email: "mike@plumbing.com", phone: "0489 012 345", status: "active", type: "trade" },
  { id: 12, name: "Spark Electric", email: "info@sparkelectric.com", phone: "0490 123 456", status: "active", type: "trade" },
  { id: 13, name: "Cool Air HVAC", email: "service@coolair.com", phone: "0401 234 567", status: "archived", type: "trade" },
];

const serviceProviders: Contact[] = [
  { id: 14, name: "CleanPro Services", email: "hello@cleanpro.com", phone: "0412 111 222", status: "active", type: "service" },
  { id: 15, name: "GreenScape Gardens", email: "info@greenscape.com", phone: "0423 222 333", status: "active", type: "service" },
];

const otherContacts: Contact[] = [
  { id: 16, name: "Council Office", email: "council@local.gov", phone: "02 9876 5432", status: "active", type: "other" },
  { id: 17, name: "Insurance Broker", email: "broker@insure.com", phone: "1300 123 456", status: "active", type: "other" },
];

const tabConfig = [
  { value: "renters", label: "Renters", icon: Users, data: renters },
  { value: "providers", label: "Rental Providers", icon: UserCheck, data: rentalProviders },
  { value: "properties", label: "Properties", icon: Building2, data: properties },
  { value: "trades", label: "Trades", icon: Wrench, data: trades },
  { value: "services", label: "Service Providers", icon: Briefcase, data: serviceProviders },
  { value: "other", label: "Other", icon: UserPlus, data: otherContacts },
];

function ContactTable({ contacts, filter }: { contacts: Contact[]; filter: string }) {
  const filtered = contacts.filter((c) => {
    if (filter === "all") return true;
    return c.status === filter;
  });

  const isPropertyTab = contacts[0]?.type === "property";

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>{isPropertyTab ? "Address" : "Name"}</TableHead>
            <TableHead>{isPropertyTab ? "Type" : "Email"}</TableHead>
            <TableHead>{isPropertyTab ? "—" : "Phone"}</TableHead>
            {!isPropertyTab && <TableHead>Property</TableHead>}
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={isPropertyTab ? 5 : 6} className="text-center text-muted-foreground py-8">
                No contacts found
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((contact) => (
              <TableRow key={contact.id} className="hover:bg-muted/30">
                <TableCell className="font-medium text-foreground">{contact.name}</TableCell>
                <TableCell className="text-muted-foreground">{isPropertyTab ? contact.property : contact.email}</TableCell>
                {!isPropertyTab && <TableCell className="text-muted-foreground">{contact.phone}</TableCell>}
                {!isPropertyTab && (
                  <TableCell className="text-muted-foreground">{contact.property || "—"}</TableCell>
                )}
                <TableCell>
                  <Badge
                    variant={contact.status === "active" ? "default" : "secondary"}
                    className={
                      contact.status === "active"
                        ? "bg-primary/15 text-primary border-primary/20"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {contact.status === "active" ? "Active" : "Archived"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {!isPropertyTab && (
                      <>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <Archive className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

const Contacts = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { aiLogs } = useData();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Contacts</h1>
                    <p className="text-sm text-muted-foreground">Manage all your contacts in one place</p>
                  </div>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" /> Add Contact
                </Button>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3 bg-card rounded-xl border border-border p-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search contacts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="renters" className="space-y-4">
                <TabsList className="bg-muted/50 p-1 flex-wrap">
                  {tabConfig.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </TabsTrigger>
                  ))}
                  <TabsTrigger value="comms-log" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Bot className="h-4 w-4" />
                    AI Comms Log
                    {aiLogs.length > 0 && (
                      <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs bg-primary/15 text-primary">{aiLogs.length}</Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                {tabConfig.map((tab) => (
                  <TabsContent key={tab.value} value={tab.value}>
                    <div className="bg-card rounded-xl border border-border p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-foreground">{tab.label}</h2>
                        <span className="text-sm text-muted-foreground">
                          {tab.data.filter((c) => statusFilter === "all" || c.status === statusFilter).length} contacts
                        </span>
                      </div>
                      <ContactTable contacts={tab.data} filter={statusFilter} />
                    </div>
                  </TabsContent>
                ))}

                <TabsContent value="comms-log">
                  <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-foreground">AI Communication Logs</h2>
                      <span className="text-sm text-muted-foreground">{aiLogs.length} interactions</span>
                    </div>
                    {aiLogs.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <MessageSquare className="h-10 w-10 text-muted-foreground/40 mb-3" />
                        <p className="text-muted-foreground text-sm">No AI interactions logged yet.</p>
                        <p className="text-muted-foreground/60 text-xs mt-1">Conversations from the AI Assistant will appear here.</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[500px] overflow-auto">
                        {aiLogs.map((log) => (
                          <div key={log.id} className="rounded-lg border border-border p-4 space-y-2 hover:bg-muted/30 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Bot className="h-4 w-4 text-primary" />
                                <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                                  {log.source === "assistant" ? "AI Assistant" : "Header Widget"}
                                </Badge>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {new Date(log.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <div className="pl-6 space-y-1.5">
                              <p className="text-sm text-foreground"><span className="font-medium text-primary/80">Q:</span> {log.query}</p>
                              <p className="text-sm text-muted-foreground"><span className="font-medium">A:</span> {log.response}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Contacts;
