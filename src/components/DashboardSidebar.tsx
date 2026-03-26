import {
  Home,
  Clock,
  Shield,
  BarChart3,
  ListChecks,
  Users,
  Link2,
  FileText,
  Building2,
  Key,
  DollarSign,
  Settings,
  Wrench,
  HelpCircle,
  Briefcase,
  Bot,
  UserPlus,
  ArrowRightLeft,
  Phone,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

const mainItems = [
  { title: "Dashboard", icon: Home, active: true, url: "/" },
  { title: "Tasks", icon: Clock, url: "/tasks" },
  { title: "Compliance", icon: Shield, url: "/compliance" },
  { title: "Reports", icon: BarChart3, url: "/reports" },
  { title: "Inspections", icon: ListChecks, url: "/inspections" },
  { title: "Contacts", icon: Users, url: "/contacts" },
  { title: "Integrations", icon: Link2 },
  { title: "Documents", icon: FileText, url: "/documents" },
  { title: "Properties", icon: Building2 },
  { title: "Tenancies", icon: Key },
  { title: "Financials", icon: DollarSign },
  { title: "Maintenance", icon: Wrench, url: "/maintenance" },
  { title: "Onboarding", icon: UserPlus, url: "/onboarding" },
  { title: "Migration", icon: ArrowRightLeft, url: "/migration" },
  { title: "AI Voice Receptionist", icon: Phone, url: "/ai-receptionist" },
];

const portalItems = [
  { title: "Services Portal", icon: Briefcase, url: "/services-portal" },
  { title: "AI Personal Assistant", icon: Bot, url: "/ai-assistant" },
];

const bottomItems = [
  { title: "Settings", icon: Settings },
  { title: "Help", icon: HelpCircle },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarContent className="bg-sidebar pt-4">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 pb-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-sidebar-foreground">
              PM Dashboard
            </span>
          )}
        </div>

        {/* Main nav */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => item.url && navigate(item.url)}
                    className={`text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground ${
                      item.active
                        ? "bg-sidebar-accent text-sidebar-foreground font-semibold"
                        : ""
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Portals */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-sidebar-foreground/40 text-xs uppercase tracking-wider">
              Portals
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {portalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => item.url !== "#" && navigate(item.url)}
                    className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground">
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
