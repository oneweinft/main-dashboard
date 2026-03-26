import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import {
  UserPlus, Building2, Wrench, Home, CheckCircle2, Clock, FileText,
  ChevronDown, Info, ClipboardList, Users, Briefcase, Mail, Phone, MessageSquare
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const timelineSteps = [
  { label: "Pre-Onboarding", date: "Application", status: "completed" as const },
  { label: "Onboarding", date: "Documents & Setup", status: "completed" as const },
  { label: "Post-Onboarding", date: "Move-in & Review", status: "current" as const },
];

const onboardingForms = [
  { name: "Tenant Application Form", type: "Renter", status: "Completed", date: "15 Mar 2026" },
  { name: "Lease Agreement", type: "Renter", status: "Pending Signature", date: "20 Mar 2026" },
  { name: "Bond Lodgement Form", type: "Renter", status: "Completed", date: "18 Mar 2026" },
  { name: "Property Condition Report", type: "Rental Provider", status: "Completed", date: "14 Mar 2026" },
  { name: "Service Agreement", type: "Service Provider", status: "In Progress", date: "22 Mar 2026" },
  { name: "Tradie Compliance Cert", type: "Service Provider", status: "Pending", date: "—" },
];

const guides = [
  { title: "Renter Welcome Guide", description: "Move-in checklist, key collection, utility setup" },
  { title: "Rental Provider Handbook", description: "Obligations, insurance, compliance requirements" },
  { title: "Service Provider Setup", description: "Portal access, job acceptance workflow, invoicing" },
  { title: "Emergency Contacts & Procedures", description: "After-hours maintenance, fire safety, evacuation" },
  { title: "Consumer Affairs Guide 1", description: "Renting a home – your rights and responsibilities" },
  { title: "Consumer Affairs Guide 2", description: "Bonds – lodgement, claims and disputes" },
  { title: "Consumer Affairs Guide 3", description: "Repairs and maintenance – urgent and non-urgent" },
  { title: "Consumer Affairs Guide 4", description: "Rent increases – notice periods and disputes" },
  { title: "Consumer Affairs Guide 5", description: "Ending a tenancy – notice, vacating and bond return" },
];

const rentalProviderDocs = [
  { name: "Management Authority Agreement", status: "Pending Signature", date: "20 Mar 2026" },
  { name: "Owner Instructions Form", status: "Completed", date: "15 Mar 2026" },
  { name: "Residential Lease Agreement", status: "In Progress", date: "22 Mar 2026" },
  { name: "Rental Agreement (Periodic)", status: "Pending", date: "—" },
  { name: "Landlord Insurance Certificate", status: "Completed", date: "14 Mar 2026" },
  { name: "Property Condition Report", status: "Completed", date: "14 Mar 2026" },
  { name: "Smoke Alarm Compliance Certificate", status: "Completed", date: "12 Mar 2026" },
  { name: "Pool Safety Certificate", status: "Pending", date: "—" },
  { name: "Electrical Safety Check", status: "In Progress", date: "21 Mar 2026" },
  { name: "Disbursement Authority", status: "Completed", date: "16 Mar 2026" },
];

const rentalProviderGuides = [
  { title: "Management Authority Guide", description: "Understanding your agreement, fees, and obligations" },
  { title: "Owner Obligations & Compliance", description: "Minimum standards, safety, and legal requirements" },
  { title: "Insurance Requirements", description: "Landlord insurance, public liability, and building cover" },
  { title: "Rental Income & Tax Guide", description: "Deductions, depreciation, and ATO reporting" },
  { title: "Maintenance & Repairs Policy", description: "Approval thresholds, emergency works, and preferred tradies" },
  { title: "Lease & Tenancy Overview", description: "Fixed vs periodic, rent reviews, and lease renewals" },
  { title: "Inspection & Compliance Calendar", description: "Routine inspections, safety checks, and key dates" },
  { title: "Dispute Resolution Process", description: "VCAT/tribunal processes, mediation, and escalation" },
];

const properties = [
  { id: "P001", address: "12 Collins St, Melbourne VIC 3000", type: "Apartment", bedrooms: 2, bathrooms: 1, parking: 1, rent: "$450/wk", status: "Active", workOrders: 0 },
  { id: "P002", address: "45 George St, Sydney NSW 2000", type: "House", bedrooms: 3, bathrooms: 2, parking: 2, rent: "$680/wk", status: "Onboarding", workOrders: 3 },
  { id: "P003", address: "8 Adelaide Tce, Perth WA 6000", type: "Unit", bedrooms: 1, bathrooms: 1, parking: 1, rent: "$350/wk", status: "Active", workOrders: 1 },
];

const commsLog = [
  { type: "email" as const, from: "admin@pmdashboard.com.au", to: "plumber@fixitfast.com.au", subject: "Work Order #WO-1042 – Leaking tap", date: "26 Mar 2026, 9:15 AM", status: "Sent" },
  { type: "phone" as const, from: "Sarah Mitchell", to: "ElectroPro Services", subject: "Urgent: Power outage at 45 George St", date: "25 Mar 2026, 3:42 PM", status: "Completed", duration: "4 min" },
  { type: "email" as const, from: "cleaner@sparkle.com.au", to: "admin@pmdashboard.com.au", subject: "End-of-lease clean confirmation", date: "25 Mar 2026, 11:00 AM", status: "Received" },
  { type: "phone" as const, from: "Admin", to: "GreenThumb Gardens", subject: "Scheduled lawn maintenance", date: "24 Mar 2026, 2:00 PM", status: "Missed", duration: "—" },
  { type: "sms" as const, from: "System", to: "FixIt Fast Plumbing", subject: "Reminder: Work order #WO-1042 due tomorrow", date: "24 Mar 2026, 10:00 AM", status: "Delivered" },
];

export default function Onboarding() {
  const [activeTab, setActiveTab] = useState("renter");
  const [selectedProperty, setSelectedProperty] = useState("");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto">
            {/* Hero */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-10 text-white">
              <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Onboarding Centre</h1>
                <p className="text-emerald-100 text-lg">Manage renter, rental provider, and service provider onboarding in one place.</p>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">
              {/* Timeline */}
              <Card className="border-emerald-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-emerald-600" /> Onboarding Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between py-6 px-4">
                    {timelineSteps.map((step, i) => (
                      <div key={step.label} className="flex flex-col items-center flex-1 relative">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center z-10 ${
                          step.status === "completed" ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-600 ring-2 ring-emerald-400"
                        }`}>
                          {step.status === "completed" ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                        </div>
                        {i < timelineSteps.length - 1 && (
                          <div className={`absolute top-5 left-[55%] w-full h-0.5 ${
                            step.status === "completed" ? "bg-emerald-500" : "bg-emerald-200"
                          }`} />
                        )}
                        <span className="font-semibold text-sm mt-2">{step.label}</span>
                        <span className="text-xs text-muted-foreground">{step.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tabs: Renter / Service Provider / Rental Provider */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-emerald-50 border border-emerald-200">
                  <TabsTrigger value="renter" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                    <UserPlus className="h-4 w-4 mr-1.5" /> Renter
                  </TabsTrigger>
                  <TabsTrigger value="service" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                    <Wrench className="h-4 w-4 mr-1.5" /> Service Provider
                  </TabsTrigger>
                  <TabsTrigger value="rental" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                    <Briefcase className="h-4 w-4 mr-1.5" /> Rental Provider
                  </TabsTrigger>
                </TabsList>

                {/* Renter Tab */}
                <TabsContent value="renter" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <UserPlus className="h-5 w-5 text-emerald-600" /> Renter Onboarding Form
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Full Name</Label>
                          <Input placeholder="Enter full name" />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input type="email" placeholder="email@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone</Label>
                          <Input placeholder="+61 400 000 000" />
                        </div>
                        <div className="space-y-2">
                          <Label>Assign Property</Label>
                          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                            <SelectTrigger><SelectValue placeholder="Select property" /></SelectTrigger>
                            <SelectContent>
                              {properties.map(p => (
                                <SelectItem key={p.id} value={p.id}>{p.address}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Lease Start Date</Label>
                          <Input type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label>Lease Duration</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select duration" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6">6 Months</SelectItem>
                              <SelectItem value="12">12 Months</SelectItem>
                              <SelectItem value="24">24 Months</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Number of Renters</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select number" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5">5+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end pt-2">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Start Onboarding</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Service Provider Tab */}
                <TabsContent value="service" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-emerald-600" /> Service Provider Onboarding
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Business Name</Label>
                          <Input placeholder="Enter business name" />
                        </div>
                        <div className="space-y-2">
                          <Label>Contact Person</Label>
                          <Input placeholder="Full name" />
                        </div>
                        <div className="space-y-2">
                          <Label>ABN</Label>
                          <Input placeholder="00 000 000 000" />
                        </div>
                        <div className="space-y-2">
                          <Label>Trade Type</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select trade" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="plumber">Plumber</SelectItem>
                              <SelectItem value="electrician">Electrician</SelectItem>
                              <SelectItem value="locksmith">Locksmith</SelectItem>
                              <SelectItem value="cleaner">Cleaner</SelectItem>
                              <SelectItem value="gardener">Gardener</SelectItem>
                              <SelectItem value="general">General Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Insurance Expiry</Label>
                          <Input type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label>Service Region</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="metro">Metro</SelectItem>
                              <SelectItem value="regional">Regional</SelectItem>
                              <SelectItem value="all">All Areas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end pt-2">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Register Provider</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Work Order Form */}
                  <Card className="border-emerald-200">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <ClipboardList className="h-5 w-5 text-emerald-600" /> Work Order / Job Allocation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Property</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select property" /></SelectTrigger>
                            <SelectContent>
                              {properties.filter(p => p.workOrders > 0).map(p => (
                                <SelectItem key={p.id} value={p.id}>{p.address}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Job Type</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select job type" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="plumbing">Plumbing</SelectItem>
                              <SelectItem value="electrical">Electrical</SelectItem>
                              <SelectItem value="locksmith">Locksmith</SelectItem>
                              <SelectItem value="cleaning">Cleaning</SelectItem>
                              <SelectItem value="gardening">Gardening</SelectItem>
                              <SelectItem value="general">General Maintenance</SelectItem>
                              <SelectItem value="pest">Pest Control</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Assign To</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select provider" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fixit">FixIt Fast Plumbing</SelectItem>
                              <SelectItem value="electro">ElectroPro Services</SelectItem>
                              <SelectItem value="sparkle">Sparkle Clean Co.</SelectItem>
                              <SelectItem value="greenthumb">GreenThumb Gardens</SelectItem>
                              <SelectItem value="allround">All-Round Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Priority</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="urgent">Urgent</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Scheduled Date</Label>
                          <Input type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label>Budget Estimate</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under500">Under $500</SelectItem>
                              <SelectItem value="500-1000">$500 – $1,000</SelectItem>
                              <SelectItem value="1000-2500">$1,000 – $2,500</SelectItem>
                              <SelectItem value="2500-5000">$2,500 – $5,000</SelectItem>
                              <SelectItem value="over5000">Over $5,000</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Job Description</Label>
                        <Textarea placeholder="Describe the work required..." className="min-h-[80px]" />
                      </div>
                      <div className="flex justify-end pt-2">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Create Work Order</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Properties with Outstanding Work Orders */}
                  <Card className="border-emerald-200">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-emerald-600" /> Properties with Outstanding Work Orders
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b text-left text-muted-foreground">
                              <th className="pb-2 font-medium">ID</th>
                              <th className="pb-2 font-medium">Address</th>
                              <th className="pb-2 font-medium">Type</th>
                              <th className="pb-2 font-medium">Work Orders</th>
                              <th className="pb-2 font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {properties.filter(p => p.workOrders > 0).map(p => (
                              <tr key={p.id} className="border-b last:border-0">
                                <td className="py-3 font-mono text-xs">{p.id}</td>
                                <td className="py-3">{p.address}</td>
                                <td className="py-3">{p.type}</td>
                                <td className="py-3">
                                  <Badge className="bg-amber-100 text-amber-700 border-amber-200">{p.workOrders} outstanding</Badge>
                                </td>
                                <td className="py-3">
                                  <Badge className={p.status === "Onboarding" ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-emerald-100 text-emerald-700 border-emerald-200"}>
                                    {p.status}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Email Log */}
                  <Card className="border-emerald-200">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Mail className="h-5 w-5 text-emerald-600" /> Email Log
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {commsLog.filter(c => c.type === "email").map((c, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium text-sm">{c.subject}</p>
                            <p className="text-xs text-muted-foreground">{c.from} → {c.to} · {c.date}</p>
                          </div>
                          <Badge variant="outline" className={
                            c.status === "Sent" ? "border-emerald-300 text-emerald-700 bg-emerald-50" :
                            "border-blue-300 text-blue-700 bg-blue-50"
                          }>{c.status}</Badge>
                        </div>
                      ))}
                      <Separator />
                      <div className="pt-2 space-y-3">
                        <Label className="font-semibold">Compose Email</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input placeholder="To: email@provider.com" />
                          <Input placeholder="Subject" />
                        </div>
                        <Textarea placeholder="Message..." className="min-h-[80px]" />
                        <div className="flex justify-end">
                          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Send Email</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Phone Log */}
                  <Card className="border-emerald-200">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Phone className="h-5 w-5 text-emerald-600" /> Phone Log
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {commsLog.filter(c => c.type === "phone").map((c, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium text-sm">{c.subject}</p>
                            <p className="text-xs text-muted-foreground">{c.from} → {c.to} · {c.date} · Duration: {c.duration}</p>
                          </div>
                          <Badge variant="outline" className={
                            c.status === "Completed" ? "border-emerald-300 text-emerald-700 bg-emerald-50" :
                            "border-red-300 text-red-700 bg-red-50"
                          }>{c.status}</Badge>
                        </div>
                      ))}
                      <Separator />
                      <div className="pt-2 space-y-3">
                        <Label className="font-semibold">Log Phone Call</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <Input placeholder="Contact name" />
                          <Input placeholder="Phone number" />
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Call outcome" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="missed">Missed</SelectItem>
                              <SelectItem value="voicemail">Voicemail</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Textarea placeholder="Call notes..." className="min-h-[60px]" />
                        <div className="flex justify-end">
                          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Log Call</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Communications History */}
                  <Card className="border-emerald-200">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-emerald-600" /> Communications History
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {commsLog.map((c, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded bg-emerald-100 flex items-center justify-center shrink-0">
                              {c.type === "email" ? <Mail className="h-4 w-4 text-emerald-600" /> :
                               c.type === "phone" ? <Phone className="h-4 w-4 text-emerald-600" /> :
                               <MessageSquare className="h-4 w-4 text-emerald-600" />}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{c.subject}</p>
                              <p className="text-xs text-muted-foreground">{c.from} → {c.to} · {c.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs capitalize">{c.type}</Badge>
                            <Badge variant="outline" className={
                              c.status === "Sent" || c.status === "Completed" || c.status === "Delivered" ? "border-emerald-300 text-emerald-700 bg-emerald-50" :
                              c.status === "Received" ? "border-blue-300 text-blue-700 bg-blue-50" :
                              "border-red-300 text-red-700 bg-red-50"
                            }>{c.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Rental Provider Tab */}
                <TabsContent value="rental" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-emerald-600" /> Rental Provider Onboarding
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Owner Name</Label>
                          <Input placeholder="Enter owner name" />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input type="email" placeholder="owner@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone</Label>
                          <Input placeholder="+61 400 000 000" />
                        </div>
                        <div className="space-y-2">
                          <Label>Property Address</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select property" /></SelectTrigger>
                            <SelectContent>
                              {properties.map(p => (
                                <SelectItem key={p.id} value={p.id}>{p.address}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Management Agreement Type</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="exclusive">Exclusive</SelectItem>
                              <SelectItem value="general">General</SelectItem>
                              <SelectItem value="letting-only">Letting Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Preferred Contact Method</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select method" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="phone">Phone</SelectItem>
                              <SelectItem value="sms">SMS</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end pt-2">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Register Owner</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Rental Provider Documents */}
                  <Card className="border-emerald-200">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <ClipboardList className="h-5 w-5 text-emerald-600" /> Rental Provider Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {rentalProviderDocs.map((doc, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{doc.date}</p>
                          </div>
                          <Badge variant="outline" className={
                            doc.status === "Completed" ? "border-emerald-300 text-emerald-700 bg-emerald-50" :
                            doc.status === "Pending Signature" ? "border-amber-300 text-amber-700 bg-amber-50" :
                            doc.status === "In Progress" ? "border-blue-300 text-blue-700 bg-blue-50" :
                            "border-gray-300 text-gray-600"
                          }>
                            {doc.status}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Rental Provider Resources */}
                  <Card className="border-emerald-200">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <FileText className="h-5 w-5 text-emerald-600" /> Rental Provider Resources
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {rentalProviderGuides.map((guide, i) => (
                        <div key={i} className="flex items-start gap-3 py-2 border-b last:border-0">
                          <div className="h-8 w-8 rounded bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Info className="h-4 w-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{guide.title}</p>
                            <p className="text-xs text-muted-foreground">{guide.description}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {activeTab === "renter" && (
              <>
              {/* Property Assignment */}
              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-emerald-600" /> Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-left text-muted-foreground">
                          <th className="pb-2 font-medium">ID</th>
                          <th className="pb-2 font-medium">Address</th>
                          <th className="pb-2 font-medium">Type</th>
                          <th className="pb-2 font-medium">Bed/Bath/Park</th>
                          <th className="pb-2 font-medium">Rent</th>
                          <th className="pb-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.map(p => (
                          <tr key={p.id} className="border-b last:border-0">
                            <td className="py-3 font-mono text-xs">{p.id}</td>
                            <td className="py-3">{p.address}</td>
                            <td className="py-3">{p.type}</td>
                            <td className="py-3">{p.bedrooms}/{p.bathrooms}/{p.parking}</td>
                            <td className="py-3 font-medium">{p.rent}</td>
                            <td className="py-3">
                              <Badge variant={p.status === "Active" ? "default" : "secondary"}
                                className={p.status === "Onboarding" ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-emerald-100 text-emerald-700 border-emerald-200"}>
                                {p.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Forms & Guides */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <ClipboardList className="h-5 w-5 text-emerald-600" /> Onboarding Forms
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {onboardingForms.map((form, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium text-sm">{form.name}</p>
                          <p className="text-xs text-muted-foreground">{form.type} · {form.date}</p>
                        </div>
                        <Badge variant="outline" className={
                          form.status === "Completed" ? "border-emerald-300 text-emerald-700 bg-emerald-50" :
                          form.status === "Pending Signature" ? "border-amber-300 text-amber-700 bg-amber-50" :
                          form.status === "In Progress" ? "border-blue-300 text-blue-700 bg-blue-50" :
                          "border-gray-300 text-gray-600"
                        }>
                          {form.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="h-5 w-5 text-emerald-600" /> Guides & Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {guides.map((guide, i) => (
                      <div key={i} className="flex items-start gap-3 py-2 border-b last:border-0">
                        <div className="h-8 w-8 rounded bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Info className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{guide.title}</p>
                          <p className="text-xs text-muted-foreground">{guide.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              </>
              )}

              {/* General Information */}
              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Info className="h-5 w-5 text-emerald-600" /> General Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Agency</p>
                      <p className="font-medium">PM Dashboard Realty</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Primary Contact</p>
                      <p className="font-medium">Sarah Mitchell</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Office Phone</p>
                      <p className="font-medium">1300 555 123</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">onboarding@pmdashboard.com.au</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Office Hours</p>
                      <p className="font-medium">Mon–Fri, 9:00 AM – 5:00 PM</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">After Hours Emergency</p>
                      <p className="font-medium">1800 EMERGENCY</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
