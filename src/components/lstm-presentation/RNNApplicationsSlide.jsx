import React, { useState } from 'react'
import './RNNApplicationsSlide.css'

function RNNApplicationsSlide() {
  const [selectedType, setSelectedType] = useState('many-to-many')

  const applicationTypes = {
    'many-to-many': {
      title: 'Many-to-Many',
      description: 'Séquence d\'entrée → Séquence de sortie',
      examples: [
        'Traduction automatique (anglais → français)',
        'Reconnaissance vocale (audio → texte)',
        'Tagging de parties du discours',
        'Analyse de séquences ADN'
      ],
      diagram: ['x₁', 'x₂', 'x₃'],
      output: ['y₁', 'y₂', 'y₃']
    },
    'many-to-one': {
      title: 'Many-to-One',
      description: 'Séquence d\'entrée → Sortie unique',
      examples: [
        'Analyse de sentiment (phrase → positif/négatif)',
        'Classification de texte',
        'Prédiction de séries temporelles (prix final)',
        'Détection d\'anomalies'
      ],
      diagram: ['x₁', 'x₂', 'x₃'],
      output: ['y']
    },
    'one-to-many': {
      title: 'One-to-Many',
      description: 'Entrée unique → Séquence de sortie',
      examples: [
        'Génération de texte (mot initial → phrase)',
        'Génération d\'image à partir d\'un texte',
        'Synthèse vocale (texte → audio)',
        'Génération de musique'
      ],
      diagram: ['x'],
      output: ['y₁', 'y₂', 'y₃']
    }
  }

  const currentType = applicationTypes[selectedType]

  return (
    <div className="slide rnn-applications-slide">
      <h1 className="slide-title-main">Applications des RNN</h1>
      
      <div className="applications-container">
        <div className="type-selector">
          {Object.keys(applicationTypes).map((type) => (
            <button
              key={type}
              className={`type-btn ${selectedType === type ? 'active' : ''}`}
              onClick={() => setSelectedType(type)}
            >
              {applicationTypes[type].title}
            </button>
          ))}
        </div>

        <div className="application-details">
          <div className="diagram-box">
            <h3>Schéma : {currentType.title}</h3>
            <div className="diagram">
              <div className="input-sequence">
                {currentType.diagram.map((item, idx) => (
                  <div key={idx} className="diagram-item input">{item}</div>
                ))}
              </div>
              <div className="arrow">→</div>
              <div className="output-sequence">
                {currentType.output.map((item, idx) => (
                  <div key={idx} className="diagram-item output">{item}</div>
                ))}
              </div>
            </div>
            <p className="diagram-description">{currentType.description}</p>
          </div>

          <div className="examples-box">
            <h3>Exemples Concrets :</h3>
            <ul>
              {currentType.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RNNApplicationsSlide

