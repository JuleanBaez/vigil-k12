"use client"

import { useState } from "react"
import { X, Zap, Terminal, ShieldAlert, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AddAppModalProps {
  isOpen: boolean
  onClose: () => void
  onAuditComplete: (data: any) => void
}

export function AddAppModal({ isOpen, onClose, onAuditComplete }: AddAppModalProps) {
  const [vendorName, setVendorName] = useState("")
  const [vendorUrl, setVendorUrl] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  if (!isOpen) return null

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsScanning(true)
    setLogs([])
    
    addLog(`INIT: Spawning compliance audit for ${vendorName}...`)
    
    if (!vendorUrl) {
      addLog(`AUTO-DISCOVERY: No URL provided. Searching policy routing table...`)
    } else {
      addLog(`TARGET: ${vendorUrl}`)
    }
    
    try {
      addLog("EXEC: Forwarding payload to scraping engine...")
      
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendorName, vendorUrl: vendorUrl || "AUTO" })
      })

      if (!res.ok) throw new Error(`API returned status ${res.status}`)
      
      const { data } = await res.json()
      addLog("SUCCESS: NLP pipeline complete. Parsing risk matrices.")
      
      setTimeout(() => {
        onAuditComplete(data)
        setIsScanning(false)
        setVendorName("")
        setVendorUrl("")
        onClose()
      }, 1500)

    } catch (error) {
      addLog(`FATAL ERR: Connection to engine failed.`)
      setIsScanning(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-card border border-white/10 shadow-2xl rounded-xl overflow-hidden flex flex-col">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-muted/10">
          <div className="flex items-center gap-2 text-primary">
            <Zap className="h-4 w-4 fill-current" />
            <h2 className="text-xs font-bold tracking-widest uppercase">New Vendor Audit</h2>
          </div>
          <button onClick={onClose} disabled={isScanning} className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!isScanning ? (
            <form id="audit-form" onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Search className="h-3 w-3" /> Software / Vendor Name
                </label>
                <Input 
                  required 
                  autoFocus
                  placeholder="e.g., Canva for Education" 
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className="font-medium bg-background border-white/10 h-11"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Privacy Policy URL</label>
                  <span className="text-[9px] font-bold text-primary/70 uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-sm">Optional</span>
                </div>
                <Input 
                  type="url"
                  placeholder="Leave blank for Auto-Discovery..." 
                  value={vendorUrl}
                  onChange={(e) => setVendorUrl(e.target.value)}
                  className="font-mono text-xs bg-background border-white/10 h-11"
                />
              </div>
            </form>
          ) : (
            <div className="bg-[#0a0a0a] rounded-lg p-4 h-52 overflow-y-auto font-mono text-[11px] text-green-500/90 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] border border-white/5">
              <div className="flex items-center gap-2 mb-4 text-muted-foreground/50 border-b border-white/5 pb-2">
                <Terminal className="h-3 w-3" />
                <span className="uppercase tracking-widest text-[9px]">tty1 — scraping_engine.sh</span>
              </div>
              <div className="space-y-1.5">
                {logs.map((log, i) => (
                  <div key={i} className="animate-in slide-in-from-bottom-1 fade-in leading-relaxed">
                    {log}
                  </div>
                ))}
                <div className="flex gap-1 animate-pulse mt-2">
                  <span className="w-2 h-3 bg-green-500/80 block"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-white/5 bg-muted/10 flex justify-between items-center">
          <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
            <ShieldAlert className="h-3 w-3" /> Active Defense
          </div>
          <Button 
            type="submit" 
            form="audit-form" 
            disabled={isScanning || !vendorName}
            className="text-xs font-bold tracking-wider h-10 px-6 bg-primary text-primary-foreground transition-all hover:bg-primary/90"
          >
            {isScanning ? "EXECUTING..." : "INITIALIZE SCAN"}
          </Button>
        </div>
      </div>
    </div>
  )
}