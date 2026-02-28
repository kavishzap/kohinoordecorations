"use client"

import { useState, useEffect } from "react"

const STORAGE_KEY = "kohinoor-cookie-consent"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === null) setVisible(true)
  }, [])

  const handleChoice = (accepted: boolean) => {
    localStorage.setItem(STORAGE_KEY, accepted ? "accepted" : "rejected")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden
      />

      {/* Card - centered in the middle */}
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
        <div>
            <h2
              id="cookie-title"
              className="font-serif text-lg font-semibold text-foreground"
            >
              Cookie preferences
            </h2>
            <p
              id="cookie-desc"
              className="mt-2 text-sm leading-relaxed text-muted-foreground"
            >
              We use cookies to improve your experience and analyse site traffic.
              You can accept all cookies or reject non-essential ones.
            </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => handleChoice(true)}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => handleChoice(false)}
            className="rounded-xl border border-border bg-transparent px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  )
}
