<script setup lang="ts">
import { watch } from 'vue';
import { useAppStore } from './stores/app';
import { useBoucleManagerStore } from './stores/boucleManager';
import { useBuilderStore } from './stores/builder';
import { useBuildingsStore } from './stores/buildings';
import { useProductionStore } from './stores/production';
import { useUnlockStore } from './stores/unlock';
import { useWizardStore } from './stores/wizard';
import { useSchoolsStore } from './stores/schools';
import { useSaveStore } from './stores/save';
import ModalElement from './components/Modals/modalElement.vue';
const appStore=useAppStore()
const boucleManagerStore=useBoucleManagerStore()
const builderStore=useBuilderStore()
const buildingsStore=useBuildingsStore()
const productionStore=useProductionStore()
const unlockStore=useUnlockStore()
const wizardStore=useWizardStore()
const schoolsStore=useSchoolsStore()
const saveStore=useSaveStore()
watch(()=>appStore.ready,async ()=>{
  if(appStore.app.init){
    await saveStore.initSave()
  }else{
    await saveStore.loadSave()
  }
  boucleManagerStore.lauchBoucle()

},{once:true})
Promise.all([

  wizardStore.init(),
  appStore.init(),
  builderStore.init(),
  buildingsStore.init(),
  productionStore.init(),
  unlockStore.init(),
  schoolsStore.init(),
  boucleManagerStore.init(),
])
.then(()=>{
    saveStore.init()
  })
.then(()=>{
  saveStore.loadSave()

  }).then(()=>{
    appStore.ready=true
  })


</script>

<template>
  <ModalElement v-if="appStore.modalIsShow" />
  <RouterView />
</template>

<style scoped>

</style>
