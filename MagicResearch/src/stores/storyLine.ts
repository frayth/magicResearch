import { defineStore } from 'pinia'
import type { StoryLine, StoryLineData } from '@/types/ressources'
import { computed, ref, watch, watchEffect, type WatchHandle } from 'vue'
import { useWizardStore } from './wizard'
import { useAppStore } from './app'
import { useUnlockStore } from './unlock'
import { useSchoolsStore } from './schools'
import StoryLineText from '@/data/storyLine.data'
import { set } from '@vueuse/core'
export const useStoryLineStore = defineStore('storyLine', () => {
  let watchingStory: WatchHandle
  const wizardStore = useWizardStore()
  const appStore = useAppStore()
  const unlockStore = useUnlockStore()
  const schoolsStore = useSchoolsStore()
  const FirstStoryWatch = () => {
    return watch(
      () => wizardStore.buildings.find((b) => b.id === 'eclatdemana')?.level,
      (level) => {
        console.log('watcher activated')
        if (level === 0) {
          console.log('setCurrentStoryLine')
          setCurrentStoryLine(storyLine.find((s) => s.id === 'story1')!)
        } else {
          console.log('OUPS watcher')
        }
      },
    )
  }

  const storyLine: StoryLine[] = [
    {
      id: 'story1',
      name: 'Un chercheur sauvage apparait',
      order: 1,
      haveCost: true,
      buttonLabel: 'Payer 200 pièces',
      effects: () => {
        wizardStore.ressources.coins -= 200
        unlockStore.unlock('Researcher')
      },
      trigger: () => {
        const storyData = StoryLineText.find((s) => s.id === 'story1')!
        const self = storyLine.find((s) => s.id === 'story1')!
        setStoryLineModal(self, storyData)
      },
      completion: computed(() => {
        return wizardStore.ressources.coins >= 200
      }),
      watchNextStory: () => {
        return watch(
          {},
          () => {
            setCurrentStoryLine(storyLine.find((s) => s.id === 'story2')!)
          },
          { immediate: true },
        )
      },
    },
    {
      id: 'story2',
      name: 'Un Besoin de Place',
      order: 2,
      haveCost: false,
      buttonLabel: 'Continuer',
      effects: () => {
        // TODO: Ajouter les effets de la story line
      },
      trigger: () => {
        const storyData = StoryLineText.find((s) => s.id === 'story2')!
        const self = storyLine.find((s) => s.id === 'story2')!
        setStoryLineModal(self, storyData)
      },
      completion: computed(() => {
        return schoolsStore.schools.some((school) => school.level > 1)
      }),
      watchNextStory: () => {
        return watch(
          ref({}),
          () => {
            //setCurrentStoryLine(storyLine.find((s) => s.id === 'story3')!)
          },
          { immediate: true },
        )
      },
    },
  ]

  const currentStory = ref<StoryLine | null>(null)
  function setStoryLineModal(story: StoryLine, text: StoryLineData) {
    // TODO: Ouvrir le modal de story line
    console.log('setStoryLineModal')
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

  function setCurrentStoryLine(story: StoryLine, withTrigger = true) {
    if (story.order >= wizardStore.storyProgress.progress) {
      console.log('setCurrentStoryLine', story.order)
      currentStory.value = story
      wizardStore.storyProgress.progress = story.order
      wizardStore.storyProgress.completed = false
      if (withTrigger) {
        console.log('trigger story')
        story.trigger()
      }
    } else {
      console.log('ho no , tu es pas au bon moment')
    }
  }
  function validateCurrentStory() {
    if (currentStory.value) {
      const story = currentStory.value
      currentStory.value.effects()
      wizardStore.storyProgress.completed = true
      currentStory.value = null
      watchingStory = story.watchNextStory()
      watchingStory?.()
    }
  }
  function initStoryline() {
    if (wizardStore.storyProgress.progress === 0) {
      // check la progression sdu joueur affect la firstWatch si debut sinon affecter le bon watch
      watchingStory = FirstStoryWatch()
    } else {
      const currentStory = storyLine.find((s) => s.order === wizardStore.storyProgress.progress)
      if (!currentStory) {
        console.error('Story not found , affectation error')
        return
      }
      if (!wizardStore.storyProgress.completed) {
        console.log('Stroyline pas fini, on la lance')
        setCurrentStoryLine(currentStory, false)
      } else {
        console.log('Stroyline fini, on la watch')

        watchingStory = currentStory.watchNextStory()
        watchingStory?.()
      }
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
    setCurrentStoryLine,
    init,
    initStoryline,
    reset,
    validateCurrentStory,
  }
})
