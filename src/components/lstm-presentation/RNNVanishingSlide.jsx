import React from 'react'
import './RNNVanishingSlide.css'
import vanishingImage from '../../img/u.png'

function RNNVanishingSlide() {
  return (
    <div className="slide rnn-vanishing-slide">
      <h1 className="slide-title-main">Le Vanishing Gradient</h1>

      <div className="vanishing-container">
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

        {/* Comment le gradient disparaît */}
        <div className="gradient-multiplication-section">
          <h2>Comment le Gradient Disparaît</h2>
          <p className="explanation-text">
            À chaque étape en arrière, le gradient est multiplié par la dérivée de la fonction d'activation 
            et par la matrice de poids.
          </p>
          <p className="explanation-text">
            Si ces valeurs sont &lt; 1 (ce qui est souvent le cas), regarde ce qui se passe :
          </p>

          <div className="gradient-steps">
            <div className="step-item">
              <span className="step-number">Étape 1</span>
              <div className="step-formula">
                gradient × 0.5 = <span className="result">gradient/2</span>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">Étape 2</span>
              <div className="step-formula">
                gradient/2 × 0.5 = <span className="result">gradient/4</span>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">Étape 3</span>
              <div className="step-formula">
                gradient/4 × 0.5 = <span className="result">gradient/8</span>
              </div>
            </div>
            <div className="step-item highlight">
              <span className="step-number">Après 10 étapes</span>
              <div className="step-formula">
                gradient/(2<sup>10</sup>) ≈ <span className="result">gradient/1024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Exemple numérique */}
        <div className="numeric-example-section">
          <h2>Exemple Numérique</h2>
          <p className="example-intro">Disons que ton gradient initial = <strong>1.0</strong></p>
          <p className="example-intro">Après 10 multiplications par 0.3 :</p>
          <div className="calculation-box">
            <div className="formula-display">
              1.0 × 0.3<sup>10</sup> = <span className="result">0.0000059</span>
            </div>
            <p className="conclusion-text">
              Le gradient est devenu <strong>quasi nul</strong> ! Le réseau ne peut presque plus apprendre 
              la connexion entre <strong>"chat"</strong> et <strong>"était"</strong> car le signal d'erreur 
              a <strong>"disparu"</strong> en remontant.
            </p>
          </div>
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
          <div className="why-content-wrapper">
            <div className="why-text">
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
            <div className="why-image">
              <img src={vanishingImage} alt="Vanishing Gradient" className="vanishing-diagram" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RNNVanishingSlide
