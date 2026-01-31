import { computed, type Ref } from "vue";

export function formatShowedValue(value: number) {
  return computed(() => Math.floor(value))
}

export function formatTime(value: number) {
  return computed(() => secondsToHMS(value))
}

 function secondsToHMS(sec:number) {
      const h = Math.floor(sec / 3600)
      const m = Math.floor((sec % 3600) / 60)
      const s = Math.ceil(sec % 60)

      return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':')
    }
