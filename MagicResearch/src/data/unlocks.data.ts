// données “constantes” uniquement pour les noms
import type { RessourcesKey } from '@/types/ressources'
import type { BuildingId } from '@/data/buildings.data'
//locked propertie determine if unlock can'tbe unlock automatically or not
const unlocksData = [
  {
    name: 'test',
    conditions: {
      ressources: [] as [RessourcesKey, number][],
      buildings: [] as { name: BuildingId; level: number }[],
      unlocks: [],
    },
    locked: false,
  },
  {
    name: 'Puit de mana',
    conditions: {
      ressources: [['mana', 10]],
      buildings: [] as { name: BuildingId; level: number }[],
      unlocks: [],
      locked: false,
    },
    locked: false,
  },
  {
    name: "Puit d'eau",
    conditions: {
      ressources: [['water', 10]],
      buildings: [] as { name: BuildingId; level: number }[],
      unlocks: [],
      locked: false,
    },
    locked: false,
  },
  {
    name: 'Cascade',
    conditions: {
      ressources: [['water', 10]] as [RessourcesKey, number][],
      buildings: [{ name: 'puitDeMana', level: 1 }] as { name: BuildingId; level: number }[],
      unlocks: [],
    },
    locked: false,
  },
  {
    name: 'Manashard',
    conditions: {
      ressources: [] as [RessourcesKey, number][],
      buildings: [] as { name: BuildingId; level: number }[],
      unlocks: [],
    },
    locked: true,
  },
  {
    name: 'Entrepot',
    conditions: {
      ressources: [] as [RessourcesKey, number][],
      buildings: [] as { name: BuildingId; level: number }[],
      unlocks: [],
    },
    locked: true,
  },
  {
    name: 'Forêt',
    conditions: {
      ressources: [['coins', 100]] as [RessourcesKey, number][],
      buildings: [{name:'entrepot', level:1}] as { name: BuildingId; level: number }[],
      unlocks: [],
    },
    locked: false,
  },  {
    name: 'Storage water',
    conditions: {
      ressources: [] as [RessourcesKey, number][],
      buildings: [] as { name: BuildingId; level: number }[],
      unlocks: ['Forêt'],
    },
    locked: true,
  },
    {
    name: 'lumberYard',
    conditions: {
      ressources: [] as [RessourcesKey, number][],
      buildings: [] as { name: BuildingId; level: number }[],
      unlocks: [],
    },
    locked: true,
  },
] as const

export type UnlockName = (typeof unlocksData)[number]['name']

export interface Unlock {
  name: UnlockName
  conditions: {
    ressources: [RessourcesKey, number][] // mutable
    buildings: { name: BuildingId; level: number }[]
    unlocks: UnlockName[]
  }
  unlock: boolean
  locked: boolean
}

// transformation pour rendre tout mutable
export const unlocks: Unlock[] = unlocksData.map((u) => ({
  name: u.name,
  conditions: {
    ressources: u.conditions.ressources.map(([k, v]) => [k, v] as [RessourcesKey, number]),
    buildings: [...u.conditions.buildings],
    unlocks: [...u.conditions.unlocks] as UnlockName[],
  },
  locked: u.locked,
  unlock: false,
}))
