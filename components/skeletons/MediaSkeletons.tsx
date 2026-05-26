import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const GALLERY_ASPECTS = ["aspect-[3/4]", "aspect-square", "aspect-[4/3]"] as const

/** Package pricing cards placeholder while Supabase packages load. */
export function PackageCardsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div
      className="grid gap-8 md:grid-cols-3"
      aria-busy
      aria-label="Loading packages"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-[420px] w-full rounded-2xl" />
      ))}
    </div>
  )
}

/** Decoration gallery masonry placeholder while Supabase images load. */
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
