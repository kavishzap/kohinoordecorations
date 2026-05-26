import type { LucideIcon } from "lucide-react"
import {
  Cake,
  Camera,
  DoorOpen,
  Gem,
  Heart,
  Lamp,
  LayoutGrid,
  Palette,
  PartyPopper,
  Presentation,
  Sparkles,
  Sun,
  Trees,
} from "lucide-react"

export type DecorationGroupSummary = {
  id: string
  section: string
  name: string
  price: number
  frontUrl: string | null
}

export type MediaSlot = "front" | "inside1" | "inside2" | "video"

export type MediaSlideDescriptor = {
  slot: MediaSlot
  type: "image" | "video"
}

export type DecorationTab = {
  value: string
  label: string
  icon: LucideIcon
}

export const SECTION_LABELS: Record<string, string> = {
  haldi: "Haldi",
  mehendi: "Mehendi",
  reception: "Reception",
  wedding: "Wedding",
  stage: "Stage",
  entrance: "Entrance and Alley Decor",
  "table-decor": "Table Décor",
  "photo-corner": "Photo Corner",
  "nikka-decor": "Nikah Decor",
  "cake-canopy": "Cake Canopy",
  "outdoor-decor": "Outdoor Decor",
  "wedding-accessories": "Wedding Accessories",
}

const SECTION_ICONS: Record<string, LucideIcon> = {
  all: LayoutGrid,
  haldi: Sun,
  mehendi: Palette,
  reception: PartyPopper,
  wedding: Heart,
  stage: Presentation,
  entrance: DoorOpen,
  "table-decor": Lamp,
  "photo-corner": Camera,
  "nikka-decor": Sparkles,
  "cake-canopy": Cake,
  "outdoor-decor": Trees,
  "wedding-accessories": Gem,
}

const SIDEBAR_SECTION_ORDER = [
  "mehendi",
  "haldi",
  "wedding",
  "reception",
  "nikka-decor",
  "entrance",
  "table-decor",
  "cake-canopy",
  "outdoor-decor",
  "wedding-accessories",
  "photo-corner",
  "stage",
] as const

export function sectionToTabValue(section: string): string {
  if (section === "table-decor") return "table"
  return section
}

export function tabValueToSection(tabValue: string): string {
  if (tabValue === "table") return "table-decor"
  return tabValue
}

export function formatSectionLabel(section: string): string {
  return (
    SECTION_LABELS[section] ??
    section
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  )
}

export function getSectionIcon(tabValue: string): LucideIcon {
  if (tabValue === "all") return SECTION_ICONS.all
  const section = tabValueToSection(tabValue) ?? tabValue
  return SECTION_ICONS[section] ?? LayoutGrid
}

export function formatDecorationPrice(price: number): string {
  const value = Number(price)
  if (!Number.isFinite(value) || value <= 0) return "Price on request"
  return `Rs ${value.toLocaleString("en-MU", { maximumFractionDigits: 0 })}`
}

export function buildDecorationTabs(uniqueSections: string[]): DecorationTab[] {
  const remaining = new Set(uniqueSections)
  const tabs: DecorationTab[] = []

  for (const section of SIDEBAR_SECTION_ORDER) {
    if (!remaining.has(section)) continue
    remaining.delete(section)
    const value = sectionToTabValue(section)
    tabs.push({
      value,
      label: formatSectionLabel(section),
      icon: SECTION_ICONS[section] ?? LayoutGrid,
    })
  }

  for (const section of [...remaining].sort()) {
    const value = sectionToTabValue(section)
    tabs.push({
      value,
      label: formatSectionLabel(section),
      icon: SECTION_ICONS[section] ?? LayoutGrid,
    })
  }

  return tabs
}

export function filterGroupsByTab(
  groups: DecorationGroupSummary[],
  tabValue: string,
): DecorationGroupSummary[] {
  if (!tabValue) return []
  const section = tabValueToSection(tabValue)
  return groups.filter((g) => g.section === section)
}

export function isVideoKey(key: string | null | undefined): boolean {
  if (!key) return false
  return /\.(mp4|webm|mov|m4v|ogg)(\?|$)/i.test(key)
}

export function isVideoUrl(url: string | null | undefined): boolean {
  if (!url) return false
  return /\.(mp4|webm|mov|m4v|ogg)(\?|$)/i.test(url)
}

type RowKeys = {
  front_key: string
  inside_1_key: string
  inside_2_key: string | null
  video_key: string | null
}

/** Slide order for bundle viewer (keys only — URLs loaded per slide). */
export function rowToSlideDescriptors(row: RowKeys): MediaSlideDescriptor[] {
  const slides: MediaSlideDescriptor[] = []

  const add = (slot: MediaSlot, key: string | null | undefined) => {
    const trimmed = key?.trim()
    if (!trimmed) return
    slides.push({
      slot,
      type: slot === "video" || isVideoKey(trimmed) ? "video" : "image",
    })
  }

  add("front", row.front_key)
  add("inside1", row.inside_1_key)
  add("inside2", row.inside_2_key)
  add("video", row.video_key)

  return slides
}

export const MEDIA_SLOTS: MediaSlot[] = [
  "front",
  "inside1",
  "inside2",
  "video",
]

export function isValidMediaSlot(slot: string): slot is MediaSlot {
  return MEDIA_SLOTS.includes(slot as MediaSlot)
}
