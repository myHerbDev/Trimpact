import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Leaf, Globe, Users, Award } from "lucide-react"
import { FeatureCard } from "@/components/feature-card"
import { ImpactCounter } from "@/components/impact-counter"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />

      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Global Impact</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Together we're making a difference for our planet
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <ImpactCounter title="Trees Planted" count={1250000} icon={<Leaf className="h-6 w-6 text-green-500" />} />
              <ImpactCounter
                title="CO₂ Reduced"
                count={375000}
                unit="tons"
                icon={<Globe className="h-6 w-6 text-blue-500" />}
              />
              <ImpactCounter
                title="Active Members"
                count={45000}
                icon={<Users className="h-6 w-6 text-purple-500" />}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How Trimpact Works</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our community and start making a difference today
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <FeatureCard
                title="Calculate Your Impact"
                description="Use our tools to understand your environmental footprint and how many trees you need to plant to offset it."
                icon={
                  <div className="rounded-full bg-green-100 p-3 mb-4">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                }
                number={1}
              />
              <FeatureCard
                title="Plant Trees"
                description="Choose from various reforestation projects around the world and contribute directly to planting efforts."
                icon={
                  <div className="rounded-full bg-green-100 p-3 mb-4">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </div>
                }
                number={2}
              />
              <FeatureCard
                title="Track Progress"
                description="Monitor your contribution, earn rewards, and share your achievements with friends and family."
                icon={
                  <div className="rounded-full bg-green-100 p-3 mb-4">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                }
                number={3}
              />
            </div>

            <div className="mt-10">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                Join Our Global Community
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed mb-8">
                Connect with like-minded individuals, participate in challenges, and collaborate on reforestation
                projects around the world.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="outline" size="lg">
                  <Link href="/community">Explore Community</Link>
                </Button>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/projects">Browse Projects</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=1200"
                alt="Community of tree planters"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Achievements & Rewards</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Earn badges, climb the leaderboard, and get rewarded for your environmental contributions
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-8">
              {[
                { name: "Seedling", description: "Plant your first tree", icon: "🌱" },
                { name: "Gardener", description: "Plant 10 trees", icon: "🌿" },
                { name: "Forester", description: "Plant 50 trees", icon: "🌳" },
                { name: "Conservationist", description: "Plant 100 trees", icon: "🌍" },
                { name: "Earth Guardian", description: "Plant 500 trees", icon: "🌎" },
                { name: "Climate Hero", description: "Plant 1000 trees", icon: "🏆" },
              ].map((badge, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <h3 className="font-medium text-sm">{badge.name}</h3>
                    <p className="text-xs text-gray-500">{badge.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10">
              <Button asChild variant="outline" size="lg">
                <Link href="/rewards">
                  View All Rewards <Award className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
