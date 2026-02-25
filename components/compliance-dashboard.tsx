"use client"

import { useState } from "react"
import { Menu, Zap, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ComplianceSidebar } from "@/components/compliance-sidebar"
import { AppDirectory } from "@/components/app-directory"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { AddAppModal } from "@/components/add-app-modal"
import { TriageView } from "@/components/triage-view"

const mockVendors = [
  { id: "1", name: "Grammarly Business", riskScore: 82, department: "English", requestDate: "2h ago" },
  { id: "2", name: "Desmos Graphing", riskScore: 12, department: "Math", requestDate: "5h ago" },
  { id: "3", name: "Kahoot! Premium", riskScore: 48, department: "Science", requestDate: "1d ago" },
]

export function ComplianceDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeView, setActiveView] = useState<"triage" | "directory" | "analytics">("triage")
  const [selectedId, setSelectedId] = useState<string | null>("1")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [liveAuditData, setLiveAuditData] = useState<any>(null)

  const handleSelectVendor = (id: string) => {
    setSelectedId(id)
    setLiveAuditData(null)
    setActiveView("triage")
  }

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      <ComplianceSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeView={activeView}
        onViewChange={(view: any) => setActiveView(view)} 
        activeVendorId={selectedId}
        onSelectVendor={handleSelectVendor}
        vendors={mockVendors}
      />

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b px-6 bg-card shrink-0">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="h-8 w-8">
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              SysAdmin / <span className="text-muted-foreground">{activeView}</span>
            </h2>
          </div>
          
          <Button 
            size="sm" 
            className="h-9 gap-2"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Zap className="h-4 w-4" />
            NEW AUDIT
          </Button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
          {activeView === "directory" && <AppDirectory />}
          {activeView === "analytics" && <AnalyticsDashboard />}
          {activeView === "triage" && (
            <TriageView activeVendor={liveAuditData || mockVendors.find(v => v.id === selectedId)} />
          )}
        </main>
      </div>

      <AddAppModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAuditComplete={(data) => {
          setLiveAuditData(data)
          setActiveView("triage")
        }}
      />
    </div>
  )
}