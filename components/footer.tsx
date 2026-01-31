import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold">🌱 Trimpact</span>
            </Link>
            <p className="text-gray-500 mb-4">Making a positive impact on our planet through reforestation efforts.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-4">Plant Trees</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/calculator" className="text-gray-500 hover:text-primary">
                  Calculator
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-500 hover:text-primary">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-gray-500 hover:text-primary">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/custom-plan" className="text-gray-500 hover:text-primary">
                  Custom Plans
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Learn</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/learn/articles" className="text-gray-500 hover:text-primary">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/learn/videos" className="text-gray-500 hover:text-primary">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/learn/infographics" className="text-gray-500 hover:text-primary">
                  Infographics
                </Link>
              </li>
              <li>
                <Link href="/learn/faq" className="text-gray-500 hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Subscribe to our newsletter</h3>
            <p className="text-gray-500 mb-4">Stay updated with our latest projects and impact.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="max-w-[220px]" />
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Trimpact by myHerb.co.il. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-500 hover:text-primary text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-primary text-sm">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-primary text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

