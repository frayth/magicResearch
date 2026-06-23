Voici le code complet mis à jour.

J'ai stylisé l'affichage du cooldown (`cooldown-badge`) pour qu'il s'intègre harmonieusement dans la ligne du sort. Il s'affiche sous forme d'un petit badge discret, utilisant la couleur bleue de la charte graphique, avec une icône d'horloge pour une identification visuelle immédiate.

```vue
<template>
  <div class="academy-wrapper">
    <header class="section-header">
      <h3 class="section-title">Sortilèges des Apprentis</h3>
    </header>

    <div class="schools-grid">
      <div v-for="school in schoolsStore.schools" :key="school.name" class="school-card">
        <h4 class="school-card-title">{{ school.name }}</h4>

        <div class="spells-list">
          <div
            v-for="apprenticeCast in apprenticeCastStore.spellsList.filter((apprenticeCast) =>
              school.spells.find((spell) => spell.id === apprenticeCast.spellRef.id),
            )"
            :key="apprenticeCast.spellRef.id"
            class="spell-item"
          >
            <span class="spell-name">{{ apprenticeCast.spellRef.name }}</span>

            <div class="cooldown-badge" v-if="apprenticeCast.numberOfApprentices>0">
              <span class="cooldown-icon">⏱️</span>
              <span class="cooldown-value">{{ Math.round(apprenticeCast.cooldownTimeWithApprentices / 1000) }}s/Cast</span>
            </div>

            <div v-if="apprenticeCast.failureRate > 0" class="failure-rate-badge tooltip-target">
              <span>📉 {{ apprenticeCast.failureRate }} {{ apprenticeCast.failureRate === 1 ? 'échec' : 'échecs' }}</span>
              <div class="tooltip-box">
                Nombre d'échecs accumulés : le temps de recharge du prochain sort sera divisé par le nombre d'échecs.
              </div>
            </div>

            <div v-if="apprenticeCast.spellRef.level < school.level" class="stepper-container">
              <div class="stepper">
                <button
                  class="step-btn minus"
                  @click="
                    apprenticeCast.setNumberOfApprentice(apprenticeCast.numberOfApprentices - 1)
                  "
                  :disabled="apprenticeCast.numberOfApprentices <= 0"
                >
                  −
                </button>
                <span class="step-value">{{ apprenticeCast.numberOfApprentices }}</span>
                <button
                  class="step-btn plus"
                  @click="
                    apprenticeCast.setNumberOfApprentice(apprenticeCast.numberOfApprentices + 1)
                  "
                  :disabled="
                    affectedApprentices >= wizardStore.ressources.school.apprenticeCapacity
                  "
                >
                  +
                </button>
              </div>
            </div>

            <span v-else class="lock-badge">
              ⚠️ {{ school.name }} Niv. {{ apprenticeCast.spellRef.level + 1 }} requis
            </span>
          </div>
        </div>
      </div>
    </div>

    <footer class="resource-footer">
      <div class="resource-item">
        <div class="res-icon">🧙‍♂️</div>
        <div class="res-details">
          <span class="res-label">Apprentis Affectés</span>
          <div class="res-info-row">
            <span class="res-value">
              {{ affectedApprentices }}
              <span class="res-sub">/ {{ wizardStore.ressources.school.apprenticeCapacity }}</span>
            </span>
            <div class="res-mini-gauge">
              <div
                class="res-fill available"
                :style="{
                  width:
                    (affectedApprentices / wizardStore.ressources.school.apprenticeCapacity) * 100 +
                    '%',
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="reset-container">
        <button
          class="reset-btn"
          @click="apprenticeCastStore.resetApprentices()"
          :disabled="affectedApprentices === 0"
        >
          <span class="reset-icon">🔄</span> Réinitialiser
        </button>
      </div>

      <div class="cost-summary">
        <span class="res-label">Coût moyen par seconde</span>
        <span class="res-value mana-cost">{{ totalaverageManaCost }} <span class="res-sub">mana/s</span></span>
      </div>
    </footer>

    <div class="config-section">
      <header class="section-header">
        <h3 class="section-title">Configurations</h3>
      </header>

      <div class="config-grid">
        <div class="config-card current-panel" v-if="selectedConfiguration">
          <h4 class="config-card-title">Profil Sélectionné</h4>
          <div class="selected-box">
            <div class="selected-info">
              <span class="config-badge">Actif</span>
              <span class="selected-name">{{ selectedConfiguration.name }}</span>
            </div>
            <div class="action-row">
              <button
                class="action-btn save"
                @click="apprenticeCastStore.saveConfiguration(selectedConfiguration.name)"
              >
                Sauvegarder
              </button>
              <button
                class="action-btn delete"
                @click="deleteConfiguration(selectedConfiguration.name)"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>

        <div class="config-card save-panel" :class="{ 'full-width': !selectedConfiguration }">
          <h4 class="config-card-title">Nouveau Profil</h4>
          <div class="input-group">
            <input
              v-model="saveName"
              type="text"
              placeholder="Nom de la configuration"
              maxlength="12"
              class="config-input"
            />
            <button
              class="action-btn create"
              @click="apprenticeCastStore.saveConfiguration(saveName)"
              v-if="nameIsValid"
            >
              Enregistrer
            </button>
          </div>
        </div>

        <div class="config-card load-panel">
          <h4 class="config-card-title">Charger un Profil</h4>
          <div class="config-list-container">
            <div v-if="apprenticeCastStore.configurations.length === 0" class="empty-state-text">
              Aucun profil enregistré
            </div>
            <div
              v-for="config in apprenticeCastStore.configurations"
              :key="config.name"
              class="config-item"
              :class="{ selected: selectedConfiguration?.name === config.name }"
            >
              <button class="load-btn" @click="loadConfiguration(config)">
                <span class="load-icon">💾</span>
                <span class="load-name">{{ config.name }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useApprenticeCastStore } from '@/stores/apprenticeCast'
import { useSchoolsStore } from '@/stores/schools'
import { useWizardStore } from '@/stores/wizard'
import type { ConfigurationCastApprenticeData } from '@/types/ressources'
import { computed, ref } from 'vue'

const apprenticeCastStore = useApprenticeCastStore()
const schoolsStore = useSchoolsStore()
const wizardStore = useWizardStore()

const affectedApprentices = computed(() => {
  return apprenticeCastStore.spellsList.reduce((acc, curr) => {
    return acc + curr.numberOfApprentices
  }, 0)
})

const selectedConfiguration = ref<ConfigurationCastApprenticeData | null>(null)
const saveName = ref('')

const nameIsValid = computed(() => {
  return (
    saveName.value.length > 0 &&
    !apprenticeCastStore.configurations.some((config) => config.name === saveName.value) &&
    saveName.value.trim() !== '' &&
    saveName.value.length <= 12
  )
})

function loadConfiguration(config: ConfigurationCastApprenticeData) {
  selectedConfiguration.value = config
  apprenticeCastStore.loadConfiguration(config.configuration)
}

function deleteConfiguration(name: string) {
  apprenticeCastStore.deleteConfiguration(name)
  selectedConfiguration.value = null
}

const totalaverageManaCost = computed(() => {
  return apprenticeCastStore.spellsList.reduce((acc, curr) => {
    return acc + (curr.averageManaCost ?? 0)
  }, 0)
})
</script>

<style scoped>
/* BASE WRAPPER */
.academy-wrapper {
  padding: 10px;
  background: #0f172a;
  border-radius: 20px;
  color: #f8fafc;
  font-family: 'Inter', sans-serif;
  max-width: 100%;
}

.section-header {
  margin-bottom: 16px;
}

.section-title {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #64748b;
  font-weight: 800;
  letter-spacing: 1px;
  border-left: 2px solid #3b82f6;
  padding-left: 8px;
  margin: 0;
}

/* GRILLE DES ÉCOLES */
.schools-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.school-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 16px;
  overflow: hidden;
}

.school-card-title {
  font-size: 1rem;
  font-weight: 800;
  color: #3b82f6;
  margin: 0 0 12px 0;
  border-bottom: 1px solid #334155;
  padding-bottom: 6px;
}

/* LISTE DES SORTS */
.spells-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.spell-item {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.spell-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: #f8fafc;
  flex: 1;
}

/* COOLDOWN STYLES */
.cooldown-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.25);
  color: #3b82f6;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
  justify-content: center;
}

.cooldown-icon {
  font-size: 0.8rem;
}

/* FAILURE RATE & TOOLTIP STYLES */
.failure-rate-badge {
  font-size: 0.75rem;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  cursor: help;
  white-space: nowrap;
}

.tooltip-target {
  position: relative;
}

.tooltip-box {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) scale(0.95);
  background: #1e293b;
  border: 1px solid #475569;
  color: #e2e8f0;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  width: 200px;
  text-wrap: wrap;
  text-align: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
  z-index: 50;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.tooltip-box::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: #1e293b transparent transparent transparent;
}

.tooltip-target:hover .tooltip-box {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}

/* STEPPER MECHANICS */
.stepper-container {
  display: flex;
  align-items: center;
}

.stepper {
  display: inline-flex;
  align-items: center;
  background: #1e293b;
  padding: 2px;
  border-radius: 6px;
  border: 1px solid #334155;
}

.step-value {
  font-size: 0.85rem;
  font-weight: 800;
  min-width: 30px;
  text-align: center;
}

.step-btn {
  all: unset;
  width: 28px;
  height: 28px;
  background: #0f172a;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  transition:
    background 0.2s,
    opacity 0.2s;
}

.step-btn:hover:not(:disabled) {
  background: #3b82f6;
  color: white;
}

.step-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
  background: #0f172a;
  color: #f8fafc;
}

/* LOCK BADGE */
.lock-badge {
  font-size: 0.7rem;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 700;
  border: 1px solid rgba(239, 68, 68, 0.2);
  text-align: right;
}

/* FOOTER RESOURCES */
.resource-footer {
  display: flex;
  padding: 16px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid #334155;
  border-radius: 16px;
  margin-bottom: 24px;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.resource-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.res-icon {
  width: 36px;
  height: 36px;
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #334155;
  font-size: 1.1rem;
}

.res-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.res-label {
  font-size: 0.6rem;
  text-transform: uppercase;
  font-weight: 800;
  color: #64748b;
  letter-spacing: 0.5px;
}

.res-info-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.res-value {
  font-size: 0.9rem;
  font-weight: 700;
  color: #f8fafc;
}

.res-sub {
  color: #64748b;
  font-size: 0.75rem;
}

.res-mini-gauge {
  flex: 1;
  max-width: 100px;
  height: 5px;
  background: #0f172a;
  border-radius: 2px;
  overflow: hidden;
}

.res-fill.available {
  background: #3b82f6;
  height: 100%;
  transition: width 0.3s ease;
}

/* RESET BUTTON MECHANICS */
.reset-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.reset-btn {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #1e293b;
  border: 1px solid #334155;
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 8px 14px;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
}

.reset-btn:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.4);
  color: #ef4444;
}

.reset-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.reset-icon {
  font-size: 0.85rem;
}

/* COST SUMMARY */
.cost-summary {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  text-align: right;
  flex: 1;
}

.mana-cost {
  color: #3b82f6;
}

/* BLOC CONFIGURATIONS */
.config-section {
  border-top: 1px solid #334155;
  padding-top: 20px;
}

.config-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 900px) {
  .config-grid {
    grid-template-columns: 1fr !important;
  }
}

.config-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
}

.config-card.save-panel.full-width {
  grid-column: span 2;
}

.config-card-title {
  font-size: 0.8rem;
  font-weight: 800;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
}

.selected-box {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  justify-content: space-between;
}

.selected-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.config-badge {
  font-size: 0.6rem;
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
  text-transform: uppercase;
}

.selected-name {
  font-weight: 700;
  font-size: 0.95rem;
}

.action-row {
  display: flex;
  gap: 10px;
}

.action-btn {
  all: unset;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 8px 14px;
  border-radius: 6px;
  text-transform: uppercase;
  text-align: center;
  transition: 0.2s;
  flex: 1;
}

.action-btn.save {
  background: #1e293b;
  border: 1px solid #334155;
  color: #f8fafc;
}
.action-btn.save:hover {
  background: #334155;
}
.action-btn.delete {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #ef4444;
}
.action-btn.delete:hover {
  background: #ef4444;
  color: white;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #0f172a;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #334155;
  height: 100%;
  justify-content: center;
}

.config-input {
  all: unset;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  padding: 10px;
  font-size: 0.85rem;
  color: #f8fafc;
  box-sizing: border-box;
  width: 100%;
}

.config-input:focus {
  border-color: #3b82f6;
}

.action-btn.create {
  background: #3b82f6;
  color: white;
  box-shadow: 0 3px 0 #2563eb;
  padding: 10px;
}
.action-btn.create:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.load-panel {
  grid-column: span 2;
}

@media (max-width: 900px) {
  .load-panel {
    grid-column: span 1;
  }
}

.config-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
  max-height: 150px;
  overflow-y: auto;
  padding-right: 4px;
}

.config-item {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
  transition: 0.2s;
}

.config-item:hover {
  border-color: #3b82f6;
}

.config-item.selected {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.05);
}

.load-btn {
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
}

.load-icon {
  font-size: 0.9rem;
}

.load-name {
  font-size: 0.8rem;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.empty-state-text {
  grid-column: span 10;
  text-align: center;
  color: #64748b;
  font-size: 0.8rem;
  padding: 20px 0;
}

/* RESPONSIVE MOBILE GENERAL */
@media (max-width: 600px) {
  .resource-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .reset-container {
    justify-content: flex-start;
  }

  .reset-btn {
    width: 100%;
    justify-content: center;
  }

  .cost-summary {
    align-items: flex-start;
    text-align: left;
    border-top: 1px solid #334155;
    padding-top: 12px;
    flex: none;
  }

  .spell-item {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    gap: 10px;
  }

  .stepper {
    width: 100%;
    justify-content: space-between;
  }

  .step-btn {
    flex: 1;
  }

  .lock-badge {
    text-align: center;
  }
}
</style>

```
