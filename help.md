penser quand on rajoute une ressource incremental a ajouter la ressource dans mergeRessource du store production

RichText &${name}.name.value:+1.max.time&

# 🎮 useValueByLevel - Composable Vue.js

Un composable Vue.js qui calcule une valeur en fonction d'un niveau avec différentes fonctions d'accélération.

## 📦 Installation

Copie le fichier `useValueByLevel.ts` dans ton dossier `composables/`.

## 🚀 Utilisation de base

```typescript
import { ref } from 'vue';
import { useValueByLevel } from '@/composables/useValueByLevel';

const playerLevel = ref(5);

const { value: hp } = useValueByLevel({
  level: playerLevel,      // Niveau actuel (Ref ou nombre)
  startValue: 100,         // Valeur au niveau 1
  endValue: 1000,          // Valeur au niveau max
  maxLevel: 50,            // Niveau maximum
  easing: 'cubic'          // Type d'accélération (optionnel, 'cubic' par défaut)
});

// hp.value sera calculé automatiquement : ~116 pour le niveau 5
```

## 🎯 Fonctions d'accélération disponibles

| Type | Description | Utilisation recommandée |
|------|-------------|------------------------|
| `linear` | Augmentation constante | XP, progression simple |
| `quad` | Accélération douce | Vitesse, mouvements |
| `cubic` | **Défaut** - Bon équilibre | Stats générales (HP, dégâts) |
| `quart` | Accélération forte | Boss stats, late game |
| `expo` | Explosion à la fin | Coûts, prix, difficulté |
| `sine` | Naturel et organique | Animations fluides |

## 📚 Exemples pratiques

### 1. Stats de joueur (Jeu RPG)

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useValueByLevel } from '@/composables/useValueByLevel';

const level = ref(1);

// Points de vie
const { value: maxHp } = useValueByLevel({
  level,
  startValue: 100,
  endValue: 2000,
  maxLevel: 100,
  easing: 'cubic'
});

// Dégâts
const { value: attack } = useValueByLevel({
  level,
  startValue: 10,
  endValue: 500,
  maxLevel: 100,
  easing: 'cubic'
});

// Défense (augmente plus vite en fin de partie)
const { value: defense } = useValueByLevel({
  level,
  startValue: 5,
  endValue: 300,
  maxLevel: 100,
  easing: 'expo'
});
</script>

<template>
  <div class="player-stats">
    <div>HP: {{ Math.round(maxHp) }}</div>
    <div>ATK: {{ Math.round(attack) }}</div>
    <div>DEF: {{ Math.round(defense) }}</div>
  </div>
</template>
```

### 2. Système de prix/coûts

```typescript
// Coût d'amélioration (augmente exponentiellement)
const { value: upgradeCost } = useValueByLevel({
  level: buildingLevel,
  startValue: 100,
  endValue: 50000,
  maxLevel: 25,
  easing: 'expo' // Très cher à la fin!
});

// Temps de construction
const { value: buildTime } = useValueByLevel({
  level: buildingLevel,
  startValue: 10,
  endValue: 3600,
  maxLevel: 25,
  easing: 'cubic'
});
```

### 3. Système d'XP requis par niveau

```typescript
const { value: xpRequired } = useValueByLevel({
  level: currentLevel,
  startValue: 100,
  endValue: 1000000,
  maxLevel: 99,
  easing: 'expo'
});

console.log(`XP requis pour passer au niveau ${currentLevel.value + 1}: ${Math.round(xpRequired.value)}`);
```

### 4. Rewards de quêtes

```typescript
const { value: questReward } = useValueByLevel({
  level: questDifficulty,
  startValue: 50,      // Quête facile
  endValue: 10000,     // Quête légendaire
  maxLevel: 10,
  easing: 'quad'
});
```

### 5. Ennemis (scaling de difficulté)

```typescript
const { value: enemyHp } = useValueByLevel({
  level: playerLevel,
  startValue: 50,
  endValue: 5000,
  maxLevel: 50,
  easing: 'cubic'
});

const { value: enemyDamage } = useValueByLevel({
  level: playerLevel,
  startValue: 5,
  endValue: 200,
  maxLevel: 50,
  easing: 'cubic'
});
```

### 6. Taux de drop

```typescript
// Chance de drop rare (augmente lentement au début)
const { value: dropRate, easedProgress } = useValueByLevel({
  level: playerLevel,
  startValue: 0.01,    // 1% au niveau 1
  endValue: 0.20,      // 20% au niveau max
  maxLevel: 100,
  easing: 'quad'
});

// Utilisation
const willDrop = Math.random() < dropRate.value;
```

### 7. Utilisation avec valeur statique (pas de ref)

```typescript
// Calcul direct sans réactivité
function calculateDamage(weaponLevel: number): number {
  const { value } = useValueByLevel({
    level: weaponLevel,  // Nombre simple, pas de ref
    startValue: 10,
    endValue: 100,
    maxLevel: 10,
    easing: 'cubic'
  });
  
  return Math.round(value.value);
}

const damage = calculateDamage(5); // ~23
```

### 8. Progression visuelle

```vue
<script setup lang="ts">
const { value, progress, easedProgress } = useValueByLevel({
  level: playerLevel,
  startValue: 0,
  endValue: 100,
  maxLevel: 50,
  easing: 'cubic'
});
</script>

<template>
  <div class="level-progress">
    <!-- Barre de progression linéaire -->
    <div class="bar" :style="{ width: `${progress * 100}%` }"></div>
    
    <!-- Barre de progression avec easing -->
    <div class="bar eased" :style="{ width: `${easedProgress * 100}%` }"></div>
    
    <!-- Valeur calculée -->
    <span>{{ Math.round(value) }}</span>
  </div>
</template>
```

### 9. Bonus multi-facteurs

```typescript
// Bonus de vitesse d'attaque
const { value: attackSpeedBonus } = useValueByLevel({
  level: dexterity,
  startValue: 0,
  endValue: 50,
  maxLevel: 100,
  easing: 'quad'
});

// Bonus de critique
const { value: critBonus } = useValueByLevel({
  level: luck,
  startValue: 5,
  endValue: 50,
  maxLevel: 100,
  easing: 'cubic'
});

const finalAttackSpeed = baseAttackSpeed.value * (1 + attackSpeedBonus.value / 100);
const finalCritChance = baseCritChance.value + critBonus.value;
```

### 10. Système de prestige/rebirth

```typescript
const { value: prestigeBonus } = useValueByLevel({
  level: prestigeLevel,
  startValue: 0,
  endValue: 500,
  maxLevel: 10,
  easing: 'expo' // Énorme boost en fin de prestige
});

// Applique le bonus à toutes les stats
const finalHp = baseHp.value * (1 + prestigeBonus.value / 100);
```

## 🎨 Cas d'usage créatifs

### Couleur progressive

```typescript
const { value: colorValue } = useValueByLevel({
  level: health,
  startValue: 0,
  endValue: 255,
  maxLevel: 100,
  easing: 'linear'
});

const healthColor = computed(() => {
  const green = Math.round(colorValue.value);
  const red = 255 - green;
  return `rgb(${red}, ${green}, 0)`;
});
```

### Taille d'éléments UI

```typescript
const { value: iconSize } = useValueByLevel({
  level: rarity,
  startValue: 24,
  endValue: 64,
  maxLevel: 5,
  easing: 'quad'
});
```

## 💡 Tips

- **Choix de l'easing**: 
  - `linear` pour des progressions prévisibles
  - `cubic` pour un bon compromis (défaut recommandé)
  - `expo` pour des coûts/difficultés qui explosent
  
- **Performance**: Le composable est très léger, n'hésite pas à en créer plusieurs

- **Debug**: Utilise `progress` et `easedProgress` pour visualiser la différence

- **TypeScript**: Tout est bien typé, ton IDE t'aidera !

## 🔄 Comparaison des valeurs

```typescript
// Au niveau 25 sur 50:
// progress = 0.5 (50%)

linear:  50    (exactement 50%)
quad:    25    (commence doucement)
cubic:   12.5  (encore plus doux)
expo:    ~0.1  (presque rien, puis boom!)
```

## 🎯 Quand utiliser quoi ?

**Linear** (`linear`):
- XP requis régulier
- Scaling équitable

**Quadratique** (`quad`):
- Vitesse de déplacement
- Taux de régénération

**Cubique** (`cubic`) ⭐ Recommandé:
- HP, MP, Stats
- Dégâts d'armes
- Défense

**Quartique** (`quart`):
- Boss endgame
- Content hardcore

**Exponentiel** (`expo`):
- Prix d'amélioration
- Coût d'équipement
- Difficulté de craft

**Sinusoïdal** (`sine`):
- Effets visuels
- Transitions smooth


//TODO 
BUFF a GERER LORS DU CHARGEMENT DE LA SAVE
DIFFERENT BUG A RESOUDRE VOIR CONSOLE
