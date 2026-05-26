"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import type { MediaSlideDescriptor } from "@/lib/decoration-group-utils"

type DecorationMediaModalProps = {
  open: boolean
  onClose: () => void
  groupId: string | null
  slides: MediaSlideDescriptor[]
  initialFrontUrl: string | null
  loadingMeta: boolean
  error?: boolean
}

function VideoSlide({ src, play }: { src: string; play: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (play) {
      video.currentTime = 0
      const promise = video.play()
      if (promise) promise.catch(() => {})
    } else {
      video.pause()
    }
  }, [play, src])

  return (
    <video
      ref={videoRef}
      src={src}
      controls
      autoPlay
      muted
      playsInline
      preload="auto"
      className="block max-h-[85dvh] w-full max-w-[min(96vw,900px)] rounded-lg object-contain"
    />
  )
}

function SlideContent({
  src,
  type,
  play,
}: {
  src: string
  type: "image" | "video"
  play: boolean
}) {
  if (type === "video") {
    return <VideoSlide src={src} play={play} />
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      draggable={false}
      className="block max-h-[92dvh] max-w-[min(96vw,1200px)] w-auto select-none rounded-lg object-contain shadow-2xl"
    />
  )
}

export default function DecorationMediaModal({
  open,
  onClose,
  groupId,
  slides: slidesProp,
  initialFrontUrl,
  loadingMeta,
  error,
}: DecorationMediaModalProps) {
  const slides = slidesProp ?? []

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loadedUrls, setLoadedUrls] = useState<Partial<Record<string, string>>>(
    {},
  )
  const [loadingSlot, setLoadingSlot] = useState<string | null>(null)
  const [loadError, setLoadError] = useState(false)
  const loadedUrlsRef = useRef<Partial<Record<string, string>>>({})

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: slides.length > 1,
    align: "center",
    skipSnaps: false,
  })

  const currentSlide = slides[selectedIndex]
  const isVideoActive = currentSlide?.type === "video"

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect)
    onSelect()
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!open || !emblaApi || slides.length === 0) return
    emblaApi.reInit()
    emblaApi.scrollTo(0, true)
    setSelectedIndex(0)
  }, [open, emblaApi, slides.length])

  useEffect(() => {
    if (!open) {
      loadedUrlsRef.current = {}
      setLoadedUrls({})
      setSelectedIndex(0)
      setLoadingSlot(null)
      setLoadError(false)
      return
    }

    const frontSlide = slides.find((s) => s.slot === "front")
    if (initialFrontUrl && frontSlide) {
      loadedUrlsRef.current = { front: initialFrontUrl }
      setLoadedUrls({ front: initialFrontUrl })
    } else {
      loadedUrlsRef.current = {}
      setLoadedUrls({})
    }
    setSelectedIndex(0)
  }, [open, groupId, slides, initialFrontUrl])

  useEffect(() => {
    if (!open || !groupId || !currentSlide || loadingMeta) return

    const slot = currentSlide.slot
    if (loadedUrlsRef.current[slot]) return

    let cancelled = false

    async function loadSlideUrl() {
      setLoadingSlot(slot)
      setLoadError(false)

      try {
        const res = await fetch(
          `/api/decoration-groups/${groupId}/media?slot=${slot}`,
          { cache: "no-store" },
        )
        if (!res.ok) throw new Error("Failed to load media")
        const json = (await res.json()) as { url?: string }
        if (!json.url) throw new Error("No URL")
        if (!cancelled) {
          loadedUrlsRef.current[slot] = json.url
          setLoadedUrls((prev) => ({ ...prev, [slot]: json.url! }))
        }
      } catch {
        if (!cancelled) setLoadError(true)
      } finally {
        if (!cancelled) setLoadingSlot(null)
      }
    }

    loadSlideUrl()

    return () => {
      cancelled = true
    }
  }, [open, groupId, currentSlide?.slot, loadingMeta, selectedIndex])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") scrollPrev()
      if (e.key === "ArrowRight") scrollNext()
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose, scrollPrev, scrollNext])

  if (!open) return null

  const hasMultiple = slides.length > 1
  const ready = !loadingMeta && slides.length > 0

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
        aria-label="Decoration bundle viewer"
      >
        <button
          type="button"
          onClick={onClose}
          className="fixed top-3 right-3 z-[60] flex size-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/55 sm:top-4 sm:right-4"
          aria-label="Close"
        >
          <X className="size-5 sm:size-6" />
        </button>

        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={`relative flex min-h-[200px] w-full items-center justify-center px-2 sm:px-14 ${
            isVideoActive ? "max-w-[min(96vw,920px)]" : "max-w-[min(96vw,1200px)]"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {error || loadError || (!loadingMeta && slides.length === 0) ? (
            <p className="px-6 text-center text-sm text-white/80">
              Could not load photos. Please try again.
            </p>
          ) : !ready ? (
            <Loader2
              className="size-10 animate-spin text-white/80"
              aria-label="Loading"
            />
          ) : (
            <>
              <div
                ref={emblaRef}
                className={`w-full overflow-hidden touch-pan-y ${
                  isVideoActive ? "max-w-[min(96vw,900px)]" : ""
                }`}
              >
                <div className="flex">
                  {slides.map((slide, index) => {
                    const url = loadedUrls[slide.slot]
                    const isLoadingSlide =
                      loadingSlot === slide.slot && !url

                    return (
                      <div
                        key={slide.slot}
                        className="flex min-h-[min(50dvh,400px)] min-w-0 shrink-0 grow-0 basis-full items-center justify-center px-1"
                      >
                        {url ? (
                          <SlideContent
                            src={url}
                            type={slide.type}
                            play={index === selectedIndex}
                          />
                        ) : isLoadingSlide ? (
                          <Loader2
                            className="size-10 animate-spin text-white/70"
                            aria-hidden
                          />
                        ) : (
                          <div
                            className="h-[min(50dvh,400px)] w-full"
                            aria-hidden
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {hasMultiple && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      scrollPrev()
                    }}
                    className="absolute left-0 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/55 sm:-left-12 sm:size-10"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      scrollNext()
                    }}
                    className="absolute right-0 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/55 sm:-right-12 sm:size-10"
                    aria-label="Next"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                  <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/70">
                    {selectedIndex + 1} / {slides.length}
                  </p>
                </>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
