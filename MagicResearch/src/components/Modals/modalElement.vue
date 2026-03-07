<template>
  <div class="modal-overlay">
    <div class="modal-card">
      <div class="modal-accent"></div>

      <div class="modal-body">
        <component :is="currentMessage"></component>
      </div>

      <div class="modal-footer">
        <button class="btn-primary" @click="close">
          <span>Compris</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const currentMessage = appStore.messagesModal[0]
function close() {
  appStore.popMessageModal()
}

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.4); /* Bleu nuit très transparent */
  backdrop-filter: blur(8px);
  z-index: 1000;
  padding: 20px;
}

.modal-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 440px;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(0, 0, 0, 0.05); /* Bordure subtile */
  animation: modalEnter 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-accent {
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
}

.modal-body {
  padding: 32px 32px 16px 32px;
  font-size: 16px;
  line-height: 1.6;
  color: #1e293b;
  font-family: 'Inter', system-ui, sans-serif;
}

.modal-footer {
  padding: 16px 32px 32px 32px;
  display: flex;
  justify-content: flex-end;
}

.btn-primary {
  all: unset; /* Reset propre */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background: #1e293b;
  color: white;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background: #0f172a;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.btn-primary:active {
  transform: translateY(0);
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
