import type { Building } from "@/types/ressources"
//export type EasingType = 'linear' | 'quad' | 'cubic' | 'quart' | 'expo' | 'sine';
  export const buildingsData=[
    {
      name:"Puit de mana",
      id:"puitDeMana",
      levelMax:100,
      level:0,
      easings:'expo',
      effects:{
        ressources:{
          prodmana:0.5
        }
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
      effects:{
        ressources:{
          prodwater:0.5
        },
        multipliers:{
        }
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
      effects:{
        ressources:{
          manamax:100
        }
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
      effects:{
        ressources:{
          stonemax:400,
          woodmax:400
        }
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
      effects:{
        ressources:{
          watermax:400
        }
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
      effects:{
        ressources:{
          prodwood:1
        }
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
      effects:{
        ressources:{
          apprenticeCapacity:1
        }
      }
    }
  ] as const

export type BuildingId = (typeof buildingsData)[number]['id']

export const buildings = buildingsData.map(b => ({...b})) as unknown as Building[]
