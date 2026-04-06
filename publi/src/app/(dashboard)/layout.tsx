"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  PlusSquare,
  Users,
  CalendarDays,
  BarChart2,
  Settings,
  Bell,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// ─── Navigation config ────────────────────────────────────────────────────────

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

const mainNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Nueva Publicación", href: "/nueva-publicacion", icon: PlusSquare },
  { label: "Clientes", href: "/clientes", icon: Users },
  { label: "Calendario", href: "/calendario", icon: CalendarDays },
  { label: "Métricas", href: "/metricas", icon: BarChart2 },
]

const bottomNav: NavItem[] = [
  { label: "Configuración", href: "/configuracion", icon: Settings },
]

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/nueva-publicacion": "Nueva Publicación",
  "/clientes": "Clientes",
  "/calendario": "Calendario",
  "/metricas": "Métricas",
  "/configuracion": "Configuración",
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function SidebarItem({ item, active }: { item: NavItem; active: boolean }) {
  const router = useRouter()
  const Icon = item.icon

  return (
    <button
      onClick={() => router.push(item.href)}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left",
        active
          ? "bg-primary-light text-primary font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {item.label}
    </button>
  )
}

function Sidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-60 bg-card border-r border-border flex-col z-30">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-border shrink-0">
        <span className="text-xl font-bold text-primary tracking-tight">publi</span>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {mainNav.map((item) => (
          <SidebarItem key={item.href} item={item} active={pathname === item.href} />
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="px-3 py-4 border-t border-border space-y-1 shrink-0">
        {bottomNav.map((item) => (
          <SidebarItem key={item.href} item={item} active={pathname === item.href} />
        ))}
      </div>
    </aside>
  )
}

// ─── Header ──────────────────────────────────────────────────────────────────

function Header({ pathname }: { pathname: string }) {
  const router = useRouter()
  const title = pageTitles[pathname] ?? "Dashboard"

  return (
    <header className="fixed top-0 left-0 md:left-60 right-0 h-16 bg-card border-b border-border flex items-center justify-between px-6 z-20">
      <span className="text-base font-semibold text-foreground">{title}</span>

      <div className="flex items-center gap-3">
        {/* Notificaciones */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        {/* Avatar con dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full overflow-hidden w-8 h-8 ring-2 ring-border hover:ring-primary transition-all">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.dicebear.com/7.x/initials/svg?seed=Ignacio&backgroundColor=0095b6&textColor=ffffff"
                alt="Avatar"
                width={32}
                height={32}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>Mi perfil</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/login")}>
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

// ─── Layout ──────────────────────────────────────────────────────────────────

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar pathname={pathname} />
      <Header pathname={pathname} />

      <main className="md:ml-60 pt-16">
        <div className="p-8 bg-surface min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </main>
    </div>
  )
}
