import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import {
  Home, MapPin, Bed, Bath, Car, Key, Video, Camera, Mic, MicOff,
  VideoOff, Monitor, PhoneOff, Users, ExternalLink, Calendar, Clock,
  CheckCircle2, PlayCircle, FileVideo, Link2, AlertTriangle, XCircle,
  Image, Upload, Star, FileText, Printer, Download, Plus, ClipboardList,
  TrendingUp, BarChart3, Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import InspectionScriptBuilder from "@/components/inspections/InspectionScriptBuilder";
import AIInspectionDigest from "@/components/inspections/AIInspectionDigest";

const inspections = [
  { address: "24 Casterly Rock, NSW", keyNo: "344", beds: 3, baths: 2, cars: 1, type: "Routine", date: "Apr 12, 2026", status: "Scheduled", method: "In-Person", tenant: "Sarah Mitchell", owner: "David Chen" },
  { address: "15 High St, QLD", keyNo: "201", beds: 2, baths: 1, cars: 1, type: "Routine", date: "Apr 14, 2026", status: "Scheduled", method: "Virtual — Zoom", tenant: "James Cooper", owner: "Maria Santos" },
  { address: "8 Park Ave, VIC", keyNo: "112", beds: 3, baths: 2, cars: 1, type: "Entry", date: "Apr 8, 2026", status: "Scheduled", method: "Virtual — Teams", tenant: "—", owner: "Robert Taylor" },
  { address: "56 Elm Cres, VIC", keyNo: "455", beds: 5, baths: 3, cars: 2, type: "Routine", date: "Mar 20, 2026", status: "Completed", method: "Virtual — Zoom", tenant: "Emma Wilson", owner: "Maria Santos" },
  { address: "9 Ocean Pde, NSW", keyNo: "330", beds: 2, baths: 1, cars: 1, type: "Exit", date: "Apr 2, 2026", status: "Overdue", method: "In-Person", tenant: "—", owner: "Robert Taylor" },
  { address: "33 King William St, SA", keyNo: "220", beds: 3, baths: 2, cars: 2, type: "Routine", date: "Apr 18, 2026", status: "Scheduled", method: "In-Person", tenant: "Liam O'Brien", owner: "David Chen" },
];

const pastRecordings = [
  { property: "56 Elm Cres, VIC", date: "Mar 20, 2026", duration: "22:15", platform: "Zoom", type: "Routine", hasVideo: true, hasAudio: true, hasReport: true },
  { property: "24 Casterly Rock, NSW", date: "Jan 15, 2026", duration: "18:40", platform: "Teams", type: "Routine", hasVideo: true, hasAudio: true, hasReport: true },
  { property: "15 High St, QLD", date: "Dec 5, 2025", duration: "15:30", platform: "Camera", type: "Entry", hasVideo: true, hasAudio: false, hasReport: true },
];

const photoGallery = [
  { id: "ph1", room: "Kitchen", label: "Sink leak – hot tap", date: "Mar 20, 2026", severity: "major", property: "56 Elm Cres, VIC" },
  { id: "ph2", room: "Bathroom", label: "Mould in shower grout", date: "Mar 20, 2026", severity: "critical", property: "56 Elm Cres, VIC" },
  { id: "ph3", room: "Living Room", label: "Wall scuff near TV", date: "Mar 20, 2026", severity: "minor", property: "56 Elm Cres, VIC" },
  { id: "ph4", room: "Front Entry", label: "Garden overgrown", date: "Mar 20, 2026", severity: "minor", property: "56 Elm Cres, VIC" },
  { id: "ph5", room: "Bedroom 1", label: "Wardrobe – good condition", date: "Jan 15, 2026", severity: "ok", property: "24 Casterly Rock, NSW" },
  { id: "ph6", room: "Exterior", label: "Gutter damage", date: "Jan 15, 2026", severity: "major", property: "24 Casterly Rock, NSW" },
];

const conditionItems = [
  { room: "Front Entry", items: [
    { name: "Front door & locks", condition: "Good", notes: "" },
    { name: "External walls", condition: "Good", notes: "" },
    { name: "Garden/lawn", condition: "Fair", notes: "Slightly overgrown" },
    { name: "Driveway", condition: "Good", notes: "" },
  ]},
  { room: "Living Room", items: [
    { name: "Walls", condition: "Fair", notes: "Small scuff east wall" },
    { name: "Ceiling", condition: "Good", notes: "" },
    { name: "Flooring", condition: "Good", notes: "" },
    { name: "Windows & blinds", condition: "Good", notes: "" },
  ]},
  { room: "Kitchen", items: [
    { name: "Benchtops", condition: "Good", notes: "" },
    { name: "Sink & tapware", condition: "Poor", notes: "Hot tap dripping" },
    { name: "Oven & cooktop", condition: "Good", notes: "" },
    { name: "Rangehood", condition: "Good", notes: "" },
    { name: "Cupboards & drawers", condition: "Good", notes: "" },
  ]},
  { room: "Bathroom", items: [
    { name: "Tiles & grout", condition: "Poor", notes: "Mould detected" },
    { name: "Shower screen", condition: "Good", notes: "" },
    { name: "Toilet", condition: "Good", notes: "" },
    { name: "Exhaust fan", condition: "Fair", notes: "Noisy bearing" },
  ]},
  { room: "Bedroom 1", items: [
    { name: "Walls & ceiling", condition: "Good", notes: "" },
    { name: "Wardrobe", condition: "Good", notes: "" },
    { name: "Windows & blinds", condition: "Good", notes: "" },
  ]},
  { room: "Laundry", items: [
    { name: "Tub & tapware", condition: "Good", notes: "" },
    { name: "Water connections", condition: "Good", notes: "" },
  ]},
];

const reportTemplates = [
  { id: "rt1", name: "Routine Inspection Report", desc: "Standard report for scheduled routine inspections", rooms: 7, fields: 28 },
  { id: "rt2", name: "Entry Condition Report", desc: "Comprehensive condition record at lease start", rooms: 10, fields: 45 },
  { id: "rt3", name: "Exit Condition Report", desc: "End-of-lease condition assessment with bond notes", rooms: 10, fields: 50 },
  { id: "rt4", name: "Maintenance Inspection", desc: "Focused inspection for reported maintenance issues", rooms: 3, fields: 12 },
  { id: "rt5", name: "Compliance Check", desc: "Safety & compliance-only inspection checklist", rooms: 2, fields: 8 },
];

function StatCard({ icon: Icon, label, value, sub, color }: { icon: React.ElementType; label: string; value: number | string; sub?: string; color: string }) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`rounded-full p-2.5 ${color}`}><Icon className="h-5 w-5" /></div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-bold text-foreground">{value}</p>
          {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

function SeverityDot({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    ok: "bg-emerald-500",
    minor: "bg-amber-500",
    major: "bg-orange-500",
    critical: "bg-destructive",
  };
  return <span className={`inline-block h-2 w-2 rounded-full ${colors[severity] || "bg-muted-foreground"}`} />;
}

function ConditionBadge({ condition }: { condition: string }) {
  const styles: Record<string, string> = {
    Good: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
    Fair: "bg-amber-500/15 text-amber-700 border-amber-500/30",
    Poor: "bg-destructive/15 text-destructive border-destructive/30",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${styles[condition] || "bg-muted text-muted-foreground border-border"}`}>
      {condition}
    </span>
  );
}

const Inspections = () => {
  const { toast } = useToast();
  const [tab, setTab] = useState("schedule");
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [liveOpen, setLiveOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [conditionProperty, setConditionProperty] = useState("56 Elm Cres, VIC");
  const [photoFilter, setPhotoFilter] = useState("all");

  const [form, setForm] = useState({
    property: "",
    date: "",
    time: "10:00",
    platform: "zoom",
    type: "Routine",
    inviteRenter: true,
  });

  const handleSchedule = () => {
    if (!form.property || !form.date) {
      toast({ title: "Required", description: "Property and date are required.", variant: "destructive" });
      return;
    }
    toast({
      title: "Inspection Scheduled",
      description: `${form.platform === "zoom" ? "Zoom" : form.platform === "teams" ? "Teams" : "Camera"} inspection for ${form.property} on ${form.date} at ${form.time}`,
    });
    setScheduleOpen(false);
  };

  const scheduled = inspections.filter(i => i.status === "Scheduled").length;
  const completed = inspections.filter(i => i.status === "Completed").length;
  const overdue = inspections.filter(i => i.status === "Overdue").length;

  const filteredPhotos = photoFilter === "all" ? photoGallery : photoGallery.filter(p => p.severity === photoFilter);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground">Inspection Center</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground">Schedule, conduct & review property inspections</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2 text-sm">
                      <Calendar className="h-4 w-4" /> Schedule
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Schedule Inspection</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-3">
                      <div>
                        <Label>Property</Label>
                        <Select value={form.property} onValueChange={(v) => setForm({ ...form, property: v })}>
                          <SelectTrigger><SelectValue placeholder="Select property" /></SelectTrigger>
                          <SelectContent>
                            {inspections.map((i) => (
                              <SelectItem key={i.address} value={i.address}>{i.address}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><Label>Date</Label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
                        <div><Label>Time</Label><Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></div>
                      </div>
                      <div>
                        <Label>Platform</Label>
                        <Select value={form.platform} onValueChange={(v) => setForm({ ...form, platform: v })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="zoom"><span className="flex items-center gap-2"><Video className="h-3.5 w-3.5" /> Zoom</span></SelectItem>
                            <SelectItem value="teams"><span className="flex items-center gap-2"><Users className="h-3.5 w-3.5" /> Microsoft Teams</span></SelectItem>
                            <SelectItem value="camera"><span className="flex items-center gap-2"><Camera className="h-3.5 w-3.5" /> Camera Only</span></SelectItem>
                            <SelectItem value="inperson"><span className="flex items-center gap-2"><Home className="h-3.5 w-3.5" /> In-Person</span></SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Inspection Type</Label>
                          <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Routine">Routine</SelectItem>
                              <SelectItem value="Entry">Entry</SelectItem>
                              <SelectItem value="Exit">Exit</SelectItem>
                              <SelectItem value="Maintenance">Maintenance Check</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-end">
                          <Button onClick={handleSchedule} className="w-full">Schedule</Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Meeting link auto-generated and sent to renter via email/SMS.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={liveOpen} onOpenChange={setLiveOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 text-sm"><Video className="h-4 w-4" /> Start Live</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader><DialogTitle>Live Virtual Inspection</DialogTitle></DialogHeader>
                    <div className="relative rounded-xl bg-muted aspect-video flex items-center justify-center overflow-hidden">
                      <div className="text-center space-y-3">
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                          <Camera className="h-10 w-10 text-primary/40" />
                        </div>
                        <p className="text-sm text-muted-foreground">Camera preview</p>
                        <p className="text-xs text-muted-foreground/60">Connect via Zoom, Teams, or use device camera</p>
                      </div>
                      {isRecording && (
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-destructive/90 text-destructive-foreground px-2.5 py-1 rounded-full text-xs font-medium">
                          <span className="h-2 w-2 rounded-full bg-destructive-foreground animate-pulse" /> REC
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 w-32 h-24 rounded-lg bg-card border border-border flex items-center justify-center">
                        <Users className="h-6 w-6 text-muted-foreground/40" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-3 py-2">
                      <Button variant={isMuted ? "destructive" : "outline"} size="icon" className="rounded-full h-11 w-11" onClick={() => setIsMuted(!isMuted)}>
                        {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                      </Button>
                      <Button variant={isCamOff ? "destructive" : "outline"} size="icon" className="rounded-full h-11 w-11" onClick={() => setIsCamOff(!isCamOff)}>
                        {isCamOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full h-11 w-11"><Monitor className="h-5 w-5" /></Button>
                      <Button variant={isRecording ? "destructive" : "outline"} size="sm" className="rounded-full px-4 gap-2"
                        onClick={() => {
                          setIsRecording(!isRecording);
                          toast({ title: isRecording ? "Recording Stopped" : "Recording Started", description: isRecording ? "Video saved." : "Recording..." });
                        }}>
                        <span className={`h-2.5 w-2.5 rounded-full ${isRecording ? "bg-destructive-foreground animate-pulse" : "bg-destructive"}`} />
                        {isRecording ? "Stop Rec" : "Record"}
                      </Button>
                      <Button variant="destructive" size="icon" className="rounded-full h-11 w-11" onClick={() => setLiveOpen(false)}>
                        <PhoneOff className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> 2 participants</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-xs gap-1 h-7"><ExternalLink className="h-3 w-3" /> Open in Zoom</Button>
                        <Button variant="ghost" size="sm" className="text-xs gap-1 h-7"><ExternalLink className="h-3 w-3" /> Open in Teams</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard icon={ClipboardList} label="Total Inspections" value={inspections.length} sub="This quarter" color="bg-primary/10 text-primary" />
              <StatCard icon={Calendar} label="Upcoming" value={scheduled} sub="Next 30 days" color="bg-sky-500/15 text-sky-600" />
              <StatCard icon={CheckCircle2} label="Completed" value={completed} sub="This quarter" color="bg-emerald-500/15 text-emerald-600" />
              <StatCard icon={AlertTriangle} label="Overdue" value={overdue} sub="Requires action" color="bg-destructive/15 text-destructive" />
            </div>

            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="flex-wrap">
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="condition">Condition</TabsTrigger>
                <TabsTrigger value="photos">Photos ({photoGallery.length})</TabsTrigger>
                <TabsTrigger value="scripts">Scripts</TabsTrigger>
                <TabsTrigger value="ai-digest">AI Digest</TabsTrigger>
                <TabsTrigger value="recordings">Recordings ({pastRecordings.length})</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
              </TabsList>

              {/* ─── Schedule Tab ─── */}
              <TabsContent value="schedule" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { name: "Zoom", icon: Video, color: "bg-blue-500/10 text-blue-500 border-blue-500/20", status: "Connect", desc: "Video conferencing" },
                    { name: "Microsoft Teams", icon: Users, color: "bg-purple-500/10 text-purple-500 border-purple-500/20", status: "Connect", desc: "Team collaboration" },
                    { name: "Device Camera", icon: Camera, color: "bg-primary/10 text-primary border-primary/20", status: "Ready", desc: "Self-inspection recording" },
                  ].map((p) => (
                    <Card key={p.name} className="border-dashed">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center border ${p.color}`}>
                          <p.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.desc}</p>
                        </div>
                        <Badge variant="outline" className={p.status === "Ready" ? "bg-primary/10 text-primary border-primary/20" : ""}>
                          {p.status === "Ready" ? <><CheckCircle2 className="h-3 w-3 mr-1" />Ready</> : <><Link2 className="h-3 w-3 mr-1" />Connect</>}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3 sm:space-y-4">
                    {inspections.map((item, i) => (
                      <Card key={i} className="hover:border-primary/30 transition-colors">
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex gap-3 sm:gap-4">
                            <div className="w-20 h-16 sm:w-24 sm:h-20 rounded-lg bg-muted flex items-center justify-center shrink-0">
                              <Home className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground/40" />
                            </div>
                            <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <h3 className="font-semibold text-foreground text-sm truncate">{item.address}</h3>
                                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-3 w-3" /> {item.date}
                                    <span className="mx-1">·</span>
                                    <Badge variant="outline" className="text-[10px]">{item.type}</Badge>
                                  </p>
                                </div>
                                <Badge
                                  className={`shrink-0 text-[10px] ${
                                    item.status === "Completed"
                                      ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/30"
                                      : item.status === "Overdue"
                                      ? "bg-destructive/15 text-destructive border-destructive/30"
                                      : "bg-sky-500/15 text-sky-600 border-sky-500/30"
                                  }`}
                                >
                                  {item.status}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1"><Bed className="h-3 w-3" /> {item.beds}</span>
                                <span className="flex items-center gap-1"><Bath className="h-3 w-3" /> {item.baths}</span>
                                <span className="flex items-center gap-1"><Car className="h-3 w-3" /> {item.cars}</span>
                                <span className="flex items-center gap-1"><Key className="h-3 w-3" /> {item.keyNo}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-[10px] gap-1">
                                  {item.method.includes("Zoom") ? <Video className="h-3 w-3" /> :
                                   item.method.includes("Teams") ? <Users className="h-3 w-3" /> :
                                   <Home className="h-3 w-3" />}
                                  {item.method}
                                </Badge>
                                {item.status === "Scheduled" && item.method !== "In-Person" && (
                                  <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={() => setLiveOpen(true)}>
                                    <Video className="h-3 w-3" /> Join
                                  </Button>
                                )}
                                {item.status === "Scheduled" && item.method === "In-Person" && (
                                  <Badge className="bg-primary/10 text-primary border-primary/20 cursor-pointer hover:bg-primary/20 text-[10px]">Proceed</Badge>
                                )}
                                {item.status === "Overdue" && (
                                  <Button size="sm" variant="destructive" className="text-xs h-7 gap-1">
                                    <AlertTriangle className="h-3 w-3" /> Reschedule
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="rounded-lg border border-border overflow-hidden bg-muted min-h-[300px] sm:min-h-[400px] flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <MapPin className="h-12 w-12 text-muted-foreground/40 mx-auto" />
                      <p className="text-sm text-muted-foreground">Map view</p>
                      <p className="text-xs text-muted-foreground/60">Integrate with Google Maps or Mapbox</p>
                      <div className="mt-3 space-y-1">
                        {inspections.filter(i => i.status === "Scheduled").map((i, idx) => (
                          <div key={idx} className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 text-primary" /> {i.address}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* ─── Condition Assessment Tab ─── */}
              <TabsContent value="condition" className="space-y-4 mt-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <Select value={conditionProperty} onValueChange={setConditionProperty}>
                      <SelectTrigger className="w-60 h-9 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="56 Elm Cres, VIC">56 Elm Cres, VIC</SelectItem>
                        <SelectItem value="24 Casterly Rock, NSW">24 Casterly Rock, NSW</SelectItem>
                        <SelectItem value="15 High St, QLD">15 High St, QLD</SelectItem>
                      </SelectContent>
                    </Select>
                    <Badge variant="outline" className="text-xs">{conditionItems.length} rooms · {conditionItems.reduce((s, r) => s + r.items.length, 0)} items</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs"><Printer className="h-3.5 w-3.5" /> Print</Button>
                    <Button size="sm" className="gap-1.5 text-xs"><Download className="h-3.5 w-3.5" /> Export PDF</Button>
                  </div>
                </div>

                {/* Overall scores */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Good", count: conditionItems.reduce((s, r) => s + r.items.filter(i => i.condition === "Good").length, 0), color: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30" },
                    { label: "Fair", count: conditionItems.reduce((s, r) => s + r.items.filter(i => i.condition === "Fair").length, 0), color: "bg-amber-500/15 text-amber-700 border-amber-500/30" },
                    { label: "Poor", count: conditionItems.reduce((s, r) => s + r.items.filter(i => i.condition === "Poor").length, 0), color: "bg-destructive/15 text-destructive border-destructive/30" },
                  ].map(s => (
                    <div key={s.label} className={`rounded-lg border p-3 text-center ${s.color}`}>
                      <p className="text-2xl font-bold">{s.count}</p>
                      <p className="text-xs font-medium">{s.label}</p>
                    </div>
                  ))}
                </div>

                {conditionItems.map((room, ri) => (
                  <Card key={ri}>
                    <CardHeader className="pb-2 px-4 pt-4">
                      <CardTitle className="text-sm font-semibold text-foreground">{room.room}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <div className="border border-border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-secondary/50">
                              <th className="p-2.5 text-left text-xs font-semibold text-muted-foreground uppercase">Item</th>
                              <th className="p-2.5 text-left text-xs font-semibold text-muted-foreground uppercase w-28">Condition</th>
                              <th className="p-2.5 text-left text-xs font-semibold text-muted-foreground uppercase">Notes</th>
                              <th className="p-2.5 text-center text-xs font-semibold text-muted-foreground uppercase w-16">Photo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {room.items.map((item, ii) => (
                              <tr key={ii} className="border-t border-border hover:bg-secondary/30 transition-colors">
                                <td className="p-2.5 text-foreground text-xs font-medium">{item.name}</td>
                                <td className="p-2.5"><ConditionBadge condition={item.condition} /></td>
                                <td className="p-2.5 text-xs text-muted-foreground">{item.notes || "—"}</td>
                                <td className="p-2.5 text-center">
                                  <Button variant="ghost" size="icon" className="h-7 w-7">
                                    <Camera className="h-3.5 w-3.5 text-muted-foreground" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* ─── Photos Tab ─── */}
              <TabsContent value="photos" className="space-y-4 mt-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex gap-2">
                    {["all", "critical", "major", "minor", "ok"].map(f => (
                      <button
                        key={f}
                        onClick={() => setPhotoFilter(f)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          photoFilter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <Upload className="h-3.5 w-3.5" /> Upload Photos
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredPhotos.map(photo => (
                    <Card key={photo.id} className="overflow-hidden hover:border-primary/30 transition-colors cursor-pointer">
                      <div className="aspect-[4/3] bg-muted flex items-center justify-center relative">
                        <Image className="h-10 w-10 text-muted-foreground/30" />
                        <div className="absolute top-2 left-2">
                          <SeverityDot severity={photo.severity} />
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className="text-[9px] bg-card/80 backdrop-blur-sm">{photo.room}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <p className="text-xs font-medium text-foreground truncate">{photo.label}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{photo.property} · {photo.date}</p>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Upload placeholder */}
                  <Card className="border-dashed overflow-hidden cursor-pointer hover:border-primary/30 transition-colors">
                    <div className="aspect-[4/3] flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Plus className="h-8 w-8 text-muted-foreground/30 mx-auto" />
                        <p className="text-xs text-muted-foreground">Add Photo</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              {/* ─── Scripts Tab ─── */}
              <TabsContent value="scripts" className="mt-4">
                <InspectionScriptBuilder />
              </TabsContent>

              {/* ─── AI Digest Tab ─── */}
              <TabsContent value="ai-digest" className="mt-4">
                <AIInspectionDigest />
              </TabsContent>

              {/* ─── Recordings Tab ─── */}
              <TabsContent value="recordings" className="space-y-4 mt-4">
                <div className="grid gap-3">
                  {pastRecordings.map((rec, i) => (
                    <Card key={i}>
                      <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <FileVideo className="h-6 w-6 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">{rec.property}</p>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-0.5">
                              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {rec.date}</span>
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {rec.duration}</span>
                              <Badge variant="outline" className="text-[10px]">{rec.type}</Badge>
                              <Badge variant="outline" className="text-[10px]">{rec.platform}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex gap-1">
                            {rec.hasVideo && <Badge variant="outline" className="text-[10px] gap-0.5"><Video className="h-3 w-3" /> Video</Badge>}
                            {rec.hasAudio && <Badge variant="outline" className="text-[10px] gap-0.5"><Mic className="h-3 w-3" /> Audio</Badge>}
                          </div>
                          <Button variant="outline" size="sm" className="text-xs h-7 gap-1"><PlayCircle className="h-3 w-3" /> Play</Button>
                          {rec.hasReport && <Button variant="ghost" size="sm" className="text-xs h-7">Report</Button>}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* ─── Reports Tab ─── */}
              <TabsContent value="reports" className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Report Templates</p>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs"><Plus className="h-3.5 w-3.5" /> Create Template</Button>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {reportTemplates.map(tmpl => (
                    <Card key={tmpl.id} className="hover:border-primary/30 transition-colors">
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-foreground">{tmpl.name}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{tmpl.desc}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-[10px]">{tmpl.rooms} rooms</Badge>
                            <Badge variant="outline" className="text-[10px]">{tmpl.fields} fields</Badge>
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button variant="outline" size="sm" className="text-xs h-7 gap-1"><Eye className="h-3 w-3" /> Preview</Button>
                          <Button size="sm" className="text-xs h-7 gap-1"><FileText className="h-3 w-3" /> Use</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Reports */}
                <div className="mt-6">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Recent Reports</p>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-secondary/50">
                          {["Property", "Type", "Date", "PM", "Status", "Actions"].map(h => (
                            <th key={h} className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { property: "56 Elm Cres, VIC", type: "Routine", date: "Mar 20, 2026", pm: "Jane Doe", status: "Final" },
                          { property: "24 Casterly Rock, NSW", type: "Routine", date: "Jan 15, 2026", pm: "John Smith", status: "Final" },
                          { property: "15 High St, QLD", type: "Entry", date: "Dec 5, 2025", pm: "Jane Doe", status: "Draft" },
                        ].map((r, i) => (
                          <tr key={i} className="border-t border-border hover:bg-secondary/30 transition-colors">
                            <td className="p-3 text-foreground font-medium text-xs">{r.property}</td>
                            <td className="p-3 text-muted-foreground text-xs">{r.type}</td>
                            <td className="p-3 text-muted-foreground text-xs">{r.date}</td>
                            <td className="p-3 text-muted-foreground text-xs">{r.pm}</td>
                            <td className="p-3">
                              <Badge className={`text-[10px] ${r.status === "Final" ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/30" : "bg-amber-500/15 text-amber-700 border-amber-500/30"}`}>
                                {r.status}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm" className="text-xs h-7"><Eye className="h-3 w-3" /></Button>
                                <Button variant="ghost" size="sm" className="text-xs h-7"><Download className="h-3 w-3" /></Button>
                                <Button variant="ghost" size="sm" className="text-xs h-7"><Printer className="h-3 w-3" /></Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              {/* ─── Map Tab ─── */}
              <TabsContent value="map" className="mt-4">
                <div className="rounded-lg border border-border overflow-hidden bg-muted min-h-[500px] flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="h-12 w-12 text-muted-foreground/40 mx-auto" />
                    <p className="text-sm text-muted-foreground">Full Map View</p>
                    <p className="text-xs text-muted-foreground/60">Integrate with Google Maps or Mapbox</p>
                    <div className="mt-4 space-y-2">
                      {inspections.map((insp, idx) => (
                        <div key={idx} className="flex items-center gap-2 justify-center text-xs">
                          <MapPin className={`h-3 w-3 ${insp.status === "Overdue" ? "text-destructive" : insp.status === "Completed" ? "text-emerald-600" : "text-primary"}`} />
                          <span className="text-foreground font-medium">{insp.address}</span>
                          <Badge className={`text-[9px] ${
                            insp.status === "Completed" ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/30" :
                            insp.status === "Overdue" ? "bg-destructive/15 text-destructive border-destructive/30" :
                            "bg-sky-500/15 text-sky-600 border-sky-500/30"
                          }`}>{insp.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Inspections;
