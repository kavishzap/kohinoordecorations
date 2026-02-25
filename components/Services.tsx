"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { services } from "@/lib/data"
import SectionReveal from "./SectionReveal"
import DecorativeDivider from "./DecorativeDivider"

function ServiceIcon({ icon }: { icon: string }) {
  const paths: Record<string, React.ReactNode> = {
    stage: (
      <path
        d="M3 16h18M5 16V8a2 2 0 012-2h10a2 2 0 012 2v8M8 6V4M16 6V4M12 6V3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
    flower: (
      <>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path
          d="M12 2C12 2 14 6 14 8M12 2C12 2 10 6 10 8M22 12C22 12 18 14 16 14M22 12C22 12 18 10 16 10M12 22C12 22 14 18 14 16M12 22C12 22 10 18 10 16M2 12C2 12 6 14 8 14M2 12C2 12 6 10 8 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </>
    ),
    entrance: (
      <path
        d="M3 21V5a2 2 0 012-2h6v18H3zM11 21V3h2a8 8 0 018 8v10H11z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    ),
    table: (
      <path
        d="M4 12h16M6 12v6M18 12v6M8 12V8a4 4 0 018 0v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
    lighting: (
      <>
        <path
          d="M9 18h6M10 21h4M12 2v1M4.22 4.22l.71.71M1 12h1M19.78 4.22l-.71.71M23 12h-1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M16 12a4 4 0 11-8 0 4 4 0 018 0v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </>
    ),
    theme: (
      <path
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  }

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      className="text-primary"
      aria-hidden="true"
    >
      {paths[icon]}
    </svg>
  )
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const headingY = useTransform(scrollYProgress, [0, 0.3], [40, 0])

  return (
    <section ref={sectionRef} className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal>
          <motion.div className="mb-16 text-center" style={{ y: headingY }}>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              What We Provide
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl text-balance">
              Our Services
            </h2>
            <DecorativeDivider className="mt-4" />
          </motion.div>
        </SectionReveal>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {services.map((service, i) => (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
            >
              <div className="flex size-14 items-center justify-center rounded-xl bg-secondary">
                <ServiceIcon icon={service.icon} />
              </div>
              <span className="text-sm font-medium leading-snug text-foreground">
                {service.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
