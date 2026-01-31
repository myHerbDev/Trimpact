"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState, type ReactNode } from "react"

interface ImpactCounterProps {
  title: string
  count: number
  unit?: string
  icon: ReactNode
}

export function ImpactCounter({ title, count, unit = "", icon }: ImpactCounterProps) {
  const [currentCount, setCurrentCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // ms
    const steps = 50
    const stepValue = count / steps
    const stepTime = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += stepValue
      if (current >= count) {
        setCurrentCount(count)
        clearInterval(timer)
      } else {
        setCurrentCount(Math.floor(current))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [count])

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">{icon}</div>
          <h3 className="text-lg font-medium text-gray-500 mb-1">{title}</h3>
          <div className="text-3xl font-bold">
            {currentCount.toLocaleString()}
            {unit && <span className="ml-1 text-xl">{unit}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

