import { useState } from "react";
import { Upload, Code, Download, FileArchive, FileText, FileSpreadsheet, Shield, Brain, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: "120K+", label: "Properties Migrated" },
  { value: "1,800+", label: "Agents Onboarded" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "<30s", label: "Avg. Process Time" },
];

const uploadTypes = [
  { icon: FileArchive, title: "ZIP Archive", desc: "Drag & drop ZIP files here" },
  { icon: FileText, title: "PDF Documents", desc: "Drag & drop PDF files here" },
  { icon: FileSpreadsheet, title: "CSV Spreadsheet", desc: "Drag & drop CSV files here" },
];

const features = [
  { icon: Shield, title: "Secure Transfer", desc: "AES-256 encryption and TLS 1.3 in transit." },
  { icon: Brain, title: "AI Auto-Parsing", desc: "Automatically maps property fields from any format." },
  { icon: Zap, title: "Fast Processing", desc: "Migrations complete in under 30 seconds." },
];

const tabs = [
  { id: "upload", label: "File Upload", icon: Upload },
  { id: "api", label: "API", icon: Code },
  { id: "export", label: "Agent Export", icon: Download },
];

const Migration = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <Upload className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">
              Agent <span className="text-primary">Upload Hub</span>
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <span className="cursor-pointer hover:text-foreground transition-colors">Upload</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">API</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Agent Export</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Docs</span>
          </nav>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Contact Support
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6 text-center bg-gradient-to-b from-secondary to-background">
        <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
          <Zap className="h-3 w-3 mr-1" /> Agent Upload Hub
        </Badge>
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
          Upload Your Property Data<br />
          to <span className="text-primary">OnlyAiRentals</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
          Import listings from any Australian platform. Supports ZIP archives, PDF documents, CSV exports and direct API integration with enterprise-grade security.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6">
            <Upload className="h-4 w-4 mr-2" /> Start Migration
          </Button>
          <Button variant="outline" className="border-border">
            <Code className="h-4 w-4 mr-2" /> API Documentation
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 mt-12 max-w-3xl mx-auto">
          {stats.map((s) => (
            <Card key={s.label} className="flex-1 min-w-[140px] p-4 text-center border-border bg-card">
              <p className="text-2xl font-extrabold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Tabs + Upload Section */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1 w-fit mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === t.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        {activeTab === "upload" && (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {uploadTypes.map((u) => (
                <Card
                  key={u.title}
                  className="border-2 border-dashed border-border hover:border-primary/50 transition-colors p-8 flex flex-col items-center text-center cursor-pointer group"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <u.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{u.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{u.desc}</p>
                  <Button variant="outline" size="sm" className="border-border">
                    Browse Files
                  </Button>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((f) => (
                <Card key={f.title} className="p-5 flex items-start gap-4 border-border bg-card">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{f.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeTab === "api" && (
          <Card className="p-8 border-border bg-card">
            <h3 className="text-lg font-semibold text-foreground mb-3">API Integration</h3>
            <p className="text-muted-foreground mb-4">Connect directly via REST API for automated property data imports.</p>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm text-foreground">
              <p className="text-muted-foreground mb-2"># Example request</p>
              <p>curl -X POST https://api.onlyairentals.com/v1/migrate \</p>
              <p className="ml-4">-H "Authorization: Bearer YOUR_API_KEY" \</p>
              <p className="ml-4">-F "file=@properties.csv"</p>
            </div>
          </Card>
        )}

        {activeTab === "export" && (
          <Card className="p-8 border-border bg-card">
            <h3 className="text-lg font-semibold text-foreground mb-3">Agent Export</h3>
            <p className="text-muted-foreground mb-4">Export your agent profile and property portfolio as a downloadable package.</p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="h-4 w-4 mr-2" /> Export Agent Data
            </Button>
          </Card>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
              <Upload className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground text-sm">OnlyAiRentals</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 OnlyAiRentals. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="cursor-pointer hover:text-foreground">Privacy</span>
            <span className="cursor-pointer hover:text-foreground">Terms</span>
            <span className="cursor-pointer hover:text-foreground">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Migration;
