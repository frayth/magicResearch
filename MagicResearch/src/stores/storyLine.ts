import { defineStore } from 'pinia'
import type { StoryLine, StoryLineData } from '@/types/ressources'
import { computed, ref, watch, watchEffect, type WatchHandle } from 'vue'
import { useWizardStore } from './wizard'
import { useAppStore } from './app'
import { useUnlockStore } from './unlock'
import { useSchoolsStore } from './schools'
import { useBuildingsStore } from './buildings'
import StoryLineText from '@/data/storyLine.data'
export const useStoryLineStore = defineStore('storyLine', () => {
  let watchingStory: WatchHandle | null
  const wizardStore = useWizardStore()
  const appStore = useAppStore()
  const unlockStore = useUnlockStore()
  const schoolsStore = useSchoolsStore()
  const buildingsStore = useBuildingsStore()
  const checkStoryTrigger = (
    // coins: number,
    // eclatlevel: number | undefined,
    // apprenticeDormsLevel: number | undefined,
  ) => {

    // Story 1 :  Passer eclat de mana au niveau 1
    if (wizardStore.storyProgress.progress === 0 && buildingsStore.wizardBuildings.find((b) => b.id === 'eclatdemana')?.level === 1) {
      const storyToAffect = storyLine.find((story) => story.id === 'story1')
      if (storyToAffect) {
        setCurrentStoryLine(storyToAffect)
        setUpStoryModal()
      } else {
        console.error('Story 1 not found')
      }
    }

    if(wizardStore.storyProgress.progress === 4 && wizardStore.storyProgress.completed &&  buildingsStore.wizardBuildings.find((b) => b.id === 'ApprenticeDorms')?.level === 1){
      const storyToAffect = storyLine.find((story) => story.id === 'story5')
      if (storyToAffect) {
        console.log('Story 5 triggered')
        setCurrentStoryLine(storyToAffect)
        setUpStoryModal()
      } else {
        console.error('Story 5 not found')
      }
    }
    if(wizardStore.storyProgress.progress === 7 && wizardStore.storyProgress.completed && unlockStore.checkUnlockStatus('ironOre') && wizardStore.ressources?.incremental?.ironOre >= 10 ) {
      const storyToAffect = storyLine.find((story) => story.id === 'story8')
      if (storyToAffect) {
        console.log('Story 8 triggered')
        setCurrentStoryLine(storyToAffect)
        setUpStoryModal()
      } else {
        console.error('Story 8 not found')
      }
    }
  }


  const storyLine: StoryLine[] = [
    {
      id: 'story1',
      name: 'Un chercheur sauvage apparait',
      order: 1,
      haveCost: true,
      buttonLabel: 'Payer 200 pièces',
      effects: () => {
        wizardStore.ressources.incremental.coins -= 200
        unlockStore.unlock('Researcher')
        setCurrentStoryLine(storyLine.find((s) => s.id === 'story2')!)
        setUpStoryModal()
      },
      completion: computed(() => {
        return wizardStore.ressources.incremental.coins >= 200
      }),
      autocompletion: false,
      completionRate:computed(() => {
        return [
          {
            element: 'Piéces',
            goal: 200,
            current: wizardStore.ressources.incremental.coins,
          }
        ]
      })
    },
    {
      id: 'story2',
      name: 'Un Besoin de Place',
      order: 2,
      haveCost: false,
      buttonLabel: 'Continuer',
      effects: () => {
        unlockStore.unlock('cabinResearcher')
        setCurrentStoryLine(storyLine.find((s) => s.id === 'story3')!)
        setUpStoryModal()
      },
      completion: computed(() => {
        return schoolsStore.schools.some((school) => school.level >= 2)
      }),
      autocompletion: false,
      completionRate:computed(() => {
        return [
          {
            element: 'Level école la plus élevée',
            goal: 2,
            current: schoolsStore.schools.reduce((curr,acc) => curr.level > acc.level ? curr : acc).level
          }
        ]
      })
    },
    {
      id: 'story3',
      name: 'Lancer des sorts est répétitive',
      order: 3,
      haveCost: false,
      buttonLabel: 'Continuer',
      effects: () => {
        setCurrentStoryLine(storyLine.find((s) => s.id === 'story4')!)
        setUpStoryModal()
      },
      completion: computed(() => {
        return schoolsStore.schools.reduce((acc, school) => acc + school.level, 0) >= 6
      }),
      autocompletion: false,
      completionRate:computed(() => {
        return [
          {
            element: 'Level total des écoles',
            goal: 6,
            current: schoolsStore.schools.reduce((acc, school) => acc + school.level, 0)
          }
        ]
      })
    },
    {
      id: 'story4',
      name: 'Les apprentis ont besoin de repos',
      order: 4,
      haveCost: false,
      buttonLabel: 'Continuer',
      effects: () => {
        unlockStore.unlock('apprenticeDorm')
      },
      completion: computed(() => {
        return true
      }),
      autocompletion: false,
    },
    {
      id: 'story5',
      name: 'Le premier apprenti',
      order: 5,
      haveCost: false,
      buttonLabel: 'Continuer',
      effects: () => {
        unlockStore.unlock('apprentices')
        setCurrentStoryLine(storyLine.find((s) => s.id === 'story6')!)
        setUpStoryModal()
      },
      completion: computed(() => {
        return true
      }),
      autocompletion: true,
    },{
      id: 'story6',
      name: 'Stockage d\'or',
      order: 6,
      haveCost: false,
      buttonLabel: 'Continuer',
      effects: () => {
        unlockStore.unlock('vaults')
        setCurrentStoryLine(storyLine.find((s) => s.id === 'story7')!)
        setUpStoryModal()
      },
      completion: computed(() => {
        return wizardStore.ressources.incremental.coins >= 800
      }),
      autocompletion: false,
            completionRate:computed(() => {
        return [
          {
            element: 'Piéces',
            goal: 800,
            current: wizardStore.ressources.incremental.coins
          }
        ]
      })
    },{
      id: 'story7',
      name: 'Continuer les recherches',
      order: 7,
      haveCost: false,
      buttonLabel: 'Continuer',
      effects: () => {
      },
      completion: computed(() => {
        return schoolsStore.schools.reduce((acc, school) => acc + school.level, 0) >= 13
      }),
      autocompletion: false,
      completionRate:computed(() => {
        return [
          {
            element: 'Level total des écoles',
            goal: 13,
            current: schoolsStore.schools.reduce((acc, school) => acc + school.level, 0)
          }
        ]
      })
    },
    {
      id: 'story8',
      name: 'L\'atelier',
      order: 8,
      haveCost: false,
      buttonLabel: 'Construit un atelier (2000 Pieces, 2000 Bois, 100 Fer',
      effects: () => {
        unlockStore.unlock('craftStation')
        //  setCurrentStoryLine(storyLine.find((s) => s.id === 'story9')!)
        //  setUpStoryModal()
      },
      completion: computed(() => {
        return wizardStore.ressources.incremental.coins >= 2000 &&
               wizardStore.ressources.incremental.wood >= 2000 &&
               wizardStore.ressources.incremental.ironOre >= 100
      }),
      autocompletion: false,
      completionRate:computed(() => {
        return [
          {
            element: 'Pieces',
            goal: 2000,
            current: wizardStore.ressources.incremental.coins
          },
          {
            element: 'Bois',
            goal: 2000,
            current: wizardStore.ressources.incremental.wood
          },
          {
            element: 'Fer',
            goal: 100,
            current: wizardStore.ressources.incremental.ironOre
          }
        ]
      })
    }
  ]

  const currentStory = ref<StoryLine | null>(null)

  function setUpStoryModal() {
    const storyData = StoryLineText.find((s) => s.id === currentStory.value?.id)
    const story = storyLine.find((s) => s.id === currentStory.value?.id)
    if (storyData && story) setStoryLineModal(story, storyData)
  }
  function setStoryLineModal(story: StoryLine, text: StoryLineData) {
    const storyIsAffected = appStore.storyLineModal.story && appStore.storyLineModal.storyData
    const storyIsAlreadyInHistory = appStore.storyLineModal.history.some(
      (s) => s.story.id === story.id,
    )
    const storyIsNotTheSame = appStore.storyLineModal.story?.id !== story.id
    if (storyIsAffected && !storyIsAlreadyInHistory && storyIsNotTheSame) {

      appStore.storyLineModal.history.push({
        story,
        storyData: text,
      })
    } else if (!storyIsAffected) {

      appStore.storyLineModal = {
        show: true,
        story,
        storyData: text,
        history: appStore.storyLineModal.history,
      }
    } else {

      appStore.storyLineModal.show = true
      appStore.triggerStoryLineModal()
    }
  }

  function setCurrentStoryLine(story: StoryLine) {
    if(!story){
      console.error('setCurrentStoryLine', 'story is undefined')
      return
    }
    if (story.order >= wizardStore.storyProgress.progress) {
      console.log('setCurrentStoryLine', story.id)
      currentStory.value = story
      wizardStore.storyProgress.progress = story.order
      wizardStore.storyProgress.completed = false
      console.log('currentStory',wizardStore.storyProgress)
    } else {
      console.log('ho no , tu es pas au bon moment')
    }
  }
  function validateCurrentStory() {
    console.log('validateCurrentStory')
    if (currentStory.value) {
      console.log('effects')
      const effects = currentStory.value.effects
      currentStory.value = null
      wizardStore.storyProgress.completed = true
      effects()
    }
  }
  function initStoryline() {
    const currentStory = storyLine.find((s) => s.order === wizardStore.storyProgress.progress)
    if (!currentStory) {
      return
    }
    if (!wizardStore.storyProgress.completed) {
      setCurrentStoryLine(currentStory)
    }
  }

  async function init() {
    return new Promise((resolve) => {
      resolve(true)
    })
  }
  function reset() {
    currentStory.value = null
  }

  return {
    storyLine,
    currentStory,
    init,
    initStoryline,
    reset,
    validateCurrentStory,
    setUpStoryModal,
    checkStoryTrigger
  }
})
// NE CHARGE PAS LA STORYLINE DANS APP PAR DEFAUT A VOIR SI CA GENERE UN BUG
