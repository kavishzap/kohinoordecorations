const TABLE = "decoration_groups"

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return { url, key }
}

export type DecorationGroupRow = {
  id: string
  section: string
  name: string
  front_key: string
  inside_1_key: string
  inside_2_key: string | null
  video_key: string | null
  price: number
  created_at?: string
}

export async function fetchDecorationGroups(): Promise<DecorationGroupRow[]> {
  const env = getSupabaseEnv()
  if (!env) {
    console.error(`[supabase] Missing env for ${TABLE}`)
    return []
  }

  const params = new URLSearchParams({
    select:
      "id,section,name,front_key,inside_1_key,inside_2_key,video_key,price,created_at",
    order: "section.asc,created_at.desc",
  })

  try {
    const res = await fetch(`${env.url}/rest/v1/${TABLE}?${params}`, {
      headers: {
        apikey: env.key,
        Authorization: `Bearer ${env.key}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!res.ok) {
      console.error(`[supabase] ${TABLE}:`, res.status, await res.text())
      return []
    }

    const data = (await res.json()) as DecorationGroupRow[]
    if (!Array.isArray(data)) return []

    if (data.length === 0) {
      console.warn(
        `[supabase] ${TABLE}: 0 rows. Add public SELECT policy (see supabase/decoration_groups_public_read.sql).`,
      )
    }

    return data
      .filter((row) => row.name?.trim() && row.front_key?.trim())
      .map((row) => ({
        id: row.id,
        section: row.section.trim(),
        name: row.name.trim(),
        front_key: row.front_key.trim(),
        inside_1_key: row.inside_1_key?.trim() ?? "",
        inside_2_key: row.inside_2_key?.trim() || null,
        video_key: row.video_key?.trim() || null,
        price: Number(row.price) || 0,
        created_at: row.created_at,
      }))
  } catch (err) {
    console.error(`[supabase] ${TABLE}:`, err)
    return []
  }
}

export async function fetchDecorationGroupById(
  id: string,
): Promise<DecorationGroupRow | null> {
  const env = getSupabaseEnv()
  if (!env) return null

  const params = new URLSearchParams({
    select:
      "id,section,name,front_key,inside_1_key,inside_2_key,video_key,price",
    id: `eq.${id}`,
    limit: "1",
  })

  try {
    const res = await fetch(`${env.url}/rest/v1/${TABLE}?${params}`, {
      headers: {
        apikey: env.key,
        Authorization: `Bearer ${env.key}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!res.ok) {
      console.error(`[supabase] ${TABLE}/${id}:`, res.status, await res.text())
      return null
    }

    const data = (await res.json()) as DecorationGroupRow[]
    if (!Array.isArray(data) || data.length === 0) return null

    const row = data[0]
    return {
      id: row.id,
      section: row.section.trim(),
      name: row.name.trim(),
      front_key: row.front_key.trim(),
      inside_1_key: row.inside_1_key?.trim() ?? "",
      inside_2_key: row.inside_2_key?.trim() || null,
      video_key: row.video_key?.trim() || null,
      price: Number(row.price) || 0,
    }
  } catch (err) {
    console.error(`[supabase] ${TABLE}/${id}:`, err)
    return null
  }
}
