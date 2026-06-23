import type { CharactersStatistics } from "@/types/ressources"
export class Entity {
  stats:CharactersStatistics
  intervalId:number
  constructor(stats:CharactersStatistics){
    this.stats=stats
    this.intervalId=setInterval(() => {
      if( this.stats.life < this.stats.maxLife){
        this.heal(this.stats.regenHp)
      }
    }, 1000);
  }
  isAlive():boolean{
    return this.stats.life > 0
  }
  clearInterval(){
    clearInterval(this.intervalId)
  }
  heal(amount:number){
    this.stats.life += amount
    if(this.stats.life > this.stats.maxLife){
      this.stats.life = this.stats.maxLife
    }
  }
}


export class Wizard extends Entity {
  inCombat:boolean
  constructor(stats:CharactersStatistics){
    super(stats)
    this.inCombat=false
  }
}

export class Monster extends Entity {
  constructor(stats:CharactersStatistics){
    super(stats)
  }
}

