import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useWizardStore } from './wizard';
import type {Building, BuildingWizard, IncrementalRessources} from '../types/ressources'
import{buildings as buildingsData, type BuildingId} from '../data/buildings.data'
import { useValueByLevel } from '../composable/UseValueByLevel'
import {ressourcesMAp} from '../data/RessourcesExp.data'
export const useBuildingsStore = defineStore('buildings', () => {
  const wizardStore=useWizardStore();

  const buildings=ref(buildingsData)//<Omit<Building,'level'>[]>
  function getBuilding(id:BuildingId,level:number):BuildingWizard | null{
    const building=buildings.value.find(building=>building.id===id)
    if(!building){
      console.error("Building not found")
      return null
    }
    const exponentialProduction=building.exponentialProduction
    const costCurrentLevel=building.cost.filter(cost=>cost.level<=level).pop()?.cost
    const costNextLevel=building.cost.filter(cost=>cost.level<=level+1).pop()?.cost
    if(!costCurrentLevel || !costNextLevel){
      console.error("Cost not found")
      return null
    }
    const currentLevel = Object.entries(costNextLevel).reduce((total,[ressource,quantity])=>{
      const dataRessource=ressourcesMAp[ressource as IncrementalRessources]
      console.log(level,ressource,quantity)
      total[ressource]=useValueByLevel({level:level,startValue:quantity,endValue:dataRessource.endValue,maxLevel:dataRessource.maxLevel,easing:dataRessource.easing}).value.value
      return total
      },{} as {[key:string]:number})
    const nextLevel = Object.entries(costNextLevel).reduce((total,[ressource,quantity])=>{
      const dataRessource=ressourcesMAp[ressource as IncrementalRessources]
      total[ressource]=useValueByLevel({level:level+1,startValue:quantity,endValue:dataRessource.endValue,maxLevel:dataRessource.maxLevel,easing:dataRessource.easing}).value.value
      return total
      },{} as {[key:string]:number})

    const effects=building.effects
    const bonus=building.bonus
    return {cost:{currentLevel:currentLevel,nextLevel:nextLevel},bonus,level:level + 1,id,name:building.name,exponentialProduction,effects}
  }

  async function init(){
    return new Promise(resolve => {
      resolve(true)
   });
  }
  return {init,buildings,getBuilding};

});
