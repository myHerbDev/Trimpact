"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import {
  Building2,
  TreesIcon as Tree,
  Users,
  Globe,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Award,
  Leaf,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for corporate partners
const partners = [
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "/placeholder.svg?height=80&width=160",
    description:
      "Microsoft has partnered with Trimpact to plant 50,000 trees as part of their carbon neutrality commitment.",
    treesPlanted: 32500,
    treesGoal: 50000,
    since: "2023",
    featured: true,
  },
  {
    id: "patagonia",
    name: "Patagonia",
    logo: "/placeholder.svg?height=80&width=160",
    description:
      "Patagonia supports reforestation efforts through Trimpact with a commitment to plant 25,000 trees annually.",
    treesPlanted: 18750,
    treesGoal: 25000,
    since: "2023",
    featured: true,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    logo: "/placeholder.svg?height=80&width=160",
    description: "Salesforce has joined Trimpact to plant 30,000 trees as part of their 1T.org commitment.",
    treesPlanted: 15000,
    treesGoal: 30000,
    since: "2023",
    featured: true,
  },
  {
    id: "ikea",
    name: "IKEA",
    logo: "/placeholder.svg?height=80&width=160",
    description: "IKEA is working with Trimpact to restore forests and promote sustainable forestry practices.",
    treesPlanted: 12000,
    treesGoal: 20000,
    since: "2023",
    featured: false,
  },
  {
    id: "unilever",
    name: "Unilever",
    logo: "/placeholder.svg?height=80&width=160",
    description: "Unilever has partnered with Trimpact to support biodiversity and combat deforestation.",
    treesPlanted: 8500,
    treesGoal: 15000,
    since: "2023",
    featured: false,
  },
  {
    id: "google",
    name: "Google",
    logo: "/placeholder.svg?height=80&width=160",
    description: "Google is supporting Trimpact's reforestation efforts as part of their sustainability initiatives.",
    treesPlanted: 10000,
    treesGoal: 20000,
    since: "2024",
    featured: false,
  },
]

// Mock data for partnership tiers
const partnershipTiers = [
  {
    id: "seed",
    name: "Seed Partner",
    minTrees: 1000,
    cost: 3500,
    benefits: [
      "Company logo on Trimpact website",
      "Digital impact certificate",
      "Monthly impact reports",
      "Employee engagement toolkit",
    ],
  },
  {
    id: "sapling",
    name: "Sapling Partner",
    minTrees: 5000,
    cost: 17500,
    benefits: [
      "Company logo on Trimpact website",
      "Digital impact certificate",
      "Monthly impact reports",
      "Employee engagement toolkit",
      "Dedicated account manager",
      "Customized impact dashboard",
      "Social media recognition",
    ],
  },
  {
    id: "forest",
    name: "Forest Partner",
    minTrees: 20000,
    cost: 70000,
    benefits: [
      "Company logo on Trimpact website",
      "Digital impact certificate",
      "Monthly impact reports",
      "Employee engagement toolkit",
      "Dedicated account manager",
      "Customized impact dashboard",
      "Social media recognition",
      "Featured partner spotlight",
      "On-site tree planting event",
      "Co-branded marketing materials",
      "Annual impact presentation",
    ],
  },
]

export default function CorporatePage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("partners")
  const [contactForm, setContactForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    companySize: "",
    message: "",
    newsletter: true,
  })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Inquiry Submitted",
      description: "Thank you for your interest in corporate partnerships. Our team will contact you shortly.",
    })

    // Reset form
    setContactForm({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      companySize: "",
      message: "",
      newsletter: true,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setContactForm((prev) => ({
      ...prev,
      newsletter: checked,
    }))
  }

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Corporate Partnerships</h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Join leading companies in making a positive impact on our planet through reforestation efforts
          </p>
        </div>

        <Tabs defaultValue="partners" value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="partners">
              <Building2 className="h-4 w-4 mr-2" />
              Our Partners
            </TabsTrigger>
            <TabsTrigger value="programs">
              <Briefcase className="h-4 w-4 mr-2" />
              Partnership Programs
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Mail className="h-4 w-4 mr-2" />
              Get in Touch
            </TabsTrigger>
          </TabsList>

          <TabsContent value="partners" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Corporate Partners</CardTitle>
                  <Building2 className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{partners.length}</div>
                  <p className="text-xs text-gray-500">Companies committed to reforestation</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Trees Pledged</CardTitle>
                  <Tree className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {partners.reduce((sum, partner) => sum + partner.treesGoal, 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-500">Total corporate commitment</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Trees Planted</CardTitle>
                  <Leaf className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {partners.reduce((sum, partner) => sum + partner.treesPlanted, 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-500">Progress towards goals</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mb-6">Featured Partners</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {partners
                .filter((partner) => partner.featured)
                .map((partner) => (
                  <Card key={partner.id} className="overflow-hidden">
                    <div className="p-6 bg-gray-50 flex items-center justify-center h-40 border-b">
                      <div className="relative w-32 h-16">
                        <Image
                          src={partner.logo || "/placeholder.svg"}
                          alt={`${partner.name} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{partner.name}</h3>
                      <p className="text-gray-500 text-sm mb-4">{partner.description}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{partner.treesPlanted.toLocaleString()} trees</span>
                          <span>{partner.treesGoal.toLocaleString()} goal</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(partner.treesPlanted / partner.treesGoal) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500">Partner since {partner.since}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            <h2 className="text-2xl font-bold mb-6">All Corporate Partners</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners
                .filter((partner) => !partner.featured)
                .map((partner) => (
                  <Card key={partner.id} className="flex">
                    <div className="p-4 bg-gray-50 flex items-center justify-center w-1/3 border-r">
                      <div className="relative w-24 h-12">
                        <Image
                          src={partner.logo || "/placeholder.svg"}
                          alt={`${partner.name} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="p-4 w-2/3">
                      <h3 className="font-bold mb-1">{partner.name}</h3>
                      <p className="text-gray-500 text-xs mb-2 line-clamp-2">{partner.description}</p>
                      <div className="text-xs">
                        <span className="font-medium">{partner.treesPlanted.toLocaleString()}</span>
                        <span className="text-gray-500"> of {partner.treesGoal.toLocaleString()} trees</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div
                          className="bg-primary h-1 rounded-full"
                          style={{ width: `${(partner.treesPlanted / partner.treesGoal) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-500 mb-4">Want to join these companies in making a difference?</p>
              <Button onClick={() => setActiveTab("contact")} className="bg-primary hover:bg-primary/90">
                Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="programs" className="mt-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Corporate Partnership Programs</h2>
              <p className="text-gray-500">
                Trimpact offers flexible partnership programs designed to align with your company's sustainability goals
                and CSR initiatives. Choose the program that best fits your organization's vision and commitment level.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {partnershipTiers.map((tier) => (
                <Card key={tier.id} className={`overflow-hidden ${tier.id === "forest" ? "border-primary" : ""}`}>
                  {tier.id === "forest" && (
                    <div className="bg-primary text-white text-center py-1 text-sm font-medium">Most Popular</div>
                  )}
                  <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <CardDescription>{tier.minTrees.toLocaleString()} trees minimum commitment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-6">
                      ${tier.cost.toLocaleString()}
                      <span className="text-sm font-normal text-gray-500"> starting at</span>
                    </div>

                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={`w-full ${tier.id === "forest" ? "bg-primary hover:bg-primary/90" : ""}`}
                      variant={tier.id === "forest" ? "default" : "outline"}
                      onClick={() => setActiveTab("contact")}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Engagement</CardTitle>
                  <CardDescription>Involve your employees in your sustainability journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h4 className="font-medium">Team Challenges</h4>
                        <p className="text-sm text-gray-500">
                          Create friendly competition between departments or teams to plant the most trees.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Award className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h4 className="font-medium">Employee Recognition</h4>
                        <p className="text-sm text-gray-500">
                          Reward employees for sustainable actions by planting trees in their name.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Globe className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h4 className="font-medium">Volunteer Opportunities</h4>
                        <p className="text-sm text-gray-500">
                          Organize tree planting events for employees to participate in directly.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Custom Programs</CardTitle>
                  <CardDescription>Tailored solutions for your specific sustainability goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h4 className="font-medium">Product Integration</h4>
                        <p className="text-sm text-gray-500">
                          Plant trees for each product sold or service provided to customers.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Building2 className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h4 className="font-medium">Carbon Offset Programs</h4>
                        <p className="text-sm text-gray-500">
                          Offset your company's carbon footprint through strategic tree planting initiatives.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Leaf className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h4 className="font-medium">Branded Forests</h4>
                        <p className="text-sm text-gray-500">
                          Create a dedicated forest with your company name and track its growth over time.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Why Partner with Trimpact?</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    Environmental Impact
                  </h4>
                  <p className="text-sm text-gray-500">
                    Make a tangible difference in combating climate change and restoring biodiversity.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    Brand Reputation
                  </h4>
                  <p className="text-sm text-gray-500">
                    Enhance your company's image as an environmentally responsible organization.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    Employee Engagement
                  </h4>
                  <p className="text-sm text-gray-500">
                    Boost morale and retention by involving employees in meaningful sustainability initiatives.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    Transparent Reporting
                  </h4>
                  <p className="text-sm text-gray-500">
                    Receive detailed impact reports to share with stakeholders and include in sustainability reporting.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    Marketing Opportunities
                  </h4>
                  <p className="text-sm text-gray-500">
                    Leverage your environmental commitment in marketing and communications.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    Community Support
                  </h4>
                  <p className="text-sm text-gray-500">
                    Support local communities where tree planting projects are implemented.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button onClick={() => setActiveTab("contact")} className="bg-primary hover:bg-primary/90">
                  Contact Us to Learn More
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-gray-500 mb-6">
                  Interested in becoming a corporate partner? Fill out the form and our team will contact you to discuss
                  partnership opportunities that align with your company's sustainability goals.
                </p>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={contactForm.companyName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Person *</Label>
                      <Input
                        id="contactName"
                        name="contactName"
                        value={contactForm.contactName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={contactForm.phone}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select
                        name="companySize"
                        value={contactForm.companySize}
                        onValueChange={(value) => setContactForm((prev) => ({ ...prev, companySize: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-50">1-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="501-1000">501-1000 employees</SelectItem>
                          <SelectItem value="1001+">1001+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your sustainability goals and how you'd like to partner with us"
                        className="min-h-[120px]"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={contactForm.newsletter}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <label
                        htmlFor="newsletter"
                        className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Subscribe to our corporate newsletter for sustainability insights and updates
                      </label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Submit Inquiry
                  </Button>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Corporate Partnership Benefits</h2>

                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-bold mb-4">Why Partner with Trimpact?</h3>

                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Measurable Environmental Impact</h4>
                        <p className="text-sm text-gray-500">
                          Make a tangible difference in combating climate change with transparent reporting on your
                          contribution.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Enhanced Brand Reputation</h4>
                        <p className="text-sm text-gray-500">
                          Demonstrate your commitment to sustainability and strengthen your brand image.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Employee Engagement</h4>
                        <p className="text-sm text-gray-500">
                          Boost morale and retention by involving employees in meaningful sustainability initiatives.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Marketing Opportunities</h4>
                        <p className="text-sm text-gray-500">
                          Leverage your environmental commitment in marketing and communications with co-branded
                          materials.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-bold mb-4">Featured Case Study</h3>

                  <div className="mb-4">
                    <div className="bg-white p-4 rounded-md flex items-center justify-center mb-4">
                      <div className="relative w-32 h-16">
                        <Image
                          src="/placeholder.svg?height=80&width=160"
                          alt="Microsoft logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <h4 className="font-medium">Microsoft's Reforestation Initiative</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Microsoft partnered with Trimpact to plant 50,000 trees as part of their carbon neutrality
                      commitment. The initiative has already resulted in 32,500 trees planted across three continents,
                      with an estimated CO₂ reduction of 8,125 tons per year.
                    </p>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm">
                        <span>32,500 trees planted</span>
                        <span>50,000 goal</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2 mt-1">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <Link href="/case-studies/microsoft" className="text-primary hover:underline text-sm font-medium">
                      Read the full case study <ArrowRight className="h-3 w-3 inline ml-1" />
                    </Link>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-bold mb-4">Contact Information</h3>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-primary mr-3" />
                      <span>corporate@trimpact.com</span>
                    </div>

                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-primary mr-3" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

