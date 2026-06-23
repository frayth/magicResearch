import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { useWizardStore } from './wizard'
import type { UnlocksNames } from '@/data/unlocks.data'
import { exportUnlocksData } from '@/data/unlocks.data'
import type {  Unlock } from '@/types/ressources'
import { unlocksText } from '@/data/unlocks.text.data'
import { useEventsStoreStore } from './eventsStore'
export const useUnlockStore = defineStore('unlock', () => {
  const unlocks = shallowRef<Unlock[]>(exportUnlocksData())
  const unlocked = ref<UnlocksNames[]>([])
  const eventsStore = useEventsStoreStore()
  function checkUnlocks() {
    // applyManualUnlock()
    for (const unlock of unlocks.value.filter((unlock) => !unlocked.value.includes(unlock.name))) {
      if (unlock.conditions.value) {
        unlocked.value.push(unlock.name)
        const unlockTextData = unlocksText.find((unlockText) => unlockText.name === unlock.name)
        if (unlockTextData) {

          eventsStore.addEvent(unlockTextData)
          //rajouter un en event dans la modalEvent
        }
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
  function checkUnlockStatus(name: UnlocksNames): boolean {
    return unlocked.value.includes(name)
  }
  function reset() {
    unlocked.value = []
  }

  return { init, unlocks, checkUnlocks,checkUnlockStatus,unlocked, reset,unlock}
})
