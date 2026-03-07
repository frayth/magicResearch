import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import type { SaveSchools, School, Spell } from '@/types/ressources'
import { useConjurationSchoolSpells } from '@/composable/conjurationSchoolSpells'
import { useIllusionSchoolSpells } from '@/composable/illusionSchoolSpells'
import { useEnchantementSchoolSpells } from '@/composable/enchantementSchoolSpells'
import { useWizardStore } from './wizard'
import { useMathStore } from './math'
import { formatTime } from '@/composable/formatShowedValue'
export const useSchoolsStore = defineStore('schools', () => {
  const conjurationSchoolSpells = useConjurationSchoolSpells()
  const illusionSchoolSpells = useIllusionSchoolSpells()
  const enchantementSchoolSpells = useEnchantementSchoolSpells()
  const wizardStore = useWizardStore()
  const math = useMathStore()
  const illusionSchools = reactive<School>({
    name: 'illusion',
    level: 1,
    baseXp: 100,
    currentXp: 0,
    exponentielXp: 2,
    numberOfapprentice: 0,
    spells: illusionSchoolSpells.map((spell) => spell),
  })
  const enchantementSchools = reactive<School>({
    name: 'enchantement',
    level: 1,
    baseXp: 100,
    currentXp: 0,
    exponentielXp: 2,
    numberOfapprentice: 0,
    spells: enchantementSchoolSpells.map((spell) => spell),
  })
  const conjurationSchools = reactive<School>({
    name: 'conjuration',
    level: 1,
    baseXp: 100,
    currentXp: 0,
    exponentielXp: 2,
    numberOfapprentice: 0,
    spells: conjurationSchoolSpells.map((spell) => spell),
  })

  const schools = ref<School[]>([illusionSchools, enchantementSchools, conjurationSchools])
  async function init() {
    return new Promise((resolve) => {
      resolve(true)
    })
  }
  const availableSpells = computed<{ schoolName: string; spells: Spell[] }[]>(() => {
    return schools.value.map((school) => {
      return {
        schoolName: school.name,
        spells: school.spells.filter((spell) => spell.level <= school.level),
      }
    })
  })
  const schoolsName = computed(() => schools.value.map((school) => school.name))
  function getNextLevelXp(school: School) {
    return school.baseXp * Math.pow(school.exponentielXp, school.level)
  }
  function updateSchools(interval: number) {
    schools.value.forEach((school) => {
      school.currentXp +=
        (wizardStore.ressources.xpByApprentice *
          school.numberOfapprentice *
          math.transformPercentage(wizardStore.multipliers.xpByApprentice)) /
        interval
      if (school.currentXp >= getNextLevelXp(school)) {
        school.level++
        school.currentXp = 0
      }
      school.spells.forEach((spell) => {
        if (spell.currentCooldown > 0) {
          spell.currentCooldown -= interval
        }
        if (spell.currentCooldown < 0) {
          spell.currentCooldown = 0
        }
      })
    })
  }
  function addApprentice(school: School) {
    school.numberOfapprentice++
  }
  function removeApprentice(school: School) {
    school.numberOfapprentice--
  }
  function castSpell(spell: Spell) {
    if (spell.currentCooldown > 0) {
      console.error('spell is on cooldown')
      return
    }
    spell.currentCooldown = spell.cooldown
    spell.effect()
  }
  function timeForLevelUp(school: School) {
    const xpMax = getNextLevelXp(school)
    const deltaXp = xpMax - school.currentXp
    const timeForLevelUp =
      deltaXp / (school.numberOfapprentice * wizardStore.ressources.xpByApprentice)

    if (timeForLevelUp === Infinity) {
      return '∞'
    } else {
      return formatTime(timeForLevelUp)
    }
  }
  function setSchools(saveSchool:SaveSchools){
    schools.value.forEach(school=>{
      const currentSchool = saveSchool.find(s=>s.name === school.name)
      if (currentSchool) {
        school.level = currentSchool.level
        school.currentXp = currentSchool.currentXp
        school.numberOfapprentice = currentSchool.numberOfapprentice
      }
    })
  }
  function reset(){
    schools.value.forEach(school=>{
      school.level = 1
      school.currentXp = 0
      school.numberOfapprentice = 0
    })
  }
  return {
    schools,
    illusionSchools,
    conjurationSchools,
    enchantementSchools,
    init,
    getNextLevelXp,
    updateSchools,
    addApprentice,
    removeApprentice,
    availableSpells,
    schoolsName,
    castSpell,
    timeForLevelUp,
    setSchools,
    reset
  }
})
