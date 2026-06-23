import { defineStore } from 'pinia'
import { useApprenticeCast as useCast, type ApprenticeCast } from '@/composable/apprenticeCast'
import { useSchoolsStore } from './schools'
import { ref, watch } from 'vue'
import { useWizardStore } from './wizard'

import type {
  ConfigurationCastApprentice,
  ConfigurationCastApprenticeData,
} from '@/types/ressources'

export const useApprenticeCastStore = defineStore('apprenticeCast', () => {
  const schoolsStore = useSchoolsStore()
  const wizardStore = useWizardStore()
  const spellsList = ref(
    schoolsStore.schools.flatMap((school) => school.spells.map((spell) => useCast(spell))),
  )
  const actualConfiguration = ref<ConfigurationCastApprentice>([])
  const configurations = ref<ConfigurationCastApprenticeData[]>([])
  async function init() {
    return new Promise((resolve) => {
      resolve(true)
    })
  }

  watch(
    spellsList,
    () => {
      spellsList.value.forEach((spell) => {
        if (spell.numberOfApprentices > 0) {
          const existingConfig = actualConfiguration.value.find(
            (config) => config.spellId === spell.spellRef.id,
          )
          if (!existingConfig) {
            actualConfiguration.value.push({
              spellId: spell.spellRef.id,
              apprenticeNumber: spell.numberOfApprentices,
            })
          } else {
            existingConfig.apprenticeNumber = spell.numberOfApprentices
          }
        } else {
          if (actualConfiguration.value.find((config) => config.spellId === spell.spellRef.id)) {
            actualConfiguration.value = actualConfiguration.value.filter(
              (config) => config.spellId !== spell.spellRef.id,
            )
          }
        }
      })
    },
    { deep: true },
  )

function saveConfiguration(name: string) {
  const snapshot = actualConfiguration.value.map(c => ({ ...c })) // clone chaque objet
  const config = configurations.value.find((config) => config.name === name)
  if (config) {
    config.configuration = snapshot
    return
  }
  configurations.value.push({ name, configuration: snapshot })
}
  function loadConfiguration(configuration:ConfigurationCastApprentice) {
    const numberOFApprenticesToAffects = configuration.reduce((acc, config) => acc + config.apprenticeNumber, 0)
    if(numberOFApprenticesToAffects > wizardStore.ressources.school.apprenticeCapacity){
      console.error("La configuration sélectionnée nécessite plus d'apprentis que disponibles")
      return
    }
    resetApprentices()
    spellsList.value.forEach((spell) => {
      const config = configuration.find((config) => config.spellId === spell.spellRef.id)
      if (config) {
        spell.setNumberOfApprentice(config.apprenticeNumber)
      }
    })
  }
  function resetApprentices() {
    spellsList.value.forEach((spell) => {
      spell.setNumberOfApprentice(0)
    })
  }
  function deleteConfiguration(name:string) {
    configurations.value = configurations.value.filter((config) => config.name !== name)
  }
  function resetall(){
    resetApprentices()
    actualConfiguration.value = []
    configurations.value = []
  }
  return { init, spellsList, actualConfiguration, configurations, saveConfiguration, loadConfiguration, resetApprentices, deleteConfiguration, resetall }

})
