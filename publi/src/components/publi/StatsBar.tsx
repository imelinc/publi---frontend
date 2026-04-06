"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const stats = [
  { value: "+500", label: "Community Managers activos" },
  { value: "4 hs", label: "ahorradas por cliente por mes" },
  { value: "1 solo lugar", label: "para todas tus redes y clientes" },
]

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="bg-white border-y border-primary-light/60"
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-center divide-y md:divide-y-0 md:divide-x divide-primary-light/60">
          {stats.map(({ value, label }, i) => (
            <div
              key={value}
              className={cn(
                "flex flex-col items-center gap-1 px-10 py-6 md:py-0 w-full md:w-auto",
                "transition-all duration-500",
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span
                className="text-[48px] font-bold leading-none text-primary"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                {value}
              </span>
              <span className="text-[14px] text-muted-foreground text-center">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
