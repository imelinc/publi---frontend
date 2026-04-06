"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const valueProps = [
  "Todos tus clientes, un solo lugar",
  "Publicaciones programadas sin esfuerzo",
  "Métricas unificadas en tiempo real",
]

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen">

      {/* ── Panel izquierdo (brand) ── */}
      <div className="hidden md:flex md:w-1/2 bg-primary relative overflow-hidden flex-col items-center justify-center px-12">

        {/* Decoración geométrica */}
        <div className="absolute w-[500px] h-[500px] rounded-full border-[40px] border-white/5 -bottom-40 -right-40" />
        <div className="absolute w-72 h-72 rounded-full border-[20px] border-white/5 -top-20 -left-20" />
        <div className="absolute w-8 h-8 rounded-full bg-white/10 top-20 right-24" />
        <div className="absolute w-4 h-4 rounded-full bg-accent/30 top-40 left-20" />
        <div className="absolute w-3 h-3 rounded-full bg-white/20 bottom-32 left-36" />
        <div className="absolute w-24 h-px bg-white/10 top-1/3 right-16 rotate-45" />
        <div className="absolute w-16 h-px bg-white/10 bottom-1/3 left-20 -rotate-12" />

        {/* Contenido */}
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold text-white tracking-tight mb-2">
            publi
          </h1>
          <p className="text-white/80 text-xl font-light mb-10">
            Managing Communities
          </p>

          <div className="w-12 h-px bg-white/30 mx-auto mb-8" />

          <ul className="space-y-4 text-left">
            {valueProps.map((text) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </span>
                <span className="text-white/80 text-sm font-light">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Panel derecho (formulario) ── */}
      <div className={cn(
        "flex flex-col items-center justify-center relative",
        "w-full md:w-1/2 bg-background px-8"
      )}>

        {/* Volver al inicio */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-6 left-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </button>

        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="mb-8">
            <span className="text-2xl font-bold text-primary tracking-tight">
              publi
            </span>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mb-1">
            Bienvenido de nuevo
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            Ingresá tus credenciales para continuar
          </p>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => router.push("/dashboard")}
            >
              Ingresar
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            ¿No tenés cuenta?{" "}
            <button className="text-primary hover:underline font-medium">
              Solicitá acceso
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
