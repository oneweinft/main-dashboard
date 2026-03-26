import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { QuickCards } from "@/components/dashboard/QuickCards";
import { PropertiesCard } from "@/components/dashboard/PropertiesCard";
import { ApplicationsCard } from "@/components/dashboard/ApplicationsCard";
import { ComplianceCard } from "@/components/dashboard/ComplianceCard";
import { ArrearsCard } from "@/components/dashboard/ArrearsCard";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-6">
                <QuickCards />
                <PropertiesCard />
                <ApplicationsCard />
              </div>
              {/* Right column */}
              <div className="space-y-6">
                <ComplianceCard />
                <ArrearsCard />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
