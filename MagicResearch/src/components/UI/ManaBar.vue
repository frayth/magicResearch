<template>
  <div class="mana-bar-container">
    <div class="mana-bar-text">
      <RichText >&mana&</RichText>
      <span>{{ wizardStore.formatedRessources.mana }}/{{ wizardStore.ressources.manamax }} ({{ wizardStore.ressources.prodmana }}/s)</span>
    </div>
    <div class="mana-bar" :style="{width: wizardStore.ressources.mana / wizardStore.ressources.manamax * 100 + '%'}"></div>
  </div>
</template>

<script setup lang="ts">
import RichText from './RichText.vue';
import {useWizardStore} from '@/stores/wizard'
const wizardStore=useWizardStore()

</script>

<style scoped>
.mana-bar-container{
  width: 100%;
  height: 25px;
  background-color: #000055;
  position: relative;
}
.mana-bar{
  width: 50%;
  height: 100%;
  background-color: #1010b9;
  padding: 1px;
}
.mana-bar-text{
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color:white;
  font-weight: 100 !important;
}
</style>
