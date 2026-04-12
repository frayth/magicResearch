import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useWizardStore } from './wizard';
import type {Building, BuildingWizard, IncrementalRessources, Ressources, RessourcesKey} from '../types/ressources'
import{buildings as buildingsData, type BuildingId} from '../data/buildings.data'
import { useValueByLevel } from '../composable/UseValueByLevel'
export const useBuildingsStore = defineStore('buildings', () => {
  const wizardStore=useWizardStore();

  const buildings=ref(buildingsData)//<Omit<Building,'level'>[]>
  function getBuilding(id:BuildingId,level:number):BuildingWizard | null{
    const building=buildings.value.find(building=>building.id===id)
    if(!building){
      console.error("Building not found")
      return null
    }
    const costCurrentLevel=building.cost.filter(cost=>cost.level<=level).map(cost=>cost.cost).reduce((total,cost)=>{
      Object.entries(cost).forEach(([ressource,quantity])=>{
        if(total[ressource]){
          total[ressource].minValue+=quantity.minValue
          total[ressource].maxValue+=quantity.maxValue
        }else{
          total[ressource]={minValue:quantity.minValue,maxValue:quantity.maxValue}
        }
      })
      return total
    },{} as { [key: string]: {minValue: number; maxValue: number} })

    const currentLevel:Record<RessourcesKey,number> = Object.entries(costCurrentLevel).reduce((total,[ressource,quantity])=>{
      total[ressource as RessourcesKey ]=Math.floor(useValueByLevel({level:level,startValue:quantity.minValue,endValue:quantity.maxValue,maxLevel:building.levelMax,easing:building.easings,minLevel:0}).value.value)
      return total
      },{} as Record<RessourcesKey,number>)

    const effects=building.effects
    return {cost:currentLevel,level:level,id,name:building.name,effects,levelMax:building.levelMax}
  }

  async function init(){
    return new Promise(resolve => {
      resolve(true)
   });
  }
  return {init,buildings,getBuilding};

});
