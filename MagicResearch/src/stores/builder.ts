import { defineStore } from 'pinia'
import { useWizardStore } from './wizard'
import { useBuildingsStore } from './buildings'
import { ref } from 'vue'
import type { BuildingId } from '@/data/buildings.data'
export const useBuilderStore = defineStore('builder', () => {
  const wizardStore = useWizardStore()
  const buildingsStore = useBuildingsStore()

  function build(name: BuildingId) {
    const building = buildingsStore.getBuilding(
      name,
      wizardStore.wizardHaveBuilding(name)?.level ?? 0,
    )
    if (!building) {
      console.error('Building not found')
      return
    }
    if (!removeRessources(building.cost.currentLevel)) return
    if(!wizardStore.wizardHaveBuilding(name)){
      wizardStore.addBuilding(building)
    }else{
      wizardStore.upgradeBuilding(name)
    }
  }


  function removeRessources(cost: { [key: string]: number }) {
    if (!wizardStore.checkIfRessourceAreEnough(cost)) {
      console.error('Not enough ressources')
      return false
    }
    for (const [key, value] of Object.entries(cost)) {
      wizardStore.removeResources(key, value)
    }
    return true
  }
  async function init() {
    return new Promise((resolve) => {
      resolve(true)
    })
  }
  return { init, build }
})
