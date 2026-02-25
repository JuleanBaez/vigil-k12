"use client"

import { useState } from "react"
import { Globe, Zap, Loader2, ShieldCheck, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AddAppModalProps {
  isOpen: boolean
  onClose: () => void
  onAuditComplete: (appData: any) => void
}

export function AddAppModal({ isOpen, onClose, onAuditComplete }: AddAppModalProps) {
  const [url, setUrl] = useState("")
  const [status, setStatus] = useState<"idle" | "scraping" | "analyzing" | "complete">("idle")

  if (!isOpen) return null

  const handleStartAudit = async () => {
    setStatus("scraping")
    await new Promise(r => setTimeout(r, 1200))
    setStatus("analyzing")
    await new Promise(r => setTimeout(r, 1500))
    setStatus("complete")
  }

  const handleFinalize = () => {
    onAuditComplete({ name: "New Audit Result", url })
    setUrl("")
    setStatus("idle")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl border bg-card shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <h2 className="flex items-center gap-2 text-xl font-black italic tracking-tighter">
                <Zap className="h-5 w-5 text-primary fill-primary" />
                INSTANT AI AUDIT
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Deploy scraper to analyze vendor privacy
              </p>
            </div>
            <button onClick={onClose} className="rounded-full p-1 hover:bg-muted transition-colors">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-6 py-4">
            <div className="relative">
              <Globe className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="https://vendor-site.com/privacy-policy"
                className="pl-10 h-12 bg-muted/20 font-mono text-xs"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={status !== "idle"}
              />
            </div>

            {status !== "idle" && (
              <div className="rounded-xl border bg-muted/40 p-5 space-y-4 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="flex items-center gap-2">
                    {status !== "complete" ? <Loader2 className="h-3 w-3 animate-spin text-primary" /> : <ShieldCheck className="h-3 w-3 text-green-600" />}
                    {status === "scraping" && "Initializing Scraper..."}
                    {status === "analyzing" && "LLM Policy Analysis..."}
                    {status === "complete" && "Audit Prepared"}
                  </span>
                  <span className="text-primary font-mono italic">
                    {status === "scraping" ? "25%" : status === "analyzing" ? "78%" : "100%"}
                  </span>
                </div>
                
                <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-700 ease-in-out" 
                    style={{ width: status === "scraping" ? "25%" : status === "analyzing" ? "78%" : "100%" }} 
                  />
                </div>

                {status === "complete" && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <AlertCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div className="space-y-1 text-green-800">
                      <p className="text-[11px] font-black uppercase tracking-tight">Ready for Review</p>
                      <p className="text-[10px] leading-tight font-medium opacity-80">
                        AI extracted 14 clauses. No critical "Data Sale" markers found.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 bg-muted/30 p-4 border-t px-6">
          <Button variant="ghost" onClick={onClose} className="text-[10px] font-bold uppercase tracking-widest h-9" disabled={status === "scraping" || status === "analyzing"}>
            Cancel
          </Button>
          {status === "complete" ? (
            <Button onClick={handleFinalize} className="bg-green-600 hover:bg-green-700 text-[10px] font-black uppercase tracking-widest px-6 h-9">
              View Full Report
            </Button>
          ) : (
            <Button onClick={handleStartAudit} disabled={!url || status !== "idle"} className="text-[10px] font-black uppercase tracking-widest px-8 h-9">
              Start Audit
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}