import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useWizardStore } from './wizard'
import { useBoucleManagerStore } from './boucleManager'
import { useMathStore } from './math'
import { useBuildingsStore } from './buildings'
import { useValueByLevel } from '../composable/UseValueByLevel'
export const useProductionStore = defineStore('production', () => {
  const wizardStore = useWizardStore()
  const buildingsStore = useBuildingsStore()
  const boucleManagerStore = useBoucleManagerStore()
  const mathStore = useMathStore()
  function CheckLimit() {
    if (
      wizardStore.ressources.incremental.mana &&
      wizardStore.ressources.incremental.mana > wizardStore.ressources.limits.manamax
    ) {
      wizardStore.ressources.incremental.mana = wizardStore.ressources.limits.manamax
    }
    if (
      wizardStore.ressources.incremental.water &&
      wizardStore.ressources.incremental.water > wizardStore.ressources.limits.watermax
    ) {
      wizardStore.ressources.incremental.water = wizardStore.ressources.limits.watermax
    }
        if (
      wizardStore.ressources.incremental.coins &&
      wizardStore.ressources.incremental.coins > wizardStore.ressources.limits.coinsmax
    ) {
      wizardStore.ressources.incremental.coins = wizardStore.ressources.limits.coinsmax
    }
    if (
      wizardStore.ressources.incremental.stone  &&
      wizardStore.ressources.incremental.stone > wizardStore.ressources.limits.stonemax
    ) {
      wizardStore.ressources.incremental.stone = wizardStore.ressources.limits.stonemax
    }
        if (
      wizardStore.ressources.incremental.wood  &&
      wizardStore.ressources.incremental.wood > wizardStore.ressources.limits.woodmax
    ) {
      wizardStore.ressources.incremental.wood = wizardStore.ressources.limits.woodmax
    }
  }
  function updateProduction() {
    if (wizardStore.ressourcesNeedToBeUpdated) {
      console.log('ressourcesNeedToBeUpdated')
      wizardStore.ressourcesNeedToBeUpdated = false
      wizardStore.ressources = JSON.parse(JSON.stringify({  ...wizardStore.startingRessources,incremental: wizardStore.ressources.incremental}))
      buildingsStore.resetMultipliers()
      updateWithBuffs()
      updateWithBuildings()
    }

    mergeRessources()
  }
  async function init() {
    return new Promise((resolve) => {
      resolve(true)
    })
  }
  function updateWithBuildings() {
    buildingsStore.wizardBuildings.forEach((building) => {
      building.effects()
    })
  }

  function updateWithBuffs() {
    wizardStore.buffs.forEach((buff) => {
      buff.effects()
    })
  }

  function mergeRessources(){
    for( const [key, value] of Object.entries(wizardStore.ressources.incremental)) {
      const incrementalRessources=["mana","water","stone","coins","wood"]
      if(incrementalRessources.includes(key)){
        switch(key){
          case "mana":wizardStore.ressources.incremental.mana+=wizardStore.ressources.production.prodmana* mathStore.transformPercentage(wizardStore.ressources.multipliers.prodmana) / mathStore.RatioTimer()
          break;
          case "water":wizardStore.ressources.incremental.water+=wizardStore.ressources.production.prodwater* mathStore.transformPercentage(wizardStore.ressources.multipliers.prodwater) / mathStore.RatioTimer()
          break;
          case "stone":wizardStore.ressources.incremental.stone+=wizardStore.ressources.production.prodstone* mathStore.transformPercentage(wizardStore.ressources.multipliers.prodstone) / mathStore.RatioTimer()
          break;
          case "coins":wizardStore.ressources.incremental.coins+=wizardStore.ressources.production.prodcoins* mathStore.transformPercentage(wizardStore.ressources.multipliers.prodcoins) / mathStore.RatioTimer()
          break;
          case "wood":wizardStore.ressources.incremental.wood+=wizardStore.ressources.production.prodwood* mathStore.transformPercentage(wizardStore.ressources.multipliers.prodwood) / mathStore.RatioTimer()
          break;
        }
      }
    }
    CheckLimit()
  }
  return { init, updateProduction }
})
