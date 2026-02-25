"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { themes } from "@/lib/data"
import ThemeSection from "./ThemeSection"
import SectionReveal from "./SectionReveal"
import DecorativeDivider from "./DecorativeDivider"

export default function Themes() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const headingY = useTransform(scrollYProgress, [0, 0.3], [40, 0])

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
              crafted for Haldi, Mehendi, and Reception celebrations.
            </p>
          </motion.div>
        </SectionReveal>

        <div className="space-y-20">
          {themes.map((theme) => (
            <ThemeSection key={theme.slug} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  )
}
