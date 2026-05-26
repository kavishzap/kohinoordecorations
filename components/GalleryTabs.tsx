"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  filterGroupsByTab,
  type DecorationGroupSummary,
  type MediaSlideDescriptor,
} from "@/lib/decoration-group-utils"
import { useDecorationGroups } from "@/lib/use-decoration-groups"
import DecorationGroupCard from "./DecorationGroupCard"
import DecorationMediaModal from "./DecorationMediaModal"
import SectionReveal from "./SectionReveal"
import DecorativeDivider from "./DecorativeDivider"
import { PackageCardsSkeleton } from "./skeletons/MediaSkeletons"

export default function GalleryTabs() {
  const { groups, tabs, loading } = useDecorationGroups()
  const [activeTab, setActiveTab] = useState("")

  const [modalOpen, setModalOpen] = useState(false)
  const [modalGroupId, setModalGroupId] = useState<string | null>(null)
  const [modalSlides, setModalSlides] = useState<MediaSlideDescriptor[]>([])
  const [modalFrontUrl, setModalFrontUrl] = useState<string | null>(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [modalError, setModalError] = useState(false)
  const [loadingGroupId, setLoadingGroupId] = useState<string | null>(null)

  const defaultTab = tabs[0]?.value ?? ""

  useEffect(() => {
    if (!defaultTab) return
    if (!activeTab || !tabs.some((t) => t.value === activeTab)) {
      setActiveTab(defaultTab)
    }
  }, [tabs, activeTab, defaultTab])

  const filtered = useMemo(
    () => filterGroupsByTab(groups, activeTab),
    [groups, activeTab],
  )

  const activeLabel =
    tabs.find((t) => t.value === activeTab)?.label ?? "this collection"

  async function handleSeeBundle(group: DecorationGroupSummary) {
    setLoadingGroupId(group.id)
    setModalGroupId(group.id)
    setModalSlides([])
    setModalFrontUrl(group.frontUrl)
    setModalError(false)
    setModalOpen(true)
    setModalLoading(true)

    try {
      const res = await fetch(`/api/decoration-groups/${group.id}`, {
        cache: "no-store",
      })
      if (!res.ok) throw new Error("Failed to load")
      const json = (await res.json()) as {
        group?: { slides?: MediaSlideDescriptor[] }
      }
      if (!json.group?.slides?.length) throw new Error("No slides")
      setModalSlides(json.group.slides)
    } catch {
      setModalError(true)
    } finally {
      setModalLoading(false)
      setLoadingGroupId(null)
    }
  }

  function closeModal() {
    setModalOpen(false)
    setModalGroupId(null)
    setModalSlides([])
    setModalFrontUrl(null)
    setModalError(false)
  }

  return (
    <section id="decorations" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal>
          <div className="mb-12 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Our Work
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-foreground sm:text-4xl text-balance">
              Decoration Themes
            </h2>
            <DecorativeDivider className="mt-4" />
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Browse our reception, haldi, mehendi, wedding, and venue styling.
              Filter by category to explore recent celebrations.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1} className="w-full">
          <nav
            className="mb-10 flex w-full flex-wrap items-center justify-center gap-2"
            aria-label="Decoration categories"
          >
            {tabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.value
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeTab === tab.value && (
                    <motion.span
                      layoutId="decoration-tab-bg"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
            ))}
          </nav>
        </SectionReveal>

        {loading ? (
          <PackageCardsSkeleton count={6} />
        ) : tabs.length === 0 ? (
          <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 px-6 text-center text-sm leading-relaxed text-muted-foreground">
            Our decoration photos are being updated. Please check back soon.
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 px-6 text-center text-sm leading-relaxed text-muted-foreground">
            Photos for {activeLabel} will appear here soon. Contact us to see
            more examples.
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((group, i) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <DecorationGroupCard
                    group={group}
                    onSeeBundle={handleSeeBundle}
                    loadingDetail={loadingGroupId === group.id}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <DecorationMediaModal
        open={modalOpen}
        onClose={closeModal}
        groupId={modalGroupId}
        slides={modalSlides ?? []}
        initialFrontUrl={modalFrontUrl}
        loadingMeta={modalLoading}
        error={modalError}
      />
    </section>
  )
}
