"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Star } from "lucide-react"
import { weddingTypePackages } from "@/lib/data"
import SectionReveal from "./SectionReveal"
import DecorativeDivider from "./DecorativeDivider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Packages() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const headingY = useTransform(scrollYProgress, [0, 0.3], [40, 0])

  return (
    <section ref={sectionRef} id="packages" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal>
          <motion.div className="mb-12 text-center" style={{ y: headingY }}>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Our Offerings
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl text-balance">
              D&eacute;cor Packages
            </h2>
            <DecorativeDivider className="mt-4" />
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Choose your wedding type and a package that fits your vision and
              guest count.
            </p>
          </motion.div>
        </SectionReveal>

        <Tabs defaultValue="indian" className="w-full">
          <TabsList className="mx-auto mb-10 flex h-12 w-full max-w-md justify-center gap-1 rounded-xl bg-muted/80 p-1.5 sm:max-w-sm">
            {weddingTypePackages.map((type) => (
              <TabsTrigger
                key={type.id}
                value={type.id}
                className="flex-1 rounded-lg px-4 text-sm font-medium transition-colors data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {weddingTypePackages.map((weddingType) => (
            <TabsContent
              key={weddingType.id}
              value={weddingType.id}
              className="mt-0 focus-visible:outline-none"
            >
              <div className="grid gap-8 md:grid-cols-3">
                {weddingType.packages.map((pkg, i) => {
                  const isPopular = !!pkg.popular
                  const cardStyles = isPopular
                    ? "border-2 border-amber-400 bg-card shadow-lg ring-2 ring-amber-300/50 dark:ring-amber-500/30"
                    : "border border-border bg-card shadow-sm"
                  const buttonStyles = isPopular
                    ? "bg-amber-500 text-white hover:bg-amber-600 hover:shadow-md"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md"
                  return (
                    <SectionReveal key={pkg.name} delay={i * 0.08}>
                      <motion.div
                        whileHover={{
                          y: -4,
                          boxShadow: isPopular
                            ? "0 24px 48px -12px rgba(245, 158, 11, 0.2)"
                            : "0 16px 32px -8px rgba(61,44,44,0.1)",
                        }}
                        transition={{ duration: 0.3 }}
                        className={`relative flex h-full flex-col rounded-2xl p-6 transition-shadow sm:p-8 ${cardStyles}`}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-serif text-xl font-semibold text-foreground">
                            {pkg.name}
                          </h3>
                          {isPopular && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
                              <Star className="size-3 fill-current" />
                              Most Popular
                            </span>
                          )}
                        </div>

                        <p className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                          {pkg.priceRange.startsWith("As from ")
                            ? pkg.priceRange.replace("As from ", "As from Rs ")
                            : `Rs ${pkg.priceRange}`}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Customisable per event. Enquire for details.
                        </p>

                        <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
                          {pkg.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm text-muted-foreground"
                            >
                              <img
                                src="/assets/petal.png"
                                alt=""
                                className="mt-0.5 size-5 shrink-0 object-contain"
                                width={20}
                                height={28}
                                aria-hidden
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <a
                          href="#contact"
                          className={`mt-6 flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-all ${buttonStyles}`}
                        >
                          Get Started
                        </a>
                      </motion.div>
                    </SectionReveal>
                  )
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
