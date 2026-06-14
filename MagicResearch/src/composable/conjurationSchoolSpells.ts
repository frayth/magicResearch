import type {Buff, Spell} from '@/types/ressources';
import { useWizardStore } from '@/stores/wizard';
import { useSchoolsStore } from '@/stores/schools';
export function useConjurationSchoolSpells(){
  const wizardStore=useWizardStore();
  const schoolsStore=useSchoolsStore();
  function SpellIsCastable(spell:Spell){
    if(spell.level>schoolsStore.conjurationSchools.level){
      console.error("spell level too high")
      return false
    }
    if(!wizardStore.checkIfRessourceAreEnough({mana:spell.cost})){
      console.error("not enough mana")
      return false
    }
    return true
  }
  const spells:Spell[]=[
    {
      name:"Créer de l'eau",
      id:"createWater",
      level:1,
      cost:20,
      buff:false,
      cooldown:0,
      currentCooldown:0,
      apprenticeCastTime: 60000,
      description:"Convertit du mana en eau &water.value:+2&",
      effect(this:Spell){
        const spellIsCastable=SpellIsCastable(this)
        if(spellIsCastable){
          wizardStore.removeResources("mana",this.cost)
          wizardStore.addRessources("water",2)
        }
      }
    },
        {
      name:"Créer de la pierre",
      id:"createpebble",
      level:1,
      cost:10,
      buff:false,
      cooldown:0,
      currentCooldown:0,
      apprenticeCastTime: 60000,
      description:"Convertit du mana en quelques pierre &stone.value:+5&",
      effect(this:Spell){
        const spellIsCastable=SpellIsCastable(this)
        if(spellIsCastable){
          wizardStore.removeResources("mana",this.cost)
          wizardStore.addRessources("stone",5)
        }
      }
    }
  ]
  const buffsList:Spell[]=spells.filter((spell)=>spell.buff)
return { spells,buffsList}
}
