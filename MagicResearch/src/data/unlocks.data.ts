// données “constantes” uniquement pour les noms
import type { RessourcesKey } from '@/types/ressources'
import type { BuildingId } from '@/data/buildings.data'
import { useWizardStore } from '@/stores/wizard'
import { useUnlockStore } from '@/stores/unlock'

import { computed, type ComputedRef } from 'vue'
//locked propertie determine if unlock can'tbe unlock automatically or not
export type UnlocksNames ='test'|'Puit de mana'|'Puit d\'eau'|'Cascade'|'Manashard'|'Entrepot'|'Forêt'|'Storage water'|'lumberYard'

export function exportUnlocksData() {
  const wizardStore = useWizardStore()
  const unlockStore = useUnlockStore()
  const unlocksData:Unlock[] = [
    {
      name: 'test',
      conditions: computed(() => {
        return wizardStore.ressources.mana >= 10
      }),

    },
    {
      name: 'Puit de mana',
      conditions: computed(() => {
        return wizardStore.ressources.mana >= 10
      }),
    },
    {
      name:'Puit d\'eau',
      conditions: computed(() => {
        return wizardStore.ressources.water >= 10
      }),
    },
    {
      name:'Cascade',
      conditions: computed(() => {
        const HasPuitEau = wizardStore.buildings.some((building) => building.id === 'puitDeMana')
        return HasPuitEau && wizardStore.ressources.water >= 10
      }),
    },
    {
      name:"Manashard",
      conditions: computed(() => {
        return wizardStore.ressources.mana >= wizardStore.ressources.manamax
      }),
    },
    {
      name:'Entrepot',
      conditions: computed(() => {
        return wizardStore.ressources.stone >= wizardStore.ressources.stonemax
      }),
    },
    {
      name:'Forêt',
      conditions: computed(() => {
        return wizardStore.ressources.coins >= 100 && wizardStore.buildings.some((building) => building.id === 'entrepot')
      }),
    },
    {
      name:'Storage water',
      conditions: computed(() => {
        const hasForet=unlockStore.unlocked.some((unlock) => unlock === 'Forêt')
        return wizardStore.ressources.water >= wizardStore.ressources.watermax && hasForet
      }),
    },
    {
      name:'lumberYard',
      conditions: computed(() => {
        const hasForet=unlockStore.unlocked.some((unlock) => unlock === 'Forêt')
        return wizardStore.ressources.wood >= 50 && hasForet
      }),
    }
  ]

  return unlocksData
}


export interface Unlock {
  name: UnlocksNames
  conditions: ComputedRef<boolean>
}
