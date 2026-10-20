"use client"

import { useEffect, useRef, useState } from "react"
import { konamiUnlocked } from "@/components/konami-egg"
import { Button } from "@/components/ui/button"

const COLS = 18
const ROWS = 18
const HIGH_KEY = "vw-snake-high"

type Dir = "up" | "down" | "left" | "right"
type Cell = { x: number; y: number }
type Status = "ready" | "running" | "paused" | "over" | "won"

type GameState = {
  snake: Cell[]
  dir: Dir
  next: Dir
  food: Cell
  score: number
}

type Engine = {
  turn: (dir: Dir) => void
  togglePause: () => void
  reset: () => void
}

const DELTA: Record<Dir, Cell> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

function opposite(a: Dir, b: Dir) {
  return (a === "up" && b === "down") || (a === "down" && b === "up") || (a === "left" && b === "right") || (a === "right" && b === "left")
}

function readHigh() {
  try {
    const value = Number(localStorage.getItem(HIGH_KEY))
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0
  } catch {
    return 0
  }
}

function writeHigh(score: number) {
  try {
    localStorage.setItem(HIGH_KEY, String(score))
  } catch {
    // The score still shows for this visit.
  }
}

function placeFood(snake: Cell[]) {
  const used = new Set(snake.map((cell) => `${cell.x},${cell.y}`))
  const free: Cell[] = []
  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLS; x += 1) {
      if (!used.has(`${x},${y}`)) free.push({ x, y })
    }
  }
  if (free.length === 0) return null
  return free[Math.floor(Math.random() * free.length)] ?? null
}

function makeState(bonus: boolean): GameState {
  const length = bonus ? 5 : 3
  const snake = Array.from({ length }, (_, index) => ({ x: 6 - index, y: 8 }))
  return {
    snake,
    dir: "right",
    next: "right",
    food: placeFood(snake) ?? { x: 12, y: 8 },
    score: 0,
  }
}

function cssColor(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

function clientBonus() {
  if (typeof window === "undefined") return false
  return konamiUnlocked()
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engine = useRef<Engine>({
    turn: () => {},
    togglePause: () => {},
    reset: () => {},
  })
  const [bonus] = useState(clientBonus)
  const [score, setScore] = useState(0)
  const [high, setHigh] = useState(readHigh)
  const [status, setStatus] = useState<Status>("ready")
  const [live, setLive] = useState(
    bonus ? "Konami head start is on. Press a direction to start." : "Press an arrow, WASD, or the pad to start.",
  )
  const swipe = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const state = makeState(bonus)
    let mode: Status = "ready"
    let best = readHigh()

    const publish = (next: Status) => {
      mode = next
      setStatus(next)
    }

    const remember = (nextScore: number) => {
      if (nextScore <= best) return
      best = nextScore
      setHigh(nextScore)
      writeHigh(nextScore)
    }

    const reset = () => {
      const fresh = makeState(bonus)
      state.snake = fresh.snake
      state.dir = fresh.dir
      state.next = fresh.next
      state.food = fresh.food
      state.score = 0
      setScore(0)
      publish("ready")
      setLive(bonus ? "New game, with the Konami head start. Press a direction to start." : "Press a direction to start.")
    }

    const turn = (dir: Dir) => {
      if (mode === "over" || mode === "won") return
      if (mode !== "ready" && state.snake.length > 1 && opposite(state.dir, dir)) return
      state.next = dir
      if (mode === "ready") state.dir = dir
      if (mode === "paused" || mode === "ready") {
        publish("running")
        setLive("Running.")
      }
    }

    const togglePause = () => {
      if (mode === "running") {
        publish("paused")
        setLive(`Paused. Score ${state.score}.`)
      } else if (mode === "paused" || mode === "ready") {
        publish("running")
        setLive("Running.")
      }
    }

    engine.current = { turn, togglePause, reset }

    const paint = () => {
      const context = canvas?.getContext("2d")
      if (!canvas || !context) return
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.max(1, Math.round(rect.width * dpr))
      const height = Math.max(1, Math.round(rect.height * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      context.clearRect(0, 0, width, height)
      context.fillStyle = cssColor("--card", "#12201c")
      context.fillRect(0, 0, width, height)

      const cellW = width / COLS
      const cellH = height / ROWS
      context.strokeStyle = cssColor("--border", "#2d3b37")
      context.globalAlpha = 0.45
      context.lineWidth = 1
      for (let index = 1; index < COLS; index += 1) {
        context.beginPath()
        context.moveTo(index * cellW, 0)
        context.lineTo(index * cellW, height)
        context.stroke()
      }
      for (let index = 1; index < ROWS; index += 1) {
        context.beginPath()
        context.moveTo(0, index * cellH)
        context.lineTo(width, index * cellH)
        context.stroke()
      }
      context.globalAlpha = 1

      context.fillStyle = cssColor("--copper", "#e3b47d")
      context.beginPath()
      context.arc(
        state.food.x * cellW + cellW / 2,
        state.food.y * cellH + cellH / 2,
        Math.min(cellW, cellH) * 0.28,
        0,
        Math.PI * 2,
      )
      context.fill()

      const snakeColor = cssColor("--primary", "#85cfbb")
      state.snake.forEach((cell, index) => {
        const pad = Math.min(cellW, cellH) * (index === 0 ? 0.12 : 0.18)
        context.globalAlpha = index === 0 ? 1 : 0.88
        context.fillStyle = snakeColor
        context.fillRect(cell.x * cellW + pad, cell.y * cellH + pad, cellW - pad * 2, cellH - pad * 2)
      })
      context.globalAlpha = 1

      if (mode === "over" || mode === "won") {
        context.fillStyle = "rgba(0, 0, 0, 0.45)"
        context.fillRect(0, 0, width, height)
      }
    }

    const step = () => {
      if (!opposite(state.dir, state.next)) state.dir = state.next
      const head = state.snake[0]
      if (!head) return
      const move = DELTA[state.dir]
      const next = { x: head.x + move.x, y: head.y + move.y }
      const hitWall = next.x < 0 || next.y < 0 || next.x >= COLS || next.y >= ROWS
      const eating = next.x === state.food.x && next.y === state.food.y
      const body = eating ? state.snake : state.snake.slice(0, -1)
      if (hitWall || body.some((cell) => cell.x === next.x && cell.y === next.y)) {
        remember(state.score)
        publish("over")
        setLive(`Game over. Score ${state.score}. Best ${Math.max(best, state.score)}.`)
        return
      }

      state.snake.unshift(next)
      if (eating) {
        state.score += 1
        setScore(state.score)
        remember(state.score)
        const food = placeFood(state.snake)
        if (!food) {
          publish("won")
          setLive(`Board clear. Score ${state.score}. Best ${best}.`)
          return
        }
        state.food = food
      } else {
        state.snake.pop()
      }
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const tickMs = media.matches ? 240 : 150
    const host = window as Window & { __vwSnakeLoop?: number }
    if (host.__vwSnakeLoop) window.clearInterval(host.__vwSnakeLoop)
    const id = window.setInterval(() => {
      if (mode === "running") step()
      paint()
    }, tickMs)
    host.__vwSnakeLoop = id
    const observer = canvas ? new ResizeObserver(() => paint()) : null
    if (canvas) observer?.observe(canvas)
    paint()

    const onKey = (event: KeyboardEvent) => {
      const map: Record<string, Dir | undefined> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        a: "left",
        s: "down",
        d: "right",
        W: "up",
        A: "left",
        S: "down",
        D: "right",
      }
      const dir = map[event.key]
      if (dir) {
        event.preventDefault()
        turn(dir)
        return
      }
      if (event.key !== " " && event.key !== "p" && event.key !== "P") return
      const target = event.target
      if (target instanceof HTMLElement && target.closest("button, a, input, textarea")) return
      event.preventDefault()
      togglePause()
    }
    window.addEventListener("keydown", onKey)

    return () => {
      window.clearInterval(id)
      if (host.__vwSnakeLoop === id) delete host.__vwSnakeLoop
      observer?.disconnect()
      window.removeEventListener("keydown", onKey)
      engine.current = { turn: () => {}, togglePause: () => {}, reset: () => {} }
    }
  }, [bonus])

  const statusLabel =
    status === "paused" ? "Paused" : status === "over" ? "Game over" : status === "won" ? "Board clear" : status === "ready" ? "Ready" : "Running"

  return (
    <div className="grid gap-3">
      <p className="sr-only" aria-live="polite">
        {live}
      </p>
      <div className="flex items-baseline justify-between gap-3 font-mono text-sm">
        <p>
          Score <span className="text-base text-foreground">{score}</span>
        </p>
        <p>
          Best <span className="text-base text-foreground">{high}</span>
        </p>
        <p className="text-muted-foreground">{statusLabel}</p>
      </div>
      {bonus ? <p className="font-mono text-xs text-copper">Konami head start is on for this browser.</p> : null}
      <canvas
        ref={canvasRef}
        className="aspect-square w-full touch-none rounded-xl border border-border bg-card"
        aria-hidden="true"
        onPointerDown={(event) => {
          swipe.current = { x: event.clientX, y: event.clientY }
        }}
        onPointerUp={(event) => {
          const start = swipe.current
          swipe.current = null
          if (!start) return
          const dx = event.clientX - start.x
          const dy = event.clientY - start.y
          if (Math.hypot(dx, dy) < 24) return
          if (Math.abs(dx) > Math.abs(dy)) engine.current.turn(dx > 0 ? "right" : "left")
          else engine.current.turn(dy > 0 ? "down" : "up")
        }}
      />
      <div className="mx-auto grid w-40 grid-cols-3 gap-2" aria-label="Direction pad">
        <span />
        <PadButton label="Move up" onPress={() => engine.current.turn("up")}>
          ↑
        </PadButton>
        <span />
        <PadButton label="Move left" onPress={() => engine.current.turn("left")}>
          ←
        </PadButton>
        <span />
        <PadButton label="Move right" onPress={() => engine.current.turn("right")}>
          →
        </PadButton>
        <span />
        <PadButton label="Move down" onPress={() => engine.current.turn("down")}>
          ↓
        </PadButton>
        <span />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" aria-pressed={status === "paused"} onClick={() => engine.current.togglePause()}>
          {status === "running" ? "Pause" : status === "paused" ? "Resume" : "Start"}
        </Button>
        <Button type="button" variant="outline" onClick={() => engine.current.reset()}>
          Restart
        </Button>
      </div>
    </div>
  )
}

function PadButton({ label, onPress, children }: { label: string; onPress: () => void; children: string }) {
  return (
    <Button
      type="button"
      variant="secondary"
      className="h-11"
      aria-label={label}
      onClick={onPress}
    >
      {children}
    </Button>
  )
}
