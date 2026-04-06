import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const socialPlatforms = [
  { name: "Instagram", iconSrc: "/icons/instagram.svg" },
  { name: "Facebook", iconSrc: "/icons/facebook.svg" },
  { name: "TikTok", iconSrc: "/icons/tiktok.svg" },
  { name: "LinkedIn", iconSrc: "/icons/linkedin.svg" },
  { name: "X", iconSrc: "/icons/twitter.svg" },
  { name: "YouTube", iconSrc: "/icons/youtube.svg" },
  { name: "Pinterest", iconSrc: "/icons/pinterest.svg" },
  { name: "Threads", iconSrc: "/icons/theads.svg" },
];

export function Hero() {
  const marqueeItems = [...socialPlatforms, ...socialPlatforms];

  return (
    <section
      id="inicio"
      className="overflow-hidden bg-[hsl(var(--hero-background))] px-4 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-24 lg:pt-40"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
        <div className="max-w-2xl">
          <h1 className="mt-6 text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-[4.35rem]">
            <span className="block">Gestioná todas</span>
            <span className="block">tus redes sociales</span>
            <span className="block">desde un solo lugar.</span>
          </h1>

          <div className="mt-8">
            <div className="relative overflow-hidden rounded-[28px] border border-primary/10 bg-background/75 px-2 py-4 shadow-[0_20px_70px_-45px_hsl(var(--foreground)/0.35)]">
              <div className="publi-marquee-track flex min-w-max items-stretch gap-3">
                {marqueeItems.map((platform, index) => (
                  <div
                    key={`${platform.name}-${index}`}
                    className="flex min-w-[102px] flex-col items-center justify-center rounded-2xl border border-border/80 bg-background px-4 py-3 text-center shadow-sm"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-foreground">
                      <img
                        src={platform.iconSrc}
                        alt={platform.name}
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                      />
                    </div>
                    <span className="mt-2 text-xs font-semibold text-foreground/75">
                      {platform.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            La plataforma para Community Managers freelance que centraliza la
            planificación, publicación y seguimiento de todas tus cuentas y
            clientes.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full px-7 text-base font-semibold shadow-[0_22px_50px_-28px_hsl(var(--primary)/0.9)] hover:bg-primary/90"
            >
              <Link href="/waitlist">
                Empezar gratis
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <p className="text-sm text-foreground/60">
              Organizá clientes, publicaciones, reportes y mucho más desde el primer día.
            </p>
          </div>
        </div>

        <div className="relative hidden justify-end lg:flex">
          <div className="absolute right-16 top-8 h-28 w-28 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-6 right-0 h-36 w-36 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative w-full max-w-[520px]">
            <IsometricArtwork />
          </div>
        </div>
      </div>
    </section>
  );
}

function IsometricArtwork() {
  return (
    <svg
      viewBox="0 0 560 500"
      className="h-auto w-full drop-shadow-[0_32px_50px_rgba(20,24,31,0.12)]"
      role="img"
      aria-label="Decoración geométrica de publi"
    >
      <defs>
        <linearGradient id="publi-top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary-light))" />
          <stop offset="100%" stopColor="white" />
        </linearGradient>
        <linearGradient id="publi-side" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.72" />
        </linearGradient>
        <linearGradient id="publi-accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--accent))" />
          <stop offset="100%" stopColor="white" />
        </linearGradient>
      </defs>

      <g transform="translate(90 40)">
        <path d="M180 40 310 115 180 190 50 115Z" fill="url(#publi-top)" />
        <path d="M180 190 310 115 310 255 180 330Z" fill="url(#publi-side)" />
        <path d="M180 190 50 115 50 255 180 330Z" fill="hsl(var(--primary-light))" />

        <path d="M320 120 430 185 320 250 210 185Z" fill="hsl(var(--card))" />
        <path d="M320 250 430 185 430 300 320 365Z" fill="hsl(var(--accent))" />
        <path d="M320 250 210 185 210 300 320 365Z" fill="hsl(var(--primary-light))" />

        <path d="M90 210 200 275 90 340 -20 275Z" fill="hsl(var(--card))" />
        <path d="M90 340 200 275 200 390 90 455Z" fill="hsl(var(--primary))" />
        <path d="M90 340 -20 275 -20 390 90 455Z" fill="url(#publi-top)" />

        <path d="M200 0 270 40 200 80 130 40Z" fill="hsl(var(--card))" />
        <path d="M200 80 270 40 270 120 200 160Z" fill="hsl(var(--accent))" />
        <path d="M200 80 130 40 130 120 200 160Z" fill="hsl(var(--primary-light))" />

        <path d="M360 270 450 320 360 370 270 320Z" fill="url(#publi-accent)" />
        <path d="M360 370 450 320 450 400 360 450Z" fill="hsl(var(--card))" />
        <path d="M360 370 270 320 270 400 360 450Z" fill="hsl(var(--primary-light))" />

        <circle cx="355" cy="85" r="18" fill="hsl(var(--accent))" fillOpacity="0.75" />
        <circle cx="18" cy="180" r="14" fill="hsl(var(--primary))" fillOpacity="0.4" />
        <circle cx="460" cy="235" r="12" fill="hsl(var(--primary-light))" />
      </g>
    </svg>
  );
}
