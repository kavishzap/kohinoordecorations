import { NextResponse } from "next/server"
import { rowToSlideDescriptors } from "@/lib/decoration-group-utils"
import { fetchDecorationGroupById } from "@/lib/supabase/decoration-groups"

/** Bundle metadata only (slide list, no R2 URLs). */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const row = await fetchDecorationGroupById(id)

  if (!row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const slides = rowToSlideDescriptors(row)

  return NextResponse.json(
    {
      group: {
        id: row.id,
        slides,
      },
    },
    { headers: { "Cache-Control": "no-store" } },
  )
}
