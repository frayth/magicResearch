import Cheat from '@/components/Modals/elements/cheatModal.vue'
import type { BuildingId } from '../data/buildings.data'
export type Schools = 'illusion' | 'conjuration' | 'enchantement'
import type { UnlocksNames } from '../data/unlocks.data'
import type { EasingType } from '@/composable/UseValueByLevel'
import type { ComputedRef, WatchHandle } from 'vue'
import type { SchoolAction } from '@/data/schools.data'

export interface Spell {
  name: string
  id: string
  level: number
  cost: number
  description: string
  buff: false | { timer: number; unique: boolean }
  cooldown: number
  currentCooldown: number
  effect: () => void
}
export interface Unlock {
  name: UnlocksNames
  conditions: ComputedRef<boolean>
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
  id: string
  level: number
  levelMax: number
  easings: EasingType
  effects: {
    ressources?: {
      [k in RessourcesKey]?: number
    }
    multipliers?: {
      [k in MultipliersKey]?: number
    }
  }
  cost: {
    level: number
    cost: {
      [k in RessourcesKey]?: { minValue: number; maxValue: number }
    }
  }[]
}

export interface BuildingWizard {
  cost: { [k in RessourcesKey]?: number }
  effects: {
    ressources?: {
      [key: string]: number
    }
    multipliers?: {
      [key: string]: number
    }
  }
  level: number
  levelMax: number
  name: string
  id: BuildingId
}
export type RessourcesKey = keyof BaseProduction
type RessourcesEffects = {
  [k in RessourcesKey]?: number
}

type MultipliersKey = keyof Pick<
  BaseMultipliers,
  | 'prodmana'
  | 'prodwater'
  | 'prodstone'
  | 'manualmana'
  | 'manualwater'
  | 'manamax'
  | 'watermax'
  | 'stonemax'
  | 'prodcoins'
  | 'coinsmax'
  | 'woodmax'
  | 'prodwood'
>
type MultipliersEffects = {
  [k in MultipliersKey]?: number
}
type BuildingEffects = {
  [k in BuildingId]?: number
}
type BuildingMap = Partial<Record<BuildingId, number>>
export interface Buff {
  name: string
  duration: number
  effects: {
    ressources?: RessourcesEffects
    multipliers?: MultipliersEffects
    buildings?: BuildingEffects
  }
  unique: boolean
}
export type SaveRessources = {
  ressources: BaseProduction
  baseProduction: BaseProduction
  baseMultipliers: BaseMultipliers
}
export type SaveBuildings = {
  id: BuildingId
  level: number
}[]

export type SaveSchools ={
  schools:Pick<School, 'name' | 'currentXp' | 'level' | 'numberOfapprentice'>[],
  actions: {
    name:SchoolAction,
    level:number,
  }[]
}

export type SaveUnlocks = {
  name: UnlocksNames
  unlock: boolean
}[]

export type SaveStoryLine = {
  progress: number
  completed: boolean
}
export interface BaseProduction {
  mana: number
  water: number
  wood: number
  coins: number
  stone: number
  manamax: number
  woodmax: number
  watermax: number
  stonemax: number
  coinsmax: number
  prodwood: number
  prodcoins: number
  prodmana: number
  prodwater: number
  prodstone: number
  xpByApprentice: number
  numberOfApprentice: number
  apprenticeCapacity: number
}

export interface Ressources {
  mana: number
  coins: number
  water: number
  wood: number
  stone: number
  manamax: number
  woodmax: number
  watermax: number
  stonemax: number
  prodmana: number
  prodwood: number
  prodwater: number
  prodstone: number
}

export interface BaseMultipliers extends BaseProduction {
  manualmana: number
  manualwater: number
  manualwood: number
}

export type IncrementalRessources = 'mana' | 'water' | 'stone' | 'coins' | 'wood'

export type ModalComponent = typeof Cheat

export interface StoryLine {
  id: string
  name: string
  haveCost: boolean
  effects: () => void
  trigger: () => void
  order: number
  watchNextStory: () => WatchHandle
  completion: ComputedRef<boolean>
  buttonLabel: string
}

export type storyProgress = {
  progress: number
  completed: boolean
}

export type StoryLineData = {
  id: string
  text: string[][]
  ending: string[]
  unlock: string
}

export type Action = {
  name: string
  id: string
  text: string
  easing: EasingType
  cost: {
    [k in RessourcesKey]?: { minValue: number; maxValue: number }
  }
  levelMax:number
  description: string
  effects: () => void
}
