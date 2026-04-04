import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useState } from "react";
import { Search, Download, Trash2, Eye, X } from "lucide-react";
import FormsNotices from "@/components/documents/FormsNotices";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const categories = [
  "All Categories", "Bond", "Agent Transfer", "Bond Claim", "Bond Lodgement",
  "Break Lease", "Refund", "Tenant Transfer", "Calendar Reminder",
  "Cleaning List", "Entry", "Pre-vacate", "Re-inspect", "Routine", "Warranty",
  "Compliance", "Blind Compliance Cert", "Disclosure Standards", "Electrical",
];

const documents = [
  { id: "20549462", date: "20549462", title: "Document", category: "Bond Bond Lodgement", user: "Mark Cruwthir.", },
  { id: "20549463", date: "20549462", title: "Landlord Lease Agreement Document", category: "Tenancy Agreement", user: "Mark Cruwthir.", },
  { id: "20549464", date: "20549462", title: "Landlords Insurance", category: "Insurance Insurance Docs", user: "Mark Cruwthir.", },
  { id: "20549465", date: "20549462", title: "Landlord Lease Agreement Document", category: "Tenancy Agreement", user: "Mark Cruwthir.", },
  { id: "20549466", date: "20549462", title: "Land Valuation 03/23", category: "Landlord Property Evaluation", user: "Mark Cruwthir.", },
  { id: "20549467", date: "20549462", title: "Landlord Lease Agreement Document", category: "Tenancy Agreement", user: "Mark Cruwthir.", },
  { id: "20549468", date: "20549462", title: "Landlords Insurance", category: "Insurance Insurance Docs", user: "Mark Cruwthir.", },
  { id: "20549469", date: "20549462", title: "Landlord Lease Agreement Document", category: "Tenancy Agreement", user: "Mark Cruwthir.", },
];

const Documents = () => {
  const [activeTab, setActiveTab] = useState<"documents" | "archived" | "forms">("documents");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [keyword, setKeyword] = useState("");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
            <div className="bg-card rounded-xl border border-border p-6 space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">Documents</h1>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 cursor-pointer">
                    Category
                  </Badge>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-1" /> Search
                  </Button>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 p-4 bg-secondary/50 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Keyword</span>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Badge variant="secondary" className="cursor-pointer">Keyword</Badge>
                <Badge variant="secondary" className="cursor-pointer">Category</Badge>
                <span className="text-sm text-muted-foreground">Date From</span>
                <span className="text-sm text-muted-foreground">Date To</span>
                <Badge variant="secondary" className="cursor-pointer">Keyword</Badge>
                <Badge variant="secondary" className="cursor-pointer">Keyword</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-secondary/50 rounded-lg border border-border">
                <div className="space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">Property</span>
                  <Input placeholder="Search Properties..." className="w-full" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">Landlord (s)</span>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Landlords" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Landlords</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">Creditor/Tradie</span>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Creditor/Tradie..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">Tenant (s)</span>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Tenants..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tenants</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1">
                {(["documents", "archived", "forms"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-t-lg text-sm font-medium border border-b-0 transition-colors ${
                      activeTab === tab
                        ? "bg-card text-foreground border-border"
                        : "bg-secondary text-muted-foreground border-transparent hover:text-foreground"
                    }`}
                  >
                    {tab === "forms" ? "Forms/Notices" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "forms" ? (
                <FormsNotices />
              ) : (
                <div className="border border-border rounded-lg overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-10">
                          <input type="checkbox" className="rounded border-border" />
                        </th>
                        <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date Added</th>
                        <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</th>
                        <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</th>
                        <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">User</th>
                        <th className="p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((doc, i) => (
                        <tr key={doc.id + i} className="border-t border-border hover:bg-secondary/30 transition-colors">
                          <td className="p-3">
                            <input type="checkbox" className="rounded border-border" />
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">{doc.date}</td>
                          <td className="p-3 text-sm text-foreground">{doc.title}</td>
                          <td className="p-3 text-sm font-semibold text-foreground">{doc.category}</td>
                          <td className="p-3 text-sm text-muted-foreground">{doc.user}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Documents;
