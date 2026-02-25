"use client"

import { useState } from "react"
import { ExternalLink, Scale, FileText, AlertTriangle, Search, X } from "lucide-react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"

export function TriageView({ activeVendor }: { activeVendor: any }) {
  const [searchTerm, setSearchTerm] = useState("")

  if (!activeVendor) return null

  const riskScore = activeVendor.analysis?.riskScore || activeVendor.riskScore || 0
  const isNJCompliant = activeVendor.jurisdiction === "NJ-SDP" || !activeVendor.analysis
  const rawText = activeVendor.analysis?.rawText || "[... Legal Text ...]"

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text
    const parts = text.split(new RegExp(`(${highlight})`, "gi"))
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="bg-primary/40 text-white rounded-sm px-0.5">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    )
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-start border-b pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              {activeVendor.name || activeVendor.vendor}
            </h1>
            <Badge variant="secondary" className="font-mono text-[10px] px-2 py-0">
              v4.2.0
            </Badge>
          </div>
          <p className="text-muted-foreground flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
            <ExternalLink className="h-3 w-3" /> {activeVendor.url || "legal.vendor-services.com/privacy"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-xs font-semibold h-9 px-6">DENY ACCESS</Button>
          <Button className="bg-primary text-primary-foreground text-xs font-semibold h-9 px-6 shadow-sm">APPROVE APP</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricBox title="Risk Score" value={`${riskScore}%`} label="High Priority" />
        <MetricBox title="Compliance Clauses" value={activeVendor.analysis?.flags?.length || "1,402"} label="AI Scanned" />
        <MetricBox title="Jurisdiction" value={activeVendor.jurisdiction || "NJ"} label={isNJCompliant ? "State Compliant" : "Review Required"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2 shadow-none border bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-bold flex items-center gap-2 uppercase tracking-wider text-muted-foreground">
              <Scale className="h-4 w-4" /> AI Analysis Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeVendor.analysis?.flags ? (
              activeVendor.analysis.flags.map((flag: any, idx: number) => (
                <div key={idx} className={`p-4 rounded-md border ${
                  flag.severity === 'CRITICAL' ? 'bg-destructive/5 border-destructive/20' : 'bg-yellow-500/5 border-yellow-500/20'
                }`}>
                  <p className={`text-xs font-semibold uppercase mb-1 flex items-center gap-1 ${
                    flag.severity === 'CRITICAL' ? 'text-destructive' : 'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    <AlertTriangle className="h-3 w-3" /> {flag.type} - {flag.severity}
                  </p>
                  <p className="text-sm text-foreground/80 leading-snug">{flag.text}</p>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-md bg-destructive/5 border border-destructive/10">
                <p className="text-xs font-semibold text-destructive uppercase mb-1 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Flagged Clause
                </p>
                <p className="text-sm text-foreground/80 leading-snug">Section 4.2 allows data sharing for marketing purposes.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 h-[550px] shadow-none border overflow-hidden flex flex-col bg-[#050505]">
          <div className="p-4 border-b bg-muted/20 flex items-center justify-between shrink-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" /> Policy Source Text
            </h3>
            <div className="relative w-48">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Find in text..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-8 pl-8 pr-8 text-[11px] bg-background/50 border-white/10"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
          <div className="flex-1 p-8 font-mono text-[11px] overflow-y-auto leading-relaxed text-foreground/70 selection:bg-primary/30 whitespace-pre-wrap">
            <div className="max-w-2xl">
              {highlightText(rawText, searchTerm)}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function MetricBox({ title, value, label }: any) {
  return (
    <Card className="shadow-none border p-6">
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{title}</p>
      <p className="text-3xl font-semibold tracking-tight">{value}</p>
      <p className="text-[10px] font-medium text-primary uppercase mt-1">{label}</p>
    </Card>
  )
}