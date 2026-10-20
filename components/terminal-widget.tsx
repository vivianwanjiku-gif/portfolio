"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { runCommand } from "@/lib/terminal-commands"

type Line = { id: number; kind: "in" | "out"; text: string }

const WELCOME: Line[] = [
  { id: 1, kind: "out", text: "vivian@nairobi — public details only." },
  { id: 2, kind: "out", text: "Type help. Type game if you want Snake." },
]

export function TerminalWidget({ onGame }: { onGame: () => void }) {
  const logRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(3)
  const history = useRef<string[]>([])
  const historyIndex = useRef(-1)
  const [lines, setLines] = useState<Line[]>(WELCOME)
  const [draft, setDraft] = useState("")

  useEffect(() => {
    const node = logRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [lines])

  function push(text: string, kind: Line["kind"]) {
    const id = nextId.current
    nextId.current += 1
    return { id, kind, text }
  }

  function submit(raw: string) {
    const trimmed = raw.trim()
    historyIndex.current = -1
    setDraft("")
    if (!trimmed) return

    history.current.push(trimmed)
    const result = runCommand(trimmed)
    if (result.action === "clear") {
      nextId.current = 3
      setLines(WELCOME.map((line) => ({ ...line })))
      return
    }

    const next = [push(`$ ${trimmed}`, "in")]
    for (const text of result.lines) next.push(push(text, "out"))
    setLines((current) => [...current, ...next].slice(-80))
    if (result.action === "game") onGame()
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return
    event.preventDefault()
    const commands = history.current
    if (commands.length === 0) return
    if (event.key === "ArrowUp") {
      const next = historyIndex.current < 0 ? commands.length - 1 : Math.max(0, historyIndex.current - 1)
      historyIndex.current = next
      setDraft(commands[next] ?? "")
      return
    }
    const next = historyIndex.current < 0 ? -1 : historyIndex.current + 1
    if (next >= commands.length) {
      historyIndex.current = -1
      setDraft("")
      return
    }
    historyIndex.current = next
    setDraft(commands[next] ?? "")
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-copper/80" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-primary/70" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-muted-foreground/40" aria-hidden="true" />
        <p className="ml-2 font-mono text-xs text-muted-foreground">vivian@nairobi: ~</p>
      </div>
      <div ref={logRef} className="h-72 overflow-y-auto px-4 py-3 font-mono text-sm leading-6" aria-live="polite">
        {lines.map((line) => (
          <p key={line.id} className={line.kind === "in" ? "text-foreground" : "text-muted-foreground"}>
            {line.text}
          </p>
        ))}
      </div>
      <form
        className="flex items-center gap-2 border-t border-border px-3 py-2"
        onSubmit={(event) => {
          event.preventDefault()
          submit(draft)
        }}
      >
        <span aria-hidden="true" className="font-mono text-sm text-copper">
          $
        </span>
        <input
          id="terminal-command"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={onKeyDown}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          autoComplete="off"
          placeholder="help"
          aria-label="Terminal command"
          className="min-w-0 flex-1 bg-transparent font-mono text-base outline-none placeholder:text-muted-foreground"
        />
        <Button type="submit" size="sm">
          Run
        </Button>
      </form>
    </div>
  )
}
