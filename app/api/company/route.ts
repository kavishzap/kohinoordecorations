import { NextResponse } from "next/server"
import { mapCompanyRow } from "@/lib/company-utils"
import { fetchKohinoorCompany } from "@/lib/supabase/company"

/** Company contact & social links from kohinoor_company. */
export async function GET() {
  const row = await fetchKohinoorCompany()

  if (!row) {
    return NextResponse.json(
      { company: null },
      { headers: { "Cache-Control": "no-store" } },
    )
  }

  return NextResponse.json(
    { company: mapCompanyRow(row) },
    { headers: { "Cache-Control": "no-store" } },
  )
}
