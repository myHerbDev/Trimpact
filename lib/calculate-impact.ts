import { treeNationCalculate } from "./apis/tree-nation"
import { greensparkCalculate } from "./apis/greenspark"
import { oneTreePlantedCalculate } from "./apis/one-tree-planted"
import { cleanHubCalculate } from "./apis/clean-hub"

export interface ImpactData {
  cost: number
  co2Reduction: number
  waterSaved: number
  habitatRestored: number
}

export async function calculateImpact(treeCount: number) {
  try {
    // Call all APIs in parallel
    const [treeNation, greenspark, oneTreePlanted, cleanHub] = await Promise.all([
      treeNationCalculate(treeCount),
      greensparkCalculate(treeCount),
      oneTreePlantedCalculate(treeCount),
      cleanHubCalculate(treeCount),
    ])

    // Calculate combined impact
    const combined: ImpactData = {
      cost: treeNation.cost + greenspark.cost + oneTreePlanted.cost + cleanHub.cost,
      co2Reduction:
        treeNation.co2Reduction + greenspark.co2Reduction + oneTreePlanted.co2Reduction + cleanHub.co2Reduction,
      waterSaved: treeNation.waterSaved + greenspark.waterSaved + oneTreePlanted.waterSaved + cleanHub.waterSaved,
      habitatRestored:
        treeNation.habitatRestored +
        greenspark.habitatRestored +
        oneTreePlanted.habitatRestored +
        cleanHub.habitatRestored,
    }

    return {
      combined,
      treeNation,
      greenspark,
      oneTreePlanted,
      cleanHub,
    }
  } catch (error) {
    console.error("Error calculating impact:", error)
    throw new Error("Failed to calculate environmental impact")
  }
}
