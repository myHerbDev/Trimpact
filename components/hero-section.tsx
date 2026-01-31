"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

export function HeroSection() {
  const [imgError, setImgError] = useState(false)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-green-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="mb-6 h-[60px] flex items-center justify-center">
            {!imgError ? (
              <div className="relative h-[60px] w-[219px]">
                <Image
                  src="/images/myherb-logo.png"
                  alt="myHerb Logo"
                  fill
                  className="mx-auto object-contain"
                  onError={() => setImgError(true)}
                  priority
                />
              </div>
            ) : (
              <div className="text-2xl font-bold">🌱 myHerb</div>
            )}
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Plant Trees, Change Lives
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Join thousands of people making a positive impact on our planet through reforestation efforts.
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/calculator">
                Calculate Your Impact <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/learn">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

