"use client"

import { LayoutDashboard, ShieldCheck, BarChart3, X, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../components/ui/button"

export function ComplianceSidebar({ 
  isOpen, onToggle, activeView, onViewChange, activeVendorId, onSelectVendor, vendors 
}: any) {
  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-40 w-64 border-r bg-card transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col",
      !isOpen && "-translate-x-full lg:hidden"
    )}>
      <div className="flex h-14 items-center justify-between px-6 border-b">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <span className="text-sm font-bold tracking-widest text-foreground">VIGIL<span className="text-primary">_K12</span></span>
        </div>
        <Button variant="ghost" size="icon" onClick={onToggle} className="lg:hidden text-muted-foreground">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 space-y-6">
        <div className="px-4">
          <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Navigation</p>
          <nav className="space-y-1">
            <NavButton icon={<ShieldCheck className="h-4 w-4" />} label="Triage Queue" active={activeView === "triage"} onClick={() => onViewChange("triage")} />
            <NavButton icon={<LayoutDashboard className="h-4 w-4" />} label="App Directory" active={activeView === "directory"} onClick={() => onViewChange("directory")} />
            <NavButton icon={<BarChart3 className="h-4 w-4" />} label="Analytics" active={activeView === "analytics"} onClick={() => onViewChange("analytics")} />
          </nav>
        </div>

        <div className="px-4">
          <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Urgent Review</p>
          <div className="space-y-1">
            {vendors?.map((v: any) => (
              <button
                key={v.id}
                onClick={() => onSelectVendor(v.id)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md transition-colors border border-transparent",
                  activeVendorId === v.id && activeView === "triage" 
                    ? "bg-accent text-accent-foreground border-border" 
                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium truncate">{v.name}</p>
                  <span className={cn(
                    "text-xs font-semibold px-1.5 py-0.5 rounded",
                    v.riskScore > 80 ? "bg-destructive/20 text-destructive" : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                  )}>
                    {v.riskScore}
                  </span>
                </div>
                <p className="text-xs opacity-80">{v.department} • {v.requestDate}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

function NavButton({ icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active 
          ? "bg-primary text-primary-foreground" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {icon} {label}
    </button>
  )
}