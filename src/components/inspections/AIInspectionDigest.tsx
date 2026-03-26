import { useState } from "react";
import {
  Sparkles, CheckCircle2, AlertTriangle, XCircle, Eye, ThumbsUp,
  ThumbsDown, MessageSquare, RefreshCw, FileText, Send, Clock,
  ChevronDown, ChevronUp, ShieldCheck, Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type Finding = {
  id: string;
  room: string;
  item: string;
  severity: "ok" | "minor" | "major" | "critical";
  aiNote: string;
  confidence: number;
  humanReviewed: boolean;
  humanOverride?: "approved" | "rejected" | "escalated";
  humanComment?: string;
  timestamp: string;
};

const severityConfig = {
  ok: { label: "OK", icon: CheckCircle2, classes: "bg-primary/10 text-primary border-primary/20" },
  minor: { label: "Minor", icon: AlertTriangle, classes: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  major: { label: "Major", icon: AlertTriangle, classes: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
  critical: { label: "Critical", icon: XCircle, classes: "bg-destructive/10 text-destructive border-destructive/20" },
};

const mockFindings: Finding[] = [
  { id: "f1", room: "Front Entry", item: "Front door lock", severity: "ok", aiNote: "Door lock appears functional. No visible damage to hinges or frame. Paint in good condition.", confidence: 95, humanReviewed: true, humanOverride: "approved", timestamp: "00:45" },
  { id: "f2", room: "Front Entry", item: "Garden & pathway", severity: "minor", aiNote: "Garden beds slightly overgrown. Pathway has minor moss build-up — recommend tenant maintenance reminder.", confidence: 82, humanReviewed: true, humanOverride: "approved", humanComment: "Agreed, will send garden maintenance reminder.", timestamp: "01:20" },
  { id: "f3", room: "Living Room", item: "Walls — marks", severity: "minor", aiNote: "Small scuff mark identified on east wall near TV mount area (~15cm). Appears superficial — possibly from furniture.", confidence: 78, humanReviewed: false, timestamp: "03:15" },
  { id: "f4", room: "Kitchen", item: "Sink & tapware", severity: "major", aiNote: "Slow drip detected from hot water tap. Washer likely needs replacement. Recommend maintenance work order.", confidence: 91, humanReviewed: true, humanOverride: "escalated", humanComment: "Raising maintenance request with plumber.", timestamp: "06:40" },
  { id: "f5", room: "Kitchen", item: "Rangehood", severity: "ok", aiNote: "Rangehood filter clean. Fan operational. No grease build-up visible.", confidence: 88, humanReviewed: false, timestamp: "07:55" },
  { id: "f6", room: "Bathroom", item: "Tiles & grout", severity: "critical", aiNote: "Black mould detected in shower grout lines between tiles (approx 30cm area). Potential health hazard — immediate remediation recommended.", confidence: 94, humanReviewed: true, humanOverride: "escalated", humanComment: "Urgent — scheduling mould treatment with specialist.", timestamp: "12:10" },
  { id: "f7", room: "Bathroom", item: "Exhaust fan", severity: "minor", aiNote: "Fan appears noisy — possible bearing wear. Functional but may need replacement within 6 months.", confidence: 72, humanReviewed: false, timestamp: "13:00" },
  { id: "f8", room: "Bedroom 1", item: "Wardrobe doors", severity: "ok", aiNote: "Sliding wardrobe doors operating smoothly. Interior shelf in good condition.", confidence: 90, humanReviewed: false, timestamp: "15:30" },
  { id: "f9", room: "Safety", item: "Smoke alarms", severity: "ok", aiNote: "All 3 smoke alarms tested — audible beep confirmed. Batteries appear recent.", confidence: 96, humanReviewed: true, humanOverride: "approved", timestamp: "19:00" },
  { id: "f10", room: "Laundry", item: "Tub & tapware", severity: "ok", aiNote: "Laundry tub clean and undamaged. Both taps functional. No visible leaks.", confidence: 89, humanReviewed: false, timestamp: "20:30" },
];

export default function AIInspectionDigest() {
  const { toast } = useToast();
  const [findings, setFindings] = useState<Finding[]>(mockFindings);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const reviewed = findings.filter((f) => f.humanReviewed).length;
  const pending = findings.length - reviewed;
  const issues = findings.filter((f) => f.severity !== "ok").length;
  const criticals = findings.filter((f) => f.severity === "critical").length;

  const handleOverride = (id: string, action: "approved" | "rejected" | "escalated") => {
    setFindings((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, humanReviewed: true, humanOverride: action, humanComment: commentInput || f.humanComment }
          : f
      )
    );
    setCommentInput("");
    const labels = { approved: "Approved", rejected: "Rejected", escalated: "Escalated to maintenance" };
    toast({ title: `Finding ${labels[action]}`, description: `Human review recorded for this item.` });
  };

  const handleReprocess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast({ title: "AI Re-analysis Complete", description: "Findings updated with latest inspection data." });
    }, 2000);
  };

  const handleGenerateReport = () => {
    toast({ title: "Report Generated", description: "Inspection report with AI findings and human reviews ready for download." });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Inspection Digest
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              AI analyses inspection footage and flags issues — human reviews before finalising
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs gap-1 h-8" onClick={handleReprocess} disabled={isProcessing}>
              <RefreshCw className={`h-3 w-3 ${isProcessing ? "animate-spin" : ""}`} />
              {isProcessing ? "Processing..." : "Re-analyse"}
            </Button>
            <Button size="sm" className="text-xs gap-1 h-8" onClick={handleGenerateReport}>
              <FileText className="h-3 w-3" /> Generate Report
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline" className="text-xs gap-1">
            <Eye className="h-3 w-3" /> {findings.length} findings
          </Badge>
          <Badge variant="outline" className="text-xs gap-1 bg-primary/10 text-primary border-primary/20">
            <CheckCircle2 className="h-3 w-3" /> {reviewed} reviewed
          </Badge>
          {pending > 0 && (
            <Badge variant="outline" className="text-xs gap-1 bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
              <Clock className="h-3 w-3" /> {pending} pending review
            </Badge>
          )}
          {issues > 0 && (
            <Badge variant="outline" className="text-xs gap-1 bg-orange-500/10 text-orange-600 border-orange-500/20">
              <AlertTriangle className="h-3 w-3" /> {issues} issues
            </Badge>
          )}
          {criticals > 0 && (
            <Badge variant="outline" className="text-xs gap-1 bg-destructive/10 text-destructive border-destructive/20">
              <XCircle className="h-3 w-3" /> {criticals} critical
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {findings.map((f) => {
          const sev = severityConfig[f.severity];
          const SevIcon = sev.icon;
          const isExpanded = expandedId === f.id;

          return (
            <div key={f.id} className="rounded-lg border border-border bg-card">
              <button
                className="w-full flex items-center gap-2 p-3 text-left hover:bg-muted/50 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : f.id)}
              >
                <Badge className={`text-[10px] gap-0.5 shrink-0 ${sev.classes}`}>
                  <SevIcon className="h-3 w-3" /> {sev.label}
                </Badge>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground truncate block">{f.room} — {f.item}</span>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">{f.timestamp}</span>
                <Badge variant="outline" className="text-[9px] shrink-0">
                  {f.confidence}% conf.
                </Badge>
                {f.humanReviewed && (
                  <Badge className="text-[9px] bg-primary/10 text-primary border-primary/20 gap-0.5 shrink-0">
                    <ShieldCheck className="h-3 w-3" />
                    {f.humanOverride === "escalated" ? "Escalated" : f.humanOverride === "rejected" ? "Rejected" : "Approved"}
                  </Badge>
                )}
                {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </button>

              {isExpanded && (
                <div className="px-3 pb-3 space-y-3 border-t border-border pt-3">
                  {/* AI note */}
                  <div className="rounded-md bg-muted/50 p-3">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> AI Analysis
                    </p>
                    <p className="text-xs text-foreground">{f.aiNote}</p>
                  </div>

                  {/* Human comment if exists */}
                  {f.humanComment && (
                    <div className="rounded-md bg-primary/5 border border-primary/10 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-primary mb-1 flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" /> PM Comment
                      </p>
                      <p className="text-xs text-foreground">{f.humanComment}</p>
                    </div>
                  )}

                  {/* HITL controls */}
                  {!f.humanReviewed && (
                    <div className="space-y-2">
                      <Textarea
                        value={expandedId === f.id ? commentInput : ""}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Add PM comment or override reason (optional)..."
                        className="text-xs min-h-[40px] resize-none"
                      />
                      <div className="flex items-center gap-2 flex-wrap">
                        <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={() => handleOverride(f.id, "approved")}>
                          <ThumbsUp className="h-3 w-3" /> Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={() => handleOverride(f.id, "rejected")}>
                          <ThumbsDown className="h-3 w-3" /> Reject
                        </Button>
                        <Button size="sm" className="text-xs h-7 gap-1" onClick={() => handleOverride(f.id, "escalated")}>
                          <Wrench className="h-3 w-3" /> Escalate to Maintenance
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
