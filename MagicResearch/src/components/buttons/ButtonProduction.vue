<template>
  <button
    @click="wizardStore.addRessources(props.name,1)"
    ref="buttonProd"
    class="prod-btn"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { onLongPress } from '@vueuse/core'
import { computed, shallowRef, useTemplateRef } from 'vue'
import { useWizardStore } from '@/stores/wizard'

interface Props {
  name: "mana" | "water" | "coins" | "wood"
}

const props = defineProps<Props>()
const wizardStore = useWizardStore()

const htmlRefHook = useTemplateRef('buttonProd')
const longPressedHook = shallowRef(false)
const intervalHook = shallowRef<number>()

function onLongPressCallbackHook() {
  longPressedHook.value = true
  wizardStore.addRessources(props.name,1)

  intervalHook.value = setInterval(() => {
    wizardStore.addRessources(props.name,1)
  }, 1000)
}

function onMouseUpHook() {
  longPressedHook.value = false
  clearInterval(intervalHook.value)
}

const text = computed(() => {
  switch (props.name) {
    case "mana":
      return "Rassembler du mana"
    case "water":
      return "Rassembler de l'eau"
    case "coins":
      return "Rassembler de l'or"
    case "wood":
      return "Rassembler du bois"
    default:
      return "undefined production"
  }
})

onLongPress(
  htmlRefHook,
  onLongPressCallbackHook,
  { delay: 500, onMouseUp: onMouseUpHook }
)
</script>

<style scoped>

.prod-btn{
  padding: 12px 18px;

  font-size: 14px;
  font-weight: 600;

  color: white;
  background: linear-gradient(135deg,#4f46e5,#6366f1);

  border: none;
  border-radius: 10px;

  cursor: pointer;

  box-shadow:
    0 4px 10px rgba(0,0,0,0.25),
    inset 0 -2px 4px rgba(0,0,0,0.25);

  transition: all 0.15s ease;
}

.prod-btn:hover{
  transform: translateY(-2px);
  box-shadow:
    0 6px 14px rgba(0,0,0,0.3),
    inset 0 -2px 4px rgba(0,0,0,0.25);
}

.prod-btn:active{
  transform: translateY(1px);
  box-shadow:
    inset 0 3px 6px rgba(0,0,0,0.35);
}

</style>
