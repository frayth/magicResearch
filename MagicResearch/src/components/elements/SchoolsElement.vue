<template>
  <div :style="{ display: 'flex', flexDirection: 'column', backgroundColor: 'green' }">
    <table>
      <thead>
        <tr>
          <th scope="col">Nom</th>

          <th scope="col">Level</th>
          <th scope="col">xp</th>
          <th scope="col">next level</th>
          <th scope="col">time</th>
          <th scope="col">Apprentis</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="school in schoolsStore.schools" :key="school.name">
          <th scope="row">{{ school.name }}</th>

          <td>{{ school.level }}</td>
          <td>{{ formatShowedValue(school.currentXp) }}</td>
          <td>{{ formatShowedValue(schoolsStore.getNextLevelXp(school)) }}</td>
          <td>{{ schoolsStore.timeForLevelUp(school) }}</td>
          <td>
            <div class="apprentice">
              <button
                :disabled="school.numberOfapprentice <= 0"
                @click="schoolsStore.removeApprentice(school)"
              >
                -
              </button>
              <div>{{ school.numberOfapprentice }}</div>
              <button
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
    <div>
      <div>Nombre d'apprentis : {{ apprenticeNumber }}</div>
      <div>apprenti disponible : {{ availableApprentice }}</div>
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
table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: black;
}

thead {
  background-color: #2e7d32;
  color: white;
}

th,
td {
  padding: 12px 16px;
  text-align: center;
}

th {
  font-weight: 600;
}

tbody tr:nth-child(even) {
  background-color: #a8a7a7;
}

tbody th {
  font-weight: 500;
  text-align: left;
}

td {
  color: #333;
}
.apprentice {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
</style>
