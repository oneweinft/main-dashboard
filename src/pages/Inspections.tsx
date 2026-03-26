import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import {
  Home, MapPin, Bed, Bath, Car, Key, Video, Camera, Mic, MicOff,
  VideoOff, Monitor, PhoneOff, Users, ExternalLink, Calendar, Clock,
  CheckCircle2, PlayCircle, FileVideo, Link2,
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
import { useToast } from "@/hooks/use-toast";
import InspectionScriptBuilder from "@/components/inspections/InspectionScriptBuilder";
import AIInspectionDigest from "@/components/inspections/AIInspectionDigest";

const inspections = [
  { address: "24 Casterly Rock, NSW", keyNo: "344", beds: 3, baths: 2, cars: 1, type: "Routine", date: "Apr 12, 2026", status: "Scheduled", method: "In-Person" },
  { address: "15 High St, QLD", keyNo: "201", beds: 2, baths: 1, cars: 1, type: "Routine", date: "Apr 14, 2026", status: "Scheduled", method: "Virtual — Zoom" },
  { address: "8 Park Ave, VIC", keyNo: "112", beds: 3, baths: 2, cars: 1, type: "Entry", date: "Apr 8, 2026", status: "Scheduled", method: "Virtual — Teams" },
  { address: "56 Elm Cres, VIC", keyNo: "455", beds: 5, baths: 3, cars: 2, type: "Routine", date: "Mar 20, 2026", status: "Completed", method: "Virtual — Zoom" },
];

const pastRecordings = [
  { property: "56 Elm Cres, VIC", date: "Mar 20, 2026", duration: "22:15", platform: "Zoom", type: "Routine", hasVideo: true, hasAudio: true, hasReport: true },
  { property: "24 Casterly Rock, NSW", date: "Jan 15, 2026", duration: "18:40", platform: "Teams", type: "Routine", hasVideo: true, hasAudio: true, hasReport: true },
  { property: "15 High St, QLD", date: "Dec 5, 2025", duration: "15:30", platform: "Camera", type: "Entry", hasVideo: true, hasAudio: false, hasReport: true },
];

const Inspections = () => {
  const { toast } = useToast();
  const [tab, setTab] = useState("schedule");
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [liveOpen, setLiveOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

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
                      <DialogTitle>Schedule Virtual Inspection</DialogTitle>
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
                            <SelectItem value="zoom">
                              <span className="flex items-center gap-2"><Video className="h-3.5 w-3.5" /> Zoom</span>
                            </SelectItem>
                            <SelectItem value="teams">
                              <span className="flex items-center gap-2"><Users className="h-3.5 w-3.5" /> Microsoft Teams</span>
                            </SelectItem>
                            <SelectItem value="camera">
                              <span className="flex items-center gap-2"><Camera className="h-3.5 w-3.5" /> Camera Only (Self-Inspect)</span>
                            </SelectItem>
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
                        A meeting link will be auto-generated and sent to the renter via email and SMS.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={liveOpen} onOpenChange={setLiveOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 text-sm">
                      <Video className="h-4 w-4" /> Start Live
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Live Virtual Inspection</DialogTitle>
                    </DialogHeader>
                    {/* Video feed area */}
                    <div className="relative rounded-xl bg-muted aspect-video flex items-center justify-center overflow-hidden">
                      <div className="text-center space-y-3">
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                          <Camera className="h-10 w-10 text-primary/40" />
                        </div>
                        <p className="text-sm text-muted-foreground">Camera preview</p>
                        <p className="text-xs text-muted-foreground/60">Connect via Zoom, Teams, or use device camera</p>
                      </div>
                      {/* Recording indicator */}
                      {isRecording && (
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-destructive/90 text-destructive-foreground px-2.5 py-1 rounded-full text-xs font-medium">
                          <span className="h-2 w-2 rounded-full bg-destructive-foreground animate-pulse" />
                          REC
                        </div>
                      )}
                      {/* Participant pip */}
                      <div className="absolute bottom-3 right-3 w-32 h-24 rounded-lg bg-card border border-border flex items-center justify-center">
                        <Users className="h-6 w-6 text-muted-foreground/40" />
                      </div>
                    </div>
                    {/* Controls */}
                    <div className="flex items-center justify-center gap-3 py-2">
                      <Button
                        variant={isMuted ? "destructive" : "outline"}
                        size="icon"
                        className="rounded-full h-11 w-11"
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                      </Button>
                      <Button
                        variant={isCamOff ? "destructive" : "outline"}
                        size="icon"
                        className="rounded-full h-11 w-11"
                        onClick={() => setIsCamOff(!isCamOff)}
                      >
                        {isCamOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full h-11 w-11"
                      >
                        <Monitor className="h-5 w-5" />
                      </Button>
                      <Button
                        variant={isRecording ? "destructive" : "outline"}
                        size="sm"
                        className="rounded-full px-4 gap-2"
                        onClick={() => {
                          setIsRecording(!isRecording);
                          toast({
                            title: isRecording ? "Recording Stopped" : "Recording Started",
                            description: isRecording ? "Video saved to inspection records." : "Recording audio and video...",
                          });
                        }}
                      >
                        <span className={`h-2.5 w-2.5 rounded-full ${isRecording ? "bg-destructive-foreground animate-pulse" : "bg-destructive"}`} />
                        {isRecording ? "Stop Rec" : "Record"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="rounded-full h-11 w-11"
                        onClick={() => setLiveOpen(false)}
                      >
                        <PhoneOff className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> 2 participants</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-xs gap-1 h-7">
                          <ExternalLink className="h-3 w-3" /> Open in Zoom
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs gap-1 h-7">
                          <ExternalLink className="h-3 w-3" /> Open in Teams
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="flex-wrap">
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="scripts">Scripts</TabsTrigger>
                <TabsTrigger value="ai-digest">AI Digest</TabsTrigger>
                <TabsTrigger value="recordings">Recordings ({pastRecordings.length})</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
              </TabsList>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="space-y-4 mt-4">
                {/* Platform connect cards */}
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

                {/* Inspection list */}
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
                                      ? "bg-primary/10 text-primary border-primary/20"
                                      : "bg-blue-500/10 text-blue-500 border-blue-500/20"
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
                                  <Badge className="bg-primary/10 text-primary border-primary/20 cursor-pointer hover:bg-primary/20 text-[10px]">
                                    Proceed
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Map Placeholder */}
                  <div className="rounded-lg border border-border overflow-hidden bg-muted min-h-[300px] sm:min-h-[400px] flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <MapPin className="h-12 w-12 text-muted-foreground/40 mx-auto" />
                      <p className="text-sm text-muted-foreground">Map view</p>
                      <p className="text-xs text-muted-foreground/60">Integrate with Google Maps or Mapbox</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Scripts Tab */}
              <TabsContent value="scripts" className="mt-4">
                <InspectionScriptBuilder />
              </TabsContent>

              {/* AI Digest Tab */}
              <TabsContent value="ai-digest" className="mt-4">
                <AIInspectionDigest />
              </TabsContent>

              {/* Recordings Tab */}
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
                            {rec.hasVideo && (
                              <Badge variant="outline" className="text-[10px] gap-0.5"><Video className="h-3 w-3" /> Video</Badge>
                            )}
                            {rec.hasAudio && (
                              <Badge variant="outline" className="text-[10px] gap-0.5"><Mic className="h-3 w-3" /> Audio</Badge>
                            )}
                          </div>
                          <Button variant="outline" size="sm" className="text-xs h-7 gap-1">
                            <PlayCircle className="h-3 w-3" /> Play
                          </Button>
                          {rec.hasReport && (
                            <Button variant="ghost" size="sm" className="text-xs h-7">
                              Report
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Map Tab */}
              <TabsContent value="map" className="mt-4">
                <div className="rounded-lg border border-border overflow-hidden bg-muted min-h-[500px] flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="h-12 w-12 text-muted-foreground/40 mx-auto" />
                    <p className="text-sm text-muted-foreground">Full Map View</p>
                    <p className="text-xs text-muted-foreground/60">Integrate with Google Maps or Mapbox</p>
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
