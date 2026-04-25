<template>
  <div class="mana-container">
    <div class="mana-header">
      <div class="mana-label">
        <RichText class="icon">&mana&</RichText>
        <span class="label-text">Mana Astral</span>
      </div>
      <span class="mana-stats">
        {{ wizardStore.ressources.production.prodmana }}<small>/s</small>
      </span>
    </div>

    <div class="mana-track">
      <div
        class="mana-fill"
        :style="{ width: (wizardStore.ressources.incremental.mana / wizardStore.ressources.limits.manamax * 100) + '%' }"
      >
        <div class="mana-shimmer"></div>
      </div>

      <div class="mana-values">
        <span class="current">{{ formatShowedValue(wizardStore.ressources.incremental.mana)  }}</span>
        <span class="separator">/</span>
        <span class="max">{{ formatShowedValue(wizardStore.ressources.limits.manamax) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RichText from './RichText.vue';
import { useWizardStore } from '@/stores/wizard';
import { formatShowedValue } from '@/composable/formatShowedValue';
const wizardStore = useWizardStore();

</script>

<style scoped>
.mana-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: 'Inter', system-ui, sans-serif;
}

.mana-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 4px;
}

.mana-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f8fafc;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.mana-stats {
  color: #a5b4fc; /* Violet/Bleu clair */
  font-size: 0.85rem;
  font-weight: 500;
}

.mana-stats small {
  opacity: 0.7;
  font-size: 0.7rem;
}

.mana-track {
  position: relative;
  height: 28px;
  background: rgba(15, 23, 42, 0.6); /* Fond sombre ardoise */
  border-radius: 10px;
  overflow: hidden;
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

.mana-fill {
  height: 100%;
  background: linear-gradient(90deg, #4f46e5, #8b5cf6, #c084fc);
  background-size: 200% 100%;
  border-radius: 8px;
  position: relative;
  transition: width 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.4); /* Glow magique */
}

/* Effet de brillance qui traverse la barre */
.mana-shimmer {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
}

.mana-values {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  pointer-events: none; /* Laisse passer les clics */
  font-size: 0.85rem;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.current { color: #ffffff; }
.separator { color: rgba(255, 255, 255, 0.5); }
.max { color: rgba(255, 255, 255, 0.8); }

/* Animation subtile du gradient */
@keyframes flow {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

.mana-fill {
  animation: flow 4s linear infinite;
}
</style>
