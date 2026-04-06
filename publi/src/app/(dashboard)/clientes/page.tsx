"use client"

import { useEffect, useRef, useState } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

type SocialNetwork = "Instagram" | "Facebook" | "TikTok" | "LinkedIn" | "X" | "YouTube"
type Industry = "Gastronomía" | "Moda" | "Tecnología" | "Salud" | "Educación" | "Otro"

interface Client {
  id: string
  name: string
  industry: string
  platforms: SocialNetwork[]
  posts: string
  lastPost: string
  headerColor: string
  textColor: string
}

// ─── Static data ──────────────────────────────────────────────────────────────

const INITIAL_CLIENTS: Client[] = [
  {
    id: "1", name: "Neon Inc.", industry: "Tecnología",
    platforms: ["Instagram", "Facebook", "LinkedIn"],
    posts: "12 posts este mes", lastPost: "Última publicación: hace 1 día",
    headerColor: "#cceef5", textColor: "#0095b6",
  },
  {
    id: "2", name: "Casa Nube", industry: "Moda",
    platforms: ["Instagram", "TikTok"],
    posts: "9 posts este mes", lastPost: "Última publicación: hace 2 días",
    headerColor: "#dbeafe", textColor: "#0A66C2",
  },
  {
    id: "3", name: "Studio Lucia", industry: "Educación",
    platforms: ["Instagram", "Facebook"],
    posts: "15 posts este mes", lastPost: "Última publicación: hace 6 horas",
    headerColor: "#fef3c7", textColor: "#92400e",
  },
  {
    id: "4", name: "Brava Home", industry: "Gastronomía",
    platforms: ["Facebook", "LinkedIn", "X"],
    posts: "7 posts este mes", lastPost: "Última publicación: hace 3 días",
    headerColor: "#cceef5", textColor: "#0095b6",
  },
  {
    id: "5", name: "Luma Fit", industry: "Salud",
    platforms: ["TikTok", "Instagram", "YouTube"],
    posts: "11 posts este mes", lastPost: "Última publicación: hace 1 día",
    headerColor: "#e5e7eb", textColor: "#111827",
  },
]

const NETWORK_OPTIONS: SocialNetwork[] = ["Instagram", "Facebook", "TikTok", "LinkedIn", "X", "YouTube"]
const INDUSTRY_OPTIONS: Industry[] = ["Gastronomía", "Moda", "Tecnología", "Salud", "Educación", "Otro"]

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

function headerColorForIndex(i: number): { headerColor: string; textColor: string } {
  const colors = [
    { headerColor: "#cceef5", textColor: "#0095b6" },
    { headerColor: "#fef3c7", textColor: "#92400e" },
    { headerColor: "#dbeafe", textColor: "#1e40af" },
    { headerColor: "#d1fae5", textColor: "#065f46" },
    { headerColor: "#ede9fe", textColor: "#5b21b6" },
  ]
  return colors[i % colors.length]
}

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
      <div className="rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-xl" style={{ backgroundColor: "#0095b6" }}>
        {message}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editNames, setEditNames] = useState<Record<string, string>>({})
  const [toastMsg, setToastMsg] = useState("")
  const [toastVisible, setToastVisible] = useState(false)

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [modalName, setModalName] = useState("")
  const [modalIndustry, setModalIndustry] = useState<Industry | "">("")
  const [modalPlatforms, setModalPlatforms] = useState<SocialNetwork[]>([])
  const [modalError, setModalError] = useState("")
  const modalRef = useRef<HTMLDivElement>(null)

  function showToast(msg: string) {
    setToastMsg(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  function openModal() {
    setModalName("")
    setModalIndustry("")
    setModalPlatforms([])
    setModalError("")
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  function togglePlatform(p: SocialNetwork) {
    setModalPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )
  }

  function submitModal() {
    if (!modalName.trim()) { setModalError("El nombre es requerido."); return }
    const colors = headerColorForIndex(clients.length)
    const newClient: Client = {
      id: Date.now().toString(),
      name: modalName.trim(),
      industry: modalIndustry || "Otro",
      platforms: modalPlatforms,
      posts: "0 posts este mes",
      lastPost: "Sin publicaciones aún",
      ...colors,
    }
    setClients((prev) => [...prev, newClient])
    closeModal()
    showToast("Cliente agregado exitosamente")
  }

  function toggleExpand(id: string, currentName: string) {
    if (expandedId === id) {
      setExpandedId(null)
    } else {
      setExpandedId(id)
      setEditNames((prev) => ({ ...prev, [id]: currentName }))
    }
  }

  function saveClientName(id: string) {
    const newName = editNames[id]?.trim()
    if (!newName) return
    setClients((prev) => prev.map((c) => c.id === id ? { ...c, name: newName } : c))
    setExpandedId(null)
    showToast("Cambios guardados")
  }

  // Close modal on outside click
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal()
      }
    }
    if (modalOpen) document.addEventListener("mousedown", onOutside)
    return () => document.removeEventListener("mousedown", onOutside)
  }, [modalOpen])

  return (
    <main className="min-h-screen bg-[#f5f0e8] p-6 md:p-8">
      <Toast message={toastMsg} visible={toastVisible} />

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div
            ref={modalRef}
            className="w-full max-w-[480px] rounded-2xl bg-white p-8"
            style={{ border: "1px solid #e8f4f7" }}
          >
            <h2 className="text-xl font-bold mb-6" style={{ color: "#1a1a2e" }}>
              Agregar nuevo cliente
            </h2>

            <div className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: "#1a1a2e" }}>Nombre del cliente *</label>
                <input
                  type="text"
                  value={modalName}
                  onChange={(e) => { setModalName(e.target.value); setModalError("") }}
                  placeholder="Ej: Neon Inc."
                  className="rounded-lg border px-4 py-3 text-sm outline-none transition"
                  style={{ borderColor: modalError ? "#dc2626" : "#cceef5", color: "#1a1a2e" }}
                  onFocus={(e) => (e.target.style.borderColor = "#0095b6")}
                  onBlur={(e) => (e.target.style.borderColor = modalError ? "#dc2626" : "#cceef5")}
                />
                {modalError && <span className="text-xs" style={{ color: "#dc2626" }}>{modalError}</span>}
              </div>

              {/* Industry */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: "#1a1a2e" }}>Industria</label>
                <select
                  value={modalIndustry}
                  onChange={(e) => setModalIndustry(e.target.value as Industry)}
                  className="rounded-lg border px-4 py-3 text-sm outline-none"
                  style={{ borderColor: "#cceef5", color: "#1a1a2e" }}
                >
                  <option value="">Seleccioná una industria</option>
                  {INDUSTRY_OPTIONS.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              {/* Platforms */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium" style={{ color: "#1a1a2e" }}>Redes a conectar</label>
                <div className="flex flex-wrap gap-2">
                  {NETWORK_OPTIONS.map((net) => (
                    <button
                      key={net}
                      type="button"
                      onClick={() => togglePlatform(net)}
                      className="rounded-full border px-3 py-1.5 text-xs font-medium transition"
                      style={{
                        backgroundColor: modalPlatforms.includes(net) ? "#0095b6" : "transparent",
                        borderColor: modalPlatforms.includes(net) ? "#0095b6" : "#cceef5",
                        color: modalPlatforms.includes(net) ? "white" : "#6b7280",
                      }}
                    >
                      {net}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3 justify-end">
              <button
                onClick={closeModal}
                className="rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-[#f5f0e8]"
                style={{ borderColor: "#e8f4f7", color: "#6b7280" }}
              >
                Cancelar
              </button>
              <button
                onClick={submitModal}
                className="rounded-xl px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
                style={{ backgroundColor: "#0095b6" }}
              >
                Agregar cliente
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl space-y-8">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-[-0.03em] text-foreground">Clientes</h1>
            <p className="mt-2 text-sm text-muted-foreground">Organizá tus marcas y sus redes desde un solo lugar.</p>
          </div>
          <button
            type="button"
            onClick={openModal}
            className="rounded-xl px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#0095b6" }}
          >
            + Nuevo cliente
          </button>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {clients.map((client) => {
            const isExpanded = expandedId === client.id
            const initials = getInitials(client.name)

            return (
              <article
                key={client.id}
                className="overflow-hidden rounded-xl border border-[#e8f4f7] bg-white transition hover:border-[#0095b6] hover:shadow-[0_14px_40px_-28px_rgba(0,149,182,0.45)]"
              >
                <div className="flex h-[60px] items-center justify-center" style={{ backgroundColor: client.headerColor }}>
                  <span className="text-2xl font-bold" style={{ color: client.textColor }}>{initials}</span>
                </div>
                <div className="p-5">
                  <h2 className="text-base font-bold text-foreground">{client.name}</h2>
                  {client.industry && (
                    <span className="mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium" style={{ backgroundColor: "#f5f0e8", color: "#6b7280" }}>
                      {client.industry}
                    </span>
                  )}
                  <div className="mt-3 flex items-center gap-2 text-muted-foreground flex-wrap">
                    {client.platforms.map((p) => (
                      <PlatformBadge key={p} name={p} />
                    ))}
                  </div>
                  <div className="mt-4 space-y-1">
                    <p className="text-sm text-muted-foreground">{client.posts}</p>
                    <p className="text-sm text-muted-foreground">{client.lastPost}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleExpand(client.id, client.name)}
                    className="mt-5 w-full rounded-xl border px-4 py-3 text-sm font-semibold transition"
                    style={{
                      borderColor: "#0095b6",
                      backgroundColor: isExpanded ? "#0095b6" : "white",
                      color: isExpanded ? "white" : "#0095b6",
                    }}
                  >
                    {isExpanded ? "Cerrar" : "Ver cliente"}
                  </button>

                  {isExpanded && (
                    <div className="mt-4 flex flex-col gap-2 border-t border-[#e8f4f7] pt-4">
                      <label className="text-xs font-medium" style={{ color: "#6b7280" }}>Nombre del cliente</label>
                      <input
                        type="text"
                        value={editNames[client.id] ?? client.name}
                        onChange={(e) => setEditNames((prev) => ({ ...prev, [client.id]: e.target.value }))}
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                        style={{ borderColor: "#cceef5", color: "#1a1a2e" }}
                        onFocus={(e) => (e.target.style.borderColor = "#0095b6")}
                        onBlur={(e) => (e.target.style.borderColor = "#cceef5")}
                      />
                      <button
                        onClick={() => saveClientName(client.id)}
                        className="rounded-lg py-2 text-sm font-semibold text-white transition hover:opacity-90"
                        style={{ backgroundColor: "#0095b6" }}
                      >
                        Guardar cambios
                      </button>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </section>
      </div>
    </main>
  )
}

// ─── Platform badge ───────────────────────────────────────────────────────────

function PlatformBadge({ name }: { name: SocialNetwork }) {
  const colors: Record<SocialNetwork, { bg: string; text: string }> = {
    Instagram: { bg: "#fce7f3", text: "#9d174d" },
    Facebook: { bg: "#dbeafe", text: "#1e40af" },
    TikTok: { bg: "#f3f4f6", text: "#111827" },
    LinkedIn: { bg: "#dbeafe", text: "#1e3a5f" },
    X: { bg: "#f3f4f6", text: "#111827" },
    YouTube: { bg: "#fee2e2", text: "#991b1b" },
  }
  const c = colors[name]
  return (
    <span className="rounded-full px-2 py-0.5 text-[11px] font-medium" style={{ backgroundColor: c.bg, color: c.text }}>
      {name}
    </span>
  )
}
