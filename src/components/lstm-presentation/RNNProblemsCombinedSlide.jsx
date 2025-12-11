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
              <div className="problem-description-box exploding">
                <p className="description-text">
                  C'est l'inverse du vanishing gradient. Pendant l'entraînement, au lieu de devenir trop petits, les gradients deviennent énormes, parfois infinis.
                  <br /><br />
                  <strong>Conséquence :</strong> Les poids du réseau font des "sauts" gigantesques et incontrôlés au lieu de s'ajuster progressivement → le réseau devient instable et n'apprend pas correctement.
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

