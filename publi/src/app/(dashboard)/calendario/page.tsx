"use client";

import { useMemo, useState } from "react";

type ViewMode = "mensual" | "semanal";
type Platform = "instagram" | "facebook" | "tiktok" | "linkedin";

interface CalendarPost {
  id: string;
  title: string;
  day: number;
  time: string;
  platform: Platform;
}

const dayLabels = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"] as const;

// Posts hardcodeados — se muestran en cualquier mes
const posts: CalendarPost[] = [
  { id: "1", title: "Campaña otoño", day: 3, time: "09:00", platform: "instagram" },
  { id: "2", title: "Promo stories", day: 5, time: "11:30", platform: "facebook" },
  { id: "3", title: "Tip del día", day: 8, time: "16:00", platform: "tiktok" },
  { id: "4", title: "Caso de éxito", day: 12, time: "10:15", platform: "linkedin" },
  { id: "5", title: "Lanzamiento reel", day: 14, time: "18:30", platform: "instagram" },
  { id: "6", title: "Post institucional", day: 18, time: "13:00", platform: "facebook" },
  { id: "7", title: "Behind the scenes", day: 22, time: "17:00", platform: "tiktok" },
  { id: "8", title: "Resultados Q1", day: 27, time: "08:45", platform: "linkedin" },
];

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

/** Retorna el índice del día de la semana (0=Lu … 6=Do) para el 1ro del mes */
function firstWeekdayOfMonth(year: number, month: number): number {
  const jsDay = new Date(year, month, 1).getDay(); // 0=Dom
  return jsDay === 0 ? 6 : jsDay - 1; // convertir a Lu=0
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export default function CalendarioPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth()); // 0-based
  const [viewMode, setViewMode] = useState<ViewMode>("mensual");
  const [activeDay, setActiveDay] = useState<number | null>(null);

  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();
  const today = isCurrentMonth ? now.getDate() : -1;

  function prevMonth() {
    if (month === 0) { setYear((y) => y - 1); setMonth(11); }
    else setMonth((m) => m - 1);
    setActiveDay(null);
  }

  function nextMonth() {
    if (month === 11) { setYear((y) => y + 1); setMonth(0); }
    else setMonth((m) => m + 1);
    setActiveDay(null);
  }

  const monthLabel = `${MONTH_NAMES[month]} ${year}`;
  const totalDays = daysInMonth(year, month);
  const startOffset = firstWeekdayOfMonth(year, month);

  // Grilla: celdas vacías al inicio + días del mes
  const gridCells = useMemo(() => {
    const cells: Array<{ day: number | null }> = [];
    for (let i = 0; i < startOffset; i++) cells.push({ day: null });
    for (let d = 1; d <= totalDays; d++) cells.push({ day: d });
    // Rellenar hasta múltiplo de 7
    while (cells.length % 7 !== 0) cells.push({ day: null });
    return cells;
  }, [startOffset, totalDays]);

  const postsByDay = useMemo(() => {
    return posts.reduce<Record<number, CalendarPost[]>>((acc, post) => {
      acc[post.day] = [...(acc[post.day] ?? []), post];
      return acc;
    }, {});
  }, []);

  // Vista semanal: semana que contiene el día activo (o la primera semana)
  const weekStart = useMemo(() => {
    const baseDay = activeDay ?? 1;
    const jsDay = new Date(year, month, baseDay).getDay();
    const lunesOffset = jsDay === 0 ? 6 : jsDay - 1;
    return new Date(year, month, baseDay - lunesOffset);
  }, [activeDay, year, month]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      return d;
    });
  }, [weekStart]);

  const weeklyPosts: Array<{ dayIndex: number; title: string; time: string; platform: Platform }> = [
    { dayIndex: 0, title: "Campaña otoño", time: "09:00", platform: "instagram" },
    { dayIndex: 1, title: "Promo stories", time: "11:30", platform: "facebook" },
    { dayIndex: 2, title: "Tip del día", time: "16:00", platform: "tiktok" },
    { dayIndex: 4, title: "Caso de éxito", time: "10:15", platform: "linkedin" },
    { dayIndex: 5, title: "Reel destacado", time: "18:30", platform: "instagram" },
  ];

  return (
    <main className="min-h-screen bg-[#f5f0e8] p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-[-0.03em] text-foreground">
              Calendario
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Visualizá tu planificación por mes o por semana.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 rounded-xl border border-[#e8f4f7] bg-white px-4 py-3">
              <button type="button" onClick={prevMonth} className="rounded-lg p-1 text-muted-foreground transition hover:bg-[#f5f0e8] hover:text-foreground">
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <span className="min-w-[140px] text-center text-sm font-semibold text-foreground">
                {monthLabel}
              </span>
              <button type="button" onClick={nextMonth} className="rounded-lg p-1 text-muted-foreground transition hover:bg-[#f5f0e8] hover:text-foreground">
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="flex rounded-full bg-white p-1 ring-1 ring-[#e8f4f7]">
              <button
                type="button"
                onClick={() => setViewMode("mensual")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  viewMode === "mensual"
                    ? "bg-primary text-white"
                    : "bg-transparent text-muted-foreground"
                }`}
              >
                Mensual
              </button>
              <button
                type="button"
                onClick={() => setViewMode("semanal")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  viewMode === "semanal"
                    ? "bg-primary text-white"
                    : "bg-transparent text-muted-foreground"
                }`}
              >
                Semanal
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[#e8f4f7] bg-white p-4 md:p-6">
          {viewMode === "mensual" ? (
            <div>
              <div className="grid grid-cols-7 gap-2">
                {dayLabels.map((label) => (
                  <div
                    key={label}
                    className="py-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    {label}
                  </div>
                ))}
              </div>

              <div className="mt-2 grid grid-cols-7 gap-2">
                {gridCells.map((cell, i) => {
                  const dayPosts = cell.day ? postsByDay[cell.day] ?? [] : [];
                  const isToday = cell.day === today;
                  const isActive = cell.day !== null && cell.day === activeDay;

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => cell.day && setActiveDay(cell.day)}
                      disabled={cell.day === null}
                      className={`min-h-[100px] rounded-xl border p-3 text-left transition ${
                        cell.day === null
                          ? "border-transparent bg-transparent cursor-default"
                          : isActive
                          ? "border-primary bg-[#f0fafc]"
                          : "border-[#e8f4f7] bg-white hover:border-primary/40"
                      }`}
                    >
                      {cell.day !== null && (
                        <>
                          <div className="flex items-center">
                            {isToday ? (
                              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                                {cell.day}
                              </span>
                            ) : (
                              <span className="text-xs font-medium text-muted-foreground">
                                {cell.day}
                              </span>
                            )}
                          </div>
                          <div className="mt-2 space-y-1.5">
                            {dayPosts.slice(0, 2).map((post) => (
                              <span
                                key={post.id}
                                className={`block truncate rounded-full px-2.5 py-1 text-[11px] font-semibold ${platformPillClasses(post.platform)}`}
                              >
                                {post.title}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid gap-3 xl:grid-cols-7">
              {weekDays.map((date, index) => {
                const dateLabel = `${date.getDate()} ${MONTH_NAMES[date.getMonth()].slice(0, 3)}`;
                const isToday =
                  date.getDate() === now.getDate() &&
                  date.getMonth() === now.getMonth() &&
                  date.getFullYear() === now.getFullYear();
                return (
                <div
                  key={index}
                  className={`rounded-xl border p-3 ${isToday ? "border-primary bg-[#f0fafc]" : "border-[#e8f4f7] bg-[#fbfdfe]"}`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {dayLabels[index]}
                  </p>
                  <p className={`mt-1 text-sm font-semibold ${isToday ? "text-primary" : "text-foreground"}`}>{dateLabel}</p>

                  <div className="mt-4 space-y-3">
                    {weeklyPosts
                      .filter((post) => post.dayIndex === index)
                      .map((post) => (
                        <article
                          key={`${post.title}-${post.time}`}
                          className={`rounded-xl p-3 ${platformPillClasses(post.platform)}`}
                        >
                          <p className="text-xs font-bold">{post.time}</p>
                          <p className="mt-1 text-sm font-semibold">{post.title}</p>
                        </article>
                      ))}
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function platformPillClasses(platform: Platform) {
  if (platform === "instagram") {
    return "bg-[#fce7f3] text-[#9d174d]";
  }
  if (platform === "facebook") {
    return "bg-[#dbeafe] text-[#1e40af]";
  }
  if (platform === "tiktok") {
    return "bg-[#f3f4f6] text-[#111827]";
  }
  return "bg-[#dbeafe] text-[#1e3a5f]";
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m14.5 6.5-5 5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m9.5 6.5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
