<template>
   <span v-html="parsed"></span>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import { useRichText } from '@/composable/useRichText'
import { toRef } from 'vue';
const props = defineProps<{size?:number}>()
const slots = useSlots()
const size = toRef(props, 'size')
const { parse } = useRichText(size.value? size : ref(20))
const parsed = computed(() => {
  const text = slots.default?.()[0]?.children as string
  return parse(text ?? '')
})
</script>

<style scoped>

</style>
