"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Award, Share2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { formatDate } from "@/lib/date-utils"

// Mock data for achievements/rewards
const achievements = [
  {
    id: "a1",
    title: "Seedling",
    description: "Plant your first tree",
    icon: "🌱",
    level: "beginner",
    unlocked: true,
    date: "2023-05-15",
  },
  {
    id: "a2",
    title: "Gardener",
    description: "Plant 10 trees",
    icon: "🌿",
    level: "beginner",
    unlocked: true,
    date: "2023-06-22",
  },
  {
    id: "a3",
    title: "Forester",
    description: "Plant 50 trees",
    icon: "🌳",
    level: "intermediate",
    unlocked: true,
    date: "2023-08-10",
  },
  {
    id: "a4",
    title: "Conservationist",
    description: "Plant 100 trees",
    icon: "🌍",
    level: "intermediate",
    unlocked: true,
    date: "2023-10-05",
  },
  {
    id: "a5",
    title: "Earth Guardian",
    description: "Plant 500 trees",
    icon: "🌎",
    level: "advanced",
    unlocked: false,
    progress: 45,
  },
  {
    id: "a6",
    title: "Climate Hero",
    description: "Plant 1000 trees",
    icon: "🏆",
    level: "advanced",
    unlocked: false,
    progress: 25,
  },
  {
    id: "a7",
    title: "Monthly Supporter",
    description: "Make recurring donations for 3 months",
    icon: "📅",
    level: "special",
    unlocked: true,
    date: "2023-09-01",
  },
  {
    id: "a8",
    title: "Social Advocate",
    description: "Share your impact on social media 5 times",
    icon: "📱",
    level: "special",
    unlocked: false,
    progress: 60,
  },
  {
    id: "a9",
    title: "Global Citizen",
    description: "Plant trees in 3 different regions",
    icon: "🌐",
    level: "special",
    unlocked: false,
    progress: 33,
  },
  {
    id: "a10",
    title: "Community Leader",
    description: "Invite 10 friends to join Trimpact",
    icon: "👥",
    level: "special",
    unlocked: false,
    progress: 20,
  },
  {
    id: "a11",
    title: "Biodiversity Champion",
    description: "Support 5 different tree species",
    icon: "🦋",
    level: "expert",
    unlocked: false,
    progress: 40,
  },
  {
    id: "a12",
    title: "Reforestation Master",
    description: "Plant 5000 trees",
    icon: "🌲",
    level: "expert",
    unlocked: false,
    progress: 5,
  },
]

// Mock data for rewards
const rewards = [
  {
    id: "r1",
    title: "10% Discount on Next Donation",
    description: "Unlock this reward by earning the Gardener badge",
    requiredAchievement: "a2",
    icon: "🎁",
    redeemed: false,
  },
  {
    id: "r2",
    title: "Digital Certificate",
    description: "Unlock this reward by earning the Forester badge",
    requiredAchievement: "a3",
    icon: "📜",
    redeemed: true,
    redeemedDate: "2023-08-15",
  },
  {
    id: "r3",
    title: "Exclusive Trimpact Sticker Pack",
    description: "Unlock this reward by earning the Conservationist badge",
    requiredAchievement: "a4",
    icon: "🏷️",
    redeemed: false,
  },
  {
    id: "r4",
    title: "Virtual Tree Naming Rights",
    description: "Unlock this reward by earning the Earth Guardian badge",
    requiredAchievement: "a5",
    icon: "🌳",
    redeemed: false,
    locked: true,
  },
  {
    id: "r5",
    title: "Trimpact T-Shirt",
    description: "Unlock this reward by earning the Climate Hero badge",
    requiredAchievement: "a6",
    icon: "👕",
    redeemed: false,
    locked: true,
  },
  {
    id: "r6",
    title: "Partner Discount Codes Bundle",
    description: "Unlock this reward by earning the Monthly Supporter badge",
    requiredAchievement: "a7",
    icon: "🏷️",
    redeemed: false,
  },
]

export default function RewardsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [mounted, setMounted] = useState(false)

  // Filter achievements based on active tab
  const filteredAchievements = achievements.filter((achievement) => {
    if (activeTab === "all") return true
    return achievement.level === activeTab
  })

  // Get available rewards (those with unlocked achievements)
  const availableRewards = rewards.filter((reward) => {
    const requiredAchievement = achievements.find((a) => a.id === reward.requiredAchievement)
    return requiredAchievement?.unlocked && !reward.locked
  })

  // Get locked rewards
  const lockedRewards = rewards.filter((reward) => {
    const requiredAchievement = achievements.find((a) => a.id === reward.requiredAchievement)
    return !requiredAchievement?.unlocked || reward.locked
  })

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Achievements & Rewards</h1>
          <p className="text-gray-500">Track your progress and unlock special rewards</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share Achievements
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5/12</div>
            <p className="text-xs text-gray-500">Earned 5 badges so far</p>
            <Progress value={41.6} className="h-1 mt-3" />
            <p className="text-xs text-gray-500 mt-1">41.6% complete</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{availableRewards.length}</div>
            <p className="text-xs text-gray-500">
              {availableRewards.filter((r) => !r.redeemed).length} not yet redeemed
            </p>
            <Progress value={(availableRewards.length / rewards.length) * 100} className="h-1 mt-3" />
            <p className="text-xs text-gray-500 mt-1">
              {Math.round((availableRewards.length / rewards.length) * 100)}% of all rewards
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Achievement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Earth Guardian</div>
            <p className="text-xs text-gray-500">Plant 500 trees (45% complete)</p>
            <Progress value={45} className="h-1 mt-3" />
            <p className="text-xs text-gray-500 mt-1">225/500 trees planted</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Earn badges by reaching milestones in your tree planting journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="beginner">Beginner</TabsTrigger>
                <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                <TabsTrigger value="expert">Expert</TabsTrigger>
                <TabsTrigger value="special">Special</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredAchievements.map((achievement) => (
                <Card key={achievement.id} className={`overflow-hidden ${!achievement.unlocked ? "opacity-60" : ""}`}>
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
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rewards</CardTitle>
            <CardDescription>Redeem special rewards by earning achievements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Available Rewards</h3>
              {availableRewards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {availableRewards.map((reward) => (
                    <Card key={reward.id} className={reward.redeemed ? "bg-gray-50" : ""}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{reward.icon}</div>
                          <div>
                            <h4 className="font-medium text-sm">{reward.title}</h4>
                            <p className="text-xs text-gray-500">{reward.description}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          {reward.redeemed ? (
                            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full inline-flex items-center">
                              <Award className="h-3 w-3 mr-1" />
                              Redeemed on {formatDate(reward.redeemedDate, "short")}
                            </div>
                          ) : (
                            <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                              Redeem Reward
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-md">
                  <p className="text-gray-500">No available rewards yet. Keep earning achievements!</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Locked Rewards</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {lockedRewards.map((reward) => {
                  const requiredAchievement = achievements.find((a) => a.id === reward.requiredAchievement)
                  return (
                    <Card key={reward.id} className="opacity-60">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{reward.icon}</div>
                          <div>
                            <h4 className="font-medium text-sm">{reward.title}</h4>
                            <p className="text-xs text-gray-500">{reward.description}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                            Locked - Earn the {requiredAchievement?.title} achievement
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

