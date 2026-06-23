<template>
  <Transition name="grimoire-fade">
    <div class="modal-overlay" v-if="appStore.storyLineModal?.show">
      <div class="slide-card">
        <button class="btn-close-circle" title="Fermer" @click="close">
          <span class="cross">×</span>
        </button>

        <header class="card-header">
          <h2 class="title">{{ appStore.storyLineModal?.story!.name }} ({{ slideIndex + 1 }}/{{ textArray!.length }})</h2>
          <div class="nav-group" v-if="!questCompleted">
            <button class="nav-btn" :disabled="slideIndex === 0" @click="decrementSlide">←</button>
            <button class="nav-btn" :disabled="slideIndex === (textArray?.length ?? 0) - 1" @click="incrementSlide">→</button>
          </div>
        </header>

        <main class="slide-content-wrapper">
          <Transition name="slide-pop" mode="out-in">
            <div :key="slideIndex + '-' + questCompleted" class="slide-content-inner">
              <main class="slide-content" v-if="!questCompleted">
                <div class="content-placeholder" v-for="(text, i) in textArray![slideIndex]" :key="`text${i}`">
                  {{ text }}
                </div>
              </main>
              <main class="slide-content" v-else>
                <div class="content-placeholder" v-for="(text, i) in endText" :key="`textEnd${i}`">
                  {{ text }}
                </div>
                <div class="unlock-text">{{ unlockText }}</div>
              </main>
            </div>
          </Transition>
        </main>

        <footer class="card-footer" v-if="slideIndex === (textArray?.length ?? 0) - 1">
          <div class="completion-container" v-if="currentCompletionRate && currentCompletionRate.length > 0 && !questCompleted">
            <div class="completion-row" v-for="(rate, i) in currentCompletionRate" :key="`rate${i}`">
              <div class="completion-info">
                <span class="completion-element">{{ rate.element }}</span>
              </div>
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{ width: `${Math.min(100, Math.max(0, (rate.current / rate.goal) * 100))}%` }"
                ></div>
              </div>
            </div>
          </div>

          <div class="actions-group">
            <button v-if="!questCompleted" :class="{'btn-secondary': true, 'btn-validate': conditionIsTrue}" @click="valideQuest">
              {{ appStore.storyLineModal?.story!.buttonLabel }}
            </button>
            <button class="btn-primary" @click="close">
              {{ questCompleted ? 'Fermer' : 'Plus tard' }}
            </button>
          </div>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useStoryLineStore } from '@/stores/storyLine'
import { computed, onMounted, ref } from 'vue'

const questCompleted = ref(false)
const appStore = useAppStore()
const storyStore = useStoryLineStore()
const slideIndex = ref(0)

const textArray = ref(appStore.storyLineModal!.storyData?.text.map((text) => text))
const endText = ref(appStore.storyLineModal!.storyData?.ending.map((text) => text))
const unlockText = ref(appStore.storyLineModal!.storyData?.unlock)
const conditionIsTrue = computed(() => appStore.storyLineModal?.story?.completion?.value)
const currentCompletionRate = computed(() => appStore.storyLineModal?.story?.completionRate?.value ?? [])

function init() {
  slideIndex.value = 0
  questCompleted.value = false
  textArray.value = appStore.storyLineModal!.storyData?.text.map((text) => text)
  endText.value = appStore.storyLineModal!.storyData?.ending.map((text) => text)
  unlockText.value = appStore.storyLineModal!.storyData?.unlock
}

function close() {
  if (questCompleted.value) {
    appStore.nextStoryline()
    appStore.triggerStoryLineModal()
    init()
  } else {
    appStore.storyLineModal!.show = false
    appStore.triggerStoryLineModal()
  }
}

function decrementSlide() {
  slideIndex.value === 0 ? slideIndex.value = 0 : slideIndex.value--
}

function incrementSlide() {
  if (textArray.value) {
    slideIndex.value === textArray.value.length - 1 ? slideIndex.value = textArray.value.length - 1 : slideIndex.value++
  }
}

function valideQuest() {
  if (conditionIsTrue?.value) {
    questCompleted.value = true
    storyStore.validateCurrentStory()
  }
}

onMounted(() => {
  init()
  if (storyStore.currentStory?.autocompletion) {
    valideQuest()
  }
})
</script>

<style scoped>
/* ==========================================================================
   TRANSITIONS & ANIMATIONS
   ========================================================================== */

.grimoire-fade-enter-active {
  transition: opacity 0.4s ease;
}
.grimoire-fade-leave-active {
  transition: opacity 0.25s ease;
}

.grimoire-fade-enter-active .slide-card {
  animation: openGrimoire 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
.grimoire-fade-leave-active .slide-card {
  animation: closeGrimoire 0.25s ease-in forwards;
}

.grimoire-fade-enter-from,
.grimoire-fade-leave-to {
  opacity: 0;
}

@keyframes openGrimoire {
  from {
    transform: scale(0.7) rotateY(-15deg) translateY(30px);
    filter: blur(4px);
    opacity: 0;
  }
  to {
    transform: scale(1) rotateY(0deg) translateY(0);
    filter: blur(0);
    opacity: 1;
  }
}

@keyframes closeGrimoire {
  from {
    transform: scale(1) rotateY(0deg) translateY(0);
    opacity: 1;
  }
  to {
    transform: scale(0.9) rotateY(10deg) translateY(15px);
    filter: blur(2px);
    opacity: 0;
  }
}

.slide-pop-enter-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-pop-leave-active {
  transition: all 0.15s cubic-bezier(0.4, 0, 1, 1);
}
.slide-pop-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.slide-pop-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* ==========================================================================
   STRUCTURE & LAYOUT
   ========================================================================== */

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
  perspective: 1000px;
  user-select: none;
}

.slide-card {
  position: relative;
  width: 85%;
  max-width: 500px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  transform-style: preserve-3d;
}

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

.cross {
  color: #f8fafc;
  line-height: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: rgba(15, 23, 42, 0.4);
  border-bottom: 1px solid #334155;
  border-radius: 20px 20px 0 0;
}

.title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #f8fafc;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.slide-content-wrapper {
  overflow: hidden;
  position: relative;
}

.slide-content-inner {
  width: 100%;
}

.slide-content {
  padding: 32px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #cbd5e1;
}

.content-placeholder {
  font-size: 0.95rem;
  text-align: center;
  width: 100%;
  line-height: 1.6;
}

.unlock-text {
  color: #10b981;
  font-weight: bold;
  text-align: center;
  margin-top: 8px;
}

/* ==========================================================================
   FOOTER & DESIGN DES OBJECTIFS (COMPLETION RATE)
   ========================================================================== */

.card-footer {
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: rgba(15, 23, 42, 0.4);
  border-top: 1px solid #334155;
  border-radius: 0 0 20px 20px;
}

.completion-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: rgba(15, 23, 42, 0.25);
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(51, 65, 85, 0.5);
}

.completion-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.completion-info {
  display: flex;
  font-size: 0.8rem;
  font-weight: 600;
}

.completion-element {
  color: #94a3b8;
}

/* Barre de progression */
.progress-bar {
  width: 100%;
  height: 6px;
  background: #0f172a;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #334155;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border-radius: 4px;
  transition: width 0.4s ease-out;
}

/* Groupe de boutons d'actions */
.actions-group {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-primary,
.btn-secondary {
  all: unset;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.85rem;
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
  flex-direction: row;
  gap: 8px;
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

.nav-btn:hover:not(:disabled) {
  background: #3b82f6;
  color: #ffffff;
  border-color: #60a5fa;
  transform: translateY(-1px);
}

.nav-btn:active:not(:disabled) {
  transform: translateY(0);
  background: #2563eb;
}

.nav-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.btn-validate {
  background: #10b981 !important;
  color: #ffffff !important;
  border: 1px solid #34d399 !important;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-validate:hover {
  background: #059669 !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(16, 185, 129, 0.5);
  border-color: #6ee7b7 !important;
}

.btn-validate:active {
  transform: translateY(0);
}

.btn-secondary:not(.btn-validate) {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(0.5);
}
</style>
