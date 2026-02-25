"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { 
  BarChart3, 
  TrendingUp, 
  ShieldAlert, 
  Users, 
  Clock, 
  Zap,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

export function AnalyticsDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Ecosystem Health</h1>
        <p className="text-muted-foreground">Shadow IT monitoring and automated audit performance.</p>
      </div>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Total Vetted Apps" 
          value="412" 
          trend="+12%" 
          trendDir="up" 
          icon={<BarChart3 className="h-4 w-4 text-primary" />} 
        />
        <KpiCard 
          title="Shadow IT Detected" 
          value="28" 
          trend="+4" 
          trendDir="down" 
          icon={<ShieldAlert className="h-4 w-4 text-destructive" />} 
          subtitle="Unsanctioned logins detected"
        />
        <KpiCard 
          title="Avg. Audit Time" 
          value="1.2s" 
          trend="-85%" 
          trendDir="up" 
          icon={<Zap className="h-4 w-4 text-amber-500" />} 
          subtitle="AI vs Manual (4.5 days)"
        />
        <KpiCard 
          title="Data Privacy Score" 
          value="A-" 
          trend="+2pts" 
          trendDir="up" 
          icon={<TrendingUp className="h-4 w-4 text-green-500" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shadow IT Table - High Priority */}
        <Card className="lg:col-span-2 shadow-sm border-t-4 border-t-destructive">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-destructive" /> 
              Unsanctioned App Detection (Shadow IT)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Otter.ai", users: 14, risk: "High", protocol: "Google Auth" },
                { name: "Jasper Art", users: 8, risk: "Medium", protocol: "Direct Login" },
                { name: "Grammarly (Personal)", users: 142, risk: "Critical", protocol: "Chrome Ext" },
              ].map((app) => (
                <div key={app.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-transparent hover:border-border transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded bg-background flex items-center justify-center font-bold text-xs shadow-sm">
                      {app.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{app.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{app.protocol}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs font-bold flex items-center gap-1 justify-end">
                        <Users className="h-3 w-3" /> {app.users}
                      </p>
                      <p className="text-[9px] text-muted-foreground uppercase font-bold">Installs</p>
                    </div>
                    <Badge variant="outline" className={`text-[9px] font-black uppercase ${
                      app.risk === 'Critical' ? 'bg-destructive/10 text-destructive border-destructive/20' : ''
                    }`}>
                      {app.risk} Risk
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" /> Recent Audit Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <TimelineItem 
              time="14m ago" 
              event="AI Scraper finished Canvas v24.1" 
              status="No changes found." 
            />
            <TimelineItem 
              time="2h ago" 
              event="Auto-Flagged: Desmos Policy Update" 
              status="New 'Data Sale' clause detected." 
              alert 
            />
            <TimelineItem 
              time="5h ago" 
              event="Manual Review: Kahoot!" 
              status="Approved by admin (J. Doe)" 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function KpiCard({ title, value, trend, trendDir, icon, subtitle }: any) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 mt-1">
          <span className={`flex items-center text-[10px] font-bold ${trendDir === 'up' ? 'text-green-600' : 'text-destructive'}`}>
            {trendDir === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {trend}
          </span>
          <span className="text-[10px] text-muted-foreground">{subtitle || "vs last month"}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function TimelineItem({ time, event, status, alert }: any) {
  return (
    <div className="relative pl-4 border-l-2 border-muted pb-1">
      <div className={`absolute -left-[5px] top-0 h-2 w-2 rounded-full ${alert ? 'bg-destructive animate-pulse' : 'bg-primary'}`} />
      <p className="text-[10px] font-bold text-muted-foreground">{time}</p>
      <p className="text-xs font-bold leading-none mt-1">{event}</p>
      <p className={`text-[10px] mt-1 ${alert ? 'text-destructive font-bold' : 'text-muted-foreground'}`}>{status}</p>
    </div>
  )
}