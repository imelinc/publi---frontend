"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import {
  Calendar,
  Users,
  BarChart3,
  CalendarDays,
  FileText,
  Palette,
  Check,
  X,
  Minus,
  Menu,
} from "lucide-react"

const socialNetworks = [
  { label: "Instagram", icon: "/icons/instagram.svg" },
  { label: "Facebook", icon: "/icons/facebook.svg" },
  { label: "LinkedIn", icon: "/icons/linkedin.svg" },
  { label: "TikTok", icon: "/icons/tiktok.svg" },
  { label: "X", icon: "/icons/twitter.svg" },
]
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

type CellValue = boolean | "partial"

interface FeatureCard {
  icon: LucideIcon
  title: string
  description: string
}

interface ComparisonRow {
  feature: string
  publi: boolean
  traditional: CellValue
}

interface PricingPlan {
  name: string
  price: string
  sub: string
  features: string[]
  highlighted: boolean
}

// ─── Data ────────────────────────────────────────────────────────────────────

const featureCards: FeatureCard[] = [
  {
    icon: Calendar,
    title: "Programación de publicaciones",
    description:
      "Scheduléa contenido para todas tus redes desde un calendario unificado.",
  },
  {
    icon: Users,
    title: "Gestión multi-cliente",
    description:
      "Cambiá de cliente en segundos sin perder el contexto ni cometer errores.",
  },
  {
    icon: BarChart3,
    title: "Métricas unificadas",
    description:
      "Visualizá el rendimiento de todas las cuentas en un solo dashboard.",
  },
  {
    icon: CalendarDays,
    title: "Calendario visual",
    description:
      "Planificá semanas enteras de contenido con una vista clara y ordenada.",
  },
  {
    icon: FileText,
    title: "Reportes automáticos",
    description:
      "Generá reportes de rendimiento para tus clientes en un clic.",
  },
  {
    icon: Palette,
    title: "Perfil de marca",
    description:
      "Guardá logos, paletas y tono de comunicación de cada cliente en un lugar.",
  },
]

const comparisonRows: ComparisonRow[] = [
  { feature: "Multi-cliente nativo", publi: true, traditional: false },
  { feature: "Calendario unificado", publi: true, traditional: "partial" },
  { feature: "Gestión de marca por cliente", publi: true, traditional: false },
  { feature: "Interfaz simple", publi: true, traditional: "partial" },
  { feature: "Pensado para freelancers", publi: true, traditional: false },
  { feature: "Precio accesible", publi: true, traditional: "partial" },
]

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "Gratis",
    sub: "para siempre",
    features: ["1 cuenta", "10 publicaciones por mes", "1 cliente"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12 USD",
    sub: "/ mes",
    features: [
      "5 cuentas",
      "Publicaciones ilimitadas",
      "Hasta 5 clientes",
    ],
    highlighted: true,
  },
  {
    name: "Agency",
    price: "$29 USD",
    sub: "/ mes",
    features: [
      "Cuentas ilimitadas",
      "Publicaciones ilimitadas",
      "Clientes ilimitados",
    ],
    highlighted: false,
  },
]

const teamMembers = [
  "Juan Pablo Alves Mendes",
  "Valentina D'Astolfo",
  "Lucio Gavotti",
  "Santiago Gonzalez Miel",
  "Ignacio Melinc",
  "Matias Young Christiansen",
]

// ─── Helper components ───────────────────────────────────────────────────────

function ComparisonCell({ value }: { value: CellValue }) {
  if (value === true) {
    return (
      <span className="flex justify-center">
        <Check className="w-5 h-5 text-primary" strokeWidth={2.5} />
      </span>
    )
  }
  if (value === "partial") {
    return (
      <span className="flex justify-center">
        <Minus className="w-5 h-5 text-accent" strokeWidth={2.5} />
      </span>
    )
  }
  return (
    <span className="flex justify-center">
      <X className="w-5 h-5 text-destructive" strokeWidth={2.5} />
    </span>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [formName, setFormName] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formRole, setFormRole] = useState("")

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  const openModal = () => setModalOpen(true)

  const handleSubmit = () => {
    setModalOpen(false)
    setFormName("")
    setFormEmail("")
    setFormRole("")
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 4000)
  }

  return (
    <div className="min-h-screen bg-background">

      {/* ── Toast ── */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground",
          "px-5 py-3 rounded-lg shadow-lg flex items-center gap-2",
          "transition-all duration-300",
          toastVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        )}
      >
        <Check className="w-4 h-4 shrink-0" />
        <span className="text-sm font-medium">
          ¡Solicitud enviada! Te contactaremos pronto.
        </span>
      </div>

      {/* ── Navbar ── */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-200",
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-2xl font-bold text-primary tracking-tight">
            publi
          </span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {(["funcionalidades", "precios", "equipo"] as const).map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors capitalize"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" onClick={openModal}>
              Solicitar acceso
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => router.push("/login")}
            >
              Acceder
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-background border-b border-border px-6 pb-5 flex flex-col gap-4">
            {[
              { id: "funcionalidades", label: "Funcionalidades" },
              { id: "precios", label: "Precios" },
              { id: "equipo", label: "Equipo" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm text-left text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </button>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Button variant="outline" onClick={openModal} className="w-full">
                Solicitar acceso
              </Button>
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => router.push("/login")}
              >
                Acceder
              </Button>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* ── Hero ── */}
        <section className="min-h-screen flex flex-col justify-center pt-16 pb-12 bg-gradient-to-b from-primary-light/30 to-transparent">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Todas tus cuentas.<br />Un solo lugar.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              publi es la plataforma para Community Managers que quieren dejar
              de apagar incendios y empezar a escalar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                onClick={openModal}
              >
                Solicitar acceso
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8"
                onClick={() => router.push("/login")}
              >
                Acceder al portal
              </Button>
            </div>

            {/* Social networks */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Integra tus redes favoritas
              </span>
              <div className="flex items-center gap-6">
                {socialNetworks.map(({ label, icon }) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={label}
                    src={icon}
                    alt={label}
                    width={28}
                    height={28}
                    className="w-7 h-7 opacity-40 grayscale"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Funcionalidades ── */}
        <section id="funcionalidades" className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-3">
              Todo lo que necesitás para gestionar como un pro
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              Herramientas pensadas específicamente para Community Managers
              freelance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featureCards.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Por qué publi ── */}
        <section className="py-20 bg-muted/50">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              ¿Por qué publi y no otra herramienta?
            </h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-3 bg-muted px-6 py-4 border-b border-border">
                <span className="text-sm font-medium text-muted-foreground">
                  Funcionalidad
                </span>
                <span className="text-sm font-semibold text-primary text-center">
                  publi
                </span>
                <span className="text-sm font-medium text-muted-foreground text-center">
                  Otras herramientas
                </span>
              </div>
              {comparisonRows.map((row, i) => (
                <div
                  key={row.feature}
                  className={cn(
                    "grid grid-cols-3 px-6 py-4 items-center",
                    i < comparisonRows.length - 1 && "border-b border-border"
                  )}
                >
                  <span className="text-sm text-foreground">{row.feature}</span>
                  <ComparisonCell value={row.publi} />
                  <ComparisonCell value={row.traditional} />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              ~ Disponible de forma limitada o con costo adicional
            </p>
          </div>
        </section>

        {/* ── Precios ── */}
        <section id="precios" className="py-20 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-3">
              Planes simples, sin sorpresas
            </h2>
            <p className="text-muted-foreground text-center mb-12">
              Empezá gratis, escalá cuando lo necesités.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "bg-card rounded-xl border p-8 flex flex-col relative",
                    plan.highlighted
                      ? "border-primary shadow-lg"
                      : "border-border"
                  )}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Más elegido
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span
                      className={cn(
                        "text-3xl font-bold",
                        plan.highlighted ? "text-primary" : "text-foreground"
                      )}
                    >
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.sub}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                    onClick={openModal}
                  >
                    Empezar
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Equipo ── */}
        <section id="equipo" className="py-20 bg-muted/50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              El equipo detrás de publi
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 justify-items-center">
              {teamMembers.map((name) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0095b6&textColor=ffffff`}
                    alt={name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full"
                  />
                  <span className="text-sm font-medium text-foreground leading-tight">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-muted py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-xl font-bold text-primary">publi</p>
            <p className="text-sm text-muted-foreground">Managing Communities</p>
          </div>
          <div className="flex items-center gap-6">
            {[
              { id: "funcionalidades", label: "Funcionalidades" },
              { id: "precios", label: "Precios" },
              { id: "equipo", label: "Equipo" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 publi. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* ── Modal ── */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Solicitá tu acceso anticipado</DialogTitle>
            <DialogDescription>
              Estamos en fase beta. Dejanos tus datos y te contactamos.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="modal-name">Nombre completo</Label>
              <Input
                id="modal-name"
                placeholder="Tu nombre"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="modal-email">Email</Label>
              <Input
                id="modal-email"
                type="email"
                placeholder="tu@email.com"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Rol</Label>
              <Select value={formRole} onValueChange={setFormRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccioná tu rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">Community Manager</SelectItem>
                  <SelectItem value="owner">Dueño de negocio</SelectItem>
                  <SelectItem value="agency">Agencia</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
              onClick={handleSubmit}
            >
              Enviar solicitud
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
