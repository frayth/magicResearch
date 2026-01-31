import type { IncrementalRessources } from "@/types/ressources"
import type { EasingType } from "../composable/UseValueByLevel"

export const ressourcesMAp:Record<IncrementalRessources, {
  endValue:number,
  maxLevel:number,
  easing:EasingType
}>={
  coins:{
    endValue:1000000,
    maxLevel:200000,
    easing:'expo'
  },
  mana:{
    endValue:10000,
    maxLevel:50,
    easing:'expo'
  },
  water:{
    endValue:10000,
    maxLevel:50,
    easing:'cubic'
  },
  stone:{
    endValue:10000,
    maxLevel:50,
    easing:'cubic'
  }
}
