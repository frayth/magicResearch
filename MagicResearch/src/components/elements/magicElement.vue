<template>
  <div class="spellbook-container">
    <div class="header-section">
      <label class="section-label">École de Magie</label>
      <div class="select-wrapper">
        <select v-model="selectedSchool" class="school-select">
          <option
            v-for="school in schoolsStore.schoolsName"
            :key="school"
            :value="school"
          >
            {{ school.toUpperCase() }}
          </option>
        </select>
        <span class="select-arrow">▼</span>
      </div>
    </div>

    <div class="spells-area">
      <div v-if="availableSpellBySchool.length > 0" class="spells-list">
        <button
          v-for="spell in availableSpellBySchool"
          :key="spell.name"
          @click="schoolsStore.castSpell(spell)"
          class="spell-row"
        >
          <div class="spell-info">
            <span class="spell-icon">✨</span>
            <span class="spell-name">{{ spell.name }}</span>
          </div>

          <div class="spell-cost-tag">
            <RichText>&mana.value:{{ spell.cost }}&</RichText>
          </div>
        </button>
      </div>

      <div v-else class="empty-state">
        <span class="empty-icon">🌙</span>
        <p>Aucun sort disponible dans cette école</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSchoolsStore } from '@/stores/schools'
import { computed, ref } from 'vue'
import RichText from '../UI/RichText.vue'

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
.spellbook-container {
  width: 100%;
  background: #0f172a;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #334155;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  font-family: 'Inter', sans-serif;
}

/* --- SELECTOR --- */
.header-section {
  margin-bottom: 20px;
}

.section-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #94a3b8;
  letter-spacing: 1px;
  margin-bottom: 6px;
  margin-left: 4px;
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.school-select {
  width: 100%;
  appearance: none;
  background: #1e293b;
  border: 1px solid #334155;
  color: #f8fafc;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: border-color 0.2s;
}

.school-select:focus {
  outline: none;
  border-color: #3b82f6;
}

.select-arrow {
  position: absolute;
  right: 14px;
  color: #3b82f6;
  pointer-events: none;
  font-size: 0.7rem;
}

/* --- LISTE DES SORTS --- */
.spells-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.spell-row {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1e293b;
  border: 1px solid #334155;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.spell-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.spell-icon {
  font-size: 1rem;
  opacity: 0.8;
}

.spell-name {
  color: #f8fafc;
  font-size: 0.9rem;
}

.spell-cost-tag {
  background: rgba(15, 23, 42, 0.6);
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid #334155;
  font-size: 0.85rem;
}

/* --- INTERACTIONS --- */
.spell-row:hover {
  background: #233045;
  border-color: #3b82f6;
  transform: translateX(4px); /* Effet de décalage vers la droite */
}

.spell-row:active {
  transform: translateX(2px) scale(0.99);
}

/* --- EMPTY STATE --- */
.empty-state {
  padding: 30px;
  text-align: center;
  background: rgba(30, 41, 59, 0.2);
  border-radius: 12px;
  border: 1px dashed #334155;
}

.empty-icon {
  font-size: 1.5rem;
  opacity: 0.4;
  display: block;
  margin-bottom: 8px;
}

.empty-state p {
  color: #64748b;
  font-size: 0.85rem;
  margin: 0;
}
</style>
