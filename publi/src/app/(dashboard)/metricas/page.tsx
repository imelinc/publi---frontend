"use client"

import { useState } from "react"

// ─── Data ─────────────────────────────────────────────────────────────────────

interface MetricsSnapshot {
  alcance: string
  engagement: string
  posts: string
  mejorRed: string
  trend1: string
  trend2: string
  green1: boolean
  green2: boolean
  barData: { label: string; value: number }[]
  networkRows: { name: string; icon: NetworkName; posts: number; reach: string; engagement: string; bestPost: string }[]
}

type NetworkName = "Instagram" | "Facebook" | "TikTok" | "LinkedIn" | "X"

const METRICS: Record<string, Record<string, MetricsSnapshot>> = {
  todos: {
    "30": {
      alcance: "48.200", engagement: "4.8%", posts: "34", mejorRed: "Instagram",
      trend1: "+12%", trend2: "+0.3%", green1: true, green2: true,
      barData: [{ label: "Sem 1", value: 6 }, { label: "Sem 2", value: 10 }, { label: "Sem 3", value: 8 }, { label: "Sem 4", value: 12 }],
      networkRows: [
        { name: "Instagram", icon: "Instagram", posts: 12, reach: "18.200", engagement: "5.6%", bestPost: "Carrusel de resultados" },
        { name: "Facebook", icon: "Facebook", posts: 7, reach: "9.400", engagement: "3.4%", bestPost: "Promo de temporada" },
        { name: "TikTok", icon: "TikTok", posts: 6, reach: "11.100", engagement: "6.1%", bestPost: "Behind the scenes" },
        { name: "LinkedIn", icon: "LinkedIn", posts: 5, reach: "6.800", engagement: "4.2%", bestPost: "Caso de éxito Q1" },
        { name: "X", icon: "X", posts: 4, reach: "2.700", engagement: "2.8%", bestPost: "Tip breve del día" },
      ],
    },
    "7": {
      alcance: "11.400", engagement: "5.1%", posts: "9", mejorRed: "TikTok",
      trend1: "+8%", trend2: "+0.5%", green1: true, green2: true,
      barData: [{ label: "Lun", value: 1 }, { label: "Mié", value: 3 }, { label: "Vie", value: 2 }, { label: "Dom", value: 3 }],
      networkRows: [
        { name: "Instagram", icon: "Instagram", posts: 3, reach: "3.800", engagement: "5.1%", bestPost: "Reel de producto" },
        { name: "Facebook", icon: "Facebook", posts: 2, reach: "2.100", engagement: "3.0%", bestPost: "Story patrocinada" },
        { name: "TikTok", icon: "TikTok", posts: 2, reach: "4.200", engagement: "7.2%", bestPost: "Tutorial express" },
        { name: "LinkedIn", icon: "LinkedIn", posts: 1, reach: "900", engagement: "4.0%", bestPost: "Post de equipo" },
        { name: "X", icon: "X", posts: 1, reach: "400", engagement: "2.1%", bestPost: "Hilo de novedades" },
      ],
    },
    "90": {
      alcance: "132.000", engagement: "4.3%", posts: "98", mejorRed: "Instagram",
      trend1: "+18%", trend2: "+0.1%", green1: true, green2: true,
      barData: [{ label: "Mes 1", value: 28 }, { label: "Mes 2", value: 34 }, { label: "Mes 3", value: 36 }, { label: "Total", value: 98 }],
      networkRows: [
        { name: "Instagram", icon: "Instagram", posts: 38, reach: "52.000", engagement: "5.4%", bestPost: "Campaña verano" },
        { name: "Facebook", icon: "Facebook", posts: 20, reach: "28.000", engagement: "3.2%", bestPost: "Concurso del mes" },
        { name: "TikTok", icon: "TikTok", posts: 18, reach: "31.000", engagement: "5.9%", bestPost: "Viral de producto" },
        { name: "LinkedIn", icon: "LinkedIn", posts: 12, reach: "14.000", engagement: "4.0%", bestPost: "Informe anual" },
        { name: "X", icon: "X", posts: 10, reach: "7.000", engagement: "2.5%", bestPost: "Anuncio de lanzamiento" },
      ],
    },
  },
  "neon-inc": {
    "30": {
      alcance: "22.100", engagement: "5.6%", posts: "12", mejorRed: "Instagram",
      trend1: "+20%", trend2: "+0.8%", green1: true, green2: true,
      barData: [{ label: "Sem 1", value: 2 }, { label: "Sem 2", value: 4 }, { label: "Sem 3", value: 3 }, { label: "Sem 4", value: 3 }],
      networkRows: [
        { name: "Instagram", icon: "Instagram", posts: 6, reach: "14.000", engagement: "6.8%", bestPost: "Campaña de abril" },
        { name: "Facebook", icon: "Facebook", posts: 3, reach: "5.200", engagement: "3.9%", bestPost: "Post institucional" },
        { name: "LinkedIn", icon: "LinkedIn", posts: 3, reach: "2.900", engagement: "4.8%", bestPost: "Caso de éxito" },
      ],
    },
    "7": {
      alcance: "5.300", engagement: "6.0%", posts: "3", mejorRed: "Instagram",
      trend1: "+15%", trend2: "+1.2%", green1: true, green2: true,
      barData: [{ label: "Lun", value: 0 }, { label: "Mié", value: 2 }, { label: "Vie", value: 0 }, { label: "Dom", value: 1 }],
      networkRows: [
        { name: "Instagram", icon: "Instagram", posts: 2, reach: "3.800", engagement: "7.1%", bestPost: "Reel destacado" },
        { name: "LinkedIn", icon: "LinkedIn", posts: 1, reach: "1.500", engagement: "4.5%", bestPost: "Actualización Q1" },
      ],
    },
    "90": {
      alcance: "58.000", engagement: "5.2%", posts: "38", mejorRed: "Instagram",
      trend1: "+25%", trend2: "+0.6%", green1: true, green2: true,
      barData: [{ label: "Mes 1", value: 10 }, { label: "Mes 2", value: 14 }, { label: "Mes 3", value: 14 }, { label: "Total", value: 38 }],
      networkRows: [
        { name: "Instagram", icon: "Instagram", posts: 20, reach: "36.000", engagement: "6.1%", bestPost: "Campaña verano" },
        { name: "Facebook", icon: "Facebook", posts: 10, reach: "14.000", engagement: "3.8%", bestPost: "Sorteo mensual" },
        { name: "LinkedIn", icon: "LinkedIn", posts: 8, reach: "8.000", engagement: "4.9%", bestPost: "Reporte anual" },
      ],
    },
  },
  "casa-nube": {
    "30": {
      alcance: "14.600", engagement: "4.1%", posts: "9", mejorRed: "TikTok",
      trend1: "+5%", trend2: "-0.2%", green1: true, green2: false,
      barData: [{ label: "Sem 1", value: 2 }, { label: "Sem 2", value: 2 }, { label: "Sem 3", value: 3 }, { label: "Sem 4", value: 2 }],
      networkRows: [
        { name: "Instagram", icon: "Instagram", posts: 5, reach: "7.200", engagement: "4.5%", bestPost: "Lookbook otoño" },
        { name: "TikTok", icon: "TikTok", posts: 4, reach: "7.400", engagement: "6.8%", bestPost: "Haul de temporada" },
      ],
    },
    "7": {
      alcance: "3.100", engagement: "4.3%", posts: "2", mejorRed: "TikTok",
      trend1: "+3%", trend2: "+0.1%", green1: true, green2: true,
      barData: [{ label: "Lun", value: 0 }, { label: "Mié", value: 1 }, { label: "Vie", value: 1 }, { label: "Dom", value: 0 }],
      networkRows: [
        { name: "Instagram", icon: "Instagram", posts: 1, reach: "1.200", engagement: "3.9%", bestPost: "Story de producto" },
        { name: "TikTok", icon: "TikTok", posts: 1, reach: "1.900", engagement: "7.0%", bestPost: "Unboxing rápido" },
      ],
    },
    "90": {
      alcance: "39.000", engagement: "3.8%", posts: "27", mejorRed: "TikTok",
      trend1: "+10%", trend2: "-0.4%", green1: true, green2: false,
      barData: [{ label: "Mes 1", value: 8 }, { label: "Mes 2", value: 9 }, { label: "Mes 3", value: 10 }, { label: "Total", value: 27 }],
      networkRows: [
        { name: "Instagram", icon: "Instagram", posts: 14, reach: "18.000", engagement: "4.2%", bestPost: "Campaña primavera" },
        { name: "TikTok", icon: "TikTok", posts: 13, reach: "21.000", engagement: "6.4%", bestPost: "Serie de looks" },
      ],
    },
  },
}

const CLIENT_OPTIONS = [
  { value: "todos", label: "Todos los clientes" },
  { value: "neon-inc", label: "Neon Inc." },
  { value: "casa-nube", label: "Casa Nube" },
]
const PERIOD_OPTIONS = [
  { value: "30", label: "Últimos 30 días" },
  { value: "7", label: "Últimos 7 días" },
  { value: "90", label: "Últimos 90 días" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MetricasPage() {
  const [client, setClient] = useState("todos")
  const [period, setPeriod] = useState("30")

  const data = METRICS[client]?.[period] ?? METRICS["todos"]["30"]
  const maxBar = Math.max(...data.barData.map((d) => d.value))

  return (
    <main className="min-h-screen bg-[#f5f0e8] p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-[-0.03em] text-foreground">Métricas</h1>
            <p className="mt-2 text-sm text-muted-foreground">Rendimiento consolidado de tus cuentas y clientes.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="rounded-xl border border-[#e8f4f7] bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-[#0095b6] transition cursor-pointer"
            >
              {CLIENT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="rounded-xl border border-[#e8f4f7] bg-white px-4 py-3 text-sm text-foreground outline-none focus:border-[#0095b6] transition cursor-pointer"
            >
              {PERIOD_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </section>

        {/* KPIs */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Alcance total" value={data.alcance} trend={data.trend1} green={data.green1} />
          <KpiCard label="Engagement promedio" value={data.engagement} trend={data.trend2} green={data.green2} />
          <KpiCard label="Posts publicados" value={data.posts} trend="neutral" green={false} />
          <KpiCard label="Mejor red" value={data.mejorRed} trend="este mes" green={false} showInstagram={data.mejorRed === "Instagram"} />
        </section>

        {/* Bar chart */}
        <section className="rounded-xl border border-[#e8f4f7] bg-white p-6">
          <h2 className="text-base font-bold text-foreground">Publicaciones por período</h2>
          <div className="mt-8 grid gap-6" style={{ gridTemplateColumns: `repeat(${data.barData.length}, 1fr)` }}>
            {data.barData.map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <span className="mb-3 text-sm font-semibold text-foreground">{item.value}</span>
                <div className="flex h-52 w-full items-end justify-center rounded-xl bg-primary-light/40 px-6 py-4">
                  <div
                    className="w-full rounded-t-xl bg-primary transition-all duration-500"
                    style={{ height: `${(item.value / maxBar) * 100}%` }}
                  />
                </div>
                <span className="mt-3 text-sm text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Network table */}
        <section className="overflow-hidden rounded-xl border border-[#e8f4f7] bg-white">
          <div className="border-b border-[#e8f4f7] px-6 py-5">
            <h2 className="text-base font-bold text-foreground">Rendimiento por red</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-[#f5f0e8]">
                <tr>
                  {["Red social", "Posts", "Alcance", "Engagement", "Mejor post"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.networkRows.map((row) => (
                  <tr key={row.name} className="border-t border-[#e8f4f7]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-[#f5f0e8] p-2">
                          <NetworkIcon name={row.icon} />
                        </div>
                        <span className="text-sm font-semibold text-foreground">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{row.posts}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{row.reach}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{row.engagement}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{row.bestPost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({ label, value, trend, green, showInstagram }: {
  label: string; value: string; trend: string; green: boolean; showInstagram?: boolean
}) {
  return (
    <article className="rounded-xl border border-[#e8f4f7] bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        {showInstagram && (
          <div className="rounded-lg bg-[#f5f0e8] p-2">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <rect x="4.5" y="4.5" width="15" height="15" rx="4" stroke="#E1306C" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="3.5" stroke="#E1306C" strokeWidth="1.8" />
              <circle cx="16.4" cy="7.6" r="1" fill="#E1306C" />
            </svg>
          </div>
        )}
      </div>
      <p className="mt-5 text-[32px] font-bold leading-none text-foreground">{value}</p>
      <p className={`mt-3 text-sm font-medium ${green ? "text-[#15803d]" : "text-muted-foreground"}`}>{trend}</p>
    </article>
  )
}

function NetworkIcon({ name }: { name: NetworkName }) {
  if (name === "Instagram") return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" stroke="#E1306C" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.5" stroke="#E1306C" strokeWidth="1.8" />
      <circle cx="16.4" cy="7.6" r="1" fill="#E1306C" />
    </svg>
  )
  if (name === "Facebook") return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M13.2 20v-6h2.1l.4-2.4h-2.5V10c0-.7.2-1.2 1.3-1.2H16V6.6c-.3 0-1-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.3v1.8H9V14h2.1v6h2.1Z" fill="#1877F2" />
    </svg>
  )
  if (name === "TikTok") return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M13.7 4c.4 1.4 1.3 2.5 2.8 3.1.7.4 1.5.6 2.3.7v2.8a6.9 6.9 0 0 1-3.8-1.1v5.2a5 5 0 1 1-5-5c.3 0 .7 0 1 .1v2.9a2.3 2.3 0 1 0 1.7 2.2V4h3Z" fill="#111111" />
    </svg>
  )
  if (name === "LinkedIn") return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" fill="#0A66C2" />
      <circle cx="9" cy="9" r="1.3" fill="white" />
      <path d="M8 11h2v5H8zm3.2 0h1.9v.8h.1c.3-.5 1-.9 1.9-.9 2 0 2.4 1.3 2.4 3v3.1h-2v-2.7c0-.7 0-1.6-1-1.6s-1.1.8-1.1 1.5V17h-2V11Z" fill="white" />
    </svg>
  )
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M6 4h4.3l4 5.2L18.7 4H20l-5 5.8L20.3 20H16l-4.2-5.6L7 20H5.7l5.4-6.2L6 4Zm2.3 1.6H7.4l8.4 12.8h.9L8.3 5.6Z" fill="#111111" />
    </svg>
  )
}
