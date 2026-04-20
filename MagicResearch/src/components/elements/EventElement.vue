<template>
  <div class="quest-log">
    <section class="quest-group">
      <h2 class="group-title">Épopée</h2>
      <div
        v-if="storyLineStore.currentStory"
        class="quest-item main-quest"
        @click="storyLineStore.currentStory?.trigger()"
      >
        <div class="quest-icon">✦</div>
        <div class="quest-info">
          <span class="quest-name">{{ storyLineStore.currentStory?.name }}</span>
          <span class="quest-type">Quête principale</span>
        </div>
        <div class="quest-arrow">→</div>
      </div>
    </section>

    <section class="quest-group">
      <h2 class="group-title">Rumeurs & Tâches</h2>
      <div class="quest-list">
        <div
          v-for="(quest, id) in 3"
          :key="`secondary-quest-${id}`"
          class="quest-item secondary-quest"
        >
          <div class="quest-icon">✧</div>
          <div class="quest-info">
            <span class="quest-name">Quête secondaire {{ id + 1 }}</span>
            <span class="quest-type">Objectif optionnel</span>
          </div>
          <div class="quest-arrow">→</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {useStoryLineStore} from '@/stores/storyLine'
const storyLineStore = useStoryLineStore()
</script>

<style scoped>
.quest-log {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: 'Inter', sans-serif;
}

.quest-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Titres de section ultra-lisibles */
.group-title {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #94a3b8; /* Gris ardoise clair */
  margin: 0 0 4px 8px;
}

/* Item de quête commun */
.quest-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: #1e293b; /* Ardoise profond */
  border: 1px solid #334155;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.quest-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.quest-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #f8fafc;
}

.quest-type {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

.quest-icon {
  font-size: 1.2rem;
  color: #3b82f6;
  width: 24px;
  text-align: center;
}

.quest-arrow {
  color: #334155;
  font-weight: bold;
  transition: transform 0.2s;
}

/* --- ÉTATS INTERACTIFS --- */

.quest-item:hover {
  background: #233045;
  border-color: #3b82f6;
  transform: translateX(4px);
}

.quest-item:hover .quest-arrow {
  color: #3b82f6;
  transform: translateX(2px);
}

.quest-item:active {
  transform: scale(0.98) translateX(2px);
}

/* Distinction visuelle Main vs Secondary */
.main-quest {
  border-left: 4px solid #3b82f6;
}

.secondary-quest {
  border-left: 4px solid #475569;
}

.main-quest:hover {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.15);
}

/* Liste des secondaires */
.quest-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
