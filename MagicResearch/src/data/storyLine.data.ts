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
  },
    {
    id: 'story3',
    text: [['Continue tes recherches...']],
    ending: ['Combien de fois as-tu lancé un sort manuellement jusqu’à présent ? Tu as perdu le compte. Ce n’est certainement pas difficile pour toi. Cependant, il y a une vraie répétition dans ces lancements.',
      'Tu te demandes s’il n’y aurait pas un moyen d’automatiser ça d’une manière ou d’une autre, car ça commence à devenir un peu lassant. Mais en y réfléchissant, tu n’arrives pas à trouver de solution…',
    ],
    unlock: ''
  },
  {

    id: 'story4',
    text: [['« C’est un honneur de vous rencontrer, directeur », s’exclame l’apprenti en s’inclinant devant vous un peu trop profondément.',
      'La chercheuse poursuit : « Ce serait formidable qu’il reste ici ! Il pourrait vous aider à lancer des sorts et continuer à améliorer notre campus. D’ailleurs, une institution magique n’a aucun sens sans des gens désireux d’apprendre. Qu’en pensez-vous ? » vous demande-t-elle.',
      'Vous vous rappelez à quel point il était fastidieux de lancer des sorts. Cela pourrait être d’une grande aide !']],
    ending: ['« Il y a juste un petit problème, poursuit la chercheuse : il n’y a nulle part où il puisse dormir ! Il va falloir construire quelque chose. »',
      'Vous l’aviez vu venir. Pourtant, vous avez hâte — vous en avez assez de lancer Créer un caillou manuellement. Vous rassurez la chercheuse et son cousin en leur disant que vous allez y réfléchir, puis vous vous éloignez, commençant à imaginer ce qu’il vous faudrait pour construire un logement adapté à votre premier apprenti.'
    ],
    unlock: 'Vous pouvez désormais construire des dortoirs pour apprentis!'

  },{
    id: 'story5',
    text: [['',
      '',
      '']],
    ending: ['La construction du premier dortoir pour apprentis est terminée ! Tu célèbres cela devant un petit public. Tu remarques que l’apprenti d’avant est toujours là. Tu t’approches de lui, bien qu’il semble encore craintif et s’incline profondément.',
      '« C’est… un logement que je pourrais utiliser ? » dit-il d’une voix timide. Tu acquiesces et lui demandes s’il aimerait devenir ton premier apprenti. Il tremble, visiblement et clairement nerveux.',
      '« Ce serait formidable… C-c’est un honneur de pouvoir apprendre auprès de quelqu’un comme vous, maître. Je vais emménager tout de suite. »'
    ],
    unlock: 'Vous avez débloqué les apprentis ! Les apprentis peuvent lancer automatiquement des sorts pour vous après un certain temps. Vous pouvez les gérer dans la section des apprentis !'


  }
]
export default storyLineData
