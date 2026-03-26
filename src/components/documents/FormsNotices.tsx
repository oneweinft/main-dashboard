import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Eye, Mail, Phone } from "lucide-react";

const formOptions = [
  "Change of PM/Owner (Form 5)",
  "Entry Notice (Form 9)",
  "Notice of lessor's intention to sell premises (Form 10)",
  "NTRB (Form 11)",
  "Notice to Leave (Form 12)",
  "Abandonment termination (Form 15)",
  "Sales Appraisal Form",
];

const tenants = [
  { name: "John Doe", email: "johndoe@gmail.com", phone: "0400 000 000" },
  { name: "Jane Doe", email: "janedoe@gmail.com", phone: "0400 000 000" },
  { name: "Jonny Doe", email: "jonnydoe@gmail.com", phone: "0400 000 000" },
];

const FormsNotices = () => {
  const [selectedProperty, setSelectedProperty] = useState("");
  const [ccEmail, setCcEmail] = useState("");
  const [selectedForm, setSelectedForm] = useState("");
  const [tenantFilter, setTenantFilter] = useState("current");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-primary italic">Forms/Notices</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Form Fields */}
        <div className="space-y-5">
          {/* Property */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">Property *</label>
            <div className="border border-primary/30 rounded-lg p-3 space-y-2">
              <Input
                placeholder="Select Property..."
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className="border-border"
              />
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-secondary/50 rounded-md px-3 py-2 text-sm text-foreground border border-border">
                  25 Kings Landing Parade, QUEENSLAND, 4000
                </div>
                <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* CC Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">CC Email</label>
            <Input
              placeholder="Enter CC Email Address"
              value={ccEmail}
              onChange={(e) => setCcEmail(e.target.value)}
              className="border-border"
            />
          </div>

          {/* Form/Notice */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">Form/Notice</label>
            <Select value={selectedForm} onValueChange={setSelectedForm}>
              <SelectTrigger className="border-border">
                <SelectValue placeholder="Select Form/Notice" />
              </SelectTrigger>
              <SelectContent>
                {formOptions.map((form) => (
                  <SelectItem key={form} value={form}>{form}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right Column - Tenants */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-foreground">Tenant(s)</label>
            <Select value={tenantFilter} onValueChange={setTenantFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="past">Past</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {tenants.map((tenant) => (
              <div
                key={tenant.email}
                className="flex items-center justify-between bg-muted/60 rounded-lg px-4 py-3 border border-border"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{tenant.name}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" /> {tenant.email}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" /> {tenant.phone}
                </span>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full text-primary border-primary/30 hover:bg-primary/10">
            <Eye className="h-4 w-4 mr-2" /> View
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" className="px-6">Preview</Button>
        <Button className="px-6 bg-primary hover:bg-primary/90">Send</Button>
        <Button variant="secondary" className="px-6">Print</Button>
      </div>
    </div>
  );
};

export default FormsNotices;
