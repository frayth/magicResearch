<template>
  <div class="cheat-dialog">
    <h1 class="title">Une rencontre inattendue</h1>
    <div class="content">
      <p v-if="currentSlide === 1">
        « …Te voilà enfin. Je me demandais combien de temps il te faudrait avant de remarquer ma
        présence. »
      </p>

      <p v-else-if="currentSlide === 2">
        « Ne cherche pas autour de toi. Quand quelqu’un observe assez longtemps… il finit toujours
        par être vu. »
      </p>

      <p v-else-if="currentSlide === 3">
        « Ton parcours était… intéressant. Des décisions rapides. Trop rapides. Comme si certains
        chemins étaient déjà connus. »
      </p>

      <p v-else-if="currentSlide === 4">
        « Beaucoup passent ici avec hésitation. Toi, tu avançais avec une étrange certitude. Comme
        si les règles… ne s’appliquaient pas vraiment. »
      </p>

      <p v-else-if="currentSlide === 5">
        « Ce lieu a pourtant une particularité. Il n’oublie rien. Chaque geste laisse une trace. »
      </p>

      <p v-else-if="currentSlide === 6">
        « Et certaines traces… attirent mon attention. Suffisamment pour que je sorte de l’ombre. »
      </p>

      <p v-else-if="currentSlide === 7">
        « Je ne suis pas là pour discuter. Seulement pour rétablir un certain… équilibre. »
      </p>

      <p v-else-if="currentSlide === 8">
        « Considère ceci comme une leçon. Un petit détour imposé par quelqu’un qui veille aux
        règles. »
      </p>

      <p v-else-if="currentSlide === 9">
        « La prochaine fois que tu avanceras… assure-toi que ce soit par ton propre mérite. »
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, watch } from 'vue'
import type { Ref } from 'vue'
import { useBoucleManagerStore } from '@/stores/boucleManager'
const boucleManagerStore = useBoucleManagerStore()
const buttonValue = inject<Ref<string>>('buttonValue')
const currentSlide = inject<Ref<number>>('currentSlide')
const numberOfSlides = inject<Ref<number>>('numberOfSlides')
const imgBackground = inject<Ref<string>>('imgBackground')
if (currentSlide) {
  watch(currentSlide, (newValue) => {
    if (!buttonValue) return
    switch (newValue) {
      case 1:
        buttonValue.value = 'Qui êtes-vous ?'
        break
      case 2:
        buttonValue.value = 'Je ne vois personne'
        break
      case 3:
        buttonValue.value = 'Et alors ?'
        break
      case 4:
        buttonValue.value = 'Qu’est-ce que vous insinuez ?'
        break
      case 5:
        buttonValue.value = 'Ce n’est qu’un jeu'
        break
      case 6:
        buttonValue.value = 'Vous me surveillez ?'
        break
      case 7:
        buttonValue.value = 'Attendez…'
        break
      case 8:
        buttonValue.value = 'C’est fini ?'
        break
      case 9:
        buttonValue.value = 'Je comprends'
        break
    }
  })
}

onMounted(() => {
  boucleManagerStore.stopBoucle()
  if (imgBackground) {
    imgBackground.value = '/images/backgrounds/death.png'
  }
  if (buttonValue) {
    buttonValue.value = 'Qui êtes-vous ?'
  }
  if (numberOfSlides) {
    numberOfSlides.value = 9
  }
})
</script>
<style scoped>
.cheat-dialog {
  max-width: 440px;
  text-align: left;
}

.title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 24px;
  padding-left: 15px;
  /* Bordure gauche pour créer un point d'ancrage visuel */
  border-left: 4px solid #7f1d1d;
  line-height: 1.2;
  color: #450a0a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  /* Petite ombre portée pour décoller du fond */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.content {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 10px;
}
p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #d1c7c7;
  margin: 0;
}
</style>
