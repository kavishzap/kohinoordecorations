const TABLE = "kohinoor_company"

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return { url, key }
}

export type KohinoorCompanyRow = {
  id: string
  address: string
  phone: string
  email: string
  google_map_location: string
  facebook_link: string
  instagram_link: string
  tiktok_link: string
}

/** Public company profile from kohinoor_company (first row). */
export async function fetchKohinoorCompany(): Promise<KohinoorCompanyRow | null> {
  const env = getSupabaseEnv()
  if (!env) {
    console.error(`[supabase] Missing env for ${TABLE}`)
    return null
  }

  const params = new URLSearchParams({
    select:
      "id,address,phone,email,google_map_location,facebook_link,instagram_link,tiktok_link",
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
      console.error(`[supabase] ${TABLE}:`, res.status, await res.text())
      return null
    }

    const data = (await res.json()) as KohinoorCompanyRow[]
    if (!Array.isArray(data) || data.length === 0) return null

    const row = data[0]
    return {
      id: row.id,
      address: row.address?.trim() ?? "",
      phone: row.phone?.trim() ?? "",
      email: row.email?.trim() ?? "",
      google_map_location: row.google_map_location?.trim() ?? "",
      facebook_link: row.facebook_link?.trim() ?? "",
      instagram_link: row.instagram_link?.trim() ?? "",
      tiktok_link: row.tiktok_link?.trim() ?? "",
    }
  } catch (err) {
    console.error(`[supabase] ${TABLE}:`, err)
    return null
  }
}
