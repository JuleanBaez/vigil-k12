"use client"

import { useState, useCallback } from "react"
import { Menu, Sparkles, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChatSidebar } from "@/components/chat-sidebar"
import { WelcomeScreen } from "@/components/welcome-screen"
import { MessageList } from "@/components/message-list"
import { mockConversations, type Conversation, type Message } from "@/lib/mock-data"

export function GeminiChat() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [activeConvId, setActiveConvId] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState("Gemini 2.0 Flash")

  const activeConversation = conversations.find((c) => c.id === activeConvId) ?? null

  const handleNewChat = useCallback(() => {
    setActiveConvId(null)
  }, [])

  const handleSend = useCallback(
    (text: string) => {
      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        content: text,
      }
      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content:
          "Thank you for your message! I'm a mock Gemini interface, so I can't generate real responses yet. However, you can browse the existing conversations in the sidebar to see how the UI renders rich content like code blocks, tables, and markdown formatting.",
      }

      if (activeConvId) {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === activeConvId
              ? { ...c, messages: [...c.messages, userMsg, assistantMsg] }
              : c
          )
        )
      } else {
        const newConv: Conversation = {
          id: `conv-${Date.now()}`,
          title: text.slice(0, 40) + (text.length > 40 ? "..." : ""),
          messages: [userMsg, assistantMsg],
          date: "Today",
        }
        setConversations((prev) => [newConv, ...prev])
        setActiveConvId(newConv.id)
      }
    },
    [activeConvId]
  )

  const models = ["Gemini 2.0 Flash", "Gemini 2.5 Pro", "Gemini 2.0 Flash Thinking"]

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <ChatSidebar
        conversations={conversations}
        activeId={activeConvId}
        onSelect={setActiveConvId}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center gap-2 px-4 py-3">
          {!sidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open sidebar</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="gap-1.5 text-base font-semibold text-foreground hover:bg-accent"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                {selectedModel}
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {models.map((model) => (
                <DropdownMenuItem
                  key={model}
                  onClick={() => setSelectedModel(model)}
                  className={selectedModel === model ? "bg-accent" : ""}
                >
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  {model}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Content */}
        {activeConversation ? (
          <MessageList messages={activeConversation.messages} />
        ) : (
          <WelcomeScreen onSuggestionClick={handleSend} />
        )}
      </div>
    </div>
  )
}
