"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import {
  CreditCard,
  DollarSign,
  TreesIcon as Tree,
  Calendar,
  Gift,
  Heart,
  Share2,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Info,
} from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

// Tree planting partners data
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

// Fund types
const fundTypes = [
  {
    id: "general",
    name: "General Reforestation Fund",
    description: "Support tree planting where it's needed most across all our partner projects.",
  },
  {
    id: "biodiversity",
    name: "Biodiversity Fund",
    description: "Focus on planting diverse native species to restore and enhance biodiversity.",
  },
  {
    id: "carbon-offset",
    name: "Carbon Offset Fund",
    description: "Plant trees specifically to maximize carbon sequestration and offset emissions.",
  },
  {
    id: "community",
    name: "Community Development Fund",
    description: "Support tree planting projects that provide economic benefits to local communities.",
  },
  {
    id: "water",
    name: "Watershed Protection Fund",
    description: "Plant trees to protect watersheds, prevent erosion, and improve water quality.",
  },
]

export default function DonatePage() {
  const { toast } = useToast()
  const [donationType, setDonationType] = useState("one-time")
  const [donationAmount, setDonationAmount] = useState("25")
  const [customAmount, setCustomAmount] = useState("")
  const [selectedProject, setSelectedProject] = useState("all")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isRecurring, setIsRecurring] = useState(false)
  const [donationCompleted, setDonationCompleted] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState("tree-nation")
  const [selectedFundType, setSelectedFundType] = useState("general")
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [donationDetails, setDonationDetails] = useState<{
    amount: string
    trees: number
    project?: string
    partner?: string
    fundType?: string
  } | null>(null)

  // Get the selected partner data
  const partnerData = partners.find((p) => p.id === selectedPartner)

  // Calculate trees based on amount and partner cost
  const calculateTrees = (amount: string, partnerId: string) => {
    const partner = partners.find((p) => p.id === partnerId)
    if (!partner) return 0
    return Math.floor(Number(amount) / partner.costPerTree)
  }

  // Calculate total cost based on trees and partner
  const calculateCost = (trees: number, partnerId: string) => {
    const partner = partners.find((p) => p.id === partnerId)
    if (!partner) return 0
    return trees * partner.costPerTree
  }

  // Calculate trees based on current amount and selected partner
  const treesCount = calculateTrees(customAmount || donationAmount, selectedPartner)

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setDonationCompleted(true)

      const amount = customAmount || donationAmount
      const trees = calculateTrees(amount, selectedPartner)
      const projectName =
        selectedProject === "all"
          ? "Global Reforestation Fund"
          : projects.find((p) => p.id === selectedProject)?.title || "Unknown Project"
      const partnerName = partners.find((p) => p.id === selectedPartner)?.name || "Unknown Partner"
      const fundTypeName = fundTypes.find((f) => f.id === selectedFundType)?.name || "General Fund"

      setDonationDetails({
        amount,
        trees,
        project: projectName,
        partner: partnerName,
        fundType: fundTypeName,
      })

      toast({
        title: "Donation Successful",
        description: `Thank you for your donation of $${amount}. You've helped plant ${trees} trees with ${partnerName}!`,
      })
    }, 2000)
  }

  const handleInviteFriend = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate sending invitation
    toast({
      title: "Invitation Sent",
      description: `Your invitation has been sent to ${inviteEmail}`,
    })

    setInviteEmail("")
    setShowShareDialog(false)
  }

  const handleSocialShare = (platform: string) => {
    // In a real app, this would open a share dialog for the specific platform
    toast({
      title: "Shared Successfully",
      description: `Your tree planting achievement has been shared on ${platform}`,
    })

    setShowShareDialog(false)
  }

  // For example, if there's a date formatting function using date-fns, replace it with:
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Plant Trees, Change Lives</h1>
          <p className="text-gray-500 mt-2">Your donation directly supports reforestation projects around the world</p>
        </div>

        {!donationCompleted ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Make a Donation</CardTitle>
                  <CardDescription>Choose how you'd like to contribute to reforestation efforts</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDonationSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <Label>Donation Type</Label>
                      <RadioGroup
                        value={donationType}
                        onValueChange={setDonationType}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="one-time" id="one-time" />
                          <Label htmlFor="one-time" className="flex items-center">
                            <DollarSign className="mr-2 h-4 w-4 text-primary" />
                            One-time Donation
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" onClick={() => setIsRecurring(true)} />
                          <Label htmlFor="monthly" className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-primary" />
                            Monthly Donation
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gift" id="gift" />
                          <Label htmlFor="gift" className="flex items-center">
                            <Gift className="mr-2 h-4 w-4 text-primary" />
                            Gift a Donation
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="corporate" id="corporate" />
                          <Label htmlFor="corporate" className="flex items-center">
                            <Heart className="mr-2 h-4 w-4 text-primary" />
                            Corporate Giving
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label>Donation Amount</Label>
                      <RadioGroup
                        value={donationAmount}
                        onValueChange={(value) => {
                          setDonationAmount(value)
                          if (value !== "custom") setCustomAmount("")
                        }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                      >
                        <div className="flex items-center justify-center">
                          <RadioGroupItem value="10" id="amount-10" className="sr-only" />
                          <Label
                            htmlFor="amount-10"
                            className={`flex h-14 w-full cursor-pointer items-center justify-center rounded-md border-2 ${
                              donationAmount === "10" ? "border-primary bg-primary/10" : "border-muted"
                            }`}
                          >
                            $10
                          </Label>
                        </div>
                        <div className="flex items-center justify-center">
                          <RadioGroupItem value="25" id="amount-25" className="sr-only" />
                          <Label
                            htmlFor="amount-25"
                            className={`flex h-14 w-full cursor-pointer items-center justify-center rounded-md border-2 ${
                              donationAmount === "25" ? "border-primary bg-primary/10" : "border-muted"
                            }`}
                          >
                            $25
                          </Label>
                        </div>
                        <div className="flex items-center justify-center">
                          <RadioGroupItem value="50" id="amount-50" className="sr-only" />
                          <Label
                            htmlFor="amount-50"
                            className={`flex h-14 w-full cursor-pointer items-center justify-center rounded-md border-2 ${
                              donationAmount === "50" ? "border-primary bg-primary/10" : "border-muted"
                            }`}
                          >
                            $50
                          </Label>
                        </div>
                        <div className="flex items-center justify-center">
                          <RadioGroupItem value="100" id="amount-100" className="sr-only" />
                          <Label
                            htmlFor="amount-100"
                            className={`flex h-14 w-full cursor-pointer items-center justify-center rounded-md border-2 ${
                              donationAmount === "100" ? "border-primary bg-primary/10" : "border-muted"
                            }`}
                          >
                            $100
                          </Label>
                        </div>
                        <div className="col-span-2 sm:col-span-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="custom" id="amount-custom" />
                            <Label htmlFor="amount-custom" className="flex-1">
                              <div className="flex items-center">
                                <span className="mr-2">Custom Amount:</span>
                                <div className="relative flex-1">
                                  <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                  <Input
                                    type="number"
                                    min="1"
                                    placeholder="Enter amount"
                                    className="pl-8"
                                    value={customAmount}
                                    onChange={(e) => {
                                      setCustomAmount(e.target.value)
                                      setDonationAmount("custom")
                                    }}
                                  />
                                </div>
                              </div>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Tree Planting Partner Selection */}
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <Label>Choose a Tree Planting Partner</Label>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Info className="h-4 w-4 mr-2" />
                              Compare Partners
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Tree Planting Partner Comparison</DialogTitle>
                              <DialogDescription>
                                Compare the different tree planting partners and their impact
                              </DialogDescription>
                            </DialogHeader>
                            <div className="overflow-x-auto">
                              <Table>
                                <TableCaption>Comparison of tree planting partners</TableCaption>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Partner</TableHead>
                                    <TableHead>Cost per Tree</TableHead>
                                    <TableHead>CO₂ Reduction</TableHead>
                                    <TableHead>Water Saved</TableHead>
                                    <TableHead>Habitat Restored</TableHead>
                                    <TableHead>Regions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {partners.map((partner) => (
                                    <TableRow key={partner.id}>
                                      <TableCell className="font-medium">{partner.name}</TableCell>
                                      <TableCell>${partner.costPerTree.toFixed(2)}</TableCell>
                                      <TableCell>{partner.co2PerTree} kg</TableCell>
                                      <TableCell>{partner.waterSaved} liters</TableCell>
                                      <TableCell>{partner.habitatRestored} m²</TableCell>
                                      <TableCell>{partner.regions.join(", ")}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {partners.map((partner) => (
                          <div key={partner.id} className="flex flex-col">
                            <button
                              type="button"
                              className={`flex flex-col items-center justify-center p-4 rounded-md border-2 ${
                                selectedPartner === partner.id ? "border-primary bg-primary/10" : "border-muted"
                              } hover:border-primary/50 transition-colors`}
                              onClick={() => setSelectedPartner(partner.id)}
                            >
                              <div className="w-full h-12 bg-gray-100 rounded flex items-center justify-center mb-2">
                                <span className="text-sm font-medium">{partner.name}</span>
                              </div>
                              <div className="text-xs text-center text-gray-500 mt-1">
                                ${partner.costPerTree.toFixed(2)}/tree
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex items-center mb-2">
                          <h3 className="font-medium">{partnerData?.name} Details</h3>
                          {selectedPartner && (
                            <div className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              ${partnerData?.costPerTree.toFixed(2)}/tree
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{partnerData?.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                          <div>
                            <span className="font-medium">Regions:</span> {partnerData?.regions.join(", ")}
                          </div>
                          <div>
                            <span className="font-medium">Tree Types:</span>{" "}
                            {Array.isArray(partnerData?.treeTypes)
                              ? partnerData?.treeTypes.join(", ")
                              : partnerData?.treeTypes}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fund Type Selection */}
                    <div className="space-y-4">
                      <Label htmlFor="fund-type">Choose a Fund Type</Label>
                      <Select value={selectedFundType} onValueChange={setSelectedFundType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a fund type" />
                        </SelectTrigger>
                        <SelectContent>
                          {fundTypes.map((fund) => (
                            <SelectItem key={fund.id} value={fund.id}>
                              {fund.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-600">
                          {fundTypes.find((f) => f.id === selectedFundType)?.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="project">Choose a Project (Optional)</Label>
                      <Select value={selectedProject} onValueChange={setSelectedProject}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Global Reforestation Fund</SelectItem>
                          {projects.map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-4">Payment Information</h3>

                      <Tabs defaultValue="card">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="card">Credit Card</TabsTrigger>
                          <TabsTrigger value="paypal">PayPal</TabsTrigger>
                          <TabsTrigger value="apple">Apple Pay</TabsTrigger>
                        </TabsList>

                        <TabsContent value="card" className="space-y-4 mt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <Label htmlFor="card-name">Cardholder Name</Label>
                              <Input id="card-name" placeholder="John Doe" className="mt-1" />
                            </div>
                            <div className="col-span-2">
                              <Label htmlFor="card-number">Card Number</Label>
                              <div className="relative mt-1">
                                <CreditCard className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                <Input id="card-number" placeholder="1234 5678 9012 3456" className="pl-8" />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                            </div>
                            <div>
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" className="mt-1" />
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="paypal" className="mt-4">
                          <div className="text-center py-8 bg-gray-50 rounded-md">
                            <p className="text-gray-500 mb-4">
                              You will be redirected to PayPal to complete your donation.
                            </p>
                            <Button type="button" variant="outline">
                              Continue with PayPal
                            </Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="apple" className="mt-4">
                          <div className="text-center py-8 bg-gray-50 rounded-md">
                            <p className="text-gray-500 mb-4">Complete your donation with Apple Pay.</p>
                            <Button type="button" variant="outline">
                              Pay with Apple Pay
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    {isRecurring && (
                      <div className="flex items-center space-x-2">
                        <Checkbox id="recurring" checked={true} />
                        <label
                          htmlFor="recurring"
                          className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I understand this is a recurring monthly donation that will continue until canceled.
                        </label>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms and conditions and privacy policy.
                      </label>
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Processing...
                        </>
                      ) : (
                        `Donate ${donationAmount === "custom" ? `$${customAmount}` : `$${donationAmount}`}`
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Your Impact</CardTitle>
                  <CardDescription>See the difference your donation will make</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <Tree className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-medium">Trees Planted</h3>
                    </div>
                    <p className="text-3xl font-bold">{treesCount}</p>
                    <p className="text-sm text-gray-500">
                      With {partnerData?.name} at ${partnerData?.costPerTree.toFixed(2)} per tree
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Environmental Benefits</h3>
                    <ul className="text-sm text-gray-500 space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>
                          Absorbs approximately {treesCount * (partnerData?.co2PerTree || 0)}kg of CO₂ per year
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Saves {treesCount * (partnerData?.waterSaved || 0)} liters of water</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Restores {treesCount * (partnerData?.habitatRestored || 0)}m² of habitat</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Improves air and water quality</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Social Benefits</h3>
                    <ul className="text-sm text-gray-500 space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Creates jobs in local communities</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Provides sustainable income sources</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Supports indigenous land rights</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Partner Price Comparison</h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {partners.map((partner) => (
                        <div
                          key={partner.id}
                          className={`p-2 rounded-md ${selectedPartner === partner.id ? "bg-primary/10 border border-primary" : "bg-gray-50"}`}
                        >
                          <div className="font-medium">{partner.name}</div>
                          <div>${partner.costPerTree.toFixed(2)} per tree</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button type="button" variant="outline" className="w-full" onClick={() => setShowShareDialog(true)}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Invite Friends to Donate
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Tree className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Thank You for Your Donation!</CardTitle>
              <CardDescription>Your contribution is making a real difference for our planet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Amount Donated</p>
                  <p className="text-2xl font-bold">${donationDetails?.amount}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-500">Trees Planted</p>
                  <p className="text-2xl font-bold">{donationDetails?.trees}</p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-md">
                <h3 className="font-medium mb-2">Donation Details</h3>
                <p className="text-sm text-gray-600">
                  Your donation to <strong>{donationDetails?.project}</strong> through{" "}
                  <strong>{donationDetails?.partner}</strong> will help plant {donationDetails?.trees} trees, which will
                  absorb approximately {(donationDetails?.trees || 0) * 25}kg of CO₂ per year.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Fund type: <strong>{donationDetails?.fundType}</strong>
                </p>
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm text-gray-500">A receipt has been sent to your email address.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="outline" onClick={() => setShowShareDialog(true)}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share with Friends
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90" onClick={() => setDonationCompleted(false)}>
                    Make Another Donation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share with Friends</DialogTitle>
            <DialogDescription>
              Invite your friends to join you in planting trees and making a difference
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Share via Email</h3>
              <form onSubmit={handleInviteFriend} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="email"
                    placeholder="friend@example.com"
                    className="pl-8"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit">Send</Button>
              </form>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Share on Social Media</h3>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => handleSocialShare("Facebook")}>
                  <Facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => handleSocialShare("Twitter")}>
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => handleSocialShare("Instagram")}>
                  <Instagram className="mr-2 h-4 w-4" />
                  Instagram
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium mb-2">Share this Link</h3>
              <div className="flex gap-2">
                <Input
                  value="https://trimpact.myherb.co/donate?ref=share"
                  readOnly
                  onClick={(e) => e.currentTarget.select()}
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText("https://trimpact.myherb.co/donate?ref=share")
                    toast({
                      title: "Link Copied",
                      description: "The donation link has been copied to your clipboard",
                    })
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

