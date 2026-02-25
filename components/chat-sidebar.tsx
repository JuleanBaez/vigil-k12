"use client"

import {
  Plus,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Trash2,
  ChevronLeft,
  Settings,
  HelpCircle,
} from "lucide-react"
import { GeminiLogo } from "@/components/gemini-logo"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Conversation } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface SidebarProps {
  conversations: Conversation[]
  activeId: string | null
  onSelect: (id: string) => void
  onNewChat: () => void
  isOpen: boolean
  onToggle: () => void
}

export function ChatSidebar({
  conversations,
  activeId,
  onSelect,
  onNewChat,
  isOpen,
  onToggle,
}: SidebarProps) {
  const grouped = conversations.reduce<Record<string, Conversation[]>>(
    (acc, conv) => {
      if (!acc[conv.date]) acc[conv.date] = []
      acc[conv.date].push(conv)
      return acc
    },
    {}
  )

  return (
    <TooltipProvider delayDuration={300}>
      <aside
        className={cn(
          "flex h-full flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
          isOpen ? "w-72" : "w-0 overflow-hidden"
        )}
      >
        <div className="flex items-center justify-between px-3 py-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-sidebar-foreground hover:bg-sidebar-accent"
                onClick={onToggle}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Close sidebar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Close sidebar</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-sidebar-foreground hover:bg-sidebar-accent"
                onClick={onNewChat}
              >
                <Plus className="h-5 w-5" />
                <span className="sr-only">New chat</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">New chat</TooltipContent>
          </Tooltip>
        </div>

        <ScrollArea className="flex-1 px-2">
          <div className="flex flex-col gap-4 pb-4">
            {Object.entries(grouped).map(([date, convos]) => (
              <div key={date}>
                <p className="mb-1 px-3 text-xs font-medium text-sidebar-foreground/50">
                  {date}
                </p>
                <div className="flex flex-col gap-0.5">
                  {convos.map((conv) => (
                    <div
                      key={conv.id}
                      className={cn(
                        "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer",
                        activeId === conv.id
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
                      )}
                      onClick={() => onSelect(conv.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") onSelect(conv.id)
                      }}
                    >
                      <MessageSquare className="h-4 w-4 shrink-0 opacity-50" />
                      <span className="flex-1 truncate">{conv.title}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 text-sidebar-foreground hover:bg-sidebar-accent"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-3.5 w-3.5" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-3.5 w-3.5" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex flex-col gap-0.5 border-t border-sidebar-border p-2">
          <Button
            variant="ghost"
            className="justify-start gap-2 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="text-sm">Help</span>
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-2 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm">Settings</span>
          </Button>
          <div className="flex items-center gap-2 rounded-lg px-3 py-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              U
            </div>
            <span className="text-sm text-sidebar-foreground/80">User</span>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  )
}
