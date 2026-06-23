import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { EventTypes } from '@/types/ressources'

export const useEventsStoreStore = defineStore('eventsStore', () => {
  const events=ref<EventTypes[]>([])
  const showModal = ref(false)
  function addEvent(event: EventTypes) {
    if(events.value.length === 0) {
      showModal.value = true
    }
    events.value.push(event)
  }
  const currentModal =computed(()=>{
    return events.value[0]
  })
  function closeModal() {
    showModal.value = false
    events.value.shift()
    if(events.value.length > 0) {
      setTimeout(() => {
        showModal.value = true
      }, 500)
    }
  }
  return {events, addEvent, showModal, currentModal, closeModal};

});
