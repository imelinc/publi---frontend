"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Camera, Lock, Wifi } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useAppStore } from "@/store/use-app-store"

// ─── Route titles ─────────────────────────────────────────────────────────────

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/nueva-publicacion": "Nueva Publicación",
  "/clientes": "Clientes",
  "/calendario": "Calendario",
  "/metricas": "Métricas",
  "/configuracion": "Configuración",
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function HamburgerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <path
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 0 0-5-5.917V4a1 1 0 1 0-2 0v1.083A6 6 0 0 0 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── TopBar ───────────────────────────────────────────────────────────────────

interface TopBarProps {
  onMenuToggle: () => void
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const profile = useAppStore((s) => s.profile)
  const accounts = useAppStore((s) => s.accounts)
  const updateProfile = useAppStore((s) => s.updateProfile)

  const title = pageTitles[pathname] ?? "Dashboard"

  // Avatar dropdown
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Profile modal
  const [modalOpen, setModalOpen] = React.useState(false)
  const [name, setName] = React.useState(profile.name)
  const [email, setEmail] = React.useState(profile.email)
  const [role, setRole] = React.useState(profile.role)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [dropdownOpen])

  function openProfileModal() {
    setName(profile.name)
    setEmail(profile.email)
    setRole(profile.role)
    setDropdownOpen(false)
    setModalOpen(true)
  }

  function handleProfileImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    updateProfile({ avatarUrl: URL.createObjectURL(file) })
    toast({ title: "Foto actualizada" })
  }

  function handleSaveProfile() {
    updateProfile({ name: name.trim(), email: email.trim(), role })
    setModalOpen(false)
    toast({ title: "Perfil actualizado correctamente" })
  }

  const initials = profile.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  return (
    <>
      <header
        className="flex items-center justify-between px-6"
        style={{
          height: "60px",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e8f4f7",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex items-center justify-center rounded-lg transition-colors duration-150"
            style={{ color: "#6b7280" }}
            onClick={onMenuToggle}
            aria-label="Abrir menú"
          >
            <HamburgerIcon />
          </button>

          <span
            className="font-semibold"
            style={{ fontSize: "18px", color: "#1a1a2e" }}
          >
            {title}
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Notification bell */}
          <button
            className="relative flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-150"
            style={{ color: "#6b7280" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#f5f9fb")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
            }
            aria-label="Notificaciones"
          >
            <BellIcon />
            <span
              className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: "#ef4444", fontSize: "9px" }}
            >
              3
            </span>
          </button>

          {/* Avatar + dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[13px] transition-all duration-150"
              style={{
                backgroundColor: "#cceef5",
                color: "#0095b6",
                outline: dropdownOpen ? "2px solid #0095b6" : "none",
                outlineOffset: "2px",
              }}
              aria-label="Menú de usuario"
            >
              {initials}
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 py-1 flex flex-col"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e8f4f7",
                  borderRadius: "8px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  minWidth: "160px",
                  zIndex: 50,
                  top: "100%",
                }}
              >
                <button
                  onClick={openProfileModal}
                  className="px-4 py-2.5 text-left text-[13px] font-medium transition-colors duration-150"
                  style={{ color: "#1a1a2e" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor = "#f5f9fb")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
                  }
                >
                  Mi perfil
                </button>
                <button
                  onClick={() => { setDropdownOpen(false); router.push("/login") }}
                  className="px-4 py-2.5 text-left text-[13px] font-medium transition-colors duration-150"
                  style={{ color: "#e53e3e" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor = "#fff5f5")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
                  }
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Profile modal ── */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[540px]">
          <DialogHeader>
            <DialogTitle>Mi perfil</DialogTitle>
            <DialogDescription>Administrá tu información personal</DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-24 w-24 border border-border">
                <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
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
                  onChange={(e) => setName(e.target.value)}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    <SelectItem value="Dueño de negocio">Dueño de negocio</SelectItem>
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
            <Button
              variant="outline"
              onClick={() => { setModalOpen(false); setName(profile.name); setEmail(profile.email); setRole(profile.role) }}
            >
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
