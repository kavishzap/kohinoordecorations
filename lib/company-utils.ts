import type { KohinoorCompanyRow } from "@/lib/supabase/company"

export type CompanyProfile = {
  address: string
  phone: string
  email: string
  googleMapLocation: string
  facebookLink: string
  instagramLink: string
  tiktokLink: string
}

export function mapCompanyRow(row: KohinoorCompanyRow): CompanyProfile {
  return {
    address: row.address,
    phone: row.phone,
    email: row.email,
    googleMapLocation: row.google_map_location,
    facebookLink: row.facebook_link,
    instagramLink: row.instagram_link,
    tiktokLink: row.tiktok_link,
  }
}

/** E.164-style tel href from a display phone string. */
export function phoneToTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  if (!digits) return ""
  if (digits.startsWith("230")) return `tel:+${digits}`
  if (digits.startsWith("0")) return `tel:+230${digits.slice(1)}`
  return `tel:+230${digits}`
}

/** WhatsApp wa.me id (digits only, no +). */
export function phoneToWhatsAppId(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  if (!digits) return ""
  if (digits.startsWith("230")) return digits
  if (digits.startsWith("0")) return `230${digits.slice(1)}`
  return `230${digits}`
}

export function formatPhoneDisplay(phone: string): string {
  const trimmed = phone.trim()
  if (!trimmed) return ""
  return trimmed
}

export function isGoogleMapsEmbedUrl(url: string): boolean {
  return /google\.com\/maps\/embed/i.test(url)
}

export function mailtoHref(email: string): string {
  const trimmed = email.trim()
  return trimmed ? `mailto:${trimmed}` : ""
}
