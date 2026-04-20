import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useWizardStore } from './wizard'
import { useBoucleManagerStore } from './boucleManager'
import { useMathStore } from './math'
import { useValueByLevel } from '../composable/UseValueByLevel'
export const useProductionStore = defineStore('production', () => {
  const wizardStore = useWizardStore()
  const boucleManagerStore = useBoucleManagerStore()
  const mathStore = useMathStore()
  const multipliers = wizardStore.multipliers
  function CheckLimit() {
    if (
      wizardStore.ressources.mana &&
      wizardStore.ressources.mana > wizardStore.ressources.manamax
    ) {
      wizardStore.ressources.mana = wizardStore.ressources.manamax
    }
    if (
      wizardStore.ressources.water &&
      wizardStore.ressources.water > wizardStore.ressources.watermax
    ) {
      wizardStore.ressources.water = wizardStore.ressources.watermax
    }
        if (
      wizardStore.ressources.coins &&
      wizardStore.ressources.coins > wizardStore.ressources.coinsmax
    ) {
      wizardStore.ressources.coins = wizardStore.ressources.coinsmax
    }
    if (
      wizardStore.ressources.stone  &&
      wizardStore.ressources.stone > wizardStore.ressources.stonemax
    ) {
      wizardStore.ressources.stone = wizardStore.ressources.stonemax
    }
        if (
      wizardStore.ressources.wood  &&
      wizardStore.ressources.wood > wizardStore.ressources.woodmax
    ) {
      wizardStore.ressources.wood = wizardStore.ressources.woodmax
    }
  }
  function updateProduction() {
    if (wizardStore.ressourcesNeedToBeUpdated) {
      console.log('ressourcesNeedToBeUpdated')
      wizardStore.ressourcesNeedToBeUpdated = false
      let newProduction={...wizardStore.baseProduction}
      let newMultipliers={...wizardStore.baseMultipliers}
      const {production,multipliers}=updateWithBuildings(newProduction,newMultipliers)
      newProduction=production
      newMultipliers=multipliers
      //console.log("newProduction ",newProduction)
      //console.log("newMultipliers ",newMultipliers)
      const buffResult=updateWithBuffs(newProduction,newMultipliers)
      newProduction=buffResult.production
      newMultipliers=buffResult.multipliers
      //console.log("newProduction1 ",newProduction)
      //console.log("newMultipliers1 ",newMultipliers)
      updateWizard(newProduction,newMultipliers)
    }
    mergeRessources()
  }
  async function init() {
    return new Promise((resolve) => {
      resolve(true)
    })
  }
  function updateWithBuildings(production:typeof wizardStore.production,multipliers:typeof wizardStore.multipliers) {
    wizardStore.buildings.forEach((building) => {
      ///console.log("building ",building.name)
      Object.entries(building.effects.ressources ?? {}).forEach(([key, value]) => {
        //console.log("key ",key)
        //console.log("value ",value)
        if (key in production) {
          //console.log("key found",key)
          const buildingBuff = wizardStore.buffs
            .map((buff) => {
              if (buff.effects.buildings) {
                return buff.effects.buildings[building.id as keyof typeof buff.effects.buildings] ?? 0
              } else {
                return 0
              }
            })
            .reduce((a, b) => (a ?? 0) + (b ?? 0), 0)
          production[key as keyof typeof production] +=
            value * (building.level+1) * mathStore.transformPercentage(buildingBuff)
        }
      })
      Object.entries(building.effects.multipliers ?? {}).forEach(([key, value]) => {
        if (key in multipliers) {
          const buildingBuff = wizardStore.buffs
            .map((buff) => {
              if (buff.effects.buildings) {
                if (building.id in buff.effects.buildings) {
                  return buff.effects.buildings[building.id as keyof typeof buff.effects.buildings] ?? 0
                }
                return 0
              } else {
                return 0
              }
            })
            .reduce((a, b) => (a ?? 0) + (b ?? 0), 0)
          multipliers[key as keyof typeof multipliers] +=
            value * (building.level+1) * mathStore.transformPercentage(buildingBuff)
        }
      })
    })
    //console.log(production)
    //console.log(multipliers)
    return {production,multipliers}
  }
  function updateWithBuffs(production:typeof wizardStore.production,multipliers:typeof wizardStore.multipliers) {
    wizardStore.buffs.forEach((buff) => {
      Object.entries(buff.effects.ressources ?? {}).forEach(([key, value]) => {

        if (key in production) {
          production[key as keyof typeof production] +=
            value
        }
      })
      Object.entries(buff.effects.multipliers ?? {}).forEach(([key, value]) => {
        //console.log("key ",key)
        //console.log("value ",value)
        if (key in multipliers) {
          //console.log("key found",key)
          //console.log("before value ",multipliers[key as keyof typeof multipliers])
          multipliers[key as keyof typeof multipliers] += value
          //console.log("after value ",multipliers[key as keyof typeof multipliers])
        }
      })
    })
    //console.log("production ",production)
    //console.log("multipliers ",multipliers)
    return {production,multipliers}
  }
  function updateWizard(production:typeof wizardStore.production,multipliers:typeof wizardStore.multipliers){
    wizardStore.production=production
    wizardStore.multipliers=multipliers
  }
  function mergeRessources(){
    for( const [key, value] of Object.entries(wizardStore.ressources)) {
      const incrementalRessources=["mana","water","stone","coins","wood"]
      if(incrementalRessources.includes(key)){
        switch(key){
          case "mana":wizardStore.ressources.mana+=wizardStore.production.prodmana* mathStore.transformPercentage(wizardStore.multipliers.prodmana) / mathStore.RatioTimer()
          break;
          case "water":wizardStore.ressources.water+=wizardStore.production.prodwater* mathStore.transformPercentage(wizardStore.multipliers.prodwater) / mathStore.RatioTimer()
          break;
          case "stone":wizardStore.ressources.stone+=wizardStore.production.prodstone* mathStore.transformPercentage(wizardStore.multipliers.prodstone) / mathStore.RatioTimer()
          break;
          case "coins":wizardStore.ressources.coins+=wizardStore.production.prodcoins* mathStore.transformPercentage(wizardStore.multipliers.prodcoins) / mathStore.RatioTimer()
          break;
          case "wood":wizardStore.ressources.wood+=wizardStore.production.prodwood* mathStore.transformPercentage(wizardStore.multipliers.prodwood) / mathStore.RatioTimer()
          break;
        }
      }else{
        wizardStore.ressources[key as keyof typeof wizardStore.ressources] = wizardStore.production[key as keyof typeof wizardStore.production] * mathStore.transformPercentage(wizardStore.multipliers[key as keyof typeof wizardStore.multipliers])
      }
    }
    CheckLimit()
  }
  return { init, updateProduction }
})
