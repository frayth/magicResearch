import type {Buff, Spell} from '@/types/ressources';
import { useWizardStore } from '@/stores/wizard';
import { useSchoolsStore } from '@/stores/schools';
import { useMathStore } from '@/stores/math';
export function useIllusionSchoolSpells(){
  const wizardStore=useWizardStore();
  const math=useMathStore();
  const schoolsStore=useSchoolsStore();
  function SpellIsCastable(spell:Spell){
    if(spell.level>schoolsStore.conjurationSchools.level){
      console.log("spell level too high")
      return false
    }
    if(!wizardStore.checkIfRessourceAreEnough({mana:spell.cost})){
      console.log("not enough mana")
      return false
    }
    return true
  }
  const spells:Spell[]=[
{
  name:"Tour de magie",
  id:"magicshow",
  level:1,
  buff:false,
  cooldown:0,
  cost:30,
  currentCooldown:0,
  description:"Créer un spectacle de divertissement basique basé sur des illusions mineures &coins.value:+30~36& ",
  effect(this:Spell){
    const spellIsCastable=SpellIsCastable(this)
    if(spellIsCastable){
      wizardStore.removeResources("mana",this.cost)
      wizardStore.addBonus("coins",math.RandomValue(30,36))
    }
  },


}
  ]
return spells
}
