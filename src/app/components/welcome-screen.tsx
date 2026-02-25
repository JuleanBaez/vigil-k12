"use client"

import { useState } from "react"
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  MoreHorizontal, 
  ShieldAlert, 
  ShieldCheck, 
  ShieldQuestion 
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

const mockApps = [
  { id: "1", name: "Grammarly", status: "denied", audited: "2024-02-10", coppa: "fail", ferpa: "pass", state: "non-compliant" },
  { id: "2", name: "Canvas LMS", status: "approved", audited: "2024-01-15", coppa: "pass", ferpa: "pass", state: "compliant" },
  { id: "3", name: "Kahoot!", status: "pending", audited: "2024-02-20", coppa: "warning", ferpa: "pass", state: "pending" },
  { id: "4", name: "Desmos", status: "approved", audited: "2023-11-30", coppa: "pass", ferpa: "pass", state: "compliant" },
]

export function AppDirectory() {
  const [search, setSearch] = useState("")

  return (
    <div className="flex flex-col gap-4 p-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search ecosystem..." 
            className="pl-8 h-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button size="sm" className="h-9 bg-primary text-primary-foreground">
            Add New App
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[250px] font-bold">Application</TableHead>
              <TableHead className="font-bold">Approval Status</TableHead>
              <TableHead className="font-bold">
                <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                  Last Audited <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="font-bold">Compliance Tags</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockApps.map((app) => (
              <TableRow key={app.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{app.name}</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">ID: {app.id}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={app.status} />
                </TableCell>
                <TableCell className="text-muted-foreground tabular-nums text-xs">
                  {app.audited}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <ComplianceBadge label="COPPA" result={app.coppa} />
                    <ComplianceBadge label="FERPA" result={app.ferpa} />
                    <ComplianceBadge label="NJ-SDP" result={app.state} />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Deep Audit</DropdownMenuItem>
                      <DropdownMenuItem>Re-run Scraper</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Revoke Approval</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    approved: "bg-green-500/15 text-green-700 border-green-200",
    denied: "bg-destructive/15 text-destructive border-destructive/20",
    pending: "bg-amber-500/15 text-amber-700 border-amber-200",
  }
  return (
    <Badge variant="outline" className={styles[status] + " capitalize text-[10px] px-2 py-0"}>
      {status}
    </Badge>
  )
}

function ComplianceBadge({ label, result }: { label: string, result: string }) {
  const icons: Record<string, any> = {
    pass: <ShieldCheck className="h-3 w-3 text-green-600" />,
    fail: <ShieldAlert className="h-3 w-3 text-destructive" />,
    warning: <ShieldQuestion className="h-3 w-3 text-amber-500" />,
    pending: <ShieldQuestion className="h-3 w-3 text-muted-foreground" />,
  }
  return (
    <div className="inline-flex items-center gap-1 rounded border bg-muted/30 px-1.5 py-0.5 text-[9px] font-bold">
      {icons[result]}
      {label}
    </div>
  )
}