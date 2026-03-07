import { computed, type Ref } from 'vue';

/**
 * Types de fonctions d'accélération disponibles
 */
export type EasingType = 'linear' | 'quad' | 'cubic' | 'quart' | 'expo' | 'sine';

/**
 * Fonction d'accélération quadratique
 */
function easeQuad(t: number): number {
  return t * t;
}

/**
 * Fonction d'accélération cubique
 */
function easeCubic(t: number): number {
  return t * t * t;
}

/**
 * Fonction d'accélération quartique
 */
function easeQuart(t: number): number {
  return t * t * t * t;
}

/**
 * Fonction d'accélération exponentielle
 */
function easeExpo(t: number): number {
  return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
}

/**
 * Fonction d'accélération sinusoïdale
 */
function easeSine(t: number): number {
  return 1 - Math.cos((t * Math.PI) / 2);
}

/**
 * Fonction linéaire (pas d'accélération)
 */
function linear(t: number): number {
  return t;
}

/**
 * Map des fonctions d'easing
 */
const easingFunctions: Record<EasingType, (t: number) => number> = {
  linear,
  quad: easeQuad,
  cubic: easeCubic,
  quart: easeQuart,
  expo: easeExpo,
  sine: easeSine,
};

/**
 * Options pour le composable useValueByLevel
 */
interface UseValueByLevelOptions {
  /** Niveau actuel */
  level: Ref<number> | number;
  /** Valeur de départ (niveau 1) */
  startValue: number;
  /** Valeur finale (niveau max) */
  endValue: number;
  /** Niveau maximum */
  maxLevel: number;
  /** Niveau minimum */
  minLevel: number;
  /** Type de fonction d'accélération à utiliser (default: 'cubic') */
  easing?: EasingType;
}

/**
 * Composable pour calculer une valeur en fonction d'un niveau
 * avec différentes fonctions d'accélération
 *
 * @example
 * ```ts
 * const playerLevel = ref(5);
 * const { value } = useValueByLevel({
 *   level: playerLevel,
 *   startValue: 100,
 *   endValue: 1000,
 *   maxLevel: 50,
 *   easing: 'cubic'
 * });
 * // value.value sera calculé automatiquement en fonction du niveau
 * ```
 */
export function useValueByLevel(options: UseValueByLevelOptions) {
  const {
    level,
    startValue,
    endValue,
    maxLevel,
    minLevel,
    easing = 'cubic',
  } = options;

  /**
   * Valeur calculée en fonction du niveau actuel
   */
  const value = computed(() => {
    const currentLevel = typeof level === 'number' ? level : level.value;

    // Clamp le niveau entre 1 et maxLevel
    const clampedLevel = Math.max(minLevel, Math.min(currentLevel, maxLevel));

    // Calcule la progression normalisée (0 à 1)
    const progress = (clampedLevel - minLevel) / (maxLevel - minLevel);

    // Applique la fonction d'easing
    const easingFn = easingFunctions[easing];
    const easedProgress = easingFn(progress);

    // Interpole entre startValue et endValue
    return startValue + (endValue - startValue) * easedProgress;
  });

  /**
   * Retourne la progression actuelle (0 à 1)
   */
  const progress = computed(() => {
    const currentLevel = typeof level === 'number' ? level : level.value;
    const clampedLevel = Math.max(1, Math.min(currentLevel, maxLevel));
    return (clampedLevel - 1) / (maxLevel - 1);
  });

  /**
   * Retourne la progression avec easing appliqué (0 à 1)
   */
  const easedProgress = computed(() => {
    const easingFn = easingFunctions[easing];
    return easingFn(progress.value);
  });

  return {
    /** Valeur calculée */
    value,
    /** Progression linéaire (0 à 1) */
    progress,
    /** Progression avec easing (0 à 1) */
    easedProgress,
  };
}
