"use client"

import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"
import { es } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

import { Button } from "./button"

interface CalendarProps {
  className?: string
  selected?: Date
  onSelect?: (date: Date) => void
}

const weekDays = Array.from({ length: 7 }, (_, index) =>
  format(addDays(startOfWeek(new Date(), { locale: es }), index), "EEEEE", {
    locale: es,
  }).toUpperCase()
)

function Calendar({ className, selected, onSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    selected ?? new Date()
  )

  React.useEffect(() => {
    if (selected) {
      setCurrentMonth(selected)
    }
  }, [selected])

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const gridStart = startOfWeek(monthStart, { locale: es })
  const gridEnd = endOfWeek(monthEnd, { locale: es })

  const days: Date[] = []
  let day = gridStart

  while (day <= gridEnd) {
    days.push(day)
    day = addDays(day, 1)
  }

  return (
    <div className={cn("rounded-2xl border border-border bg-card p-4", className)}>
      <div className="mb-4 flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={() => setCurrentMonth((value) => subMonths(value, 1))}
          aria-label="Mes anterior"
        >
          <ChevronLeft />
        </Button>

        <p className="text-sm font-semibold capitalize text-foreground">
          {format(currentMonth, "MMMM yyyy", { locale: es })}
        </p>

        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={() => setCurrentMonth((value) => addMonths(value, 1))}
          aria-label="Mes siguiente"
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
        {weekDays.map((weekDay) => (
          <div key={weekDay} className="py-2">
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date) => {
          const isSelected = selected ? isSameDay(date, selected) : false
          const isCurrentMonth = isSameMonth(date, currentMonth)

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => onSelect?.(date)}
              className={cn(
                "flex h-11 items-center justify-center rounded-xl text-sm transition-colors",
                isSelected
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-primary-light",
                !isCurrentMonth && "text-muted-foreground/50",
                isToday(date) && !isSelected && "border border-primary/30"
              )}
            >
              {format(date, "d", { locale: es })}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { Calendar }
