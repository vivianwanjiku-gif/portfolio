export function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-mono text-[0.8125rem] text-copper">
      <span aria-hidden="true" className="text-muted-foreground">
        {"// "}
      </span>
      {children}
    </p>
  )
}
