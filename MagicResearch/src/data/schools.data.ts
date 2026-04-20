import type { Action } from "@/types/ressources"
import { useWizardStore } from "@/stores/wizard"


export type SchoolAction = 'hire'
export function getsSchoolActions() {
  const wizardStore = useWizardStore()
  return [
    {
      name:'hire' as SchoolAction,
      id:'1',
      text:'Embaucher un apprenti',
      easing:'expo',
      cost:{
        coins:{minValue:500,maxValue:50000}
      },
      levelMax:99,
      description:'Embauche un apprenti pour aider dans votre école. +1 Apprenti',
      effects(){
        wizardStore.ressources.numberOfApprentice++
        wizardStore.ressources.coins -= 500
      }
    }
  ] as (Omit<Action, 'name'> & { name: SchoolAction })[]
}
