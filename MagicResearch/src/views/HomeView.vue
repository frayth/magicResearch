<script setup lang="ts">
import { useWizardStore } from '../stores/wizard'


import ProductionElements from '../components/elements/ProductionElements.vue'
import SchoolsElement from '../components/elements/SchoolsElement.vue'
import MagicElement from '@/components/elements/magicElement.vue'
import RichText from '@/components/UI/RichText.vue'
import BuildingElement from '@/components/elements/BuildingElement.vue'
import ManaBar from '@/components/UI/ManaBar.vue'
import { useSaveStore } from '@/stores/save'
const wizardStore = useWizardStore()
const saveStore = useSaveStore()

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
    <SchoolsElement />
    <MagicElement />
    <RichText>salut jai &fire.name&</RichText>
  </main>
</template>
<style scoped>

</style>
