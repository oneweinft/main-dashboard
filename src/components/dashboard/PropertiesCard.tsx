import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { date: "9 Dec", properties: 2380 },
  { date: "16 Dec", properties: 2395 },
  { date: "23 Dec", properties: 2390 },
  { date: "30 Dec", properties: 2400 },
  { date: "6 Jan", properties: 2404 },
];

const periods = ["1m", "3m", "6m", "YTD", "1y", "All"];

export function PropertiesCard() {
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
          <span className="text-2xl font-extrabold text-foreground">2404</span>
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
                tick={{ fontSize: 11, fill: "hsl(160, 20%, 55%)" }}
              />
              <YAxis hide domain={["dataMin - 30", "dataMax + 10"]} />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid hsl(180, 10%, 18%)",
                  background: "hsl(180, 10%, 10%)",
                  color: "hsl(160, 30%, 90%)",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="properties" fill="hsl(160, 80%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
