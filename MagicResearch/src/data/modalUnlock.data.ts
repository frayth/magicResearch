import type { UnlocksNames } from "@/data/unlocks.data";

export const modalMessageUnlock:{
  [k in UnlocksNames]?:string
}={
  'Cascade':'Vous avez découvert la cascade qui vous permet de produire de +water+ automatiquement',
  'Puit de mana':'Vous avez découvert le puit de mana qui vous permet de produire du +mana+ automatiquement',
  'Puit d\'eau':'Vous avez découvert le puit d\'eau qui vous permet de produire de +water+',
}
