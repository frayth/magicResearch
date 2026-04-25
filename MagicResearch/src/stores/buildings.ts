import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useWizardStore } from './wizard'
import type { Building, BuildingWizard, RessourcesKey } from '../types/ressources'
import { getBuildingList, type BuildingId } from '../data/buildings.data'
import { useValueByLevel } from '../composable/UseValueByLevel'
export const useBuildingsStore = defineStore('buildings', () => {
  const wizardStore = useWizardStore()

  const buildingsList = ref(getBuildingList()) //<Omit<Building,'level'>[]>

  const wizardBuildings = ref<Building[]>([])

  function addBuilding(buildingId: BuildingId, level: number=0) {
    const building = buildingsList.value.find((building) => building.id === buildingId)
    if (!building) {
      console.error('Building not found')
      return
    }
    if(level===0){
      level = 1
    }
    const buildingInWizardBuilding = wizardBuildings.value.find(
      (building) => building.id === buildingId,
    )
    if (buildingInWizardBuilding) {
      console.error('Building is already added')
      return
    }

    building.level = level
    wizardBuildings.value.push(building)
    wizardStore.ressourcesNeedToBeUpdated = true
  }
  function upgradeBuilding(buildingId: BuildingId) {
    const building = wizardBuildings.value.find((building) => building.id === buildingId)
    if (!building) {
      console.error('Building not found, upgrade is impossible')
      return
    }
    building.level++
    wizardStore.ressourcesNeedToBeUpdated = true
  }
  function wizardHaveBuilding(id: BuildingId) {
    return wizardBuildings.value.find((building) => building.id === id)
  }

  function resetMultipliers() {
    wizardBuildings.value.forEach((building) => {
      building.multiplier = 0
    })
  }
  function getBuilding(id: BuildingId, level: number): BuildingWizard | null {
    const building = buildingsList.value.find((building) => building.id === id)
    if (!building) {
      console.error('Building not found')
      return null
    }
    const costCurrentLevel = building.cost
      .filter((cost) => cost.level <= level)
      .map((cost) => cost.cost)
      .reduce(
        (total, cost) => {
          Object.entries(cost).forEach(([ressource, quantity]) => {
            if (total[ressource]) {
              total[ressource].minValue += quantity.minValue
              total[ressource].maxValue += quantity.maxValue
            } else {
              total[ressource] = { minValue: quantity.minValue, maxValue: quantity.maxValue }
            }
          })
          return total
        },
        {} as { [key: string]: { minValue: number; maxValue: number } },
      )

    const currentLevel: Record<RessourcesKey, number> = Object.entries(costCurrentLevel).reduce(
      (total, [ressource, quantity]) => {
        total[ressource as RessourcesKey] = Math.floor(
          useValueByLevel({
            level: level,
            startValue: quantity.minValue,
            endValue: quantity.maxValue,
            maxLevel: building.levelMax,
            easing: building.easings,
            minLevel: 0,
          }).value.value,
        )
        return total
      },
      {} as Record<RessourcesKey, number>,
    )

    const effects = building.effects
    return {
      cost: currentLevel,
      level: level,
      id,
      name: building.name,
      effects,
      levelMax: building.levelMax,
    }
  }

  async function init() {
    return new Promise((resolve) => {
      resolve(true)
    })
  }
  function reset() {
    wizardBuildings.value = []
  }
  return {
    init,
    wizardBuildings,
    addBuilding,
    wizardHaveBuilding,
    resetMultipliers,
    getBuilding,
    reset,
    upgradeBuilding
  }
})
