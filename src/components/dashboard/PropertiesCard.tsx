import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useData } from "@/context/DataContext";

const periods = ["1m", "3m", "6m", "YTD", "1y", "All"];

export function PropertiesCard() {
  const { properties } = useData();
  const total = properties.length;

  const data = [
    { date: "9 Dec", properties: Math.max(total - 4, 0) },
    { date: "16 Dec", properties: Math.max(total - 3, 0) },
    { date: "23 Dec", properties: Math.max(total - 2, 0) },
    { date: "30 Dec", properties: Math.max(total - 1, 0) },
    { date: "6 Jan", properties: total },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary text-base font-bold">Properties</CardTitle>
          <div className="flex gap-1">
            {periods.map((p) => (
              <button
                key={p}
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                  p === "1m"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-2xl font-extrabold text-foreground">{total}</span>
          <span className="text-sm text-muted-foreground">Total Active</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[140px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                  color: "hsl(var(--foreground))",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="properties" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
