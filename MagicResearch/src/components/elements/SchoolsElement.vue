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
                  <div class="xp-fill" :style="{ width: (school.currentXp / schoolsStore.getNextLevelXp(school) * 100) + '%' }"></div>
                </div>
              </div>
            </td>
            <td class="time-text" data-label="Temps">
              <span class="icon">⌛</span> {{ schoolsStore.timeForLevelUp(school) }}
            </td>
            <td data-label="Assignation">
              <div class="stepper">
                <button class="step-btn minus" :disabled="school.numberOfapprentice <= 0" @click="schoolsStore.removeApprentice(school)">−</button>
                <span class="step-value">{{ school.numberOfapprentice }}</span>
                <button class="step-btn plus" :disabled="availableApprentice <= 0" @click="schoolsStore.addApprentice(school)">+</button>
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
              <span class="res-value">{{ apprenticeNumber }} / {{ wizardStore.ressources.school.apprenticeCapacity }}</span>
              <div class="res-mini-gauge">
                <div class="res-fill capacity" :style="{ width: (apprenticeNumber / wizardStore.ressources.school.apprenticeCapacity * 100) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="resource-divider"></div>
        <div class="resource-item efficiency">
          <div class="res-icon">⚡</div>
          <div class="res-details">
            <span class="res-label">Rendement</span>
            <span class="res-value highlight">{{ wizardStore.ressources.school.xpByApprentice }} <span class="res-sub">XP/s</span></span>
          </div>
        </div>
      </footer>

      <div class="management-grid">

        <div class="action-column">
          <h3 class="section-subtitle">Gestion du Personnel</h3>
          <div class="hire-card">
            <div class="hire-content">
              <div class="hire-icon">👤</div>
              <div class="hire-body">
                <div class="hire-header">
                  <span class="hire-title">Recrutement</span>
                  <span class="hire-badge">/ +1 Apprenti</span>
                </div>
                <p class="hire-description">Embauchez un nouvel apprenti pour accélérer vos recherches magiques.</p>
                <div class="hire-costs">
                  <CostActionElement :cost="hireActionInfo!.cost" ref="HireCostIsEnought" />
                </div>
              </div>
            </div>
            <button class="hire-btn" @click="hire" :disabled="!HireIsAvailable">Recruter</button>
          </div>
        </div>

        <div class="action-column">
          <h3 class="section-subtitle">Infrastructures</h3>
          <div class="buildings-container" v-if="unlockStore.checkUnlockStatus('cabinResearcher')">
            <div class="building-card">
              <div class="building-main">
                <div class="building-header-row">
                  <buttonBuilding :id="'ResearchCabin'" />
                </div>
                <p class="building-description">
                  Permet de recruter plus d'apprentis. <span class="effect-text">Apprentis max +1</span>
                </p>
              </div>
              <div class="building-footer">
                <CostElement id="ResearchCabin" />
              </div>
            </div>
          </div>
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
import buttonBuilding from '../buttons/buttonBuilding.vue'
import CostElement from '../UI/CostElement.vue'
import { useUnlockStore } from '@/stores/unlock'

const wizardStore = useWizardStore()
const schoolsStore = useSchoolsStore()
const unlockStore = useUnlockStore()

type HireType = InstanceType<typeof CostActionElement>
const HireCostIsEnought = useTemplateRef<HireType>('HireCostIsEnought')

const apprenticeNumber = computed(() => wizardStore.ressources.school.numberOfApprentice)
const hireActionInfo = computed(() => schoolsStore.getActionSchoolInfo('hire'))

const availableApprentice = computed(() => {
  return (
    wizardStore.ressources.school.numberOfApprentice -
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
  return (wizardStore.ressources.school.numberOfApprentice < wizardStore.ressources.school.apprenticeCapacity) && HireCostIsEnought.value?.ressourceIsEnought
})
</script>

<style scoped>
/* BASE WRAPPER */
.academy-wrapper { padding: 10px; background: #0f172a; border-radius: 20px; color: #f8fafc; font-family: 'Inter', sans-serif; }
.stepper {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
}
/* STATS */
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 20px; }
.stat-box { padding: 16px; border-radius: 12px; background: #1e293b; border: 1px solid #334155; }
.stat-box.available { border-left: 4px solid #3b82f6; }
.label { display: block; font-size: 0.65rem; text-transform: uppercase; color: #94a3b8; font-weight: 800; margin-bottom: 4px; }
.value { font-size: 1.4rem; font-weight: 900; }

/* TABLE */
.table-container { background: #1e293b; border-radius: 16px; border: 1px solid #334155; overflow: hidden; }
.academy-table { width: 100%; border-collapse: collapse; }
.academy-table th { background: rgba(15, 23, 42, 0.5); padding: 14px; color: #94a3b8; font-size: 0.7rem; text-transform: uppercase; }
.academy-table td { padding: 12px 14px; border-bottom: 1px solid #334155; text-align: center; }

/* FOOTER */
.resource-footer { display: flex; flex-wrap: wrap; gap: 16px; padding: 16px; background: rgba(15, 23, 42, 0.8); }
.resource-item { flex: 1; min-width: 140px; display: flex; align-items: center; gap: 10px; }
.resource-divider { width: 1px; height: 32px; background: #334155; }

/* MANAGEMENT GRID (Default to Column) */
.management-grid {
  display: flex;
  flex-direction: column; /* Force la colonne */
  gap: 24px;
  padding: 20px;
  background: rgba(15, 23, 42, 0.4);
  border-top: 1px solid #334155;
}

.section-subtitle { font-size: 0.75rem; text-transform: uppercase; color: #64748b; margin-bottom: 12px; font-weight: 800; letter-spacing: 1px; border-left: 2px solid #3b82f6; padding-left: 8px; }

/* HIRE CARD */
.hire-card {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
.hire-content { display: flex; gap: 16px; flex: 1; }
.hire-icon { width: 44px; height: 44px; background: #1e293b; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
.hire-title { font-weight: 800; color: #f8fafc; font-size: 0.95rem; }
.hire-description { font-size: 0.8rem; color: #94a3b8; margin: 4px 0; }

/* BUILDING CARD */
.building-card {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 16px;
}
.building-header-row { margin-bottom: 8px; }
.building-description { font-size: 0.8rem; color: #94a3b8; line-height: 1.5; margin: 8px 0; }
.effect-text { color: #10b981; font-weight: 700; }
.building-footer { border-top: 1px dashed #334155; padding-top: 10px; margin-top: 10px; }

/* BUTTONS */
.hire-btn {
  all: unset; cursor: pointer; background: #3b82f6; color: white; font-size: 0.8rem; font-weight: 800; padding: 12px 24px; border-radius: 8px; text-transform: uppercase; text-align: center; box-shadow: 0 3px 0 #2563eb;
}
.hire-btn:disabled { opacity: 0.4; box-shadow: none; }

/* MOBILE RESPONSIVE */
@media (max-width: 768px) {
  .hire-card { flex-direction: column; align-items: stretch; }
  .academy-table thead { display: none; }
  .table-row { display: block; border-bottom: 4px solid #0f172a; padding: 12px; }
  .academy-table td { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border: none; }
  .academy-table td::before { content: attr(data-label); font-weight: 800; font-size: 0.65rem; color: #64748b; }
}

/* UTILS */
.text-left { text-align: left !important; }
.level-tag { background: #0f172a; padding: 4px 10px; border-radius: 6px; color: #3b82f6; font-weight: 700; border: 1px solid #334155; }
.xp-fill { height: 100%; background: linear-gradient(90deg, #3b82f6, #6366f1); transition: width 0.3s ease; }
</style>
