<template>
  <div  :style="{display:'flex',justifyContent:'space-between',flexDirection:'column'}">
    <section :style="{display:'flex',justifyContent:'space-between'}" >
      <RichText>&water.name&</RichText>
      <div :style="{display:'flex',justifyContent:'space-between'}">
        <p>{{  wizardStore.formatedRessources.water}}</p>
        <p>/</p>
        <p>{{ wizardStore.ressources.watermax }}</p>
      </div>
    </section>
        <section :style="{display:'flex',justifyContent:'space-between'}" >
      <RichText>&stone.name&</RichText>
      <div :style="{display:'flex',justifyContent:'space-between'}">
        <p>{{  wizardStore.formatedRessources.stone }}</p>
        <p>/</p>
        <p>{{ wizardStore.ressources.stonemax }}</p>
      </div>
    </section>
           <section :style="{display:'flex',justifyContent:'space-between'}" >
      <RichText>&coins.name&</RichText>
      <div :style="{display:'flex',justifyContent:'space-between'}">
        <p>{{  wizardStore.formatedRessources.coins }}</p>
        <p>/</p>
        <p>{{ wizardStore.ressources.coinsmax }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import {useUnlockStore} from '@/stores/unlock';
import { useWizardStore } from '@/stores/wizard';
import RichText from '../UI/RichText.vue';


const wizardStore=useWizardStore()
</script>

<style scoped>

</style>
