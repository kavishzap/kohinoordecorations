"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  galleryItems,
  galleryTabs,
  galleryBucketByCategory,
} from "@/lib/data"
import type { GalleryItem } from "@/lib/data"
import LightboxModal from "./LightboxModal"
import SectionReveal from "./SectionReveal"
import DecorativeDivider from "./DecorativeDivider"
import { GalleryGridSkeleton } from "./skeletons/MediaSkeletons"
import GalleryImage from "./GalleryImage"
import VideoSection from "./VideoSection"

function mapStorageImagesToGalleryItems(
  category: string,
  images: { src: string; label: string }[],
): GalleryItem[] {
  const idBase = category.split("").reduce((n, c) => n + c.charCodeAt(0), 0) * 1000
  return images.map((img, i) => ({
    id: idBase + i,
    category,
    title: "",
    image: img.src,
  }))
}

export default function GalleryTabs() {
  const [activeTab, setActiveTab] = useState("all")
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [remoteByCategory, setRemoteByCategory] = useState<
    Record<string, GalleryItem[]>
  >({})
  const [loadingFolders, setLoadingFolders] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadStorageGalleries() {
      setLoadingFolders(true)
      const entries = await Promise.all(
        Object.entries(galleryBucketByCategory).map(
          async ([category, bucketFolder]) => {
            try {
              const res = await fetch(`/api/decorations/${bucketFolder}`, {
                cache: "no-store",
              })
              if (!res.ok) return [category, []] as const
              const json = (await res.json()) as {
                images?: { src: string; label: string }[]
              }
              const items = mapStorageImagesToGalleryItems(
                category,
                json.images ?? [],
              )
              return [category, items] as const
            } catch (err) {
              console.warn(`[gallery] ${category}:`, err)
              return [category, []] as const
            }
          },
        ),
      )

      if (!cancelled) {
        setRemoteByCategory(Object.fromEntries(entries))
        setLoadingFolders(false)
      }
    }

    loadStorageGalleries()
    return () => {
      cancelled = true
    }
  }, [])

  const allItems = useMemo(() => {
    const bucketCategories = new Set(Object.keys(galleryBucketByCategory))
    const staticFallback = galleryItems.filter(
      (item) => !bucketCategories.has(item.category),
    )
    const remoteItems = Object.values(remoteByCategory).flat()
    return [...staticFallback, ...remoteItems]
  }, [remoteByCategory])

  const filtered =
    activeTab === "all"
      ? allItems
      : allItems.filter((item) => item.category === activeTab)


  useEffect(() => {
    setLightboxIdx(null)
  }, [activeTab])

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
        {loadingFolders ? (
          <GalleryGridSkeleton count={activeTab === "all" ? 9 : 6} />
        ) : filtered.length === 0 ? (
          <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 px-6 text-center text-sm leading-relaxed text-muted-foreground">
            {activeTab === "all"
              ? "Our gallery is being updated with new celebration photos. Please check back soon."
              : `Photos for ${galleryTabs.find((t) => t.value === activeTab)?.label ?? "this collection"} will appear here soon. Contact us to see more examples.`}
          </div>
        ) : (
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
                  key={`${item.category}-${item.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="mb-4 break-inside-avoid"
                >
                  <button
                    onClick={() => setLightboxIdx(i)}
                    className="group relative block w-full overflow-hidden rounded-2xl shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={`View photo ${i + 1}`}
                  >
                    <GalleryImage
                      src={item.image}
                      alt=""
                      aspectClassName={
                        i % 3 === 0
                          ? "relative w-full aspect-[3/4]"
                          : i % 3 === 1
                            ? "relative w-full aspect-square"
                            : "relative w-full aspect-[4/3]"
                      }
                      className="transition-transform duration-500 group-hover:scale-103"
                    />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        <VideoSection embedded />
      </div>

      {lightboxIdx !== null && filtered.length > 0 && (
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
