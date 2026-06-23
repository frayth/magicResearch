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
      type:"water",
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
      name:"Créer des cailloux",
      id:"createpebble",
      type:"earth",
      level:1,
      cost:10,
      buff:false,
      cooldown:0,
      currentCooldown:0,
      apprenticeCastTime: 60000,
      description:"Convertit du mana en quelques cailloux &stone.value:+5&",
      effect(this:Spell){
        const spellIsCastable=SpellIsCastable(this)
        if(spellIsCastable){
          wizardStore.removeResources("mana",this.cost)
          wizardStore.addRessources("stone",5)
        }
      }
    },
      {
      name:"Créer de l'eau II",
      id:"createWaterII",
      type:"water",
      level:4,
      cost:180,
      buff:false,
      cooldown:0,
      currentCooldown:0,
      apprenticeCastTime: 60000,
      description:"Convertit du mana en une grande quantité d'eau &water.value:+35&",
      effect(this:Spell){
        const spellIsCastable=SpellIsCastable(this)
        if(spellIsCastable){
          wizardStore.removeResources("mana",this.cost)
          wizardStore.addRessources("water",35)
        }
      }
    },    {
      name:"Créer du fer",
      id:"createIronOre",
      type:"earth",
      level:3,
      cost:40,
      buff:false,
      cooldown:0,
      currentCooldown:0,
      apprenticeCastTime: 60000,
      description:"Convertit du mana en une petite quantité de fer &iron.value:+35&",
      effect(this:Spell){
        const spellIsCastable=SpellIsCastable(this)
        if(spellIsCastable){
          wizardStore.removeResources("mana",this.cost)
          wizardStore.addRessources("ironOre",5)
        }
      }
    },      {
      name:"Créer de la pierre",
      id:"createRock",
      type:"earth",
      level:2,
      cost:80,
      buff:false,
      cooldown:0,
      currentCooldown:0,
      apprenticeCastTime: 60000,
      description:"Convertit du mana en quelques pierres &stone.value:+5&",
      effect(this:Spell){
        const spellIsCastable=SpellIsCastable(this)
        if(spellIsCastable){
          wizardStore.removeResources("mana",this.cost)
          wizardStore.addRessources("stone",90)
        }
      }
    }
  ]
  const buffsList:Spell[]=spells.filter((spell)=>spell.buff)
return { spells,buffsList}
}
