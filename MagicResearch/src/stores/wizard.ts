import { defineStore, storeToRefs } from 'pinia'
import { ref, computed, watchEffect, watch, effect, reactive } from 'vue'
import { useBuildingsStore } from './buildings'
import { useSaveStore } from './save'
import { getWizardDefaultStatistics } from '@/data/defaultValue.data'
import type {
  Buff,
  Spell,
  IncrementalRessources,
  storyProgress,
  Ressources,
} from '@/types/ressources'
import type { BuildingId } from '@/data/buildings.data'
import {  getDefaultRessource } from '@/data/defaultValue.data'
import { Entity } from '@/Class/Entity'

export const useWizardStore = defineStore('wizard', () => {
  const buildingsStore = useBuildingsStore()
  const saveStore = useSaveStore()
  const ressourcesNeedToBeUpdated = ref(true)
  const buffs = ref<Buff[]>([])
  const storyProgress = ref<storyProgress>({ progress: 0, completed: false })
  const ressources = ref<Ressources>(getDefaultRessource())
  const wizardEntity=reactive(new Entity(getWizardDefaultStatistics()))
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
    ressources.value = getDefaultRessource()
    startingRessources.value = getDefaultRessource()
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
    wizardEntity
  }
})
