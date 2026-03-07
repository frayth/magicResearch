<template>
  <div class="build-action">
    <button
      v-if="wizardHaveBuilding && !buildingCompleted"
      class="btn upgrade"
      :disabled="!haveEnoughRessources"
      @click="builderStore.build(props.id)"
    >
      <span class="btn-label">Améliorer</span>
      <span class="btn-target">{{ building?.name }}</span>
      <span class="btn-level">Niv. {{ building?.level }}</span>
    </button>

    <button
      v-else-if="buildingCompleted"
      class="btn completed"
      disabled
    >
      <span class="btn-label">{{ building?.name }}</span>
      <span class="btn-status">Niveau Maximum</span>
    </button>

    <button
      v-else
      class="btn construct"
      :disabled="!haveEnoughRessources"
      @click="builderStore.build(props.id)"
    >
      <span class="btn-label">Construire</span>
      <span class="btn-target">{{ building?.name }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useWizardStore } from '@/stores/wizard';
import { useBuildingsStore } from '@/stores/buildings';
import {useBuilderStore} from '@/stores/builder';
import type {BuildingId} from '@/data/buildings.data';
import { computed } from 'vue';
interface Props {
  id:BuildingId,
}
const props=defineProps<Props>();
const builderStore=useBuilderStore()
const buildingStore=useBuildingsStore()
const wizardStore=useWizardStore();
const wizardHaveBuilding=computed(()=>wizardStore.wizardHaveBuilding(props.id));
const building=computed(()=>buildingStore.getBuilding(props.id,wizardHaveBuilding.value? wizardHaveBuilding.value.level : 0))
const haveEnoughRessources=computed(()=>wizardStore.checkIfRessourceAreEnough(building.value!.cost))
const buildingCompleted=computed(()=>building.value!.level  >= building.value!.levelMax)
</script>

<style scoped>
.build-action {
  display: inline-block;
  width: 100%;
}

.btn {
  all: unset;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 10px 16px;
  border-radius: 10px;
  font-family: 'Inter', system-ui, sans-serif;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e2e8f0;
  box-sizing: border-box;
}

/* Texte principal (Action) */
.btn-label {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

/* Nom de l'objet */
.btn-target {
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a; /* Ton bleu nuit sombre */
}

.btn-level, .btn-status {
  font-size: 0.8rem;
  opacity: 0.8;
  font-weight: 500;
}

/* --- VARIANTES D'ÉTATS --- */

/* 1. Construire (Neuf) */
.btn.construct {
  background: #ffffff;
  border-left: 4px solid #3b82f6; /* Accent bleu */
}
.btn.construct .btn-label { color: #3b82f6; }

/* 2. Améliorer */
.btn.upgrade {
  background: #ffffff;
  border-left: 4px solid #8b5cf6; /* Accent violet magique */
}
.btn.upgrade .btn-label { color: #8b5cf6; }

/* 3. Niveau Max (Désactivé) */
.btn.completed {
  background: #f8fafc;
  border-left: 4px solid #94a3b8;
  cursor: not-allowed;
  opacity: 0.7;
}
.btn.completed .btn-label { color: #64748b; }

/* --- ÉTATS INTERACTIFS --- */

.btn:hover:not(:disabled) {
  background: #f1f5f9;
  transform: translateX(4px);
  border-color: #cbd5e1;
}

.btn:active:not(:disabled) {
  transform: translateX(2px);
  background: #e2e8f0;
}

/* État : Manque de ressources */
.btn:disabled:not(.completed) {
  cursor: not-allowed;
  background: #fff1f2; /* Teinte rosée subtile */
  border-left-color: #f43f5e; /* Rouge erreur */
  opacity: 0.6;
}
.btn:disabled:not(.completed) .btn-label {
  color: #f43f5e;
}
</style>
