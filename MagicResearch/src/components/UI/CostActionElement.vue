<template>
<div class="cost-container">
  <p class="title">Couts</p>
  <div class="cost-list">
    <div       v-for="(ressource, i) in cost ?? []" class="element-container"
      :key="`ActionCost${i}`">
          <RichText>
 &{{ ressource.key }}.name&
    </RichText>
    <p><span :class="{notEnought:!ressourceIsEnought(ressource.key,ressource.value.value)}">{{ wizardStore.formatedRessources[ressource.key as keyof typeof wizardStore.formatedRessources] }}</span>/{{ formatShowedValue(ressource.value.value) }}</p>
    </div>

  </div>
</div>
</template>

<script setup lang="ts">
import { useWizardStore } from '@/stores/wizard';
import { formatShowedValue } from '@/composable/formatShowedValue';
import RichText from './RichText.vue';
import type { useValueByLevel } from '@/composable/UseValueByLevel';
import { computed } from 'vue';
interface Props {
  cost:Record<string, ReturnType<typeof useValueByLevel>>
}

const props=defineProps<Props>();
const wizardStore=useWizardStore()

const cost = Object.entries(props.cost).map(([key, value]) => ({
  key,
  value: value.value
}))

const costIsEnought = computed(() => {
  return cost.every(ressource => ressourceIsEnought(ressource.key, ressource.value.value))
})

defineExpose({
  ressourceIsEnought:costIsEnought
})
function ressourceIsEnought(key:string,value:number | undefined){
  const ressource=wizardStore.formatedRessources[key as keyof typeof wizardStore.formatedRessources]
  if(!ressource || !value) return false
  return ressource >= value
}
</script>

<style scoped>
.cost-container {
  width: 100%;
  display:grid;
  grid-template-columns: 1fr 1fr;

}
.element-container{
  display: flex;
  width:100%;
  justify-content: space-between;
  column-gap: 20px;
}
.title {
  font-weight: bold;
  margin-bottom: 8px;
}

.cost-list {
  display: flex;
  flex-direction: column;
  justify-self: end;
  width:fit-content;
  column-gap: 20px;
}

.cost-item {
  display: flex;
  justify-content: start; /* clé à gauche, valeur à droite */
  padding: 4px 8px;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  font-size: 14px;
}

.cost-key {
  font-weight: 500;
}

.cost-value {
  font-weight: bold;
  color: #2c7;
}
.notEnought{
  color: red;
}
</style>
