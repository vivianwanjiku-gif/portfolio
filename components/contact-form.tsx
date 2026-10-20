"use client"

import { useState, type FormEvent } from "react"
import { site } from "@/content/site"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Field = "name" | "email" | "message"

const messages: Record<Field, string> = {
  name: "Enter your name.",
  email: "Enter a valid email address.",
  message: "Write a message.",
}

export function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [status, setStatus] = useState("")

  function validate(form: HTMLFormElement) {
    const next: Partial<Record<Field, string>> = {}
    const name = String(new FormData(form).get("name") ?? "").trim()
    const email = String(new FormData(form).get("email") ?? "").trim()
    const message = String(new FormData(form).get("message") ?? "").trim()
    if (!name) next.name = messages.name
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = messages.email
    if (!message) next.message = messages.message
    return { next, name, email, message }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const { next, name, email, message } = validate(form)
    setErrors(next)
    if (Object.keys(next).length > 0) {
      setStatus("Fix the highlighted fields, then try again.")
      const first = (Object.keys(next) as Field[])[0]
      const field = form.elements.namedItem(first)
      if (field instanceof HTMLElement) field.focus()
      return
    }

    const honey = String(new FormData(form).get("company") ?? "")
    if (honey) {
      setStatus("Thanks. Your note is ready.")
      form.reset()
      return
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setStatus("Your email app should open with this message addressed to Vivian. If it does not, use the email address beside the form.")
    form.reset()
    setErrors({})
  }

  return (
    <form className="relative rounded-2xl border border-border bg-card p-5 sm:p-6" onSubmit={onSubmit} noValidate>
      <h3 className="font-serif text-2xl">Send a message</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        This opens your email app with the note filled in. Nothing is stored on this site.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className="h-11"
          />
          {errors.name ? (
            <p id="contact-name-error" className="text-sm text-destructive">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={160}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className="h-11"
          />
          {errors.email ? (
            <p id="contact-email-error" className="text-sm text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="min-h-36"
        />
        {errors.message ? (
          <p id="contact-message-error" className="text-sm text-destructive">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" className="h-11 px-4">
          Email this message
        </Button>
        <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
          {status}
        </p>
      </div>
    </form>
  )
}
