export type PackageWeddingType = "indian_wedding" | "muslim_wedding"

export type DecorationPackage = {
  id: string
  name: string
  pricingRange: string
  weddingType: PackageWeddingType
  items: string[]
  displayOrder: number
  mostPopular: boolean
}

export type WeddingTypeGroup = {
  id: string
  label: string
  weddingType: PackageWeddingType
  packages: DecorationPackage[]
}

export const WEDDING_TYPE_TABS: {
  id: string
  weddingType: PackageWeddingType
  label: string
}[] = [
  { id: "indian", weddingType: "indian_wedding", label: "Indian Wedding" },
  { id: "muslim", weddingType: "muslim_wedding", label: "Muslim Wedding" },
]

export function formatPackageSelectValue(
  weddingTypeLabel: string,
  packageName: string,
): string {
  return `${weddingTypeLabel} - ${packageName}`
}

export function formatPricingDisplay(pricingRange: string): string {
  const trimmed = pricingRange.trim()
  if (!trimmed) return ""
  if (/^rs\s/i.test(trimmed)) return trimmed
  if (trimmed.startsWith("As from ")) {
    const rest = trimmed.slice("As from ".length)
    return /^rs\s/i.test(rest) ? `As from ${rest}` : `As from Rs ${rest}`
  }
  return `Rs ${trimmed}`
}

export function groupPackagesByWeddingType(
  rows: DecorationPackage[],
): WeddingTypeGroup[] {
  return WEDDING_TYPE_TABS.map((tab) => ({
    id: tab.id,
    label: tab.label,
    weddingType: tab.weddingType,
    packages: rows
      .filter((p) => p.weddingType === tab.weddingType)
      .sort((a, b) => a.displayOrder - b.displayOrder),
  }))
}

export function buildPackageSelectOptions(groups: WeddingTypeGroup[]) {
  return groups.flatMap((type) =>
    type.packages.map((pkg) => {
      const value = formatPackageSelectValue(type.label, pkg.name)
      return { value, label: value }
    }),
  )
}
