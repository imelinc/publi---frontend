# Login Screen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la pantalla de login en `publi/src/app/(auth)/login/page.tsx` con split layout de marca + formulario que redirige a `/dashboard`.

**Architecture:** Un único `"use client"` component con layout dividido 50/50 en desktop. Panel izquierdo con decoración geométrica CSS pura (arco + círculos). Panel derecho con formulario shadcn/ui que llama `router.push("/dashboard")`. Sin validación ni backend.

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Tailwind CSS, shadcn/ui (Button, Input, Label), `useRouter` de `next/navigation`, `cn()` de `@/lib/utils`.

**Working directory:** Todos los comandos se ejecutan desde `publi/` salvo que se indique lo contrario.

---

### Task 1: Crear `src/lib/utils.ts`

**Files:**
- Create: `publi/src/lib/utils.ts`

- [ ] **Step 1: Crear el archivo**

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 2: Verificar que `clsx` y `tailwind-merge` están disponibles**

```bash
cd publi && grep -E '"clsx"|"tailwind-merge"' package.json
```

Resultado esperado: dos líneas con las dependencias. Si no aparecen, instalarlas:

```bash
npm install clsx tailwind-merge
```

- [ ] **Step 3: Verificar que compila**

```bash
cd publi && npx tsc --noEmit
```

Resultado esperado: sin errores.

- [ ] **Step 4: Commit**

```bash
git add publi/src/lib/utils.ts
git commit -m "feat: add cn() utility"
```

---

### Task 2: Instalar componentes shadcn (Button, Input, Label)

**Files:**
- Create: `publi/src/components/ui/button.tsx`
- Create: `publi/src/components/ui/input.tsx`
- Create: `publi/src/components/ui/label.tsx`

- [ ] **Step 1: Ejecutar el comando de instalación**

```bash
cd publi && npx shadcn@latest add button input label
```

Resultado esperado: tres archivos creados en `src/components/ui/`.

- [ ] **Step 2: Verificar que los archivos existen**

```bash
ls publi/src/components/ui/
```

Resultado esperado: `button.tsx  input.tsx  label.tsx`

- [ ] **Step 3: Verificar que compila sin errores**

```bash
cd publi && npx tsc --noEmit
```

Resultado esperado: sin errores.

- [ ] **Step 4: Commit**

```bash
git add publi/src/components/ui/
git commit -m "feat: add shadcn button, input, label components"
```

---

### Task 3: Crear la ruta `(auth)` y la página de login

**Files:**
- Create: `publi/src/app/(auth)/login/page.tsx`

- [ ] **Step 1: Crear los directorios necesarios**

```bash
mkdir -p "publi/src/app/(auth)/login"
```

- [ ] **Step 2: Crear `page.tsx`**

```typescript
"use client"

import { useRouter } from "next/navigation"
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
        "w-full md:w-1/2 bg-background px-8"
      )}>
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
```

- [ ] **Step 3: Verificar TypeScript**

```bash
cd publi && npx tsc --noEmit
```

Resultado esperado: sin errores.

- [ ] **Step 4: Verificar que el build pasa**

```bash
cd publi && npm run build
```

Resultado esperado: build exitoso, sin errores ni warnings de TypeScript.

- [ ] **Step 5: Commit**

```bash
git add "publi/src/app/(auth)/login/"
git commit -m "feat: add login screen with split layout"
```

---

### Task 4: Conectar la raíz `/` al login

**Files:**
- Modify: `publi/src/app/page.tsx`

La página raíz actualmente muestra el boilerplate de Next.js. Debe redirigir a `/login`.

- [ ] **Step 1: Reemplazar `page.tsx` con redirect**

```typescript
import { redirect } from "next/navigation"

export default function RootPage() {
  redirect("/login")
}
```

- [ ] **Step 2: Verificar TypeScript y build**

```bash
cd publi && npx tsc --noEmit && npm run build
```

Resultado esperado: sin errores.

- [ ] **Step 3: Commit**

```bash
git add publi/src/app/page.tsx
git commit -m "feat: redirect root to /login"
```

---

## Checklist final (del AGENTS.md)

- [ ] `npm run build` pasa sin errores
- [ ] Sin errores de TypeScript (`npx tsc --noEmit`)
- [ ] Colores del design system usados (sin hardcodeo)
- [ ] Fuente Poppins activa (ya configurada en globals.css)
- [ ] Formulario redirige a `/dashboard` al hacer click en "Ingresar"
- [ ] Panel izquierdo oculto en mobile (`hidden md:flex`)
