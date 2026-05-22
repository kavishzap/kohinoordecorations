"use client"

import { useState } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface GalleryImageProps {
  src: string
  alt: string
  className?: string
  sizes?: string
  aspectClassName?: string
}

/** Gallery tile with skeleton until the remote image has loaded. */
export default function GalleryImage({
  src,
  alt,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  aspectClassName = "relative w-full",
}: GalleryImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn(aspectClassName, "overflow-hidden", className)}>
      {!loaded && (
        <Skeleton className={cn("absolute inset-0", className)} />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  )
}
