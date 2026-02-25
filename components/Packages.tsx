"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Check, Star } from "lucide-react"
import { packages } from "@/lib/data"
import SectionReveal from "./SectionReveal"
import DecorativeDivider from "./DecorativeDivider"

export default function Packages() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const headingY = useTransform(scrollYProgress, [0, 0.3], [40, 0])

  return (
    <section ref={sectionRef} id="packages" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal>
          <motion.div className="mb-16 text-center" style={{ y: headingY }}>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Our Offerings
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl text-balance">
              D&eacute;cor Packages
            </h2>
            <DecorativeDivider className="mt-4" />
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Choose from our thoughtfully curated packages, each designed to deliver
              a seamless and stunning celebration experience.
            </p>
          </motion.div>
        </SectionReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <SectionReveal key={pkg.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(61,44,44,0.12)" }}
                transition={{ duration: 0.3 }}
                className={`relative flex h-full flex-col rounded-2xl border bg-card p-8 shadow-sm transition-shadow ${
                  pkg.popular ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
                }`}
              >
                {/* Popular ribbon */}
                {pkg.popular && (
                  <div className="absolute -top-3 right-6 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-sm">
                    <Star className="size-3 fill-current" />
                    Most Popular
                  </div>
                )}

                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {pkg.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{pkg.guestRange}</p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-primary">
                  {pkg.decorLevel}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
