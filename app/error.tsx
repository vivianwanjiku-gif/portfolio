"use client"

import { Button } from "@/components/ui/button"

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-24">
      <p className="text-sm font-medium tracking-[0.16em] text-copper uppercase">Error</p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight">This page did not finish loading.</h1>
      <p className="mt-4 text-muted-foreground">
        Refresh or try again. Project details fall back to a saved GitHub snapshot when the API is unavailable.
      </p>
      <Button type="button" className="mt-8 h-11 w-fit px-4" onClick={() => reset()}>
        Try again
      </Button>
    </main>
  )
}
