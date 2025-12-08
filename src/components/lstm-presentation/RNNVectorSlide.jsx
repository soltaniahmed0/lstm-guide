import React, { useState, useEffect, useRef } from 'react'
import './RNNVectorSlide.css'

function RNNVectorSlide() {
  const [vectorStep, setVectorStep] = useState(0)
  const vectorSvgRef = useRef(null)

  const vectorSteps = [
    {id: 'vec-input-h', label: 'Input hₜ₋₁'},
    {id: 'vec-input-x', label: 'Input xₜ'},
    {id: 'vec-matrix-whh', label: 'Matrice Wₕₕ'},
    {id: 'vec-op-mult1', label: 'Multiplication Wₕₕ × hₜ₋₁'},
    {id: 'vec-result-whh', label: 'Résultat Wₕₕ × hₜ₋₁'},
    {id: 'vec-matrix-wxh', label: 'Matrice Wₓₕ'},
    {id: 'vec-op-mult2', label: 'Multiplication Wₓₕ × xₜ'},
    {id: 'vec-result-wxh', label: 'Résultat Wₓₕ × xₜ'},
    {id: 'vec-op-add', label: 'Addition'},
    {id: 'vec-sum', label: 'Somme'},
    {id: 'vec-tanh', label: 'Activation tanh'},
    {id: 'vec-h-t', label: 'Hidden State hₜ'},
    {id: 'vec-matrix-why', label: 'Matrice Wₕᵧ'},
    {id: 'vec-op-mult3', label: 'Multiplication Wₕᵧ × hₜ'},
    {id: 'vec-y-t', label: 'Output yₜ'}
  ]

  function resetVectorDemo() {
    setVectorStep(0)
    document.querySelectorAll('.vector-item').forEach(el => {
      el.classList.remove('active')
      el.style.opacity = '0.3'
    })
  }

  function nextVectorStep() {
    if (vectorStep >= vectorSteps.length) return

    const currentStep = vectorSteps[vectorStep]
    const stepElement = document.getElementById(currentStep.id)

    if (stepElement) {
      stepElement.classList.add('active')
      stepElement.style.opacity = '1'
    }

    setVectorStep(prev => prev + 1)
  }

  useEffect(() => {
    resetVectorDemo()
  }, [])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        nextVectorStep()
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [vectorStep])

  return (
    <div className="slide rnn-vector-slide">
      <h1 className="slide-title-main">📊 RNN avec Vecteurs et Matrices</h1>
      <p className="subtitle">Visualisation avec x représenté comme un vecteur (M=3) et les opérations matricielles explicites</p>

      <div className="container">
        <div className="info-panel">
          <p className="vector-intro">
            Voici le même schéma mais avec x représenté comme un <strong>vecteur</strong> (M=3) et les opérations matricielles explicites
          </p>
          <p className="vector-hint">
            💡 Utilisez les flèches <strong>→</strong> ou <strong>↓</strong> du clavier pour naviguer étape par étape
          </p>
        </div>

        <div className="rnn-cell-container vector-container" id="rnn-vector-cell">
          <div className="schema-wrapper vector-wrapper">
            <svg ref={vectorSvgRef} id="vector-connections-svg">
              <defs>
                <marker id="vector-arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
                </marker>
              </defs>
            </svg>
            
            <div className="vector-label">RNN AVEC VECTEURS (M=3, R=4)</div>
            
            {/* Row 1: h_t-1, W_hh, multiplication, result */}
            <div className="vector-item" id="vec-input-h" style={{opacity: 0.3}}>
              <div className="vector-label-small">h<sub>t-1</sub> (4×1)</div>
              <div className="vector-box-small purple">
                <div className="vector-element-small">0.2</div>
                <div className="vector-element-small">-0.1</div>
                <div className="vector-element-small">0.5</div>
                <div className="vector-element-small">0.3</div>
              </div>
            </div>
            
            <div className="vector-item" id="vec-matrix-whh" style={{opacity: 0.3}}>
              <div className="vector-label-small">Wₕₕ (4×4)</div>
              <div className="matrix-box-small">
                <div className="matrix-row-small">
                  <div className="matrix-cell-small">0.3</div>
                  <div className="matrix-cell-small">-0.1</div>
                  <div className="matrix-cell-small">0.2</div>
                  <div className="matrix-cell-small">0.1</div>
                </div>
                <div className="matrix-row-small">
                  <div className="matrix-cell-small">0.1</div>
                  <div className="matrix-cell-small">0.4</div>
                  <div className="matrix-cell-small">-0.2</div>
                  <div className="matrix-cell-small">0.3</div>
                </div>
                <div className="matrix-row-small">
                  <div className="matrix-cell-small">-0.2</div>
                  <div className="matrix-cell-small">0.1</div>
                  <div className="matrix-cell-small">0.5</div>
                  <div className="matrix-cell-small">-0.1</div>
                </div>
                <div className="matrix-row-small">
                  <div className="matrix-cell-small">0.2</div>
                  <div className="matrix-cell-small">-0.3</div>
                  <div className="matrix-cell-small">0.1</div>
                  <div className="matrix-cell-small">0.4</div>
                </div>
              </div>
            </div>
            
            <div className="vector-item" id="vec-op-mult1" style={{opacity: 0.3}}>
              <div className="vector-op-circle">×</div>
            </div>
            
            <div className="vector-item" id="vec-result-whh" style={{opacity: 0.3}}>
              <div className="vector-label-small">Wₕₕ × h<sub>t-1</sub></div>
              <div className="vector-box-small green">
                <div className="vector-element-small">0.15</div>
                <div className="vector-element-small">0.08</div>
                <div className="vector-element-small">0.25</div>
                <div className="vector-element-small">0.12</div>
              </div>
            </div>
            
            {/* Row 2: x_t, W_xh, multiplication, result */}
            <div className="vector-item" id="vec-input-x" style={{opacity: 0.3}}>
              <div className="vector-label-small">x<sub>t</sub> (3×1)</div>
              <div className="vector-box-small blue">
                <div className="vector-element-small">0.8</div>
                <div className="vector-element-small">0.4</div>
                <div className="vector-element-small">-0.2</div>
              </div>
            </div>
            
            <div className="vector-item" id="vec-matrix-wxh" style={{opacity: 0.3}}>
              <div className="vector-label-small">Wₓₕ (4×3)</div>
              <div className="matrix-box-small">
                <div className="matrix-row-small">
                  <div className="matrix-cell-small">0.5</div>
                  <div className="matrix-cell-small">-0.3</div>
                  <div className="matrix-cell-small">0.2</div>
                </div>
                <div className="matrix-row-small">
                  <div className="matrix-cell-small">-0.1</div>
                  <div className="matrix-cell-small">0.4</div>
                  <div className="matrix-cell-small">0.3</div>
                </div>
                <div className="matrix-row-small">
                  <div className="matrix-cell-small">0.3</div>
                  <div className="matrix-cell-small">-0.2</div>
                  <div className="matrix-cell-small">0.5</div>
                </div>
                <div className="matrix-row-small">
                  <div className="matrix-cell-small">0.2</div>
                  <div className="matrix-cell-small">0.1</div>
                  <div className="matrix-cell-small">-0.1</div>
                </div>
              </div>
            </div>
            
            <div className="vector-item" id="vec-op-mult2" style={{opacity: 0.3}}>
              <div className="vector-op-circle">×</div>
            </div>
            
            <div className="vector-item" id="vec-result-wxh" style={{opacity: 0.3}}>
              <div className="vector-label-small">Wₓₕ × x<sub>t</sub></div>
              <div className="vector-box-small green">
                <div className="vector-element-small">0.32</div>
                <div className="vector-element-small">0.18</div>
                <div className="vector-element-small">0.37</div>
                <div className="vector-element-small">0.19</div>
              </div>
            </div>
            
            {/* Row 3: Addition, Sum, Tanh */}
            <div className="vector-item" id="vec-op-add" style={{opacity: 0.3}}>
              <div className="vector-op-circle">+</div>
            </div>
            
            <div className="vector-item" id="vec-sum" style={{opacity: 0.3}}>
              <div className="vector-label-small">Somme</div>
              <div className="vector-box-small red">
                <div className="vector-element-small">0.47</div>
                <div className="vector-element-small">0.26</div>
                <div className="vector-element-small">0.62</div>
                <div className="vector-element-small">0.31</div>
              </div>
            </div>
            
            <div className="vector-item" id="vec-tanh" style={{opacity: 0.3}}>
              <div className="vector-tanh-box">tanh</div>
            </div>
            
            {/* Row 4: h_t output */}
            <div className="vector-item" id="vec-h-t" style={{opacity: 0.3}}>
              <div className="vector-label-small">h<sub>t</sub> (4×1)</div>
              <div className="vector-box-small purple">
                <div className="vector-element-small">0.44</div>
                <div className="vector-element-small">0.25</div>
                <div className="vector-element-small">0.55</div>
                <div className="vector-element-small">0.30</div>
              </div>
            </div>
            
            {/* Row 5: W_hy and y_t output */}
            <div className="vector-item" id="vec-matrix-why" style={{opacity: 0.3}}>
              <div className="vector-label-small">Wₕᵧ (1×4)</div>
              <div className="matrix-box-horizontal-small">
                <div className="matrix-cell-small">0.8</div>
                <div className="matrix-cell-small">0.5</div>
                <div className="matrix-cell-small">0.9</div>
                <div className="matrix-cell-small">0.6</div>
              </div>
            </div>
            
            <div className="vector-item" id="vec-op-mult3" style={{opacity: 0.3}}>
              <div className="vector-op-circle small">×</div>
            </div>
            
            <div className="vector-item" id="vec-y-t" style={{opacity: 0.3}}>
              <div className="vector-label-small">y<sub>t</sub></div>
              <div className="vector-box-small green">
                <div className="vector-element-small">0.93</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vector Controls */}
        <div className="vector-controls">
          <button onClick={resetVectorDemo}>🔄 Reset</button>
          <button onClick={nextVectorStep} disabled={vectorStep >= vectorSteps.length}>
            {vectorStep >= vectorSteps.length ? '✓ Terminé' : 'Étape Suivante ▶'}
          </button>
        </div>
        
        {/* Dimensions Table */}
        <div className="dimensions-table">
          <h4>📐 Dimensions Explicitées</h4>
          <div className="dimensions-grid">
            <div className="dimension-item">
              <strong>x<sub>t</sub></strong>
              <div className="dimension-code">Forme: (M, 1) = (3, 1)</div>
              <div className="dimension-note">M = dimension de l'input</div>
            </div>
            <div className="dimension-item">
              <strong>h<sub>t</sub></strong>
              <div className="dimension-code">Forme: (R, 1) = (4, 1)</div>
              <div className="dimension-note">R = nombre de neurones cachés</div>
            </div>
            <div className="dimension-item">
              <strong>Wₓₕ</strong>
              <div className="dimension-code">Forme: (R, M) = (4, 3)</div>
              <div className="dimension-note">Matrice 4×3</div>
            </div>
            <div className="dimension-item">
              <strong>Wₕₕ</strong>
              <div className="dimension-code">Forme: (R, R) = (4, 4)</div>
              <div className="dimension-note">Matrice carrée 4×4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RNNVectorSlide

