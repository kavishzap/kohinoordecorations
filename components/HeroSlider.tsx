"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { heroSlides } from "@/lib/data"

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* All images stacked -- active one gets opacity 1, rest stay 0 for instant crossfade */}
      {heroSlides.map((slide, i) => (
        <motion.div
          key={slide.src}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ y: parallaxY }}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </motion.div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D2C2C]/50 via-[#3D2C2C]/30 to-[#3D2C2C]/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="font-serif text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl text-balance"
        >
          Transforming Moments
          <br />
          Into Memories
        </motion.h1>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="my-6 flex items-center gap-3"
        >
          <span className="h-px w-12 bg-white/40" />
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white/60">
            <path
              d="M10 2C10 2 13 6 13 10C13 14 10 18 10 18C10 18 7 14 7 10C7 6 10 2 10 2Z"
              stroke="currentColor"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.2"
            />
          </svg>
          <span className="h-px w-12 bg-white/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-xl text-base font-light leading-relaxed text-white/80 sm:text-lg"
        >
          Floral d&eacute;cor setups for Haldi, Mehendi, Reception &amp; Special Events
        </motion.p>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-white" : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
