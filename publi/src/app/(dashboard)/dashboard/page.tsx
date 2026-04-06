"use client"

import { useState } from "react"
import { GreetingBanner } from "@/components/publi/GreetingBanner"
import { KpiCard } from "@/components/publi/KpiCard"
import { NeedsAttentionCard } from "@/components/publi/NeedsAttentionCard"
import { PostCard } from "@/components/publi/PostCard"
import { AlertsFeed } from "@/components/publi/AlertsFeed"
import { QuickActions } from "@/components/publi/QuickActions"
import {
  kpiData,
  dashboardPosts,
  needsAttentionItems,
  alertItems,
} from "@/lib/mock-data"
import type { DashboardPost } from "@/lib/mock-data"

export default function DashboardPage() {
  const [posts, setPosts] = useState<DashboardPost[]>(dashboardPosts)
  const [toastMessage, setToastMessage] = useState("")
  const [toastVisible, setToastVisible] = useState(false)

  function showToast(message: string) {
    setToastMessage(message)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  function handleApprove(id: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "programada" as const } : p
      )
    )
    showToast("Publicación aprobada")
  }

  function handleDelete(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id))
    showToast("Publicación eliminada")
  }

  function handleReschedule(id: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, scheduledAt: "Reprogramada" } : p
      )
    )
    showToast("Publicación reprogramada")
  }

  function handleEdit(id: string) {
    showToast(`Editando publicación ${id}`)
  }

  return (
    <main className="min-h-screen p-6 md:p-8" style={{ backgroundColor: "#f5f0e8" }}>
      {/* Toast */}
      <div
        className="fixed right-6 top-6 z-[100] pointer-events-none"
        style={{
          transform: toastVisible
            ? "translateX(0)"
            : "translateX(calc(100% + 32px))",
          opacity: toastVisible ? 1 : 0,
          transition: "transform 300ms ease, opacity 300ms ease",
        }}
      >
        <div className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-xl">
          {toastMessage}
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6">
        {/* 1. Greeting Banner — dominant top section */}
        <GreetingBanner />

        {/* 2. KPI row */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpiData.map((kpi) => (
            <KpiCard key={kpi.label} data={kpi} />
          ))}
        </section>

        {/* 3. Two-column layout: Needs attention + Quick actions / Alerts */}
        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <NeedsAttentionCard items={needsAttentionItems} />

          <div className="flex flex-col gap-6">
            <QuickActions />
            <AlertsFeed items={alertItems} />
          </div>
        </div>

        {/* 4. Upcoming posts — full width */}
        <section className="rounded-xl border border-primary-light/60 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">
              Próximas publicaciones
            </h2>
            <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
              {posts.length} posts
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onEdit={handleEdit}
                onApprove={handleApprove}
                onReschedule={handleReschedule}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
