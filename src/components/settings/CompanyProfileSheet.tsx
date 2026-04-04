import { useState, useRef } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Upload, Building2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompanyProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CompanyProfileSheet = ({ open, onOpenChange }: CompanyProfileSheetProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    companyName: "PropManager Co.",
    abn: "12 345 678 901",
    phone: "+61 3 9000 1234",
    email: "admin@propmanager.com.au",
    address: "123 Collins Street",
    city: "Melbourne",
    state: "VIC",
    postcode: "3000",
    website: "https://propmanager.com.au",
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File too large", description: "Logo must be under 5MB", variant: "destructive" });
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    toast({ title: "Profile saved", description: "Company profile has been updated successfully." });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-foreground">Company Profile</SheetTitle>
          <SheetDescription>Update your business details and branding</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 pb-6">
          {/* Logo Upload */}
          <div className="space-y-2">
            <Label className="text-foreground">Company Logo</Label>
            <div className="flex items-center gap-4">
              <div
                className="h-20 w-20 rounded-xl border-2 border-dashed border-border bg-muted/50 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors overflow-hidden"
                onClick={() => fileInputRef.current?.click()}
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="h-full w-full object-cover rounded-xl" />
                ) : (
                  <Building2 className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-1.5">
                  <Upload className="h-3.5 w-3.5" /> Upload Logo
                </Button>
                <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </div>
          </div>

          {/* Business Details */}
          <div className="space-y-3">
            <Label htmlFor="companyName" className="text-foreground">Business Name</Label>
            <Input id="companyName" value={profile.companyName} onChange={(e) => setProfile({ ...profile, companyName: e.target.value })} />
          </div>

          <div className="space-y-3">
            <Label htmlFor="abn" className="text-foreground">ABN</Label>
            <Input id="abn" value={profile.abn} onChange={(e) => setProfile({ ...profile, abn: e.target.value })} placeholder="XX XXX XXX XXX" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">Phone</Label>
              <Input id="phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="address" className="text-foreground">Street Address</Label>
            <Input id="address" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-foreground">City</Label>
              <Input id="city" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state" className="text-foreground">State</Label>
              <Input id="state" value={profile.state} onChange={(e) => setProfile({ ...profile, state: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postcode" className="text-foreground">Postcode</Label>
              <Input id="postcode" value={profile.postcode} onChange={(e) => setProfile({ ...profile, postcode: e.target.value })} />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="website" className="text-foreground">Website</Label>
            <Input id="website" value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} />
          </div>

          <Button onClick={handleSave} className="w-full gap-2">
            <Save className="h-4 w-4" /> Save Profile
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
