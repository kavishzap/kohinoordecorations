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
                  const isSilver = pkg.name.includes("Silver")
                  const isGold = pkg.name.includes("Gold")
                  const isPlatinum = pkg.name.includes("Platinum")
                  const cardStyles = isSilver
                    ? "border-slate-300 bg-gradient-to-b from-slate-50/80 to-card dark:from-slate-900/30 dark:to-card"
                    : isGold
                      ? "border-amber-400/60 bg-gradient-to-b from-amber-50/80 to-card ring-1 ring-amber-300/30 dark:from-amber-950/20 dark:to-card dark:ring-amber-600/20"
                      : "border-slate-400/70 bg-gradient-to-b from-slate-100/80 to-card ring-1 ring-slate-300/30 dark:from-slate-800/30 dark:to-card dark:ring-slate-500/20"
                  const tierLabelStyles = isSilver
                    ? "bg-slate-400/90 text-white"
                    : isGold
                      ? "bg-amber-500 text-white"
                      : "bg-slate-600 text-white"
                  const priceStyles = isSilver
                    ? "text-slate-600 dark:text-slate-400"
                    : isGold
                      ? "text-amber-700 dark:text-amber-400"
                      : "text-slate-700 dark:text-slate-300"
                  return (
                  <SectionReveal key={pkg.name} delay={i * 0.08}>
                    <motion.div
                      whileHover={{
                        y: -6,
                        boxShadow:
                          "0 20px 40px -12px rgba(61,44,44,0.12)",
                      }}
                      transition={{ duration: 0.3 }}
                      className={`relative flex h-full flex-col rounded-2xl border-2 p-6 shadow-sm transition-shadow sm:p-8 ${cardStyles}`}
                    >
                      <div className={`absolute right-0 top-0 rounded-bl-lg px-3 py-1 text-xs font-semibold uppercase tracking-wider ${tierLabelStyles}`}>
                        {pkg.name.replace(" Package", "")}
                      </div>
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-md">
                          <Star className="size-3 fill-current" />
                          Most Popular
                        </div>
                      )}

                      <h3 className="font-serif text-xl font-semibold text-foreground pr-20">
                        {pkg.name}
                      </h3>
                      <p className={`mt-2 text-lg font-semibold ${priceStyles}`}>
                        {pkg.priceRange.startsWith("As from ")
                          ? pkg.priceRange.replace("As from ", "As from Rs ")
                          : `Rs ${pkg.priceRange}`}
                      </p>

                      <ul className="mt-6 flex-1 space-y-3">
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
