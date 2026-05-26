"use client"

import Image from "next/image"
import { footerImages } from "@/lib/data"
import { useCompany } from "@/lib/use-company"
import { buildSocialLinks } from "@/lib/social-icons"

const quickLinks = [
  { label: "Decorations", href: "#decorations" },
  { label: "About Us", href: "#about" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
]

export default function Footer() {
  const { company } = useCompany()
  const socialLinks = company ? buildSocialLinks(company) : []

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
            {socialLinks.length > 0 ? (
              <div className="mt-3 flex gap-3">
                {socialLinks.map(({ label, href, path }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
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
            ) : (
              <p className="mt-3 text-sm text-white/40">Social links coming soon.</p>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Kohinoor Decorations. All rights reserved.</p>
          <p>
            Designed by{" "}
            <a
              href="https://mojhoa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 transition-colors hover:text-primary"
            >
              Mojhoa Automations LTD
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
