import type { Spell } from "@/types/ressources";
import { computed, onUnmounted, ref } from "vue";
import { useSchoolsStore } from "@/stores/schools";

export type ApprenticeCast = ReturnType<typeof useApprenticeCast>;
export function useApprenticeCast(spell:Spell) {
  const schoolsStore = useSchoolsStore();
  const numberOfApprentices = ref(0);
  const spellRef = ref(spell);
  const cooldown = ref(spell.apprenticeCastTime/numberOfApprentices.value);
  const coolDownIsRunning = ref(false);
  const failureRate = ref(0);
  const intervalId=ref<ReturnType<typeof setInterval> | null>(null)
  function lauch(){
    coolDownIsRunning.value = true;
    intervalId.value = setInterval(() => {
      cooldown.value-=1000;
      // TODO: Implement spell casting logic
      if(cooldown.value <=0){
        const resultCast=schoolsStore.castSpell(spellRef.value);
        if(resultCast.status || resultCast.reason ==='cooldown'){
          console.log(`Cast ${spellRef.value.name} with ${numberOfApprentices.value} apprentices`);
          setCooldown(cooldownTimeWithApprentices.value)
          failureRate.value = 0;
        }else{
          failureRate.value < 10 ? failureRate.value++ : failureRate.value = 10;
          console.log(`Failed to cast ${spellRef.value.name} with ${numberOfApprentices.value} apprentices`);
          setCooldown(cooldownTimeWithApprentices.value/failureRate.value)
        }

      }
    }, 500);
  }
  function setCooldown(time:number){
    if(time <=1000){
      time=1000
    }
    cooldown.value = time;
  }
  function stop(){
    if(intervalId.value){
      clearInterval(intervalId.value);
      intervalId.value = null;
      coolDownIsRunning.value = false;
      failureRate.value = 0;
    }
  }
  function setNumberOfApprentice(number:number){
    number = Math.floor(number);
    if(number < 0){
      console.error("Number of apprentices cannot be negative");
      return;
    }
    numberOfApprentices.value = number;
    failureRate.value = 0;
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
const averageManaCost = computed(() => {
  return Number((spell.cost / (cooldownTimeWithApprentices.value / 1000)).toFixed(2))
})
    return {setNumberOfApprentice,numberOfApprentices,cooldown,coolDownIsRunning,spellRef,cooldownTimeWithApprentices,averageManaCost,failureRate}
}
