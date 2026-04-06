"use client"

import { format } from "date-fns"
import { es } from "date-fns/locale"
import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  PlusSquare,
  Users,
  CalendarDays,
  BarChart2,
  Settings,
  Bell,
  Camera,
  Lock,
  Wifi,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useAppStore } from "@/store/use-app-store"
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
  const { toast } = useToast()
  const profile = useAppStore((state) => state.profile)
  const accounts = useAppStore((state) => state.accounts)
  const updateProfile = useAppStore((state) => state.updateProfile)

  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState<boolean>(false)
  const [name, setName] = React.useState<string>(profile.name)
  const [email, setEmail] = React.useState<string>(profile.email)
  const [role, setRole] = React.useState<string>(profile.role)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const resetProfileForm = React.useCallback(() => {
    setName(profile.name)
    setEmail(profile.email)
    setRole(profile.role)
  }, [profile.email, profile.name, profile.role])

  const handleOpenProfileModal = React.useCallback(() => {
    resetProfileForm()
    setIsProfileModalOpen(true)
  }, [resetProfileForm])

  const handleCancelProfileModal = React.useCallback(() => {
    setIsProfileModalOpen(false)
    resetProfileForm()
  }, [resetProfileForm])

  const handleProfileImageChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) {
        return
      }

      const imageUrl = URL.createObjectURL(file)
      updateProfile({ avatarUrl: imageUrl })
      toast({ title: "Foto actualizada" })
    },
    [toast, updateProfile]
  )

  const handleSaveProfile = React.useCallback(() => {
    updateProfile({
      name: name.trim(),
      email: email.trim(),
      role,
    })
    setIsProfileModalOpen(false)
    toast({ title: "Perfil actualizado correctamente" })
  }, [email, name, role, toast, updateProfile])

  return (
    <>
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
                  src={profile.avatarUrl}
                  alt="Avatar"
                  width={32}
                  height={32}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onSelect={handleOpenProfileModal}>
                Mi perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/login")}>
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent className="sm:max-w-[540px]">
          <DialogHeader>
            <DialogTitle>Mi perfil</DialogTitle>
            <DialogDescription>
              Administrá tu información personal
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-24 w-24 border border-border">
                <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                <AvatarFallback>{profile.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="mr-1 h-4 w-4" />
                Cambiar foto
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Nombre completo</Label>
                <Input
                  id="profile-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label>Rol</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Community Manager Freelance">
                      Community Manager Freelance
                    </SelectItem>
                    <SelectItem value="Community Manager en Agencia">
                      Community Manager en Agencia
                    </SelectItem>
                    <SelectItem value="Dueño de negocio">
                      Dueño de negocio
                    </SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="joined-at">Miembro desde</Label>
                <div className="relative">
                  <Input
                    id="joined-at"
                    disabled
                    value={format(profile.joinedAt, "d 'de' MMMM 'de' yyyy", { locale: es })}
                    className="h-10 pr-10"
                  />
                  <Lock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-muted-foreground" />
                  Cuentas conectadas
                </Label>
                <div className="flex flex-wrap gap-2">
                  {accounts.map((account) => (
                    <Badge key={account.id} className="bg-primary-light text-primary">
                      <span className="mr-1 inline-flex h-4 w-4 overflow-hidden rounded-full border border-primary/20">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={account.avatarUrl}
                          alt={account.username}
                          className="h-full w-full object-cover"
                        />
                      </span>
                      {account.username}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button variant="outline" onClick={handleCancelProfileModal}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveProfile}
              disabled={!name.trim() || !email.trim() || !role.trim()}
            >
              Guardar cambios
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
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
