import React, { useState } from 'react'
import './LSTMTextExamples.css'

function LSTMTextExamples({ presentationMode = false }) {
  const [activeExample, setActiveExample] = useState(0)

  const examples = [
    {
      title: "Exemple 1 : Comprendre une Phrase Complexe",
      scenario: "Analyse de sentiment dans une phrase avec négation",
      text: "Ce film n'est pas mauvais du tout",
      explanation: {
        step1: {
          title: "Tokenisation",
          content: "La phrase est découpée en mots : ['Ce', 'film', \"n'est\", 'pas', 'mauvais', 'du', 'tout']"
        },
        step2: {
          title: "Traitement Mot par Mot",
          content: "L'LSTM traite chaque mot séquentiellement, en gardant le contexte des mots précédents"
        },
        step3: {
          title: "Détection de la Négation",
          content: "Quand LSTM voit 'n'est' et 'pas', le Forget Gate décide de retenir cette information importante dans la Cell State"
        },
        step4: {
          title: "Interprétation du Mot 'mauvais'",
          content: "Quand LSTM arrive à 'mauvais' (mot négatif), l'Input Gate combine cette information avec la négation précédente"
        },
        step5: {
          title: "Résultat Final",
          content: "L'LSTM comprend que 'pas mauvais' = positif, grâce à sa capacité de retenir la négation sur plusieurs mots"
        }
      },
      comparison: {
        rnn: "Un RNN classique pourrait oublier la négation avant d'arriver à 'mauvais', et classer la phrase comme négative",
        lstm: "L'LSTM retient la négation grâce au Forget Gate et au Cell State, permettant une compréhension correcte"
      }
    },
    {
      title: "Exemple 2 : Traduction de Phrase Longue",
      scenario: "Traduire une phrase complexe de l'anglais vers le français",
      text: "The cat that I saw yesterday in the park was very friendly",
      explanation: {
        step1: {
          title: "Encoder - Lecture de la Phrase",
          content: "L'encodeur LSTM lit la phrase anglaise mot par mot, en accumulant le sens dans son Cell State"
        },
        step2: {
          title: "Gestion des Dépendances Longues",
          content: "Le mot 'cat' est lié à 'friendly' même s'ils sont séparés par plusieurs mots. L'LSTM retient 'cat' grâce au Forget Gate"
        },
        step3: {
          title: "État Final de l'Encodeur",
          content: "Après avoir lu toute la phrase, le Cell State contient : sujet='cat', action='was', qualité='friendly', lieu='park', temps='yesterday'"
        },
        step4: {
          title: "Décodeur - Génération",
          content: "Le décodeur LSTM commence avec l'état de l'encodeur et génère 'Le chat' en utilisant le contexte"
        },
        step5: {
          title: "Traduction Complète",
          content: "Le décodeur génère : 'Le chat que j'ai vu hier dans le parc était très amical', en utilisant toutes les informations retenues"
        }
      },
      comparison: {
        rnn: "Un RNN pourrait oublier 'cat' avant d'arriver à 'friendly', produisant une traduction incorrecte",
        lstm: "L'LSTM maintient l'information de 'cat' tout au long grâce au Cell State, permettant une traduction précise"
      }
    },
    {
      title: "Exemple 3 : Prédiction de Série Temporelle",
      scenario: "Prédire le prix d'une action en analysant l'historique",
      text: "Prix historiques : [100, 102, 105, 103, 108, 110, 107, 112, 115]",
      explanation: {
        step1: {
          title: "Séquence d'Entrée",
          content: "L'LSTM reçoit une fenêtre de 5 prix : [100, 102, 105, 103, 108] pour prédire le 6ème"
        },
        step2: {
          title: "Détection de Tendance",
          content: "En analysant la séquence, l'LSTM détecte une tendance haussière générale (100→108) malgré une petite baisse (105→103)"
        },
        step3: {
          title: "Forget Gate - Oublier les Anomalies",
          content: "Le Forget Gate décide de donner moins de poids à la baisse temporaire (103) car elle ne suit pas la tendance générale"
        },
        step4: {
          title: "Input Gate - Retenir la Tendance",
          content: "L'Input Gate stocke fortement l'information de la tendance haussière dans le Cell State"
        },
        step5: {
          title: "Prédiction",
          content: "Basé sur la tendance retenue, l'LSTM prédit 110 (ce qui est correct !), montrant sa capacité à ignorer le bruit et suivre la tendance"
        }
      },
      comparison: {
        rnn: "Un RNN pourrait être trop influencé par la dernière valeur (108) ou la baisse (103), produisant une prédiction moins précise",
        lstm: "L'LSTM utilise le Forget Gate pour filtrer le bruit et se concentrer sur la tendance à long terme"
      }
    },
    {
      title: "Exemple 4 : Génération de Texte Narratif",
      scenario: "Générer la suite d'une histoire",
      text: "Il était une fois un prince qui vivait dans un château magnifique",
      explanation: {
        step1: {
          title: "Contexte Initial",
          content: "L'LSTM traite 'Il était une fois' et comprend qu'il s'agit d'un début de conte de fées"
        },
        step2: {
          title: "Style Narratif",
          content: "Le Cell State stocke le style narratif (conte de fées) et le genre (fantastique)"
        },
        step3: {
          title: "Personnage Principal",
          content: "Quand l'LSTM voit 'prince', il retient cette information importante dans le Cell State pour l'utiliser plus tard"
        },
        step4: {
          title: "Détails du Contexte",
          content: "Les mots 'château' et 'magnifique' enrichissent le contexte, mais l'LSTM garde aussi l'information du prince"
        },
        step5: {
          title: "Génération de la Suite",
          content: "L'LSTM génère : '... qui cherchait une princesse'. Il utilise le contexte (conte de fées) et le personnage (prince) retenus dans le Cell State"
        }
      },
      comparison: {
        rnn: "Un RNN pourrait oublier qu'on parle d'un prince avant de générer la suite, produisant une incohérence",
        lstm: "L'LSTM maintient l'information du prince grâce au Cell State, permettant une génération cohérente"
      }
    },
    {
      title: "Exemple 5 : Analyse de Conversation",
      scenario: "Comprendre le contexte dans une conversation",
      text: "A: 'As-tu vu mon chat ?' B: 'Non, je ne l'ai pas vu. Pourquoi ?' A: 'Il a disparu hier soir'",
      explanation: {
        step1: {
          title: "Première Réplique",
          content: "L'LSTM encode la question sur le chat et retient cette information dans le Cell State"
        },
        step2: {
          title: "Réponse de B",
          content: "L'LSTM comprend que 'l' fait référence au chat de la première réplique, grâce au contexte retenu"
        },
        step3: {
          title: "Question de Suivi",
          content: "Quand B demande 'Pourquoi ?', l'LSTM comprend qu'il s'agit de la raison de la recherche du chat"
        },
        step4: {
          title: "Réponse Finale",
          content: "A répond 'Il a disparu', et l'LSTM comprend que 'Il' = le chat mentionné au début, grâce au contexte maintenu"
        },
        step5: {
          title: "Cohérence Conversationnelle",
          content: "L'LSTM maintient le contexte sur plusieurs tours de conversation, permettant de comprendre les références (chat, il, l')"
        }
      },
      comparison: {
        rnn: "Un RNN pourrait oublier le sujet (chat) après quelques répliques, ne comprenant plus les références",
        lstm: "L'LSTM maintient le contexte conversationnel grâce au Cell State, permettant de suivre les références sur plusieurs tours"
      }
    }
  ]

  return (
    <div className={`lstm-text-examples-container ${presentationMode ? 'presentation-mode' : ''}`}>
      {!presentationMode && (
        <>
          <h2>📝 Exemples Textuels - Comment LSTM Fonctionne</h2>
          <p className="intro-text">
            Exemples concrets montrant comment LSTM traite et comprend différents types de texte, avec explications détaillées étape par étape.
          </p>
        </>
      )}

      <div className="examples-tabs">
        {examples.map((example, index) => (
          <button
            key={index}
            className={`example-tab ${activeExample === index ? 'active' : ''}`}
            onClick={() => setActiveExample(index)}
          >
            Exemple {index + 1}
          </button>
        ))}
      </div>

      {examples[activeExample] && (
        <div className="example-content">
          <div className="example-header">
            <h3>{examples[activeExample].title}</h3>
            <div className="scenario-box">
              <strong>Scénario :</strong> {examples[activeExample].scenario}
            </div>
            <div className="text-box">
              <strong>Texte :</strong> "{examples[activeExample].text}"
            </div>
          </div>

          <div className="explanation-flow">
            <h4>🔄 Processus LSTM Étape par Étape :</h4>
            {Object.entries(examples[activeExample].explanation).map(([key, value], index) => (
              <div key={key} className="flow-step">
                <div className="step-header">
                  <div className="step-number">{index + 1}</div>
                  <h5>{value.title}</h5>
                </div>
                <div className="step-content">
                  <p>{value.content}</p>
                </div>
                {index < Object.keys(examples[activeExample].explanation).length - 1 && (
                  <div className="step-arrow">↓</div>
                )}
              </div>
            ))}
          </div>

          <div className="comparison-box">
            <h4>⚖️ Comparaison RNN vs LSTM :</h4>
            <div className="comparison-grid">
              <div className="comparison-item rnn">
                <div className="comparison-header">
                  <span className="icon">🔄</span>
                  <strong>RNN Classique</strong>
                </div>
                <p>{examples[activeExample].comparison.rnn}</p>
              </div>
              <div className="comparison-item lstm">
                <div className="comparison-header">
                  <span className="icon">✅</span>
                  <strong>LSTM</strong>
                </div>
                <p>{examples[activeExample].comparison.lstm}</p>
              </div>
            </div>
          </div>

          <div className="key-insights">
            <h4>💡 Points Clés de cet Exemple :</h4>
            <ul>
              {activeExample === 0 && (
                <>
                  <li>L'LSTM doit retenir la négation sur plusieurs mots</li>
                  <li>Le Forget Gate garde l'information importante (négation)</li>
                  <li>L'Input Gate combine correctement les informations contradictoires</li>
                </>
              )}
              {activeExample === 1 && (
                <>
                  <li>L'LSTM gère des dépendances à très long terme</li>
                  <li>Le Cell State maintient l'information du sujet sur toute la phrase</li>
                  <li>Le décodeur utilise le contexte complet pour générer la traduction</li>
                </>
              )}
              {activeExample === 2 && (
                <>
                  <li>L'LSTM filtre le bruit (valeurs aberrantes) grâce au Forget Gate</li>
                  <li>Le Cell State retient la tendance à long terme</li>
                  <li>L'LSTM ignore les variations temporaires pour se concentrer sur le pattern global</li>
                </>
              )}
              {activeExample === 3 && (
                <>
                  <li>L'LSTM maintient le style et le genre du texte</li>
                  <li>Le Cell State retient les personnages et le contexte narratif</li>
                  <li>La génération reste cohérente grâce à la mémoire à long terme</li>
                </>
              )}
              {activeExample === 4 && (
                <>
                  <li>L'LSTM maintient le contexte conversationnel sur plusieurs tours</li>
                  <li>Le Cell State retient les références (chat, il, l')</li>
                  <li>L'LSTM comprend les pronoms et références grâce au contexte retenu</li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default LSTMTextExamples

