import React from 'react'
import './RNNCasesSlide.css'

function RNNCasesSlide() {
  const useCases = [
    {
      icon: '💬',
      title: 'Traitement du Langage Naturel (NLP)',
      examples: ['Analyse de sentiment', 'Traduction automatique', 'Génération de texte', 'Chatbots', 'Résumé de texte']
    },
    {
      icon: '📈',
      title: 'Séries Temporelles',
      examples: ['Prédiction de prix', 'Prévision météorologique', 'Analyse de tendances', 'Détection d\'anomalies', 'Forecasting']
    },
    {
      icon: '🎵',
      title: 'Audio et Musique',
      examples: ['Reconnaissance vocale', 'Génération de musique', 'Classification audio', 'Transcription', 'Synthèse vocale']
    },
    {
      icon: '📹',
      title: 'Vidéo',
      examples: ['Reconnaissance d\'activité', 'Prédiction de mouvement', 'Analyse de séquences vidéo', 'Sous-titrage automatique']
    },
    {
      icon: '🏥',
      title: 'Médical',
      examples: ['Analyse d\'ECG', 'Prédiction de maladies', 'Analyse de signaux médicaux', 'Diagnostic assisté']
    },
    {
      icon: '🤖',
      title: 'Robotique',
      examples: ['Contrôle de mouvement', 'Navigation autonome', 'Reconnaissance gestuelle', 'Planification de trajectoire']
    }
  ]

  return (
    <div className="slide rnn-cases-slide">
      <h1 className="slide-title-main">Cas d'Usage des RNN</h1>
      
      <div className="cases-wrapper">
        <div className="cases-grid">
          {useCases.map((useCase, index) => (
            <div key={index} className="case-card">
              <div className="case-icon-wrapper">
                <div className="case-icon">{useCase.icon}</div>
              </div>
              <h3 className="case-title">{useCase.title}</h3>
              <div className="case-examples-wrapper">
                <ul className="case-examples">
                  {useCase.examples.map((example, idx) => (
                    <li key={idx}>
                      <span className="example-bullet">•</span>
                      <span className="example-text">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cases-summary">
          <p>
            <strong>En résumé :</strong> Les RNN sont utilisés partout où les données ont un <strong>ordre temporel</strong> 
            et où le <strong>contexte</strong> est crucial.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RNNCasesSlide

