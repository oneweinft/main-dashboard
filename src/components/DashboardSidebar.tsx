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
  CheckSquare,
  Settings,
  Wrench,
  HelpCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", icon: Home, active: true },
  { title: "Tasks", icon: Clock },
  { title: "Compliance", icon: Shield },
  { title: "Reports", icon: BarChart3 },
  { title: "Inspections", icon: ListChecks },
  { title: "Contacts", icon: Users },
  { title: "Integrations", icon: Link2 },
  { title: "Documents", icon: FileText },
  { title: "Properties", icon: Building2 },
  { title: "Tenancies", icon: Key },
  { title: "Financials", icon: DollarSign },
  { title: "Approvals", icon: CheckSquare },
  { title: "Settings", icon: Settings },
  { title: "Maintenance", icon: Wrench },
  { title: "Help", icon: HelpCircle },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

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
              OurProperty
            </span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
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
      </SidebarContent>
    </Sidebar>
  );
}
