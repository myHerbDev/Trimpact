import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MapPin } from "lucide-react"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    location: string
    image: string
    progress: number
    treesPlanted: number
    treesGoal: number
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {project.location}
        </div>
        <h3 className="font-bold text-lg mb-2">{project.title}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{project.treesPlanted.toLocaleString()} trees</span>
            <span>{project.treesGoal.toLocaleString()} goal</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-primary/90">
          <Link href={`/projects/${project.id}`}>Contribute</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
