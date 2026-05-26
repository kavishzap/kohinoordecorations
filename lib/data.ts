export interface GalleryItem {
  id: number
  category: string
  title: string
  image: string
}

export const PACKAGE_SELECT_STORAGE_KEY = "kohinoor_selected_package"
export const PACKAGE_SELECT_EVENT = "kohinoor:select-package"

export function storeSelectedPackage(value: string) {
  if (typeof window === "undefined") return
  sessionStorage.setItem(PACKAGE_SELECT_STORAGE_KEY, value)
  window.dispatchEvent(
    new CustomEvent(PACKAGE_SELECT_EVENT, { detail: value }),
  )
}

/** Legacy static gallery — all tabs now load from Supabase (see galleryBucketByCategory). */
export const galleryItems: GalleryItem[] = []

export const galleryTabs = [
  { value: "all", label: "All" },
  { value: "haldi", label: "Haldi" },
  { value: "mehendi", label: "Mehendi" },
  { value: "reception", label: "Reception" },
  { value: "wedding", label: "Wedding" },
  { value: "stage", label: "Stage" },
  { value: "entrance", label: "Entrance" },
  { value: "table", label: "Table D\u00e9cor" },
]

/**
 * Gallery tab → Supabase `decorations` bucket folder.
 * Stage → `stage` | Entrance → `entrance` | Table Décor → `table-decor`
 */
export const galleryBucketByCategory: Record<string, string> = {
  haldi: "haldi",
  mehendi: "mehendi",
  reception: "reception",
  wedding: "wedding",
  stage: "stage",
  entrance: "entrance",
  table: "table-decor",
}

export const services = [
  { icon: "stage", label: "Custom Stage Design" },
  { icon: "flower", label: "Floral Arrangements" },
  { icon: "entrance", label: "Entrance Styling" },
  { icon: "table", label: "Table Décor" },
  { icon: "lighting", label: "Lighting Setup" },
  { icon: "theme", label: "Theme Coordination" },
]

export const heroSlides = [
  { src: "/assets/hero3.jpeg", alt: "Kohinoor Decorations hero" },
  { src: "/assets/hero2.jpeg", alt: "Kohinoor Decorations hero" },
  { src: "/assets/hero1.jpeg", alt: "Kohinoor Decorations hero" },
]

export const footerImages = [
  "/assets/hero1.jpeg",
  "/assets/hero2.jpeg",
  "/assets/hero3.jpeg",
  "/assets/about1.jpeg",
  "/assets/about2.jpeg",
  "/assets/about3.jpeg",
]
