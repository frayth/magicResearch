<template>
  <Transition name="fade">
    <div v-if="currentMessage" class="modal-overlay">

      <Transition name="zoom" mode="out-in">
        <div class="modal-card" :style="{ backgroundImage: `url(${imgBackground})` }" :key="messageKey">
          <div class="modal-accent"></div>

          <div class="modal-body bg-modal" >
            <component ref="childComponent" :is="currentMessage" ></component>
          </div>

          <div class="modal-footer bg-modal">
            <button class="btn-primary" @click="nextSlide">
              <span>{{ buttonValue }}</span>
            </button>
          </div>
        </div>
      </Transition>

    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { computed,provide,ref} from 'vue'
import type { Ref } from 'vue'

const appStore = useAppStore()
const buttonValue = ref('Compris')
const currentSlide=ref(1)
const numberOfSlides=ref(1)
const imgBackground = ref('')
provide<Ref<string>>('buttonValue', buttonValue)
provide<Ref<number>>('currentSlide', currentSlide)
provide<Ref<number>>('numberOfSlides', numberOfSlides)
provide<Ref<string>>('imgBackground', imgBackground)
// Réactivité via computed
const currentMessage = computed(() => appStore.messagesModal[0])

// On crée une clé unique basée sur le message pour forcer l'animation
const messageKey = computed(() => {
  if (!currentMessage.value) return 'none'
  // On utilise soit un ID unique du message, soit sa forme stringifiée
  return JSON.stringify(currentMessage.value).length + appStore.messagesModal.length
})


function nextSlide() {
  if(currentSlide.value === numberOfSlides.value) {
    appStore.popMessageModal()
    currentSlide.value = 1
  } else {
    currentSlide.value++
  }
}
</script>

<style scoped>
/* --- Styles de base --- */
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(8px);
  z-index: 1000;

}
.bg-modal {
  background-color: rgba(15, 23, 42, 0.4);
}

.modal-card {
  background: #ffffff;
  border-radius: 20px;
  width: 100%;
  max-width: 440px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  background-size: cover;
  background-position: left;
  background-color: rgba(0,0,0,0.6);

}

/* --- ANIMATIONS --- */

/* 1. Transition du fond (Fade) */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 2. Transition de la carte (Zoom + Bounce) */
.zoom-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.zoom-leave-active {
  transition: all 0.2s ease-in;
}

.zoom-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(30px);
}
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}

/* Reste de tes styles (boutons, accent...) */
.modal-accent { height: 4px; background: linear-gradient(90deg, #3b82f6, #8b5cf6); }
.modal-body { padding: 32px; color: #1e293b; }
.modal-footer { padding: 0 32px 32px 32px; display: flex; justify-content: flex-end; }
.btn-primary {
  background: #1e293b; color: white; padding: 12px 24px; border-radius: 12px; font-weight: 600; cursor: pointer;
  transition: transform 0.2s;
}
.btn-primary:hover { transform: translateY(-2px); }
</style>
