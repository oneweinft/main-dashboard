import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Sun, Moon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppearanceSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AppearanceSheet = ({ open, onOpenChange }: AppearanceSheetProps) => {
  const { toast } = useToast();
  const [theme, setTheme] = useState("light");
  const [compactMode, setCompactMode] = useState(false);
  const [defaultPage, setDefaultPage] = useState("dashboard");

  const handleSave = () => {
    toast({ title: "Appearance saved", description: "Your display preferences have been updated." });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-foreground">Appearance</SheetTitle>
          <SheetDescription>Customise the look and feel of your dashboard</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 pb-6">
          {/* Theme */}
          <div className="space-y-3">
            <Label className="text-foreground">Theme</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme("light")}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors ${theme === "light" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
              >
                <Sun className="h-6 w-6 text-foreground" />
                <span className="text-sm font-medium text-foreground">Light</span>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors ${theme === "dark" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
              >
                <Moon className="h-6 w-6 text-foreground" />
                <span className="text-sm font-medium text-foreground">Dark</span>
              </button>
            </div>
          </div>

          {/* Default Landing Page */}
          <div className="space-y-2">
            <Label className="text-foreground">Default Landing Page</Label>
            <Select value={defaultPage} onValueChange={setDefaultPage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dashboard">Dashboard</SelectItem>
                <SelectItem value="properties">Properties</SelectItem>
                <SelectItem value="tasks">Tasks</SelectItem>
                <SelectItem value="contacts">Contacts</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Compact Mode */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground">Compact Mode</Label>
              <p className="text-xs text-muted-foreground">Reduce spacing for denser layouts</p>
            </div>
            <Switch checked={compactMode} onCheckedChange={setCompactMode} />
          </div>

          <Button onClick={handleSave} className="w-full gap-2">
            <Save className="h-4 w-4" /> Save Appearance
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
