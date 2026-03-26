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
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
            {/* Mobile: single column, Tablet: 2 cols, Desktop: 3 cols */}
            <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* Main content — spans 2 cols on desktop */}
              <div className="md:col-span-2 lg:col-span-2 space-y-4 sm:space-y-5 md:space-y-6">
                <QuickCards />
                <PropertiesCard />
                <ApplicationsCard />
              </div>
              {/* Sidebar content — full width on mobile/tablet, side col on desktop */}
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
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
