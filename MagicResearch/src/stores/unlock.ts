import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useWizardStore } from './wizard'
import type { UnlockName } from '@/data/unlocks.data'
import { unlocks as unlocksData } from '@/data/unlocks.data'
import type { SaveUnlocks, Unlock } from '@/types/ressources'
export const useUnlockStore = defineStore('unlock', () => {
  const wizardStore = useWizardStore()
  const unlocks = ref<Unlock[]>(unlocksData)

  function checkUnlocks() {
    applyManualUnlock()
    for (const unlock of unlocks.value.filter((unlock) => !unlock.unlock)) {
      if (unlockConditionIsMet(unlock) && !unlock.locked) {
        unlock.unlock = true
      }
    }
  }

  async function init() {
    return new Promise((resolve) => {
      resolve(true)
    })
  }
  function checkUnlockStatus(name: UnlockName): Boolean {
    const unlock = unlocks.value.find((unlock) => unlock.name === name)
    if (unlock) {
      return unlock.unlock
    }
    return false
  }

  function unlockConditionIsMet(unlock: Unlock): boolean {
    return (
      unlock.conditions.ressources?.every(([ressource, quantity]) =>
        wizardStore.ressources[ressource] ? wizardStore.ressources[ressource] >= quantity : false,
      ) &&
      unlock.conditions.buildings.every(({ name, level }) =>
        wizardStore.buildings.some((building) => building.name === name && building.level >= level),
      ) &&
      unlock.conditions.unlocks.every(
        (unlockName) => unlocks.value.find((u) => u.name === unlockName)?.unlock,
      )
    )
  }

  function applyManualUnlock() {
    if (!unlocks.value.find((unlock) => unlock.name === 'Manashard')?.unlock) {
      const unlock = unlocks.value.find((unlock) => unlock.name === 'Manashard')
      if (wizardStore.ressources.mana >= wizardStore.ressources.manamax && unlock)
        unlock.unlock = true // si mana === mana Max
    }
    if (!unlocks.value.find((unlock) => unlock.name === 'Entrepot')?.unlock) {
      const unlock = unlocks.value.find((unlock) => unlock.name === 'Entrepot')
      if (wizardStore.ressources.stone >= wizardStore.ressources.stonemax && unlock)
        unlock.unlock = true // si stone === stone Max
    }
    if (!unlocks.value.find((unlock) => unlock.name === 'Storage water')?.unlock) {
      const unlock = unlocks.value.find((unlock) => unlock.name === 'Storage water')
      if (unlock && unlockConditionIsMet(unlock) && wizardStore.ressources.water >= wizardStore.ressources.watermax) {
        unlock.unlock = true // si water === water Max
      }
    }
    if (!unlocks.value.find((unlock) => unlock.name === 'lumberYard')?.unlock) {
      const unlock = unlocks.value.find((unlock) => unlock.name === 'lumberYard')
      if (unlock && unlockConditionIsMet(unlock) && wizardStore.ressources.wood >= 50) {
        unlock.unlock = true // si water === water Max
      }
    }
  }

  function setUnlock(array: SaveUnlocks) {
    unlocks.value.forEach((unlock) => {
      const unlockSave = array.find((unlockSave) => unlockSave.name === unlock.name)
      if (unlockSave) {
        unlock.unlock = unlockSave.unlock
      }
    })
  }
  function reset() {
    unlocks.value.forEach((unlock) => {
      unlock.unlock = false
    })
  }
  return { init, unlocks, checkUnlocks, checkUnlockStatus, setUnlock, reset }
})
