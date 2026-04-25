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
  numberOfapprentice: number
  spells: Spell[]
}

export interface Building {
  name: string
  id: BuildingId
  level: number
  levelMax: number
  easings: EasingType
  multiplier: number
  effects: (this: Building) => void
  cost: {
    level: number
    cost: {
      [k in RessourcesKey]?: { minValue: number; maxValue: number }
    }
  }[]
}

export type RessourcesKey = keyof Ressources['incremental']
type RessourcesEffects = {
  [k in RessourcesKey]?: number
}

export interface Buff {
  name: string
  duration: number
  effects: () => void
  unique: boolean
}
export type SaveRessources = {
  current: Ressources
  starting: Ressources
}
export type SaveBuildings = {
  id: BuildingId
  level: number
}[]

export type SaveSchools = {
  schools: Pick<School, 'name' | 'currentXp' | 'level' | 'numberOfapprentice'>[]
  actions: {
    name: SchoolAction
    level: number
  }[]
}

export type SaveStoryLine = {
  progress: number
  completed: boolean
}

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
  levelMax: number
  description: string
  effects: () => void
}
export type SaveKeys = {
  ressourcesKey: string
  schoolKey: string
  buildingKey: string
  unlockKey: string
  buffKey: string
  storyLineKey: string
}

export type Ressources = {
  incremental: IncrementalRessources
  production: productionRessources
  limits: limitsRessources
  school: SchoolRessources
  manual: manualRessources
  multipliers: multipliersRessources
}

export type IncrementalRessources = {
  mana: number
  water: number
  wood: number
  coins: number
  stone: number
}
export type productionRessources = {
  prodmana: number
  prodwater: number
  prodwood: number
  prodcoins: number
  prodstone: number
}
export type limitsRessources = {
  manamax: number
  watermax: number
  woodmax: number
  stonemax: number
  coinsmax: number
}
export type manualRessources = {
  manualmana: number
  manualwater: number
  manualwood: number
}
export type multipliersRessources = {
  prodmana: number
  prodwater: number
  prodwood: number
  prodcoins: number
  prodstone: number
  manualmana: number
  manualwater: number
  manualwood: number
  manamax: number
  watermax: number
  woodmax: number
  stonemax: number
  coinsmax: number
  xpByApprentice: number
  apprenticeCapacity: number
  numberOfApprentice: number
}
export type SchoolRessources = {
  xpByApprentice: number
  apprenticeCapacity: number
  numberOfApprentice: number
}
export type BuildingWizard = {
  cost: Record<RessourcesKey, number>
  level: number
  id: BuildingId
  name: string
  effects: () => void
  levelMax: number
}
