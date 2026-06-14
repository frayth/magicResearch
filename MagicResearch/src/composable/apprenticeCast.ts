import type { Spell } from "@/types/ressources";
import { computed, onUnmounted, ref } from "vue";
export type ApprenticeCast = ReturnType<typeof useApprenticeCast>;
export function useApprenticeCast(spell:Spell) {
  const numberOfApprentices = ref(0);
  const spellRef = ref(spell);
  const cooldown = ref(spell.apprenticeCastTime/numberOfApprentices.value);
  const coolDownIsRunning = ref(false);
  const intervalId=ref<ReturnType<typeof setInterval> | null>(null)
  function lauch(){
    coolDownIsRunning.value = true;
    intervalId.value = setInterval(() => {
      cooldown.value-=1000;
      // TODO: Implement spell casting logic
      if(cooldown.value <=0){
        console.log(`Cast ${spellRef.value.name} with ${numberOfApprentices.value} apprentices`);
        cooldown.value = cooldownTimeWithApprentices.value
      }
    }, 500);
  }
  function stop(){
    if(intervalId.value){
      clearInterval(intervalId.value);
      intervalId.value = null;
      coolDownIsRunning.value = false;
    }
  }
  function setNumberOfApprentice(number:number){
    number = Math.floor(number);
    if(number < 0){
      console.error("Number of apprentices cannot be negative");
      return;
    }
    numberOfApprentices.value = number;
    cooldown.value = cooldownTimeWithApprentices.value
    if(!coolDownIsRunning.value && numberOfApprentices.value > 0){
      lauch();
    }
    if(coolDownIsRunning.value && numberOfApprentices.value === 0){
      stop();
    }
  }
  const cooldownTimeWithApprentices = computed(() => {
    return spell.apprenticeCastTime/numberOfApprentices.value;
  })
  onUnmounted(() => {
    stop();
  })
    return {setNumberOfApprentice,numberOfApprentices,cooldown,coolDownIsRunning,spellRef,cooldownTimeWithApprentices}
}
