import React, { useState } from 'react'
import './RNNProblemsSlide.css'

function RNNProblemsSlide() {
  const [selectedProblem, setSelectedProblem] = useState('vanishing')

  const problems = {
    vanishing: {
      title: 'Vanishing Gradient (Gradient qui Disparaît)',
      description: 'Les gradients deviennent exponentiellement petits lors de la rétropropagation sur de longues séquences.',
      causes: [
        'Multiplication répétée de valeurs < 1',
        'Fonction d\'activation tanh/sigmoid qui compresse les valeurs',
        'Gradients qui se multiplient à chaque pas de temps'
      ],
      formula: '∂L/∂h_t = ∂L/∂h_T × ∏(i=t to T-1) ∂h_{i+1}/∂h_i',
      explanation: 'Si chaque terme ∂h_{i+1}/∂h_i < 1, le produit devient exponentiellement petit.',
      visualization: {
        steps: ['t=0', 't=1', 't=2', 't=3', 't=4', 't=5'],
        gradients: [1.0, 0.9, 0.81, 0.73, 0.66, 0.59]
      },
      consequences: [
        'Impossible d\'apprendre des dépendances longues (>10 pas)',
        'Les premiers éléments de la séquence sont oubliés',
        'L\'entraînement devient très lent ou impossible'
      ]
    },
    exploding: {
      title: 'Exploding Gradient (Gradient qui Explose)',
      description: 'Les gradients deviennent exponentiellement grands, causant des instabilités numériques.',
      causes: [
        'Multiplication répétée de valeurs > 1',
        'Poids initialisés trop grands',
        'Pas de normalisation des gradients'
      ],
      formula: '∂L/∂h_t = ∂L/∂h_T × ∏(i=t to T-1) ∂h_{i+1}/∂h_i',
      explanation: 'Si chaque terme ∂h_{i+1}/∂h_i > 1, le produit devient exponentiellement grand.',
      visualization: {
        steps: ['t=0', 't=1', 't=2', 't=3', 't=4', 't=5'],
        gradients: [1.0, 1.1, 1.21, 1.33, 1.46, 1.61]
      },
      consequences: [
        'Instabilité numérique (NaN, Inf)',
        'Les poids deviennent trop grands',
        'Impossible de converger vers une solution'
      ]
    }
  }

  const currentProblem = problems[selectedProblem]

  return (
    <div className="slide rnn-problems-slide">
      <h1 className="slide-title-main">Problèmes des RNN</h1>
      
      <div className="problems-container">
        <div className="problem-selector">
          <button
            className={`problem-btn ${selectedProblem === 'vanishing' ? 'active' : ''}`}
            onClick={() => setSelectedProblem('vanishing')}
          >
            Vanishing Gradient
          </button>
          <button
            className={`problem-btn ${selectedProblem === 'exploding' ? 'active' : ''}`}
            onClick={() => setSelectedProblem('exploding')}
          >
            Exploding Gradient
          </button>
        </div>

        <div className="problem-details">
          <div className="problem-header">
            <h2>{currentProblem.title}</h2>
            <p className="problem-description">{currentProblem.description}</p>
          </div>

          <div className="problem-content">
            <div className="causes-section">
              <h3>🔍 Causes Principales :</h3>
              <ul>
                {currentProblem.causes.map((cause, index) => (
                  <li key={index}>{cause}</li>
                ))}
              </ul>
            </div>

            <div className="formula-section">
              <h3>📐 Formule Mathématique :</h3>
              <div className="formula-box">
                <p className="formula">{currentProblem.formula}</p>
                <p className="formula-explanation">{currentProblem.explanation}</p>
              </div>
            </div>

            <div className="visualization-section">
              <h3>📊 Visualisation :</h3>
              <div className="gradient-visualization">
                {currentProblem.visualization.steps.map((step, index) => {
                  const gradient = currentProblem.visualization.gradients[index]
                  const opacity = selectedProblem === 'vanishing' 
                    ? gradient 
                    : Math.min(1, 1 / gradient)
                  return (
                    <div key={index} className="gradient-bar-container">
                      <div className="gradient-bar-label">{step}</div>
                      <div 
                        className={`gradient-bar ${selectedProblem}`}
                        style={{ 
                          height: `${gradient * 50}px`,
                          opacity: opacity
                        }}
                      >
                        <span className="gradient-value">{gradient.toFixed(2)}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="consequences-section">
              <h3>⚠️ Conséquences :</h3>
              <ul>
                {currentProblem.consequences.map((consequence, index) => (
                  <li key={index}>{consequence}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="solution-preview">
          <h3>💡 Solution : LSTM</h3>
          <p>
            Les LSTM résolvent ces problèmes grâce à des <strong>gates</strong> qui contrôlent 
            explicitement le flux d'information et permettent aux gradients de rester stables.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RNNProblemsSlide
