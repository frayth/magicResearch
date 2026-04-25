<template>
  <div class="resources-container">
    <div v-for="res in resourceList" :key="res" class="resource-card">
      <div class="resource-info">
        <div class="resource-name">
          <RichText>{{ `&${res}.name&` }}</RichText>
        </div>
        <div class="resource-values">
          <span class="current">{{ Math.floor(wizardStore.ressources.incremental[res]) }}</span>
          <span class="separator">/</span>
          <span class="max">{{ wizardStore.ressources.limits[res + 'max' as keyof typeof wizardStore.ressources.limits] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWizardStore } from '@/stores/wizard';
import RichText from '../UI/RichText.vue';
import type { IncrementalRessources } from '@/types/ressources';

const wizardStore = useWizardStore()

// Liste pour éviter la répétition HTML
const resourceList = Object.keys(wizardStore.ressources.incremental).map(key => key as keyof IncrementalRessources)
</script>

<style scoped>
.resources-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  padding: 16px;
  background: rgba(30, 41, 59, 0.03); /* Très léger fond ardoise */
  border-radius: 16px;
}

.resource-card {
  background: white;
  padding: 14px 18px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
              0 0 0 1px rgba(15, 23, 42, 0.05);
  transition: transform 0.2s ease;
}

.resource-card:hover {
  transform: translateX(4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.resource-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.resource-name {
  font-weight: 600;
  color: #1e293b; /* Ardoise foncé */
  font-size: 0.95rem;
}

.resource-values {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Inter', monospace; /* Police propre pour les chiffres */
}

.current {
  color: #3b82f6; /* Notre bleu d'accent */
  font-weight: 700;
  font-size: 1rem;
}

.separator {
  color: #94a3b8;
  font-size: 0.8rem;
}

.max {
  color: #64748b;
  font-weight: 500;
  font-size: 0.9rem;
}




</style>

