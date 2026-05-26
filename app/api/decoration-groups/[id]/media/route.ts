import { NextResponse } from "next/server"
import { isValidMediaSlot } from "@/lib/decoration-group-utils"
import { getR2ObjectUrl } from "@/lib/r2"
import { fetchDecorationGroupById } from "@/lib/supabase/decoration-groups"

function keyForSlot(
  row: Awaited<ReturnType<typeof fetchDecorationGroupById>>,
  slot: string,
): string | null {
  if (!row) return null
  switch (slot) {
    case "front":
      return row.front_key
    case "inside1":
      return row.inside_1_key || null
    case "inside2":
      return row.inside_2_key
    case "video":
      return row.video_key
    default:
      return null
  }
}

/** Sign a single R2 object for one bundle slide (lazy load). */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const slot = new URL(request.url).searchParams.get("slot")

  if (!slot || !isValidMediaSlot(slot)) {
    return NextResponse.json({ error: "Invalid slot" }, { status: 400 })
  }

  const row = await fetchDecorationGroupById(id)
  if (!row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const objectKey = keyForSlot(row, slot)
  if (!objectKey) {
    return NextResponse.json({ error: "No media for slot" }, { status: 404 })
  }

  const url = await getR2ObjectUrl(objectKey)
  if (!url) {
    return NextResponse.json({ error: "Could not sign URL" }, { status: 500 })
  }

  return NextResponse.json(
    { slot, url },
    { headers: { "Cache-Control": "no-store" } },
  )
}
