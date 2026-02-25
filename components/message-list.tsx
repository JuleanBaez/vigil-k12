"use client"

import { useRef, useEffect } from "react"
import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Share2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Message } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface MessageListProps {
  messages: Message[]
}

function parseMarkdown(text: string): string {
  let html = text

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre class="my-3 overflow-x-auto rounded-lg bg-secondary p-4 text-sm"><code>${code.trim()}</code></pre>`
  })

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="rounded bg-secondary px-1.5 py-0.5 text-sm">$1</code>')

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="mb-1 mt-4 text-base font-semibold">$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2 class="mb-2 mt-5 text-lg font-semibold">$1</h2>')

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

  // Tables
  html = html.replace(
    /\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g,
    (_match, header, body) => {
      const headers = header.split("|").filter(Boolean).map((h: string) => `<th class="border border-border px-3 py-1.5 text-left text-sm font-medium">${h.trim()}</th>`).join("")
      const rows = body.trim().split("\n").map((row: string) => {
        const cells = row.split("|").filter(Boolean).map((c: string) => `<td class="border border-border px-3 py-1.5 text-sm">${c.trim()}</td>`).join("")
        return `<tr>${cells}</tr>`
      }).join("")
      return `<table class="my-3 w-full border-collapse overflow-hidden rounded-lg border border-border"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`
    }
  )

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-4 border-border" />')

  // Ordered list items
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-5 list-decimal text-sm leading-relaxed">$1</li>')

  // Unordered list items
  html = html.replace(/^- (.+)$/gm, '<li class="ml-5 list-disc text-sm leading-relaxed">$1</li>')

  // Paragraphs
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ""
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<table") ||
        trimmed.startsWith("<li") ||
        trimmed.startsWith("<hr")
      ) {
        return trimmed
      }
      return `<p class="text-sm leading-relaxed">${trimmed}</p>`
    })
    .join("\n")

  return html
}

function AssistantMessage({ content }: { content: string }) {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="prose-custom text-foreground"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
          />
          <div className="mt-3 flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span className="sr-only">Good response</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Good response</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                  <ThumbsDown className="h-3.5 w-3.5" />
                  <span className="sr-only">Bad response</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bad response</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                  <Copy className="h-3.5 w-3.5" />
                  <span className="sr-only">Copy</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span className="sr-only">Regenerate</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Regenerate</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                  <Share2 className="h-3.5 w-3.5" />
                  <span className="sr-only">Share</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl bg-secondary px-4 py-3 text-sm text-secondary-foreground leading-relaxed">
        {content}
      </div>
    </div>
  )
}

export function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <ScrollArea className="flex-1">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex flex-col gap-8">
          {messages.map((msg) =>
            msg.role === "user" ? (
              <UserMessage key={msg.id} content={msg.content} />
            ) : (
              <AssistantMessage key={msg.id} content={msg.content} />
            )
          )}
        </div>
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}
