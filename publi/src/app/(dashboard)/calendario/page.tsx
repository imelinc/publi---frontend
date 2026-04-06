"use client"

import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getHours,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
} from "date-fns"
import { es } from "date-fns/locale"
import {
  CalendarX,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Plus,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useAppStore, type Post, type PostStatus } from "@/store/use-app-store"

type ViewMode = "mensual" | "semanal"

const WEEK_DAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"] as const
const WEEK_HOURS = Array.from({ length: 15 }, (_, index) => index + 8)

const statusConfig: Record<
  PostStatus,
  {
    label: string
    chipClassName: string
    cardClassName: string
    badgeVariant: "default" | "success" | "destructive"
  }
> = {
  programada: {
    label: "Programada",
    chipClassName: "bg-primary text-white",
    cardClassName: "bg-primary/15 text-foreground border-primary/40",
    badgeVariant: "default",
  },
  publicada: {
    label: "Publicada",
    chipClassName: "bg-green-600 text-white",
    cardClassName: "bg-green-600/15 text-foreground border-green-600/40",
    badgeVariant: "success",
  },
  fallida: {
    label: "Fallida",
    chipClassName: "bg-destructive text-destructive-foreground",
    cardClassName: "bg-destructive/15 text-foreground border-destructive/40",
    badgeVariant: "destructive",
  },
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function formatMonthTitle(date: Date) {
  return capitalize(format(date, "MMMM yyyy", { locale: es }))
}

function formatWeekTitle(date: Date) {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 })
  const monthAndYear = capitalize(format(weekStart, "MMMM yyyy", { locale: es }))
  return `${format(weekStart, "d")} - ${format(weekEnd, "d")} de ${monthAndYear}`
}

function truncateText(value: string, limit: number) {
  const glyphs = Array.from(value)
  return glyphs.length > limit ? `${glyphs.slice(0, limit).join("")}...` : value
}

function EmptyState({ onCreatePost }: { onCreatePost: () => void }) {
  return (
    <div className="flex min-h-[380px] items-center justify-center rounded-3xl border border-border bg-card p-8">
      <div className="max-w-md text-center">
        <CalendarX className="mx-auto h-16 w-16 text-muted-foreground" />
        <h3 className="mt-5 text-xl font-semibold text-foreground">
          No hay publicaciones para este periodo
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Crea una nueva publicacion para verla aca
        </p>
        <Button className="mt-6" size="lg" onClick={onCreatePost}>
          Nueva publicacion
        </Button>
      </div>
    </div>
  )
}

export default function CalendarioPage() {
  const router = useRouter()
  const pathname = usePathname()
  const posts = useAppStore((state) => state.posts)
  const accounts = useAppStore((state) => state.accounts)
  const deletePost = useAppStore((state) => state.deletePost)

  const today = React.useMemo(() => new Date(), [])
  const [activeDate, setActiveDate] = React.useState<Date>(today)
  const [accountFilter, setAccountFilter] = React.useState<string>("all")
  const [viewMode, setViewMode] = React.useState<ViewMode>("mensual")
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

  const goToNewPost = React.useCallback(() => {
    router.push(`/nueva-publicacion?from=${encodeURIComponent(pathname)}`)
  }, [pathname, router])

  const monthStart = startOfMonth(activeDate)
  const monthEnd = endOfMonth(activeDate)
  const monthGridStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const monthGridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })
  const monthDays = eachDayOfInterval({ start: monthGridStart, end: monthGridEnd })

  const weekStart = startOfWeek(activeDate, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(activeDate, { weekStartsOn: 1 })
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const filteredPosts = React.useMemo(() => {
    if (accountFilter === "all") {
      return posts
    }
    return posts.filter((post) => post.account === accountFilter)
  }, [accountFilter, posts])

  const monthPosts = React.useMemo(() => {
    return filteredPosts.filter(
      (post) =>
        post.scheduledAt >= monthStart &&
        post.scheduledAt <= monthEnd
    )
  }, [filteredPosts, monthEnd, monthStart])

  const weekPosts = React.useMemo(() => {
    return filteredPosts.filter(
      (post) =>
        post.scheduledAt >= weekStart &&
        post.scheduledAt <= weekEnd
    )
  }, [filteredPosts, weekEnd, weekStart])

  const openPostModal = React.useCallback((post: Post) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }, [])

  const handleDeletePost = React.useCallback(() => {
    if (!selectedPost) {
      return
    }
    deletePost(selectedPost.id)
    setIsModalOpen(false)
    setSelectedPost(null)
  }, [deletePost, selectedPost])

  const handleMonthNavigation = React.useCallback(
    (direction: "prev" | "next") => {
      setActiveDate((value) =>
        direction === "prev" ? subMonths(value, 1) : addMonths(value, 1)
      )
    },
    []
  )

  const handleWeekNavigation = React.useCallback(
    (direction: "prev" | "next") => {
      setActiveDate((value) =>
        direction === "prev" ? subWeeks(value, 1) : addWeeks(value, 1)
      )
    },
    []
  )

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Calendario</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Visualiza y gestiona tus publicaciones programadas
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select value={accountFilter} onValueChange={setAccountFilter}>
            <SelectTrigger className="h-10 w-full rounded-xl bg-card px-3 sm:w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las cuentas</SelectItem>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.username}>
                  {account.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="hidden rounded-xl border border-border bg-card p-1 md:flex">
            <button
              type="button"
              onClick={() => setViewMode("mensual")}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                viewMode === "mensual"
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Mensual
            </button>
            <button
              type="button"
              onClick={() => setViewMode("semanal")}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                viewMode === "semanal"
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Semanal
            </button>
          </div>

          <Button className="h-10 rounded-xl px-4" onClick={goToNewPost}>
            <Plus className="mr-1 h-4 w-4" />
            Nueva publicacion
          </Button>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() =>
              viewMode === "mensual"
                ? handleMonthNavigation("prev")
                : handleWeekNavigation("prev")
            }
          >
            <ChevronLeft />
          </Button>

          <p className="text-lg font-semibold text-foreground">
            {viewMode === "mensual"
              ? formatMonthTitle(activeDate)
              : formatWeekTitle(activeDate)}
          </p>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveDate(today)}
            >
              Hoy
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={() =>
                viewMode === "mensual"
                  ? handleMonthNavigation("next")
                  : handleWeekNavigation("next")
              }
            >
              <ChevronRight />
            </Button>
          </div>
        </div>

        <>
          <div className={cn("space-y-3", viewMode === "semanal" && "md:hidden")}>
            {monthPosts.length === 0 ? (
              <EmptyState onCreatePost={goToNewPost} />
            ) : (
              <>
              <div className="grid grid-cols-7 gap-2">
                {WEEK_DAYS.map((day) => (
                  <div
                    key={`month-header-${day}`}
                    className="rounded-xl bg-surface py-2 text-center text-xs font-semibold text-muted-foreground"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {monthDays.map((day) => {
                  const dayPosts = filteredPosts
                    .filter((post) => isSameDay(post.scheduledAt, day))
                    .sort(
                      (a, b) =>
                        a.scheduledAt.getTime() - b.scheduledAt.getTime()
                    )
                  const visiblePosts = dayPosts.slice(0, 2)
                  const remainingCount = dayPosts.length - visiblePosts.length

                  return (
                    <div
                      key={day.toISOString()}
                      className={cn(
                        "min-h-28 rounded-xl border border-border p-2",
                        isToday(day) && "bg-primary-light/70",
                        !isSameMonth(day, monthStart) && "bg-surface text-muted-foreground/70"
                      )}
                    >
                      <p
                        className={cn(
                          "text-right text-xs text-muted-foreground",
                          isToday(day) && "font-semibold text-primary"
                        )}
                      >
                        {format(day, "d")}
                      </p>

                      <div className="mt-2 space-y-1">
                        {visiblePosts.map((post) => (
                          <button
                            key={post.id}
                            type="button"
                            onClick={() => openPostModal(post)}
                            className={cn(
                              "block w-full rounded-md px-2 py-1 text-left text-[11px] font-medium text-white",
                              statusConfig[post.status].chipClassName
                            )}
                          >
                            {truncateText(post.caption, 20)}
                          </button>
                        ))}
                        {remainingCount > 0 ? (
                          <button
                            type="button"
                            onClick={() => openPostModal(dayPosts[0])}
                            className="block w-full rounded-md bg-muted px-2 py-1 text-left text-[11px] font-medium text-muted-foreground"
                          >
                            +{remainingCount} mas
                          </button>
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </div>
              </>
            )}
          </div>

          <div
            className={cn(
              "hidden md:block",
              viewMode === "semanal" && "md:block",
              viewMode === "mensual" && "md:hidden"
            )}
          >
            {weekPosts.length === 0 ? (
              <EmptyState onCreatePost={goToNewPost} />
            ) : (
              <>
              <div className="grid grid-cols-[72px_repeat(7,minmax(0,1fr))]">
                <div />
                {weekDays.map((day) => (
                  <div
                    key={`week-header-${day.toISOString()}`}
                    className="border-b border-l border-border bg-surface px-2 py-3 text-center"
                  >
                    <p className="text-xs font-semibold text-muted-foreground">
                      {capitalize(format(day, "EEE", { locale: es }))}
                    </p>
                    <p className={cn("text-sm text-foreground", isToday(day) && "font-semibold text-primary")}>
                      {format(day, "d")}
                    </p>
                  </div>
                ))}

                {WEEK_HOURS.map((hour) => (
                  <React.Fragment key={`hour-${hour}`}>
                    <div className="border-b border-border px-2 py-3 text-right text-xs text-muted-foreground">
                      {`${hour}:00`}
                    </div>
                    {weekDays.map((day) => {
                      const postsAtSlot = filteredPosts.filter(
                        (post) =>
                          isSameDay(post.scheduledAt, day) &&
                          getHours(post.scheduledAt) === hour
                      )

                      return (
                        <div
                          key={`${day.toISOString()}-${hour}`}
                          className="min-h-[66px] border-b border-l border-border p-1.5"
                        >
                          <div className="space-y-1.5">
                            {postsAtSlot.map((post) => (
                              <button
                                key={post.id}
                                type="button"
                                onClick={() => openPostModal(post)}
                                className={cn(
                                  "w-full rounded-lg border p-2 text-left",
                                  statusConfig[post.status].cardClassName
                                )}
                              >
                                <div className="mb-1 flex items-center gap-2">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(post.account)}&backgroundColor=0095b6&textColor=ffffff`}
                                    alt={post.account}
                                    className="h-5 w-5 rounded-full"
                                  />
                                  <p className="truncate text-[11px] font-semibold">
                                    {post.account}
                                  </p>
                                </div>
                                <p className="truncate text-[11px]">
                                  {truncateText(post.caption, 30)}
                                </p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </React.Fragment>
                ))}
              </div>
              </>
            )}
          </div>
        </>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg rounded-2xl p-0" showCloseButton>
          {selectedPost ? (
            <div className="space-y-4 p-5">
              <DialogHeader>
                <div className="flex items-center justify-between gap-3">
                  <DialogTitle>{selectedPost.account}</DialogTitle>
                  <Badge variant={statusConfig[selectedPost.status].badgeVariant}>
                    {statusConfig[selectedPost.status].label}
                  </Badge>
                </div>
                <DialogDescription>
                  Detalle de publicacion programada
                </DialogDescription>
              </DialogHeader>

              <div className="overflow-hidden rounded-xl border border-border bg-surface">
                {selectedPost.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedPost.imageUrl}
                    alt="Imagen de publicacion"
                    className="aspect-square w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-10 w-10" />
                  </div>
                )}
              </div>

              <p className="rounded-xl bg-surface p-3 text-sm text-foreground">
                {selectedPost.caption}
              </p>

              <p className="text-sm text-muted-foreground">
                Programado para el{" "}
                <span className="font-medium text-foreground">
                  {format(
                    selectedPost.scheduledAt,
                    "EEEE d 'de' MMMM 'de' yyyy 'a las' HH:mm",
                    { locale: es }
                  )}
                </span>
              </p>

              <Separator />

              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => router.push("/nueva-publicacion")}
                >
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={handleDeletePost}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
