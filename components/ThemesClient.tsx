"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import type { ThemeData } from "@/lib/data"
import ThemeSection from "./ThemeSection"
import SectionReveal from "./SectionReveal"
import DecorativeDivider from "./DecorativeDivider"

export default function ThemesClient({ themes }: { themes: ThemeData[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [resolvedThemes, setResolvedThemes] = useState<ThemeData[]>(themes)
  const [loading, setLoading] = useState(true)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const headingY = useTransform(scrollYProgress, [0, 0.3], [40, 0])

  useEffect(() => {
    let cancelled = false

    async function loadImages() {
      setLoading(true)

      try {
        const updated = await Promise.all(
          themes.map(async (theme) => {
            try {
              const res = await fetch(
                `/api/decorations/${theme.storageFolder}`,
                { cache: "no-store" },
              )

              if (!res.ok) {
                console.warn(
                  `[themes] ${theme.storageFolder} failed:`,
                  res.status,
                )
                return theme
              }

              const json = (await res.json()) as {
                images?: { src: string; label: string }[]
              }
              const images = json.images ?? []

              return {
                ...theme,
                images: images.length > 0 ? images : theme.images,
              }
            } catch (err) {
              console.warn(`[themes] ${theme.storageFolder}:`, err)
              return theme
            }
          }),
        )

        if (!cancelled) setResolvedThemes(updated)
      } catch (err) {
        if (!cancelled) {
          console.warn("[themes] Could not load decoration photos:", err)
          setResolvedThemes(themes)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadImages()
    return () => {
      cancelled = true
    }
  }, [themes])

  return (
    <section ref={sectionRef} id="decorations" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal>
          <motion.div className="mb-16 text-center" style={{ y: headingY }}>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Our Themes
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl text-balance">
              Decoration Themes
            </h2>
            <DecorativeDivider className="mt-4" />
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Each event deserves its own identity. Explore our curated decor themes
              crafted for Reception, Haldi, and Mehendi celebrations.
            </p>
          </motion.div>
        </SectionReveal>

        <div className="space-y-8 md:space-y-10">
          {resolvedThemes.map((theme) => (
            <ThemeSection
              key={theme.slug}
              theme={theme}
              loading={loading}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
