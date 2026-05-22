import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const GALLERY_ASPECTS = ["aspect-[3/4]", "aspect-square", "aspect-[4/3]"] as const

/** Decoration Themes uniform grid placeholder while Supabase images load. */
export function ThemeGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-4"
      aria-busy
      aria-label="Loading theme photos"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="aspect-square w-full rounded-2xl" />
      ))}
    </div>
  )
}

/** Featured Gallery masonry placeholder while Supabase images load. */
export function GalleryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="columns-1 gap-4 sm:columns-2 lg:columns-3"
      aria-busy
      aria-label="Loading gallery photos"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "mb-4 w-full break-inside-avoid rounded-2xl",
            GALLERY_ASPECTS[i % GALLERY_ASPECTS.length],
          )}
        />
      ))}
    </div>
  )
}
