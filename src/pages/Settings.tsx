import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Settings as SettingsIcon, Shield, Users, Bell, Palette, Globe,
  Lock, Database, Mail, CreditCard, FileText, ChevronRight,
} from "lucide-react";
import { CompanyProfileSheet } from "@/components/settings/CompanyProfileSheet";
import { NotificationsSheet } from "@/components/settings/NotificationsSheet";
import { AppearanceSheet } from "@/components/settings/AppearanceSheet";
import { AuthenticationSheet } from "@/components/settings/AuthenticationSheet";

type SheetId = "company" | "notifications" | "appearance" | "authentication" | null;

const Settings = () => {
  const navigate = useNavigate();
  const [activeSheet, setActiveSheet] = useState<SheetId>(null);

  const settingsSections = [
    {
      title: "General",
      items: [
        { name: "Company Profile", description: "Business name, ABN, address, and branding", icon: Globe, sheet: "company" as SheetId },
        { name: "Notifications", description: "Email, SMS, and in-app notification preferences", icon: Bell, sheet: "notifications" as SheetId },
        { name: "Appearance", description: "Theme, colours, and dashboard layout", icon: Palette, sheet: "appearance" as SheetId },
      ],
    },
    {
      title: "Security & Compliance",
      items: [
        { name: "SOC 2 Compliance Checklist", description: "Track security controls, access policies, and audit requirements", icon: Shield, url: "/soc2-checklist", badge: "76%" },
        { name: "Access & Permissions", description: "User roles, team members, and permission groups", icon: Lock },
        { name: "Authentication", description: "MFA, SSO, password policies, and session settings", icon: Users, sheet: "authentication" as SheetId },
      ],
    },
    {
      title: "Data & Integrations",
      items: [
        { name: "Database & Storage", description: "Backup schedules, retention policies, and data exports", icon: Database },
        { name: "Integrations", description: "API connections, webhooks, and third-party services", icon: Globe, url: "/integrations" },
        { name: "Email Templates", description: "Customise automated emails for tenants and owners", icon: Mail },
      ],
    },
    {
      title: "Billing",
      items: [
        { name: "Subscription & Billing", description: "Plan details, invoices, and payment methods", icon: CreditCard },
        { name: "Audit Log", description: "View all system activity and changes", icon: FileText },
      ],
    },
  ];

  const handleItemClick = (item: { url?: string; sheet?: SheetId }) => {
    if (item.sheet) {
      setActiveSheet(item.sheet);
    } else if (item.url) {
      navigate(item.url);
    }
  };

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
                        onClick={() => handleItemClick(item)}
                      >
                        <CardContent className="flex items-center gap-4 p-4">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-foreground">{item.name}</p>
                              {"badge" in item && item.badge && (
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

      {/* Setting Sheets */}
      <CompanyProfileSheet open={activeSheet === "company"} onOpenChange={(open) => !open && setActiveSheet(null)} />
      <NotificationsSheet open={activeSheet === "notifications"} onOpenChange={(open) => !open && setActiveSheet(null)} />
      <AppearanceSheet open={activeSheet === "appearance"} onOpenChange={(open) => !open && setActiveSheet(null)} />
      <AuthenticationSheet open={activeSheet === "authentication"} onOpenChange={(open) => !open && setActiveSheet(null)} />
    </SidebarProvider>
  );
};

export default Settings;
