import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import {
  Search,
  Filter,
  Phone,
  Mail,
  MessageSquare,
  Facebook,
  Globe,
  Bot,
  Play,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  User,
  Bell,
  ExternalLink,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

type ChannelType = "call" | "text" | "email" | "facebook" | "webform" | "chatbot";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "in_progress" | "completed" | "new";
  time: string;
  priority?: boolean;
  summary: string;
  channels: { type: ChannelType; count: number }[];
}

interface ConversationDetail {
  id: string;
  title: string;
  tag: string;
  tagColor: string;
  date: string;
  keyPoints?: string[];
  summaryText?: string;
  hasAudio?: boolean;
  audioDuration?: string;
  expanded: boolean;
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Olivia Martinez",
    email: "olivia@mail.com",
    phone: "+61 400 123 456",
    status: "in_progress",
    time: "8:30 PM",
    priority: true,
    summary: "Discussed a leaking tap in the kitchen. Scheduled a plumber for Thursday morning to inspect and repair.",
    channels: [
      { type: "chatbot", count: 4 },
      { type: "call", count: 2 },
      { type: "email", count: 1 },
      { type: "facebook", count: 1 },
    ],
  },
  {
    id: "2",
    name: "John Smith",
    email: "john@mail.com",
    phone: "+61 400 234 567",
    status: "in_progress",
    time: "7:15 PM",
    summary: "Inquired about a blocked drain. Provided initial troubleshooting steps and booked a service for Friday.",
    channels: [{ type: "webform", count: 1 }],
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice@mail.com",
    phone: "+61 400 345 678",
    status: "in_progress",
    time: "6:00 PM",
    summary: "Asked about replacing an old hot water system. Sent a quote via email and awaiting confirmation.",
    channels: [{ type: "chatbot", count: 3 }],
  },
  {
    id: "4",
    name: "Michael Brown",
    email: "michael@mail.com",
    phone: "+61 1234 5678",
    status: "completed",
    time: "5:45 PM",
    summary: "Confirmed completion of bathroom pipe repairs. Provided tips to prevent future leaks.",
    channels: [
      { type: "call", count: 2 },
      { type: "text", count: 2 },
      { type: "email", count: 1 },
    ],
  },
  {
    id: "5",
    name: "Emily Davis",
    email: "emily@mail.com",
    phone: "+61 400 456 789",
    status: "in_progress",
    time: "4:30 PM",
    summary: "Reported no hot water in the shower. Technician booked for an emergency callout this afternoon.",
    channels: [{ type: "call", count: 1 }],
  },
  {
    id: "6",
    name: "David Wilson",
    email: "david@mail.com",
    phone: "+61 400 567 890",
    status: "in_progress",
    time: "3:15 PM",
    summary: "Requested installation of a new dishwasher. Scheduled for Monday morning and provided a rough estimate.",
    channels: [{ type: "text", count: 1 }],
  },
];

const channelTabs: { type: ChannelType | "all"; label: string; icon: React.ElementType }[] = [
  { type: "call", label: "Call", icon: Phone },
  { type: "text", label: "Text", icon: MessageSquare },
  { type: "email", label: "Email", icon: Mail },
  { type: "facebook", label: "Facebook", icon: Facebook },
  { type: "webform", label: "Webform", icon: Globe },
  { type: "chatbot", label: "Chat bot", icon: Bot },
];

const statusColor: Record<string, string> = {
  in_progress: "text-amber-500",
  completed: "text-accent",
  new: "text-primary",
};

const statusLabel: Record<string, string> = {
  in_progress: "In progress",
  completed: "Completed",
  new: "New",
};

function ChannelBadge({ type, count }: { type: ChannelType; count: number }) {
  const iconMap: Record<ChannelType, React.ElementType> = {
    call: Phone,
    text: MessageSquare,
    email: Mail,
    facebook: Facebook,
    webform: Globe,
    chatbot: Bot,
  };
  const Icon = iconMap[type];
  const labelMap: Record<ChannelType, string> = {
    call: "Call",
    text: "Text",
    email: "Email",
    facebook: "Facebook",
    webform: "Form",
    chatbot: "Chat bot",
  };

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
      <Icon className="h-3 w-3" />
      {labelMap[type]} {count}
    </span>
  );
}

export default function AIReceptionist() {
  const [selectedContact, setSelectedContact] = useState(contacts[3]);
  const [activeTab, setActiveTab] = useState<ChannelType | "all">("call");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [details, setDetails] = useState<ConversationDetail[]>([
    {
      id: "1",
      title: "Urgent assistance needed",
      tag: "New Leads",
      tagColor: "bg-primary text-primary-foreground",
      date: "Fri, 18/10/2024 3:15 PM",
      keyPoints: [
        "Inquiry about gutter cleaning.",
        "Single and double storey areas, gutter guards at the back.",
        "Additional cost for gutter guard removal.",
        "Leaking shower to be assessed during visit.",
      ],
      summaryText:
        "Michael called Stay Connected Plumbing regarding gutter cleaning for his single and double storey home with gutter guards on the back. Sophie explained the extra cost for gutter guard removal. Michael also requested a quote for a leaking shower, and Sophie suggested Ayman could assess the shower during the gutter cleaning. A booking link was sent, and no further assistance was needed.",
      hasAudio: true,
      audioDuration: "3:27",
      expanded: true,
    },
    {
      id: "2",
      title: "Urgent assistance needed",
      tag: "Follow-up",
      tagColor: "bg-amber-500 text-white",
      date: "Fri, 18/10/2024 3:15 PM",
      expanded: false,
    },
    {
      id: "3",
      title: "Urgent assistance needed",
      tag: "Leads",
      tagColor: "bg-accent text-accent-foreground",
      date: "Fri, 18/10/2024 3:15 PM",
      expanded: false,
    },
  ]);

  const toggleDetail = (id: string) => {
    setDetails((prev) =>
      prev.map((d) => (d.id === id ? { ...d, expanded: !d.expanded } : d))
    );
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setShowDetail(true);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Top bar */}
          <header className="flex h-14 items-center justify-between border-b border-border px-3 sm:px-4">
            <h1 className="text-base sm:text-lg font-bold text-foreground truncate">AI Voice Receptionist</h1>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <a
                href="https://vapi.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 border border-primary/20 px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
              >
                <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span className="hidden sm:inline">Powered by</span> Vapi
                <ExternalLink className="h-3 w-3" />
              </a>
              <Button variant="ghost" size="icon" className="relative text-muted-foreground h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
              </Button>
              <div className="ml-1 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                JD
              </div>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden">
            {/* Left panel — Inbox */}
            <div className={`flex w-full md:w-full md:max-w-md flex-col border-r border-border ${showDetail ? "hidden md:flex" : "flex"}`}>
              <div className="flex items-center justify-between px-3 sm:px-4 pt-3 sm:pt-4 pb-2">
                <h2 className="text-lg sm:text-xl font-bold text-foreground">Inbox</h2>
              </div>

              {/* Search + Filter */}
              <div className="flex gap-2 px-3 sm:px-4 pb-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-3.5 w-3.5" /> Filter
                </Button>
              </div>

              {/* Dropdowns row */}
              <div className="flex gap-2 px-3 sm:px-4 pb-3">
                <Button variant="outline" size="sm" className="gap-1 text-xs">
                  All messages <ChevronDown className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm" className="gap-1 text-xs">
                  Newest <ChevronDown className="h-3 w-3" />
                </Button>
              </div>

              <Separator />

              {/* Contact list */}
              <ScrollArea className="flex-1">
                {filteredContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => handleSelectContact(contact)}
                    className={`w-full border-b border-border px-3 sm:px-4 py-3 text-left transition-colors hover:bg-muted/50 ${
                      selectedContact.id === contact.id ? "bg-muted/70" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-semibold text-sm text-foreground truncate">{contact.name}</span>
                        <span className="h-2 w-2 rounded-full bg-info shrink-0" />
                        {contact.priority && (
                          <span className="text-destructive text-xs shrink-0">🚩</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`text-[10px] sm:text-xs font-medium ${statusColor[contact.status]}`}>
                          • {statusLabel[contact.status]}
                        </span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground">{contact.time}</span>
                      </div>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {contact.channels.map((ch) => (
                        <ChannelBadge key={ch.type} type={ch.type} count={ch.count} />
                      ))}
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{contact.summary}</p>
                  </button>
                ))}
              </ScrollArea>
            </div>

            {/* Right panel — Detail */}
            <div className={`flex flex-1 flex-col overflow-hidden ${showDetail ? "flex" : "hidden md:flex"}`}>
              {/* Contact header */}
              <div className="flex items-center justify-between border-b border-border px-3 sm:px-6 py-3 gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden h-8 w-8 shrink-0"
                    onClick={() => setShowDetail(false)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-muted text-xs sm:text-sm font-bold text-foreground shrink-0">
                    {selectedContact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">{selectedContact.name}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                      {selectedContact.email} &nbsp; {selectedContact.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="outline" size="sm" className="gap-1 hidden sm:inline-flex">
                    <User className="h-3.5 w-3.5" /> View Customer
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 hidden sm:inline-flex">
                    <Clock className="h-3.5 w-3.5" /> Set Reminder
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Channel tabs */}
              <div className="flex gap-1 border-b border-border px-3 sm:px-6 py-2 overflow-x-auto">
                {channelTabs.map((tab) => {
                  const channelData = selectedContact.channels.find((c) => c.type === tab.type);
                  const count = channelData?.count || 0;
                  return (
                    <button
                      key={tab.type}
                      onClick={() => setActiveTab(tab.type)}
                      className={`flex items-center gap-1 sm:gap-1.5 rounded-lg px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        activeTab === tab.type
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <tab.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      {tab.label}
                      {count > 0 && (
                        <Badge variant="secondary" className="h-4 min-w-4 px-1 text-[10px]">
                          {count}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Conversation details */}
              <ScrollArea className="flex-1 px-3 sm:px-6 py-4">
                <div className="space-y-3">
                  {details.map((detail) => (
                    <div key={detail.id} className="rounded-xl border border-border bg-card p-3 sm:p-4">
                      <button
                        onClick={() => toggleDetail(detail.id)}
                        className="flex w-full items-start justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <h3 className="font-semibold text-xs sm:text-sm text-foreground truncate">{detail.title}</h3>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium shrink-0 ${detail.tagColor}`}>
                            {detail.tag}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                          <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline">
                            {detail.expanded ? "Hide details" : "View details"}
                          </span>
                          {detail.expanded ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </button>
                      <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">{detail.date}</p>

                      {detail.expanded && (
                        <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
                          {detail.keyPoints && (
                            <div>
                              <p className="text-xs font-semibold text-foreground mb-1">Key Points</p>
                              <ul className="list-disc pl-4 space-y-0.5">
                                {detail.keyPoints.map((point, i) => (
                                  <li key={i} className="text-xs text-muted-foreground">
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {detail.summaryText && (
                            <div>
                              <p className="text-xs font-semibold text-foreground mb-1">Summary</p>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {detail.summaryText}
                              </p>
                            </div>
                          )}

                          {detail.hasAudio && (
                            <div className="flex items-center gap-2 sm:gap-3 rounded-lg border border-border bg-muted/50 px-2 sm:px-3 py-2">
                              <button className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              </button>
                              <div className="flex-1">
                                <div className="flex h-4 items-center gap-px">
                                  {Array.from({ length: 40 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className="w-1 rounded-full bg-muted-foreground/40"
                                      style={{ height: `${4 + Math.random() * 12}px` }}
                                    />
                                  ))}
                                </div>
                              </div>
                              <span className="text-[10px] sm:text-xs text-muted-foreground">
                                0:00 / {detail.audioDuration}
                              </span>
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-1 text-xs">
                              <Calendar className="h-3.5 w-3.5" /> Schedule Job
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs">
                              View transcript
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
