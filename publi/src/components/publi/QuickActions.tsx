import Link from "next/link"
import { Plus, CalendarDays, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const actions = [
  {
    label: "Nueva Publicación",
    href: "/nueva-publicacion",
    icon: Plus,
    description: "Crear contenido nuevo",
  },
  {
    label: "Ver Calendario",
    href: "/calendario",
    icon: CalendarDays,
    description: "Planificación mensual",
  },
  {
    label: "Mis Clientes",
    href: "/clientes",
    icon: Users,
    description: "Gestionar marcas",
  },
] as const

export function QuickActions() {
  return (
    <section className="rounded-xl border border-primary-light/60 bg-white p-6">
      <h2 className="text-base font-bold text-foreground">Acciones rápidas</h2>

      <div className="mt-4 space-y-2">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.href}
              href={action.href}
              className={cn(
                "flex items-center gap-3 rounded-lg border border-transparent px-3 py-3",
                "transition-all hover:border-primary-light hover:bg-primary-light/30"
              )}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {action.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
