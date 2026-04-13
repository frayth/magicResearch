import { ref, computed, markRaw, shallowRef } from 'vue'
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
  const storyLineModal = shallowRef<{show:boolean,story:StoryLine,storyData:StoryLineData}| null>(null)
  const app = useLocalStorage('app', {
    version: '1.0.0',
    init: false,
  })
  async function init() {
    return new Promise((resolve) => {
      resolve(true)
    })
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
  }
})
