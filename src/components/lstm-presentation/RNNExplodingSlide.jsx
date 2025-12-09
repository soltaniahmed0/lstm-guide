import React, { useState, useEffect } from 'react'
import './RNNExplodingSlide.css'

function RNNExplodingSlide() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(true)
    // Animate exploding gradient
    const timesteps = [4, 3, 2, 1, 0]
    timesteps.forEach((t, idx) => {
      setTimeout(() => {
        const gradEl = document.getElementById(`exp-grad-${t}`)
        const arrowEl = document.getElementById(`exp-arrow-${t}`)
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
          arrowEl.style.boxShadow = '0 0 10px rgba(245, 158, 11, 0.5)'
          setTimeout(() => {
            arrowEl.style.opacity = '0.6'
            arrowEl.style.boxShadow = 'none'
          }, 500)
        }
      }, idx * 400)
    })
  }, [])

  return (
    <div className="slide rnn-exploding-slide">
      <h1 className="slide-title-main">L'Exploding Gradient</h1>

      <div className="container">
        <div className="gradient-schema exploding">
          <h4>🚀 L'Exploding Gradient</h4>
          <div className="icon">📈</div>
          
          <div className="rnn-unrolled">
            {[4, 3, 2, 1, 0].map((t, idx) => (
              <React.Fragment key={t}>
                <div className="rnn-timestep">
                  <div className="timestep-label">t={t}</div>
                  <div className="rnn-node output">
                    <div>y<sub>{t}</sub></div>
                    <div className="gradient-value" id={`exp-grad-${t}`}>
                      {[1.000, 4.000, 16.000, 64.000, 256.000][idx]}
                    </div>
                  </div>
                  <div className="rnn-node hidden">
                    <div>h<sub>{t}</sub></div>
                  </div>
                </div>
                {idx < 4 && <div className="gradient-arrow" id={`exp-arrow-${t}`}></div>}
              </React.Fragment>
            ))}
          </div>
          
          <div className="gradient-explanation">
            <p><strong>🔍 Explication :</strong></p>
            <p>Il se produit lorsque les gradients deviennent très grands pendant la rétro-propagation.</p>
            <p><strong>→</strong> Les mises à jour des poids deviennent instables, le modèle diverge, et la perte explose.</p>
            <p><strong>Cause :</strong> Wₕₕ &gt; 1, donc chaque multiplication augmente exponentiellement le gradient.</p>
          </div>
        </div>

        <div className="info-panel">
          <h4>📈 Exemple Numérique</h4>
          <p>Supposons Wₕₕ = 2.0 et tanh' ≈ 1.0, alors chaque terme ≈ 2.0 :</p>
          <ul className="example-list">
            <li><strong>Timestep 1:</strong> Gradient ≈ 2.0 (200%)</li>
            <li><strong>Timestep 2:</strong> Gradient ≈ 2.0 × 2.0 = 4.0 (400%)</li>
            <li><strong>Timestep 3:</strong> Gradient ≈ 4.0 × 2.0 = 8.0 (800%)</li>
            <li><strong>Timestep 4:</strong> Gradient ≈ 8.0 × 2.0 = 16.0 (<span className="highlight-orange">1600%</span>!)</li>
            <li><strong>Timestep 10:</strong> Gradient ≈ 1024.0 (<span className="highlight-orange">102400%</span>!)</li>
          </ul>
          <p className="warning-text">Après seulement 4 timesteps, le gradient est <strong>16 fois</strong> plus grand que sa valeur initiale !</p>
        </div>

        <div className="info-panel">
          <h4>💡 Conséquences</h4>
          <ul>
            <li><strong>Instabilité numérique :</strong> Les valeurs deviennent NaN (Not a Number) ou Infinity</li>
            <li><strong>Mises à jour trop grandes :</strong> Les poids changent de manière erratique, le modèle diverge</li>
            <li><strong>Perte qui explose :</strong> La fonction de perte augmente exponentiellement</li>
            <li><strong>Impossibilité d'entraîner :</strong> Le modèle ne peut pas converger</li>
          </ul>
        </div>

        <div className="info-panel solution-panel">
          <h4>✅ Solutions</h4>
          <ul>
            <li><strong>Gradient Clipping :</strong> Limiter la valeur maximale du gradient (ex: max_norm = 5.0)</li>
            <li><strong>LSTM/GRU :</strong> Utiliser des architectures qui contrôlent mieux le flux du gradient</li>
            <li><strong>Initialisation des poids :</strong> Initialiser Wₕₕ proche de 1 ou utiliser des techniques d'initialisation adaptées</li>
            <li><strong>Normalisation :</strong> Utiliser Batch Normalization ou Layer Normalization</li>
            <li><strong>Learning Rate adaptatif :</strong> Réduire le learning rate si le gradient devient trop grand</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RNNExplodingSlide

