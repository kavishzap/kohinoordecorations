import { NextResponse } from "next/server"
import type { DecorationGroupSummary } from "@/lib/decoration-group-utils"
import { getR2ObjectUrl } from "@/lib/r2"
import { fetchDecorationGroups } from "@/lib/supabase/decoration-groups"

/** List decoration groups with front image URL only (optimized). */
export async function GET() {
  const rows = await fetchDecorationGroups()

  const groups: DecorationGroupSummary[] = await Promise.all(
    rows.map(async (row) => ({
      id: row.id,
      section: row.section,
      name: row.name,
      price: row.price,
      frontUrl: await getR2ObjectUrl(row.front_key),
    })),
  )

  const visible = groups.filter((g) => g.frontUrl)
  const uniqueSections = [...new Set(visible.map((g) => g.section))]

  return NextResponse.json(
    {
      sections: uniqueSections,
      groups: visible,
    },
    { headers: { "Cache-Control": "no-store" } },
  )
}
