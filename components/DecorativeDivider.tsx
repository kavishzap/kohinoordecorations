"use client"

import { cn } from "@/lib/utils"

export default function DecorativeDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <span className="h-px w-10 bg-primary/30" />
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="text-primary/50"
      >
        <path
          d="M8 1C8 1 11 5 11 8C11 11 8 15 8 15C8 15 5 11 5 8C5 5 8 1 8 1Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.15"
        />
      </svg>
      <span className="h-px w-10 bg-primary/30" />
    </div>
  )
}
