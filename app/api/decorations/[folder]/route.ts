import { NextResponse } from "next/server"
import {
  ALLOWED_STORAGE_FOLDERS,
  STORAGE_FOLDER_LABELS,
} from "@/lib/supabase/allowed-folders"
import { listDecorationImages } from "@/lib/supabase/storage"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ folder: string }> },
) {
  const { folder } = await params

  if (!ALLOWED_STORAGE_FOLDERS.has(folder)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 })
  }

  const label = STORAGE_FOLDER_LABELS[folder] ?? folder
  const images = await listDecorationImages(folder, label)

  return NextResponse.json(
    { folder, images },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  )
}
