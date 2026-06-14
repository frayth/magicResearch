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
      prodmana: 1,
      prodwater: 5,
      prodwood: 5,
      prodcoins: 5,
      prodstone: 5,
    },
    limits: {
      manamax: 100,
      watermax: 10,
      woodmax: 50,
      stonemax: 50,
      coinsmax: 1000,
    },
    school: {
      numberOfResearcher: 2,
      xpByResearcher: 1,
      researcherCapacity: 1,
      numberOfApprentice: 10,
      apprenticeCapacity: 10,
    },
    manual: {
      manualmana: 50,
      manualwater: 1,
      manualwood: 1,
    },
    multipliers: {
      prodmana: 6000,
      prodwater: 3000,
      prodwood: 3000,
      prodcoins: 3000,
      prodstone: 3000,
      manualmana: 1000,
      manualwater: 1000,
      manualwood: 1000,
      manamax: 100,
      watermax: 100,
      woodmax: 100,
      stonemax: 100,
      coinsmax: 100,
      xpByResearcher: 20000,
      researcherCapacity: 100,
      numberOfApprentice: 100,
      numberOfResearcher: 100,
      apprenticeCapacity: 100,
    },
  }

  export function getDefaultRessource() {
    return JSON.parse(JSON.stringify(defaultRessource))
  }
