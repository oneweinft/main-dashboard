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
  { title: "Tasks", icon: Clock },
  { title: "Compliance", icon: Shield },
  { title: "Reports", icon: BarChart3 },
  { title: "Inspections", icon: ListChecks, url: "/inspections" },
  { title: "Contacts", icon: Users },
  { title: "Integrations", icon: Link2 },
  { title: "Documents", icon: FileText, url: "/documents" },
  { title: "Properties", icon: Building2 },
  { title: "Tenancies", icon: Key },
  { title: "Financials", icon: DollarSign },
  { title: "Maintenance", icon: Wrench },
  { title: "Renter Onboarding", icon: UserPlus },
  { title: "Migration", icon: ArrowRightLeft },
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
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary">
            <Building2 className="h-5 w-5 text-sidebar-primary-foreground" />
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
                    className={`text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground ${
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
            <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider">
              Portals
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {portalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => item.url !== "#" && navigate(item.url)}
                    className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
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
                  <SidebarMenuButton className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground">
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
