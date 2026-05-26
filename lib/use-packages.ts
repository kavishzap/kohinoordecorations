"use client"

import { useEffect, useState } from "react"
import type { WeddingTypeGroup } from "@/lib/package-utils"

type PackageSelectOption = { value: string; label: string }

type PackagesResponse = {
  weddingTypes?: WeddingTypeGroup[]
  selectOptions?: PackageSelectOption[]
}

let cachedPromise: Promise<PackagesResponse> | null = null

function fetchPackages(): Promise<PackagesResponse> {
  if (!cachedPromise) {
    cachedPromise = fetch("/api/packages", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          cachedPromise = null
          return { weddingTypes: [], selectOptions: [] }
        }
        const json = (await res.json()) as PackagesResponse
        const weddingTypes = json.weddingTypes ?? []
        const selectOptions = json.selectOptions ?? []
        if (weddingTypes.length === 0) cachedPromise = null
        return { weddingTypes, selectOptions }
      })
      .catch((err) => {
        console.warn("[packages]", err)
        cachedPromise = null
        return { weddingTypes: [], selectOptions: [] }
      })
  }
  return cachedPromise
}

export function usePackages() {
  const [weddingTypes, setWeddingTypes] = useState<WeddingTypeGroup[]>([])
  const [selectOptions, setSelectOptions] = useState<PackageSelectOption[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetchPackages().then((data) => {
      if (!cancelled) {
        setWeddingTypes(data.weddingTypes ?? [])
        setSelectOptions(data.selectOptions ?? [])
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return { weddingTypes, selectOptions, loading }
}
