import { defineStore } from 'pinia'
import { useBoucleManagerStore } from './boucleManager'
export const useMathStore = defineStore('math', () => {
  const boucleManagerStore = useBoucleManagerStore()
  function transformPercentage(percentage: number) {
    return 1 + percentage / 100
  }
  function RatioTimer() {
    return 1000 / boucleManagerStore.interval
  }
  function RandomValue(min?:number,max?:number):number{
    if(min&&max){
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
    if(min){
      return Math.floor(Math.random() * (min + 1))
    }
    if(max){
      return Math.floor(Math.random() * (max + 1))
    }
    return Math.floor(Math.random() * (1))
  }

  return {
    transformPercentage,
    RatioTimer,
    RandomValue
  }
})
