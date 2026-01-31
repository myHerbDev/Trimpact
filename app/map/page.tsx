"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, TreesIcon as Tree } from "lucide-react"

// Mock data for projects
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
    coordinates: { lat: -3.4653, lng: -62.2159 },
    type: "rainforest",
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
    coordinates: { lat: 0.9619, lng: 114.5548 },
    type: "wildlife",
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
    coordinates: { lat: 38.5816, lng: -121.4944 },
    type: "recovery",
  },
  {
    id: "p4",
    title: "Scottish Highlands Reforestation",
    description: "Restore the ancient Caledonian Forest in the Scottish Highlands.",
    location: "United Kingdom",
    image: "/placeholder.svg?height=200&width=300",
    progress: 35,
    treesPlanted: 7000,
    treesGoal: 20000,
    coordinates: { lat: 57.3601, lng: -4.406 },
    type: "reforestation",
  },
  {
    id: "p5",
    title: "Madagascar Mangrove Restoration",
    description: "Plant mangrove trees to protect coastal communities and marine ecosystems.",
    location: "Madagascar",
    image: "/placeholder.svg?height=200&width=300",
    progress: 52,
    treesPlanted: 10400,
    treesGoal: 20000,
    coordinates: { lat: -18.7669, lng: 46.8691 },
    type: "coastal",
  },
  {
    id: "p6",
    title: "Himalayan Forest Conservation",
    description: "Protect and restore forests in the Himalayan mountain range.",
    location: "Nepal",
    image: "/placeholder.svg?height=200&width=300",
    progress: 28,
    treesPlanted: 5600,
    treesGoal: 20000,
    coordinates: { lat: 28.3949, lng: 84.124 },
    type: "conservation",
  },
]

export default function MapPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  useEffect(() => {
    // Filter projects based on search term and selected type
    const filtered = projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = selectedType === "all" || project.type === selectedType

      return matchesSearch && matchesType
    })

    setFilteredProjects(filtered)
  }, [searchTerm, selectedType])

  useEffect(() => {
    // This would be replaced with actual map initialization code
    // For demonstration purposes, we're just simulating the map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Map</h1>
          <p className="text-gray-500">Explore reforestation projects around the world</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Search Projects</CardTitle>
              <CardDescription>Find projects by name, location, or description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search projects..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Filter by type</Label>
                  <Tabs defaultValue="all" value={selectedType} onValueChange={setSelectedType}>
                    <TabsList className="grid grid-cols-3 mb-2">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="rainforest">Rainforest</TabsTrigger>
                      <TabsTrigger value="wildlife">Wildlife</TabsTrigger>
                    </TabsList>
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="recovery">Recovery</TabsTrigger>
                      <TabsTrigger value="coastal">Coastal</TabsTrigger>
                      <TabsTrigger value="conservation">Conservation</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Projects ({filteredProjects.length})</h2>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className={`cursor-pointer transition-all ${selectedProject === project.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedProject(project.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                          <Tree className="h-8 w-8 text-green-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold">{project.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {project.location}
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-1">{project.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No projects found matching your criteria</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedType("all")
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-12rem)]">
            <CardContent className="p-0 h-full">
              {mapLoaded ? (
                <div className="relative w-full h-full bg-gray-100 rounded-md overflow-hidden">
                  {/* This would be replaced with an actual map component */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-500 mb-2">Interactive map would be displayed here</p>
                      <p className="text-sm text-gray-400">Using libraries like Google Maps, Mapbox, or Leaflet</p>
                    </div>
                  </div>

                  {/* Simulated map markers */}
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className={`absolute w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                        selectedProject === project.id ? "w-8 h-8 z-10" : ""
                      }`}
                      style={{
                        left: `${((project.coordinates.lng + 180) / 360) * 100}%`,
                        top: `${((90 - project.coordinates.lat) / 180) * 100}%`,
                      }}
                      onClick={() => setSelectedProject(project.id)}
                    >
                      <MapPin className="h-3 w-3" />
                    </div>
                  ))}

                  {/* Project info popup */}
                  {selectedProject && (
                    <div
                      className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-md shadow-lg"
                      style={{ maxWidth: "400px" }}
                    >
                      {(() => {
                        const project = projects.find((p) => p.id === selectedProject)
                        if (!project) return null

                        return (
                          <>
                            <h3 className="font-bold mb-1">{project.title}</h3>
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <MapPin className="h-3 w-3 mr-1" />
                              {project.location}
                            </div>
                            <p className="text-sm text-gray-500 mb-3">{project.description}</p>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{project.treesPlanted.toLocaleString()} trees planted</span>
                              <span>{project.treesGoal.toLocaleString()} goal</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <Button asChild className="w-full bg-primary hover:bg-primary/90">
                              <a href={`/projects/${project.id}`}>View Project</a>
                            </Button>
                          </>
                        )
                      })()}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
