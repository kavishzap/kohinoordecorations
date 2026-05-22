"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import type { ParsedVideo } from "@/lib/video-utils"
import { parseVideoUrl } from "@/lib/video-utils"
import VideoPlayerModal from "./VideoPlayerModal"
import SectionReveal from "./SectionReveal"
import DecorativeDivider from "./DecorativeDivider"
import { Skeleton } from "@/components/ui/skeleton"

type VideoItem = {
  id: string
  video_url: string
  description: string
  thumbnail_url?: string | null
  parsed: ParsedVideo
}

function VideoCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="aspect-square w-full rounded-2xl" />
      <Skeleton className="mx-auto h-4 w-4/5 rounded-md" />
    </div>
  )
}

function TikTokVideoCard({
  item,
  index,
  onPlay,
}: {
  item: VideoItem
  index: number
  onPlay: (parsed: ParsedVideo) => void
}) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    item.thumbnail_url ?? null,
  )
  const [description, setDescription] = useState(item.description)
  const [thumbLoading, setThumbLoading] = useState(
    item.parsed.type === "tiktok" && !item.thumbnail_url,
  )

  useEffect(() => {
    if (item.parsed.type !== "tiktok") {
      setThumbLoading(false)
      return
    }

    let cancelled = false

    async function loadPreview() {
      try {
        const res = await fetch(
          `/api/tiktok-preview?url=${encodeURIComponent(item.video_url)}`,
          { cache: "force-cache" },
        )
        if (!res.ok) return

        const data = (await res.json()) as {
          thumbnail_url?: string | null
          description?: string
        }

        if (cancelled) return

        if (data.thumbnail_url) setThumbnailUrl(data.thumbnail_url)
        if (data.description?.trim()) {
          setDescription((prev) => prev || data.description!.trim())
        }
      } catch (err) {
        console.warn("[videos] thumbnail:", err)
      } finally {
        if (!cancelled) setThumbLoading(false)
      }
    }

    if (!thumbnailUrl) loadPreview()
    else setThumbLoading(false)

    return () => {
      cancelled = true
    }
  }, [item.video_url, item.parsed.type, thumbnailUrl])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="flex min-w-0 flex-col gap-2"
    >
      <button
        type="button"
        onClick={() => onPlay(item.parsed)}
        className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-foreground/90 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={
          description
            ? `Play video: ${description}`
            : `Play video ${index + 1}`
        }
      >
        {thumbLoading && (
          <Skeleton className="absolute inset-0 rounded-2xl" />
        )}

        {thumbnailUrl && !thumbLoading ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnailUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : !thumbLoading ? (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-foreground/80 to-foreground" />
        ) : null}

        <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/40" />

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg transition-transform duration-300 group-hover:scale-110 sm:size-14">
            <Play className="size-6 fill-primary sm:size-7" strokeWidth={0} />
          </span>
        </div>
      </button>

      {description ? (
        <p className="line-clamp-3 text-center text-xs leading-snug text-muted-foreground sm:text-sm">
          {description}
        </p>
      ) : null}
    </motion.div>
  )
}

interface VideoSectionProps {
  embedded?: boolean
}

export default function VideoSection({ embedded = false }: VideoSectionProps) {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeVideo, setActiveVideo] = useState<ParsedVideo | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const res = await fetch("/api/videos", { cache: "no-store" })
        if (!res.ok) throw new Error(String(res.status))
        const json = (await res.json()) as { videos?: VideoItem[] }
        if (!cancelled) {
          setVideos(
            (json.videos ?? []).map((v) => ({
              id: String(v.id),
              video_url: v.video_url,
              description: v.description ?? "",
              thumbnail_url: v.thumbnail_url ?? null,
              parsed: v.parsed ?? parseVideoUrl(v.video_url),
            })),
          )
        }
      } catch (err) {
        console.warn("[videos]", err)
        if (!cancelled) setVideos([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  function openVideo(parsed: ParsedVideo) {
    setActiveVideo(parsed)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setActiveVideo(null)
  }

  const inner = (
    <>
      <SectionReveal>
        <div className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Watch Us
          </p>
          <h3 className="mt-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl text-balance">
            Our Work in Motion
          </h3>
          <DecorativeDivider className="mt-4" />
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground leading-relaxed sm:text-base">
            Short clips from real celebrations—Haldi, Mehendi, receptions, and more.
          </p>
        </div>
      </SectionReveal>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 px-6 text-center text-sm leading-relaxed text-muted-foreground">
          New videos will appear here soon. Check back for the latest from Kohinoor
          Decorations.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {videos.map((item, i) => (
            <TikTokVideoCard
              key={`${item.id}-${item.video_url}`}
              item={item}
              index={i}
              onPlay={openVideo}
            />
          ))}
        </div>
      )}

      <VideoPlayerModal
        video={activeVideo}
        open={modalOpen}
        onClose={closeModal}
      />
    </>
  )

  if (embedded) {
    return (
      <div id="videos" className="mt-20 border-t border-border pt-20">
        {inner}
      </div>
    )
  }

  return (
    <section id="videos" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">{inner}</div>
    </section>
  )
}
