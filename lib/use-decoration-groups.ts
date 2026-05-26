"use client"

import { useEffect, useState } from "react"
import {
  buildDecorationTabs,
  type DecorationGroupSummary,
  type DecorationTab,
} from "@/lib/decoration-group-utils"

type DecorationGroupsResponse = {
  sections?: string[]
  groups?: DecorationGroupSummary[]
}

let cachedPromise: Promise<DecorationGroupsResponse> | null = null

function fetchDecorationGroupsList(): Promise<DecorationGroupsResponse> {
  if (!cachedPromise) {
    cachedPromise = fetch("/api/decoration-groups", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          cachedPromise = null
          return { sections: [], groups: [] }
        }
        const json = (await res.json()) as DecorationGroupsResponse
        const groups = json.groups ?? []
        if (groups.length === 0) cachedPromise = null
        return {
          sections: json.sections ?? [],
          groups,
        }
      })
      .catch((err) => {
        console.warn("[decoration-groups]", err)
        cachedPromise = null
        return { sections: [], groups: [] }
      })
  }
  return cachedPromise
}

export function useDecorationGroups() {
  const [groups, setGroups] = useState<DecorationGroupSummary[]>([])
  const [tabs, setTabs] = useState<DecorationTab[]>(() =>
    buildDecorationTabs([]),
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetchDecorationGroupsList().then((data) => {
      if (!cancelled) {
        setGroups(data.groups ?? [])
        setTabs(buildDecorationTabs(data.sections ?? []))
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return { groups, tabs, loading }
}
