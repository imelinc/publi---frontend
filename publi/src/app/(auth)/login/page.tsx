"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen">
      {/* Panel izquierdo — oculto en mobile */}
      <div className="hidden md:flex md:w-1/2 bg-primary relative overflow-hidden flex-col items-center justify-center px-12">
        {/* Arco decorativo grande */}
        <div className="absolute w-[600px] h-[600px] rounded-full border-4 border-white/20 -bottom-48 -right-48" />
        {/* Círculos flotantes */}
        <div className="absolute w-8 h-8 rounded-full bg-white/10 top-16 right-20" />
        <div className="absolute w-4 h-4 rounded-full bg-accent/30 top-32 left-16" />
        <div className="absolute w-3 h-3 rounded-full bg-white/20 bottom-24 left-32" />

        {/* Contenido de marca */}
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold text-white tracking-tight mb-2">
            publi
          </h1>
          <p className="text-white/80 text-xl font-light mb-10">
            Managing Communities
          </p>

          <div className="w-12 h-px bg-white/30 mx-auto mb-8" />

          <ul className="space-y-3 text-white/70 text-sm font-light">
            <li>Todos tus clientes, un solo lugar</li>
            <li>Programá contenido sin perder el hilo</li>
            <li>Tu calendario social, siempre bajo control</li>
          </ul>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className={cn(
        "flex flex-col items-center justify-center",
        "w-full md:w-1/2 bg-background px-8 relative"
      )}>
        <button
          onClick={() => router.push("/")}
          className="absolute top-6 left-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </button>

        <div className="w-full max-w-sm">
          {/* Logo visible solo en mobile */}
          <div className="md:hidden text-center mb-8">
            <h1 className="text-4xl font-bold text-primary">publi</h1>
            <p className="text-muted-foreground text-sm mt-1">Managing Communities</p>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mb-1">
            Bienvenido de vuelta
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            Ingresá a tu cuenta para continuar
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
        </div>
      </div>
    </div>
  )
}
