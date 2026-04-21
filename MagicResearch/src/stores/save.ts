import { defineStore } from 'pinia'
import { timestamp, useLocalStorage, type RemovableRef } from '@vueuse/core'
import { useWizardStore } from '@/stores/wizard'
import { useStoryLineStore } from '@/stores/storyLine'
import { useBoucleManagerStore } from './boucleManager'
import { defaultRessources, defaultMultipliersREssources } from '@/data/defaultValue.data'
import { useAppStore } from './app'
import { saveCooldown } from '@/data/boucle.data'

import CheatModal from '@/components/Modals/elements/cheatModal.vue'
type StorageMap = {
  ressources: SaveRessources
  buildings: SaveBuildings
  schools: SaveSchools
  unlocks: UnlocksNames[]
  buffs: Buff[]
  storyLine: SaveStoryLine
  keys: SaveKeys
}
import { ref, toRaw } from 'vue'
import type {
  Buff,
  SaveBuildings,
  SaveKeys,
  SaveRessources,
  SaveSchools,
  SaveStoryLine,

} from '@/types/ressources'

import { useSchoolsStore } from './schools'
import { useBuildingsStore } from '@/stores/buildings'
import { useUnlockStore } from './unlock'
import type { UnlocksNames } from '@/data/unlocks.data'
export type SaveName = 'ressources' | 'buildings' | 'unlocks' | 'schools' | 'buffs'

export const useSaveStore = defineStore('UseSave', () => {
  const wizardStore = useWizardStore()
  const appStore = useAppStore()
  const buildingsStore = useBuildingsStore()
  const unlockStore = useUnlockStore()
  const schoolsStore = useSchoolsStore()
  const storyLineStore = useStoryLineStore()
  const boucle = useBoucleManagerStore()
  const coolDownSave = ref({
    lastSave: 0,
    cooldown: saveCooldown,
  })
  //console.log('save.ts qui essais de sauvegarder les ressources')
  let saveRessources: SaveRessources | null = null
  let saveBuildings: SaveBuildings | null = null
  let saveUnlocks: UnlocksNames[] | null = null
  let saveSchool: SaveSchools | null = null
  let saveBuffs: Buff[] | null = null
  let saveStoryLine: SaveStoryLine | null = null
  let keys: SaveKeys | null = null

  async function saveData() {
    if(coolDownSave.value.lastSave + boucle.interval < coolDownSave.value.cooldown) {
      coolDownSave.value.lastSave += boucle.interval
      return
    }else{
      coolDownSave.value.lastSave = 0
    }
    if (
      saveBuildings === null ||
      saveRessources === null ||
      saveUnlocks === null ||
      saveBuffs === null ||
      saveSchool === null ||
      keys === null ||
      saveStoryLine === null
    ) {
      console.error('error dans le systeme de sauvegarde')
      return
    }
    const currentBuildings = wizardStore.buildings.map((el) => ({
      id: el.id,
      level: el.level,
    }))

    saveInStorage('buildings', currentBuildings)

    const currentStoryLine = {
      progress: wizardStore.storyProgress.progress || 0,
      completed: wizardStore.storyProgress.completed,
    }
    saveInStorage('storyLine', currentStoryLine)

    const currentUnlocks = unlockStore.unlocked
    saveInStorage('unlocks', currentUnlocks)

    saveRessources = {
      ressources: wizardStore.ressources,
      baseProduction: wizardStore.baseProduction,
      baseMultipliers: wizardStore.baseMultipliers,
    }
    saveInStorage('ressources', saveRessources)

    saveSchool = {
      schools: schoolsStore.schools.map((el) => ({
        name: el.name,
        currentXp: el.currentXp,
        level: el.level,
        numberOfapprentice: el.numberOfapprentice,
      })),
      actions: schoolsStore.actionsSchool,
    }
    saveInStorage('schools', saveSchool)

    saveInStorage('buffs', wizardStore.buffs)

    const buildingKey = await getHash(JSON.stringify(currentBuildings))
    const storyLineKey = await getHash(JSON.stringify(currentStoryLine))
    const unlockKey = await getHash(JSON.stringify(currentUnlocks))
    const ressourcesKey = await getHash(
      JSON.stringify({
        ressources: wizardStore.ressources,
        baseProduction: wizardStore.baseProduction,
        baseMultipliers: wizardStore.baseMultipliers,
      }),
    )
    const schoolKey = await getHash(
      JSON.stringify({
        schools: schoolsStore.schools.map((el) => ({
          name: el.name,
          currentXp: el.currentXp,
          level: el.level,
          numberOfapprentice: el.numberOfapprentice,
        })),
        actions: schoolsStore.actionsSchool,
      }),
    )
    const buffKey = await getHash(JSON.stringify(wizardStore.buffs))
    saveInStorage('keys', {
      buildingKey,
      storyLineKey,
      unlockKey,
      ressourcesKey,
      schoolKey,
      buffKey,
    })
  }

  function internalSecret() {
    return ['Je', 'ne', 'suis', 'pas', 'un', 'tricheur'].join('_')
  }

  async function loadSave() {
    let uncorruptSave = true
    //console.log('loadsave', localStorage.getItem('ressources'))
    keys = loadFromStorage('keys')

    saveSchool = loadFromStorage('schools')

    const schoolKey = await getHash(JSON.stringify(saveSchool))
    if (schoolKey !== keys?.schoolKey) {
      console.log('school key is not correct')
      uncorruptSave = false
    }

    saveBuffs = loadFromStorage('buffs')
    const buffKey = await getHash(JSON.stringify(saveBuffs))
    if (buffKey !== keys?.buffKey) {
      console.log('buff key is not correct')
      uncorruptSave = false
    }

    saveRessources = loadFromStorage('ressources')

    const ressourcesKey = await getHash(JSON.stringify(saveRessources))
    if (ressourcesKey !== keys?.ressourcesKey) {
      console.log('ressources key is not correct')
      uncorruptSave = false
    }

    saveBuildings = loadFromStorage('buildings')
    const buildingsKey = await getHash(JSON.stringify(saveBuildings))
    if (buildingsKey !== keys?.buildingKey) {
      console.log('buildings key is not correct')
      uncorruptSave = false
    }

    saveStoryLine = loadFromStorage('storyLine')

    const storyLineKey = await getHash(JSON.stringify(saveStoryLine))
    if (storyLineKey !== keys?.storyLineKey) {
      console.log('storyLine key is not correct')
      uncorruptSave = false
    }

    saveUnlocks = loadFromStorage('unlocks')

    const unlocksKey = await getHash(JSON.stringify(saveUnlocks))
    if (unlocksKey !== keys?.unlockKey) {
      console.log('unlocks key is not correct')
      uncorruptSave = false
    }

    if (uncorruptSave) {
      console.log('aucune triche détécté')
    } else {
      appStore.setModal(CheatModal)
      console.log('tricheur')
    }

    wizardStore.ressources = saveRessources!.ressources
    wizardStore.baseProduction = saveRessources!.baseProduction
    wizardStore.baseMultipliers = saveRessources!.baseMultipliers
    wizardStore.buffs = saveBuffs!
    unlockStore.unlocked = saveUnlocks!
    schoolsStore.setSchools(saveSchool!)
    wizardStore.storyProgress = saveStoryLine!
    storyLineStore.initStoryline()
    saveBuildings!.forEach((building) => {
      const dataBuilding = buildingsStore.getBuilding(building.id, building.level)
      if (dataBuilding) {
        wizardStore.addBuilding(dataBuilding)
      }
    })
  }

  async function initSave() {
    keys = {
      ressourcesKey: '',
      schoolKey: '',
      buildingKey: '',
      unlockKey: '',
      buffKey: '',
      storyLineKey: '',
    }
    saveInStorage('keys',keys)
    saveStoryLine = { progress: 0, completed: false }
    saveInStorage('storyLine',saveStoryLine)
    saveSchool = {
        schools: schoolsStore.schools.map((el) => ({
          name: el.name,
          currentXp: el.currentXp,
          level: el.level,
          numberOfapprentice: el.numberOfapprentice,
        })),
        actions: schoolsStore.actionsSchool.map((el) => ({
          name: el.name,
          level: el.level,
        })),
      }
    saveInStorage('schools',saveSchool)
    saveBuffs = []
    saveInStorage('buffs',saveBuffs)
    saveRessources = {
      ressources: defaultRessources,
      baseProduction: defaultRessources,
      baseMultipliers: defaultMultipliersREssources,
    }
    console.log("defaultMultipliersREssources",defaultMultipliersREssources)
    wizardStore.ressources = saveRessources!.ressources
    wizardStore.baseProduction = saveRessources!.baseProduction
    wizardStore.baseMultipliers = saveRessources!.baseMultipliers
    saveInStorage('ressources',saveRessources)
    saveBuildings = []
    saveInStorage('buildings',saveBuildings)
    saveUnlocks = []
    saveInStorage('unlocks',saveUnlocks)
    storyLineStore.initStoryline()
    appStore.app.init = true
  }
  async function reset() {
    boucle.stopBoucle()
    console.log('reset')
    localStorage.clear()
    localStorage.removeItem('ressources')
    localStorage.removeItem('buildings')
    localStorage.removeItem('unlocks')
    localStorage.removeItem('schools')
    localStorage.removeItem('buffs')
    localStorage.removeItem('keys')
    localStorage.removeItem('storyLine')

    schoolsStore.reset()
    storyLineStore.reset()
    appStore.reset()
    unlockStore.reset()
    wizardStore.reset()
    await initSave()
    boucle.lauchBoucle()
  }

function saveInStorage<K extends keyof StorageMap>(
  key: K,
  value: StorageMap[K]
) {
  localStorage.setItem(key, JSON.stringify(value))
}
function loadFromStorage<K extends keyof StorageMap>(
  key: K
): StorageMap[K] | null {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}
  async function getHash(input: string) {
    const textAsBuffer = new TextEncoder().encode(input + internalSecret())
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hash = hashArray.map((item) => item.toString(16).padStart(2, '0')).join('')
    return hash
  }

  function init() {
    return new Promise((resolve) => {
      resolve(true)
    })
  }
  return { saveData, loadSave, init, reset, initSave }
})
