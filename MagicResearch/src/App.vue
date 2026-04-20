<script setup lang="ts">
import { watch } from 'vue'
import { useAppStore } from './stores/app'
import { useBoucleManagerStore } from './stores/boucleManager'
import { useBuilderStore } from './stores/builder'
import { useBuildingsStore } from './stores/buildings'
import { useProductionStore } from './stores/production'
import { useUnlockStore } from './stores/unlock'
import { useWizardStore } from './stores/wizard'
import { useStoryLineStore } from './stores/storyLine'
import { useSchoolsStore } from './stores/schools'
import { useSaveStore } from './stores/save'
import ModalElement from './components/Modals/modalElement.vue'
import StoryLineModal from './components/Modals/storyLineModal.vue'
const appStore = useAppStore()
const boucleManagerStore = useBoucleManagerStore()
const builderStore = useBuilderStore()
const buildingsStore = useBuildingsStore()
const productionStore = useProductionStore()
const unlockStore = useUnlockStore()
const wizardStore = useWizardStore()
const schoolsStore = useSchoolsStore()
const saveStore = useSaveStore()
const storyLineStore = useStoryLineStore()
watch(
  () => appStore.ready,
  async () => {
    console.log('app is ready ', appStore.app.init)
    if (!appStore.app.init) {
      console.log('new game, init Save')
      await saveStore.initSave()
    } else {
      console.log('save already exist , load game')
      await saveStore.loadSave()
    }
    boucleManagerStore.lauchBoucle()
  },
  { once: true },
)
Promise.all([
  wizardStore.init(),
  appStore.init(),
  storyLineStore.init(),
  builderStore.init(),
  buildingsStore.init(),
  productionStore.init(),
  unlockStore.init(),
  schoolsStore.init(),
  boucleManagerStore.init(),
]).then(() => {
  appStore.ready = true
})

</script>

<template>
  <ModalElement v-if="appStore.modalIsShow" />
  <StoryLineModal v-if="appStore.storyLineModal?.show " />
  <RouterView />
</template>

<style scoped></style>
