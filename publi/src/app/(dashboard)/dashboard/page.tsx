"use client"

import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import {
  Calendar,
  CheckCircle2,
  Users,
  Clock,
  TrendingUp,
} from "lucide-react"
import { useAppStore } from "@/store/use-app-store"
import type { PostStatus } from "@/store/use-app-store"
import { cn } from "@/lib/utils"

// ─── Data ────────────────────────────────────────────────────────────────────

const metricCards = [
  {
    icon: Calendar,
    label: "Publicaciones esta semana",
    value: "8",
    trend: "+12% vs mes anterior",
  },
  {
    icon: CheckCircle2,
    label: "Publicadas este mes",
    value: "23",
    trend: "+8% vs mes anterior",
  },
  {
    icon: Users,
    label: "Cuentas conectadas",
    value: "2",
    trend: "+1 este mes",
  },
  {
    icon: Clock,
    label: "Próxima publicación",
    value: "en 2 h",
    trend: "programada hoy",
  },
]

const accountCards = [
  {
    username: "@cafeelmolino",
    platform: "Instagram",
    posts: "3 publicaciones esta semana",
    seed: "cafeelmolino",
  },
  {
    username: "@studiolucia",
    platform: "Instagram",
    posts: "5 publicaciones esta semana",
    seed: "studiolucia",
  },
]

const statusConfig: Record<PostStatus, { label: string; className: string }> = {
  programada: {
    label: "Programada",
    className: "bg-primary-light text-primary",
  },
  publicada: {
    label: "Publicada",
    className: "bg-green-50 text-green-700",
  },
  fallida: {
    label: "Fallida",
    className: "bg-destructive/10 text-destructive",
  },
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const posts = useAppStore((s) => s.posts)

  return (
    <div className="space-y-8 min-h-[calc(100vh-4rem)]">

      {/* ── Métricas ── */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {metricCards.map(({ icon: Icon, label, value, trend }) => (
            <div
              key={label}
              className="bg-card rounded-xl border border-border p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm text-muted-foreground leading-snug max-w-[120px]">
                  {label}
                </span>
                <div className="w-9 h-9 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 shrink-0" />
                {trend}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mis cuentas ── */}
      <section>
        <h2 className="text-base font-semibold text-foreground mb-4">
          Mis cuentas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {accountCards.map((account) => (
            <div
              key={account.username}
              className="bg-card rounded-xl border border-border p-5 flex items-center gap-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${account.seed}&backgroundColor=0095b6&textColor=ffffff`}
                alt={account.username}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="font-medium text-foreground text-sm">
                    {account.username}
                  </span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    Conectada
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {account.platform} · {account.posts}
                </p>
              </div>
              <button className="text-xs text-primary hover:underline font-medium shrink-0">
                Ver calendario
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Próximas publicaciones ── */}
      <section>
        <h2 className="text-base font-semibold text-foreground mb-4">
          Próximas publicaciones
        </h2>
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {posts.map((post, i) => {
            const status = statusConfig[post.status]
            const caption =
              post.caption.length > 60
                ? post.caption.slice(0, 60) + "…"
                : post.caption

            return (
              <div
                key={post.id}
                className={cn(
                  "flex items-center gap-4 px-5 py-4",
                  i < posts.length - 1 && "border-b border-border"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageUrl}
                  alt="Imagen de publicación"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{caption}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {post.account} ·{" "}
                    {formatDistanceToNow(post.scheduledAt, {
                      addSuffix: true,
                      locale: es,
                    })}
                  </p>
                </div>
                <span
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-full font-medium shrink-0",
                    status.className
                  )}
                >
                  {status.label}
                </span>
              </div>
            )
          })}
        </div>
      </section>

    </div>
  )
}
