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
            <td class="school-name">{{ school.name }}</td>

            <td>
              <span class="level-tag">Niv. {{ school.level }}</span>
            </td>

            <td>
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

            <td class="time-text">
              <span class="icon">⌛</span> {{ schoolsStore.timeForLevelUp(school) }}
            </td>

            <td>
              <div class="stepper">
                <button
                  class="step-btn minus"
                  :disabled="school.numberOfapprentice <= 0"
                  @click="schoolsStore.removeApprentice(school)"
                >
                  −
                </button>
                <span class="step-value">{{ school.numberOfapprentice }}</span>
                <button
                  class="step-btn plus"
                  :disabled="availableApprentice <= 0"
                  @click="schoolsStore.addApprentice(school)"
                >
                  +
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSchoolsStore } from '@/stores/schools'
import { formatShowedValue } from '@/composable/formatShowedValue'
import { useWizardStore } from '@/stores/wizard'
import { computed } from 'vue'

const wizardStore = useWizardStore()
const schoolsStore = useSchoolsStore()
const apprenticeNumber = computed(() => {
  return wizardStore.ressources.numberOfApprentice
})
const availableApprentice = computed(() => {
  return (
    wizardStore.ressources.numberOfApprentice -
    schoolsStore.schools.reduce((total, school) => total + school.numberOfapprentice, 0)
  )
})

</script>

<style scoped>
/* Conteneur principal sombre pour le contraste */
.academy-wrapper {
  padding: 5px;
  background: #0f172a; /* Bleu nuit profond */
  border-radius: 20px;
  color: #f8fafc;
  font-family: 'Inter', sans-serif;
}

/* Header à fort contraste */
.stats-grid {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.stat-box {
  flex: 1;
  padding: 16px;
  border-radius: 12px;
  background: #1e293b; /* Ardoise moyen */
  border: 1px solid #334155;
}

.stat-box.available {
  border-left: 4px solid #3b82f6;
  background: #1e293b;
}

.label {
  display: block;
  font-size: 0.7rem;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 800;
  margin-bottom: 4px;
}

.value {
  font-size: 1.5rem;
  font-weight: 900;
  color: #ffffff;
}

/* Tableau */
.table-container {
  background: #1e293b;
  border-radius: 12px;
  border: 1px solid #334155;
  overflow: hidden;
}

.academy-table {
  width: 100%;
  border-collapse: collapse;
}

.academy-table th {
  background: #0f172a;
  padding: 16px;
  color: #94a3b8;
  font-size: 0.75rem;
  text-transform: uppercase;
  text-align: center;
}

.academy-table td {
  padding: 5px;
  border-bottom: 1px solid #334155;
  text-align: center;
}

.text-left { text-align: left !important; }

/* Éléments internes */
.school-name {
  color: #f8fafc;
}

.level-tag {
  background: #334155;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #3b82f6;
}

/* Barre d'XP Contrastée */
.xp-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
}

.xp-values {
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
}

.xp-max { color: #64748b; }

.xp-gauge {
  height: 8px;
  background: #0f172a;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);
}

.xp-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #6366f1);
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
}

/* Stepper (Contrôles +/-) */
.stepper {
  display: inline-flex;
  align-items: center;
  background: #0f172a;
  padding: 4px;
  border-radius: 8px;
  gap: 12px;
  border: 1px solid #334155;
}

.step-btn {
  all: unset;
  width: 32px;
  height: 32px;
  background: #1e293b;
  border-radius: 6px;
  color: white;
  font-weight: 900;
  cursor: pointer;
  transition: 0.2s;
}

.step-btn:hover:not(:disabled) {
  background: #3b82f6;
}

.step-btn:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

.step-value {
  font-weight: 800;
  font-size: 1.1rem;
  min-width: 24px;
}

.time-text {
  font-family: 'JetBrains Mono', monospace;
  color: #cbd5e1;
  font-size: 0.85rem;
}
</style>
