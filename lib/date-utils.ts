/**
 * Complete replacement for date-fns functionality
 * This file provides native JavaScript implementations of all date-fns functions used in the project
 */

// Basic formatting
export function formatDate(date: Date | string, format: "short" | "medium" | "long" = "medium"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: format === "short" ? "short" : "long",
    day: "numeric",
  }

  if (format === "long") {
    options.weekday = "long"
    options.hour = "2-digit"
    options.minute = "2-digit"
  }

  return dateObj.toLocaleDateString(undefined, options)
}

// Relative time formatting
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - dateObj.getTime()

  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffDays > 30) {
    return `on ${formatDate(dateObj, "short")}`
  } else if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
  } else if (diffMins > 0) {
    return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`
  } else {
    return "just now"
  }
}

// Date manipulation
export function addDays(date: Date | string, days: number): Date {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date.getTime())
  dateObj.setDate(dateObj.getDate() + days)
  return dateObj
}

export function addMonths(date: Date | string, months: number): Date {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date.getTime())
  dateObj.setMonth(dateObj.getMonth() + months)
  return dateObj
}

export function addYears(date: Date | string, years: number): Date {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date.getTime())
  dateObj.setFullYear(dateObj.getFullYear() + years)
  return dateObj
}

// Date parts
export function startOfDay(date: Date | string): Date {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date.getTime())
  dateObj.setHours(0, 0, 0, 0)
  return dateObj
}

export function endOfDay(date: Date | string): Date {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date.getTime())
  dateObj.setHours(23, 59, 59, 999)
  return dateObj
}

export function startOfWeek(date: Date | string, options?: { weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 }): Date {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date.getTime())
  const weekStartsOn = options?.weekStartsOn || 0 // 0 = Sunday, 1 = Monday, etc.
  const day = dateObj.getDay()
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn
  dateObj.setDate(dateObj.getDate() - diff)
  dateObj.setHours(0, 0, 0, 0)
  return dateObj
}

export function endOfWeek(date: Date | string, options?: { weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 }): Date {
  const dateObj = startOfWeek(date, options)
  dateObj.setDate(dateObj.getDate() + 6)
  dateObj.setHours(23, 59, 59, 999)
  return dateObj
}

export function startOfMonth(date: Date | string): Date {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date.getTime())
  dateObj.setDate(1)
  dateObj.setHours(0, 0, 0, 0)
  return dateObj
}

export function endOfMonth(date: Date | string): Date {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date.getTime())
  dateObj.setMonth(dateObj.getMonth() + 1)
  dateObj.setDate(0)
  dateObj.setHours(23, 59, 59, 999)
  return dateObj
}

export function startOfYear(date: Date | string): Date {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date.getTime())
  dateObj.setMonth(0, 1)
  dateObj.setHours(0, 0, 0, 0)
  return dateObj
}

export function endOfYear(date: Date | string): Date {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date.getTime())
  dateObj.setFullYear(dateObj.getFullYear() + 1, 0, 0)
  dateObj.setHours(23, 59, 59, 999)
  return dateObj
}

// Date comparison
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === "string" ? new Date(date) : date
  const today = new Date()
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  )
}

export function isPast(date: Date | string): boolean {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.getTime() < new Date().getTime()
}

export function isFuture(date: Date | string): boolean {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.getTime() > new Date().getTime()
}

export function isSameDay(dateLeft: Date | string, dateRight: Date | string): boolean {
  const dateLeftObj = typeof dateLeft === "string" ? new Date(dateLeft) : dateLeft
  const dateRightObj = typeof dateRight === "string" ? new Date(dateRight) : dateRight

  return (
    dateLeftObj.getDate() === dateRightObj.getDate() &&
    dateLeftObj.getMonth() === dateRightObj.getMonth() &&
    dateLeftObj.getFullYear() === dateRightObj.getFullYear()
  )
}

export function isSameMonth(dateLeft: Date | string, dateRight: Date | string): boolean {
  const dateLeftObj = typeof dateLeft === "string" ? new Date(dateLeft) : dateLeft
  const dateRightObj = typeof dateRight === "string" ? new Date(dateRight) : dateRight

  return dateLeftObj.getMonth() === dateRightObj.getMonth() && dateLeftObj.getFullYear() === dateRightObj.getFullYear()
}

export function isSameYear(dateLeft: Date | string, dateRight: Date | string): boolean {
  const dateLeftObj = typeof dateLeft === "string" ? new Date(dateLeft) : dateLeft
  const dateRightObj = typeof dateRight === "string" ? new Date(dateRight) : dateRight

  return dateLeftObj.getFullYear() === dateRightObj.getFullYear()
}

// Date differences
export function differenceInDays(dateLeft: Date | string, dateRight: Date | string): number {
  const dateLeftObj = typeof dateLeft === "string" ? new Date(dateLeft) : dateLeft
  const dateRightObj = typeof dateRight === "string" ? new Date(dateRight) : dateRight

  const diffTime = Math.abs(dateLeftObj.getTime() - dateRightObj.getTime())
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

export function differenceInMonths(dateLeft: Date | string, dateRight: Date | string): number {
  const dateLeftObj = typeof dateLeft === "string" ? new Date(dateLeft) : dateLeft
  const dateRightObj = typeof dateRight === "string" ? new Date(dateRight) : dateRight

  const yearDiff = dateLeftObj.getFullYear() - dateRightObj.getFullYear()
  const monthDiff = dateLeftObj.getMonth() - dateRightObj.getMonth()

  return yearDiff * 12 + monthDiff
}

export function differenceInYears(dateLeft: Date | string, dateRight: Date | string): number {
  const dateLeftObj = typeof dateLeft === "string" ? new Date(dateLeft) : dateLeft
  const dateRightObj = typeof dateRight === "string" ? new Date(dateRight) : dateRight

  return dateLeftObj.getFullYear() - dateRightObj.getFullYear()
}

// Custom format function
export function format(date: Date | string, formatStr: string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  const hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()
  const seconds = dateObj.getSeconds()

  // Pad with leading zeros
  const pad = (num: number): string => num.toString().padStart(2, "0")

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const monthNamesShort = monthNames.map((m) => m.substring(0, 3))

  // Day names
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const dayNamesShort = dayNames.map((d) => d.substring(0, 3))

  // Replace format tokens
  return formatStr
    .replace(/yyyy/g, year.toString())
    .replace(/yy/g, year.toString().slice(-2))
    .replace(/MMMM/g, monthNames[month - 1])
    .replace(/MMM/g, monthNamesShort[month - 1])
    .replace(/MM/g, pad(month))
    .replace(/M/g, month.toString())
    .replace(/dd/g, pad(day))
    .replace(/d/g, day.toString())
    .replace(/EEEE/g, dayNames[dateObj.getDay()])
    .replace(/EEE/g, dayNamesShort[dateObj.getDay()])
    .replace(/HH/g, pad(hours))
    .replace(/H/g, hours.toString())
    .replace(/hh/g, pad(hours % 12 || 12))
    .replace(/h/g, (hours % 12 || 12).toString())
    .replace(/mm/g, pad(minutes))
    .replace(/m/g, minutes.toString())
    .replace(/ss/g, pad(seconds))
    .replace(/s/g, seconds.toString())
    .replace(/a/g, hours >= 12 ? "PM" : "AM")
    .replace(/p/g, hours >= 12 ? "p.m." : "a.m.")
}

// Parse date from string
export function parse(dateStr: string, formatStr: string, referenceDate?: Date): Date {
  // This is a simplified implementation
  // In a real app, you would need a more robust parsing logic
  return new Date(dateStr)
}

// ISO formatting
export function formatISO(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toISOString()
}

// Get date parts
export function getYear(date: Date | string): number {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.getFullYear()
}

export function getMonth(date: Date | string): number {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.getMonth()
}

export function getDate(date: Date | string): number {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.getDate()
}

export function getDay(date: Date | string): number {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.getDay()
}

// Set date parts
export function setYear(date: Date | string, year: number): Date {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date.getTime())
  dateObj.setFullYear(year)
  return dateObj
}

export function setMonth(date: Date | string, month: number): Date {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date.getTime())
  dateObj.setMonth(month)
  return dateObj
}

export function setDate(date: Date | string, dayOfMonth: number): Date {
  const dateObj = typeof date === "string" ? new Date(date) : new Date(date.getTime())
  dateObj.setDate(dayOfMonth)
  return dateObj
}

// Get days in month
export function getDaysInMonth(date: Date | string): number {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate()
}

// Max and min dates
export function max(dates: (Date | string)[]): Date {
  if (dates.length === 0) {
    return new Date(Number.NaN)
  }

  const dateTimes = dates.map((date) => (typeof date === "string" ? new Date(date).getTime() : date.getTime()))

  return new Date(Math.max(...dateTimes))
}

export function min(dates: (Date | string)[]): Date {
  if (dates.length === 0) {
    return new Date(Number.NaN)
  }

  const dateTimes = dates.map((date) => (typeof date === "string" ? new Date(date).getTime() : date.getTime()))

  return new Date(Math.min(...dateTimes))
}
