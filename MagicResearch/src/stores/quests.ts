import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useQuestsStore = defineStore('quests', () => {
  const quests=ref([
    {
      active:false,
      name:"test",
      description:"test",
      conditions:{
        ressources:[],
        buildings:[],
      },
      textResolution:"test"
    }
  ])

  function checkQuests(){
    for(const quest of quests.value){
      if(quest.conditions.ressources.every(([ressource,quantity])=>wizardStore.ressources[ressource]?wizardStore.ressources[ressource]>=quantity:false)
         && quest.conditions.buildings.every(({name,level})=>wizardStore.buildings.some(building=>building.name===name&&building.level>=level))){
        quest.active=true
      }
    }
  }
  async function init(){
    return true
  }
  return {init,quests};

});
