import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Save, ShieldCheck, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthenticationSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthenticationSheet = ({ open, onOpenChange }: AuthenticationSheetProps) => {
  const { toast } = useToast();
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [ssoEnabled, setSsoEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("60");
  const [passwordMinLength, setPasswordMinLength] = useState("8");

  const handleSave = () => {
    toast({ title: "Security saved", description: "Authentication settings have been updated." });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-foreground">Authentication</SheetTitle>
          <SheetDescription>Manage MFA, SSO, and session security</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 pb-6">
          {/* MFA */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Smartphone className="h-4 w-4 text-primary" />
              </div>
              <div>
                <Label className="text-foreground">Multi-Factor Authentication</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Require MFA for all team members</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {mfaEnabled && <Badge className="bg-green-500/15 text-green-600 border-green-500/20 text-xs">Active</Badge>}
              <Switch checked={mfaEnabled} onCheckedChange={setMfaEnabled} />
            </div>
          </div>

          <Separator />

          {/* SSO */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
              </div>
              <div>
                <Label className="text-foreground">Single Sign-On (SSO)</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Enable Google or Microsoft SSO</p>
              </div>
            </div>
            <Switch checked={ssoEnabled} onCheckedChange={setSsoEnabled} />
          </div>

          <Separator />

          {/* Password Policy */}
          <div className="space-y-2">
            <Label className="text-foreground">Minimum Password Length</Label>
            <Select value={passwordMinLength} onValueChange={setPasswordMinLength}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8">8 characters</SelectItem>
                <SelectItem value="10">10 characters</SelectItem>
                <SelectItem value="12">12 characters</SelectItem>
                <SelectItem value="16">16 characters</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Session Timeout */}
          <div className="space-y-2">
            <Label className="text-foreground">Session Timeout</Label>
            <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="480">8 hours</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Automatically log out after inactivity</p>
          </div>

          <Button onClick={handleSave} className="w-full gap-2">
            <Save className="h-4 w-4" /> Save Security Settings
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
