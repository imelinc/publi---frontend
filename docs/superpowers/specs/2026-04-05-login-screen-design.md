# Login Screen Design — publi

**Date:** 2026-04-05
**Status:** Approved

---

## Objetivo

Construir la pantalla de acceso en `src/app/(auth)/login/page.tsx`. Es puramente visual y de navegación: no valida credenciales ni usa localStorage. El botón "Ingresar" redirige directamente a `/dashboard`.

---

## Arquitectura

- **Un único archivo:** `publi/src/app/(auth)/login/page.tsx`
- **Directiva:** `"use client"` (necesario para `useRouter`)
- **Sin subcomponentes:** la decoración geométrica se implementa inline con divs/Tailwind
- **Sin backend ni validación real**

### Prerrequisitos de implementación

1. Instalar componentes shadcn faltantes: `npx shadcn@latest add button input label`
2. Crear `publi/src/lib/utils.ts` con la función `cn()` si no existe

---

## Layout

Split layout 50/50 en desktop, una sola columna en mobile.

```
Desktop:
┌──────────────────────┬──────────────────────┐
│   Panel de marca     │   Formulario login   │
│   (oculto en mobile) │   (siempre visible)  │
└──────────────────────┴──────────────────────┘

Mobile:
┌──────────────────────────────────────────────┐
│              Formulario login                │
└──────────────────────────────────────────────┘
```

---

## Panel izquierdo (brand panel)

- **Fondo:** `bg-primary` (`#0095b6`), `relative`, `overflow-hidden`
- **Decoración geométrica (CSS/Tailwind puro):**
  - Arco grande: `div` de `~600×600px`, `border-4 border-white/20`, `rounded-full`, posicionado `absolute` parcialmente fuera del panel (esquina inferior derecha)
  - 3 círculos flotantes: `absolute`, tamaños variados (`w-3`, `w-4`, `w-8`), `bg-white/10` o `bg-accent/30`, dispersos por el panel
- **Contenido (centrado verticalmente):**
  - Logo: `"publi"` en `font-bold text-5xl text-white`
  - Tagline: `"Managing Communities"` en `text-white/80 text-lg`
  - Separador visual
  - 3 frases de valor en `text-white/70 text-sm`:
    - "Todos tus clientes, un solo lugar"
    - "Programá contenido sin perder el hilo"
    - "Tu calendario social, siempre bajo control"

---

## Panel derecho (formulario)

- **Fondo:** `bg-background`
- **Centrado:** vertical y horizontal con flexbox
- **Card interior:** `max-w-sm w-full px-8`
- **Campos:**
  - `Label` + `Input type="email"` placeholder `"tu@email.com"`
  - `Label` + `Input type="password"` placeholder `"••••••••"`
- **Botón:** `Button` full-width, texto `"Ingresar"`, `bg-primary text-white`
- **Acción:** `router.push("/dashboard")` al hacer click

---

## Responsive

| Breakpoint | Panel izquierdo | Panel derecho |
|------------|----------------|---------------|
| `< md`     | `hidden`       | `w-full`      |
| `>= md`    | `w-1/2`        | `w-1/2`       |

---

## Colores (siempre desde design system)

| Uso | Clase Tailwind |
|-----|---------------|
| Fondo panel izquierdo | `bg-primary` |
| Texto blanco | `text-white`, `text-white/80`, `text-white/70` |
| Círculos decorativos | `bg-white/10`, `bg-accent/30` |
| Botón | `bg-primary text-primary-foreground` (via shadcn Button) |
| Fondo panel derecho | `bg-background` |

---

## Lo que NO hace esta pantalla

- No valida formato de email ni longitud de contraseña
- No muestra errores de formulario
- No persiste nada (ni localStorage ni cookies)
- No llama a ninguna API
