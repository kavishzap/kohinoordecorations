export interface ThemeData {
  name: string
  slug: string
  description: string
  bullets: { label: string; detail: string }[]
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

export const themes: ThemeData[] = [
  {
    name: "Haldi Decoration",
    slug: "haldi",
    description:
      "Celebrate the joyous Haldi ceremony with a burst of sunshine yellows, marigold cascades, and traditional brass accents. Our Haldi setups radiate warmth and festivity, creating the perfect backdrop for this auspicious ritual.",
    bullets: [
      { label: "Stage", detail: "Marigold-draped platform with brass urlis" },
      { label: "Entrance", detail: "Yellow floral arch with hanging garlands" },
      { label: "Seating", detail: "Traditional cushioned low seating" },
      { label: "Florals", detail: "Fresh marigolds, sunflowers & turmeric accents" },
      { label: "Lighting", detail: "Warm golden fairy lights & lanterns" },
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
    description:
      "Bring your Mehendi night to life with vibrant colours, bohemian flair, and playful details. From dreamcatchers to hanging lanterns, our setups create an enchanting space where traditions meet modern festivity.",
    bullets: [
      { label: "Stage", detail: "Colourful cushioned floor-seating zone" },
      { label: "Entrance", detail: "Bohemian floral frame with fairy lights" },
      { label: "Seating", detail: "Multicolour cushion & low-table arrangement" },
      { label: "Florals", detail: "Roses, jasmine garlands & dreamcatchers" },
      { label: "Lighting", detail: "Paper lanterns, jar lights & canopy glow" },
    ],
    images: [
      { src: "/images/mehendi-1.jpg", label: "Mehendi \u2013 Colourful Canopy" },
      { src: "/images/mehendi-2.jpg", label: "Mehendi \u2013 Boho Setup" },
      { src: "/images/mehendi-3.jpg", label: "Mehendi \u2013 Lantern Backdrop" },
      { src: "/images/mehendi-4.jpg", label: "Mehendi \u2013 Photo Booth" },
      { src: "/images/mehendi-5.jpg", label: "Mehendi \u2013 Overhead View" },
    ],
  },
  {
    name: "Reception Decoration",
    slug: "reception",
    description:
      "Make your grand reception truly unforgettable with luxurious florals, crystal accents, and dramatic staging. Our reception themes blend elegance with grandeur, ensuring every detail speaks of refined sophistication.",
    bullets: [
      { label: "Stage", detail: "Grand floral backdrop with throne seating" },
      { label: "Entrance", detail: "Crystal curtain arch with cascading roses" },
      { label: "Seating", detail: "Chiavari chairs with satin sashes" },
      { label: "Florals", detail: "White orchids, roses & hydrangeas" },
      { label: "Lighting", detail: "Crystal chandeliers & ambient uplighting" },
    ],
    images: [
      { src: "/images/reception-1.jpg", label: "Reception \u2013 Grand Stage" },
      { src: "/images/reception-2.jpg", label: "Reception \u2013 Table Setting" },
      { src: "/images/reception-3.jpg", label: "Reception \u2013 Floral Arch" },
      { src: "/images/reception-4.jpg", label: "Reception \u2013 Dance Floor" },
      { src: "/images/reception-5.jpg", label: "Reception \u2013 Dessert Display" },
    ],
  },
]

export const galleryItems: GalleryItem[] = [
  { id: 1, category: "haldi", title: "Marigold Stage Setup", image: "/images/haldi-1.jpg" },
  { id: 2, category: "haldi", title: "Yellow Floral Entrance", image: "/images/haldi-2.jpg" },
  { id: 3, category: "mehendi", title: "Bohemian Canopy", image: "/images/mehendi-1.jpg" },
  { id: 4, category: "mehendi", title: "Colourful Seating", image: "/images/mehendi-2.jpg" },
  { id: 5, category: "reception", title: "Grand Floral Stage", image: "/images/reception-1.jpg" },
  { id: 6, category: "reception", title: "Elegant Table Setup", image: "/images/reception-2.jpg" },
  { id: 7, category: "stage", title: "Bridal Throne Stage", image: "/images/gallery-stage.jpg" },
  { id: 8, category: "entrance", title: "Rose Arch Entrance", image: "/images/gallery-entrance.jpg" },
  { id: 9, category: "table", title: "Crystal Centrepiece", image: "/images/gallery-table.jpg" },
  { id: 10, category: "haldi", title: "Traditional Haldi Details", image: "/images/haldi-5.jpg" },
  { id: 11, category: "mehendi", title: "Dreamy Lantern Backdrop", image: "/images/mehendi-3.jpg" },
  { id: 12, category: "reception", title: "Crystal Curtain Entrance", image: "/images/reception-3.jpg" },
  { id: 13, category: "stage", title: "Reception Grand Stage", image: "/images/reception-1.jpg" },
  { id: 14, category: "entrance", title: "Haldi Garland Entrance", image: "/images/haldi-2.jpg" },
  { id: 15, category: "table", title: "Reception Table Decor", image: "/images/reception-2.jpg" },
  { id: 16, category: "reception", title: "Dance Floor Lights", image: "/images/reception-4.jpg" },
  { id: 17, category: "mehendi", title: "Photo Booth Corner", image: "/images/mehendi-4.jpg" },
  { id: 18, category: "haldi", title: "Overhead Garland Display", image: "/images/haldi-4.jpg" },
]

export const galleryTabs = [
  { value: "all", label: "All" },
  { value: "haldi", label: "Haldi" },
  { value: "mehendi", label: "Mehendi" },
  { value: "reception", label: "Reception" },
  { value: "stage", label: "Stage" },
  { value: "entrance", label: "Entrance" },
  { value: "table", label: "Table D\u00e9cor" },
]

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
