<template>
  <button v-if="wizardHaveBuilding" :disabled="!haveEnoughRessources" @click="builderStore.build(props.id)">
    Améliorer {{ building?.name || "" }} ({{ building?.level ? building.level - 1 : 0 }})
  </button>
  <button v-else @click="builderStore.build(props.id)" :disabled="!haveEnoughRessources">
    Contruire {{ building?.name || "" }}
  </button>
</template>

<script setup lang="ts">
import { useWizardStore } from '@/stores/wizard';
import { useBuildingsStore } from '@/stores/buildings';
import {useBuilderStore} from '@/stores/builder';
import type {BuildingId} from '@/data/buildings.data';
import { computed } from 'vue';
interface Props {
  id:BuildingId,
}
const props=defineProps<Props>();
const builderStore=useBuilderStore()
const buildingStore=useBuildingsStore()
const wizardStore=useWizardStore();
const wizardHaveBuilding=computed(()=>wizardStore.wizardHaveBuilding(props.id));
const building=computed(()=>buildingStore.getBuilding(props.id,wizardHaveBuilding.value? wizardHaveBuilding.value.level : 0))
const haveEnoughRessources=computed(()=>wizardStore.checkIfRessourceAreEnough(building.value!.cost.currentLevel))

</script>

<style scoped></style>
