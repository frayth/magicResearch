import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { ModalComponent } from '@/types/ressources'
import type { Component } from 'vue'
export const useAppStore = defineStore('app', () => {
  const loading = ref(0)
  const isLoading = computed(() => loading.value > 0)
  const ready=ref(false)
  const messagesModal=ref<Component[]>([])
  const modalIsShow=computed(() => messagesModal.value.length > 0)
  const app=useLocalStorage('app', {
    version: '1.0.0',
    init:true,
  })
  async function init(){
    return new Promise(resolve => {
      resolve(true)
   });
  }

  function setModal(message: Component) {

    messagesModal.value.push(message)
  }

  function popMessageModal() {
    messagesModal.value.pop()
  }

  return {init,isLoading,ready,app,messagesModal,modalIsShow,setModal,popMessageModal }
})
