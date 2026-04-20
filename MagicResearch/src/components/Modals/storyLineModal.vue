<template>
  <div class="modal-overlay">
    <div class="slide-card">
      <button class="btn-close-circle" title="Fermer" @click="close">
        <span class="cross">×</span>
      </button>

      <header class="card-header" >
        <h2 class="title">{{ appStore.storyLineModal?.story!.name }} ({{ slideIndex + 1 }}/{{ textArray!.length }})</h2>
        <div class="nav-group" v-if="!questCompleted">
          <button class="nav-btn" @click="decrementSlide">←</button>
          <button class="nav-btn" @click="incrementSlide">→</button>
        </div>
      </header>


      <main class="slide-content" v-if="!questCompleted">
        <div class="content-placeholder" v-for="(text,i) in textArray![slideIndex]" :key="`text${i}`">{{text}}</div>
      </main>
      <main class="slide-content" v-else >
        <div class="content-placeholder" v-for="(text,i) in endText" :key="`textEnd${i}`">{{text}}</div>
        <div class="unlock-text">{{unlockText}}</div>
      </main>

      <footer class="card-footer" v-if="slideIndex === (textArray?.length ?? 0) - 1">
        <button v-if="!questCompleted" :class="{'btn-secondary': true,'btn-validate': conditionIsTrue}" @click="valideQuest">{{appStore.storyLineModal?.story!.buttonLabel}}</button>
        <button class="btn-primary" @click="close">{{questCompleted ? 'Fermer' : 'Plus tard'}}</button>
      </footer>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import {useStoryLineStore} from '@/stores/storyLine'
import { onMounted, ref } from 'vue'
const questCompleted = ref(false)
const appStore = useAppStore()
const storyStore = useStoryLineStore()
const slideIndex = ref(0)

const textArray=ref(appStore.storyLineModal!.storyData?.text.map((text) => text))
const endText = ref(appStore.storyLineModal!.storyData?.ending.map((text) => text))
const unlockText = ref(appStore.storyLineModal!.storyData?.unlock)
const conditionIsTrue = appStore.storyLineModal?.story?.completion
function init() {
  slideIndex.value = 0
  questCompleted.value = false
  textArray.value=appStore.storyLineModal!.storyData?.text.map((text) => text)
  endText.value=appStore.storyLineModal!.storyData?.ending.map((text) => text)
  unlockText.value=appStore.storyLineModal!.storyData?.unlock
}

function close() {
  console.log('close')
  if(appStore.storyModalHasHistory && questCompleted.value ){
    appStore.nextStoryline()
    appStore.triggerStoryLineModal()
    init()
  }else{
    appStore.storyLineModal!.show = false
    appStore.triggerStoryLineModal()
  }
}
function decrementSlide() {
  slideIndex.value===0 ? slideIndex.value=0 : slideIndex.value--
}
function incrementSlide() {
  if (textArray.value) {
    slideIndex.value === textArray.value.length-1 ? slideIndex.value=textArray.value.length-1 : slideIndex.value++
  }
}
function valideQuest() {
  console.log(conditionIsTrue)
  if (conditionIsTrue?.value) {
    questCompleted.value = true
    storyStore.validateCurrentStory()
  }
}
onMounted(() => {
  init()
})
</script>
<style scoped>
.unlock-text {
  color: #10b981;
  font-weight: bold;
  text-align: center;
}
/* Overlay et Conteneur */
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(2, 6, 23, 0.85);
  backdrop-filter: blur(8px);
  z-index: 2000;
  font-family: 'Inter', sans-serif;
}

.slide-card {
  position: relative;
  width: 85%;
  max-width: 500px; /* Taille réduite (anciennement 650px) */
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 20px;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
}

/* Bouton Croix (Coin supérieur droit) */
.btn-close-circle {
  all: unset;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  width: 28px;
  height: 28px;
  background: #1e293b;
  border: 1px solid #475569;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
}

.btn-close-circle:hover {
  background: #f43f5e;
  border-color: #fb7185;
}

/* Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px; /* Padding réduit */
  background: rgba(15, 23, 42, 0.4);
  border-bottom: 1px solid #334155;
  border-radius: 20px 20px 0 0;
}

.title {
  margin: 0;
  font-size: 1rem; /* Texte plus petit */
  font-weight: 700;
  color: #f8fafc;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}



/* Contenu */
.slide-content {
  padding: 32px 32px; /* Espacement réduit */
  min-height: 180px; /* Hauteur réduite */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #cbd5e1;
}

.content-placeholder {
  font-size: 0.95rem; /* Texte réduit (anciennement 1.15rem) */
  text-align: center;
  width: 100%;
  line-height: 1.6;
  background: none;
  border: none;
}

/* Footer */
.card-footer {
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(15, 23, 42, 0.4);
  border-top: 1px solid #334155;
  border-radius: 0 0 20px 20px;
}

.btn-primary,
.btn-secondary {
  all: unset;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.85rem; /* Boutons plus discrets */
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-secondary {
  color: #94a3b8;
  border: 1px solid #334155;
}
.nav-group {
  display: flex;
  flex-direction: row; /* Force l'alignement horizontal */
  gap: 8px; /* Espace entre les deux flèches */
}

.nav-btn {
  all: unset;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #3b82f6;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* État Hover pour les flèches */
.nav-btn:hover {
  background: #3b82f6;
  color: #ffffff;
  border-color: #60a5fa;
  transform: translateY(-1px);
}

/* État quand le bouton est cliqué */
.nav-btn:active {
  transform: translateY(0);
  background: #2563eb;
}

/* Optionnel : Style si le bouton est désactivé (fin de slide) */
.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  filter: grayscale(1);
}
.btn-validate {
  background: #10b981 !important; /* Vert Émeraude éclatant */
  color: #ffffff !important;
  border: 1px solid #34d399 !important;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-validate:hover {
  background: #059669 !important; /* Vert plus sombre au survol */
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(16, 185, 129, 0.5);
  border-color: #6ee7b7 !important;
}

.btn-validate:active {
  transform: translateY(0);
}

/* État désactivé visuel si la condition est fausse (optionnel) */
.btn-secondary:not(.btn-validate) {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(0.5);
}
</style>
