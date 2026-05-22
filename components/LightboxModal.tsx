"use client"

import { useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { GalleryItem } from "@/lib/data"

interface LightboxModalProps {
  items: GalleryItem[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function LightboxModal({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const item = items[currentIndex]

  const goPrev = useCallback(() => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1)
  }, [currentIndex, items.length, onNavigate])

  const goNext = useCallback(() => {
    onNavigate(currentIndex < items.length - 1 ? currentIndex + 1 : 0)
  }, [currentIndex, items.length, onNavigate])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose, goPrev, goNext])

  if (!item) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#3D2C2C]/90 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
      >
        <button
          type="button"
          onClick={onClose}
          className="fixed top-3 right-3 z-[60] flex size-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:top-4 sm:right-4"
          aria-label="Close lightbox"
        >
          <X className="size-5 sm:size-6" />
        </button>

        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative flex max-h-[96dvh] max-w-[96vw] items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={item.image}
              src={item.image}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              draggable={false}
              className="block max-h-[96dvh] max-w-[96vw] h-auto w-auto rounded-lg object-contain shadow-2xl sm:max-h-[92dvh] sm:max-w-[min(92vw,1200px)] sm:rounded-2xl"
            />
          </AnimatePresence>

          <button
            type="button"
            onClick={goPrev}
            className="absolute left-1 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/55 sm:-left-14 sm:size-10 sm:bg-white/10 sm:hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-1 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/55 sm:-right-14 sm:size-10 sm:bg-white/10 sm:hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="size-5" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
