"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import { Sparkles, Users, Calendar, Award } from "lucide-react"

/* ---------- stat counter ---------- */
const stats = [
  { icon: Calendar, value: 500, suffix: "+", label: "Events Hosted" },
  { icon: Users, value: 10, suffix: "+", label: "Years of Expertise" },
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
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

/* ---------- feature cards (stats) ---------- */
const features = [
  { title: "1000+", desc: "Events Hosted" },
  { title: "5+", desc: "Years of Expertise" },
  { title: "50+", desc: "Decor Themes" },
]

/* ---------- component ---------- */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const img1Y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"])
  const img2Y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"])
  const img3Y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"])
  const headingY = useTransform(scrollYProgress, [0, 0.4], [30, 0])

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden bg-background pt-28 pb-8 lg:pt-36 lg:pb-12">
      {/* subtle background accent */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-primary/[0.04] blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        {/* ---------- top: label + heading ---------- */}
        <motion.div className="mb-20 text-center" style={{ y: headingY }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary"
          >
            <Sparkles className="size-3.5" />
            About Kohinoor Decorations
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl md:whitespace-nowrap"
          >
            Where Elegance Meets Celebration
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 h-px w-20 origin-center bg-primary/40"
          />
        </motion.div>

        {/* ---------- main grid: images + copy ---------- */}
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
          {/* LEFT -- asymmetric image collage */}
          <div className="relative mx-auto h-[380px] w-full max-w-lg sm:h-[480px] lg:h-[620px]">
            {/* large main image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute left-0 top-0 z-10 w-[68%] overflow-hidden rounded-2xl shadow-xl"
              style={{ y: img1Y }}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src="/assets/about1.jpeg"
                  alt="Kohinoor Decorations – wedding hall"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 70vw, 35vw"
                />
              </div>
            </motion.div>

            {/* smaller top-right image */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute right-0 top-8 z-20 w-[42%] overflow-hidden rounded-xl border-4 border-background shadow-lg"
              style={{ y: img2Y }}
            >
              <div className="relative aspect-square">
                <Image
                  src="/assets/about3.jpeg"
                  alt="Kohinoor Decorations – celebration detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 40vw, 20vw"
                />
              </div>
            </motion.div>

            {/* smaller bottom-right image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="absolute bottom-16 right-4 z-20 w-[48%] overflow-hidden rounded-xl border-4 border-background shadow-lg lg:bottom-32"
              style={{ y: img3Y }}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src="/assets/about2.jpeg"
                  alt="Kohinoor Decorations – elegant décor"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 45vw, 22vw"
                />
              </div>
            </motion.div>
          </div>

          {/* RIGHT -- copy, features, quote */}
          <div className="flex flex-col gap-10 lg:pt-4">
            {/* intro paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <p className="text-lg leading-relaxed text-foreground/90">
                Kohinoor Decorations specialises in decoration packages for
                weddings, receptions, and every celebration in between—from
                Haldi and Mehendi to engagement parties and beyond.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                We bring your vision to life with elegant florals, graceful
                drapery, and meticulous attention to detail. Whether you dream of
                a sun-drenched Haldi, a vibrant Mehendi night, or a grand
                reception, our dedicated team and flexible packages are here to
                transform your event into the celebration you have always
                imagined.
              </p>
            </motion.div>

            {/* feature cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 * i, duration: 0.5 }}
                  className="group relative rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-primary/60 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                    {f.title}
                  </span>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* decorative quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative border-l-2 border-primary/40 pl-5"
            >
              <p className="font-serif text-base italic leading-relaxed text-foreground/80">
                {'"Every celebration tells a story. We simply make sure the setting is unforgettable."'}
              </p>
              <cite className="mt-2 block text-xs font-medium not-italic text-muted-foreground">
                — Kohinoor Decorations
              </cite>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
