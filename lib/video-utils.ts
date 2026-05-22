export type ParsedVideo = {
  originalUrl: string
  type: "tiktok" | "direct" | "unsupported"
  /** @deprecated Use playerUrl for in-app modal */
  embedUrl?: string
  /** TikTok Embed Player — video only, no captions or chrome */
  playerUrl?: string
  videoId?: string
}

/** Minimal TikTok player: video only (no description, music info, or controls). */
export function buildTikTokPlayerUrl(videoId: string): string {
  const params = new URLSearchParams({
    controls: "0",
    progress_bar: "0",
    play_button: "0",
    volume_control: "0",
    fullscreen_button: "0",
    timestamp: "0",
    music_info: "0",
    description: "0",
    closed_caption: "0",
    native_context_menu: "0",
    autoplay: "1",
  })
  return `https://www.tiktok.com/player/v1/${videoId}?${params.toString()}`
}

const DIRECT_VIDEO = /\.(mp4|webm|mov|m4v)(\?.*)?$/i

/** Extract TikTok numeric video id from common URL shapes. */
export function getTikTokVideoId(url: string): string | null {
  const trimmed = url.trim()
  const videoPath = trimmed.match(/\/video\/(\d+)/)
  if (videoPath) return videoPath[1]

  const embed = trimmed.match(/\/embed\/v2\/(\d+)/)
  if (embed) return embed[1]

  if (/tiktok\.com/i.test(trimmed)) {
    const longId = trimmed.match(/(\d{15,})/)
    if (longId) return longId[1]
  }

  return null
}

/** Build a canonical TikTok URL for oEmbed (works best with /@user/video/id). */
export function buildTikTokCanonicalUrl(url: string): string {
  const trimmed = url.trim()
  try {
    const parsed = new URL(trimmed)
    if (parsed.hostname.includes("tiktok.com") && /\/video\/\d+/.test(parsed.pathname)) {
      return `${parsed.origin}${parsed.pathname}`
    }
  } catch {
    // fall through
  }

  const videoId = getTikTokVideoId(trimmed)
  const handle = trimmed.match(/@([^/?#\s]+)/)?.[1]
  if (videoId && handle) {
    return `https://www.tiktok.com/@${handle}/video/${videoId}`
  }

  return trimmed
}

/** Parse TikTok or direct video URLs for in-app playback. */
export function parseVideoUrl(url: string): ParsedVideo {
  const trimmed = url.trim()
  if (!trimmed) return { originalUrl: url, type: "unsupported" }

  if (DIRECT_VIDEO.test(trimmed)) {
    return { originalUrl: trimmed, type: "direct", directSrc: trimmed }
  }

  const videoId = getTikTokVideoId(trimmed)
  if (videoId && /tiktok\.com/i.test(trimmed)) {
    const playerUrl = buildTikTokPlayerUrl(videoId)
    return {
      originalUrl: trimmed,
      type: "tiktok",
      videoId,
      playerUrl,
      embedUrl: playerUrl,
    }
  }

  return { originalUrl: trimmed, type: "unsupported" }
}

export type TikTokOEmbed = {
  thumbnail_url?: string
  title?: string
  author_name?: string
}

/** Fetch TikTok thumbnail and title from the public oEmbed API. */
export async function fetchTikTokOEmbed(
  videoUrl: string,
): Promise<TikTokOEmbed | null> {
  const canonical = buildTikTokCanonicalUrl(videoUrl)

  try {
    const endpoint = `https://www.tiktok.com/oembed?url=${encodeURIComponent(canonical)}`
    const res = await fetch(endpoint, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
      cache: "force-cache",
      next: { revalidate: 86_400 },
      signal: AbortSignal.timeout(45_000),
    })
    if (!res.ok) {
      console.warn("[tiktok-oembed] failed:", res.status, canonical)
      return null
    }

    const data = (await res.json()) as Record<string, unknown>
    return {
      thumbnail_url:
        typeof data.thumbnail_url === "string" ? data.thumbnail_url : undefined,
      title: typeof data.title === "string" ? data.title : undefined,
      author_name:
        typeof data.author_name === "string" ? data.author_name : undefined,
    }
  } catch (err) {
    console.warn("[tiktok-oembed]", canonical, err)
    return null
  }
}

/** Resolve thumbnail + description for a video URL. */
export async function fetchVideoPreview(
  videoUrl: string,
  parsed: ParsedVideo,
  dbDescription?: string | null,
): Promise<{ thumbnailUrl?: string; description: string }> {
  const fromDb = dbDescription?.trim() ?? ""

  if (parsed.type === "tiktok") {
    const oembed = await fetchTikTokOEmbed(videoUrl)
    return {
      thumbnailUrl: oembed?.thumbnail_url,
      description: fromDb || oembed?.title?.trim() || "",
    }
  }

  return { description: fromDb }
}
