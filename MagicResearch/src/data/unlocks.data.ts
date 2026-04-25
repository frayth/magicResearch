// données “constantes” uniquement pour les noms
import type { RessourcesKey } from '@/types/ressources'
import type { BuildingId } from '@/data/buildings.data'
import { useWizardStore } from '@/stores/wizard'
import { useUnlockStore } from '@/stores/unlock'
import { useBuildingsStore } from '@/stores/buildings'

import { computed, type ComputedRef } from 'vue'
//locked propertie determine if unlock can'tbe unlock automatically or not
export type UnlocksNames ='test'|'Puit de mana'|'Puit d\'eau'|'Cascade'|'Manashard'|'Entrepot'|'Forêt'|'Storage water'|'lumberYard'|'Researcher'|'cabinResearcher'

export function exportUnlocksData() {
  const wizardStore = useWizardStore()
  const unlockStore = useUnlockStore()
  const buildingsStore = useBuildingsStore()
  const unlocksData:Unlock[] = [
    {
      name: 'test',
      conditions: computed(() => {
        return wizardStore.ressources.incremental.mana >= 10
      }),

    },
    {
      name: 'Puit de mana',
      conditions: computed(() => {
        return wizardStore.ressources.incremental.mana >= 10
      }),
    },
    {
      name:'Puit d\'eau',
      conditions: computed(() => {
        return wizardStore.ressources.incremental.water >= 10
      }),
    },
    {
      name:'Cascade',
      conditions: computed(() => {
        const HasPuitEau = buildingsStore.wizardBuildings.some((building) => building.id === 'puitDeMana')
        return HasPuitEau && wizardStore.ressources.incremental.water >= 10
      }),
    },
    {
      name:"Manashard",
      conditions: computed(() => {
        return wizardStore.ressources.incremental.mana >= wizardStore.ressources.limits.manamax
      }),
    },
    {
      name:'Entrepot',
      conditions: computed(() => {
        return wizardStore.ressources.incremental.stone >= wizardStore.ressources.limits.stonemax
      }),
    },
    {
      name:'Forêt',
      conditions: computed(() => {
        return wizardStore.ressources.incremental.coins >= 100 && buildingsStore.wizardBuildings.some((building) => building.id === 'entrepot')
      }),
    },
    {
      name:'Storage water',
      conditions: computed(() => {
        const hasForet=unlockStore.unlocked.some((unlock) => unlock === 'Forêt')
        return wizardStore.ressources.incremental.water >= wizardStore.ressources.limits.watermax && hasForet
      }),
    },
    {
      name:'lumberYard',
      conditions: computed(() => {
        const hasForet=unlockStore.unlocked.some((unlock) => unlock === 'Forêt')
        return wizardStore.ressources.incremental.wood >= 50 && hasForet
      })
    },
    {
      name:'Researcher',
      conditions: computed(() =>{
        return false
      })
    },{
      name:'cabinResearcher',
      conditions: computed(() =>{
        return false
      })
    }
  ]

  return unlocksData
}


export interface Unlock {
  name: UnlocksNames
  conditions: ComputedRef<boolean>
}
