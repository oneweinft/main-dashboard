import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DonutChart({ value, max, label, sublabel, color }: { value: number; max: number; label: string; sublabel: string; color: string }) {
  const pct = (value / max) * 100;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-24">
        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="40" fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-extrabold text-foreground">{value}</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-semibold text-foreground">{label}</span>
      <span className="text-xs text-destructive">{sublabel}</span>
    </div>
  );
}

export function ComplianceCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-primary text-base font-bold">Compliance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <DonutChart value={273} max={300} label="Smoke Alarm" sublabel="No Certificate" color="hsl(262, 72%, 55%)" />
          <DonutChart value={2} max={300} label="Pool Safety" sublabel="Exp. Certificate" color="hsl(145, 63%, 49%)" />
        </div>
      </CardContent>
    </Card>
  );
}
