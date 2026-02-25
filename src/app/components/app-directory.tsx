"use client"

import { useState, useEffect } from "react"
import { Search, Filter, MoreHorizontal, ShieldCheck, ShieldAlert, Clock, Loader2 } from "lucide-react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"

export function AppDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [apps, setApps] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch("/api/vendors")
        if (res.ok) {
          const data = await res.json()
          setApps(data)
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchVendors()
  }, [])

  const filteredApps = apps.filter(app => 
    app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "APPROVED": return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 text-[10px] font-bold uppercase tracking-wider border-green-500/20"><ShieldCheck className="w-3 h-3 mr-1" /> Approved</Badge>
      case "DENIED": return <Badge variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/20 text-[10px] font-bold uppercase tracking-wider border-destructive/20"><ShieldAlert className="w-3 h-3 mr-1" /> Denied</Badge>
      case "REVIEW_REQUIRED": return <Badge variant="outline" className="text-yellow-500 border-yellow-500/20 bg-yellow-500/10 text-[10px] font-bold uppercase tracking-wider"><Clock className="w-3 h-3 mr-1" /> Review</Badge>
      default: return <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider bg-muted/50 text-muted-foreground border-white/5">Pending</Badge>
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Global App Directory</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage compliance status for all district software.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search vendor or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-background border-white/10 text-sm h-10"
            />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 border-white/10 bg-card">
            <Filter className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      <div className="border border-white/10 rounded-xl bg-card overflow-hidden shadow-sm min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-muted-foreground uppercase tracking-widest bg-muted/30 border-b border-white/5 font-semibold">
              <tr>
                <th className="px-6 py-4">Software / Vendor</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Risk Score</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Audited</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-24 text-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mx-auto" />
                  </td>
                </tr>
              ) : filteredApps.length > 0 ? (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-muted/20 transition-colors group">
                    <td className="px-6 py-4 font-medium text-foreground">
                      {app.name}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <span className="bg-muted/50 px-2.5 py-1 rounded-md text-[11px] font-medium border border-white/5">
                        {app.category || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${app.risk_score > 80 ? 'text-destructive' : app.risk_score > 40 ? 'text-yellow-500' : 'text-green-500'}`}>
                        {app.risk_score || 0}
                      </span>
                      <span className="text-muted-foreground text-[10px] ml-1">/ 100</span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(app.status)}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-muted-foreground">
                      {app.last_audited ? new Date(app.last_audited).toLocaleDateString() : "Never"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground text-sm">
                    No applications found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}