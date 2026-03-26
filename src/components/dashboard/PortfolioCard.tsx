import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function PortfolioCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-primary text-base font-bold">Portfolio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-foreground">5</span>
            <span className="text-sm text-muted-foreground">Lost/Gained January</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full w-3/4 rounded-full bg-accent" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3 text-accent" />
              <span className="text-xl font-bold text-foreground">11</span>
            </div>
            <span className="text-xs text-muted-foreground">Gained</span>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1">
              <Minus className="h-3 w-3 text-muted-foreground" />
              <span className="text-xl font-bold text-foreground">0</span>
            </div>
            <span className="text-xs text-muted-foreground">Avoidable loss</span>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1">
              <TrendingDown className="h-3 w-3 text-destructive" />
              <span className="text-xl font-bold text-foreground">6</span>
            </div>
            <span className="text-xs text-muted-foreground">Unavoidable loss</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
