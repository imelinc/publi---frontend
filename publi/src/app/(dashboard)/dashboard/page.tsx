"use client"

import { useEffect, useState } from "react"

// ─── Static data ──────────────────────────────────────────────────────────────

const quickMetrics = [
  { label: "Publicaciones este mes", value: "24", iconType: "calendar" as const },
  { label: "Clientes activos", value: "7", iconType: "users" as const },
  { label: "Programadas hoy", value: "3", iconType: "clock" as const },
  { label: "Pendientes de revisión", value: "2", iconType: "alert" as const },
]

interface Post {
  id: string
  client: string
  network: string
  text: string
  status: string
  statusClassName: string
  schedule: string
  initials: string
  iconType: "instagram" | "facebook" | "linkedin"
}

const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    client: "Neon Inc.",
    network: "Instagram",
    text: "Presentamos la campaña de abril con foco en resultados reales y contenido evergreen.",
    status: "Programado",
    statusClassName: "bg-primary-light text-primary",
    schedule: "Hoy · 10:30",
    initials: "NI",
    iconType: "instagram",
  },
  {
    id: "2",
    client: "Casa Nube",
    network: "Facebook",
    text: "Nuevo carrusel con consejos de temporada y CTA para generar consultas por DM.",
    status: "Borrador",
    statusClassName: "bg-[#fef3c7] text-[#92400e]",
    schedule: "Hoy · 15:00",
    initials: "CN",
    iconType: "facebook",
  },
  {
    id: "3",
    client: "Studio Lucia",
    network: "LinkedIn",
    text: "Caso de éxito del mes con foco en crecimiento orgánico y optimización de mensajes.",
    status: "Programado",
    statusClassName: "bg-primary-light text-primary",
    schedule: "Mañana · 09:15",
    initials: "SL",
    iconType: "linkedin",
  },
]

const recentActivity = [
  { text: "Publicación en Instagram de Neon Inc. publicada exitosamente", time: "hace 2 horas" },
  { text: "Lucía dejó listo el borrador para Casa Nube en Facebook", time: "hace 4 horas" },
  { text: "Se programó un carrusel para Studio Lucia en LinkedIn", time: "hace 6 horas" },
  { text: "Cliente Brava aprobó el contenido de mañana", time: "hace 1 día" },
]

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      className="fixed top-6 right-6 z-[100] pointer-events-none"
      style={{
        transform: visible ? "translateX(0)" : "translateX(calc(100% + 32px))",
        opacity: visible ? 1 : 0,
        transition: "transform 300ms ease, opacity 300ms ease",
      }}
    >
      <div
        className="rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-xl"
        style={{ backgroundColor: "#0095b6" }}
      >
        {message}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draftText, setDraftText] = useState("")
  const [toastVisible, setToastVisible] = useState(false)

  function showToast() {
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  function startEdit(post: Post) {
    setEditingId(post.id)
    setDraftText(post.text)
  }

  function cancelEdit() {
    setEditingId(null)
    setDraftText("")
  }

  function saveEdit(id: string) {
    if (!draftText.trim()) return
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, text: draftText.trim() } : p)))
    setEditingId(null)
    setDraftText("")
    showToast()
  }

  return (
    <main className="min-h-screen bg-[#f5f0e8] p-6 md:p-8">
      <Toast message="Cambios guardados" visible={toastVisible} />

      <div className="mx-auto max-w-7xl space-y-8">
        <section>
          <h1 className="text-3xl font-bold tracking-[-0.03em] text-foreground">
            Buenos días, Lucía 👋
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Tenés 3 publicaciones programadas para hoy.
          </p>
        </section>

        {/* KPIs */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickMetrics.map((metric) => (
            <article key={metric.label} className="rounded-xl border border-[#e8f4f7] bg-white p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="mt-5 text-[32px] font-bold leading-none text-foreground">
                    {metric.value}
                  </p>
                </div>
                <div className="rounded-xl bg-[#f5f0e8] p-2.5">
                  <MetricIcon type={metric.iconType} />
                </div>
              </div>
            </article>
          ))}
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          {/* Upcoming posts */}
          <section className="rounded-xl border border-[#e8f4f7] bg-white p-6">
            <h2 className="text-base font-bold text-foreground">Próximas publicaciones</h2>
            <div className="mt-5 space-y-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col gap-4 rounded-xl border border-[#e8f4f7] bg-[#fbfdfe] p-4 lg:flex-row lg:items-start"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">
                    {post.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{post.client}</p>
                      <span className="text-xs text-muted-foreground">· {post.network}</span>
                    </div>

                    {editingId === post.id ? (
                      <div className="mt-2 flex flex-col gap-2">
                        <textarea
                          value={draftText}
                          onChange={(e) => setDraftText(e.target.value)}
                          rows={2}
                          className="w-full rounded-lg border border-[#cceef5] px-3 py-2 text-sm text-foreground outline-none resize-none focus:border-[#0095b6]"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(post.id)}
                            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                            style={{ backgroundColor: "#0095b6" }}
                          >
                            Guardar
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="rounded-lg border border-[#e8f4f7] px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:bg-[#f5f0e8]"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-1 truncate text-sm text-muted-foreground">{post.text}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-end lg:justify-start">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${post.statusClassName}`}>
                        {post.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-[#f5f0e8] p-2">
                        <NetworkIcon type={post.iconType} />
                      </div>
                      {editingId !== post.id && (
                        <button
                          onClick={() => startEdit(post)}
                          className="rounded-full p-2 transition hover:bg-[#f5f0e8]"
                          title="Editar"
                          style={{ color: "#6b7280" }}
                        >
                          <PencilIcon />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Recent activity */}
          <section className="rounded-xl border border-[#e8f4f7] bg-white p-6">
            <h2 className="text-base font-bold text-foreground">Actividad reciente</h2>
            <div className="mt-6 space-y-0">
              {recentActivity.map((item, index) => (
                <div key={item.time + index} className="relative flex gap-4 pb-6 last:pb-0">
                  <div className="relative flex w-4 justify-center">
                    <span className="mt-1 h-3 w-3 rounded-full bg-primary" />
                    {index < recentActivity.length - 1 && (
                      <span className="absolute top-5 h-full w-px bg-primary/20" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm leading-6 text-foreground">{item.text}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M15.232 5.232l3.536 3.536M9 11l7.071-7.071a2.5 2.5 0 0 1 3.536 3.536L12.5 14.5l-5 1.5 1.5-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MetricIcon({ type }: { type: "calendar" | "users" | "clock" | "alert" }) {
  if (type === "calendar") return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-primary" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 9.5h17M8 3.5v4M16 3.5v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
  if (type === "users") return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-primary" aria-hidden="true">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 19a4.5 4.5 0 0 1 9 0M14 18a3.5 3.5 0 0 1 6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
  if (type === "clock") return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-accent" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5v5l3 1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-accent" aria-hidden="true">
      <path d="M12 4.5 20 18.5H4L12 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 9v4.5M12 16.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function NetworkIcon({ type }: { type: "instagram" | "facebook" | "linkedin" }) {
  if (type === "instagram") return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" stroke="#E1306C" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.5" stroke="#E1306C" strokeWidth="1.8" />
      <circle cx="16.4" cy="7.6" r="1" fill="#E1306C" />
    </svg>
  )
  if (type === "facebook") return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M13.2 20v-6h2.1l.4-2.4h-2.5V10c0-.7.2-1.2 1.3-1.2H16V6.6c-.3 0-1-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.3v1.8H9V14h2.1v6h2.1Z" fill="#1877F2" />
    </svg>
  )
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" fill="#0A66C2" />
      <circle cx="9" cy="9" r="1.3" fill="white" />
      <path d="M8 11h2v5H8zm3.2 0h1.9v.8h.1c.3-.5 1-.9 1.9-.9 2 0 2.4 1.3 2.4 3v3.1h-2v-2.7c0-.7 0-1.6-1-1.6s-1.1.8-1.1 1.5V17h-2V11Z" fill="white" />
    </svg>
  )
}
