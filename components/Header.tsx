"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "About Us", href: "#about" },
  { label: "Decorations", href: "#decorations" },
  { label: "Gallery", href: "#gallery" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
]

const HEADER_OFFSET = 80 // px to offset for sticky header

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const id = href.replace("#", "")
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
        window.scrollTo({ top, behavior: "smooth" })
      }
      setMobileOpen(false)
    },
    [],
  )

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-cover bg-center bg-no-repeat shadow-sm" : "bg-transparent"
      }`}
      style={
        scrolled
          ? {
              backgroundImage: `linear-gradient(to bottom, rgba(61,44,44,0.88), rgba(61,44,44,0.82)), url('/images/hero3.jpeg')`,
            }
          : undefined
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 transition-opacity hover:opacity-90">
          <Image
            src="/logo/logo1.png"
            alt="Kohinoor Decorations"
            width={140}
            height={48}
            className="h-10 w-auto sm:h-12"
            priority
          />
          <span className="font-serif text-2xl font-semibold tracking-tight text-white">
            Kohinoor <span className="text-white">Decorations</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-lg font-medium text-white transition-colors hover:text-white/90"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
              aria-hidden="true"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="sidebar-panel"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 left-0 z-[70] flex h-full w-[min(280px,85vw)] flex-col bg-cover bg-center bg-no-repeat shadow-xl md:hidden"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(61,44,44,0.92), rgba(61,44,44,0.85)), url('/assets/hero1.jpeg')`,
              }}
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2">
                  <Image
                    src="/logo/logo1.png"
                    alt="Kohinoor Decorations"
                    width={130}
                    height={44}
                    className="h-9 w-auto sm:h-10"
                  />
                  <span className="font-serif text-xl font-semibold text-white sm:text-2xl">
                    Kohinoor Decorations
                  </span>
                </div>
                <button
                  className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 p-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="rounded-xl px-4 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <p className="border-t border-white/20 px-6 py-4 text-xs text-white/70">
                &copy; {new Date().getFullYear()} Kohinoor Decorations
              </p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
