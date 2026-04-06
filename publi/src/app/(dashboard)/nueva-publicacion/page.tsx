"use client"

import {
  format,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from "date-fns"
import { es } from "date-fns/locale"
import {
  Bookmark,
  CheckCircle2,
  Heart,
  ImageIcon,
  MessageCircle,
  MoreHorizontal,
  Send,
  Upload,
} from "lucide-react"
import { useRouter } from "next/navigation"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/store/use-app-store"

const CAPTION_LIMIT = 2200
const MINUTE_OPTIONS = ["00", "15", "30", "45"] as const
const HOUR_OPTIONS = Array.from({ length: 24 }, (_, index) =>
  index.toString().padStart(2, "0")
)
const PLACEHOLDER_IMAGE_URL = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="hsl(210 20% 96%)" />
    <path d="M170 380l85-95 70 70 55-65 90 90H170z" fill="hsl(220 10% 75%)" />
    <circle cx="240" cy="220" r="38" fill="hsl(220 10% 75%)" />
  </svg>`
)}`

function getInstagramAvatar(username: string) {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    username
  )}&backgroundColor=0095b6&textColor=ffffff`
}

function buildScheduledDate(date: Date, hour: string, minutes: string) {
  return setMilliseconds(
    setSeconds(setMinutes(setHours(date, Number(hour)), Number(minutes)), 0),
    0
  )
}

export default function NuevaPublicacionPage() {
  const router = useRouter()
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const accounts = useAppStore((state) => state.accounts)
  const addPost = useAppStore((state) => state.addPost)

  const initialDate = React.useMemo(() => new Date(), [])
  const [selectedAccount, setSelectedAccount] = React.useState<string>(
    accounts[0]?.username ?? ""
  )
  const [selectedDate, setSelectedDate] = React.useState<Date>(initialDate)
  const [selectedHour, setSelectedHour] = React.useState<string>(
    format(initialDate, "HH")
  )
  const [selectedMinutes, setSelectedMinutes] = React.useState<string>(
    MINUTE_OPTIONS.includes(format(initialDate, "mm") as (typeof MINUTE_OPTIONS)[number])
      ? format(initialDate, "mm")
      : "00"
  )
  const [caption, setCaption] = React.useState<string>("")
  const [imageFileName, setImageFileName] = React.useState<string>("")
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>(null)
  const [successDate, setSuccessDate] = React.useState<Date | null>(null)

  const selectedAccountData =
    accounts.find((account) => account.username === selectedAccount) ?? accounts[0]

  const scheduledAt = buildScheduledDate(
    selectedDate,
    selectedHour,
    selectedMinutes
  )
  const trimmedCaption = caption.trim()
  const isCaptionTooLong = caption.length > CAPTION_LIMIT

  React.useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl)
      }
    }
  }, [imagePreviewUrl])

  const updateImagePreview = React.useCallback((file: File | null) => {
    if (!file) {
      setImageFileName("")
      setImagePreviewUrl((currentUrl) => {
        if (currentUrl) {
          URL.revokeObjectURL(currentUrl)
        }

        return null
      })
      return
    }

    const nextUrl = URL.createObjectURL(file)
    setImageFileName(file.name)
    setImagePreviewUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl)
      }

      return nextUrl
    })
  }, [])

  const resetForm = React.useCallback(() => {
    updateImagePreview(null)
    setCaption("")
    setSelectedAccount(accounts[0]?.username ?? "")
    setSelectedDate(initialDate)
    setSelectedHour(format(initialDate, "HH"))
    setSelectedMinutes(
      MINUTE_OPTIONS.includes(
        format(initialDate, "mm") as (typeof MINUTE_OPTIONS)[number]
      )
        ? format(initialDate, "mm")
        : "00"
    )
    setSuccessDate(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [accounts, initialDate, updateImagePreview])

  const handleFileSelection = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null
      updateImagePreview(file)
    },
    [updateImagePreview]
  )

  const handleDrop = React.useCallback(
    (event: React.DragEvent<HTMLButtonElement>) => {
      event.preventDefault()
      const file = event.dataTransfer.files?.[0] ?? null
      updateImagePreview(file)
    },
    [updateImagePreview]
  )

  const handleSubmit = React.useCallback(() => {
    if (!selectedAccountData || isCaptionTooLong) {
      return
    }

    addPost({
      id: crypto.randomUUID(),
      caption,
      imageUrl: imagePreviewUrl ?? PLACEHOLDER_IMAGE_URL,
      scheduledAt,
      status: "programada",
      account: selectedAccountData.username,
    })

    setSuccessDate(scheduledAt)
  }, [
    addPost,
    caption,
    imagePreviewUrl,
    isCaptionTooLong,
    scheduledAt,
    selectedAccountData,
  ])

  if (successDate) {
    return (
      <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <div className="w-full max-w-2xl rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
          <CheckCircle2 className="mx-auto mb-5 h-16 w-16 text-primary" />
          <h1 className="text-3xl font-semibold text-foreground">
            ¡Publicación programada!
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Tu contenido fue agendado para el{" "}
            {format(successDate, "EEEE d 'de' MMMM 'a las' HH:mm", {
              locale: es,
            })}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" onClick={() => router.push("/calendario")}>
              Ver calendario
            </Button>
            <Button size="lg" variant="outline" onClick={resetForm}>
              Nueva publicación
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">
          Nueva publicación
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Completá los datos y programá tu contenido
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-5">
        <section className="xl:col-span-3">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="account">Cuenta</Label>
                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger id="account" className="h-11 w-full rounded-xl px-3">
                    <SelectValue placeholder="Seleccioná una cuenta" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.username}>
                        {account.username}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="image-upload">Imagen</Label>
                <input
                  ref={fileInputRef}
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelection}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={handleDrop}
                  className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-surface px-6 py-10 text-center transition-colors hover:border-primary hover:bg-primary-light/40"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
                    <Upload className="h-6 w-6" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      Arrastrá una imagen o hacé click para seleccionar
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG o WEBP para tu preview de Instagram
                    </p>
                  </div>
                </button>

                {imageFileName ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreviewUrl ?? PLACEHOLDER_IMAGE_URL}
                      alt={imageFileName}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {imageFileName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Imagen lista para la publicación
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="space-y-3">
                <Label htmlFor="caption">Caption</Label>
                <div className="space-y-2">
                  <Textarea
                    id="caption"
                    placeholder="Escribí el caption de tu publicación..."
                    value={caption}
                    onChange={(event) => setCaption(event.target.value)}
                    className="min-h-40 resize-none rounded-2xl"
                  />
                  <p
                    className={cn(
                      "text-right text-xs text-muted-foreground",
                      isCaptionTooLong && "text-destructive"
                    )}
                  >
                    {caption.length}/{CAPTION_LIMIT}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Fecha y hora de publicación</Label>
                <Calendar selected={selectedDate} onSelect={setSelectedDate} />

                <div className="grid gap-3 sm:grid-cols-2">
                  <Select value={selectedHour} onValueChange={setSelectedHour}>
                    <SelectTrigger className="h-11 w-full rounded-xl px-3">
                      <SelectValue placeholder="Hora" />
                    </SelectTrigger>
                    <SelectContent>
                      {HOUR_OPTIONS.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedMinutes}
                    onValueChange={setSelectedMinutes}
                  >
                    <SelectTrigger className="h-11 w-full rounded-xl px-3">
                      <SelectValue placeholder="Minutos" />
                    </SelectTrigger>
                    <SelectContent>
                      {MINUTE_OPTIONS.map((minutes) => (
                        <SelectItem key={minutes} value={minutes}>
                          {minutes}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <p className="rounded-2xl bg-primary-light/50 px-4 py-3 text-sm text-foreground">
                  Programado para el{" "}
                  <span className="font-medium">
                    {format(scheduledAt, "EEEE d 'de' MMMM 'a las' HH:mm", {
                      locale: es,
                    })}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="sm:min-w-36"
                  onClick={() => router.push("/dashboard")}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  size="lg"
                  className="sm:min-w-52"
                  onClick={handleSubmit}
                  disabled={!selectedAccountData || isCaptionTooLong}
                >
                  Programar publicación
                </Button>
              </div>
            </div>
          </div>
        </section>

        <aside className="xl:col-span-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                Vista previa
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Así se verá tu publicación
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-80 overflow-hidden rounded-[28px] border border-border bg-background shadow-lg">
                <div className="flex items-center gap-3 px-4 py-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getInstagramAvatar(selectedAccountData?.username ?? "publi")}
                    alt={selectedAccountData?.username ?? "Cuenta"}
                    className="h-10 w-10 rounded-full border border-border"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {selectedAccountData?.username ?? "Seleccioná una cuenta"}
                    </p>
                    <p className="text-xs text-muted-foreground">Instagram</p>
                  </div>
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="aspect-square bg-muted">
                  {imagePreviewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imagePreviewUrl}
                      alt="Preview de publicación"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-background/70">
                        <ImageIcon className="h-7 w-7" />
                      </span>
                      <p className="text-sm">Tu imagen aparecerá acá</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3 px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-foreground">
                      <Heart className="h-5 w-5" />
                      <MessageCircle className="h-5 w-5" />
                      <Send className="h-5 w-5" />
                    </div>
                    <Bookmark className="h-5 w-5 text-foreground" />
                  </div>

                  <p className="text-sm font-medium text-foreground">
                    1,234 Me gusta
                  </p>

                  <div className="flex items-start gap-2 text-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getInstagramAvatar(selectedAccountData?.username ?? "publi")}
                      alt={selectedAccountData?.username ?? "Cuenta"}
                      className="mt-0.5 h-6 w-6 rounded-full border border-border"
                    />
                    <p className="text-sm leading-6 text-foreground">
                      <span className="mr-1 font-semibold">
                        {selectedAccountData?.username ?? "cuenta"}
                      </span>
                      {trimmedCaption ? (
                        trimmedCaption
                      ) : (
                        <span className="text-muted-foreground">
                          Tu caption aparecerá acá
                        </span>
                      )}
                    </p>
                  </div>

                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Hace un momento
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
