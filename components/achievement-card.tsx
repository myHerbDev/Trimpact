import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatDate } from "@/lib/date-utils"

interface AchievementCardProps {
  achievement: {
    id: string
    title: string
    description: string
    icon: string
    unlocked: boolean
    date?: string
    progress?: number
  }
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <Card className={`overflow-hidden ${!achievement.unlocked ? "opacity-60" : ""}`}>
      <CardContent className="p-4 text-center">
        <div className="text-4xl mb-2">{achievement.icon}</div>
        <h3 className="font-bold text-sm mb-1">{achievement.title}</h3>
        <p className="text-gray-500 text-xs mb-2">{achievement.description}</p>

        {achievement.unlocked ? (
          <div className="text-xs text-green-600 font-medium">
            Unlocked {achievement.date && formatDate(achievement.date, "short")}
          </div>
        ) : (
          <div className="space-y-1">
            <Progress value={achievement.progress} className="h-1" />
            <div className="text-xs text-gray-500">{achievement.progress}% complete</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

