import React from 'react'
import './LSTMDefinitionSlide.css'

function LSTMDefinitionSlide() {
  return (
    <div className="slide lstm-definition-slide">
      <h1 className="slide-title-main">LSTM : Définition</h1>
      <div className="definition-container">
        <div className="definition-card main">
          <h2>Qu'est-ce que LSTM ?</h2>
          <p className="definition-text">
            <strong>LSTM (Long Short-Term Memory)</strong> est un type spécial de RNN conçu pour résoudre 
            le problème du <strong>Vanishing Gradient</strong> et permettre au réseau de se souvenir 
            d'informations sur de <strong>très longues séquences</strong>.
          </p>
        </div>

        <div className="key-features">
          <h3>Caractéristiques Clés :</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚪</div>
              <h4>Gates (Portes)</h4>
              <p>Contrôle explicite du flux d'information</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💾</div>
              <h4>Cell State</h4>
              <p>Mémoire à long terme stable</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h4>Hidden State</h4>
              <p>Mémoire à court terme pour les calculs</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📏</div>
              <h4>Séquences Longues</h4>
              <p>Peut traiter des centaines de pas de temps</p>
            </div>
          </div>
        </div>

        <div className="why-lstm">
          <h3>Pourquoi LSTM ?</h3>
          <div className="comparison-box">
            <div className="comparison-item rnn">
              <h4>❌ RNN Classique</h4>
              <ul>
                <li>Oublie rapidement (Vanishing Gradient)</li>
                <li>Limite à ~10 pas de temps</li>
                <li>Ne peut pas apprendre des dépendances longues</li>
              </ul>
            </div>
            <div className="comparison-item lstm">
              <h4>✅ LSTM</h4>
              <ul>
                <li>Mémorise sur de longues séquences</li>
                <li>Peut traiter des centaines de pas</li>
                <li>Apprend des dépendances complexes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="invention">
          <h3>📚 Historique</h3>
          <p>
            Inventé en <strong>1997</strong> par Sepp Hochreiter et Jürgen Schmidhuber, 
            LSTM est devenu l'architecture standard pour les tâches de séquences longues.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LSTMDefinitionSlide

