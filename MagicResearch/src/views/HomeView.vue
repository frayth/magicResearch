<script setup lang="ts">
import { useWizardStore } from '../stores/wizard'
import EventElement from '@/components/elements/EventElement.vue'

import ProductionElements from '../components/elements/ProductionElements.vue'
import SchoolsElement from '../components/elements/SchoolsElement.vue'
import MagicElement from '@/components/elements/magicElement.vue'
import BuildingElement from '@/components/elements/BuildingElement.vue'
import ManaBar from '@/components/UI/ManaBar.vue'
import { useSaveStore } from '@/stores/save'
import { useUnlockStore } from '@/stores/unlock'
import ApprenticeCast from '@/components/elements/ApprenticeCast.vue'

const wizardStore = useWizardStore()
const saveStore = useSaveStore()
const unlockStore = useUnlockStore()
//v-if="unlockStore.checkUnlockStatus('apprentices')"
</script>

<template>
  <main>
    <button @click="saveStore.reset()">Reset</button>
    <ManaBar />
    <ProductionElements />
    <BuildingElement />
    <div>
      Buffs
      <ul>
        <li v-for="buff in wizardStore.buffs" :key="buff.name">
          {{ buff.name }}
        </li>
      </ul>
    </div>
    <div>

    </div>
    <SchoolsElement v-if="unlockStore.checkUnlockStatus('Researcher')" />
    <MagicElement />
    <EventElement />
    <ApprenticeCast  />
  </main>
</template>
<style scoped>

</style>
