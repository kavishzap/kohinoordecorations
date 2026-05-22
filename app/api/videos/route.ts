import { NextResponse } from "next/server"
import { fetchKohinoorVideos } from "@/lib/supabase/videos"
import { parseVideoUrl } from "@/lib/video-utils"

/** List videos from Supabase; thumbnails load via /api/tiktok-preview per card. */
export async function GET() {
  const rows = await fetchKohinoorVideos()

  const videos = rows.map((row) => {
    const video_url = row.video_url.trim()
    return {
      id: row.id,
      video_url,
      description: row.description?.trim() ?? "",
      parsed: parseVideoUrl(video_url),
    }
  })

  return NextResponse.json(
    { videos },
    { headers: { "Cache-Control": "no-store" } },
  )
}
