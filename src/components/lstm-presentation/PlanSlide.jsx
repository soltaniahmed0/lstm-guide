import React from 'react'
import './PlanSlide.css'

function PlanSlide() {
  const planItems = [
    { number: '1', title: 'Introduction', description: 'Exemple réel et user story' },
    { number: '2', title: 'RNN', description: 'Définition, cas d\'usage, architecture, fonctionnement, applications, problèmes' },
    { number: '3', title: 'LSTM', description: 'Définition, architecture, gates (5 neurones)' },
    { number: '4', title: 'Étude de Cas', description: 'Prédiction du prix de l\'or avec LSTM (Kaggle)' },
    { number: '5', title: 'Conclusion', description: 'Perspectives et Transformers vs LSTM' },
    { number: '6', title: 'Webographie', description: 'Références et ressources' }
  ]

  return (
    <div className="slide plan-slide">
      <h1 className="slide-title-main">Plan de Présentation</h1>
      <div className="plan-container">
        {planItems.map((item, index) => (
          <div key={index} className="plan-item" style={{ animationDelay: `${index * 0.15}s` }}>
            <div className="plan-number">{item.number}</div>
            <div className="plan-content">
              <h3 className="plan-title">{item.title}</h3>
              <p className="plan-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlanSlide

