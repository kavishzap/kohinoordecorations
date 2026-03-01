"use client"

import Image from "next/image"
import { footerImages } from "@/lib/data"

const quickLinks = [
  { label: "About Us", href: "#about" },
  { label: "Decorations", href: "#decorations" },
  { label: "Gallery", href: "#gallery" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
]

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/kohinoor_decorations?igsh=MTJ4YnIxem4weDU4ZA%3D%3D&utm_source=qr",
    path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1FEqiYRL53/?mibextid=wwXIfr",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@kohinoor_decorations?_r=1&_t=ZS-94IKOTzQjb8",
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z",
  },
]

export default function Footer() {
  return (
    <footer className="bg-foreground text-white/80">
      {/* Image strip */}
      <div className="flex overflow-hidden">
        {footerImages.map((src, i) => (
          <div key={i} className="relative h-20 flex-1 sm:h-28">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover opacity-70"
              sizes="(max-width: 640px) 33vw, 16vw"
            />
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <Image
                src="/logo/logo1.png"
                alt="Kohinoor Decorations"
                width={140}
                height={48}
                className="h-10 w-auto"
              />
              <p className="font-serif text-xl font-semibold text-white">
                Kohinoor <span className="text-primary">Decorations</span>
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Decoration packages for weddings, receptions & every celebration.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Quick Links
            </h4>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Follow Us
            </h4>
            <div className="mt-3 flex gap-3">
              {socialLinks.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Kohinoor Decorations. All rights reserved.</p>
          <div className="flex flex-col items-center justify-center gap-1">
            <span>Developed by</span>
            <a
              href="https://mojhoa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-100"
            >
              <Image
                src="/logo/mk.png"
                alt="Developer"
                width={140}
                height={56}
                className="h-14 w-auto opacity-80"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
