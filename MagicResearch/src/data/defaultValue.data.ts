import type { Ressources } from "@/types/ressources";
export const defaultRessource :Ressources={
    incremental: {
      mana: 0,
      water: 0,
      wood: 0,
      coins: 0,
      stone: 0,
    },
    production: {
      prodmana: 0,
      prodwater: 2,
      prodwood: 0,
      prodcoins: 20,
      prodstone: 2,
    },
    limits: {
      manamax: 100,
      watermax: 10,
      woodmax: 50,
      stonemax: 50,
      coinsmax: 1000,
    },
    school: {
      xpByApprentice: 1,
      apprenticeCapacity: 1,
      numberOfApprentice: 1,
    },
    manual: {
      manualmana: 1,
      manualwater: 1,
      manualwood: 1,
    },
    multipliers: {
      prodmana: 0,
      prodwater: 0,
      prodwood: 0,
      prodcoins: 0,
      prodstone: 0,
      manualmana: 5000,
      manualwater: 0,
      manualwood: 1,
      manamax: 0,
      watermax: 0,
      woodmax: 0,
      stonemax: 0,
      coinsmax: 1,
      xpByApprentice: 0,
      apprenticeCapacity: 0,
      numberOfApprentice: 0,
    },
  }

  export function getDefaultRessource() {
    return JSON.parse(JSON.stringify(defaultRessource))
  }
