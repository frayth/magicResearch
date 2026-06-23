import type { UnlockEvent } from "@/types/ressources";

export const unlocksText: UnlockEvent[] =[
  {
    type: "unlock",
    title: "Entrepot débloqué",
    name: "Entrepot",
    text: ["La maîtrise de la pierre et du bois atteint un nouveau palier.","Ton contrôle sur ces ressources n’est plus limité à la simple accumulation. Tu comprends désormais comment les organiser, les assembler, les structurer.",
      'Ce savoir débloque une nouvelle possibilité : la construction d’entrepôts.Des lieux capables de centraliser, sécuriser et gérer tes stocks à plus grande échelle.'],
    unlock: "Vous avez débloqué l'entrepot, vous pourvez maintenant stocker plus de ressources",
    button: "Super",
  },
  {
    type:'unlock',
    name:'Manashard',
    title:'Éclat de mana débloqué',
    text:['Un nouvel éclat de mana se forme sous tes yeux. Sa surface pulse lentement, comme s’il respirait au rythme du monde.','Tu peux désormais accueillir davantage de pouvoir.'],
    unlock:'Vous avez débloqué l\'éclat de mana,Vous pouvez stocker plus de mana',
    button:'Super'
  },{
    type:'unlock',
    name:'Puit d\'eau',
    title:'Puit d\'eau débloqué',
    text:['Tu découvres un ancien puits enfoui, jusque-là inutilisable.',
      'En le remettant en état, tu comprends rapidement son fonctionnement et la manière de l’exploiter.',
      'Désormais, tu peux en tirer de l’eau quand tu en as besoin.'
    ],
    unlock:'Vous avez débloqué la capacité de généré de l\'eau',
    button:'Super'
  },
  {
    type:'unlock',
    name:'Cascade',
    title:'Cascade débloquée',
    text:['La maîtrise de l’eau ne se limite plus à sa simple présence.',
      'Tu comprends désormais comment la contraindre à suivre un cycle, à revenir à sa source, à ne jamais s’épuiser.',
      'En canalisant les flux naturels, tu ouvres la voie à une circulation constante, fluide et autonome.'
    ],
    unlock:'Vous avez débloqué la Cascade, elle générera automatiquement de l\'eau',
    button:'Super'
  },
    {
    type:'unlock',
    name:'Forêt',
    title:'Forêt débloquée',
    text:['Tu mets la main sur une parcelle de terrain abandonnée où les anciens arbres ont été coupés, mais les souches sont encore exploitables.',
      'En la réhabilitant, tu peux relancer une exploitation simple et contrôlée du bois.',
      'Désormais, tu peux y revenir pour récupérer des ressources quand nécessaire.'
    ],
    unlock:'Vous avez débloqué la Forêt, Vous pouvez généré du bois manuellement',
    button:'Super'
  },   {
    type:'unlock',
    name:'Storage water',
    title:'Réservoir d\'eau débloqué',
    text:['Tu découvres un ancien réservoir d’eau enterré, encore intact malgré le temps.',
      'En le remettant en service, tu peux y diriger et conserver de grandes quantités d’eau sans perte.',
      'Ta capacité de stockage d’eau augmente nettement.'
    ],
    unlock:'Vous avez débloqué le réservoir d\'eau, vous pouvez stocker plus d\'eau',
    button:'Super'
  },
  {
    type:'unlock',
    name:'lumberYard',
    title:'Scierie débloqué',
    text:['Tu récupères une ancienne scierie à l’abandon, encore partiellement fonctionnelle.',
      'Après quelques réparations et un bon réglage des machines, le système peut tourner seul avec les ressources disponibles.',
      'Le bois brut est désormais transformé et produit sans intervention constante.'
    ],
    unlock:'Vous avez débloqué la Scierie, elle générera automatiquement du bois',
    button:'Super'
  },
    {
    type:'unlock',
    name:'vaults',
    title:'Coffre-fort débloqué',
    text:['Tu mets la main sur un ancien coffre-fort intégré dans une structure renforcée.',
      'Après l’avoir remis en état, tu comprends vite qu’il est conçu pour sécuriser de grandes quantités de richesse.',
      'Tes capacités de stockage d’or sont augmentées.'
    ],
    unlock:'Vous avez débloqué le coffre-fort, il vous permet de stocker plus d\'or',
    button:'Super'
  },
  {
    type:'unlock',
    name:'ironOre',
    title:'La carrière',
    text:['Votre chercheuse attire votre attention. « Il y a un endroit que vous devriez voir », s\'exclame-t-elle en sortant du campus. « Suivez-moi. ». Vous faites ce qu\'elle vous demande.',
      'Vous arrivez au pied de ce qui ressemble à une falaise particulièrement rocheuse. Cependant, vous remarquez qu\'une partie de la paroi brille d\'une couleur différente.« Du fer ? » dit votre chercheuse. « C\'est un métal solide. Pas très utile pour canaliser la magie, mais il pourrait être excellent pour construire des bâtiments... ou bien... »',
      'Vous êtes d\'accord avec elle. Comme vous découvrez cet endroit pour la première fois, vous remerciez la chercheuse pour cette trouvaille.Vous reviendrez certainement mieux préparé la prochaine fois. Cet endroit pourrait s\'avérer très utile.'
    ],
    unlock:'Tu as débloqué la capacité de miner du fer',
    button:'Super'
  }, {
    type:'unlock',
    name:'manaGeyser',
    title:'Le geyser de mana',
    text:['À mesure que tu accumules de plus en plus de fer, une idée te vient pour améliorer tes pousses de mana. Tu penses qu\'en y ajoutant du fer, tu pourrais créer une structure capable de produire du mana à un rythme bien plus rapide qu\'une simple pousse.',
      'Il te faudra certainement beaucoup de fer, mais cela en vaudra la peine sur le long terme, te dis-tu. Le mana est la pierre angulaire de la magie !',
    ],
    unlock:'Tu peux contruire un geyser de mana',
    button:'Super'
  },

]
