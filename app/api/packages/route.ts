import { NextResponse } from "next/server"
import {
  buildPackageSelectOptions,
  groupPackagesByWeddingType,
} from "@/lib/package-utils"
import { fetchDecorationPackages } from "@/lib/supabase/packages"

/** Decoration packages grouped by Indian / Muslim wedding type. */
export async function GET() {
  const rows = await fetchDecorationPackages()
  const weddingTypes = groupPackagesByWeddingType(rows)
  const selectOptions = buildPackageSelectOptions(weddingTypes)

  return NextResponse.json(
    { weddingTypes, selectOptions },
    { headers: { "Cache-Control": "no-store" } },
  )
}
