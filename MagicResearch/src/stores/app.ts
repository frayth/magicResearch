import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const loading = ref(0)
  const isLoading = computed(() => loading.value > 0)
  const ready=ref(false)
  async function init(){
    return new Promise(resolve => {
      resolve(true)
   });
  }
  return {init,isLoading,ready }
})
