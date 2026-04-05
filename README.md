# publi — Managing Communities

Plataforma de gestión unificada de redes sociales para Community Managers.

Permite programar publicaciones, visualizar calendarios de contenido y gestionar múltiples cuentas desde un único lugar.

---

## Stack

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + shadcn/ui
- **Estado global**: Zustand
- **Base de datos**: Supabase (PostgreSQL)
- **Deploy**: Vercel (frontend) · Render (backend) · Supabase (DB)

---

## Equipo

Alves Mendes · D'Astolfo · Gavotti · Gonzalez Miel · Melinc · Young Christiansen

---

## Levantar el proyecto localmente

### Requisitos

- Node.js 18+
- npm o yarn

### Instalación
```bash
git clone https://github.com/tu-org/publi.git
cd publi
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Estructura del proyecto
src/
├── app/
│   ├── (auth)/           # Pantallas de autenticación
│   └── (dashboard)/      # Pantallas principales de la app
├── components/
│   ├── ui/               # Componentes base (shadcn)
│   └── publi/            # Componentes propios del producto
├── lib/                  # Utilidades y datos mock
└── store/                # Estado global (Zustand)

---

## Estado del proyecto

> Prototipo funcional — MVP frontend con datos hardcodeados.  
> El backend y la integración con la API de Instagram se desarrollan en una etapa posterior.

---

## Variables de entorno

Copiá `.env.example` a `.env.local` y completá los valores:
```bash
cp .env.example .env.local
```
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```