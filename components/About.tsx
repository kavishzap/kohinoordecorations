"use client"

import { useRef, useEffect, useState } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"
import { Calendar, Users, Award } from "lucide-react"
import DecorativeDivider from "@/components/DecorativeDivider"
import SectionReveal from "@/components/SectionReveal"

const statItems = [
  { icon: Calendar, value: 1000, suffix: "+", label: "Events Hosted" },
  { icon: Users, value: 5, suffix: "+", label: "Years of Expertise" },
  { icon: Award, value: 50, suffix: "+", label: "Decor Themes" },
]

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number
  suffix: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1600
    const step = Math.max(1, Math.floor(target / (duration / 16)))
    const id = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(id)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(id)
  }, [inView, target])

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="bg-background py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              About Kohinoor Decorations
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl text-balance">
              Where elegance meets celebration
            </h2>
            <DecorativeDivider className="mt-4" />
          </div>
        </SectionReveal>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionReveal>
            <div className="grid min-h-[340px] grid-cols-12 grid-rows-6 gap-3 sm:min-h-[400px] sm:gap-4 lg:min-h-[480px]">
              <div className="relative col-span-7 row-span-6 min-h-[260px] overflow-hidden rounded-2xl shadow-lg sm:min-h-0">
                <Image
                  src="/assets/about1.jpeg"
                  alt="Kohinoor Decorations – wedding hall décor"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 55vw, 28vw"
                  priority
                />
              </div>
              <div className="relative col-span-5 row-span-3 min-h-[120px] overflow-hidden rounded-xl shadow-md sm:min-h-0">
                <Image
                  src="/assets/about3.jpeg"
                  alt="Kohinoor Decorations – celebration detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 40vw, 18vw"
                />
              </div>
              <div className="relative col-span-5 row-span-3 min-h-[120px] overflow-hidden rounded-xl shadow-md sm:min-h-0">
                <Image
                  src="/assets/about2.jpeg"
                  alt="Kohinoor Decorations – elegant floral décor"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 40vw, 18vw"
                />
              </div>
            </div>
          </SectionReveal>

          <div className="flex flex-col gap-8">
            <SectionReveal delay={0.1}>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-lg text-foreground">
                  Kohinoor Decorations is a leading wedding decoration company
                  in Mauritius, creating beautiful setups for Haldi, Mehendi,
                  Reception, and more.
                </p>
                <p>
                  From florals and drapery to stage and entrance décor, our team
                  brings your vision to life with care and attention to every
                  detail. Based in La Rosa, MdAlbert—we serve couples across
                  the island.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div className="grid grid-cols-3 gap-4 border-t border-border pt-8">
                {statItems.map((stat) => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <p className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                      />
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
