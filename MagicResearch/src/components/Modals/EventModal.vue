<template>
  <Transition name="modal-fade">
    <div class="modal-overlay" v-if="eventsStore.currentModal">

      <!-- MODAL TYPE: UNLOCK -->
      <div class="upgrade-card" v-if="eventsStore.currentModal.type === 'unlock'">
        <button class="btn-close-circle" title="Fermer" @click="close">
          <span class="cross">×</span>
        </button>

        <header class="card-header">
          <h2 class="title">🔓 {{ eventsStore.currentModal.title }}</h2>
        </header>

        <main class="card-content">
          <div class="text-paragraphs">
            <p v-for="(text, index) in eventsStore.currentModal.text" :key="index" class="description-text">
              {{ text }}
            </p>
          </div>

          <div v-if="eventsStore.currentModal.unlock" class="unlock-box">
            <span class="unlock-label">Contenu Débloqué</span>
            <p class="unlock-text">{{ eventsStore.currentModal.unlock }}</p>
          </div>
        </main>

        <footer class="card-footer footer-end">
          <button class="btn-primary" @click="close">
            {{ eventsStore.currentModal.button || 'Accepter' }}
          </button>
        </footer>
      </div>

      <!-- MODAL TYPE: EVENT -->
      <div class="upgrade-card" v-else-if="eventsStore.currentModal.type === 'event'">
        <button class="btn-close-circle" title="Fermer" @click="close">
          <span class="cross">×</span>
        </button>

        <header class="card-header">
          <h2 class="title">✨ {{ eventsStore.currentModal.name || 'Événement' }}</h2>
        </header>

        <main class="card-content">
          <div class="text-paragraphs">
            <p v-for="(text, index) in eventsStore.currentModal.text" :key="index" class="description-text">
              {{ text }}
            </p>
          </div>
        </main>

        <footer class="card-footer footer-end">
          <button class="btn-primary" @click="close">
            {{ eventsStore.currentModal.button || 'Continuer' }}
          </button>
        </footer>
      </div>

    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useEventsStoreStore } from '@/stores/eventsStore'

const eventsStore = useEventsStoreStore()

function close() {
  eventsStore.closeModal()
}
</script>

<style scoped>
/* ANIMATIONS D'APPARITION (TRANSITION) */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-active .upgrade-card {
  animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-fade-leave-active .upgrade-card {
  animation: scaleDown 0.2s ease-in;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@keyframes scaleUp {
  from {
    transform: scale(0.9) translateY(10px);
  }
  to {
    transform: scale(1) translateY(0);
  }
}

@keyframes scaleDown {
  from {
    transform: scale(1) translateY(0);
  }
  to {
    transform: scale(0.95) translateY(5px);
  }
}

/* STRUCTURE & OVERLAY */
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
  user-select: none;
}

.upgrade-card {
  position: relative;
  width: 85%;
  max-width: 480px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 20px;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
}

/* FERMETURE */
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
  font-size: 1.1rem;
}

/* HEADER */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  background: rgba(15, 23, 42, 0.4);
  border-bottom: 1px solid #334155;
  border-radius: 20px 20px 0 0;
}

.title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #f8fafc;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* CONTENU */
.card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 60vh;
  overflow-y: auto;
}

.text-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.description-text {
  margin: 0;
  font-size: 0.9rem;
  color: #cbd5e1;
  line-height: 1.6;
}

/* BOX UNLOCK */
.unlock-box {
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
}

.unlock-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  color: #10b981;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.unlock-text {
  margin: 0;
  color: #34d399;
  font-weight: 700;
  font-size: 0.9rem;
}

/* FOOTER */
.card-footer {
  padding: 16px 24px;
  display: flex;
  background: rgba(15, 23, 42, 0.4);
  border-top: 1px solid #334155;
  border-radius: 0 0 20px 20px;
}

.footer-end {
  justify-content: flex-end;
}

.btn-primary {
  all: unset;
  padding: 10px 24px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  background: #3b82f6;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.35);
}

.btn-primary:active {
  transform: translateY(0);
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .upgrade-card {
    width: 90%;
  }
  .card-content {
    padding: 20px;
  }
}
</style>

```
