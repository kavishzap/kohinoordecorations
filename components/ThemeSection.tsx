"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { ThemeData } from "@/lib/data"
import type { GalleryItem } from "@/lib/data"
import GalleryImage from "./GalleryImage"
import LightboxModal from "./LightboxModal"
import SectionReveal from "./SectionReveal"
import { ThemeGridSkeleton } from "./skeletons/MediaSkeletons"

const IMAGE_ASPECT = "relative w-full aspect-square"

const GRID_CLASS =
  "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-4"

export default function ThemeSection({
  theme,
  loading = false,
}: {
  theme: ThemeData
  loading?: boolean
}) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const lightboxItems: GalleryItem[] = theme.images.map((img, i) => ({
    id: i,
    category: theme.slug,
    title: "",
    image: img.src,
  }))

  return (
    <SectionReveal className="w-full min-w-0 py-6 first:pt-0">
      <div className="w-full min-w-0">
        <h3 className="w-full font-serif text-2xl font-bold text-foreground sm:text-3xl">
          {theme.name}
        </h3>

        <div className="mt-3 w-full min-w-0 space-y-2">
          <p className="block w-full max-w-none text-base leading-relaxed text-muted-foreground sm:text-lg sm:text-justify">
            {theme.descriptionLines[0]}
          </p>
          <p className="block w-full max-w-none text-base leading-relaxed text-muted-foreground sm:text-lg sm:text-justify">
            {theme.descriptionLines[1]}
          </p>
        </div>

        <div className="mt-4 w-full min-w-0">
          {loading ? (
            <ThemeGridSkeleton count={10} />
          ) : theme.images.length === 0 ? (
            <div className="flex min-h-[240px] w-full items-center justify-center border border-dashed border-border bg-card/50 px-6 text-center text-sm leading-relaxed text-muted-foreground">
              New photos for this theme will appear here soon. Contact Kohinoor
              Decorations to view more of our recent work.
            </div>
          ) : (
            <div className={GRID_CLASS}>
              {theme.images.map((img, i) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.35 }}
                  className="min-w-0"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIdx(i)}
                    className="block h-full w-full min-w-0 overflow-hidden rounded-2xl shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                    aria-label={`View photo ${i + 1}`}
                  >
                    <GalleryImage
                      src={img.src}
                      alt=""
                      aspectClassName={IMAGE_ASPECT}
                      className="rounded-2xl"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {lightboxIdx !== null && theme.images.length > 0 && (
        <LightboxModal
          items={lightboxItems}
          currentIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNavigate={setLightboxIdx}
        />
      )}
    </SectionReveal>
  )
}
