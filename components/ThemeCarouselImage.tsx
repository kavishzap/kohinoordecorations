"use client"

import { useState } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ThemeCarouselImageProps {
  src: string
  alt: string
  label: string
}

/** Theme carousel slide with skeleton until the remote image has loaded. */
export default function ThemeCarouselImage({
  src,
  alt,
  label,
}: ThemeCarouselImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
      {!loaded && <Skeleton className="absolute inset-0 rounded-2xl" />}
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes="(max-width: 768px) 85vw, (max-width: 1024px) 70vw, 40vw"
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover transition-all duration-500 group-hover:scale-105",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={cn(
          "absolute inset-0 flex items-end bg-gradient-to-t from-[#3D2C2C]/60 via-transparent to-transparent transition-opacity duration-400",
          loaded ? "opacity-0 group-hover:opacity-100" : "opacity-0",
        )}
      >
        <span className="p-4 text-sm font-medium text-white">{label}</span>
      </div>
    </div>
  )
}
