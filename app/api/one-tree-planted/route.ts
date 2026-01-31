import { type NextRequest, NextResponse } from "next/server"
import { oneTreePlantedCalculate } from "@/lib/apis/one-tree-planted"

export async function POST(request: NextRequest) {
  try {
    const { treeCount } = await request.json()

    if (!treeCount || typeof treeCount !== "number" || treeCount <= 0) {
      return NextResponse.json({ error: "Please provide a valid positive number of trees" }, { status: 400 })
    }

    const results = await oneTreePlantedCalculate(treeCount)

    return NextResponse.json(results)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to calculate One Tree Planted impact" }, { status: 500 })
  }
}
