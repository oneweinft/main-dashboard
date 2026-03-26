import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, UserCheck, BarChart3, MessageSquare } from "lucide-react";
import { useData } from "@/context/DataContext";

export function QuickCards() {
  const { properties, contacts, transactions } = useData();

  const cards = [
    { title: "Properties", icon: ShieldCheck, value: properties.length, subtitle: "In portfolio" },
    { title: "Contacts", icon: UserCheck, value: contacts.length, subtitle: "Active contacts" },
    { title: "Transactions", icon: BarChart3, value: transactions.length, subtitle: "Recorded" },
    { title: "Revenue", icon: MessageSquare, value: `$${transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0).toLocaleString()}`, subtitle: "Total income" },
  ];

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
