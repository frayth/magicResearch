import type { Item } from "@/types/ressources"
import { useWizardStore } from "@/stores/wizard"
import { useUnlockStore } from "@/stores/unlock"
import { computed } from "vue"
export function exportItemsData() {
  const wizardStore = useWizardStore()
  const unlockStore = useUnlockStore()
  const itemsList: Item[] = [
    {
      name: 'potion',
      id: 0,
      effects: () => {
        wizardStore.wizardEntity.heal(10)
      },
      imageUrl: 'items/potionHeal.png',
      description: 'Une potion qui régénère 10 points de vie',
      available: computed(() => unlockStore.checkUnlockStatus('craftStation'))
    }
  ]

  return itemsList
}
