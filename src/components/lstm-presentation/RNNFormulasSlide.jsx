import React from 'react'
import './RNNFormulasSlide.css'

function RNNFormulasSlide() {
  return (
    <div className="slide rnn-formulas-slide">
      <h1 className="slide-title-main">📖 Architecture RNN — Formules et Description</h1>
      <p className="subtitle">Formules mathématiques et explications détaillées de l'architecture RNN</p>
      
      <div className="container">
        <div className="info-panel">
          {/* Section 1: Définition */}
          <section className="section">
            <div className="definition-box info-box">
              <h3 className="section-title">🎯 Qu'est-ce qu'un RNN ?</h3>
              <p>Un RNN (Recurrent Neural Network) est un réseau de neurones qui peut traiter des séquences de données en maintenant une mémoire des états précédents grâce à des connexions récurrentes.</p>
            </div>
          </section>

          {/* Section 2: Formules principales */}
          <section className="section">
            <h3 className="section-title">📐 Formules Principales</h3>
            <div className="formulas-section">
              <div className="formula-card">
                <h4>1️⃣ Hidden State (État Caché) - hₜ</h4>
                <div className="formula-code">
                  <strong>hₜ = tanh(Wₕₕ · hₜ₋₁ + Wₓₕ · xₜ + bₕ)</strong>
                </div>
                <div className="formula-explanation">
                  <p><strong>Explication :</strong> L'état caché combine l'état précédent (hₜ₋₁) multiplié par Wₕₕ avec l'input actuel (xₜ) multiplié par Wₓₕ, plus un biais. La fonction tanh normalise le résultat entre -1 et 1. C'est la <span className="highlight-blue">mémoire</span> du réseau.</p>
                </div>
              </div>

              <div className="formula-card output-formula">
                <h4>2️⃣ Output (Sortie) - yₜ</h4>
                <div className="formula-code">
                  <strong>yₜ = Wₕᵧ · hₜ + bᵧ</strong>
                </div>
                <div className="formula-explanation">
                  <p><strong>Explication :</strong> La sortie est simplement une transformation linéaire de l'état caché. Cette sortie peut être utilisée pour des prédictions ou passer au prochain timestep.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Paramètres */}
          <section className="section">
            <div className="parameters-section">
              <h3 className="section-title">📐 Paramètres du RNN</h3>
              <div className="parameters-grid">
              <div className="parameter-item">
                <strong>Wₕₕ</strong>
                <p>Poids de la connexion récurrente (hₜ₋₁ → hₜ)</p>
                <div className="param-shape">Forme: (R, R)</div>
              </div>
              <div className="parameter-item">
                <strong>Wₓₕ</strong>
                <p>Poids de l'entrée (xₜ → hₜ)</p>
                <div className="param-shape">Forme: (R, M)</div>
              </div>
              <div className="parameter-item">
                <strong>Wₕᵧ</strong>
                <p>Poids de la sortie (hₜ → yₜ)</p>
                <div className="param-shape">Forme: (O, R)</div>
              </div>
              <div className="parameter-item">
                <strong>bₕ</strong>
                <p>Biais pour l'état caché</p>
                <div className="param-shape">Forme: (R,)</div>
              </div>
              <div className="parameter-item">
                <strong>bᵧ</strong>
                <p>Biais pour la sortie</p>
                <div className="param-shape">Forme: (O,)</div>
              </div>
              </div>
            </div>
          </section>

          {/* Section 4: Flux de données */}
          <section className="section">
            <div className="flow-explanation">
              <h3 className="section-title">🔄 Flux de Données</h3>
            <div className="flow-steps">
              <div className="flow-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <strong>Input xₜ</strong>
                  <p>Reçoit les données d'entrée à l'instant t</p>
                </div>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <strong>Combinaison</strong>
                  <p>Wₕₕ·hₜ₋₁ + Wₓₕ·xₜ + bₕ</p>
                </div>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <strong>Activation tanh</strong>
                  <p>Normalise entre -1 et 1</p>
                </div>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <strong>Nouvel état hₜ</strong>
                  <p>Mémoire mise à jour</p>
                </div>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <strong>Output yₜ</strong>
                  <p>Wₕᵧ·hₜ + bᵧ</p>
                </div>
              </div>
            </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default RNNFormulasSlide

