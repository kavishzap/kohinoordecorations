import type { DecorationPackage, PackageWeddingType } from "@/lib/package-utils"

const TABLE = "decoration_packages"

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return { url, key }
}

type DecorationPackageRow = {
  id: string
  name: string
  pricing_range: string
  wedding_type: PackageWeddingType
  items: string[]
  display_order: number
  most_popular: boolean
}

/** All decoration packages, ordered by wedding type then display_order. */
export async function fetchDecorationPackages(): Promise<DecorationPackage[]> {
  const env = getSupabaseEnv()
  if (!env) {
    console.error(`[supabase] Missing env for ${TABLE}`)
    return []
  }

  const params = new URLSearchParams({
    select:
      "id,name,pricing_range,wedding_type,items,display_order,most_popular",
    order: "wedding_type.asc,display_order.asc",
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

    const data = (await res.json()) as DecorationPackageRow[]
    if (!Array.isArray(data)) return []

    if (data.length === 0) {
      console.warn(
        `[supabase] ${TABLE}: 0 rows returned. If data exists in the dashboard, add a public SELECT policy (see supabase/decoration_packages_public_read.sql).`,
      )
    }

    return data
      .filter((row) => row.name?.trim() && row.pricing_range?.trim())
      .map((row) => ({
        id: row.id,
        name: row.name.trim(),
        pricingRange: row.pricing_range.trim(),
        weddingType: row.wedding_type,
        items: Array.isArray(row.items)
          ? row.items.map((i) => String(i).trim()).filter(Boolean)
          : [],
        displayOrder: row.display_order ?? 1,
        mostPopular: !!row.most_popular,
      }))
      .filter((row) => row.items.length > 0)
  } catch (err) {
    console.error(`[supabase] ${TABLE}:`, err)
    return []
  }
}
