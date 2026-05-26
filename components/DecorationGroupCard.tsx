"use client"

import { Loader2 } from "lucide-react"
import {
  formatDecorationPrice,
  type DecorationGroupSummary,
} from "@/lib/decoration-group-utils"
import { Skeleton } from "@/components/ui/skeleton"

type DecorationGroupCardProps = {
  group: DecorationGroupSummary
  onSeeBundle: (group: DecorationGroupSummary) => void
  loadingDetail?: boolean
}

export default function DecorationGroupCard({
  group,
  onSeeBundle,
  loadingDetail = false,
}: DecorationGroupCardProps) {
  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => onSeeBundle(group)}
        disabled={loadingDetail}
        aria-label="See full setup"
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted shadow-sm transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {group.frontUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={group.frontUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <Skeleton className="absolute inset-0 rounded-2xl" />
        )}
        {loadingDetail && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Loader2 className="size-8 animate-spin text-white" aria-hidden />
          </span>
        )}
      </button>

      <div className="mt-3 flex items-baseline justify-between gap-3">
        <p className="text-xl font-bold text-primary">
          {formatDecorationPrice(group.price)}
        </p>
        <button
          type="button"
          onClick={() => onSeeBundle(group)}
          disabled={loadingDetail}
          className="shrink-0 text-sm font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary disabled:opacity-60"
        >
          {loadingDetail ? (
            <span className="inline-flex items-center gap-1.5 no-underline">
              <Loader2 className="size-3.5 animate-spin" aria-hidden />
              Loading…
            </span>
          ) : (
            "See full setup"
          )}
        </button>
      </div>
    </div>
  )
}
