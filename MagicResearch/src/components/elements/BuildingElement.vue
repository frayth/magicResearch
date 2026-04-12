<template>
  <div>
    <h2>Rassembler</h2>
    <div>
      <ButtonProduction name="mana" />
      <RichText>Concentre tes pensées et rassemble du mana. &mana.value:+1&</RichText>
      <p class="tips">
        Astuce : tu peux appuyer et maintenir les boutons pour les activer automatiquement !
      </p>
    </div>
    <div v-if="unlockStore.checkUnlockStatus('Forêt')">
      <ButtonProduction name="wood" />
      <RichText>Concentre tes pensées et rassemble du bois. &wood.value:+1&</RichText>
    </div>
    <div v-if="unlockStore.checkUnlockStatus('Puit d\'eau')">
      <ButtonProduction name="water" />
      <RichText>Concentre tes pensées et rassemble de l'eau. &water.value:+1&</RichText>
    </div>
  </div>
  <div>
    <h2>Mana</h2>
    <div v-if="unlockStore.checkUnlockStatus('Puit de mana')">
      <ButtonBuilding id="puitDeMana" />
      <RichText
        >Génére automatiquement du mana et remplie ta réserve. &mana.value:+0.5.time&</RichText
      >
      <CostElement id="puitDeMana" />
    </div>
    <div v-if="unlockStore.checkUnlockStatus('Manashard')">
      <ButtonBuilding id="eclatdemana" />
      <RichText>Augmente la quantité de mana que tu peux stocker. &mana.value:+100.max& </RichText>
      <RichText class="tips"
        >Tip:Tu peux avoir plus de &coin.name& avec le sort d'illusion, Tour de magie!</RichText
      >
      <CostElement id="eclatdemana" />
    </div>
  </div>
  <div>
    <h2>Production</h2>
    <div v-if="unlockStore.checkUnlockStatus('lumberYard')">
      <ButtonBuilding id="lumberYard" />
      <RichText>Coupe les branches et les arbres. Génére atomatiquement du bois  &wood.value:+1.time& </RichText>
      <CostElement id="lumberYard" />
    </div>
  </div>

  <div>
    <h2>Eau</h2>
    <div v-if="unlockStore.checkUnlockStatus('Cascade')">
      <ButtonBuilding id="cascade" />
      <RichText
        >Génére automatiquement de l'au et remplie ta réserve. &water.value:+0.5.time&</RichText
      >
    </div>
  </div>
  <div>
    <h2>Stockage</h2>
    <div v-if="unlockStore.checkUnlockStatus('Entrepot')">
      <ButtonBuilding id="entrepot" />
      <RichText
        >Augmente la quantité de ressources que tu peux stocker. &stone.value:+400.max& &wood.value:+400.max&
      </RichText>
      <CostElement id="entrepot" />
    </div>
        <div v-if="unlockStore.checkUnlockStatus('Storage water')">
      <ButtonBuilding id="waterTank" />
      <RichText
        >Permet de stocker plus d'eau. &water.value:+250.max&
      </RichText>
      <CostElement id="waterTank" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonProduction from '../buttons/ButtonProduction.vue'
import ButtonBuilding from '../buttons/buttonBuilding.vue'
import { useUnlockStore } from '@/stores/unlock'
import RichText from '@/components/UI/RichText.vue'
import CostElement from '../UI/CostElement.vue'
const unlockStore = useUnlockStore()
</script>

<style scoped>
div {
  margin-bottom: 2rem;
  font-family: 'Arial', sans-serif;
}

/* Titres de section */
h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e3a8a; /* bleu foncé */
  border-bottom: 2px solid #1e3a8a;
  padding-bottom: 0.25rem;
}

/* Conteneurs internes */
div > div {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Boutons de production et bâtiments */
ButtonProduction,
ButtonBuilding {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #2563eb;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

ButtonProduction:hover,
ButtonBuilding:hover {
  background-color: #1d4ed8;
}

/* Texte enrichi */
RichText {
  display: block;
  font-size: 1rem;
  line-height: 1.5;
}

.richText img {
  vertical-align: middle;
  margin: 0 0.2rem;
  width: 1.2em;
  height: 1.2em;
}

/* Classe tips */
.tips {
  font-size: 0.875rem;
  color: #6b7280; /* gris clair */
  font-style: italic;
}

/* Gestion des spans richText */
span.richText {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
}

/* Pour la mise en valeur des valeurs */
span.richText.mana {
  color: #10b981; /* vert pour mana */
}

span.richText.water {
  color: #3b82f6; /* bleu pour eau */
}
</style>
