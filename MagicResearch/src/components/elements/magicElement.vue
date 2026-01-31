<template>
  <div class="school-container">
    <select v-model="selectedSchool" class="school-select">
      <option
        v-for="school in schoolsStore.schoolsName"
        :key="school"
        :value="school"
      >
        {{ school }}
      </option>
    </select>

    <div class="spells-grid" v-if="availableSpellBySchool.length>0">
      <button
        v-for="spell in availableSpellBySchool"
        :key="spell.name"
        @click="schoolsStore.castSpell(spell)"
        class="spell-button"
      >
        {{ spell.name }}
      </button>
    </div>
    <div v-else :style="{textAlign:'center'}" >
      <p>Aucun sort disponible</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSchoolsStore } from '@/stores/schools'
import { computed, ref } from 'vue'

const schoolsStore = useSchoolsStore()
const selectedSchool = ref('illusion')

const availableSpellBySchool = computed(() => {
  return (
    schoolsStore.availableSpells.find(
      (s) => s.schoolName === selectedSchool.value
    )?.spells ?? []
  )
})
</script>

<style scoped>
.school-container {
  max-width: 400px;
  padding: 16px;
  background: #1e1e2f;
  border-radius: 12px;
}

.school-select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #2b2b40;
  color: #fff;
  margin-bottom: 16px;
}

.spells-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}

.spell-button {
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #5f6cff, #7b5cff);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.spell-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.35);
}

.spell-button:active {
  transform: translateY(0);
  box-shadow: none;
}
</style>
