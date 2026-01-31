"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  Share2,
  TreesIcon as Tree,
  Cloud,
  ArrowUpRight,
  FileText,
  Mail,
  DollarSign,
  Facebook,
  Twitter,
  BarChartIcon,
  LineChartIcon,
  PieChartIcon,
  AreaChartIcon,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { generateImpactPDF, type TimeFrame } from "@/lib/pdf-export"
import { shareToSocial, nativeShare, canUseNativeShare } from "@/lib/social-sharing"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data for monthly reports
const monthlyData = {
  "2023-10": {
    trees: 15,
    cost: 52.5,
    co2: 4125,
    water: 15000,
    habitat: 60,
    partners: [
      { name: "Tree-Nation", trees: 8, cost: 28 },
      { name: "One Tree Planted", trees: 7, cost: 24.5 },
    ],
    projects: [
      { name: "Amazon Rainforest", trees: 8, cost: 28 },
      { name: "California Recovery", trees: 7, cost: 24.5 },
    ],
    dailyActivity: [
      { day: "Oct 1", trees: 0 },
      { day: "Oct 5", trees: 5 },
      { day: "Oct 12", trees: 3 },
      { day: "Oct 20", trees: 0 },
      { day: "Oct 25", trees: 7 },
      { day: "Oct 31", trees: 0 },
    ],
  },
  "2023-11": {
    trees: 22,
    cost: 77,
    co2: 6050,
    water: 22000,
    habitat: 88,
    partners: [
      { name: "Greenspark", trees: 10, cost: 42.5 },
      { name: "Tree-Nation", trees: 7, cost: 24.5 },
      { name: "CleanHub", trees: 5, cost: 10 },
    ],
    projects: [
      { name: "Borneo Habitat", trees: 10, cost: 42.5 },
      { name: "Amazon Rainforest", trees: 7, cost: 24.5 },
      { name: "Coastal Mangroves", trees: 5, cost: 10 },
    ],
    dailyActivity: [
      { day: "Nov 1", trees: 0 },
      { day: "Nov 3", trees: 10 },
      { day: "Nov 10", trees: 0 },
      { day: "Nov 15", trees: 7 },
      { day: "Nov 22", trees: 5 },
      { day: "Nov 30", trees: 0 },
    ],
  },
  "2023-12": {
    trees: 35,
    cost: 122.5,
    co2: 9625,
    water: 35000,
    habitat: 140,
    partners: [
      { name: "One Tree Planted", trees: 15, cost: 45 },
      { name: "Greenspark", trees: 12, cost: 51 },
      { name: "Tree-Nation", trees: 8, cost: 26.5 },
    ],
    projects: [
      { name: "Madagascar Reforestation", trees: 15, cost: 45 },
      { name: "Borneo Habitat", trees: 12, cost: 51 },
      { name: "Amazon Rainforest", trees: 8, cost: 26.5 },
    ],
    dailyActivity: [
      { day: "Dec 1", trees: 0 },
      { day: "Dec 5", trees: 8 },
      { day: "Dec 10", trees: 0 },
      { day: "Dec 15", trees: 12 },
      { day: "Dec 20", trees: 0 },
      { day: "Dec 25", trees: 15 },
      { day: "Dec 31", trees: 0 },
    ],
  },
  "2024-01": {
    trees: 28,
    cost: 98,
    co2: 7700,
    water: 28000,
    habitat: 112,
    partners: [
      { name: "Tree-Nation", trees: 12, cost: 42 },
      { name: "One Tree Planted", trees: 10, cost: 30 },
      { name: "CleanHub", trees: 6, cost: 26 },
    ],
    projects: [
      { name: "Amazon Rainforest", trees: 12, cost: 42 },
      { name: "California Recovery", trees: 10, cost: 30 },
      { name: "Coastal Mangroves", trees: 6, cost: 26 },
    ],
    dailyActivity: [
      { day: "Jan 1", trees: 0 },
      { day: "Jan 5", trees: 12 },
      { day: "Jan 12", trees: 0 },
      { day: "Jan 18", trees: 10 },
      { day: "Jan 25", trees: 6 },
      { day: "Jan 31", trees: 0 },
    ],
  },
  "2024-02": {
    trees: 18,
    cost: 63,
    co2: 4950,
    water: 18000,
    habitat: 72,
    partners: [
      { name: "Greenspark", trees: 10, cost: 42.5 },
      { name: "One Tree Planted", trees: 8, cost: 20.5 },
    ],
    projects: [
      { name: "Borneo Habitat", trees: 10, cost: 42.5 },
      { name: "California Recovery", trees: 8, cost: 20.5 },
    ],
    dailyActivity: [
      { day: "Feb 1", trees: 0 },
      { day: "Feb 8", trees: 10 },
      { day: "Feb 15", trees: 0 },
      { day: "Feb 22", trees: 8 },
      { day: "Feb 29", trees: 0 },
    ],
  },
  "2024-03": {
    trees: 25,
    cost: 87.5,
    co2: 6875,
    water: 25000,
    habitat: 100,
    partners: [
      { name: "Tree-Nation", trees: 15, cost: 52.5 },
      { name: "CleanHub", trees: 10, cost: 35 },
    ],
    projects: [
      { name: "Amazon Rainforest", trees: 15, cost: 52.5 },
      { name: "Coastal Mangroves", trees: 10, cost: 35 },
    ],
    dailyActivity: [
      { day: "Mar 1", trees: 0 },
      { day: "Mar 7", trees: 15 },
      { day: "Mar 15", trees: 0 },
      { day: "Mar 22", trees: 10 },
      { day: "Mar 31", trees: 0 },
    ],
  },
}

// Available months for selection
const availableMonths = [
  { value: "2024-03", label: "March 2024" },
  { value: "2024-02", label: "February 2024" },
  { value: "2024-01", label: "January 2024" },
  { value: "2023-12", label: "December 2023" },
  { value: "2023-11", label: "November 2023" },
  { value: "2023-10", label: "October 2023" },
]

const formatDate = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function ReportsPage() {
  const { toast } = useToast()
  const { user, loading } = useAuth()
  const router = useRouter()
  const [selectedMonth, setSelectedMonth] = useState("2024-03")
  const [reportView, setReportView] = useState("monthly")
  const [mounted, setMounted] = useState(false)

  // Use useEffect to ensure components only render client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Get the data for the selected month
  const monthData = monthlyData[selectedMonth as keyof typeof monthlyData]

  const handleGeneratePDF = () => {
    // Sample data for the PDF
    const pdfData = {
      timeFrame: reportView as TimeFrame,
      userData: {
        name: user?.name || "User",
        email: user?.email || "user@example.com",
        joinDate: "October 1, 2023",
        totalTrees: 143,
        achievements: [
          {
            title: "Seedling",
            date: "2023-05-15",
            description: "Plant your first tree",
          },
          {
            title: "Gardener",
            date: "2023-06-22",
            description: "Plant 10 trees",
          },
          {
            title: "Forester",
            date: "2023-08-10",
            description: "Plant 50 trees",
          },
          {
            title: "Conservationist",
            date: "2023-10-05",
            description: "Plant 100 trees",
          },
        ],
      },
      impactData: {
        cost: 500.5,
        co2Reduction: 39325,
        waterSaved: 143000,
        habitatRestored: 572,
      },
      treeData: Object.entries(monthlyData).map(([month, data]) => ({
        date: month,
        count: data.trees,
        project: data.projects[0]?.name || "Various Projects",
        partner: data.partners[0]?.name || "Multiple Partners",
      })),
    }

    // Generate the PDF
    const pdfDataUrl = generateImpactPDF(pdfData)

    // Create a link and trigger download
    const link = document.createElement("a")
    link.href = pdfDataUrl
    link.download = `myherb-impact-report-${reportView}.pdf`
    link.click()

    toast({
      title: "PDF Generated",
      description: `Your ${reportView} impact report has been downloaded.`,
    })
  }

  const handleDownloadReport = () => {
    handleGeneratePDF()
  }

  const handleShareReport = () => {
    const shareText = `I've planted 143 trees with myHerb, reducing CO2 by 39,325 kg! Join me in making a difference.`
    const shareUrl = "https://myherb.co.il"

    if (canUseNativeShare()) {
      nativeShare({
        title: "My Environmental Impact with myHerb",
        text: shareText,
        url: shareUrl,
      }).then((success) => {
        if (!success) {
          // Fallback if native sharing fails
          shareToSocial({
            platform: "twitter",
            text: shareText,
            url: shareUrl,
            hashtags: ["myHerb", "Reforestation", "ClimateAction"],
          })
        }
      })
    } else {
      // Use social sharing if native sharing is not available
      shareToSocial({
        platform: "twitter",
        text: shareText,
        url: shareUrl,
        hashtags: ["myHerb", "Reforestation", "ClimateAction"],
      })
    }

    toast({
      title: "Sharing Impact Report",
      description: "Your impact report is ready to share.",
    })
  }

  const handleEmailReport = () => {
    toast({
      title: "Report Emailed",
      description: "Your impact report has been sent to your email address.",
    })
  }

  // If not mounted yet, show a loading state
  if (!mounted) {
    return (
      <div className="container py-12">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Impact Reports</h1>
            <p className="text-gray-500">Track your contributions and environmental impact over time</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" onClick={handleEmailReport}>
              <Mail className="mr-2 h-4 w-4" />
              Email Report
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Your Impact</DialogTitle>
                  <DialogDescription>Share your environmental impact with friends and family</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        shareToSocial({
                          platform: "facebook",
                          title: "My Environmental Impact with myHerb",
                          text: `I've planted 143 trees with myHerb, reducing CO2 by 39,325 kg! Join me in making a difference.`,
                          url: "https://myherb.co.il",
                          hashtags: ["myHerb", "Reforestation", "ClimateAction"],
                        })
                      }
                    >
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        shareToSocial({
                          platform: "twitter",
                          text: `I've planted 143 trees with myHerb, reducing CO2 by 39,325 kg! Join me in making a difference.`,
                          url: "https://myherb.co.il",
                          hashtags: ["myHerb", "Reforestation", "ClimateAction"],
                        })
                      }
                    >
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        shareToSocial({
                          platform: "email",
                          title: "My Environmental Impact with myHerb",
                          text: `I've planted 143 trees with myHerb, reducing CO2 by 39,325 kg! Join me in making a difference.`,
                          url: "https://myherb.co.il",
                        })
                      }
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={handleDownloadReport}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        <Tabs defaultValue="monthly" value={reportView} onValueChange={setReportView} className="mb-8">
          <TabsList>
            <TabsTrigger value="monthly">Monthly Report</TabsTrigger>
            <TabsTrigger value="yearly">Yearly Summary</TabsTrigger>
            <TabsTrigger value="cumulative">Cumulative Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Monthly Impact Report</h2>
              <div className="w-full md:w-64 mt-4 md:mt-0">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMonths.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Trees Planted</CardTitle>
                  <Tree className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{monthData.trees}</div>
                  <p className="text-xs text-gray-500">
                    Total for {availableMonths.find((m) => m.value === selectedMonth)?.label}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
                  <DollarSign className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${monthData.cost}</div>
                  <p className="text-xs text-gray-500">Invested in reforestation</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">CO₂ Reduction</CardTitle>
                  <Cloud className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{monthData.co2.toLocaleString()} kg</div>
                  <p className="text-xs text-gray-500">Carbon dioxide absorbed per year</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Activity</CardTitle>
                  <CardDescription>Tree planting activity throughout the month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <AreaChartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Area chart showing daily tree planting activity</p>
                      <p className="text-sm text-gray-400 mt-2">Total: {monthData.trees} trees planted this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Partners Distribution</CardTitle>
                  <CardDescription>Trees planted with each partner</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <PieChartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Pie chart showing partner distribution</p>
                      <ul className="text-sm text-gray-400 mt-2 space-y-1">
                        {monthData.partners.map((partner, index) => (
                          <li key={index}>
                            {partner.name}: {partner.trees} trees
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Projects Distribution</CardTitle>
                  <CardDescription>Trees planted in each project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <BarChartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Bar chart showing projects distribution</p>
                      <ul className="text-sm text-gray-400 mt-2 space-y-1">
                        {monthData.projects.map((project, index) => (
                          <li key={index}>
                            {project.name}: {project.trees} trees
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Environmental Benefits</CardTitle>
                  <CardDescription>Additional impact from your tree planting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Water Saved</span>
                        <span className="text-sm font-medium">{monthData.water.toLocaleString()} liters</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(monthData.water / 40000) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Habitat Restored</span>
                        <span className="text-sm font-medium">{monthData.habitat} m²</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-amber-500 h-2 rounded-full"
                          style={{ width: `${(monthData.habitat / 200) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-md mt-4">
                      <h4 className="font-medium mb-2">Impact Equivalents</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>
                            Equivalent to taking {Math.round(monthData.co2 / 4000)} cars off the road for a year
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Provides enough oxygen for {monthData.trees * 2} people annually</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Saves enough water to fill {Math.round(monthData.water / 200)} bathtubs</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="yearly">
            <Card>
              <CardHeader>
                <CardTitle>Yearly Tree Planting Summary</CardTitle>
                <CardDescription>Trees planted over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center">
                    <BarChartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Bar chart showing yearly tree planting summary</p>
                    <p className="text-sm text-gray-400 mt-2">Total: 143 trees planted over the last 6 months</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                  <div>
                    <p className="text-sm text-gray-500">Total Trees</p>
                    <p className="text-2xl font-bold">143</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Cost</p>
                    <p className="text-2xl font-bold">$500.50</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Monthly Average</p>
                    <p className="text-2xl font-bold">23.8</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Growth Rate</p>
                    <p className="text-2xl font-bold flex items-center">
                      +67% <ArrowUpRight className="h-4 w-4 ml-1 text-green-600" />
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Comparison</CardTitle>
                  <CardDescription>Cost and trees planted each month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <LineChartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Line chart showing monthly comparison</p>
                      <p className="text-sm text-gray-400 mt-2">Comparing trees planted and cost over 6 months</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Partner Distribution</CardTitle>
                  <CardDescription>Trees planted with each partner over 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <PieChartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Pie chart showing partner distribution</p>
                      <ul className="text-sm text-gray-400 mt-2 space-y-1">
                        <li>Tree-Nation: 50 trees</li>
                        <li>Greenspark: 32 trees</li>
                        <li>One Tree Planted: 40 trees</li>
                        <li>CleanHub: 21 trees</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cumulative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Trees Planted</CardTitle>
                  <Tree className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">143</div>
                  <p className="text-xs text-gray-500">Since October 2023</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total CO₂ Reduction</CardTitle>
                  <Cloud className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">39,325 kg</div>
                  <p className="text-xs text-gray-500">Carbon dioxide absorbed per year</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
                  <DollarSign className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$500.50</div>
                  <p className="text-xs text-gray-500">Invested in reforestation</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Cumulative Impact</CardTitle>
                <CardDescription>Growth of trees planted and CO₂ reduction over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center">
                    <LineChartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Line chart showing cumulative impact</p>
                    <p className="text-sm text-gray-400 mt-2">Growth of trees planted and CO₂ reduction over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                  <CardDescription>Total environmental benefits from your tree planting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">CO₂ Reduction</span>
                        <span className="text-sm font-medium">39,325 kg</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">78% of your annual goal (50,000 kg)</p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Water Saved</span>
                        <span className="text-sm font-medium">143,000 liters</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "71%" }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">71% of your annual goal (200,000 liters)</p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Habitat Restored</span>
                        <span className="text-sm font-medium">572 m²</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: "57%" }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">57% of your annual goal (1,000 m²)</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-md mt-4">
                      <h4 className="font-medium mb-2">Lifetime Impact Equivalents</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Equivalent to taking 9.8 cars off the road for a year</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Provides enough oxygen for 286 people annually</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Saves enough water to fill 715 bathtubs</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Habitat restored is equivalent to 2.5 basketball courts</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Impact Certificates</CardTitle>
                  <CardDescription>Download and share your impact certificates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-primary mr-3" />
                        <div>
                          <h4 className="font-medium">Q1 2024 Impact Certificate</h4>
                          <p className="text-xs text-gray-500">71 trees planted, 19,525 kg CO₂ reduced</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-primary mr-3" />
                        <div>
                          <h4 className="font-medium">Q4 2023 Impact Certificate</h4>
                          <p className="text-xs text-gray-500">72 trees planted, 19,800 kg CO₂ reduced</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-primary mr-3" />
                        <div>
                          <h4 className="font-medium">Lifetime Impact Certificate</h4>
                          <p className="text-xs text-gray-500">143 trees planted, 39,325 kg CO₂ reduced</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-500 mb-4">Share your impact with friends and family</p>
                      <div className="flex justify-center gap-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            shareToSocial({
                              platform: "facebook",
                              text: `I've planted 143 trees with myHerb, reducing CO2 by 39,325 kg!`,
                              url: "https://myherb.co.il",
                            })
                          }
                        >
                          <Facebook className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            shareToSocial({
                              platform: "twitter",
                              text: `I've planted 143 trees with myHerb, reducing CO2 by 39,325 kg!`,
                              url: "https://myherb.co.il",
                            })
                          }
                        >
                          <Twitter className="h-4 w-4 mr-2" />
                          Tweet
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            shareToSocial({
                              platform: "email",
                              title: "My Environmental Impact",
                              text: `I've planted 143 trees with myHerb, reducing CO2 by 39,325 kg!`,
                              url: "https://myherb.co.il",
                            })
                          }
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
