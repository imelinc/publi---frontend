"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { FloatingSquares } from "@/components/publi/FloatingSquares";
import { Reveal } from "@/components/publi/Reveal";

type TabId =
  | "crear-publicacion"
  | "calendario-mensual"
  | "calendario-semanal"
  | "vista-publicaciones"
  | "cuentas-conectadas";

interface FeatureTab {
  id: TabId;
  label: string;
  icon: ReactNode;
}

const tabs: FeatureTab[] = [
  {
    id: "crear-publicacion",
    label: "Crear publicación",
    icon: <ComposeIcon />,
  },
  {
    id: "calendario-mensual",
    label: "Calendario mensual",
    icon: <MonthIcon />,
  },
  {
    id: "calendario-semanal",
    label: "Calendario semanal",
    icon: <WeekIcon />,
  },
  {
    id: "vista-publicaciones",
    label: "Vista de publicaciones",
    icon: <PostsIcon />,
  },
  {
    id: "cuentas-conectadas",
    label: "Cuentas conectadas",
    icon: <AccountsIcon />,
  },
];

export function FeatureTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("crear-publicacion");

  return (
    <section
      id="funcionalidades"
      className="relative overflow-hidden bg-[hsl(var(--hero-background))] px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <FloatingSquares
        squares={[
          {
            className:
              "left-4 top-10 h-10 w-10 -rotate-6 bg-primary/50 md:left-10 md:h-14 md:w-14",
          },
          {
            className:
              "right-8 top-16 h-8 w-8 rotate-6 bg-primary-light/75 md:h-12 md:w-12",
          },
          {
            className:
              "bottom-10 left-14 h-12 w-12 bg-accent/45 md:bottom-14 md:left-24 md:h-20 md:w-20",
          },
          {
            className:
              "right-16 bottom-16 h-6 w-6 -rotate-3 bg-primary/45 md:h-10 md:w-10",
          },
        ]}
      />

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <h2 className="text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
            Construido para el CM que exige control
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Una interfaz potente e intuitiva, diseñada para gestionar todo
            desde un solo lugar.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
          <Reveal>
            <div className="rounded-[32px] border border-primary/10 bg-white/70 p-3 shadow-[0_18px_60px_-45px_rgba(8,24,38,0.4)] backdrop-blur">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const isActive = tab.id === activeTab;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl border-l-[3px] px-4 py-4 text-left transition-all",
                        isActive
                          ? "border-primary bg-primary-light/80 text-primary shadow-sm"
                          : "border-transparent text-muted-foreground hover:bg-white/70 hover:text-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-2xl",
                          isActive ? "bg-white text-primary" : "bg-primary/5 text-foreground/75",
                        )}
                      >
                        {tab.icon}
                      </span>
                      <span className="text-sm font-semibold sm:text-base">
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="rounded-[34px] border border-primary/15 bg-white p-3 shadow-[0_28px_80px_-48px_rgba(6,29,41,0.55)]">
              <div className="rounded-[28px] bg-gradient-to-br from-primary via-primary to-[#005f78] p-1.5">
                <div className="rounded-[24px] bg-white">
                  <div className="flex items-center justify-between border-b border-border/70 px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#ff6b6b]" />
                      <span className="h-3 w-3 rounded-full bg-accent/80" />
                      <span className="h-3 w-3 rounded-full bg-primary-light" />
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      publi workspace
                    </span>
                  </div>
                  <div className="min-h-[420px] bg-[linear-gradient(180deg,rgba(204,238,245,0.25),rgba(255,255,255,1))] p-5 sm:p-7">
                    {activeTab === "crear-publicacion" && <CreatePostPreview />}
                    {activeTab === "calendario-mensual" && <MonthlyCalendarPreview />}
                    {activeTab === "calendario-semanal" && <WeeklyCalendarPreview />}
                    {activeTab === "vista-publicaciones" && <PostsOverviewPreview />}
                    {activeTab === "cuentas-conectadas" && <ConnectedAccountsPreview />}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CreatePostPreview() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-border/70">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Nuevo borrador</p>
            <p className="text-xs text-muted-foreground">
              Preparado para Instagram, LinkedIn y X
            </p>
          </div>
          <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-foreground">
            Hoy 18:30
          </span>
        </div>

        <div className="mt-5 rounded-[24px] border border-border/80 bg-[hsl(var(--hero-background))] p-4">
          <p className="text-sm leading-7 text-foreground/80">
            Presentamos la nueva agenda de contenidos para abril. Esta semana
            vamos a mostrar behind the scenes, resultados de clientes y una
            promo exclusiva para stories.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <SocialPill label="Instagram" color="bg-[#E1306C]" />
          <SocialPill label="Facebook" color="bg-[#1877F2]" />
          <SocialPill label="TikTok" color="bg-[#111111]" />
          <SocialPill label="LinkedIn" color="bg-[#0A66C2]" />
        </div>

        <div className="mt-6 flex items-center justify-between rounded-[24px] border border-border/70 bg-white px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Acciones
            </p>
            <p className="text-sm font-medium text-foreground">
              Programar, guardar o publicar ahora
            </p>
          </div>
          <button
            type="button"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm"
          >
            Publicar
          </button>
        </div>
      </div>

      <div className="rounded-[28px] bg-white/80 p-5 shadow-sm ring-1 ring-border/70">
        <p className="text-sm font-semibold text-foreground">Vista previa</p>
        <div className="mt-4 rounded-[28px] border border-border/70 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-light" />
            <div>
              <p className="text-sm font-semibold text-foreground">@cliente.activo</p>
              <p className="text-xs text-muted-foreground">Instagram preview</p>
            </div>
          </div>
          <div className="mt-4 h-40 rounded-[22px] bg-[linear-gradient(135deg,rgba(0,149,182,0.18),rgba(255,183,3,0.3))]" />
          <p className="mt-4 text-sm leading-7 text-foreground/75">
            Una sola plataforma para publicar, ordenar y mostrar resultados con
            claridad a cada cliente.
          </p>
        </div>
      </div>
    </div>
  );
}

function MonthlyCalendarPreview() {
  const days = Array.from({ length: 35 }, (_, index) => index + 1);
  const highlighted = new Set([3, 8, 14, 19, 24, 29, 34]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">Calendario de abril</p>
          <p className="text-xs text-muted-foreground">
            Vista general con entregables y aprobaciones
          </p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-foreground shadow-sm ring-1 ring-border/60">
            Mensual
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            12 publicaciones
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-3">
        {["L", "M", "X", "J", "V", "S", "D"].map((label) => (
          <div key={label} className="text-center text-xs font-semibold uppercase text-muted-foreground">
            {label}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day}
            className={cn(
              "rounded-[22px] border p-3 text-sm shadow-sm",
              highlighted.has(day)
                ? "border-accent/30 bg-accent/20 text-foreground"
                : "border-border/70 bg-white text-foreground/75",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">{day <= 30 ? day : day - 30}</span>
              {highlighted.has(day) ? (
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              ) : null}
            </div>
            <div className="mt-4 h-6 rounded-full bg-primary/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

function WeeklyCalendarPreview() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">Semana 15</p>
          <p className="text-xs text-muted-foreground">
            Contenido distribuido por día y cuenta
          </p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          7 columnas
        </span>
      </div>
      <div className="mt-6 grid gap-3 lg:grid-cols-7">
        {["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"].map((day, index) => (
          <div key={day} className="rounded-[24px] border border-border/70 bg-white p-3 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {day}
            </p>
            <div
              className={cn(
                "mt-4 rounded-[20px] p-3 text-sm font-medium",
                index % 3 === 0 && "bg-primary-light/65 text-primary",
                index % 3 === 1 && "bg-accent/20 text-foreground",
                index % 3 === 2 && "bg-primary/10 text-foreground",
              )}
            >
              Reel cliente
            </div>
            <div className="mt-3 rounded-[20px] bg-[hsl(var(--hero-background))] p-3 text-sm text-foreground/70">
              Story promo
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PostsOverviewPreview() {
  const posts = [
    { title: "Lanzamiento de campaña", status: "programado", tone: "bg-primary/10 text-primary" },
    { title: "Caso de éxito abril", status: "publicado", tone: "bg-primary-light/70 text-foreground" },
    { title: "Ideas para stories", status: "borrador", tone: "bg-accent/20 text-foreground" },
  ];

  return (
    <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-border/70">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">Biblioteca de publicaciones</p>
          <p className="text-xs text-muted-foreground">
            Todo ordenado por estado y por cliente
          </p>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          18 posts
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {posts.map((post) => (
          <div
            key={post.title}
            className="flex items-center justify-between rounded-[22px] border border-border/70 bg-[hsl(var(--hero-background))] px-4 py-4"
          >
            <div>
              <p className="text-sm font-semibold text-foreground">{post.title}</p>
              <p className="text-xs text-muted-foreground">Cliente: @studio.lucia</p>
            </div>
            <span className={cn("rounded-full px-3 py-1 text-xs font-semibold capitalize", post.tone)}>
              {post.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConnectedAccountsPreview() {
  const accounts = [
    { label: "Instagram", color: "bg-[#E1306C]" },
    { label: "Facebook", color: "bg-[#1877F2]" },
    { label: "TikTok", color: "bg-[#111111]" },
    { label: "LinkedIn", color: "bg-[#0A66C2]" },
    { label: "X", color: "bg-black" },
    { label: "YouTube", color: "bg-[#FF0000]" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">Cuentas conectadas</p>
          <p className="text-xs text-muted-foreground">
            Lista lista para trabajar sin cambiar de plataforma
          </p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          6 activas
        </span>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <div
            key={account.label}
            className="rounded-[24px] border border-border/70 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className={cn("h-10 w-10 rounded-2xl", account.color)} />
              <span className="rounded-full bg-primary-light/80 px-3 py-1 text-xs font-semibold text-primary">
                conectada
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold text-foreground">{account.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialPill({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white px-3 py-1.5 text-xs font-semibold text-foreground">
      <span className={cn("h-2.5 w-2.5 rounded-full", color)} />
      {label}
    </span>
  );
}

function ComposeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M5 19h4l8.7-8.7a1.8 1.8 0 0 0-2.6-2.6L6.4 16.4 5 19Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M13.5 7.5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MonthIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 9.5h17" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3.5v4M16 3.5v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function WeekIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.2 5.5v15M14.8 5.5v15" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function PostsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="11" width="16" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="17" width="10" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function AccountsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 19a4.5 4.5 0 0 1 9 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 18a3.5 3.5 0 0 1 6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
