import type { Buff, Spell } from '@/types/ressources'
import { useWizardStore } from '@/stores/wizard'
import { useSchoolsStore } from '@/stores/schools'
import { useMathStore } from '@/stores/math'
export function useEnchantementSchoolSpells() {
  const math=useMathStore()
  const wizardStore = useWizardStore()
  const schoolsStore = useSchoolsStore()
  function SpellIsCastable(spell: Spell) {
    if (spell.level > schoolsStore.conjurationSchools.level) {
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
      level: 1,
      cost: 60,
      buff: {
        timer: 30000,
        unique: true,
      },
      cooldown: 0,
      currentCooldown: 0,
      description:
        'Altere un puit de mana pour produire plus de manapour un temps limité. &mana.value:*2&',
      effect(this: Spell) {
        const spellIsCastable = SpellIsCastable(this)
        const buff: Buff = {
          name: this.name,
          duration: this.buff ? this.buff.timer : 0,
          unique: this.buff ? this.buff.unique : false,
          effects: {
            buildings: {
              puitDeMana:100
            },
          },
        }
        if (spellIsCastable) {
          wizardStore.removeResources('mana', this.cost)
          wizardStore.addBuff(buff)
        }
      },
    },
  ]
  return spells
}
