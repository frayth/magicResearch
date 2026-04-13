import { defineStore } from 'pinia'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import { useWizardStore } from '@/stores/wizard'
import { useStoryLineStore } from '@/stores/storyLine'
import { useBoucleManagerStore } from './boucleManager'
import { defaultRessources, defaultMultipliersREssources } from '@/data/defaultValue.data'
import { useAppStore } from './app'
import CheatModal from '@/components/Modals/elements/cheatModal.vue'
import { ref, toRaw } from 'vue'
import type {
  Buff,
  SaveBuildings,
  SaveRessources,
  SaveSchools,
  SaveStoryLine,
  SaveUnlocks,
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
  console.log('save.ts qui essais de sauvegarder les ressources')
  let saveRessources: RemovableRef<SaveRessources> | null = null
  let saveBuildings: RemovableRef<SaveBuildings> | null = null
  let saveUnlocks: RemovableRef<UnlocksNames[]> | null = null
  let saveSchool: RemovableRef<SaveSchools> | null = null
  let saveBuffs: RemovableRef<Buff[]> | null = null
  let saveStoryLine: RemovableRef<SaveStoryLine> | null = null
  let keys: RemovableRef<{
    ressourcesKey: string
    schoolKey: string
    buildingKey: string
    unlockKey: string
    buffKey: string
    storyLineKey: string
  }> | null = null

  async function saveData() {
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
    const currentStoryLine = { progress: wizardStore.storyProgress.progress || 0 , completed: wizardStore.storyProgress.completed }
    const currentUnlocks = unlockStore.unlocked
    const ressourcesKey = await getHash(
      JSON.stringify({
        ressources: wizardStore.ressources,
        baseProduction: wizardStore.baseProduction,
        baseMultipliers: wizardStore.baseMultipliers,
      }),
    )
    const schoolKey = await getHash(
      JSON.stringify(
        schoolsStore.schools.map((el) => ({
          name: el.name,
          currentXp: el.currentXp,
          level: el.level,
          numberOfapprentice: el.numberOfapprentice,
        })),
      ),
    )
    const buildingKey = await getHash(JSON.stringify(currentBuildings))
    const unlockKey = await getHash(JSON.stringify(currentUnlocks))
    const buffKey = await getHash(JSON.stringify(wizardStore.buffs))
    const storyLineKey = await getHash(JSON.stringify(currentStoryLine))

    saveRessources.value = {
      ressources: wizardStore.ressources,
      baseProduction: wizardStore.baseProduction,
      baseMultipliers: wizardStore.baseMultipliers,
    }
    saveSchool.value = schoolsStore.schools.map((el) => ({
      name: el.name,
      currentXp: el.currentXp,
      level: el.level,
      numberOfapprentice: el.numberOfapprentice,
    }))
    saveBuildings.value = currentBuildings
    saveUnlocks.value = currentUnlocks
    saveBuffs.value = wizardStore.buffs
    saveStoryLine.value = currentStoryLine

    keys.value = {
      ressourcesKey,
      schoolKey,
      buildingKey,
      unlockKey,
      buffKey,
      storyLineKey,
    }
  }

  function internalSecret() {
    return ['Je', 'ne', 'suis', 'pas', 'un', 'tricheur'].join('_')
  }

  async function loadSave() {
    let uncorruptSave = true
    console.log('loadsave', localStorage.getItem('ressources'))
    keys = useLocalStorage(
      'keys',
      {
        ressourcesKey: '',
        schoolKey: '',
        buildingKey: '',
        unlockKey: '',
        buffKey: '',
        storyLineKey: '',
      },
      { writeDefaults: true },
    )

    saveSchool = useLocalStorage<SaveSchools>(
      'schools',
      schoolsStore.schools.map((el) => ({
        name: el.name,
        currentXp: el.currentXp,
        level: el.level,
        numberOfapprentice: el.numberOfapprentice,
      })),
      { writeDefaults: true },
    )

    const schoolKey = await getHash(
      JSON.stringify(
        saveSchool.value.map((el) => ({
          name: el.name,
          currentXp: el.currentXp,
          level: el.level,
          numberOfapprentice: el.numberOfapprentice,
        })),
      ),
    )
    if (schoolKey !== keys.value.schoolKey) {
      console.log('school key is not correct')
      uncorruptSave = false
    }

    saveBuffs = useLocalStorage<Buff[]>('buffs', [], { writeDefaults: true })
    const buffKey = await getHash(JSON.stringify(saveBuffs.value))
    if (buffKey !== keys.value.buffKey) {
      console.log('buff key is not correct')
      uncorruptSave = false
    }

    saveRessources = useLocalStorage<SaveRessources>(
      'ressources',
      {
        ressources: defaultRessources,
        baseProduction: defaultRessources,
        baseMultipliers: defaultMultipliersREssources,
      },
      { writeDefaults: true },
    )

    const ressourcesKey = await getHash(JSON.stringify(saveRessources.value))
    if (ressourcesKey !== keys.value.ressourcesKey) {
      console.log('ressources key is not correct')
      uncorruptSave = false
    }

    saveBuildings = useLocalStorage<SaveBuildings>('buildings', [], { writeDefaults: true })
    const buildingsKey = await getHash(JSON.stringify(saveBuildings.value))
    if (buildingsKey !== keys.value.buildingKey) {
      console.log('buildings key is not correct')
      uncorruptSave = false
    }

    saveStoryLine = useLocalStorage<SaveStoryLine>('storyLine', { progress: 0 , completed: false }, { writeDefaults: true })

    const storyLineKey = await getHash(JSON.stringify(saveStoryLine.value))
    if (storyLineKey !== keys.value.storyLineKey) {
      console.log('storyLine key is not correct')
      uncorruptSave = false
    }

    saveUnlocks = useLocalStorage<UnlocksNames[]>('unlocks', [], { writeDefaults: true })

    const unlocksKey = await getHash(JSON.stringify(saveUnlocks.value))
    if (unlocksKey !== keys.value.unlockKey) {
      console.log('unlocks key is not correct')
      uncorruptSave = false
    }

    if (uncorruptSave) {
      console.log('aucune triche détécté')
    } else {
      appStore.setModal(CheatModal)
      console.log('tricheur')
    }

    wizardStore.ressources = saveRessources.value.ressources
    wizardStore.baseProduction = saveRessources.value.baseProduction
    wizardStore.baseMultipliers = saveRessources.value.baseMultipliers
    wizardStore.buffs = saveBuffs.value
    unlockStore.unlocked = saveUnlocks.value
    schoolsStore.setSchools(saveSchool.value)
    wizardStore.storyProgress = saveStoryLine.value
    storyLineStore.initStoryline()
    saveBuildings.value.forEach((building) => {
      const dataBuilding = buildingsStore.getBuilding(building.id, building.level)
      if (dataBuilding) {
        wizardStore.addBuilding(dataBuilding)
      }
    })
  }
  async function initSave() {
    keys = useLocalStorage(
      'keys',
      {
        ressourcesKey: '',
        schoolKey: '',
        buildingKey: '',
        unlockKey: '',
        buffKey: '',
        storyLineKey: '',
      },
      { writeDefaults: true },
    )
    saveStoryLine = useLocalStorage<SaveStoryLine>('storyLine', { progress: 0, completed: false }, { writeDefaults: true })
    saveSchool = useLocalStorage<SaveSchools>(
      'schools',
      schoolsStore.schools.map((el) => ({
        name: el.name,
        currentXp: el.currentXp,
        level: el.level,
        numberOfapprentice: el.numberOfapprentice,
      })),
      { writeDefaults: true },
    )
    saveBuffs = useLocalStorage<Buff[]>('buffs', [], { writeDefaults: true })
    saveRessources = useLocalStorage<SaveRessources>(
      'ressources',
      {
        ressources: defaultRessources,
        baseProduction: defaultRessources,
        baseMultipliers: defaultMultipliersREssources,
      },
      { writeDefaults: true },
    )
    saveBuildings = useLocalStorage<SaveBuildings>('buildings', [], { writeDefaults: true })
    saveUnlocks = useLocalStorage<UnlocksNames[]>('unlocks', [], { writeDefaults: true })
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
    wizardStore.reset()
    // unlockStore.reset()
    schoolsStore.reset()
    storyLineStore.reset()
    appStore.reset()
    await initSave()
    boucle.lauchBoucle()
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
