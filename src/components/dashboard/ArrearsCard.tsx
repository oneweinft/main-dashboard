import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const arrearsData = [
  { label: "Phone Calls", value: 45, color: "bg-primary" },
  { label: "Letters", value: 30, color: "bg-accent" },
  { label: "Arrear Notices", value: 60, color: "bg-warning" },
  { label: "Court", value: 15, color: "bg-destructive" },
  { label: "Payment Plans", value: 70, color: "bg-accent" },
  { label: "Invoice Notices", value: 40, color: "bg-info" },
];

export function ArrearsCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-primary text-base font-bold">Arrears</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {arrearsData.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium text-foreground">{item.value}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}

        <div className="flex items-center gap-2 pt-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="text-xs text-muted-foreground">Completed</span>
        </div>
      </CardContent>
    </Card>
  );
}
