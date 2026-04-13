<template>
  <div>
      <h2>Title</h2>
      <div>
        ICI SLIDE DESCRIPTIF
      </div>
      <div>
        <div>
          <button>←</button>
          <button>→</button>
        </div>
        <div>
          <button>VALIDER</button>
          <button>Fermer</button>
        </div>
      </div>
  </div>

</template>

<script setup lang="ts">
import { useStoryLineStore } from '@/stores/storyLine'

const storyLineStore = useStoryLineStore()
</script>

<style scoped>

</style>
