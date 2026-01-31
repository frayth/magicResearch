<template>
  <button @click="productionStore.addElement(props.name)" ref="buttonProd">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
  import { onLongPress } from '@vueuse/core'
import { useProductionStore } from '@/stores/production';
import { computed,shallowRef, useTemplateRef } from 'vue';
interface Props {
  name:"mana"|"water"|"coins",
}
const htmlRefHook = useTemplateRef('buttonProd')
const longPressedHook = shallowRef(false)
const intervalHook=shallowRef<number>()
function onLongPressCallbackHook() {
  longPressedHook.value = true
  productionStore.addElement(props.name)
  intervalHook.value = setInterval(() => {
    productionStore.addElement(props.name)
  }, 1000)
}
function onMouseUpHook() {
  longPressedHook.value = false
  clearInterval(intervalHook.value)
}
const props=defineProps<Props>();
const productionStore=useProductionStore()
const text=computed(()=>{
  switch(props.name){
    case "mana":
      return "Rassembler du mana"
    case "water":
      return "Rassembler de l'eau"
    case "coins":
      return "Rassembler de l'or"
    default:
      return "undifined production"
  }
})
onLongPress(
  htmlRefHook,
  onLongPressCallbackHook,
  {delay:500,onMouseUp:onMouseUpHook}
)
</script>

<style scoped></style>
