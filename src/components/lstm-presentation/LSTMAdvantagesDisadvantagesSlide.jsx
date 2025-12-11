import React from 'react'
import './LSTMAdvantagesDisadvantagesSlide.css'

function LSTMAdvantagesDisadvantagesSlide() {
  const advantages = [
    {
      icon: '✅',
      title: 'Mémoire à Long Terme',
      description: 'Peut conserver des informations sur de très longues séquences (centaines de pas de temps)'
    },
    {
      icon: '✅',
      title: 'Résout le Vanishing Gradient',
      description: 'Les gates permettent au gradient de circuler sans disparaître, permettant un apprentissage efficace'
    },
    {
      icon: '✅',
      title: 'Contrôle Sélectif',
      description: 'Forget Gate permet d\'oublier sélectivement les informations non pertinentes'
    },
    {
      icon: '✅',
      title: 'Stabilité',
      description: 'Cell State traverse le temps sans dégradation, garantissant une mémoire stable'
    },
    {
      icon: '✅',
      title: 'Polyvalence',
      description: 'Peut être utilisé pour de nombreuses tâches : NLP, séries temporelles, reconnaissance vocale'
    },
    {
      icon: '✅',
      title: 'Performance',
      description: 'Excellent pour les dépendances longues et complexes dans les données séquentielles'
    }
  ]

  const disadvantages = [
    {
      icon: '❌',
      title: 'Complexité Computationnelle',
      description: 'Plus coûteux en calculs que les RNN simples à cause des multiples gates'
    },
    {
      icon: '❌',
      title: 'Traitement Séquentiel',
      description: 'Ne peut pas être parallélisé facilement, traitement pas par pas (contrairement aux Transformers)'
    },
    {
      icon: '❌',
      title: 'Nombre de Paramètres',
      description: 'Beaucoup plus de paramètres à entraîner (4 matrices de poids par gate)'
    },
    {
      icon: '❌',
      title: 'Temps d\'Entraînement',
      description: 'L\'entraînement peut être plus long que pour d\'autres architectures'
    },
    {
      icon: '❌',
      title: 'Interprétabilité Limitée',
      description: 'Difficile de comprendre exactement ce que le réseau a appris et pourquoi'
    },
    {
      icon: '❌',
      title: 'Limite de Longueur',
      description: 'Même si meilleur que RNN, reste limité par rapport aux Transformers pour très longues séquences'
    }
  ]

  return (
    <div className="slide lstm-advantages-disadvantages-slide">
      <h1 className="slide-title-main">Avantages et Désavantages de LSTM</h1>
      
      <div className="comparison-container">
        <div className="advantages-section">
          <h2 className="section-title advantages-title">
            <span className="title-icon">✅</span>
            Avantages
          </h2>
          <div className="items-grid">
            {advantages.map((advantage, index) => (
              <div key={index} className="item-card advantage-card">
                <div className="item-header">
                  <span className="item-icon">{advantage.icon}</span>
                  <h3 className="item-title">{advantage.title}</h3>
                </div>
                <p className="item-description">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="disadvantages-section">
          <h2 className="section-title disadvantages-title">
            <span className="title-icon">❌</span>
            Désavantages
          </h2>
          <div className="items-grid">
            {disadvantages.map((disadvantage, index) => (
              <div key={index} className="item-card disadvantage-card">
                <div className="item-header">
                  <span className="item-icon">{disadvantage.icon}</span>
                  <h3 className="item-title">{disadvantage.title}</h3>
                </div>
                <p className="item-description">{disadvantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LSTMAdvantagesDisadvantagesSlide

