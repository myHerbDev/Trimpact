"use client"

import type * as React from "react"

export interface DayPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: Date | Date[] | { from: Date; to: Date }
  onSelect?: (date: Date) => void
  disabled?: { from: Date; to: Date } | ((date: Date) => boolean)
  mode?: "single" | "multiple" | "range"
  showOutsideDays?: boolean
  fromDate?: Date
  toDate?: Date
}

export function DayPicker(props: DayPickerProps) {
  // This is a stub component to satisfy the Calendar component's type requirements
  // The actual implementation is in the Calendar component
  return <div {...props} />
}
