import type { Buff, Spell } from '@/types/ressources'
import { useWizardStore } from '@/stores/wizard'
import { useSchoolsStore } from '@/stores/schools'
import { useMathStore } from '@/stores/math'
import { useBuildingsStore } from '@/stores/buildings'
export function useEnchantementSchoolSpells() {
  const math=useMathStore()
  const wizardStore = useWizardStore()
  const schoolsStore = useSchoolsStore()
  const buildingsStore = useBuildingsStore()
  function SpellIsCastable(spell: Spell) {
    if (spell.level > schoolsStore.enchantementSchools.level) {
      console.error('spell level too high')
      return false
    }
    if (!wizardStore.checkIfRessourceAreEnough({ mana: spell.cost })) {
      console.error('not enough mana')
      return false
    }
    return true
  }
  const spells: Spell[] = [
    {
      name: 'Enchantement du puit de mana',
      id: 'enchantementDuPuitDeMana',
      type: 'none',
      level: 1,
      cost: 60,
      apprenticeCastTime: 60000,
      buff: {
        timer: 30000,
        unique: true,
        effects:()=>{
          const puitDeMana = buildingsStore.wizardBuildings.find((building) => building.id === 'puitDeMana')
          if (puitDeMana) {
            puitDeMana.multiplier += 100
          }
        },
      },
      cooldown: 0,
      currentCooldown: 0,
      description:
        'Altere un puit de mana pour produire plus de mana pour un temps limité. &mana.value:*2&',
      effect(this: Spell) {
        const spellIsCastable = SpellIsCastable(this)
        const currentBuff: Buff = {
          name: this.name,
          duration: this.buff ? this.buff.timer : 0,
          unique: this.buff ? this.buff.unique : false,
          effects:this.buff? this.buff.effects : () => {},
        }
        if (spellIsCastable) {
            wizardStore.removeResources('mana', this.cost)
            wizardStore.addBuff(currentBuff)
        }
      },
    },
        {
      name: 'Enchantement de la scierie',
      id: 'enchantementDeLaScierie',
      type: 'none',
      level: 3,
      cost: 60,
      apprenticeCastTime: 60000,
      buff: {
        timer: 30000,
        unique: true,
        effects:()=>{
          const lumberYard = buildingsStore.wizardBuildings.find((building) => building.id === 'lumberYard')
          if (lumberYard) {
            lumberYard.multiplier += 100
          }
        },
      },
      cooldown: 0,
      currentCooldown: 0,
      description:
        'Altere votre scierie pour produire plus de bois pour un temps limité. &wood.value:*2&',
      effect(this: Spell) {
        const spellIsCastable = SpellIsCastable(this)
        const currentBuff: Buff = {
          name: this.name,
          duration: this.buff ? this.buff.timer : 0,
          unique: this.buff ? this.buff.unique : false,
          effects:this.buff? this.buff.effects : () => {},
        }
        if (spellIsCastable) {
            wizardStore.removeResources('mana', this.cost)
            wizardStore.addBuff(currentBuff)
        }
      },
    },
  ]
  const buffsList:Spell[]=spells.filter((spell)=>spell.buff)
  return {spells,buffsList}
}
