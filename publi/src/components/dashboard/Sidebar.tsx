"use client"

import { usePathname, useRouter } from "next/navigation"
import { useAppStore } from "@/store/use-app-store"

// ─── Icons ────────────────────────────────────────────────────────────────────

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" aria-hidden="true">
      <circle cx="9" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M2 20c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 11c1.657 0 3 1.343 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 6.268A3.5 3.5 0 0 1 16 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" aria-hidden="true">
      <rect x="3" y="4" width="18" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 13h2M11 13h2M15 13h2M7 17h2M11 17h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function BarChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" aria-hidden="true">
      <path d="M4 20V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 20V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 20V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 20V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function GearIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Nav config ───────────────────────────────────────────────────────────────

const navItems = [
  { label: "Dashboard", href: "/dashboard", Icon: GridIcon },
  { label: "Clientes", href: "/clientes", Icon: UsersIcon },
  { label: "Calendario", href: "/calendario", Icon: CalendarIcon },
  { label: "Métricas", href: "/metricas", Icon: BarChartIcon },
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavItem({
  label,
  href,
  Icon,
  active,
  onClick,
}: {
  label: string
  href: string
  Icon: () => JSX.Element
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-5 py-3 rounded-[10px] text-left transition-all duration-150"
      style={
        active
          ? { backgroundColor: "#cceef5", color: "#0095b6" }
          : { color: "#6b7280" }
      }
      onMouseEnter={(e) => {
        if (!active)
          (e.currentTarget as HTMLElement).style.cssText +=
            "background-color:#f5f9fb;color:#1a1a2e;"
      }}
      onMouseLeave={(e) => {
        if (!active)
          (e.currentTarget as HTMLElement).style.cssText +=
            "background-color:transparent;color:#6b7280;"
      }}
    >
      <Icon />
      <span
        className="text-[14px]"
        style={{ fontWeight: active ? 600 : 500 }}
      >
        {label}
      </span>
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
    <aside
      className="flex flex-col h-full"
      style={{
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e8f4f7",
        width: "280px",
      }}
    >
      {/* ── Logo ── */}
      <div className="px-6 pt-6 pb-4 shrink-0">
        <span
          className="font-bold leading-none"
          style={{ color: "#0095b6", fontSize: "22px" }}
        >
          publi
        </span>
      </div>

      {/* ── Client selector ── */}
      <div className="px-4 pb-4 shrink-0" style={{ borderBottom: "1px solid #e8f4f7" }}>
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] transition-colors duration-150 text-left"
          style={{ backgroundColor: "transparent" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = "#f0fafc")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
          }
        >
          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[13px] font-bold"
            style={{ backgroundColor: "#cceef5", color: "#0095b6" }}
          >
            NI
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold truncate" style={{ color: "#1a1a2e" }}>
              Neon Inc.
            </p>
            <p className="text-[11px]" style={{ color: "#6b7280" }}>
              Cliente activo
            </p>
          </div>
          <span style={{ color: "#6b7280" }}>
            <ChevronRightIcon />
          </span>
        </button>
      </div>

      {/* ── Nueva Publicación button ── */}
      <div className="px-4 pt-4 pb-2 shrink-0">
        <button
          onClick={() => navigate("/nueva-publicacion")}
          className="w-full flex items-center justify-center gap-2 rounded-[10px] font-bold text-white transition-colors duration-150"
          style={{ backgroundColor: "#0095b6", padding: "14px 20px", fontSize: "15px" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = "#007a97")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor = "#0095b6")
          }
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          Nueva Publicación
        </button>
      </div>

      {/* ── Main nav ── */}
      <nav className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-1">
        {navItems.map(({ label, href, Icon }) => (
          <NavItem
            key={href}
            label={label}
            href={href}
            Icon={Icon}
            active={pathname === href}
            onClick={() => navigate(href)}
          />
        ))}
      </nav>

      {/* ── Footer ── */}
      <div
        className="px-4 pt-4 pb-5 shrink-0 flex flex-col gap-3"
        style={{ borderTop: "1px solid #e8f4f7" }}
      >
        {/* Configuración */}
        <NavItem
          label="Configuración"
          href="/configuracion"
          Icon={GearIcon}
          active={pathname === "/configuracion"}
          onClick={() => navigate("/configuracion")}
        />

        {/* User mini card */}
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-[10px]"
          style={{ backgroundColor: "#f5f9fb" }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[13px] font-bold"
            style={{ backgroundColor: "#cceef5", color: "#0095b6" }}
          >
            {getInitials(profile.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold truncate" style={{ color: "#1a1a2e" }}>
              {profile.name}
            </p>
            <p className="text-[11px] truncate" style={{ color: "#6b7280" }}>
              {profile.email}
            </p>
          </div>
          <button
            onClick={() => router.push("/login")}
            title="Cerrar sesión"
            className="transition-colors duration-150"
            style={{ color: "#6b7280" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#e53e3e")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#6b7280")
            }
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </aside>
  )

  return (
    <>
      {/* Desktop: fixed sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen z-30">
        {sidebarContent}
      </div>

      {/* Mobile: overlay sidebar */}
      {isOpen && (
        <div
          className="fixed left-0 top-0 h-screen z-40 md:hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {sidebarContent}
        </div>
      )}
    </>
  )
}
