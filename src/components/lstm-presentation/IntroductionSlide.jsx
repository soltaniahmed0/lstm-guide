import React, { useState } from 'react'
import './IntroductionSlide.css'

function IntroductionSlide() {
  const [currentStep, setCurrentStep] = useState(0)

  const storySteps = [
    {
      title: 'Le Défi',
      content: 'Une entreprise financière veut prédire les prix de l\'or pour optimiser ses investissements et minimiser les risques.',
      icon: '💼',
      color: '#667eea'
    },
    {
      title: 'Le Problème',
      content: 'Les prix de l\'or dépendent de nombreux facteurs historiques : tendances passées, événements économiques, saisons, cycles de marché...',
      icon: '❓',
      color: '#f44336'
    },
    {
      title: 'La Solution Traditionnelle',
      content: 'Les modèles classiques (régression linéaire, ARIMA) ne peuvent pas capturer les dépendances temporelles longues et complexes.',
      icon: '📊',
      color: '#ff9800'
    },
    {
      title: 'La Solution LSTM',
      content: 'LSTM peut apprendre des patterns complexes sur de longues séquences temporelles et prédire avec 96% de précision !',
      icon: '🧠',
      color: '#4caf50'
    },
    {
      title: 'Résultat',
      content: 'L\'entreprise peut maintenant prendre des décisions d\'investissement éclairées basées sur des prédictions précises, réduisant les risques et maximisant les profits.',
      icon: '✅',
      color: '#2196f3'
    }
  ]

  return (
    <div className="slide introduction-slide">
      <h1 className="slide-title-main">Introduction</h1>
      <div className="story-container">
        <div className="story-header">
          <h2>User Story : Prédiction du Prix de l'Or</h2>
        </div>
        <div className="story-steps-container">
          {storySteps.map((step, index) => (
            <div
              key={index}
              className={`story-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              onClick={() => setCurrentStep(index)}
              style={{ '--step-color': step.color }}
            >
              <div className="step-icon">{step.icon}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-text">{step.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="story-navigation">
          <button
            className="nav-btn-small"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            ← Précédent
          </button>
          <div className="step-indicators">
            {storySteps.map((_, index) => (
              <div
                key={index}
                className={`indicator ${index === currentStep ? 'active' : ''}`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
          <button
            className="nav-btn-small"
            onClick={() => setCurrentStep(Math.min(storySteps.length - 1, currentStep + 1))}
            disabled={currentStep === storySteps.length - 1}
          >
            Suivant →
          </button>
        </div>
      </div>
      <div className="key-takeaway">
        <p><strong>💡 Pourquoi LSTM ?</strong> Pour capturer des dépendances longues dans les séquences temporelles et faire des prédictions précises.</p>
      </div>
    </div>
  )
}

export default IntroductionSlide

