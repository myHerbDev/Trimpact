import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  number: number
}

export function FeatureCard({ title, description, icon, number }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="relative">
          <div className="absolute -top-1 -left-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
            {number}
          </div>
          <div className="flex flex-col items-center text-center pt-6">
            {icon}
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-500">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
