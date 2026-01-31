import { Calendar, Award, DollarSign, Leaf } from "lucide-react"
import { formatRelativeTime } from "@/lib/date-utils"

interface Activity {
  id: string
  type: "tree-planted" | "achievement" | "donation" | "other"
  content: string
  date: string
}

interface ActivityFeedProps {
  activities: Activity[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "tree-planted":
        return <Leaf className="h-4 w-4 text-green-500" />
      case "achievement":
        return <Award className="h-4 w-4 text-yellow-500" />
      case "donation":
        return <DollarSign className="h-4 w-4 text-blue-500" />
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex gap-3">
          <div className="flex-shrink-0 mt-1">{getIcon(activity.type)}</div>
          <div>
            <p className="text-sm">{activity.content}</p>
            <p className="text-xs text-gray-500">{formatRelativeTime(activity.date)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
