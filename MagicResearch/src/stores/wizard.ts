import { defineStore, storeToRefs } from 'pinia'
import { ref, computed, watchEffect, watch, effect } from 'vue'
import { useBuildingsStore } from './buildings'
import { useSaveStore } from './save'
import type {
  Buff,
  Spell,
  IncrementalRessources,
  storyProgress,
  Ressources,
} from '@/types/ressources'
import type { BuildingId } from '@/data/buildings.data'
import { defaultRessource, getDefaultRessource } from '@/data/defaultValue.data'

export const useWizardStore = defineStore('wizard', () => {
  const buildingsStore = useBuildingsStore()
  const saveStore = useSaveStore()
  const ressourcesNeedToBeUpdated = ref(true)
  const buffs = ref<Buff[]>([])
  const storyProgress = ref<storyProgress>({ progress: 0, completed: false })
  const ressources = ref<Ressources>({
    incremental: {
      mana: 0,
      water: 0,
      wood: 0,
      coins: 0,
      stone: 0,
    },
    production: {
      prodmana: 0,
      prodwater: 0,
      prodwood: 0,
      prodcoins: 0,
      prodstone: 0,
    },
    limits: {
      manamax: 100,
      watermax: 10,
      woodmax: 50,
      stonemax: 50,
      coinsmax: 1000,
    },
    school: {
      xpByApprentice: 1,
      apprenticeCapacity: 1,
      numberOfApprentice: 1,
    },
    manual: {
      manualmana: 1,
      manualwater: 1,
      manualwood: 1,
    },
    multipliers: {
      prodmana: 0,
      prodwater: 0,
      prodwood: 0,
      prodcoins: 0,
      prodstone: 0,
      manualmana: 0,
      manualwater: 0,
      manualwood: 1,
      manamax: 0,
      watermax: 0,
      woodmax: 0,
      stonemax: 0,
      coinsmax: 1,
      xpByApprentice: 0,
      apprenticeCapacity: 0,
      numberOfApprentice: 0,
    },
  })

  const startingRessources = ref<Ressources>(getDefaultRessource())



  function checkIfRessourceAreEnough(cost: { [key: string]: number }) {
    for (const [key, value] of Object.entries(cost)) {
      if ((ressources.value.incremental[key as keyof typeof ressources.value.incremental] ?? 0) < value) {
        return false
      }
    }
    return true
  }
  function removeResources(name: string, value: number) {
    if (!ressources.value.incremental[name as keyof typeof ressources.value.incremental]) return
    ressources.value.incremental[name as keyof typeof ressources.value.incremental] -= value
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
    if (buffAlreadyExists && buff.unique) {
      const index = buffs.value.findIndex((buff) => buff.name === buff.name)
      if (index !== -1) {
        buffs.value.splice(index, 1)
      }
    }
    buffs.value.push({
      name: buff.name,
      duration: buff.duration,
      effects: buff.effects,
      unique: buff.unique,
    })
    ressourcesNeedToBeUpdated.value = true
  }

  function addRessources(name:keyof IncrementalRessources, value: number) {
    if (!(name in ressources.value.incremental)) {
      console.error(`addBonus function error: ressource ${name} not found`)
    }

    const maxRessourceName = `${name}max`
    if (
      ressources.value.incremental[name as keyof typeof ressources.value.incremental] + value >
      ressources.value.limits[maxRessourceName as keyof typeof ressources.value.limits]
    ) {
      ressources.value.incremental[name as keyof typeof ressources.value.incremental] =
        ressources.value.limits[maxRessourceName as keyof typeof ressources.value.limits]
      return
    }
    ressources.value.incremental[name as keyof typeof ressources.value.incremental] += value
  }


  async function init() {
    return new Promise((resolve) => {
      resolve(true)
    })
  }
  function castSpell(spell: Spell) {
    spell.effect()
  }
  function reset() {
    console.log('reset wizard')
    buffs.value = []
    ressources.value =defaultRessource
    startingRessources.value = defaultRessource
    ressourcesNeedToBeUpdated.value = true
    storyProgress.value = { progress: 0, completed: false }
  }
  return {
    init,
    checkIfRessourceAreEnough,
    removeResources,
    addRessources,
    ressourcesNeedToBeUpdated,
    buffs,
    addBuff,
    castSpell,
    updateWizard,
    reset,
    storyProgress,
    ressources,
    startingRessources,
  }
})
