"use client"

import { Sparkles } from "lucide-react"

export function GeminiLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Sparkles className="h-5 w-5 text-primary" />
    </div>
  )
}
