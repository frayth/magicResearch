<template>
  <div class="evolutif-container">
    <span class="evolutif-label">Actifs :</span>

    <div class="evolutif-controls">
      <button
        class="ctrl-btn btn-minus"
        :disabled="props.building.currentlevel <= 0"
        @click="emit('decreaseLevel')"
      >
        −
      </button>

      <div class="level-display">
        <span class="current-level" :class="{ 'zero-active': props.building.currentlevel === 0 }">
          {{ props.building.currentlevel }}
        </span>
        <span class="level-separator">/</span>
        <span class="max-level">{{ props.building.level }}</span>
      </div>

      <button
        class="ctrl-btn btn-plus"
        :disabled="props.building.currentlevel >= props.building.level"
        @click="emit('increaseLevel')"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Building } from '@/types/ressources';

const props = defineProps<{
  building: Building
}>()

const emit = defineEmits(['decreaseLevel', 'increaseLevel'])
</script>

<style scoped>
/* Conteneur principal en ligne */
.evolutif-container {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(15, 23, 42, 0.3);
  border: 1px solid #334155;
  padding: 6px 12px;
  border-radius: 8px;
  width: fit-content;
  margin-top: 4px;
}

/* Label "Actifs :" */
.evolutif-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Zone des contrôles */
.evolutif-controls {
  display: flex;
  align-items: center;
  background: #0f172a;
  border: 1px solid #475569;
  border-radius: 6px;
  overflow: hidden;
}

/* Boutons de contrôle (- / +) */
.ctrl-btn {
  all: unset;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}

.btn-minus {
  color: #f43f5e; /* Rouge subtil pour la diminution */
  border-right: 1px solid #334155;
}

.btn-minus:hover:not(:disabled) {
  background: rgba(244, 63, 94, 0.15);
}

.btn-plus {
  color: #10b981; /* Vert pour l'augmentation */
  border-left: 1px solid #334155;
}

.btn-plus:hover:not(:disabled) {
  background: rgba(16, 185, 129, 0.15);
}

/* État désactivé (min atteint ou max atteint) */
.ctrl-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
  background: transparent !important;
}

/* Affichage numérique des niveaux */
.level-display {
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 3px;
  font-family: monospace;
  font-size: 0.9rem;
  font-weight: 700;
}

.current-level {
  color: #3b82f6; /* Bleu par défaut quand actif */
}

.current-level.zero-active {
  color: #64748b; /* Gris si aucune instance n'est active */
}

.level-separator {
  color: #475569;
}

.max-level {
  color: #cbd5e1; /* Total construit */
}
</style>
