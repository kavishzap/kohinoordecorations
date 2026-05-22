import { NextRequest, NextResponse } from "next/server"
import { fetchVideoPreview, parseVideoUrl } from "@/lib/video-utils"

/** Fetch TikTok thumbnail + title for one video URL (cached). */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")?.trim()
  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 })
  }

  const parsed = parseVideoUrl(url)
  if (parsed.type !== "tiktok") {
    return NextResponse.json(
      { thumbnail_url: null, description: "" },
      { status: 200 },
    )
  }

  const preview = await fetchVideoPreview(url, parsed)

  return NextResponse.json(
    {
      thumbnail_url: preview.thumbnailUrl ?? null,
      description: preview.description,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  )
}
