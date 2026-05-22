const MAX_VIDEOS = 10
const TABLE = "kohinoor_videos"

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return { url, key }
}

export type KohinoorVideoRow = {
  id: string
  video_url: string
  sort_order?: number
  description?: string | null
}

async function queryVideos(
  env: { url: string; key: string },
  select: string,
): Promise<KohinoorVideoRow[] | null> {
  const params = new URLSearchParams({
    select,
    order: "sort_order.asc,created_at.asc",
    limit: String(MAX_VIDEOS),
  })

  const res = await fetch(`${env.url}/rest/v1/${TABLE}?${params}`, {
    headers: {
      apikey: env.key,
      Authorization: `Bearer ${env.key}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!res.ok) return null

  const data = (await res.json()) as KohinoorVideoRow[]
  if (!Array.isArray(data)) return []

  return data
    .filter((row) => row.video_url?.trim())
    .slice(0, MAX_VIDEOS)
}

/** Fetch up to 10 videos from kohinoor_videos, ordered by sort_order. */
export async function fetchKohinoorVideos(): Promise<KohinoorVideoRow[]> {
  const env = getSupabaseEnv()
  if (!env) {
    console.error(`[supabase] Missing env for ${TABLE}`)
    return []
  }

  try {
    const withDescription = await queryVideos(
      env,
      "id,video_url,sort_order,description",
    )
    if (withDescription) return withDescription

    const fallback = await queryVideos(env, "id,video_url,sort_order")
    if (fallback) return fallback

    console.error(`[supabase] ${TABLE}: request failed`)
    return []
  } catch (err) {
    console.error(`[supabase] ${TABLE}:`, err)
    return []
  }
}
