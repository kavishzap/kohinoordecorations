"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import type { ParsedVideo } from "@/lib/video-utils"

interface VideoPlayerModalProps {
  video: ParsedVideo | null
  open: boolean
  onClose: () => void
}

export default function VideoPlayerModal({
  video,
  open,
  onClose,
}: VideoPlayerModalProps) {
  const tiktokSrc = video?.playerUrl ?? video?.embedUrl

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[92vh] max-w-[min(92vw,400px)] gap-0 overflow-hidden rounded-2xl border-0 bg-black p-0 shadow-2xl"
      >
        <DialogTitle className="sr-only">Play video</DialogTitle>

        {video?.type === "tiktok" && tiktokSrc && (
          <iframe
            src={tiktokSrc}
            title="TikTok video"
            className="aspect-[9/16] w-full bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        )}

        {video?.type === "direct" && video.directSrc && (
          <video
            src={video.directSrc}
            controls
            autoPlay
            playsInline
            className="aspect-[9/16] w-full bg-black object-contain"
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
