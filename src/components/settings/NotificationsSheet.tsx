import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NotificationsSheet = ({ open, onOpenChange }: NotificationsSheetProps) => {
  const { toast } = useToast();
  const [prefs, setPrefs] = useState({
    emailNewLead: true,
    emailMaintenance: true,
    emailRentOverdue: true,
    emailLeaseExpiry: true,
    smsUrgentMaintenance: true,
    smsRentOverdue: false,
    smsInspectionReminder: true,
    inAppAll: true,
    inAppTasks: true,
    inAppMessages: true,
  });

  const toggle = (key: keyof typeof prefs) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const handleSave = () => {
    toast({ title: "Preferences saved", description: "Notification settings updated." });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-foreground">Notifications</SheetTitle>
          <SheetDescription>Manage how you receive alerts and updates</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 pb-6">
          {/* Email */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Email Notifications</h3>
            {[
              { key: "emailNewLead" as const, label: "New enquiries & leads" },
              { key: "emailMaintenance" as const, label: "Maintenance requests" },
              { key: "emailRentOverdue" as const, label: "Rent overdue alerts" },
              { key: "emailLeaseExpiry" as const, label: "Lease expiry reminders" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-1">
                <Label className="text-sm text-foreground cursor-pointer">{item.label}</Label>
                <Switch checked={prefs[item.key]} onCheckedChange={() => toggle(item.key)} />
              </div>
            ))}
          </div>

          <Separator />

          {/* SMS */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">SMS Notifications</h3>
            {[
              { key: "smsUrgentMaintenance" as const, label: "Urgent maintenance" },
              { key: "smsRentOverdue" as const, label: "Rent overdue" },
              { key: "smsInspectionReminder" as const, label: "Inspection reminders" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-1">
                <Label className="text-sm text-foreground cursor-pointer">{item.label}</Label>
                <Switch checked={prefs[item.key]} onCheckedChange={() => toggle(item.key)} />
              </div>
            ))}
          </div>

          <Separator />

          {/* In-App */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">In-App Notifications</h3>
            {[
              { key: "inAppAll" as const, label: "All notifications" },
              { key: "inAppTasks" as const, label: "Task assignments" },
              { key: "inAppMessages" as const, label: "New messages" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-1">
                <Label className="text-sm text-foreground cursor-pointer">{item.label}</Label>
                <Switch checked={prefs[item.key]} onCheckedChange={() => toggle(item.key)} />
              </div>
            ))}
          </div>

          <Button onClick={handleSave} className="w-full gap-2">
            <Save className="h-4 w-4" /> Save Preferences
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
