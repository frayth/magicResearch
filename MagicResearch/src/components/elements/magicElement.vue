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
      <div v-if="availableSpellBySchool.length > 0" class="spells-grid">
        <button
          v-for="spell in availableSpellBySchool"
          :key="spell.name"
          @click="schoolsStore.castSpell(spell)"
          class="spell-card"
        >
          <span class="spell-name">{{ spell.name }}</span>
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
  background: #0f172a; /* Bleu nuit profond (Contraste max) */
  padding: 24px;
  border-radius: 20px;
  border: 1px solid #334155;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  font-family: 'Inter', system-ui, sans-serif;
}

/* --- SELECTOR STYLE --- */
.header-section {
  margin-bottom: 24px;
}

.section-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #94a3b8;
  letter-spacing: 1.5px;
  margin-bottom: 8px;
  margin-left: 4px;
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.school-select {
  width: 100%;
  appearance: none; /* Cache la flèche native */
  background: #1e293b;
  border: 2px solid #334155;
  color: #f8fafc;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.school-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.select-arrow {
  position: absolute;
  right: 16px;
  color: #3b82f6;
  pointer-events: none;
  font-size: 0.8rem;
}

/* --- SPELLS GRID --- */
.spells-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 12px;
}

.spell-card {
  all: unset;
  position: relative;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.spell-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5));
}

.spell-name {
  color: #f8fafc;
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.2;
}

/* Effet Magique au Hover */
.spell-card:hover {
  transform: translateY(-4px);
  border-color: #3b82f6;
  background: #233045;
}

.spell-glow {
  position: absolute;
  bottom: -20px;
  width: 60px;
  height: 20px;
  background: #3b82f6;
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.3s;
}

.spell-card:hover .spell-glow {
  opacity: 0.4;
}

.spell-card:active {
  transform: scale(0.95);
}

/* --- EMPTY STATE --- */
.empty-state {
  padding: 40px 20px;
  text-align: center;
  background: rgba(30, 41, 59, 0.3);
  border-radius: 16px;
  border: 1px dashed #334155;
}

.empty-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 12px;
  opacity: 0.5;
}

.empty-state p {
  color: #64748b;
  font-size: 0.9rem;
  font-style: italic;
}
</style>
