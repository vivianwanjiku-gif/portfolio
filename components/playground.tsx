"use client"

import dynamic from "next/dynamic"
import { useLayoutEffect, useRef, useState } from "react"
import { SectionLabel } from "@/components/section-label"
import { TerminalWidget } from "@/components/terminal-widget"
import { Button } from "@/components/ui/button"

const SnakeGame = dynamic(() => import("@/components/snake-game").then((mod) => mod.SnakeGame), {
  ssr: false,
  loading: () => <p className="py-10 text-center text-sm text-muted-foreground">Loading Snake…</p>,
})

export function Playground() {
  const [open, setOpen] = useState(false)

  return (
    <section id="playground" className="border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(240px,0.75fr)] lg:items-start">
        <div>
          <SectionLabel>playground</SectionLabel>
          <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Look around from a prompt.</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            help, about, projects, skills, contact, game, and clear. The answers are the same public details as the rest of this page.
          </p>
          <div className="mt-8">
            <TerminalWidget onGame={() => setOpen(true)} />
          </div>
        </div>

        <aside className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:mt-28">
          <p className="font-mono text-sm text-copper">
            <span aria-hidden="true" className="text-muted-foreground">
              {"// "}
            </span>
            snake.ts
          </p>
          <h3 className="mt-3 font-serif text-3xl tracking-tight">A short game of Snake.</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Arrow keys or WASD, a swipe on the board, or the pad. It starts when you move, and Space pauses. The best score stays in this browser.
          </p>
          <Button type="button" className="mt-6 h-11 px-4" onClick={() => setOpen(true)}>
            Bored? Play a game
          </Button>
        </aside>
      </div>
      {open ? <GameDialog onClose={() => setOpen(false)} /> : null}
    </section>
  )
}

function GameDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [shown, setShown] = useState(false)

  useLayoutEffect(() => {
    const node = dialogRef.current
    if (!node || node.open) return
    node.showModal()
    setShown(true)
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="game-dialog"
      aria-labelledby="snake-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
    >
      <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-3 sm:px-5">
        <div>
          <p className="font-mono text-xs text-copper">
            <span aria-hidden="true" className="text-muted-foreground">
              {"// "}
            </span>
            game
          </p>
          <h2 id="snake-title" className="font-serif text-2xl tracking-tight">
            Snake
          </h2>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
      <div className="px-4 py-4 sm:px-5">
        <p className="mb-3 text-sm text-muted-foreground">
          Eat the copper dot. Avoid the walls and your own tail. Arrow keys, WASD, swipe, or the pad.
        </p>
        {shown ? <SnakeGame /> : <p className="py-10 text-center text-sm text-muted-foreground">Loading Snake…</p>}
      </div>
    </dialog>
  )
}
