"use client"

import { Lightbulb, Code, PenLine, Compass } from "lucide-react"
import { GeminiLogo } from "@/components/gemini-logo"
import { suggestions } from "@/lib/mock-data"

const iconMap: Record<string, React.ReactNode> = {
  lightbulb: <Lightbulb className="h-5 w-5" />,
  code: <Code className="h-5 w-5" />,
  pen: <PenLine className="h-5 w-5" />,
  compass: <Compass className="h-5 w-5" />,
}

interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void
}

export function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="mb-8 flex flex-col items-center gap-3">
        <GeminiLogo className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10" />
        <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance text-center">
          Hello, how can I help you today?
        </h1>
        <p className="text-sm text-muted-foreground">
          Choose a suggestion below or type your own message
        </p>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onSuggestionClick(`${s.title} ${s.subtitle}`)}
            className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:bg-accent hover:shadow-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
              {iconMap[s.icon]}
            </div>
            <div>
              <p className="text-sm font-medium text-card-foreground">{s.title}</p>
              <p className="text-xs text-muted-foreground">{s.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
