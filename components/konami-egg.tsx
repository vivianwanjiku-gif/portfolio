"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

export const KONAMI_KEY = "vw-konami"

export function konamiUnlocked() {
  try {
    return localStorage.getItem(KONAMI_KEY) === "1"
  } catch {
    return false
  }
}

export function KonamiEgg() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let index = 0
    const onKey = (event: KeyboardEvent) => {
      const target = event.target
      if (target instanceof HTMLElement && target.closest("input, textarea, select, dialog")) return

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
      index = key === SEQUENCE[index] ? index + 1 : key === SEQUENCE[0] ? 1 : 0
      if (index !== SEQUENCE.length) return

      index = 0
      try {
        localStorage.setItem(KONAMI_KEY, "1")
      } catch {
        // The toast still confirms the sequence. The bonus needs storage.
      }
      setOpen(true)
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => setOpen(false), 7000)
    return () => window.clearTimeout(id)
  }, [open])

  if (!open) return null

  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-sm rounded-2xl border border-border bg-card p-4 shadow-lg sm:inset-x-auto sm:right-6"
    >
      <p className="font-mono text-xs text-copper">
        <span aria-hidden="true" className="text-muted-foreground">
          {"// "}
        </span>
        konami
      </p>
      <p className="mt-2 text-sm leading-relaxed">Code accepted. The next game of Snake starts a little longer.</p>
      <Button type="button" variant="outline" size="sm" className="mt-3" onClick={() => setOpen(false)}>
        Dismiss
      </Button>
    </div>
  )
}
