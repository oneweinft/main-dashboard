import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ApplicationsCard() {
  return (
    <Card>
      <CardHeader className="pb-3 px-3 sm:px-6">
        <CardTitle className="text-primary text-sm sm:text-base font-bold">Applications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-3 sm:px-6">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-extrabold text-foreground">137</span>
            <span className="text-xs sm:text-sm text-muted-foreground">New Applications</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full w-full rounded-full bg-accent" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div>
            <span className="text-lg sm:text-xl font-bold text-foreground">36</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-[10px] sm:text-xs text-muted-foreground">Returned Refs</span>
            </div>
          </div>
          <div>
            <span className="text-lg sm:text-xl font-bold text-foreground">0</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-info" />
              <span className="text-[10px] sm:text-xs text-muted-foreground">Pending LL</span>
            </div>
          </div>
          <div>
            <span className="text-lg sm:text-xl font-bold text-foreground">0</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-warning" />
              <span className="text-[10px] sm:text-xs text-muted-foreground">Pending TT</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-3">
          <CardTitle className="text-primary text-sm sm:text-base font-bold mb-2">New Lease</CardTitle>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-extrabold text-foreground">1</span>
            <span className="text-xs sm:text-sm text-muted-foreground">Pending Review</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full w-1/3 rounded-full bg-warning" />
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center mt-3">
            <div>
              <span className="text-base sm:text-lg font-bold text-foreground">0</span>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <span className="h-2 w-2 rounded-full bg-info" />
                <span className="text-[10px] sm:text-xs text-muted-foreground">Pending Bond</span>
              </div>
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-foreground">48</span>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-[10px] sm:text-xs text-muted-foreground">Pending Deposit</span>
              </div>
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-foreground">1</span>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-[10px] sm:text-xs text-muted-foreground">Pending Signature</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
