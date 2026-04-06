// ─── Types ────────────────────────────────────────────────────────────────────

export type PostStatus = "programada" | "borrador" | "publicada" | "fallida"
export type Platform = "instagram" | "facebook" | "linkedin" | "tiktok" | "x"
export type AlertSeverity = "success" | "warning" | "error" | "info"
export type AttentionType = "failed" | "pending_review" | "overdue" | "info"
export type TrendDirection = "up" | "down" | "neutral"

export interface DashboardPost {
  id: string
  client: string
  clientInitials: string
  platform: Platform
  caption: string
  status: PostStatus
  scheduledAt: string
  imageUrl: string
}

export interface KpiData {
  label: string
  value: string
  trend: string
  trendDirection: TrendDirection
  icon: "calendar" | "clock" | "users" | "trending-up"
}

export interface AttentionItem {
  id: string
  type: AttentionType
  title: string
  description: string
  cta: string
  ctaHref: string
}

export interface AlertItem {
  id: string
  severity: AlertSeverity
  text: string
  time: string
  cta?: string
  ctaHref?: string
}

// ─── KPI Data ─────────────────────────────────────────────────────────────────

export const kpiData: KpiData[] = [
  {
    label: "Programadas hoy",
    value: "5",
    trend: "+2 vs ayer",
    trendDirection: "up",
    icon: "calendar",
  },
  {
    label: "Pendientes de revisión",
    value: "3",
    trend: "1 urgente",
    trendDirection: "down",
    icon: "clock",
  },
  {
    label: "Clientes activos",
    value: "7",
    trend: "+1 este mes",
    trendDirection: "up",
    icon: "users",
  },
  {
    label: "Engagement promedio",
    value: "4.8%",
    trend: "+0.3% vs semana pasada",
    trendDirection: "up",
    icon: "trending-up",
  },
]

// ─── Dashboard Posts ──────────────────────────────────────────────────────────

export const dashboardPosts: DashboardPost[] = [
  {
    id: "1",
    client: "Neon Inc.",
    clientInitials: "NI",
    platform: "instagram",
    caption:
      "Presentamos la campaña de abril con foco en resultados reales y contenido evergreen.",
    status: "programada",
    scheduledAt: "Hoy · 10:30",
    imageUrl: "https://picsum.photos/seed/post1/400/400",
  },
  {
    id: "2",
    client: "Casa Nube",
    clientInitials: "CN",
    platform: "facebook",
    caption:
      "Nuevo carrusel con consejos de temporada y CTA para generar consultas por DM.",
    status: "borrador",
    scheduledAt: "Hoy · 15:00",
    imageUrl: "https://picsum.photos/seed/post2/400/400",
  },
  {
    id: "3",
    client: "Studio Lucia",
    clientInitials: "SL",
    platform: "linkedin",
    caption:
      "Caso de éxito del mes con foco en crecimiento orgánico y optimización de mensajes.",
    status: "programada",
    scheduledAt: "Mañana · 09:15",
    imageUrl: "https://picsum.photos/seed/post3/400/400",
  },
  {
    id: "4",
    client: "Brava Home",
    clientInitials: "BH",
    platform: "instagram",
    caption:
      "Receta de temporada con ingredientes locales. Foto de alta calidad + copy emotivo.",
    status: "programada",
    scheduledAt: "Mañana · 12:00",
    imageUrl: "https://picsum.photos/seed/post4/400/400",
  },
  {
    id: "5",
    client: "Luma Fit",
    clientInitials: "LF",
    platform: "tiktok",
    caption:
      "Rutina de 15 minutos para empezar la semana con energía. Video vertical con subtítulos.",
    status: "borrador",
    scheduledAt: "Miércoles · 08:00",
    imageUrl: "https://picsum.photos/seed/post5/400/400",
  },
]

// ─── Needs Attention ──────────────────────────────────────────────────────────

export const needsAttentionItems: AttentionItem[] = [
  {
    id: "att-1",
    type: "failed",
    title: "Publicación fallida",
    description:
      "El reel de Neon Inc. en Instagram no se publicó por un error de formato.",
    cta: "Reintentar",
    ctaHref: "/nueva-publicacion",
  },
  {
    id: "att-2",
    type: "pending_review",
    title: "2 borradores pendientes",
    description:
      "Casa Nube y Luma Fit tienen contenido esperando tu aprobación.",
    cta: "Revisar",
    ctaHref: "/dashboard",
  },
  {
    id: "att-3",
    type: "overdue",
    title: "Contenido vencido",
    description:
      "El post de Brava Home para el lunes pasado nunca fue reprogramado.",
    cta: "Reprogramar",
    ctaHref: "/calendario",
  },
]

// ─── Alerts Feed ──────────────────────────────────────────────────────────────

export const alertItems: AlertItem[] = [
  {
    id: "al-1",
    severity: "success",
    text: "Publicación de Neon Inc. en Instagram publicada exitosamente.",
    time: "Hace 2 horas",
    cta: "Ver post",
    ctaHref: "/metricas",
  },
  {
    id: "al-2",
    severity: "warning",
    text: "El borrador de Casa Nube para Facebook expira mañana.",
    time: "Hace 4 horas",
    cta: "Revisar",
    ctaHref: "/nueva-publicacion",
  },
  {
    id: "al-3",
    severity: "error",
    text: "Falló la publicación del carrusel de Brava Home en LinkedIn.",
    time: "Hace 6 horas",
    cta: "Reintentar",
    ctaHref: "/nueva-publicacion",
  },
  {
    id: "al-4",
    severity: "info",
    text: "Studio Lucia aprobó el contenido programado para mañana.",
    time: "Hace 1 día",
  },
  {
    id: "al-5",
    severity: "success",
    text: "Luma Fit superó las 1.000 interacciones en su último TikTok.",
    time: "Hace 1 día",
    cta: "Ver métricas",
    ctaHref: "/metricas",
  },
]

// ─── Today Summary (for greeting banner) ──────────────────────────────────────

export const todaySummary = {
  scheduledCount: 5,
  pendingReviewCount: 3,
  failedCount: 1,
  clientsActiveCount: 7,
}

// ─── Platform display helpers ─────────────────────────────────────────────────

export const platformLabels: Record<Platform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  x: "X",
}

export const platformColors: Record<Platform, string> = {
  instagram: "#E1306C",
  facebook: "#1877F2",
  linkedin: "#0A66C2",
  tiktok: "#111111",
  x: "#111111",
}
