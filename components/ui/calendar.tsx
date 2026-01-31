"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { DayPicker } from "./day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  addDays,
  format,
  startOfMonth,
  endOfMonth,
  isToday,
  isSameMonth,
  isSameDay,
  addMonths,
  startOfWeek,
  endOfWeek,
} from "@/lib/date-utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  // Create a simple calendar implementation using our date utilities
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(props.selected as Date | undefined)

  const handlePrevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    if (props.onSelect) {
      props.onSelect(date)
    }
  }

  // Generate calendar grid
  const generateCalendarDays = () => {
    const firstDayOfMonth = startOfMonth(currentMonth)
    const lastDayOfMonth = endOfMonth(currentMonth)
    const startDate = startOfWeek(firstDayOfMonth)
    const endDate = endOfWeek(lastDayOfMonth)

    const days = []
    let currentDate = startDate

    while (currentDate <= endDate) {
      days.push(currentDate)
      currentDate = addDays(currentDate, 1)
    }

    return days
  }

  const days = generateCalendarDays()
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  return (
    <div className={cn("p-3", className)}>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          )}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous month</span>
        </button>
        <div className="font-medium">{format(currentMonth, "MMMM yyyy")}</div>
        <button
          onClick={handleNextMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          )}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next month</span>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm text-muted-foreground h-9 flex items-center justify-center">
            {day}
          </div>
        ))}
        {days.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, currentMonth)
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false
          const isCurrentDay = isToday(day)

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleDateSelect(day)}
              className={cn(
                "h-9 w-9 rounded-md flex items-center justify-center text-sm p-0",
                !isCurrentMonth && "text-muted-foreground opacity-50",
                isSelected && "bg-primary text-primary-foreground",
                isCurrentDay && !isSelected && "border border-primary",
                !isSelected && "hover:bg-accent",
              )}
              disabled={!isCurrentMonth && !showOutsideDays}
            >
              {format(day, "d")}
            </button>
          )
        })}
      </div>
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
