<script setup lang="ts">
import { useWizardStore } from '../stores/wizard'


import ProductionElements from '../components/elements/ProductionElements.vue'
import SchoolsElement from '../components/elements/SchoolsElement.vue'
import MagicElement from '@/components/elements/magicElement.vue'
import RichText from '@/components/UI/RichText.vue'
import BuildingElement from '@/components/elements/BuildingElement.vue'
import ManaBar from '@/components/UI/ManaBar.vue'
const wizardStore = useWizardStore()

</script>

<template>
  <main>
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
      <p>Mana : {{ wizardStore.formatedRessources.mana }}</p>
      <p>Water : {{ wizardStore.formatedRessources.water }}</p>
      <p>Stone : {{ wizardStore.formatedRessources.stone }}</p>
      <p>Manamax : {{ wizardStore.formatedRessources.manamax }}</p>
      <p>Watermax : {{ wizardStore.formatedRessources.watermax }}</p>
      <p>Stonemax : {{ wizardStore.formatedRessources.stonemax }}</p>
      <p>Prodmana : {{ wizardStore.ressources.prodmana }}</p>
      <p>Prodwater : {{ wizardStore.ressources.prodwater }}</p>
      <p>Prodstone : {{ wizardStore.ressources.prodstone }}</p>
    </div>
    <SchoolsElement />
    <MagicElement />
    <RichText>salut jai &fire.name&</RichText>
  </main>
</template>
<style scoped>

</style>
