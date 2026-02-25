"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { MapPin, Phone, Mail } from "lucide-react"
import SectionReveal from "./SectionReveal"
import DecorativeDivider from "./DecorativeDivider"

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    value: "12 Rose Garden Lane, Jubilee Hills, Hyderabad 500033",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@floralromantic.in",
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const headingY = useTransform(scrollYProgress, [0, 0.3], [40, 0])

  return (
    <section ref={sectionRef} id="contact" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal>
          <motion.div className="mb-12 text-center" style={{ y: headingY }}>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Get in Touch
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl text-balance">
              Contact Us
            </h2>
            <DecorativeDivider className="mt-4" />
          </motion.div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            {/* Details */}
            <div className="flex flex-1 flex-col gap-6">
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Floral Romantic Wedding Hall
              </h3>
              <div className="space-y-5">
                {contactDetails.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-card shadow-sm border border-border">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {label}
                      </p>
                      <p className="mt-0.5 text-sm text-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="flex-1 overflow-hidden rounded-2xl border border-border shadow-sm">
              <iframe
                title="Hall location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3024508032803!2d78.40750257!3d17.4326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sJubilee+Hills!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </SectionReveal>

        {/* Floral divider before footer */}
        <div className="mt-20">
          <DecorativeDivider />
        </div>
      </div>
    </section>
  )
}
