import type { Ressources,CharactersStatistics } from "@/types/ressources";
const defaultRessource :Ressources={
    incremental: {
      fire:10,
      mana: 10,
      water: 10,
      wood: 10,
      coins: 20,
      stone: 10,
      ironOre: 10,
    },
    production: {
      prodfire: 10,
      prodmana: 10,
      prodwater: 10,
      prodwood: 10,
      prodcoins: 10,
      prodstone: 10,
      prodironOre: 10,
    },
    limits: {
      firemax: 0,
      manamax: 100,
      watermax: 10,
      woodmax: 50,
      stonemax: 50,
      coinsmax: 1000,
      ironOremax: 50,
    },
    school: {
      numberOfResearcher: 1,
      xpByResearcher: 1,
      researcherCapacity: 1,
      numberOfApprentice: 0,
      apprenticeCapacity: 0,
    },
    manual: {
      manualmana: 50,
      manualwater: 1,
      manualwood: 1,
      manualironOre: 0.2,
    },
    multipliers: {
      prodmana: 3000,
      prodwater: 3000,
      prodfire: 3000,
      prodwood: 3000,
      prodcoins: 3000,
      prodstone: 3000,
      prodironOre:100,
      manualmana: 1000,
      manualwater: 1000,
      manualwood: 1000,
      manualironOre:100,
      manamax: 100,
      watermax: 100,
      firemax: 0,
      woodmax: 100,
      stonemax: 100,
      coinsmax: 100,
      xpByResearcher: 50000,
      researcherCapacity: 100,
      numberOfApprentice: 100,
      numberOfResearcher: 100,
      apprenticeCapacity: 100,
    },
  }
const WizardDefaultStatistics:CharactersStatistics = {
  life:100,
  maxLife:100,
  damage:1,
  agility:1,
  strength:1,
  intelligence:1,
  luck:1,
  regenHp:1
}
export function getDefaultRessource() {
    return JSON.parse(JSON.stringify(defaultRessource))
  }

export function getWizardDefaultStatistics() {
    return JSON.parse(JSON.stringify(WizardDefaultStatistics))
  }
