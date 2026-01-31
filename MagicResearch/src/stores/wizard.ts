import { defineStore, storeToRefs } from 'pinia'
import { ref, computed, watchEffect, watch, effect } from 'vue'
import { useBuildingsStore } from './buildings'
import { useProductionStore } from './production'
import type {
  BaseProduction,
  BaseMultipliers,
  Schools,
  Building,
  BuildingWizard,
  Buff,
  Spell,
} from '@/types/ressources'
import type { BuildingId } from '@/data/buildings.data'

export const useWizardStore = defineStore('wizard', () => {
  const buildingsStore = useBuildingsStore()
  const ressourcesNeedToBeUpdated = ref(false)
  const buffs = ref<Buff[]>([])
  type RessourcesKeys = keyof typeof baseProduction.value
  type MultipliersKeys = keyof typeof multipliers.value
  const baseProduction = ref<BaseProduction>({
    mana: 0,
    water: 0,
    coins:0,
    stone: 0,
    manamax: 10000,
    watermax: 10000,
    stonemax: 50000,
    coinsmax:1000,
    prodcoins:0,
    prodmana: 0,
    prodwater: 0,
    prodstone: 0,
    xpByApprentice:1,
    numberOfApprentice:10,
  })
    const baseMultipliers = ref<BaseMultipliers>({
    manualmana: 0,
    manualwater: 0,
    mana: 0,
    coins:0,
    coinsmax:0,
    prodcoins:0,
    water: 0,
    stone: 0,
    manamax: 0,
    watermax: 0,
    stonemax: 0,
    prodmana: 0,
    prodwater: 0,
    prodstone: 0,
    xpByApprentice:0,
    numberOfApprentice:0,
  })
  const production = ref<BaseProduction>({
    mana: 0,
    water: 0,
    coins:0,
    stone: 0,
    manamax: 0,
    watermax: 0,
    stonemax: 0,
    coinsmax:0,
    prodcoins:0,
    prodmana: 0,
    prodwater: 0,
    prodstone: 0,
    numberOfApprentice:0,
    xpByApprentice:1,
  })

  const ressources = ref<BaseProduction>({
    mana: 10000,
    water: 10000,
    stone: 50000,
    coins:0,
    coinsmax:1000,
    prodcoins:0,
    manamax: 100,
    watermax: 10,
    stonemax: 50,
    prodmana: 0,
    prodwater: 0,
    prodstone: 0,
    numberOfApprentice:0,
    xpByApprentice:1,
  })
  const multipliers = ref<BaseMultipliers>({
    manualmana: 0,
    manualwater: 0,
    mana: 0,
    coins:0,
    coinsmax:0,
    prodcoins:0,
    water: 0,
    stone: 0,
    manamax: 0,
    watermax: 0,
    stonemax: 0,
    prodmana: 0,
    prodwater: 0,
    prodstone: 0,
    numberOfApprentice:0,
    xpByApprentice:0,
  })

  const buildings = ref<BuildingWizard[]>([])

  function wizardHaveBuilding(id: BuildingId) {
    return buildings.value.find((building) => building.id === id)
  }
  function checkIfRessourceAreEnough(cost: { [key: string]: number }) {
    for (const [key, value] of Object.entries(cost)) {
      if ((ressources.value[key as keyof typeof ressources.value] ?? 0) < value) {
        return false
      }
    }
    return true
  }
  function removeResources(name: string, value: number) {
    if (!ressources.value[name as keyof typeof ressources.value]) return
    ressources.value[name as keyof typeof ressources.value] -= value
  }

  function addBuilding(building: BuildingWizard) {
    buildings.value.push(building)
    ressourcesNeedToBeUpdated.value = true
  }
  function updateWizard(interval: number) {
    updateBuffs(interval)
  }
  function updateBuffs(interval: number) {
    buffs.value.forEach((buff) => {
      buff.duration -= interval
      if (buff.duration <= 0) {
        buffs.value.splice(buffs.value.indexOf(buff), 1)
        ressourcesNeedToBeUpdated.value = true
      }
    })
  }
  function addBuff(buff: Buff) {
    const buffAlreadyExists = buffs.value.some((buff) => buff.name === buff.name)
    const newRessourcesEffect: { [key in RessourcesKeys]?: number } = {}
    const newMultipliersEffect: { [key in MultipliersKeys]?: number } = {}
    if (buff.effects.ressources) {
      Object.entries(buff.effects.ressources).forEach(([key, value]) => {
        if (key in baseProduction.value) {
          newRessourcesEffect[key as RessourcesKeys] =
            (newRessourcesEffect[key as RessourcesKeys] || 0) + value
        }
      })
    }

    if (buff.effects.multipliers) {
      Object.entries(buff.effects.multipliers).forEach(([key, value]) => {
        if (key in multipliers.value) {
          newMultipliersEffect[key as MultipliersKeys] =
            (newMultipliersEffect[key as MultipliersKeys] || 0) + value
        }
      })
    }
    const newEffects = {
      ressources: newRessourcesEffect,
      multipliers: newMultipliersEffect,
      buildings: buff.effects.buildings || {},
    }
    if (buffAlreadyExists && buff.unique) {
      const index = buffs.value.findIndex((buff) => buff.name === buff.name)
      if (index !== -1) {
        buffs.value.splice(index, 1)
      }
    }

    buffs.value.push({
      name: buff.name,
      duration: buff.duration,
      effects: newEffects,
      unique: buff.unique,
    })
    ressourcesNeedToBeUpdated.value = true
  }
  function upgradeBuilding(id: BuildingId) {
    let currentBuilding = buildings.value.find((building) => building.id === id)
    if (!currentBuilding) {
      console.error('Building not found')
      return
    }
    console.log(currentBuilding.level)
    const buildingStore = buildingsStore.getBuilding(id, currentBuilding.level)
    console.log(buildingStore)
    if (!buildingStore) {
      console.error('Building not found')
      return
    }
    buildingStore.bonus = currentBuilding.bonus
    currentBuilding = buildingStore
    buildings.value = buildings.value.map((building) =>
      building.id === id ? currentBuilding : building,
    )
    ressourcesNeedToBeUpdated.value = true
  }
  function addBonus(name: string, value: number) {
    console.log(name,value)
    if (!(name in ressources.value)) {
      console.log(`addBonus function error: ressource ${name} not found`)
    }
    ressources.value[name as keyof typeof ressources.value] += value
  }
  const formatedRessources = computed(() => {
    return Object.entries(ressources.value).reduce(
      (total, [key, value]) => {
        total[key] = Number(Math.floor(value))
        return total
      },
      {} as { [key: string]: number },
    )
  })
  async function init() {
    return new Promise((resolve) => {
      production.value = baseProduction.value
      resolve(true)
    })
  }
  function castSpell(spell: Spell) {
    spell.effect()
  }
  return {
    init,
    baseProduction,
    ressources,
    buildings,
    wizardHaveBuilding,
    checkIfRessourceAreEnough,
    removeResources,
    addBonus,
    addBuilding,
    upgradeBuilding,
    formatedRessources,
    multipliers,
    ressourcesNeedToBeUpdated,
    buffs,
    addBuff,
    baseMultipliers,
    production,
    castSpell,
    updateWizard,
  }
})
