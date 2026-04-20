import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { useWizardStore } from './wizard'
import type { UnlocksNames } from '@/data/unlocks.data'
import { exportUnlocksData } from '@/data/unlocks.data'
import type { SaveUnlocks, Unlock } from '@/types/ressources'
export const useUnlockStore = defineStore('unlock', () => {
  const unlocks = shallowRef<Unlock[]>(exportUnlocksData())
  const unlocked = ref<UnlocksNames[]>([])
  function checkUnlocks() {
    // applyManualUnlock()
    for (const unlock of unlocks.value.filter((unlock) => !unlocked.value.includes(unlock.name))) {
      if (unlock.conditions.value) {
        unlocked.value.push(unlock.name)
      }
    }
  }
  function unlock(name: UnlocksNames) {
    unlocked.value.push(name)
  }
  async function init() {
    return new Promise((resolve) => {
      resolve(true)
    })
  }
  function checkUnlockStatus(name: UnlocksNames): Boolean {
    return unlocked.value.includes(name)
  }
  function reset() {
    unlocked.value = []
  }

  return { init, unlocks, checkUnlocks,checkUnlockStatus,unlocked, reset,unlock}
})
