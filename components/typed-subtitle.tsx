import type { CSSProperties } from "react"

export function TypedSubtitle({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden="true"
        className="typed-line"
        style={{ "--chars": text.length } as CSSProperties}
      >
        {text}
      </span>
    </>
  )
}
