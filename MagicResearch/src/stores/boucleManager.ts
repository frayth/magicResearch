
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUnlockStore } from './unlock';
import { useProductionStore } from './production';
import { useWizardStore } from './wizard';
import { useSchoolsStore } from './schools';
export const useBoucleManagerStore = defineStore('boucleManager', () => {
  const boucle=ref()
  const inBoucle=ref(false)
  const interval=ref(33)
  const unlockStore=useUnlockStore()
  const wizardStore=useWizardStore()
  const schoolsStore=useSchoolsStore()
  const productionStore=useProductionStore()
  const setFramerate=(framerate:number)=>{
    interval.value=1000/framerate
    lauchBoucle()
  }
 function lauchBoucle(){
    boucle.value=setInterval(()=>{
      if(inBoucle.value){
        console.log("erreur boucle")
        return
      }
      inBoucle.value=true
      unlockStore.checkUnlocks()
      productionStore.updateProduction()
      wizardStore.updateWizard(interval.value)
      schoolsStore.updateSchools(interval.value)
      inBoucle.value=false
    },interval.value)
  }
  async function init(){
    return new Promise(resolve => {
      resolve(true)
   });
  }
  return {init,boucle,setFramerate,lauchBoucle,interval};

});
