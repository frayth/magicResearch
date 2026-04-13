<template>
<div class="cost-container">
  <p class="title">Couts</p>
  <div class="cost-list">
    <div       v-for="(value, key, i) in cost" class="element-container"
      :key="`buildingCost${i}`">
          <RichText>
 &{{ key }}.name&
    </RichText>
    <p><span :class="{notEnought:!ressourceIsEnought(key,value)}">{{ wizardStore.formatedRessources[key as keyof typeof wizardStore.formatedRessources] }}</span>/{{ formatShowedValue(value!) }}</p>
    </div>

  </div>
</div>
</template>

<script setup lang="ts">
import { useWizardStore } from '@/stores/wizard';
import { useBuildingsStore } from '@/stores/buildings';
import type {BuildingId} from '@/data/buildings.data';
import { computed } from 'vue';
import { formatShowedValue } from '@/composable/formatShowedValue';
import RichText from './RichText.vue';
interface Props {
  id:BuildingId,
}
const props=defineProps<Props>();
const buildingStore=useBuildingsStore()
const wizardStore=useWizardStore();
const wizardHaveBuilding=computed(()=>wizardStore.wizardHaveBuilding(props.id));
const building=computed(()=>buildingStore.getBuilding(props.id,wizardHaveBuilding.value? wizardHaveBuilding.value.level : 0))
const cost=computed(()=>{
  return building.value!.cost
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
