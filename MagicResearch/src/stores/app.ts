import { ref, computed, markRaw, shallowRef, triggerRef } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { ModalComponent, StoryLine, StoryLineData } from '@/types/ressources'
import type { Component } from 'vue'
export const useAppStore = defineStore('app', () => {
  const loading = ref(0)
  const isLoading = computed(() => loading.value > 0)
  const ready = ref(false)
  const messagesModal = ref<Component[]>([])
  const modalIsShow = computed(() => messagesModal.value.length > 0)
  const storyLineModal = shallowRef<{show:boolean,story:StoryLine | null,storyData:StoryLineData | null,history:{story:StoryLine,storyData:StoryLineData}[]}>({
    show: false,
    story: null,
    storyData:null,
    history: []
  })
  const app = useLocalStorage('app', {
    version: '1.0.0',
    init: false,
  })
  async function init() {
    return new Promise((resolve) => {
      resolve(true)
    })
  }
function triggerStoryLineModal() {
  triggerRef(storyLineModal)
}
  function setModal(message: Component) {
    messagesModal.value.push(markRaw(message))
  }

  function popMessageModal() {
    messagesModal.value.pop()
  }
  function reset() {
    messagesModal.value = messagesModal.value[0] ? [messagesModal.value[0]] : []
  }
  function nextStoryline() {
    if(storyLineModal.value.history.length === 0) return
    const nextStory = storyLineModal.value.history.shift()
    if(nextStory) {
      storyLineModal.value.story = nextStory.story
      storyLineModal.value.storyData = nextStory.storyData
    }
  }
  const storyModalHasHistory = computed(() => storyLineModal.value.history.length > 0)
  return {
    init,
    isLoading,
    ready,
    app,
    messagesModal,
    modalIsShow,
    setModal,
    popMessageModal,
    reset,
    storyLineModal,
    triggerStoryLineModal,
    nextStoryline,
    storyModalHasHistory
  }
})
