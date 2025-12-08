import React from 'react'
import './IntroductionSlide.css'

function IntroductionSlide() {
  const storySteps = [
    {
      title: 'Le Défi',
      content: 'Prédire les prix de l\'or pour optimiser les investissements.',
      icon: '💼',
      color: '#667eea',
      bgColor: 'rgba(102, 126, 234, 0.1)'
    },
    {
      title: 'Le Problème',
      content: 'Dépendances complexes : tendances, événements économiques, cycles...',
      icon: '❓',
      color: '#f44336',
      bgColor: 'rgba(244, 67, 54, 0.1)'
    },
    {
      title: 'Solution Traditionnelle',
      content: 'Modèles classiques limités (régression, ARIMA).',
      icon: '📊',
      color: '#ff9800',
      bgColor: 'rgba(255, 152, 0, 0.1)'
    },
    {
      title: 'Solution LSTM',
      content: 'Apprend les patterns complexes avec 96% de précision !',
      icon: '🧠',
      color: '#4caf50',
      bgColor: 'rgba(76, 175, 80, 0.1)'
    },
    {
      title: 'Résultat',
      content: 'Décisions éclairées, risques réduits, profits maximisés.',
      icon: '✅',
      color: '#2196f3',
      bgColor: 'rgba(33, 150, 243, 0.1)'
    }
  ]

  return (
    <div className="slide introduction-slide">
      <h1 className="slide-title-main">Introduction</h1>
      
      <div className="story-container">
        <div className="story-timeline">
          {storySteps.map((step, index) => (
            <div key={index} className="story-card" style={{ '--step-color': step.color, '--step-bg': step.bgColor }}>
              <div className="story-card-header">
                <div className="story-icon" style={{ backgroundColor: step.bgColor, borderColor: step.color }}>
                  {step.icon}
                </div>
                <div className="story-number">{index + 1}</div>
              </div>
              <div className="story-card-content">
                <h3 className="story-card-title">{step.title}</h3>
                <p className="story-card-text">{step.content}</p>
              </div>
              {index < storySteps.length - 1 && (
                <div className="story-arrow">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IntroductionSlide

