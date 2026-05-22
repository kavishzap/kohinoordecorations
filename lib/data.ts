export interface ThemeData {
  name: string
  slug: string
  /** Supabase storage folder inside the `decorations` bucket */
  storageFolder: string
  /** Two-line intro shown above the photo grid */
  descriptionLines: [string, string]
  images: { src: string; label: string }[]
}

export interface GalleryItem {
  id: number
  category: string
  title: string
  image: string
}

export interface PackageData {
  name: string
  guestRange: string
  decorLevel: string
  items: string[]
  popular?: boolean
}

export interface WeddingPackageData {
  name: string
  priceRange: string
  items: string[]
  popular?: boolean
}

export interface WeddingTypePackages {
  id: string
  label: string
  packages: WeddingPackageData[]
}

export const weddingTypePackages: WeddingTypePackages[] = [
  {
    id: "indian",
    label: "Indian Wedding",
    packages: [
      {
        name: "Silver Package",
        priceRange: "15k – 20k",
        items: ["Simple and elegant stage decorations only"],
      },
      {
        name: "Gold Package",
        priceRange: "As from 45k",
        popular: true,
        items: [
          "Simple haldi decorations",
          "Wedding Decorations",
          "Simple alley decoration",
          "Entrance decorations",
          "VIP table decorations",
          "UP to 20 guests Decorations",
        ],
      },
      {
        name: "Platinum Package",
        priceRange: "As from 75k",
        items: [
          "Customised per event",
          "Elegant haldi decorations",
          "Wedding mandap",
          "Reception decoration",
          "Heavy alley décor",
          "Entrance decorations",
          "VIP table decorations",
          "UP to 3 guests Decorations",
          "Cake canopy",
          "Up to 400 chair covers with ribbon (colour of your choice)",
          "5 cocktail tables",
        ],
      },
    ],
  },
  {
    id: "muslim",
    label: "Muslim Wedding",
    packages: [
      {
        name: "Silver Package",
        priceRange: "15k – 20k",
        items: [
          "Decoration Stage Decorations only",
          "Sofa for groom and bride",
          "Cake table",
        ],
      },
      {
        name: "Gold Package",
        priceRange: "30k – 40k",
        popular: true,
        items: [
          "Decoration Stage Decorations only",
          "Sofa for groom and bride",
          "Cake table",
          "Simple alley decoration",
          "Entrance decorations",
          "VIP table decorations",
          "UP to 20 guests Decorations",
        ],
      },
      {
        name: "Platinum Package",
        priceRange: "As from 50k",
        items: [
          "Decoration Stage Decorations only",
          "Sofa for groom and bride",
          "Cake table",
          "Heavy alley decoration",
          "Entrance decorations",
          "VIP table decorations",
          "UP to 30 guests Decorations",
          "Cake canopy",
          "Up to 400 chair covers with ribbon (colour of your choice)",
        ],
      },
    ],
  },
]

export const PACKAGE_SELECT_STORAGE_KEY = "kohinoor_selected_package"
export const PACKAGE_SELECT_EVENT = "kohinoor:select-package"

export function formatPackageSelectValue(
  weddingTypeLabel: string,
  packageName: string,
): string {
  return `${weddingTypeLabel} - ${packageName}`
}

export const packageSelectOptions = weddingTypePackages.flatMap((type) =>
  type.packages.map((pkg) => ({
    value: formatPackageSelectValue(type.label, pkg.name),
    label: formatPackageSelectValue(type.label, pkg.name),
  })),
)

export function storeSelectedPackage(value: string) {
  if (typeof window === "undefined") return
  sessionStorage.setItem(PACKAGE_SELECT_STORAGE_KEY, value)
  window.dispatchEvent(
    new CustomEvent(PACKAGE_SELECT_EVENT, { detail: value }),
  )
}

export const themes: ThemeData[] = [
  {
    name: "Reception Decoration",
    slug: "reception",
    storageFolder: "reception",
    descriptionLines: [
      "Grand reception styling with elegant stages, table settings, and refined finishing touches.",
      "From the mandap and entrance to every guest table—designed and delivered by Kohinoor Decorations.",
    ],
    images: [
      { src: "/images/reception-1.jpg", label: "Reception \u2013 Grand Stage" },
      { src: "/images/reception-2.jpg", label: "Reception \u2013 Table Setting" },
      { src: "/images/reception-3.jpg", label: "Reception \u2013 Floral Arch" },
      { src: "/images/reception-4.jpg", label: "Reception \u2013 Dance Floor" },
      { src: "/images/reception-5.jpg", label: "Reception \u2013 Dessert Display" },
    ],
  },
  {
    name: "Haldi Decoration",
    slug: "haldi",
    storageFolder: "haldi",
    descriptionLines: [
      "Warm, traditional Haldi décor with marigolds, golden drapery, and joyful detail.",
      "Ceremony styling, florals, and guest areas—thoughtfully planned for your celebration in Mauritius.",
    ],
    images: [
      { src: "/images/haldi-1.jpg", label: "Haldi \u2013 Marigold Stage" },
      { src: "/images/haldi-2.jpg", label: "Haldi \u2013 Floral Entrance" },
      { src: "/images/haldi-3.jpg", label: "Haldi \u2013 Seating Area" },
      { src: "/images/haldi-4.jpg", label: "Haldi \u2013 Overhead Garlands" },
      { src: "/images/haldi-5.jpg", label: "Haldi \u2013 Traditional Details" },
    ],
  },
  {
    name: "Mehendi / Henna Decoration",
    slug: "mehendi",
    storageFolder: "mehendi",
    descriptionLines: [
      "Colourful Mehendi nights with cosy lounges, bold florals, and festive lighting.",
      "Comfortable seating, statement entrances, and photo-ready styling for every guest.",
    ],
    images: [
      { src: "/images/mehendi-1.jpg", label: "Mehendi \u2013 Colourful Canopy" },
      { src: "/images/mehendi-2.jpg", label: "Mehendi \u2013 Boho Setup" },
      { src: "/images/mehendi-3.jpg", label: "Mehendi \u2013 Lantern Backdrop" },
      { src: "/images/mehendi-4.jpg", label: "Mehendi \u2013 Photo Booth" },
      { src: "/images/mehendi-5.jpg", label: "Mehendi \u2013 Overhead View" },
    ],
  },
]

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

export const packages: PackageData[] = [
  {
    name: "Silver Package",
    guestRange: "50 \u2013 150 Guests",
    decorLevel: "Elegant Essentials",
    items: [
      "Standard floral stage backdrop",
      "Entrance arch with fresh flowers",
      "10 table centrepieces",
      "Basic ambient lighting",
      "Aisle floral lining",
      "Coordinated colour draping",
    ],
  },
  {
    name: "Gold Package",
    guestRange: "150 \u2013 350 Guests",
    decorLevel: "Premium Grandeur",
    popular: true,
    items: [
      "Custom floral stage with throne seating",
      "Grand entrance arch with cascading blooms",
      "20 premium table centrepieces",
      "Crystal chandeliers & uplighting",
      "Photo booth corner with floral frame",
      "Coordinated linen & chair decor",
      "Complimentary theme consultation",
    ],
  },
  {
    name: "Platinum Package",
    guestRange: "350 \u2013 600+ Guests",
    decorLevel: "Luxury Bespoke",
    items: [
      "Fully custom-designed stage & backdrop",
      "Multiple entrance installations",
      "30+ bespoke table arrangements",
      "Dramatic lighting design & chandeliers",
      "Full venue draping & ceiling decor",
      "Multiple photo corners & floral walls",
      "Dedicated theme coordinator",
      "Day-of setup & breakdown team",
    ],
  },
]

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
