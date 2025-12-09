import React, { useState, useEffect } from 'react'
import './RNNVanishingSlide.css'

function RNNVanishingSlide() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(true)
    // Animate vanishing gradient
    const timesteps = [4, 3, 2, 1, 0]
    timesteps.forEach((t, idx) => {
      setTimeout(() => {
        const gradEl = document.getElementById(`van-grad-${t}`)
        const arrowEl = document.getElementById(`van-arrow-${t}`)
        if (gradEl) {
          gradEl.style.transform = 'scale(1.3)'
          gradEl.style.transition = 'all 0.3s'
          setTimeout(() => {
            gradEl.style.transform = 'scale(1)'
          }, 300)
        }
        if (arrowEl) {
          arrowEl.style.width = '40px'
          arrowEl.style.opacity = '1'
          arrowEl.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.5)'
          setTimeout(() => {
            arrowEl.style.opacity = '0.6'
            arrowEl.style.boxShadow = 'none'
          }, 500)
        }
      }, idx * 400)
    })
  }, [])

  return (
    <div className="slide rnn-vanishing-slide">
      <h1 className="slide-title-main">Le Vanishing Gradient</h1>

      <div className="container">
        <div className="gradient-schema vanishing">
          <h4>🔻 Le Vanishing Gradient<br/><span>(Gradient qui disparaît ≈ 0.0001)</span></h4>
          <div className="icon">📉</div>
          
          <div className="rnn-unrolled">
            {[4, 3, 2, 1, 0].map((t, idx) => (
              <React.Fragment key={t}>
                <div className="rnn-timestep">
                  <div className="timestep-label">t={t}</div>
                  <div className="rnn-node output">
                    <div>y<sub>{t}</sub></div>
                    <div className="gradient-value" id={`van-grad-${t}`}>
                      {[1.000, 0.250, 0.063, 0.016, 0.004][idx]}
                    </div>
                  </div>
                  <div className="rnn-node hidden">
                    <div>h<sub>{t}</sub></div>
                  </div>
                </div>
                {idx < 4 && <div className="gradient-arrow" id={`van-arrow-${t}`}></div>}
              </React.Fragment>
            ))}
          </div>
          
          <div className="gradient-explanation">
            <p><strong>🔍 Explication :</strong></p>
            <p>Il se produit lorsque les gradients deviennent très petits pendant la rétro-propagation, presque nuls.</p>
            <p><strong>→</strong> Le réseau n'apprend plus, car les poids ne se mettent presque plus à jour.</p>
            <p><strong>Cause :</strong> Wₕₕ &lt; 1 et tanh'(z) ≤ 1, donc chaque multiplication réduit le gradient.</p>
          </div>
        </div>

        <div className="info-panel">
          <h4>📉 Exemple Numérique</h4>
          <p>Supposons Wₕₕ = 0.5 et tanh' ≈ 0.5, alors chaque terme ≈ 0.25 :</p>
          <ul className="example-list">
            <li><strong>Timestep 1:</strong> Gradient ≈ 0.25 (25%)</li>
            <li><strong>Timestep 2:</strong> Gradient ≈ 0.25 × 0.25 = 0.0625 (6.25%)</li>
            <li><strong>Timestep 3:</strong> Gradient ≈ 0.0625 × 0.25 = 0.0156 (1.56%)</li>
            <li><strong>Timestep 4:</strong> Gradient ≈ 0.0156 × 0.25 = 0.0039 (<span className="highlight-red">0.39%</span>!)</li>
            <li><strong>Timestep 10:</strong> Gradient ≈ 0.0000001 (<span className="highlight-red">~0%</span>!)</li>
          </ul>
          <p className="warning-text">Après seulement 4 timesteps, le gradient n'est plus que <strong>0.39%</strong> de sa valeur initiale !</p>
        </div>

        <div className="info-panel">
          <h4>💡 Conséquences</h4>
          <ul>
            <li><strong>Les poids ne s'updatent plus :</strong> Le gradient est trop petit pour modifier les poids efficacement</li>
            <li><strong>Pas de mémoire à long terme :</strong> Le réseau ne peut pas apprendre des dépendances distantes (plus de 5-10 timesteps)</li>
            <li><strong>Performance limitée :</strong> Seules les dépendances à court terme peuvent être capturées</li>
          </ul>
        </div>

        <div className="info-panel solution-panel">
          <h4>✅ Solutions</h4>
          <ul>
            <li><strong>LSTM :</strong> Utilise un Cell State qui permet au gradient de circuler sans disparaître grâce à des portes</li>
            <li><strong>GRU :</strong> Variante simplifiée de LSTM avec moins de paramètres</li>
            <li><strong>Gradient Clipping :</strong> Limite la valeur du gradient pour éviter aussi l'explosion</li>
            <li><strong>Initialisation des poids :</strong> Initialiser Wₕₕ proche de 1 (matrice d'identité) aide à préserver le gradient</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RNNVanishingSlide

