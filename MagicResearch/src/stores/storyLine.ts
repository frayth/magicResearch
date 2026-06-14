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
    coins: number,
    eclatlevel: number | undefined,
    apprenticeDormsLevel: number | undefined,
  ) => {

    // Story 1 :  Passer eclat de mana au niveau 1
    if (wizardStore.storyProgress.progress === 0 && eclatlevel === 1) {
      const storyToAffect = storyLine.find((story) => story.id === 'story1')
      if (storyToAffect) {
        setCurrentStoryLine(storyToAffect)
        setUpStoryModal()
      } else {
        console.error('Story 1 not found')
      }
    }

    if(wizardStore.storyProgress.progress === 4 && wizardStore.storyProgress.completed && apprenticeDormsLevel === 1){
      const storyToAffect = storyLine.find((story) => story.id === 'story5')
      if (storyToAffect) {
        console.log('Story 5 triggered')
        setCurrentStoryLine(storyToAffect)
        setUpStoryModal()
      } else {
        console.error('Story 5 not found')
      }
    }
  }

  watch(
    [
      //Ressources
      () => wizardStore.ressources?.incremental?.coins,
      //Buildings
      () => buildingsStore.wizardBuildings.find((b) => b.id === 'eclatdemana')?.level,
      () => buildingsStore.wizardBuildings.find((b) => b.id === 'ApprenticeDorms')?.level,
    ],
    ([coins, eclatlevel, apprenticeDormsLevel]) => {
      checkStoryTrigger(0, eclatlevel, apprenticeDormsLevel)
    },
  )

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
        //setCurrentStoryLine(storyLine.find((s) => s.id === 'story6')!)
        //setUpStoryModal()
      },
      completion: computed(() => {
        return true
      }),
      autocompletion: true,
    },
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
  }
})
// NE CHARGE PAS LA STORYLINE DANS APP PAR DEFAUT A VOIR SI CA GENERE UN BUG
