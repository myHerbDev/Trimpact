"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Car, Home, ShoppingBag, Utensils, Leaf, ArrowRight, Share2 } from "lucide-react"
import Link from "next/link"

export default function CarbonCalculator() {
  const [activeTab, setActiveTab] = useState("transport")
  const [transportValues, setTransportValues] = useState({
    carKm: 150,
    carEfficiency: "medium",
    flightsShort: 2,
    flightsMedium: 1,
    flightsLong: 0,
  })

  const [homeValues, setHomeValues] = useState({
    electricityKwh: 250,
    gasUsage: 80,
    renewableEnergy: "partial",
    homeSize: "medium",
  })

  const [foodValues, setFoodValues] = useState({
    dietType: "mixed",
    localFood: 50,
    wastePercentage: 20,
  })

  const [shoppingValues, setShoppingValues] = useState({
    clothingItems: 5,
    electronicsItems: 2,
    secondHandPercentage: 30,
  })

  const [calculatedResult, setCalculatedResult] = useState<null | {
    carbonFootprint: number
    treesNeeded: number
    cost: number
  }>(null)

  const calculateFootprint = () => {
    // This is a simplified calculation for demonstration purposes
    // In a real app, this would be much more sophisticated

    // Transport calculation
    let transportFootprint = 0
    const carEfficiencyFactor =
      transportValues.carEfficiency === "low" ? 0.2 : transportValues.carEfficiency === "medium" ? 0.15 : 0.1

    transportFootprint += transportValues.carKm * carEfficiencyFactor
    transportFootprint += transportValues.flightsShort * 500
    transportFootprint += transportValues.flightsMedium * 1200
    transportFootprint += transportValues.flightsLong * 3000

    // Home calculation
    let homeFootprint = 0
    const renewableFactor =
      homeValues.renewableEnergy === "none" ? 1 : homeValues.renewableEnergy === "partial" ? 0.6 : 0.2

    const homeSizeFactor = homeValues.homeSize === "small" ? 0.8 : homeValues.homeSize === "medium" ? 1 : 1.5

    homeFootprint += homeValues.electricityKwh * 0.5 * renewableFactor
    homeFootprint += homeValues.gasUsage * 5 * homeSizeFactor

    // Food calculation
    let foodFootprint = 0
    const dietFactor =
      foodValues.dietType === "vegan"
        ? 1
        : foodValues.dietType === "vegetarian"
          ? 1.5
          : foodValues.dietType === "mixed"
            ? 2.5
            : 3.5

    const localFoodFactor = 1 - (foodValues.localFood / 100) * 0.3
    const wasteFactor = 1 + (foodValues.wastePercentage / 100) * 0.5

    foodFootprint = 1000 * dietFactor * localFoodFactor * wasteFactor

    // Shopping calculation
    let shoppingFootprint = 0
    const secondHandFactor = 1 - (shoppingValues.secondHandPercentage / 100) * 0.7

    shoppingFootprint += shoppingValues.clothingItems * 100 * secondHandFactor
    shoppingFootprint += shoppingValues.electronicsItems * 300 * secondHandFactor

    // Total footprint in kg CO2
    const totalFootprint = transportFootprint + homeFootprint + foodFootprint + shoppingFootprint

    // Trees needed (rough estimate: 1 tree absorbs ~25kg CO2 per year)
    const treesNeeded = Math.ceil(totalFootprint / 25)

    // Cost (average $3.50 per tree)
    const cost = treesNeeded * 3.5

    setCalculatedResult({
      carbonFootprint: Math.round(totalFootprint),
      treesNeeded,
      cost,
    })
  }

  const nextTab = () => {
    if (activeTab === "transport") setActiveTab("home")
    else if (activeTab === "home") setActiveTab("food")
    else if (activeTab === "food") setActiveTab("shopping")
    else if (activeTab === "shopping") calculateFootprint()
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Carbon Footprint Calculator</h1>
          <p className="text-gray-500 mt-2">
            Calculate your carbon footprint and find out how many trees you need to plant to offset it
          </p>
        </div>

        {!calculatedResult ? (
          <Card>
            <CardHeader>
              <CardTitle>Calculate Your Impact</CardTitle>
              <CardDescription>
                Answer a few questions about your lifestyle to estimate your carbon footprint
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="transport">
                    <Car className="h-4 w-4 mr-2" />
                    Transport
                  </TabsTrigger>
                  <TabsTrigger value="home">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </TabsTrigger>
                  <TabsTrigger value="food">
                    <Utensils className="h-4 w-4 mr-2" />
                    Food
                  </TabsTrigger>
                  <TabsTrigger value="shopping">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Shopping
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="transport" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="carKm">Weekly car travel (kilometers)</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Slider
                          id="carKm"
                          min={0}
                          max={1000}
                          step={10}
                          value={[transportValues.carKm]}
                          onValueChange={(value) => setTransportValues({ ...transportValues, carKm: value[0] })}
                          className="flex-1"
                        />
                        <span className="w-12 text-right">{transportValues.carKm}</span>
                      </div>
                    </div>

                    <div>
                      <Label>Car fuel efficiency</Label>
                      <RadioGroup
                        value={transportValues.carEfficiency}
                        onValueChange={(value) => setTransportValues({ ...transportValues, carEfficiency: value })}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="low" id="efficiency-low" />
                          <Label htmlFor="efficiency-low">Low</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medium" id="efficiency-medium" />
                          <Label htmlFor="efficiency-medium">Medium</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="high" id="efficiency-high" />
                          <Label htmlFor="efficiency-high">High</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label>Number of flights per year</Label>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Short flights ({"<"} 3 hours)</span>
                          <span className="text-sm">{transportValues.flightsShort}</span>
                        </div>
                        <Slider
                          min={0}
                          max={20}
                          step={1}
                          value={[transportValues.flightsShort]}
                          onValueChange={(value) => setTransportValues({ ...transportValues, flightsShort: value[0] })}
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Medium flights (3-6 hours)</span>
                          <span className="text-sm">{transportValues.flightsMedium}</span>
                        </div>
                        <Slider
                          min={0}
                          max={10}
                          step={1}
                          value={[transportValues.flightsMedium]}
                          onValueChange={(value) => setTransportValues({ ...transportValues, flightsMedium: value[0] })}
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Long flights ({">"} 6 hours)</span>
                          <span className="text-sm">{transportValues.flightsLong}</span>
                        </div>
                        <Slider
                          min={0}
                          max={5}
                          step={1}
                          value={[transportValues.flightsLong]}
                          onValueChange={(value) => setTransportValues({ ...transportValues, flightsLong: value[0] })}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="home" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="electricityKwh">Monthly electricity usage (kWh)</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Slider
                          id="electricityKwh"
                          min={0}
                          max={1000}
                          step={10}
                          value={[homeValues.electricityKwh]}
                          onValueChange={(value) => setHomeValues({ ...homeValues, electricityKwh: value[0] })}
                          className="flex-1"
                        />
                        <span className="w-12 text-right">{homeValues.electricityKwh}</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="gasUsage">Monthly gas usage (cubic meters)</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Slider
                          id="gasUsage"
                          min={0}
                          max={500}
                          step={5}
                          value={[homeValues.gasUsage]}
                          onValueChange={(value) => setHomeValues({ ...homeValues, gasUsage: value[0] })}
                          className="flex-1"
                        />
                        <span className="w-12 text-right">{homeValues.gasUsage}</span>
                      </div>
                    </div>

                    <div>
                      <Label>Renewable energy usage</Label>
                      <RadioGroup
                        value={homeValues.renewableEnergy}
                        onValueChange={(value) => setHomeValues({ ...homeValues, renewableEnergy: value })}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="none" id="renewable-none" />
                          <Label htmlFor="renewable-none">None</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="partial" id="renewable-partial" />
                          <Label htmlFor="renewable-partial">Partial</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="full" id="renewable-full" />
                          <Label htmlFor="renewable-full">Full</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Home size</Label>
                      <RadioGroup
                        value={homeValues.homeSize}
                        onValueChange={(value) => setHomeValues({ ...homeValues, homeSize: value })}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="small" id="home-small" />
                          <Label htmlFor="home-small">Small</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medium" id="home-medium" />
                          <Label htmlFor="home-medium">Medium</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="large" id="home-large" />
                          <Label htmlFor="home-large">Large</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="food" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Diet type</Label>
                      <RadioGroup
                        value={foodValues.dietType}
                        onValueChange={(value) => setFoodValues({ ...foodValues, dietType: value })}
                        className="grid grid-cols-2 gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="vegan" id="diet-vegan" />
                          <Label htmlFor="diet-vegan">Vegan</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="vegetarian" id="diet-vegetarian" />
                          <Label htmlFor="diet-vegetarian">Vegetarian</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mixed" id="diet-mixed" />
                          <Label htmlFor="diet-mixed">Mixed</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="meat-heavy" id="diet-meat" />
                          <Label htmlFor="diet-meat">Meat-heavy</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="localFood">Percentage of locally sourced food</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Slider
                          id="localFood"
                          min={0}
                          max={100}
                          step={5}
                          value={[foodValues.localFood]}
                          onValueChange={(value) => setFoodValues({ ...foodValues, localFood: value[0] })}
                          className="flex-1"
                        />
                        <span className="w-12 text-right">{foodValues.localFood}%</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="wastePercentage">Food waste percentage</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Slider
                          id="wastePercentage"
                          min={0}
                          max={50}
                          step={5}
                          value={[foodValues.wastePercentage]}
                          onValueChange={(value) => setFoodValues({ ...foodValues, wastePercentage: value[0] })}
                          className="flex-1"
                        />
                        <span className="w-12 text-right">{foodValues.wastePercentage}%</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="shopping" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="clothingItems">New clothing items purchased per month</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Slider
                          id="clothingItems"
                          min={0}
                          max={20}
                          step={1}
                          value={[shoppingValues.clothingItems]}
                          onValueChange={(value) => setShoppingValues({ ...shoppingValues, clothingItems: value[0] })}
                          className="flex-1"
                        />
                        <span className="w-12 text-right">{shoppingValues.clothingItems}</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="electronicsItems">New electronics purchased per year</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Slider
                          id="electronicsItems"
                          min={0}
                          max={10}
                          step={1}
                          value={[shoppingValues.electronicsItems]}
                          onValueChange={(value) =>
                            setShoppingValues({ ...shoppingValues, electronicsItems: value[0] })
                          }
                          className="flex-1"
                        />
                        <span className="w-12 text-right">{shoppingValues.electronicsItems}</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="secondHandPercentage">Percentage of second-hand purchases</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Slider
                          id="secondHandPercentage"
                          min={0}
                          max={100}
                          step={5}
                          value={[shoppingValues.secondHandPercentage]}
                          onValueChange={(value) =>
                            setShoppingValues({ ...shoppingValues, secondHandPercentage: value[0] })
                          }
                          className="flex-1"
                        />
                        <span className="w-12 text-right">{shoppingValues.secondHandPercentage}%</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (activeTab === "home") setActiveTab("transport")
                    else if (activeTab === "food") setActiveTab("home")
                    else if (activeTab === "shopping") setActiveTab("food")
                  }}
                  disabled={activeTab === "transport"}
                >
                  Previous
                </Button>
                <Button onClick={nextTab} className="bg-primary hover:bg-primary/90">
                  {activeTab === "shopping" ? "Calculate" : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Carbon Footprint Results</CardTitle>
                <CardDescription>Based on your lifestyle, here's your estimated environmental impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">
                      {calculatedResult.carbonFootprint.toLocaleString()} kg
                    </div>
                    <p className="text-gray-500">Annual CO₂ emissions</p>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{calculatedResult.treesNeeded.toLocaleString()}</div>
                    <p className="text-gray-500">Trees needed to offset</p>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">${calculatedResult.cost.toLocaleString()}</div>
                    <p className="text-gray-500">Estimated offset cost</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Your footprint</span>
                      <span className="text-sm font-medium">Global average</span>
                    </div>
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                          style={{ width: `${Math.min(100, (calculatedResult.carbonFootprint / 5000) * 100)}%` }}
                        ></div>
                      </div>
                      <div
                        className="absolute top-0 left-0 h-2 border-r-2 border-red-500"
                        style={{ left: "70%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">0 kg</span>
                      <span className="text-xs text-gray-500">10,000 kg</span>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Leaf className="h-5 w-5 text-green-600 mr-2" />
                      Offset Your Carbon Footprint
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      You can offset your carbon footprint by planting {calculatedResult.treesNeeded} trees. This will
                      help absorb the CO₂ emissions from your lifestyle and contribute to a healthier planet.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button asChild className="bg-primary hover:bg-primary/90">
                        <Link href="/donate">Plant Trees Now</Link>
                      </Button>
                      <Button variant="outline">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Results
                      </Button>
                      <Button variant="outline" onClick={() => setCalculatedResult(null)}>
                        Recalculate
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reduce Your Carbon Footprint</CardTitle>
                <CardDescription>Here are some tips to help you reduce your environmental impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center">
                      <Car className="h-4 w-4 mr-2" />
                      Transportation
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                      <li>Use public transportation when possible</li>
                      <li>Consider carpooling or ride-sharing</li>
                      <li>Switch to an electric or hybrid vehicle</li>
                      <li>Reduce air travel or offset your flights</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      Home Energy
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                      <li>Switch to renewable energy sources</li>
                      <li>Improve home insulation</li>
                      <li>Use energy-efficient appliances</li>
                      <li>Reduce heating and cooling usage</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center">
                      <Utensils className="h-4 w-4 mr-2" />
                      Food Choices
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                      <li>Reduce meat consumption</li>
                      <li>Buy local and seasonal produce</li>
                      <li>Minimize food waste</li>
                      <li>Grow your own vegetables if possible</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Consumption
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                      <li>Buy second-hand items when possible</li>
                      <li>Choose products with less packaging</li>
                      <li>Repair items instead of replacing them</li>
                      <li>Support eco-friendly companies</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
