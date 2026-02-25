"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ThemeData } from "@/lib/data"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import SectionReveal from "./SectionReveal"

export default function ThemeSection({ theme }: { theme: ThemeData }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const onSelect = useCallback(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
  }, [api])

  const setApiCallback = useCallback(
    (newApi: CarouselApi) => {
      setApi(newApi)
      if (newApi) {
        newApi.on("select", onSelect)
        onSelect()
      }
    },
    [onSelect]
  )

  return (
    <SectionReveal className="py-6">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
        {/* Info */}
        <div className="flex-shrink-0 lg:w-80 lg:sticky lg:top-28">
          <h3 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            {theme.name}
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{theme.description}</p>

          <ul className="mt-6 space-y-2.5">
            {theme.bullets.map((b) => (
              <li key={b.label} className="flex items-start gap-2 text-sm">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                  <span className="font-medium text-foreground">{b.label}:</span>{" "}
                  <span className="text-muted-foreground">{b.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Carousel */}
        <div className="flex-1 min-w-0">
          <Carousel
            opts={{ align: "start", loop: true }}
            setApi={setApiCallback}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {theme.images.map((img, i) => (
                <CarouselItem key={i} className="pl-4 basis-[85%] sm:basis-[70%] lg:basis-[55%]">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md"
                  >
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 85vw, (max-width: 1024px) 70vw, 40vw"
                    />
                    {/* Overlay label */}
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#3D2C2C]/60 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                      <span className="p-4 text-sm font-medium text-white">
                        {img.label}
                      </span>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Controls */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => api?.scrollPrev()}
                className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
                aria-label="Previous slide"
              >
                <ChevronLeft className="size-4" />
              </button>
              <div className="flex gap-1.5">
                {theme.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => api?.scrollTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-400 ${
                      i === current ? "w-6 bg-primary" : "w-3 bg-border"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => api?.scrollNext()}
                className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
                aria-label="Next slide"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </Carousel>
        </div>
      </div>
    </SectionReveal>
  )
}
