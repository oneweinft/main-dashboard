import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Settings as SettingsIcon, Shield, Users, Bell, Palette, Globe,
  Lock, Database, Mail, CreditCard, FileText, ChevronRight,
} from "lucide-react";

const settingsSections = [
  {
    title: "General",
    items: [
      { name: "Company Profile", description: "Business name, ABN, address, and branding", icon: Globe, url: "#" },
      { name: "Notifications", description: "Email, SMS, and in-app notification preferences", icon: Bell, url: "#" },
      { name: "Appearance", description: "Theme, colours, and dashboard layout", icon: Palette, url: "#" },
    ],
  },
  {
    title: "Security & Compliance",
    items: [
      { name: "SOC 2 Compliance Checklist", description: "Track security controls, access policies, and audit requirements", icon: Shield, url: "/soc2-checklist", badge: "76%" },
      { name: "Access & Permissions", description: "User roles, team members, and permission groups", icon: Lock, url: "#" },
      { name: "Authentication", description: "MFA, SSO, password policies, and session settings", icon: Users, url: "#" },
    ],
  },
  {
    title: "Data & Integrations",
    items: [
      { name: "Database & Storage", description: "Backup schedules, retention policies, and data exports", icon: Database, url: "#" },
      { name: "Integrations", description: "API connections, webhooks, and third-party services", icon: Globe, url: "/integrations" },
      { name: "Email Templates", description: "Customise automated emails for tenants and owners", icon: Mail, url: "#" },
    ],
  },
  {
    title: "Billing",
    items: [
      { name: "Subscription & Billing", description: "Plan details, invoices, and payment methods", icon: CreditCard, url: "#" },
      { name: "Audit Log", description: "View all system activity and changes", icon: FileText, url: "#" },
    ],
  },
];

const Settings = () => {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
            <div className="space-y-6 max-w-4xl">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                  <SettingsIcon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground">Settings</h1>
                  <p className="text-sm text-muted-foreground">Manage your account, security, and preferences</p>
                </div>
              </div>

              {/* Sections */}
              {settingsSections.map((section) => (
                <div key={section.title} className="space-y-3">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{section.title}</h2>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <Card
                        key={item.name}
                        className="border-border hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => item.url !== "#" && navigate(item.url)}
                      >
                        <CardContent className="flex items-center gap-4 p-4">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-foreground">{item.name}</p>
                              {item.badge && (
                                <Badge variant="outline" className="bg-primary/15 text-primary border-primary/20 text-xs">
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
