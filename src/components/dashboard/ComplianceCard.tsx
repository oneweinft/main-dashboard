import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DonutChart({ value, max, label, sublabel, color }: { value: number; max: number; label: string; sublabel: string; color: string }) {
  const pct = (value / max) * 100;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-20 w-20 sm:h-24 sm:w-24">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
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
          <span className="text-lg sm:text-xl font-extrabold text-foreground">{value}</span>
        </div>
      </div>
      <span className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-semibold text-foreground">{label}</span>
      <span className="text-[10px] sm:text-xs text-destructive">{sublabel}</span>
    </div>
  );
}

export function ComplianceCard() {
  return (
    <Card>
      <CardHeader className="pb-3 px-3 sm:px-6">
        <CardTitle className="text-primary text-sm sm:text-base font-bold">Compliance</CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <DonutChart value={273} max={300} label="Smoke Alarm" sublabel="No Certificate" color="hsl(var(--primary))" />
          <DonutChart value={2} max={300} label="Pool Safety" sublabel="Exp. Certificate" color="hsl(var(--info))" />
        </div>
      </CardContent>
    </Card>
  );
}
