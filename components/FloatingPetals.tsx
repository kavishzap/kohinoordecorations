"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Petal {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  rotation: number
  opacity: number
}

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 14 + Math.random() * 10,
    size: 8 + Math.random() * 10,
    rotation: Math.random() * 360,
    opacity: 0.15 + Math.random() * 0.15,
  }))
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([])
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) {
      setVisible(false)
      return
    }
    const handler = (e: MediaQueryListEvent) => setVisible(!e.matches)
    mq.addEventListener("change", handler)
    setPetals(generatePetals(8))
    return () => mq.removeEventListener("change", handler)
  }, [])

  if (!visible || petals.length === 0) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{
              x: `${petal.x}vw`,
              y: "-5vh",
              rotate: petal.rotation,
              opacity: 0,
            }}
            animate={{
              y: "105vh",
              rotate: petal.rotation + 180,
              opacity: [0, petal.opacity, petal.opacity, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute"
            style={{ left: 0, top: 0 }}
          >
            <svg
              width={petal.size}
              height={petal.size * 1.4}
              viewBox="0 0 10 14"
              fill="none"
            >
              <path
                d="M5 0C5 0 10 4 10 8C10 12 5 14 5 14C5 14 0 12 0 8C0 4 5 0 5 0Z"
                fill="#C4897A"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        className="pointer-events-auto fixed bottom-6 right-6 z-50 flex size-9 items-center justify-center rounded-full border border-border bg-card/90 text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:text-primary"
        onClick={() => setVisible((v) => !v)}
        aria-label="Toggle floating petals"
      >
        <svg width="14" height="14" viewBox="0 0 10 14" fill="currentColor">
          <path d="M5 0C5 0 10 4 10 8C10 12 5 14 5 14C5 14 0 12 0 8C0 4 5 0 5 0Z" />
        </svg>
      </button>
    </div>
  )
}
