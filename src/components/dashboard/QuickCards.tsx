import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, UserCheck, BarChart3, MessageSquare } from "lucide-react";

const cards = [
  { title: "Application Compliance", icon: ShieldCheck, value: 24, subtitle: "Pending review" },
  { title: "Application Verification", icon: UserCheck, value: 18, subtitle: "In progress" },
  { title: "Application Scoring", icon: BarChart3, value: 42, subtitle: "Scored this month" },
  { title: "Communication", icon: MessageSquare, value: 7, subtitle: "Unread messages" },
];

export function QuickCards() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <card.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-tight">{card.title}</p>
              <p className="text-2xl font-extrabold text-foreground mt-1">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.subtitle}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
