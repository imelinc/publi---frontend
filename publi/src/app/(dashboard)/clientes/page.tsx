"use client"

import {
  format,
  formatRelative,
  isToday,
  isTomorrow,
} from "date-fns"
import { es } from "date-fns/locale"
import {
  Clock,
  FileText,
  Info,
  Plus,
  Users,
  Wifi,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useAppStore, type Client } from "@/store/use-app-store"
import type { PostStatus } from "@/store/use-app-store"

type Platform = Client["platform"]

const platformOptions: Array<{
  value: Platform
  label: string
  icon: string
  badgeClassName: string
}> = [
  {
    value: "instagram",
    label: "Instagram",
    icon: "/icons/instagram.svg",
    badgeClassName: "bg-primary-light text-primary",
  },
  {
    value: "facebook",
    label: "Facebook",
    icon: "/icons/facebook.svg",
    badgeClassName: "bg-blue-100 text-blue-700",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: "/icons/linkedin.svg",
    badgeClassName: "bg-sky-100 text-sky-700",
  },
  {
    value: "tiktok",
    label: "TikTok",
    icon: "/icons/tiktok.svg",
    badgeClassName: "bg-zinc-200 text-zinc-700",
  },
  {
    value: "x",
    label: "X",
    icon: "/icons/twitter.svg",
    badgeClassName: "bg-zinc-200 text-zinc-700",
  },
]

const statusStyles: Record<
  PostStatus,
  { label: string; className: string }
> = {
  programada: {
    label: "Programada",
    className: "bg-primary text-white",
  },
  publicada: {
    label: "Publicada",
    className: "bg-green-600 text-white",
  },
  fallida: {
    label: "Fallida",
    className: "bg-destructive text-destructive-foreground",
  },
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function truncateText(value: string, maxLength: number) {
  const glyphs = Array.from(value)
  return glyphs.length > maxLength
    ? `${glyphs.slice(0, maxLength).join("")}...`
    : value
}

function formatNextPost(date: Date | null) {
  if (!date) {
    return "Sin programar"
  }

  if (isToday(date)) {
    return `Hoy a las ${format(date, "HH:mm", { locale: es })}`
  }

  if (isTomorrow(date)) {
    return `Mañana a las ${format(date, "HH:mm", { locale: es })}`
  }

  const relative = formatRelative(date, new Date(), { locale: es })
  return capitalize(relative)
}

export default function ClientesPage() {
  const router = useRouter()
  const pathname = usePathname()
  const clients = useAppStore((state) => state.clients)
  const posts = useAppStore((state) => state.posts)
  const addClient = useAppStore((state) => state.addClient)
  const deleteClient = useAppStore((state) => state.deleteClient)

  const [isAddModalOpen, setIsAddModalOpen] = React.useState<boolean>(false)
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(null)
  const [clientName, setClientName] = React.useState<string>("")
  const [clientUsername, setClientUsername] = React.useState<string>("")
  const [clientPlatform, setClientPlatform] = React.useState<Platform>("instagram")

  const selectedClientPosts = React.useMemo(() => {
    if (!selectedClient) {
      return []
    }
    return posts.filter((post) => post.account === selectedClient.username)
  }, [posts, selectedClient])

  const handleCreatePost = React.useCallback(() => {
    router.push(`/nueva-publicacion?from=${encodeURIComponent(pathname)}`)
  }, [pathname, router])

  const resetAddClientForm = React.useCallback(() => {
    setClientName("")
    setClientUsername("")
    setClientPlatform("instagram")
  }, [])

  const handleCloseAddModal = React.useCallback(() => {
    setIsAddModalOpen(false)
    resetAddClientForm()
  }, [resetAddClientForm])

  const handleAddClient = React.useCallback(() => {
    const nextName = clientName.trim()
    const nextUsername = clientUsername.trim()

    if (!nextName || !nextUsername) {
      return
    }

    addClient({
      id: crypto.randomUUID(),
      name: nextName,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        nextName
      )}`,
      platform: clientPlatform,
      username: nextUsername,
      postsCount: 0,
      nextPost: null,
    })

    handleCloseAddModal()
  }, [addClient, clientName, clientPlatform, clientUsername, handleCloseAddModal])

  const handleOpenClientDetail = React.useCallback((client: Client) => {
    setSelectedClient(client)
  }, [])

  const handleCloseClientDetail = React.useCallback(() => {
    setSelectedClient(null)
  }, [])

  const handleDeleteClient = React.useCallback(() => {
    if (!selectedClient) {
      return
    }

    deleteClient(selectedClient.id)
    setSelectedClient(null)
  }, [deleteClient, selectedClient])

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Clientes</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Gestioná las cuentas de tus clientes
          </p>
        </div>
        <Button size="lg" className="w-full sm:w-auto" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-1 h-4 w-4" />
          Agregar cliente
        </Button>
      </section>

      {clients.length === 0 ? (
        <section className="flex min-h-[360px] items-center justify-center rounded-3xl border border-border bg-card p-8 text-center">
          <div className="max-w-md">
            <Users className="mx-auto h-16 w-16 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold text-foreground">
              No tenés clientes agregados
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Agregá tu primer cliente para empezar a gestionar su contenido
            </p>
            <Button className="mt-6" onClick={() => setIsAddModalOpen(true)}>
              Agregar cliente
            </Button>
          </div>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {clients.map((client) => {
            const platformData = platformOptions.find(
              (option) => option.value === client.platform
            )

            return (
              <article
                key={client.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="h-14 w-14 border border-border">
                      <AvatarImage src={client.avatarUrl} alt={client.name} />
                      <AvatarFallback>{client.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {platformData ? (
                      <div className="absolute -bottom-1 -right-1 rounded-full border border-card bg-card p-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={platformData.icon}
                          alt={platformData.label}
                          className="h-4 w-4"
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-semibold text-foreground">
                      {client.name}
                    </h3>
                    <p className="truncate text-sm text-muted-foreground">{client.username}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-foreground">
                    <FileText className="h-4 w-4 text-primary" />
                    {client.postsCount} publicaciones
                  </p>
                  <p className="flex items-center gap-2 text-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    {formatNextPost(client.nextPost)}
                  </p>
                  <p className="flex items-center gap-2 text-green-600">
                    <Wifi className="h-4 w-4" />
                    Conectado
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleOpenClientDetail(client)}
                  >
                    Ver detalle
                  </Button>
                  <Button className="w-full" onClick={handleCreatePost}>
                    Nueva pub.
                  </Button>
                </div>
              </article>
            )
          })}
        </section>
      )}

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Agregar cliente</DialogTitle>
            <DialogDescription>
              Conectá una nueva cuenta para gestionar su contenido
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="client-name">Nombre</Label>
              <Input
                id="client-name"
                value={clientName}
                placeholder="Ej: Café El Molino"
                onChange={(event) => setClientName(event.target.value)}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client-username">Usuario</Label>
              <Input
                id="client-username"
                value={clientUsername}
                placeholder="Ej: @cafeelmolino"
                onChange={(event) => setClientUsername(event.target.value)}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label>Red social</Label>
              <Select
                value={clientPlatform}
                onValueChange={(value) => setClientPlatform(value as Platform)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Seleccioná la red social" />
                </SelectTrigger>
                <SelectContent>
                  {platformOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <span className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={option.icon} alt={option.label} className="h-4 w-4" />
                        {option.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-start gap-2 rounded-xl bg-muted p-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                La conexión real con la red social estará disponible próximamente. Por ahora el
                cliente se agrega como placeholder.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={handleCloseAddModal}>
              Cancelar
            </Button>
            <Button
              onClick={handleAddClient}
              disabled={!clientName.trim() || !clientUsername.trim()}
            >
              Agregar cliente
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(selectedClient)} onOpenChange={(open) => !open && handleCloseClientDetail()}>
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-4xl xl:max-w-5xl max-h-[85vh] overflow-y-auto p-6 sm:p-8">
          {selectedClient ? (
            <>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:pr-10">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar className="h-14 w-14 border border-border">
                    <AvatarImage src={selectedClient.avatarUrl} alt={selectedClient.name} />
                    <AvatarFallback>
                      {selectedClient.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold text-foreground">
                      {selectedClient.name}
                    </h3>
                    <p className="truncate text-sm text-muted-foreground">
                      {selectedClient.username}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    className={cn(
                      "border border-transparent",
                      platformOptions.find((option) => option.value === selectedClient.platform)
                        ?.badgeClassName
                    )}
                  >
                    {platformOptions.find((option) => option.value === selectedClient.platform)?.label}
                  </Badge>
                  <Button
                    variant="outline"
                    className="border-destructive/30 text-destructive hover:bg-destructive/10 sm:ml-auto"
                    onClick={handleDeleteClient}
                  >
                    Eliminar cliente
                  </Button>
                </div>
              </div>

              <Separator />

              <section className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground">
                  Publicaciones programadas
                </h4>

                {selectedClientPosts.length > 0 ? (
                  <div className="space-y-2">
                    {selectedClientPosts.map((post) => (
                      <article
                        key={post.id}
                        className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3 sm:p-4"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.imageUrl}
                          alt="Imagen de publicación"
                          className="h-12 w-12 rounded-lg object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm text-foreground">
                            {truncateText(post.caption, 60)}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {capitalize(
                              format(post.scheduledAt, "EEEE d 'de' MMMM 'a las' HH:mm", {
                                locale: es,
                              })
                            )}
                          </p>
                        </div>

                        <Badge className={statusStyles[post.status].className}>
                          {statusStyles[post.status].label}
                        </Badge>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-border bg-surface p-4">
                    <p className="text-sm text-muted-foreground">
                      Este cliente no tiene publicaciones programadas
                    </p>
                    <Button className="mt-3" onClick={handleCreatePost}>
                      Crear publicación
                    </Button>
                  </div>
                )}
              </section>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
