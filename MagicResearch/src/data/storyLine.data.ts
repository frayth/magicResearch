import type { StoryLineData } from '@/types/ressources'

const storyLineData: StoryLineData[] = [
  {
    id: 'story1',
    text: [
      [
        'Une femme enthousiaste regarde ton mana et remarque la grande quantité que tu possèdes.',
        '« Waouh, ça ferait une excellente source de matière première », dit-elle.',
      ],
      [
        'Tu la regardes, perplexe et un peu confus.',
        'Elle continue alors d’expliquer : « De grandes quantités de mana sont difficiles à trouver, et sont presque indispensables pour réussir l’étude de la magie. »',
      ],
      [
        '« Tu essaies d’étudier la magie ici ? C’est passionnant !',
        'Je serais prête à travailler ici pour un petit prix… disons 200 pièces. Bien sûr, tu serais le premier à apprendre ce que j’ai découvert, et tu pourrais me dire sur quoi je devrais me concentrer, » dit-elle avec sérieux.',
        '« Alors, qu’est-ce que tu en dis ? »',
      ],
    ],
    ending:[

        'Tu sors 200 pièces de tes poches et les remets à la chercheuse. Elle regarde les pièces et les range dans les poches de sa robe.',
        '« Parfait ! Je vais m’y mettre tout de suite », s’exclame-t-elle.',
        '« Je suis sûre que c’est le début d’une relation très fructueuse pour nous deux. »'

    ],
    unlock:'Tu as débloqué l\'option "Rechercher! Tu l\'a trouvera dans le menu "Recherche".'
  },
  {
    id: 'story2',
    text: [['Continue tes recherches...']],
    ending: ['Ta chercheuse vient vers toi. « Étudier ici a été super jusqu’à présent ! » dit-elle.«Mais c’est quand même un peu solitaire… ce serait bien d’avoir de la compagnie. On pourrait faire deux fois plus de travail, imagine à quelle vitesse on pourrait découvrir de nouvelles choses ! » s’exclame-t-elle.',
      '« Mais il y a un problème. Il n’y a nulle part où les loger. J’ai une idée pour une cabane mais… il va falloir la construire d’abord. Bon… retour au travail », mentionne-t-elle en se détournant et en se reconcentrant sur ses recherches.',
      'Tu réfléchis à ses paroles pendant un moment. Indépendamment de ses sentiments, tu réalises que doubler le nombre de chercheurs pourrait grandement accélérer les choses. Tu envisages de construire une cabane pour chercheurs comme elle l’a suggéré et d’embaucher un chercheur supplémentaire.'
    ],
    unlock: 'Tu peux maintenant construire une chambre pour chercheurs !'
  }
]
export default storyLineData
