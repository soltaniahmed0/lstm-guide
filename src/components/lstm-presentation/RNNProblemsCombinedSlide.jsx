import React, { useState } from 'react'
import './RNNProblemsCombinedSlide.css'
import vanishingImage from '../../img/u.png'
import explodingImage from '../../img/8.png'
import additionalImage from '../../img/a.png'

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
              <img src={additionalImage} alt="Vanishing Gradient Additional" className="problem-diagram additional-image" />
            </div>
            <div className="text-section">
              {/* Introduction au gradient */}
              <div className="gradient-intro-section">
                <h2>Qu'est-ce qu'un Gradient ?</h2>
                <p className="intro-text">
                  Quand le réseau fait une erreur (par exemple, il prédit <strong>"étaient"</strong> au lieu de <strong>"était"</strong>), 
                  il doit ajuster ses poids pour s'améliorer. Pour cela, il calcule le <strong>gradient</strong> - 
                  une mesure de <em>"combien changer chaque poids"</em>.
                </p>
              </div>

              {/* Le problème */}
              <div className="problem-section">
                <h2>Voici le Problème</h2>
                <div className="sentence-flow">
                  <div className="word-box start">
                    <span className="word">"Le <strong>chat</strong>"</span>
                    <span className="word-label">Sujet (singulier)</span>
                  </div>
                  <div className="arrow">→</div>
                  <div className="word-box middle">
                    <span className="word">"...qui aime..."</span>
                    <span className="word-label">Milieu</span>
                  </div>
                  <div className="arrow">→</div>
                  <div className="word-box end">
                    <span className="word">"...<strong>était</strong> heureux"</span>
                    <span className="word-label">Verbe (doit être singulier)</span>
                  </div>
                </div>
                <p className="problem-statement">
                  <strong>Pour savoir comment ajuster les poids au niveau du mot "était",</strong> le réseau doit 
                  remonter jusqu'au mot <strong>"chat"</strong> (le sujet) pour comprendre qu'il fallait du singulier.
                </p>
              </div>

              {/* Conséquence pratique */}
              <div className="consequence-section">
                <h2>Conséquence Pratique</h2>
                <div className="consequence-box">
                  <p>
                    Le RNN peut apprendre des dépendances <strong>courtes</strong> (2-3 mots), mais échoue sur des 
                    dépendances <strong>longues</strong> (10+ mots) car le gradient devient trop faible pour modifier 
                    significativement les poids.
                  </p>
                </div>
              </div>

              {/* Pourquoi cela arrive ? */}
              <div className="why-section">
                <h2>Pourquoi cela arrive ?</h2>
                <p className="why-intro">
                  Pendant la rétropropagation à travers le temps (BPTT), le gradient doit être multiplié par la dérivée 
                  de la fonction d'activation à chaque timestep. Si Wₕₕ &lt; 1 et tanh'(z) ≤ 1, chaque multiplication réduit le gradient :
                </p>
                <div className="formula-box">
                  <div className="main-formula">
                    ∂L/∂h₀ = (∂L/∂hₜ) × (∂hₜ/∂hₜ₋₁) × ... × (∂h₁/∂h₀)
                  </div>
                  <p className="formula-explanation">
                    Chaque terme (∂hₜ/∂hₜ₋₁) = tanh'(z) × Wₕₕ où tanh'(z) ≤ 1. 
                    Si Wₕₕ &lt; 1, le produit devient <strong>exponentiellement petit</strong> après plusieurs timesteps.
                  </p>
                </div>
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
              <img src={additionalImage} alt="Exploding Gradient Additional" className="problem-diagram additional-image" />
            </div>
            <div className="text-section">
              {/* Le problème */}
              <div className="problem-section exploding">
                <h2>Voici le Problème</h2>
                <p className="problem-statement">
                  Contrairement au <strong>Vanishing Gradient</strong>, ici le gradient devient <strong>exponentiellement grand</strong> 
                  au lieu de disparaître. Cela se produit quand Wₕₕ &gt; 1.
                </p>
              </div>

              {/* Conséquence pratique */}
              <div className="consequence-section exploding">
                <h2>Conséquence Pratique</h2>
                <div className="consequence-box">
                  <p>
                    Le réseau devient <strong>instable</strong> : les valeurs deviennent NaN (Not a Number) ou Infinity, 
                    les poids changent de manière erratique, et la fonction de perte <strong>explose</strong> au lieu de diminuer.
                  </p>
                </div>
              </div>

              {/* Pourquoi cela arrive ? */}
              <div className="why-section">
                <h2>Pourquoi cela arrive ?</h2>
                <p className="why-intro">
                  Pendant la rétropropagation à travers le temps (BPTT), le gradient doit être multiplié par la dérivée 
                  de la fonction d'activation à chaque timestep. Si Wₕₕ &gt; 1, chaque multiplication augmente le gradient :
                </p>
                <div className="formula-box">
                  <div className="main-formula">
                    ∂L/∂h₀ = (∂L/∂hₜ) × (∂hₜ/∂hₜ₋₁) × ... × (∂h₁/∂h₀)
                  </div>
                  <p className="formula-explanation">
                    Chaque terme (∂hₜ/∂hₜ₋₁) = tanh'(z) × Wₕₕ. 
                    Si Wₕₕ &gt; 1, le produit devient <strong>exponentiellement grand</strong> après plusieurs timesteps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RNNProblemsCombinedSlide

