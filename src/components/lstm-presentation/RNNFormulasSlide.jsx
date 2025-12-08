import React from 'react'
import './RNNFormulasSlide.css'
import rnnDiagram from '../../a25d0295-2962-46b7-95d4-eeb7eb3403d8.jpeg'

function RNNFormulasSlide() {
  return (
    <div className="slide rnn-formulas-slide">
      <h1 className="slide-title-main">📖 Architecture RNN — Formules et Description</h1>
      
      <div className="formulas-content-wrapper">
        {/* Image RNN Rolled/Unrolled - Grand format */}
        <div className="rnn-diagram-section">
          <img src={rnnDiagram} alt="RNN Rolled and Unrolled Representation" className="rnn-diagram-image" />
        </div>

        {/* Section 1: Formules principales */}
        <section className="formulas-section">
          <h3 className="section-title">📐 Formules Principales</h3>
          <div className="formulas-cards">
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

        {/* Section 2: Paramètres */}
        <section className="parameters-section">
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
        </section>
      </div>
    </div>
  )
}

export default RNNFormulasSlide

