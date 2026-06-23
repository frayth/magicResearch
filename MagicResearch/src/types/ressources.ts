import Cheat from '@/components/Modals/elements/cheatModal.vue'
import type { BuildingId } from '../data/buildings.data'
export type Schools = 'illusion' | 'conjuration' | 'enchantement'
import type { UnlocksNames } from '../data/unlocks.data'
import type { EasingType } from '@/composable/UseValueByLevel'
import type { ComputedRef, WatchHandle } from 'vue'
import type { SchoolAction } from '@/data/schools.data'
type Elements = 'water' | 'earth' | 'fire' | 'air' | 'light' | 'dark' |'none'
export type CharactersStatistics ={
  life:number,
  maxLife:number
  damage:number
  agility:number,
  strength:number,
  intelligence:number
  luck:number
  regenHp:number
}
export interface Item {
  name:string
  id:number
  effects:()=>void
  imageUrl:string,
  description:string
  available:ComputedRef<boolean>
}
export type CharactersStatisticsKeys = keyof CharactersStatistics
export interface Spell {
  name: string
  id: string
  type:Elements
  level: number
  cost: number
  description: string
  buff: false | { timer: number; unique: boolean ,effects: () => void }
  cooldown: number
  currentCooldown: number
  effect: () =>  void
  apprenticeCastTime:number
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
  numberOfResearcher: number
  spells: Spell[]
}

export interface Building {
  name: string
  id: BuildingId
  level: number
  currentlevel:number
  levelMax: number
  easings: EasingType
  evolutif:boolean
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
  currentLevel:number
}[]

export type SaveSchools = {
  schools: Pick<School, 'name' | 'currentXp' | 'level' | 'numberOfResearcher'>[]
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
  order: number
  completion: ComputedRef<boolean>
  buttonLabel: string
  autocompletion:boolean
  completionRate?:ComputedRef<StorylineCompletionRate>
}
export type StorylineCompletionRate = {
  element: string,
  goal:number,
  current:number,
}[]
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
  apprenticeKey: string
}
export type SaveApprenticeCast = {
  actualConfiguration: ConfigurationCastApprentice
  configurations: ConfigurationCastApprenticeData[]
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
  ironOre:number
  fire:number
}
export type productionRessources = {
  prodmana: number
  prodwater: number
  prodwood: number
  prodcoins: number
  prodstone: number
  prodironOre: number
  prodfire: number
}
export type limitsRessources = {
  manamax: number
  watermax: number
  woodmax: number
  stonemax: number
  coinsmax: number
  ironOremax: number
  firemax: number
}
export type manualRessources = {
  manualmana: number
  manualwater: number
  manualwood: number
  manualironOre: number
}
export type multipliersRessources = {
  prodmana: number
  prodwater: number
  prodwood: number
  prodfire: number
  prodcoins: number
  prodstone: number
  prodironOre: number
  manualmana: number
  manualwater: number
  manualironOre: number
  manualwood: number
  manamax: number
  firemax: number
  watermax: number
  woodmax: number
  stonemax: number
  coinsmax: number
  xpByResearcher: number
  researcherCapacity: number
  numberOfResearcher: number
  numberOfApprentice: number
  apprenticeCapacity: number
}
export type SchoolRessources = {
  numberOfResearcher: number
  xpByResearcher: number
  researcherCapacity: number
  numberOfApprentice: number
  apprenticeCapacity: number
}
export type BuildingWizard = {
  cost: Record<RessourcesKey, number>
  level: number
  id: BuildingId
  name: string
  effects: () => void
  levelMax: number
}

export type ConfigurationCastApprentice = {
  spellId: string
  apprenticeNumber: number
}[]

export type ConfigurationCastApprenticeData = {
  name: string
  configuration: ConfigurationCastApprentice
}
export type EventTypes= UnlockEvent | EventEvent
export type UnlockEvent = {
  type: "unlock"
  name:UnlocksNames
  title:string
  text:string[]
  unlock:string
  button:string
}
export type EventEvent = {
  type: "event"
  name:string
  text:string[]
  button:string
}

export type Entitie = {
  stats: CharactersStatistics
  alive:ComputedRef<boolean>
  name:string
  id:string


}
