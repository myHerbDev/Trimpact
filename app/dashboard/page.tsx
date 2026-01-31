"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Share2, BarChartIcon, PieChartIcon, Download, FileText, Settings } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { AchievementCard } from "@/components/achievement-card"
import { ActivityFeed } from "@/components/activity-feed"
import { generateImpactPDF, type TimeFrame } from "@/lib/pdf-export"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import Link from "next/link"

// Mock data
const treeData = [
  { month: "Jan", trees: 12 },
  { month: "Feb", trees: 19 },
  { month: "Mar", trees: 15 },
  { month: "Apr", trees: 25 },
  { month: "May", trees: 32 },
  { month: "Jun", trees: 18 },
  { month: "Jul", trees: 29 },
  { month: "Aug", trees: 41 },
  { month: "Sep", trees: 37 },
  { month: "Oct", trees: 21 },
  { month: "Nov", trees: 0 },
  { month: "Dec", trees: 0 },
]

const impactData = [
  { name: "CO₂ Reduction", value: 65, color: "#4CAF50" },
  { name: "Water Saved", value: 20, color: "#2196F3" },
  { name: "Habitat Restored", value: 15, color: "#FF9800" },
]

const projects = [
  {
    id: "p1",
    title: "Amazon Rainforest Restoration",
    description: "Help restore the lungs of our planet by planting trees in the Amazon rainforest.",
    location: "Brazil",
    image: "/placeholder.svg?height=200&width=300",
    progress: 78,
    treesPlanted: 15600,
    treesGoal: 20000,
  },
  {
    id: "p2",
    title: "Borneo Orangutan Habitat",
    description: "Plant trees to restore the natural habitat of endangered orangutans in Borneo.",
    location: "Indonesia",
    image: "/placeholder.svg?height=200&width=300",
    progress: 45,
    treesPlanted: 9000,
    treesGoal: 20000,
  },
  {
    id: "p3",
    title: "California Wildfire Recovery",
    description: "Help California recover from devastating wildfires by replanting native trees.",
    location: "United States",
    image: "/placeholder.svg?height=200&width=300",
    progress: 62,
    treesPlanted: 12400,
    treesGoal: 20000,
  },
]

const achievements = [
  {
    id: "a1",
    title: "Seedling",
    description: "Plant your first tree",
    icon: "🌱",
    unlocked: true,
    date: "2023-05-15",
  },
  {
    id: "a2",
    title: "Gardener",
    description: "Plant 10 trees",
    icon: "🌿",
    unlocked: true,
    date: "2023-06-22",
  },
  {
    id: "a3",
    title: "Forester",
    description: "Plant 50 trees",
    icon: "🌳",
    unlocked: true,
    date: "2023-08-10",
  },
  {
    id: "a4",
    title: "Conservationist",
    description: "Plant 100 trees",
    icon: "🌍",
    unlocked: true,
    date: "2023-10-05",
  },
  {
    id: "a5",
    title: "Earth Guardian",
    description: "Plant 500 trees",
    icon: "🌎",
    unlocked: false,
    progress: 45,
  },
]

const activities = [
  {
    id: "act1",
    type: "tree-planted",
    content: "You planted 5 trees in the Amazon Rainforest Restoration project",
    date: "2023-10-15T14:30:00Z",
  },
  {
    id: "act2",
    type: "achievement",
    content: "You earned the Conservationist badge",
    date: "2023-10-05T09:15:00Z",
  },
  {
    id: "act3",
    type: "donation",
    content: "You donated $50 to the Borneo Orangutan Habitat project",
    date: "2023-09-28T16:45:00Z",
  },
  {
    id: "act4",
    type: "tree-planted",
    content: "You planted 10 trees in the California Wildfire Recovery project",
    date: "2023-09-20T11:20:00Z",
  },
  {
    id: "act5",
    type: "achievement",
    content: "You earned the Forester badge",
    date: "2023-08-10T13:10:00Z",
  },
]

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [pdfTimeFrame, setPdfTimeFrame] = useState<TimeFrame>("monthly")
  const { toast } = useToast()

  // Ensure client-side only rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/dashboard")
    }
  }, [user, loading, router])

  if (!mounted || loading || !user) {
    return (
      <div className="container py-12">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  const handleExportPDF = () => {
    // Sample data for the PDF
    const pdfData = {
      timeFrame: pdfTimeFrame,
      userData: {
        name: user?.name || "User",
        email: user?.email || "user@example.com",
        joinDate: "January 1, 2023",
        totalTrees: 249,
        achievements: achievements
          .filter((a) => a.unlocked)
          .map((a) => ({
            title: a.title,
            date: a.date || new Date().toISOString(),
            description: a.description,
          })),
      },
      impactData: {
        cost: 500.5,
        co2Reduction: 6200,
        waterSaved: 143000,
        habitatRestored: 572,
      },
      treeData: treeData.map((item) => ({
        date: `2023-${item.month}`,
        count: item.trees,
        project: "Various Projects",
        partner: "Multiple Partners",
      })),
    }

    // Generate the PDF
    const pdfDataUrl = generateImpactPDF(pdfData)

    // Create a link and trigger download
    const link = document.createElement("a")
    link.href = pdfDataUrl
    link.download = `myherb-impact-report-${pdfTimeFrame}.pdf`
    link.click()

    toast({
      title: "PDF Generated",
      description: `Your ${pdfTimeFrame} impact report has been downloaded.`,
    })
  }

  const handleShareProgress = () => {
    // Create a shareable message
    const shareMessage = `I've planted 249 trees with myHerb, reducing CO2 by 6.2 tons! Join me in making a difference: https://myherb.co.il`

    // Check if Web Share API is available
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: "My Tree Planting Progress",
          text: shareMessage,
          url: "https://myherb.co.il",
        })
        .catch((error) => console.log("Error sharing:", error))
    } else {
      // Fallback: copy to clipboard
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(shareMessage)

        toast({
          title: "Copied to Clipboard",
          description: "Share link has been copied to your clipboard.",
        })
      }
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user.name}!</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Impact Report</DialogTitle>
                <DialogDescription>Generate a PDF report of your environmental impact</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="timeframe">Time Period</Label>
                  <Select value={pdfTimeFrame} onValueChange={(value) => setPdfTimeFrame(value as TimeFrame)}>
                    <SelectTrigger id="timeframe">
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily Report</SelectItem>
                      <SelectItem value="weekly">Weekly Report</SelectItem>
                      <SelectItem value="monthly">Monthly Report</SelectItem>
                      <SelectItem value="yearly">Yearly Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleExportPDF} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="sm" onClick={handleShareProgress}>
            <Share2 className="mr-2 h-4 w-4" />
            Share Progress
          </Button>

          <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/donate">Plant Trees</Link>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/settings">
              <Settings className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Trees Planted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">249</div>
            <p className="text-xs text-gray-500">+41 trees this month</p>
            <Progress value={50} className="h-1 mt-3" />
            <p className="text-xs text-gray-500 mt-1">50% to your next achievement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Reduction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">6.2 tons</div>
            <p className="text-xs text-gray-500">Equivalent to 1.3 cars off the road for a year</p>
            <Progress value={62} className="h-1 mt-3" />
            <p className="text-xs text-gray-500 mt-1">62% of your annual goal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4/12</div>
            <p className="text-xs text-gray-500">Earned 4 badges so far</p>
            <Progress value={33} className="h-1 mt-3" />
            <p className="text-xs text-gray-500 mt-1">Next: Earth Guardian (45%)</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Trees Planted (2023)</CardTitle>
                <CardDescription>Monthly breakdown of your tree planting activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center">
                    <BarChartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Bar chart visualization of monthly tree planting</p>
                    <p className="text-sm text-gray-400 mt-2">Total: 249 trees planted in 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
                <CardDescription>Breakdown of your positive impact on the environment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center">
                    <PieChartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Pie chart showing environmental impact breakdown</p>
                    <ul className="text-sm text-gray-400 mt-2 space-y-1">
                      <li>CO₂ Reduction: 65%</li>
                      <li>Water Saved: 20%</li>
                      <li>Habitat Restored: 15%</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Featured Projects</CardTitle>
              <CardDescription>Projects you're contributing to</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.slice(0, 3).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Your latest badges and rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.slice(0, 4).map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityFeed activities={activities.slice(0, 4)} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>My Projects</CardTitle>
              <CardDescription>All projects you're contributing to</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>My Achievements</CardTitle>
              <CardDescription>Badges and rewards you've earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {achievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
              <CardDescription>Your complete activity history</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityFeed activities={activities} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
