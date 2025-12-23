import React, { useState } from 'react'
import './RNNProblemsCombinedSlide.css'
import vanishingImage from '../../img/u.png'
import explodingImage from '../../img/8.png'

function RNNProblemsCombinedSlide() {
  const [activeTab, setActiveTab] = useState('vanishing')

  return (
    <div className="slide rnn-problems-combined-slide">
      <h1 className="slide-title-main">Problèmes des RNN : Gradients</h1>

      <div className="tabs-container">
        <button 
          className={`tab-button ${activeTab === 'vanishing' ? 'active' : ''}`}
          onClick={() => setActiveTab('vanishing')}
        >
          Vanishing Gradient
        </button>
        <button 
          className={`tab-button ${activeTab === 'exploding' ? 'active' : ''}`}
          onClick={() => setActiveTab('exploding')}
        >
          Exploding Gradient
        </button>
      </div>

      {activeTab === 'vanishing' && (
        <div className="problem-content">
          <div className="content-wrapper">
            <div className="image-section">
              <img src={vanishingImage} alt="Vanishing Gradient" className="problem-diagram" />
            </div>
            <div className="text-section">
              <div className="problem-description-box">
                <p className="description-text">
                  Pendant l'entraînement, le réseau doit calculer "de combien" il doit ajuster chaque poids pour s'améliorer. Ces ajustements sont appelés "gradients".
                  <br /><br />
                  <strong>Le problème :</strong> quand le réseau est profond (beaucoup de couches), ces gradients deviennent de plus en plus petits en remontant vers les premières couches, jusqu'à devenir pratiquement zéro.
                  <br /><br />
                  <strong>Conséquence :</strong> Si le gradient est presque nul, les poids ne bougent presque pas → le réseau cesse d'apprendre.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'exploding' && (
        <div className="problem-content">
          <div className="content-wrapper">
            <div className="image-section">
              <img src={explodingImage} alt="Exploding Gradient" className="problem-diagram" />
            </div>
            <div className="text-section">
              <div className="problem-description-box">
                <p className="description-text">
                  Pendant l'entraînement, les gradients servent à ajuster les poids du réseau.
                  <br /><br />
                  <strong>Le problème :</strong> dans certains cas, en remontant vers les premières couches, ces gradients grossissent énormément (ils "explosent").
                  <br /><br />
                  <strong>Conséquence :</strong> les mises à jour des poids deviennent trop grandes → l'entraînement devient instable et la loss peut diverger.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RNNProblemsCombinedSlide

