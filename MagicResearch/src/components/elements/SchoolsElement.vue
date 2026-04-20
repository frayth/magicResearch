<template>
  <div class="academy-wrapper">
    <header class="stats-grid">
      <div class="stat-box total">
        <span class="label">Total Apprentis</span>
        <span class="value">{{ apprenticeNumber }}</span>
      </div>
      <div class="stat-box available">
        <span class="label">Disponibles</span>
        <span class="value">{{ availableApprentice }}</span>
      </div>
    </header>

    <div class="table-container">
      <table class="academy-table">
        <thead>
          <tr>
            <th class="text-left">École de Magie</th>
            <th>Niveau</th>
            <th class="w-200">Progression XP</th>
            <th>Temps</th>
            <th>Assignation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="school in schoolsStore.schools" :key="school.name" class="table-row">
            <td class="school-name text-left" data-label="École">{{ school.name }}</td>
            <td data-label="Niveau">
              <span class="level-tag">Niv. {{ school.level }}</span>
            </td>
            <td data-label="XP">
              <div class="xp-wrapper">
                <div class="xp-values">
                  <span>{{ formatShowedValue(school.currentXp) }}</span>
                  <span class="xp-max">/ {{ formatShowedValue(schoolsStore.getNextLevelXp(school)) }}</span>
                </div>
                <div class="xp-gauge">
                  <div
                    class="xp-fill"
                    :style="{ width: (school.currentXp / schoolsStore.getNextLevelXp(school) * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </td>
            <td class="time-text" data-label="Temps">
              <span class="icon">⌛</span> {{ schoolsStore.timeForLevelUp(school) }}
            </td>
            <td data-label="Assignation">
              <div class="stepper">
                <button
                  class="step-btn minus"
                  :disabled="school.numberOfapprentice <= 0"
                  @click="schoolsStore.removeApprentice(school)"
                >−</button>
                <span class="step-value">{{ school.numberOfapprentice }}</span>
                <button
                  class="step-btn plus"
                  :disabled="availableApprentice <= 0"
                  @click="schoolsStore.addApprentice(school)"
                >+</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <footer class="resource-footer">
        <div class="resource-item">
          <div class="res-icon">👥</div>
          <div class="res-details">
            <span class="res-label">Occupation</span>
            <div class="res-info-row">
              <span class="res-value">{{ availableApprentice }} <span class="res-sub">libres</span></span>
              <div class="res-mini-gauge">
                <div class="res-fill available" :style="{ width: (availableApprentice / apprenticeNumber * 100) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="resource-divider"></div>
        <div class="resource-item">
          <div class="res-icon">🏰</div>
          <div class="res-details">
            <span class="res-label">Dortoirs</span>
            <div class="res-info-row">
              <span class="res-value">{{ apprenticeNumber }} / {{ wizardStore.ressources.apprenticeCapacity }}</span>
              <div class="res-mini-gauge">
                <div class="res-fill capacity" :style="{ width: (apprenticeNumber / wizardStore.ressources.apprenticeCapacity * 100) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="resource-divider"></div>
        <div class="resource-item efficiency">
          <div class="res-icon">⚡</div>
          <div class="res-details">
            <span class="res-label">Rendement </span>
            <span class="res-value highlight">{{wizardStore.ressources.xpByApprentice }}<span class="res-sub">XP/s</span></span>
          </div>
        </div>
      </footer>

      <div class="actions-section">
        <div class="hire-card">
          <div class="hire-content">
            <div class="hire-icon">👤</div>
            <div class="hire-body">
              <div class="hire-header">
                <span class="hire-title">Recrutement</span>
                <span class="hire-badge">+1 Apprenti</span>
              </div>
              <p class="hire-description">
                Embauchez un nouvel apprenti pour accélérer vos recherches magiques.
              </p>
              <div class="hire-costs">
                <CostActionElement :cost="hireActionInfo?.cost || {}" ref="HireCostIsEnought" />
              </div>
            </div>
          </div>
          <button class="hire-btn" @click="hire" :disabled="!HireIsAvailable">
            Recruter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSchoolsStore } from '@/stores/schools'
import { formatShowedValue } from '@/composable/formatShowedValue'
import { useWizardStore } from '@/stores/wizard'
import { computed, useTemplateRef } from 'vue'
import CostActionElement from '../UI/CostActionElement.vue'

const wizardStore = useWizardStore()
const schoolsStore = useSchoolsStore()
type HireType = InstanceType<typeof CostActionElement>
const HireCostIsEnought = useTemplateRef<HireType>('HireCostIsEnought')
const apprenticeNumber = computed(() => wizardStore.ressources.numberOfApprentice)
const hireActionInfo = computed(() => schoolsStore.getActionSchoolInfo('hire'))
const availableApprentice = computed(() => {
  return (
    wizardStore.ressources.numberOfApprentice -
    schoolsStore.schools.reduce((total, school) => total + school.numberOfapprentice, 0)
  )
})
function hire() {
  if (!HireCostIsEnought.value?.ressourceIsEnought) {
    console.error('not enough resources')
  } else {
    schoolsStore.hireApprentice()
  }
}
const HireIsAvailable = computed(() => {
  return (wizardStore.ressources.numberOfApprentice < wizardStore.ressources.apprenticeCapacity) && HireCostIsEnought.value?.ressourceIsEnought
})
</script>

<style scoped>
/* (Styles Academy & Table inchangés pour garder la cohérence) */
.academy-wrapper { padding: 10px; background: #0f172a; border-radius: 20px; color: #f8fafc; font-family: 'Inter', sans-serif; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 20px; }
.stat-box { padding: 16px; border-radius: 12px; background: #1e293b; border: 1px solid #334155; }
.stat-box.available { border-left: 4px solid #3b82f6; }
.label { display: block; font-size: 0.65rem; text-transform: uppercase; color: #94a3b8; font-weight: 800; margin-bottom: 4px; }
.value { font-size: 1.4rem; font-weight: 900; }
.table-container { background: #1e293b; border-radius: 16px; border: 1px solid #334155; overflow: hidden; }
.academy-table { width: 100%; border-collapse: collapse; }
.academy-table th { background: rgba(15, 23, 42, 0.5); padding: 14px; color: #94a3b8; font-size: 0.7rem; text-transform: uppercase; }
.academy-table td { padding: 12px 14px; border-bottom: 1px solid #334155; text-align: center; }

/* (Responsive Table - Mobile) */
@media (max-width: 768px) {
  .academy-table thead { display: none; }
  .table-row { display: block; padding: 16px; border-bottom: 4px solid #0f172a; }
  .academy-table td { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border: none; }
  .academy-table td::before { content: attr(data-label); font-weight: 800; text-transform: uppercase; font-size: 0.65rem; color: #64748b; }
}

/* FOOTER & RESOURCES */
.resource-footer { display: flex; flex-wrap: wrap; gap: 16px; padding: 16px; background: rgba(15, 23, 42, 0.8); }
.resource-item { flex: 1; min-width: 140px; display: flex; align-items: center; gap: 10px; }
.resource-divider { width: 1px; height: 32px; background: #334155; }

/* --- SECTION ACTION (RECRUTEMENT) --- */
.actions-section {
  padding: 20px;
  background: rgba(15, 23, 42, 0.4);
  border-top: 1px solid #334155;
}

.hire-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 20px;
  gap: 20px;
  transition: border-color 0.3s ease;
}

.hire-card:hover { border-color: #3b82f6; }

.hire-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex: 1;
}

.hire-icon {
  width: 48px;
  height: 48px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}

.hire-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hire-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hire-title {
  font-size: 1rem;
  font-weight: 800;
  color: #f8fafc;
}

.hire-badge {
  font-size: 0.65rem;
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 700;
  text-transform: uppercase;
}

.hire-description {
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.4;
  margin: 0;
}

.hire-costs {
  margin-top: 4px;
}

.hire-btn {
  all: unset;
  cursor: pointer;
  background: #3b82f6;
  color: white;
  font-size: 0.85rem;
  font-weight: 800;
  padding: 12px 28px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s;
  box-shadow: 0 4px 0 #2563eb;
}

.hire-btn:hover:not(:disabled) { background: #2563eb; transform: translateY(-1px); }
.hire-btn:active:not(:disabled) { transform: translateY(2px); box-shadow: 0 1px 0 #2563eb; }
.hire-btn:disabled { background: #1e3a5f; color: #475569; box-shadow: none; cursor: not-allowed; opacity: 0.6; }

/* RESPONSIVE HIRE */
@media (max-width: 600px) {
  .hire-card { flex-direction: column; text-align: center; align-items: stretch; }
  .hire-content { flex-direction: column; align-items: center; }
  .hire-header { justify-content: center; }
  .hire-btn { text-align: center; }
}

/* UTILS */
.text-left { text-align: left !important; }
.level-tag { background: #0f172a; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; color: #3b82f6; border: 1px solid #334155; }
.xp-wrapper { display: flex; flex-direction: column; gap: 6px; min-width: 140px; }
.xp-values { font-size: 0.75rem; font-weight: 700; display: flex; justify-content: space-between; }
.xp-gauge { height: 6px; background: #0f172a; border-radius: 10px; overflow: hidden; }
.xp-fill { height: 100%; background: linear-gradient(90deg, #3b82f6, #6366f1); }
.time-text { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #94a3b8; }
.stepper { display: inline-flex; align-items: center; background: #0f172a; padding: 3px; border-radius: 8px; border: 1px solid #334155; }
.step-btn { all: unset; width: 32px; height: 32px; background: #1e293b; border-radius: 5px; cursor: pointer; font-weight: bold; text-align: center; }
.step-btn:disabled { opacity: 0.1; }
</style>
