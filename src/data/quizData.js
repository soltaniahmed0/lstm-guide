export const quizData = {
  rnn: {
    topic: "RNN (Recurrent Neural Networks)",
    description: "Testez votre compréhension des réseaux de neurones récurrents",
    questions: [
      {
        question: "Quel est le principal avantage des RNN par rapport aux réseaux de neurones traditionnels ?",
        options: [
          "Ils sont plus rapides à entraîner",
          "Ils peuvent traiter des séquences de données en gardant une mémoire du contexte",
          "Ils ont moins de paramètres",
          "Ils sont plus simples à implémenter"
        ],
        correctAnswer: 1,
        points: 2,
        explanation: "Les RNN sont spécialement conçus pour traiter des séquences où l'ordre et le contexte temporel sont importants, en gardant une mémoire des entrées précédentes."
      },
      {
        question: "Quelle est la formule principale pour calculer l'état caché dans un RNN ?",
        options: [
          "hₜ = W · xₜ + b",
          "hₜ = tanh(W · xₜ + U · hₜ₋₁ + b)",
          "hₜ = σ(W · xₜ)",
          "hₜ = xₜ + hₜ₋₁"
        ],
        correctAnswer: 1,
        points: 3,
        explanation: "L'état caché combine l'entrée actuelle (xₜ) avec l'état précédent (hₜ₋₁) en utilisant des poids W et U, puis applique tanh pour normaliser."
      },
      {
        question: "Quel est le problème principal des RNN classiques ?",
        options: [
          "Ils sont trop lents",
          "Le gradient qui disparaît (vanishing gradient) lors de la rétropropagation",
          "Ils nécessitent trop de mémoire",
          "Ils ne peuvent pas traiter de séquences"
        ],
        correctAnswer: 1,
        points: 2,
        explanation: "Le gradient qui disparaît est le problème majeur : lors de la rétropropagation, le gradient devient très petit après quelques pas de temps, empêchant l'apprentissage de dépendances à long terme."
      },
      {
        question: "Combien de pas de temps un RNN classique peut-il généralement retenir des informations ?",
        options: [
          "1-2 pas",
          "5-10 pas",
          "50-100 pas",
          "Plus de 1000 pas"
        ],
        correctAnswer: 1,
        points: 1,
        explanation: "Les RNN classiques ont une mémoire limitée à environ 5-10 pas de temps à cause du problème du gradient qui disparaît."
      },
      {
        question: "Quelle fonction d'activation est généralement utilisée dans les RNN ?",
        options: [
          "ReLU",
          "Sigmoid",
          "Tanh",
          "Linear"
        ],
        correctAnswer: 2,
        points: 1,
        explanation: "Tanh est couramment utilisée car elle produit des valeurs entre -1 et 1, ce qui aide à stabiliser les gradients, bien que cela ne résolve pas complètement le problème du gradient qui disparaît."
      }
    ]
  },
  lstm: {
    topic: "LSTM (Long Short-Term Memory)",
    description: "Testez votre compréhension des réseaux LSTM et de leurs mécanismes",
    questions: [
      {
        question: "Combien de gates (portes) un LSTM utilise-t-il ?",
        options: [
          "1 gate",
          "2 gates",
          "3 gates",
          "4 gates"
        ],
        correctAnswer: 2,
        points: 1,
        explanation: "Un LSTM utilise 3 gates : Forget Gate, Input Gate, et Output Gate. Il y a aussi les Candidate Values, mais ce n'est pas techniquement un gate."
      },
      {
        question: "Quelle est la formule du Forget Gate ?",
        options: [
          "fₜ = tanh(Wf · [hₜ₋₁, xₜ] + bf)",
          "fₜ = σ(Wf · [hₜ₋₁, xₜ] + bf)",
          "fₜ = ReLU(Wf · [hₜ₋₁, xₜ] + bf)",
          "fₜ = Wf · [hₜ₋₁, xₜ] + bf"
        ],
        correctAnswer: 1,
        points: 3,
        explanation: "Le Forget Gate utilise la fonction sigmoïde (σ) qui produit des valeurs entre 0 et 1, permettant de décider combien d'information garder (1) ou oublier (0)."
      },
      {
        question: "Quelle est la formule de mise à jour du Cell State ?",
        options: [
          "Cₜ = Cₜ₋₁ + iₜ",
          "Cₜ = fₜ + iₜ ⊙ C̃ₜ",
          "Cₜ = fₜ ⊙ Cₜ₋₁ + iₜ ⊙ C̃ₜ",
          "Cₜ = tanh(Cₜ₋₁)"
        ],
        correctAnswer: 2,
        points: 3,
        explanation: "Le Cell State combine l'ancien état (filtré par le Forget Gate) avec les nouvelles valeurs candidates (filtrées par l'Input Gate) : Cₜ = fₜ ⊙ Cₜ₋₁ + iₜ ⊙ C̃ₜ"
      },
      {
        question: "Pourquoi le Cell State permet-il de résoudre le problème du gradient qui disparaît ?",
        options: [
          "Il utilise ReLU au lieu de tanh",
          "Il peut rester constant sur de longues périodes, permettant au gradient de circuler librement",
          "Il est plus petit que l'état caché",
          "Il n'utilise pas de fonction d'activation"
        ],
        correctAnswer: 1,
        points: 2,
        explanation: "Le Cell State peut rester constant (si fₜ ≈ 1 et iₜ ≈ 0), permettant au gradient de circuler librement sans être multiplié par des matrices à chaque pas, évitant ainsi le problème du gradient qui disparaît."
      },
      {
        question: "Quelle est la formule du Hidden State (état caché) dans un LSTM ?",
        options: [
          "hₜ = oₜ + tanh(Cₜ)",
          "hₜ = oₜ ⊙ tanh(Cₜ)",
          "hₜ = tanh(oₜ · Cₜ)",
          "hₜ = σ(Cₜ)"
        ],
        correctAnswer: 1,
        points: 3,
        explanation: "Le Hidden State est calculé en filtrant le Cell State normalisé : hₜ = oₜ ⊙ tanh(Cₜ). Le tanh normalise Cₜ entre -1 et 1, et oₜ filtre quelle partie utiliser."
      },
      {
        question: "Combien de pas de temps un LSTM peut-il généralement retenir des informations ?",
        options: [
          "5-10 pas",
          "20-30 pas",
          "100+ pas",
          "Seulement 1 pas"
        ],
        correctAnswer: 2,
        points: 1,
        explanation: "Grâce au Cell State et aux gates, les LSTM peuvent retenir des informations sur 100+ pas de temps, bien mieux que les RNN classiques."
      },
      {
        question: "Quel gate décide quelle nouvelle information stocker dans le Cell State ?",
        options: [
          "Forget Gate",
          "Input Gate",
          "Output Gate",
          "Candidate Gate"
        ],
        correctAnswer: 1,
        points: 2,
        explanation: "L'Input Gate (iₜ) décide quelle nouvelle information stocker. Il filtre les Candidate Values (C̃ₜ) avant de les ajouter au Cell State."
      },
      {
        question: "Que signifie le symbole ⊙ dans les formules LSTM ?",
        options: [
          "Addition",
          "Multiplication élément par élément (Hadamard product)",
          "Division",
          "Puissance"
        ],
        correctAnswer: 1,
        points: 1,
        explanation: "⊙ représente le produit de Hadamard, c'est-à-dire la multiplication élément par élément de deux vecteurs de même dimension."
      }
    ]
  },
  comparison: {
    topic: "RNN vs LSTM",
    description: "Testez votre compréhension des différences entre RNN et LSTM",
    questions: [
      {
        question: "Quelle est la principale différence entre RNN et LSTM ?",
        options: [
          "LSTM est plus rapide",
          "LSTM a un Cell State qui permet de retenir des informations sur de très longues séquences",
          "RNN a plus de gates",
          "LSTM ne peut pas traiter de séquences"
        ],
        correctAnswer: 1,
        points: 2,
        explanation: "La principale différence est le Cell State de LSTM qui peut transporter des informations sur de très longues distances sans être modifié, résolvant ainsi le problème du gradient qui disparaît."
      },
      {
        question: "Dans quel cas utiliseriez-vous un RNN plutôt qu'un LSTM ?",
        options: [
          "Pour des séquences très longues (100+ pas)",
          "Pour des séquences courtes où la simplicité est importante",
          "Pour la traduction automatique",
          "Pour l'analyse de sentiment sur de longs textes"
        ],
        correctAnswer: 1,
        points: 2,
        explanation: "Pour des séquences courtes (5-10 pas), un RNN simple peut suffire et être plus rapide à entraîner. LSTM est préféré pour les séquences longues."
      },
      {
        question: "Quel problème LSTM résout-il que RNN ne résout pas ?",
        options: [
          "La vitesse d'entraînement",
          "Le gradient qui disparaît et la mémoire à long terme",
          "Le nombre de paramètres",
          "La complexité du code"
        ],
        correctAnswer: 1,
        points: 2,
        explanation: "LSTM résout spécifiquement le problème du gradient qui disparaît grâce au Cell State, permettant de retenir des informations sur de très longues séquences."
      }
    ]
  }
}

