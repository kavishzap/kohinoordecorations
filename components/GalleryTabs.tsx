"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { galleryItems, galleryTabs } from "@/lib/data"
import LightboxModal from "./LightboxModal"
import SectionReveal from "./SectionReveal"
import DecorativeDivider from "./DecorativeDivider"

export default function GalleryTabs() {
  const [activeTab, setActiveTab] = useState("all")
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const filtered =
    activeTab === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab)

  return (
    <section id="gallery" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal>
          <div className="mb-12 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Portfolio
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl text-balance">
              Featured Gallery
            </h2>
            <DecorativeDivider className="mt-4" />
          </div>
        </SectionReveal>

        {/* Tab bar */}
        <SectionReveal delay={0.1}>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {galleryTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.value
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === tab.value && (
                  <motion.span
                    layoutId="gallery-tab-bg"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="columns-1 gap-4 sm:columns-2 lg:columns-3"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="mb-4 break-inside-avoid"
              >
                <button
                  onClick={() => setLightboxIdx(i)}
                  className="group relative block w-full overflow-hidden rounded-2xl shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={`View ${item.title}`}
                >
                  <div
                    className={`relative w-full ${
                      i % 3 === 0
                        ? "aspect-[3/4]"
                        : i % 3 === 1
                        ? "aspect-square"
                        : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#3D2C2C]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="p-4">
                      <span className="text-xs font-medium uppercase tracking-wider text-white/80">
                        {galleryTabs.find((t) => t.value === item.category)?.label ?? item.category}
                      </span>
                      <p className="mt-0.5 text-sm font-medium text-white">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <LightboxModal
          items={filtered}
          currentIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNavigate={setLightboxIdx}
        />
      )}
    </section>
  )
}
