"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { MapPin, Phone, Mail } from "lucide-react"
import SectionReveal from "./SectionReveal"
import DecorativeDivider from "./DecorativeDivider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { weddingTypePackages } from "@/lib/data"

const MAP_LINK = "https://maps.app.goo.gl/rLmKuS5SccYtRErTA"
const WHATSAPP_NUMBER = "23058331197"

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    value: "La rosa link road mdalbert",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "5833 1197",
  },
  {
    icon: Mail,
    label: "Email",
    value: "usahadut@gmail.com",
  },
]

const packageOptions = weddingTypePackages.flatMap((type) =>
  type.packages.map((pkg) => ({
    value: `${type.label} - ${pkg.name}`,
    label: `${type.label} - ${pkg.name}`,
  }))
)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const headingY = useTransform(scrollYProgress, [0, 0.3], [40, 0])

  const [fullName, setFullName] = useState("")
  const [mobile, setMobile] = useState("")
  const [weddingDate, setWeddingDate] = useState("")
  const [locationOfEvent, setLocationOfEvent] = useState("")
  const [selectedPackage, setSelectedPackage] = useState("")
  const [specialRequest, setSpecialRequest] = useState("")

  const handleSendMessage = () => {
    const lines = [
      "New enquiry from Kohinoor Decorations website",
      "",
      `Full name: ${fullName || "-"}`,
      `Mobile: ${mobile || "-"}`,
      `Client wedding date: ${weddingDate || "-"}`,
      `Location of event: ${locationOfEvent || "-"}`,
      `Package: ${selectedPackage || "-"}`,
      "",
      "Special request:",
      specialRequest || "-",
    ]
    const text = encodeURIComponent(lines.join("\n"))
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer")
  }

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
          <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-16">
            {/* Form - left on web */}
            <div className="flex-1 order-1 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Send us a message
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                We&apos;ll get back to you as soon as we can.
              </p>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-fullname">Full name</Label>
                  <Input
                    id="contact-fullname"
                    type="text"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-mobile">Mobile phone</Label>
                  <Input
                    id="contact-mobile"
                    type="tel"
                    placeholder="Your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-wedding-date">Client wedding date</Label>
                  <Input
                    id="contact-wedding-date"
                    type="date"
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-location">Location of event</Label>
                  <Input
                    id="contact-location"
                    type="text"
                    placeholder="Event venue or address"
                    value={locationOfEvent}
                    onChange={(e) => setLocationOfEvent(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Select package</Label>
                  <Select
                    value={selectedPackage}
                    onValueChange={setSelectedPackage}
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Choose a package" />
                    </SelectTrigger>
                    <SelectContent>
                      {packageOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-request">Special request</Label>
                  <textarea
                    id="contact-request"
                    placeholder="Tell us about your event or any special requests..."
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    rows={4}
                    className="placeholder:text-muted-foreground border-input focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSendMessage}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#20bd5a]"
                >
                  <svg
                    className="size-5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Send message to +230 5833 1197
                </button>
              </div>
            </div>

            {/* Details + Map - right on web, map extends to form height */}
            <div className="order-2 flex flex-1 flex-col gap-6 lg:min-h-0">
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Kohinoor Decorations
              </h3>
              <div className="space-y-5">
                {contactDetails.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card shadow-sm">
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

              {/* Map - fills remaining height on web */}
              <div className="mt-4 min-h-[240px] flex-1 overflow-hidden rounded-2xl border border-border shadow-sm lg:min-h-0">
                <iframe
                  title="Kohinoor Hall location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3739.0001861138276!2d57.61624551111114!3d-20.424073553805545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x217c61095225da75%3A0x67f9bbfefa97693f!2sKohinoor%20Hall!5e0!3m2!1sen!2smu!4v1772267906125!5m2!1sen!2smu"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 240 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full min-h-[240px] w-full"
                />
              </div>
            </div>
          </div>
        </SectionReveal>

        <div className="mt-20">
          <DecorativeDivider />
        </div>
      </div>
    </section>
  )
}
