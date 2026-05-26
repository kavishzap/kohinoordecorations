"use client"

import { useEffect, useState } from "react"
import type { CompanyProfile } from "@/lib/company-utils"

let cachedPromise: Promise<CompanyProfile | null> | null = null

function fetchCompanyProfile(): Promise<CompanyProfile | null> {
  if (!cachedPromise) {
    cachedPromise = fetch("/api/company", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          cachedPromise = null
          return null
        }
        const json = (await res.json()) as { company?: CompanyProfile | null }
        const company = json.company ?? null
        // Don't permanently cache a null payload; allows recovery after fixing Supabase/RLS.
        if (!company) cachedPromise = null
        return company
      })
      .catch((err) => {
        console.warn("[company]", err)
        cachedPromise = null
        return null
      })
  }
  return cachedPromise
}

export function useCompany() {
  const [company, setCompany] = useState<CompanyProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetchCompanyProfile().then((data) => {
      if (!cancelled) {
        setCompany(data)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return { company, loading }
}
