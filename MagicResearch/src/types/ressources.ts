import type {BuildingId} from "../data/buildings.data";
export type Schools = 'illusion' | 'conjuration' | 'enchantement'
import type {UnlockName} from "../data/unlocks.data";
export interface Spell {
  name: string
  id:string,
  level: number
  cost: number
  description:string,
  buff: false | { timer: number; unique: boolean }
  cooldown: number,
  currentCooldown: number,
  effect: () => void
}
export interface Unlock {
    name: UnlockName,
    conditions: {
      ressources: ReadonlyArray<[RessourcesKey, number]>,
      buildings: ReadonlyArray<{ name: BuildingId; level: number }>,
      unlocks: ReadonlyArray<UnlockName>,
    },
    unlock: boolean
    locked: boolean
}

export interface School {
  name: string
  level: number
  baseXp: number
  currentXp: number
  exponentielXp: number
  numberOfapprentice: number,
  spells: Spell[]
}

export interface Building {
  name: string
  id:string
  level: number
  exponentialProduction: number
  bonus: number,
  effects: {
    ressources?:{
      [k in RessourcesKey]?: number
    },
    multipliers?:{
      [k in MultipliersKey]?: number
    }
  }
  cost: {
    level: number
    cost: {
      [k in RessourcesKey]?: number
    }
  }[]
}

export interface BuildingWizard {
  cost: { currentLevel: { [k in RessourcesKey]?: number }; nextLevel: { [k in RessourcesKey]?: number } }
  effects:{
    ressources?:{
      [key: string]: number
    },
    multipliers?:{
      [key: string]: number
    }
  }
  bonus: number,
  level: number
  name: string
  id:string
  exponentialProduction: number
}
export type RessourcesKey = keyof BaseProduction
type RessourcesEffects={
  [k in RessourcesKey]?: number
}

type MultipliersKey = keyof Pick<BaseMultipliers, "prodmana" | "prodwater" | "prodstone" | "manualmana" | "manualwater" | "manamax" | "watermax" | "stonemax" | "prodcoins" | "coinsmax" >
type MultipliersEffects={
  [k in MultipliersKey]?: number
}
type BuildingEffects={
  [k in BuildingId]?: number
}
type BuildingMap = Partial<Record<BuildingId, number>>
export interface Buff {
  name:string,
  duration:number,
  effects: {
    ressources?:RessourcesEffects,
    multipliers?:MultipliersEffects,
    buildings?:BuildingEffects
  }
  unique:boolean
}

export interface BaseProduction {
  mana: number
  water: number
  coins:number
  stone: number
  manamax: number
  watermax: number
  stonemax: number
  coinsmax:number
  prodcoins:number
  prodmana: number
  prodwater: number
  prodstone: number
  xpByApprentice: number
  numberOfApprentice: number,
}

export interface Ressources {
  mana: number
  coins:number
  water: number
  stone: number
  manamax: number
  watermax: number
  stonemax: number
  prodmana: number
  prodwater: number
  prodstone: number
}

export interface BaseMultipliers extends BaseProduction {
  manualmana: number
  manualwater: number
}


export type IncrementalRessources = "mana" | "water" | "stone" | "coins"
