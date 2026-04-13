import { defineStore } from 'pinia'
import type { StoryLine, StoryLineData } from '@/types/ressources'
import { computed, ref, watch, type WatchHandle } from 'vue'
import { useWizardStore } from './wizard'
import { useAppStore } from './app'
import StoryLineText from '@/data/storyLine.data'
export const useStoryLineStore = defineStore('storyLine', () => {
  let watchingStory: WatchHandle
  const wizardStore = useWizardStore()
  const appStore = useAppStore()
  const FirstStoryWatch = () => {
    return watch(
      () => wizardStore.buildings.find((b) => b.id === 'eclatdemana')?.level,
      (level) => {
        console.log('watcher activated')
        if (level === 0) {
          console.log("setCurrentStoryLine")
          setCurrentStoryLine(storyLine.find((s) => s.id === 'story1')!)
        }else{
          console.log("OUPS watcher")
        }
      },
    )
  }

  const storyLine: StoryLine[] = [
    {
      id: 'story1',
      name: 'Un chercheur sauvage apparait',
      order: 1,
      effects: () => {},
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
          () => true,
          () => true,
          { immediate: true },
        )
      },
    },
  ]

  const currentStory = ref<StoryLine | null>(null)
  function setStoryLineModal(story: StoryLine, text: StoryLineData) {
    // TODO: Ouvrir le modal de story line
    console.log('setStoryLineModal')
    appStore.storyLineModal = {
      show: true,
      story,
      storyData: text,
    }
  }

  function setCurrentStoryLine(story: StoryLine) {
    if (story.order >= wizardStore.storyProgress.progress) {
      console.log('setCurrentStoryLine', story.order)
      currentStory.value = story
      wizardStore.storyProgress.progress = story.order
      wizardStore.storyProgress.completed = false
      story.trigger()
    }else{
      console.log('ho no , tu es pas au bon moment')
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
        setCurrentStoryLine(currentStory)
      } else {
        console.log('Stroyline fini, on la watch')
        watchingStory = currentStory.watchNextStory()
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

  return { storyLine, currentStory, setCurrentStoryLine, init,initStoryline,reset }
})
