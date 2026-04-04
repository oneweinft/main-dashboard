import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { UserCircle, Briefcase, HardHat, Clock, CheckCircle2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";

const ServicesPortal = () => {
  const navigate = useNavigate();
  const { properties, contacts, transactions, addProperty, addContact, addTransaction } = useData();
  const { toast } = useToast();
  const [tab, setTab] = useState("overview");

  // Add property form
  const [propOpen, setPropOpen] = useState(false);
  const [propForm, setPropForm] = useState({ address: "", suburb: "", state: "NSW", type: "House", bedrooms: "3", bathrooms: "1", parking: "1", rent: "500", owner: "" });

  // Add contact form
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", contactType: "renter" as "renter" | "provider" | "tradie", property: "" });

  // Add transaction form
  const [txOpen, setTxOpen] = useState(false);
  const [txForm, setTxForm] = useState({ date: new Date().toISOString().slice(0, 10), description: "", property: "", category: "Rent", type: "income" as "income" | "expense", amount: "" });

  const handleAddProperty = () => {
    if (!propForm.address || !propForm.owner) { toast({ title: "Required", description: "Address and owner are required.", variant: "destructive" }); return; }
    addProperty({ address: propForm.address, suburb: propForm.suburb, state: propForm.state, type: propForm.type, bedrooms: parseInt(propForm.bedrooms), bathrooms: parseInt(propForm.bathrooms), parking: parseInt(propForm.parking), rent: parseFloat(propForm.rent), status: "vacant", owner: propForm.owner });
    toast({ title: "Property Added", description: `${propForm.address} added to portfolio.` });
    setPropForm({ address: "", suburb: "", state: "NSW", type: "House", bedrooms: "3", bathrooms: "1", parking: "1", rent: "500", owner: "" });
    setPropOpen(false);
  };

  const handleAddContact = () => {
    if (!contactForm.name || !contactForm.email) { toast({ title: "Required", description: "Name and email are required.", variant: "destructive" }); return; }
    addContact({ name: contactForm.name, email: contactForm.email, phone: contactForm.phone, contactType: contactForm.contactType, property: contactForm.property || undefined, status: "active" });
    toast({ title: "Contact Added", description: `${contactForm.name} added as ${contactForm.contactType}.` });
    setContactForm({ name: "", email: "", phone: "", contactType: "renter", property: "" });
    setContactOpen(false);
  };

  const handleAddTx = () => {
    if (!txForm.description || !txForm.amount) { toast({ title: "Required", description: "Description and amount are required.", variant: "destructive" }); return; }
    addTransaction({ date: txForm.date, description: txForm.description, property: txForm.property || "General", category: txForm.category, type: txForm.type, amount: parseFloat(txForm.amount), status: "completed" });
    toast({ title: "Transaction Added", description: `${txForm.description} — $${txForm.amount}` });
    setTxForm({ date: new Date().toISOString().slice(0, 10), description: "", property: "", category: "Rent", type: "income", amount: "" });
    setTxOpen(false);
  };

  const portals = [
    {
      title: "Renter Portal",
      icon: UserCircle,
      description: "Manage tenant communications, maintenance requests, and lease information.",
      stats: { active: contacts.filter((c) => c.contactType === "renter" && c.status === "active").length, pending: 8, resolved: 234 },
    },
    {
      title: "Rental Provider Portal",
      icon: Briefcase,
      description: "Landlord access for property performance, statements, and approvals.",
      stats: { active: contacts.filter((c) => c.contactType === "provider" && c.status === "active").length, pending: 3, resolved: 189 },
    },
    {
      title: "Tradie Portal",
      icon: HardHat,
      description: "Contractor job management, work orders, and invoice submissions.",
      stats: { active: contacts.filter((c) => c.contactType === "tradie" && c.status === "active").length, pending: 12, resolved: 156 },
    },
  ];

  const recentActivity = [
    { type: "Renter", action: "Maintenance request submitted", time: "2 min ago", status: "pending" },
    { type: "Landlord", action: "Invoice approved", time: "15 min ago", status: "completed" },
    { type: "Tradie", action: "Work order accepted", time: "1 hr ago", status: "active" },
    { type: "Renter", action: "Lease renewal signed", time: "3 hrs ago", status: "completed" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">Services Portal</h1>
                <p className="text-muted-foreground mt-1">Unified access for renters, landlords, and contractors</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigate("/migration")} className="gap-2">
                  Bulk Import
                </Button>
              </div>
            </div>

            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="overview">Portals Overview</TabsTrigger>
                <TabsTrigger value="add-data">Manual Data Entry</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-4">
                <div className="grid md:grid-cols-3 gap-6">
                  {portals.map((portal) => (
                    <Card key={portal.title} className="hover:border-primary/30 transition-all hover:shadow-lg cursor-pointer group">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
                            <portal.icon className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{portal.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{portal.description}</p>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2 rounded-lg bg-secondary">
                            <p className="text-lg font-bold text-foreground">{portal.stats.active}</p>
                            <p className="text-xs text-muted-foreground">Active</p>
                          </div>
                          <div className="p-2 rounded-lg bg-secondary">
                            <p className="text-lg font-bold text-foreground">{portal.stats.pending}</p>
                            <p className="text-xs text-muted-foreground">Pending</p>
                          </div>
                          <div className="p-2 rounded-lg bg-secondary">
                            <p className="text-lg font-bold text-primary">{portal.stats.resolved}</p>
                            <p className="text-xs text-muted-foreground">Resolved</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          onClick={() => {
                            if (portal.title === "Renter Portal") navigate("/renter-portal");
                            if (portal.title === "Rental Provider Portal") navigate("/rental-provider-portal");
                            if (portal.title === "Tradie Portal") navigate("/tradie-portal");
                          }}
                        >
                          Open Portal
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader><CardTitle className="text-lg">Recent Activity</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-muted transition-colors">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xs">{item.type}</Badge>
                            <span className="text-sm text-foreground">{item.action}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {item.time}
                            </span>
                            <Badge className={
                              item.status === "completed" ? "bg-primary/15 text-primary border-primary/20" :
                              item.status === "pending" ? "bg-amber-500/15 text-amber-400 border-amber-500/20" :
                              "bg-blue-500/15 text-blue-400 border-blue-500/20"
                            }>
                              {item.status === "completed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="add-data" className="space-y-6 mt-4">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Add Property */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Plus className="h-4 w-4 text-primary" /> Add Property
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">Manually add a property to the portfolio.</p>
                      <p className="text-xs text-muted-foreground">Current: <span className="font-medium text-foreground">{properties.length} properties</span></p>
                      <Dialog open={propOpen} onOpenChange={setPropOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full gap-2"><Plus className="h-4 w-4" /> New Property</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader><DialogTitle>Add Property</DialogTitle></DialogHeader>
                          <div className="grid gap-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div><Label>Address</Label><Input value={propForm.address} onChange={(e) => setPropForm({ ...propForm, address: e.target.value })} placeholder="123 Main St" /></div>
                              <div><Label>Suburb</Label><Input value={propForm.suburb} onChange={(e) => setPropForm({ ...propForm, suburb: e.target.value })} placeholder="Bondi" /></div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              <div><Label>State</Label>
                                <Select value={propForm.state} onValueChange={(v) => setPropForm({ ...propForm, state: v })}>
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent>{["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                                </Select>
                              </div>
                              <div><Label>Type</Label>
                                <Select value={propForm.type} onValueChange={(v) => setPropForm({ ...propForm, type: v })}>
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent>{["House", "Apartment", "Townhouse", "Unit"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                </Select>
                              </div>
                              <div><Label>Rent (pw)</Label><Input type="number" value={propForm.rent} onChange={(e) => setPropForm({ ...propForm, rent: e.target.value })} /></div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              <div><Label>Beds</Label><Input type="number" value={propForm.bedrooms} onChange={(e) => setPropForm({ ...propForm, bedrooms: e.target.value })} /></div>
                              <div><Label>Baths</Label><Input type="number" value={propForm.bathrooms} onChange={(e) => setPropForm({ ...propForm, bathrooms: e.target.value })} /></div>
                              <div><Label>Parking</Label><Input type="number" value={propForm.parking} onChange={(e) => setPropForm({ ...propForm, parking: e.target.value })} /></div>
                            </div>
                            <div><Label>Owner</Label><Input value={propForm.owner} onChange={(e) => setPropForm({ ...propForm, owner: e.target.value })} placeholder="Owner name" /></div>
                            <Button onClick={handleAddProperty} className="w-full">Add Property</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>

                  {/* Add Contact */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Plus className="h-4 w-4 text-primary" /> Add Contact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">Add a renter, owner, or tradie manually.</p>
                      <p className="text-xs text-muted-foreground">Current: <span className="font-medium text-foreground">{contacts.length} contacts</span></p>
                      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full gap-2"><Plus className="h-4 w-4" /> New Contact</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Add Contact</DialogTitle></DialogHeader>
                          <div className="grid gap-3">
                            <div><Label>Name</Label><Input value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} placeholder="Full name" /></div>
                            <div className="grid grid-cols-2 gap-3">
                              <div><Label>Email</Label><Input type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} placeholder="email@example.com" /></div>
                              <div><Label>Phone</Label><Input value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} placeholder="0412 345 678" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div><Label>Type</Label>
                                <Select value={contactForm.contactType} onValueChange={(v) => setContactForm({ ...contactForm, contactType: v as any })}>
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent><SelectItem value="renter">Renter</SelectItem><SelectItem value="provider">Rental Provider</SelectItem><SelectItem value="tradie">Tradie</SelectItem></SelectContent>
                                </Select>
                              </div>
                              <div><Label>Property</Label>
                                <Select value={contactForm.property} onValueChange={(v) => setContactForm({ ...contactForm, property: v })}>
                                  <SelectTrigger><SelectValue placeholder="Optional" /></SelectTrigger>
                                  <SelectContent>{properties.map((p) => <SelectItem key={p.id} value={p.address}>{p.address}</SelectItem>)}</SelectContent>
                                </Select>
                              </div>
                            </div>
                            <Button onClick={handleAddContact} className="w-full">Add Contact</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>

                  {/* Add Transaction */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Plus className="h-4 w-4 text-primary" /> Add Transaction
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">Record income or expense transactions.</p>
                      <p className="text-xs text-muted-foreground">Current: <span className="font-medium text-foreground">{transactions.length} transactions</span></p>
                      <Dialog open={txOpen} onOpenChange={setTxOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full gap-2"><Plus className="h-4 w-4" /> New Transaction</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Add Transaction</DialogTitle></DialogHeader>
                          <div className="grid gap-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div><Label>Date</Label><Input type="date" value={txForm.date} onChange={(e) => setTxForm({ ...txForm, date: e.target.value })} /></div>
                              <div><Label>Type</Label>
                                <Select value={txForm.type} onValueChange={(v) => setTxForm({ ...txForm, type: v as any })}>
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent><SelectItem value="income">Income</SelectItem><SelectItem value="expense">Expense</SelectItem></SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div><Label>Description</Label><Input value={txForm.description} onChange={(e) => setTxForm({ ...txForm, description: e.target.value })} placeholder="Rent Payment" /></div>
                            <div className="grid grid-cols-2 gap-3">
                              <div><Label>Property</Label>
                                <Select value={txForm.property} onValueChange={(v) => setTxForm({ ...txForm, property: v })}>
                                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                  <SelectContent>{properties.map((p) => <SelectItem key={p.id} value={p.address}>{p.address}</SelectItem>)}</SelectContent>
                                </Select>
                              </div>
                              <div><Label>Amount ($)</Label><Input type="number" value={txForm.amount} onChange={(e) => setTxForm({ ...txForm, amount: e.target.value })} /></div>
                            </div>
                            <Button onClick={handleAddTx} className="w-full">Add Transaction</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-dashed">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Need to import large datasets?</p>
                    <Button variant="outline" onClick={() => navigate("/migration")}>Go to Migration Hub →</Button>
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

export default ServicesPortal;
