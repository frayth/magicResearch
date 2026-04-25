import type { Building } from "@/types/ressources"
import { useWizardStore } from "@/stores/wizard"
import { useMathStore } from "@/stores/math"
//export type EasingType = 'linear' | 'quad' | 'cubic' | 'quart' | 'expo' | 'sine';

export type BuildingId =
  | 'puitDeMana'
  | 'cascade'
  | 'eclatdemana'
  | 'entrepot'
  | 'waterTank'
  | 'lumberYard'
  | 'ResearchCabin'


export function getBuildingList(): Building[] {
  const wizardStore = useWizardStore()
  const mathStore = useMathStore()
  return [
    {
      name:"Puit de mana",
      id:"puitDeMana",
      levelMax:100,
      level:0,
      easings:'expo',
      multiplier:0,
      effects:function (this:Building) {
        wizardStore.ressources.production.prodmana+=(0.5 * this.level) * mathStore.transformPercentage(this.multiplier)
      },
      cost:[
        {
          level:0,
          cost:{
            stone:{minValue:15,maxValue:25000},
            water:{minValue:2,maxValue:6000}
          }
        }
      ]
    },
    {
      name:"Cascade",
      id:"cascade",
      levelMax:10,
      level:0,
      easings:'expo',
      multiplier:0,
      effects:function (this:Building) {
        wizardStore.ressources.production.prodwater+=(0.5 * this.level)
      },
      cost:[
        {
          level:0,
          cost:{
            water:{maxValue:10000,minValue:10},
            mana:{maxValue:25000,minValue:10}
          }
        }
      ]
    },
    {
      name:'Eclat de Mana',
      id:'eclatdemana',
      levelMax:50,
      level:0,
      easings:'expo',
      cost:[{
        level:0,
        cost:{

          coins:{minValue:100,maxValue:500000}
        }
      }],
      multiplier:0,
      effects:function (this:Building) {
        wizardStore.ressources.limits.manamax+=(100 * this.level)
      }
    },{
      name:'Entrepot',
      id:'entrepot',
      levelMax:20,
      level:0,
      easings:'expo',
      cost:[{
        level:0,
        cost:{

          coins:{minValue:200,maxValue:500000},
          stone:{minValue:30,maxValue:20000}
        }
      }],
      multiplier:0,
      effects:function (this:Building) {
        wizardStore.ressources.limits.stonemax+=(400 * this.level)
        wizardStore.ressources.limits.woodmax+=(400 * this.level)
      }
    },
    {
      name:'Réservoir d\'eau',
      id:'waterTank',
      levelMax:20,
      level:0,
      easings:'expo',
      cost:[{
        level:0,
        cost:{

          coins:{minValue:350,maxValue:500000},
          stone:{minValue:200,maxValue:20000},
          wood:{minValue:300,maxValue:10000}
        }
      }],
      multiplier:0,
      effects:function (this:Building) {
        wizardStore.ressources.limits.watermax+=(400 * this.level)
      }
    },{
      name:'Scierie',
      id:'lumberYard',
      levelMax:20,
      level:0,
      easings:'expo',
      cost:[{
        level:0,
        cost:{

          mana:{minValue:200,maxValue:500000},
          stone:{minValue:10,maxValue:20000},
          wood:{minValue:25,maxValue:10000}
        }
      }],
      multiplier:0,
      effects:function (this:Building) {
        wizardStore.ressources.production.prodwood+=(1 * this.level)
      }
    },
    {
      name:'Chambre de chercheur',
      id:'ResearchCabin',
      levelMax:100,
      level:0,
      easings:'expo',
      cost:[{
        level:0,
        cost:{

          coins:{minValue:150,maxValue:500000},
          stone:{minValue:110,maxValue:25000},
          wood:{minValue:320,maxValue:15000}
        }
      }],
      multiplier:0,
      effects:function (this:Building) {
        wizardStore.ressources.school.apprenticeCapacity+=(1 * this.level)
      }
    }
  ]

}
