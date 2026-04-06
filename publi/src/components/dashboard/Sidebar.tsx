"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  LayoutGrid,
  Users,
  CalendarDays,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  ChevronRight,
} from "lucide-react"
import { useAppStore } from "@/store/use-app-store"
import { cn } from "@/lib/utils"

// ─── Nav config ───────────────────────────────────────────────────────────────

const navItems = [
  { label: "Dashboard", href: "/dashboard", Icon: LayoutGrid, badge: 0 },
  { label: "Clientes", href: "/clientes", Icon: Users, badge: 7 },
  { label: "Calendario", href: "/calendario", Icon: CalendarDays, badge: 3 },
  { label: "Métricas", href: "/metricas", Icon: BarChart3, badge: 0 },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
}

// ─── NavItem ──────────────────────────────────────────────────────────────────

function NavItem({
  label,
  Icon,
  active,
  badge,
  onClick,
}: {
  label: string
  href?: string
  Icon: typeof LayoutGrid
  active: boolean
  badge?: number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 rounded-[10px] px-4 py-2.5 text-left transition-all duration-150",
        active
          ? "bg-primary-light text-primary font-semibold border-l-[3px] border-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
      <span className="flex-1 text-[14px]">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-accent-foreground">
          {badge}
        </span>
      )}
    </button>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const profile = useAppStore((s) => s.profile)

  function navigate(href: string) {
    router.push(href)
    onClose()
  }

  const sidebarContent = (
    <aside className="flex h-full w-[280px] flex-col border-r border-primary-light/60 bg-white">
      {/* Logo */}
      <div className="shrink-0 px-6 pb-4 pt-6">
        <span className="text-[22px] font-bold leading-none text-primary">
          publi
        </span>
      </div>

      {/* Client selector */}
      <div className="shrink-0 border-b border-primary-light/60 px-4 pb-4">
        <button
          className={cn(
            "flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left",
            "transition-colors duration-150 hover:bg-primary-light/40"
          )}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-[13px] font-bold text-primary">
            NI
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-foreground">
              Neon Inc.
            </p>
            <p className="text-[11px] text-muted-foreground">Cliente activo</p>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </div>

      {/* Nueva Publicación CTA */}
      <div className="shrink-0 px-4 pb-2 pt-4">
        <button
          onClick={() => navigate("/nueva-publicacion")}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-[10px]",
            "bg-primary px-5 py-3.5 text-[15px] font-bold text-white",
            "transition-colors duration-150 hover:bg-primary/90"
          )}
        >
          <Plus className="h-5 w-5" />
          Nueva Publicación
        </button>
      </div>

      {/* Main nav */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-2">
        {navItems.map(({ label, href, Icon, badge }) => (
          <NavItem
            key={href}
            label={label}
            href={href}
            Icon={Icon}
            active={pathname === href}
            badge={badge}
            onClick={() => navigate(href)}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-primary-light/60 px-4 pb-5 pt-4">
        <div className="flex flex-col gap-3">
          {/* Configuración */}
          <NavItem
            label="Configuración"
            href="/configuracion"
            Icon={Settings}
            active={pathname === "/configuracion"}
            onClick={() => navigate("/configuracion")}
          />

          {/* User mini card */}
          <div className="flex items-center gap-3 rounded-[10px] bg-muted px-3 py-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-[13px] font-bold text-primary">
              {getInitials(profile.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-bold text-foreground">
                {profile.name}
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                {profile.email}
              </p>
            </div>
            <button
              onClick={() => router.push("/login")}
              title="Cerrar sesión"
              className="text-muted-foreground transition-colors duration-150 hover:text-red-500"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )

  return (
    <>
      {/* Desktop: fixed sidebar */}
      <div className="fixed left-0 top-0 z-30 hidden h-screen md:flex">
        {sidebarContent}
      </div>

      {/* Mobile: overlay sidebar */}
      {isOpen && (
        <div
          className="fixed left-0 top-0 z-40 h-screen md:hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {sidebarContent}
        </div>
      )}
    </>
  )
}
