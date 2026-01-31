"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, TreesIcon as Tree, MapPin, Cloud, Droplets, Leaf } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for tree planting partners
const partners = [
  {
    id: "tree-nation",
    name: "Tree-Nation",
    logo: "/placeholder.svg?height=60&width=120",
    description: "Plant trees with Tree-Nation to support global reforestation projects.",
    costPerTree: 3.5,
    co2PerTree: 250, // kg
    waterSaved: 1000, // liters
    habitatRestored: 4, // m²
    regions: ["South America", "Africa", "Asia"],
    treeTypes: ["Mangrove", "Oak", "Pine", "Fruit trees"],
    certifications: ["Verified Carbon Standard", "Gold Standard"],
  },
  {
    id: "greenspark",
    name: "Greenspark",
    logo: "/placeholder.svg?height=60&width=120",
    description: "Support sustainable reforestation with Greenspark's global initiatives.",
    costPerTree: 4.25,
    co2PerTree: 300, // kg
    waterSaved: 1200, // liters
    habitatRestored: 5, // m²
    regions: ["Europe", "North America", "Africa"],
    treeTypes: ["Oak", "Maple", "Pine", "Indigenous species"],
    certifications: ["B Corp Certified", "1% for the Planet"],
  },
  {
    id: "one-tree-planted",
    name: "One Tree Planted",
    logo: "/placeholder.svg?height=60&width=120",
    description: "One dollar, one tree. Make a simple but meaningful impact with One Tree Planted.",
    costPerTree: 3.0,
    co2PerTree: 275, // kg
    waterSaved: 900, // liters
    habitatRestored: 3.5, // m²
    regions: ["North America", "Latin America", "Africa", "Asia", "Europe", "Pacific"],
    treeTypes: ["Various native species based on region"],
    certifications: ["American Forests", "Global Restoration Network"],
  },
  {
    id: "clean-hub",
    name: "CleanHub",
    logo: "/placeholder.svg?height=60&width=120",
    description: "CleanHub focuses on coastal reforestation and ocean plastic prevention.",
    costPerTree: 5.0,
    co2PerTree: 320, // kg
    waterSaved: 1100, // liters
    habitatRestored: 4.5, // m²
    regions: ["Coastal areas", "Islands", "Mangrove ecosystems"],
    treeTypes: ["Mangrove", "Coastal species", "Salt-tolerant varieties"],
    certifications: ["Ocean Cleanup Certified", "Plastic Neutral"],
  },
]

// Mock data for regions
const regions = [
  { id: "north-america", name: "North America" },
  { id: "south-america", name: "South America" },
  { id: "europe", name: "Europe" },
  { id: "africa", name: "Africa" },
  { id: "asia", name: "Asia" },
  { id: "oceania", name: "Oceania" },
  { id: "global", name: "Global" },
]

// Mock data for tree types
const treeTypes = [
  { id: "mangrove", name: "Mangrove" },
  { id: "oak", name: "Oak" },
  { id: "pine", name: "Pine" },
  { id: "maple", name: "Maple" },
  { id: "fruit", name: "Fruit Trees" },
  { id: "indigenous", name: "Indigenous Species" },
  { id: "mixed", name: "Mixed Varieties" },
]

// Mock data for impact priorities
const impactPriorities = [
  { id: "co2", name: "CO₂ Reduction" },
  { id: "biodiversity", name: "Biodiversity" },
  { id: "water", name: "Water Conservation" },
  { id: "communities", name: "Local Communities" },
  { id: "wildlife", name: "Wildlife Habitat" },
  { id: "balanced", name: "Balanced Impact" },
]

interface Recommendation {
  partner: string
  region: string
  treeType: string
  treeCount: number
  totalCost: number
  co2Reduction: number
  waterSaved: number
  habitatRestored: number
  description: string
}

export default function RecommendationsPage() {
  const { toast } = useToast()
  const [budget, setBudget] = useState<number>(100)
  const [region, setRegion] = useState<string>("global")
  const [treeType, setTreeType] = useState<string>("mixed")
  const [impactPriority, setImpactPriority] = useState<string>("balanced")
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null)
  const [aiExplanation, setAiExplanation] = useState<string>("")

  const generateRecommendations = async () => {
    setIsGenerating(true)

    try {
      // Generate basic recommendations based on user preferences
      const basicRecommendations = generateBasicRecommendations(budget, region, treeType, impactPriority)

      // Generate explanation synchronously to avoid any potential issues with setTimeout
      const explanation = `Based on your budget of $${budget} and preference for ${regions.find((r) => r.id === region)?.name || "global"} regions, I recommend focusing on ${basicRecommendations[0].partner} for your primary tree planting. This partner offers excellent ${impactPriorities.find((p) => p.id === impactPriority)?.name || "balanced"} impact, with strong CO₂ reduction and habitat restoration benefits. The suggested mix of tree types will provide optimal environmental benefits while staying within your budget.`

      setAiExplanation(explanation)
      setRecommendations(basicRecommendations)

      toast({
        title: "Recommendations Generated",
        description: "We've created personalized tree planting recommendations based on your preferences.",
      })

      setIsGenerating(false)
    } catch (error) {
      console.error("Error generating recommendations:", error)
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
      })
      setIsGenerating(false)
    }
  }

  // Function to generate basic recommendations based on user preferences
  const generateBasicRecommendations = (
    budget: number,
    region: string,
    treeType: string,
    impactPriority: string,
  ): Recommendation[] => {
    // Filter partners based on region preference
    let filteredPartners = [...partners]
    if (region !== "global") {
      const regionName = regions.find((r) => r.id === region)?.name
      filteredPartners = partners.filter((partner) =>
        partner.regions.some((r) => r.toLowerCase().includes(regionName?.toLowerCase() || "")),
      )

      // If no partners match the region, use all partners
      if (filteredPartners.length === 0) filteredPartners = [...partners]
    }

    // Sort partners based on impact priority
    if (impactPriority === "co2") {
      filteredPartners.sort((a, b) => b.co2PerTree - a.co2PerTree)
    } else if (impactPriority === "water") {
      filteredPartners.sort((a, b) => b.waterSaved - a.waterSaved)
    } else if (impactPriority === "biodiversity" || impactPriority === "wildlife") {
      filteredPartners.sort((a, b) => b.habitatRestored - a.habitatRestored)
    }

    // Generate recommendations
    const recommendations: Recommendation[] = []

    // Primary recommendation - best match for preferences
    const primaryPartner = filteredPartners[0]
    const treeCount = Math.floor((budget * 0.6) / primaryPartner.costPerTree)

    recommendations.push({
      partner: primaryPartner.name,
      region: primaryPartner.regions[0],
      treeType:
        treeType === "mixed"
          ? primaryPartner.treeTypes[0]
          : treeTypes.find((t) => t.id === treeType)?.name || primaryPartner.treeTypes[0],
      treeCount: treeCount,
      totalCost: treeCount * primaryPartner.costPerTree,
      co2Reduction: treeCount * primaryPartner.co2PerTree,
      waterSaved: treeCount * primaryPartner.waterSaved,
      habitatRestored: treeCount * primaryPartner.habitatRestored,
      description: primaryPartner.description,
    })

    // Secondary recommendation - different partner or region
    if (filteredPartners.length > 1) {
      const secondaryPartner = filteredPartners[1]
      const remainingBudget = budget - treeCount * primaryPartner.costPerTree
      const secondaryTreeCount = Math.floor(remainingBudget / secondaryPartner.costPerTree)

      if (secondaryTreeCount > 0) {
        recommendations.push({
          partner: secondaryPartner.name,
          region: secondaryPartner.regions[0],
          treeType:
            treeType === "mixed"
              ? secondaryPartner.treeTypes[0]
              : treeTypes.find((t) => t.id === treeType)?.name || secondaryPartner.treeTypes[0],
          treeCount: secondaryTreeCount,
          totalCost: secondaryTreeCount * secondaryPartner.costPerTree,
          co2Reduction: secondaryTreeCount * secondaryPartner.co2PerTree,
          waterSaved: secondaryTreeCount * secondaryPartner.waterSaved,
          habitatRestored: secondaryTreeCount * secondaryPartner.habitatRestored,
          description: secondaryPartner.description,
        })
      }
    }

    return recommendations
  }

  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">AI-Powered Tree Planting Recommendations</h1>
          <p className="text-gray-500 mt-2">
            Get personalized suggestions based on your preferences and environmental impact goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Preferences</CardTitle>
                <CardDescription>Tell us about your tree planting goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="budget">Your Budget (USD)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="budget"
                      min={10}
                      max={1000}
                      step={10}
                      value={[budget]}
                      onValueChange={(value) => setBudget(value[0])}
                      className="flex-1"
                    />
                    <span className="w-16 text-right font-medium">${budget}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Approximate trees: {Math.floor(budget / 3.5)}-{Math.floor(budget / 3)}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Preferred Region</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((r) => (
                        <SelectItem key={r.id} value={r.id}>
                          {r.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tree-type">Preferred Tree Type</Label>
                  <Select value={treeType} onValueChange={setTreeType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tree type" />
                    </SelectTrigger>
                    <SelectContent>
                      {treeTypes.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="impact-priority">Impact Priority</Label>
                  <Select value={impactPriority} onValueChange={setImpactPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select impact priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {impactPriorities.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={generateRecommendations}
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Recommendations"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {isGenerating ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <p className="text-lg font-medium">Generating Your Personalized Recommendations</p>
                  <p className="text-gray-500 text-center mt-2">
                    Our AI is analyzing your preferences and environmental data to find the best tree planting options
                    for you...
                  </p>
                </CardContent>
              </Card>
            ) : recommendations ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Recommendation Insights</CardTitle>
                    <CardDescription>Personalized analysis based on your preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-50 p-4 rounded-md">
                      <p className="text-gray-700">{aiExplanation}</p>
                    </div>
                  </CardContent>
                </Card>

                <Tabs defaultValue="recommendations">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                    <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
                  </TabsList>

                  <TabsContent value="recommendations" className="space-y-4 mt-4">
                    {recommendations.map((rec, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-1/3">
                              <div className="bg-green-100 p-4 rounded-md flex items-center justify-center h-full">
                                <Tree className="h-12 w-12 text-green-600" />
                              </div>
                            </div>
                            <div className="md:w-2/3 space-y-4">
                              <div>
                                <h3 className="text-xl font-bold">{rec.partner}</h3>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {rec.region}
                                </div>
                              </div>

                              <p className="text-gray-600">{rec.description}</p>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500">Trees</p>
                                  <p className="text-xl font-bold">{rec.treeCount}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Cost</p>
                                  <p className="text-xl font-bold">${rec.totalCost.toFixed(2)}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Tree Type</p>
                                  <p className="font-medium">{rec.treeType}</p>
                                </div>
                              </div>

                              <Button className="w-full bg-primary hover:bg-primary/90">Select This Option</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="impact" className="mt-4">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-4">Total Environmental Impact</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">CO₂ Reduction</CardTitle>
                              <Cloud className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">
                                {recommendations.reduce((sum, rec) => sum + rec.co2Reduction, 0).toLocaleString()} kg
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">Water Saved</CardTitle>
                              <Droplets className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">
                                {recommendations.reduce((sum, rec) => sum + rec.waterSaved, 0).toLocaleString()} liters
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">Habitat Restored</CardTitle>
                              <Leaf className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">
                                {recommendations.reduce((sum, rec) => sum + rec.habitatRestored, 0).toLocaleString()} m²
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-medium mb-2">What This Means</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>
                                Equivalent to taking{" "}
                                {Math.round(recommendations.reduce((sum, rec) => sum + rec.co2Reduction, 0) / 4000)}{" "}
                                cars off the road for a year
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>
                                Provides enough oxygen for{" "}
                                {Math.round(recommendations.reduce((sum, rec) => sum + rec.treeCount, 0) * 2)} people
                                annually
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Helps prevent soil erosion and improves water quality in local watersheds</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Creates habitat for wildlife and supports biodiversity</span>
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Tree className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Get Personalized Recommendations</h3>
                  <p className="text-gray-500 max-w-md">
                    Fill in your preferences and click "Generate Recommendations" to receive AI-powered suggestions for
                    your tree planting journey.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

