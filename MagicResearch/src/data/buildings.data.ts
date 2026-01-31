import type { Building } from "@/types/ressources"

  export const buildings=[
    {
      name:"Puit de mana",
      id:"puitDeMana",
      exponentialProduction:5,
      bonus:0,
      effects:{
        ressources:{
          prodmana:0.5
        }
      },
      cost:[
        {
          level:0,
          cost:{
            stone:500,
            water:2
          }
        }
        ,{
          // level:10,
          // cost:{
          //   stone:150,
          //   water:150,
          // }
        }
      ]
    },
    {
      name:"Cascade",
      id:"cascade",
      exponentialCost:20,
      exponentialProduction:5,
      bonus:0,
      effects:{
        ressources:{
          prodwater:0.5
        },
        multipliers:{
          watermax:20,
          manamax:20

        }
      },
      cost:[
        {
          level:0,
          cost:{
            water:10,
            mana:10
          }
        }
      ]
    },
    {
      name:'Eclat de Mana',
      id:'eclatdemana',
      cost:[{
        level:0,
        cost:{

          coins:100
        }
      }],
      exponentialProduction:5,
      bonus:0,
      effects:{
        ressources:{
          manamax:100
        }
      }
    }
  ] as const

export type BuildingId = typeof buildings[number]['id']

