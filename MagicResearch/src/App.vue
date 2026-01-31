<script setup lang="ts">
import { watch } from 'vue';
import { useAppStore } from './stores/app';
import { useBoucleManagerStore } from './stores/boucleManager';
import { useBuilderStore } from './stores/builder';
import { useBuildingsStore } from './stores/buildings';
import { useProductionStore } from './stores/production';
import { useQuestsStore } from './stores/quests';
import { useUnlockStore } from './stores/unlock';
import { useWizardStore } from './stores/wizard';
import { useSchoolsStore } from './stores/schools';
const appStore=useAppStore()
const boucleManagerStore=useBoucleManagerStore()
const builderStore=useBuilderStore()
const buildingsStore=useBuildingsStore()
const productionStore=useProductionStore()
const questsStore=useQuestsStore()
const unlockStore=useUnlockStore()
const wizardStore=useWizardStore()
const schoolsStore=useSchoolsStore()
watch(()=>appStore.ready,()=>{
  boucleManagerStore.lauchBoucle()
},{once:true})
Promise.all([
  appStore.init(),
  boucleManagerStore.init(),
  builderStore.init(),
  buildingsStore.init(),
  productionStore.init(),
  questsStore.init(),
  unlockStore.init(),
  wizardStore.init(),
  schoolsStore.init()
]).then(()=>{
  appStore.ready=true
})
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
