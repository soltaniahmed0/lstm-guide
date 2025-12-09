import React, { useState, useEffect, useRef } from 'react'
import './RNNArchitectureSlide.css'

function RNNArchitectureSlide() {
  // RNN Parameters
  const W_hh = 0.5
  const W_xh = 0.8
  const b_h = 0.1
  const W_hy = 1.2
  const b_y = 0.0

  const [step, setStep] = useState(0)
  const [h_prev, setH_prev] = useState(0.0)
  const [X_t, setX_t] = useState(1.0)
  const [vectorStep, setVectorStep] = useState(0)
  const [recalcStep, setRecalcStep] = useState(0)
  const [showGradientFlow, setShowGradientFlow] = useState(false)
  const [showGradientProblems, setShowGradientProblems] = useState(false)
  const [showRecalc, setShowRecalc] = useState(false)

  const schemaWrapperRef = useRef(null)
  const svgRef = useRef(null)
  const vectorSvgRef = useRef(null)

  const steps = ['input', 'mult-h', 'mult-x', 'add', 'tanh', 'output', 'complete']

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

  const recalcData = [
    {
      from: 4, to: 3,
      grad_t1: 1.000,
      tanh_prime: 0.5,
      W_hh: 0.5,
      result: 0.250,
      formula: "∂L/∂h₃ = (∂L/∂h₄) · tanh'(z₄) · Wₕₕ"
    },
    {
      from: 3, to: 2,
      grad_t1: 0.250,
      tanh_prime: 0.5,
      W_hh: 0.5,
      result: 0.063,
      formula: "∂L/∂h₂ = (∂L/∂h₃) · tanh'(z₃) · Wₕₕ"
    },
    {
      from: 2, to: 1,
      grad_t1: 0.063,
      tanh_prime: 0.5,
      W_hh: 0.5,
      result: 0.016,
      formula: "∂L/∂h₁ = (∂L/∂h₂) · tanh'(z₂) · Wₕₕ"
    },
    {
      from: 1, to: 0,
      grad_t1: 0.016,
      tanh_prime: 0.5,
      W_hh: 0.5,
      result: 0.004,
      formula: "∂L/∂h₀ = (∂L/∂h₁) · tanh'(z₁) · Wₕₕ"
    }
  ]

  function tanh(x) {
    return Math.tanh(x)
  }

  function calculateRNN() {
    const h_t = tanh(W_hh * h_prev + W_xh * X_t + b_h)
    const y_t = W_hy * h_t + b_y
    return { h_t, y_t }
  }

  function reset() {
    setStep(0)
    setH_prev(0.0)
    setX_t(1.0)
    setShowGradientFlow(false)
    setShowGradientProblems(false)
    setShowRecalc(false)
    setRecalcStep(0)
    
    // Reset visual elements
    document.querySelectorAll('.state-block, .activation, .operation, .flow-line').forEach(el => {
      el.classList.remove('active')
    })
  }

  function resetVectorDemo() {
    setVectorStep(0)
    document.querySelectorAll('.vector-item').forEach(el => {
      el.classList.remove('active')
      el.style.opacity = '0.3'
    })
  }

  function nextStep() {
    if (step >= steps.length) return

    const currentStep = steps[step]
    const details = calculateRNN()

    // Activate elements based on step
    switch(currentStep) {
      case 'input':
        document.getElementById('input-block-h')?.classList.add('active')
        document.getElementById('input-block-x')?.classList.add('active')
        break
      case 'mult-h':
        document.getElementById('mult-h')?.classList.add('active')
        showConnection('conn-h-to-mult-h')
        break
      case 'mult-x':
        document.getElementById('mult-x')?.classList.add('active')
        showConnection('conn-x-to-mult-x')
        break
      case 'add':
        document.getElementById('add')?.classList.add('active')
        showConnection('conn-mult-h-to-add')
        showConnection('conn-mult-x-to-add')
        break
      case 'tanh':
        document.getElementById('tanh')?.classList.add('active')
        showConnection('conn-add-to-tanh')
        break
      case 'output':
        document.getElementById('output-block-h')?.classList.add('active')
        document.getElementById('output-block-y')?.classList.add('active')
        document.getElementById('h-t-value').textContent = details.h_t.toFixed(3)
        document.getElementById('y-t-value').textContent = details.y_t.toFixed(3)
        showConnection('conn-tanh-to-ht')
        showConnection('conn-ht-to-yt')
        break
      case 'complete':
        showConnection('conn-ht-to-hprev')
        break
    }

    setStep(prev => prev + 1)
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

  function showConnection(id) {
    const line = document.getElementById(id)
    if (line) {
      line.classList.add('active')
      line.setAttribute('opacity', '1')
    }
  }

  function getElementCenter(id) {
    const el = document.getElementById(id)
    if (!el) return {x: 0, y: 0}
    const rect = el.getBoundingClientRect()
    const wrapper = schemaWrapperRef.current
    if (!wrapper) return {x: 0, y: 0}
    const wrapperRect = wrapper.getBoundingClientRect()
    return {
      x: rect.left - wrapperRect.left + rect.width / 2,
      y: rect.top - wrapperRect.top + rect.height / 2
    }
  }

  function drawConnection(id, from, to, color = '#3b82f6', marker = 'arrowhead') {
    const svg = svgRef.current
    if (!svg) return

    const existing = document.getElementById(id)
    if (existing) existing.remove()

    const fromPos = getElementCenter(from)
    const toPos = getElementCenter(to)

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line.setAttribute('id', id)
    line.setAttribute('x1', fromPos.x)
    line.setAttribute('y1', fromPos.y)
    line.setAttribute('x2', toPos.x)
    line.setAttribute('y2', toPos.y)
    line.setAttribute('stroke', color)
    line.setAttribute('stroke-width', '5')
    line.setAttribute('stroke-dasharray', '12,6')
    line.setAttribute('class', 'flow-line')
    line.setAttribute('marker-end', `url(#${marker})`)
    line.setAttribute('opacity', '0')

    svg.appendChild(line)
    return line
  }

  function drawCurvedConnection(id, from, to, color = '#3b82f6', marker = 'arrowhead', curvature = 0) {
    const svg = svgRef.current
    if (!svg) return

    const existing = document.getElementById(id)
    if (existing) existing.remove()

    const fromPos = getElementCenter(from)
    const toPos = getElementCenter(to)

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    const midX = (fromPos.x + toPos.x) / 2
    const midY = (fromPos.y + toPos.y) / 2
    const controlY = midY + curvature

    const d = `M ${fromPos.x} ${fromPos.y} Q ${midX} ${controlY} ${toPos.x} ${toPos.y}`

    path.setAttribute('id', id)
    path.setAttribute('d', d)
    path.setAttribute('stroke', color)
    path.setAttribute('stroke-width', '5')
    path.setAttribute('stroke-dasharray', '12,6')
    path.setAttribute('fill', 'none')
    path.setAttribute('class', 'flow-line')
    path.setAttribute('marker-end', `url(#${marker})`)
    path.setAttribute('opacity', '0')

    svg.appendChild(path)
    return path
  }

  function initializeConnections() {
    setTimeout(() => {
      drawConnection('conn-h-to-mult-h', 'input-block-h', 'mult-h', '#a855f7', 'arrowhead-purple')
      drawConnection('conn-x-to-mult-x', 'input-block-x', 'mult-x', '#3b82f6', 'arrowhead')
      drawConnection('conn-mult-h-to-add', 'mult-h', 'add', '#3b82f6', 'arrowhead')
      drawConnection('conn-mult-x-to-add', 'mult-x', 'add', '#3b82f6', 'arrowhead')
      drawConnection('conn-add-to-tanh', 'add', 'tanh', '#a855f7', 'arrowhead-purple')
      drawConnection('conn-tanh-to-ht', 'tanh', 'output-block-h', '#a855f7', 'arrowhead-purple')
      drawConnection('conn-ht-to-yt', 'output-block-h', 'output-block-y', '#22c55e', 'arrowhead-green')
      drawCurvedConnection('conn-ht-to-hprev', 'output-block-h', 'input-block-h', '#ef4444', 'arrowhead-red', -250)
    }, 300)
  }

  function handleShowGradientFlow() {
    setShowGradientFlow(true)
    const gradients = [
      {id: 'grad-4', width: 100, delay: 0, text: '100%'},
      {id: 'grad-3', width: 50, delay: 300, text: '50%'},
      {id: 'grad-2', width: 25, delay: 600, text: '25%'},
      {id: 'grad-1', width: 12.5, delay: 900, text: '12.5%'}
    ]

    gradients.forEach(g => {
      setTimeout(() => {
        const bar = document.getElementById(g.id)
        if (bar) {
          bar.style.width = '0%'
          bar.textContent = ''
          setTimeout(() => {
            bar.style.width = g.width + '%'
            bar.textContent = g.text
          }, 100)
        }
      }, g.delay)
    })
  }

  function handleShowGradientProblems() {
    setShowGradientProblems(true)
    // Animate vanishing gradient
    const vanishingValues = [1.000, 0.250, 0.063, 0.016, 0.004]
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

    // Animate exploding gradient
    const explodingValues = [1.000, 4.000, 16.000, 64.000, 256.000]
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
  }

  function handleStartGradientRecalc() {
    setShowRecalc(true)
    setRecalcStep(0)

    recalcData.forEach((stepData, idx) => {
      setTimeout(() => {
        const stepEl = document.getElementById(`recalc-step-${idx}`)
        const gradT1El = document.getElementById(`grad-t1-${idx}`)
        const calcEl = document.getElementById(`calc-${idx}`)
        const resultEl = document.getElementById(`result-${idx}`)
        const arrowEl = document.getElementById(`recalc-arrow-${idx}`)

        if (stepEl) stepEl.classList.add('active')
        if (gradT1El) {
          setTimeout(() => {
            gradT1El.textContent = stepData.grad_t1.toFixed(3)
            gradT1El.style.transform = 'scale(1.2)'
            gradT1El.style.transition = 'all 0.3s'
            setTimeout(() => gradT1El.style.transform = 'scale(1)', 300)
          }, 300)
        }
        if (calcEl) {
          setTimeout(() => {
            calcEl.textContent = `${stepData.grad_t1.toFixed(3)} × ${stepData.tanh_prime} × ${stepData.W_hh}`
            calcEl.style.opacity = '0'
            calcEl.style.transition = 'opacity 0.5s'
            setTimeout(() => calcEl.style.opacity = '1', 100)
          }, 600)
        }
        if (resultEl) {
          setTimeout(() => {
            resultEl.textContent = stepData.result.toFixed(3)
            resultEl.style.transform = 'scale(1.3)'
            resultEl.style.transition = 'all 0.4s'
            resultEl.style.color = '#dc2626'
            setTimeout(() => {
              resultEl.style.transform = 'scale(1)'
              resultEl.style.color = '#166534'
            }, 400)
            if (arrowEl) arrowEl.classList.add('active')
          }, 900)
        }
      }, idx * 2000)
    })
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        nextStep()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [step])

  // Initialize connections
  useEffect(() => {
    setTimeout(() => {
      initializeConnections()
      reset()
      resetVectorDemo()
    }, 500)
  }, [])

  const details = calculateRNN()

  return (
    <div className="slide rnn-architecture-slide">
      <h1 className="slide-title-main">Architecture RNN — Disparition du Gradient</h1>
      <p className="subtitle">Visualisation de l'architecture RNN et du problème de disparition du gradient</p>

      <div className="container">
        {/* Concepts Fondamentaux Section */}
        <div className="info-panel fundamental-concepts">
          <h3>📚 Concepts Fondamentaux : Gradient, Poids W, et Forme des Données</h3>
          
          {/* Qu'est-ce qu'un Gradient */}
          <div className="concept-box gradient-concept">
            <h4>❓ Question 1 : Qu'est-ce qu'un Gradient ?</h4>
            <div className="concept-content">
              <h5>💡 Explication Simple</h5>
              <p><strong>Imaginez que vous êtes sur une montagne et vous voulez descendre le plus rapidement possible :</strong></p>
              <ul>
                <li>🎯 <strong>Le gradient</strong> vous indique <strong>dans quelle direction</strong> la pente est la plus raide</li>
                <li>📉 Il vous montre <strong>comment changer</strong> vos poids (W) pour réduire l'erreur</li>
                <li>🔢 C'est un <strong>nombre</strong> qui dit "si j'augmente W de 0.1, l'erreur augmente ou diminue de combien ?"</li>
              </ul>
              <div className="formula-box">
                <h6>📐 Définition Mathématique Simple</h6>
                <div className="formula-code">
                  <strong>Gradient = ∂(Erreur) / ∂(Poids)</strong>
                </div>
                <p>En français : "De combien change l'erreur quand je change un petit peu le poids ?"</p>
              </div>
            </div>
          </div>

          {/* Comment Recalculer les Poids W */}
          <div className="concept-box weights-concept">
            <h4>❓ Question 2 : Comment Recalculer les Poids W ?</h4>
            <div className="concept-content">
              <h5>💡 Explication Simple</h5>
              <p><strong>Pour améliorer le réseau, on ajuste les poids W petit à petit :</strong></p>
              <div className="formula-box">
                <h6>🔄 Formule de Mise à Jour</h6>
                <div className="formula-code">
                  <strong>Nouveau W = Ancien W - (Learning Rate × Gradient)</strong><br/>
                  W<sub>nouveau</sub> = W<sub>ancien</sub> - α × (∂L/∂W)
                </div>
              </div>
              <ol>
                <li><strong>Calculer l'erreur</strong> : Comparer la prédiction avec la vraie valeur</li>
                <li><strong>Calculer le gradient</strong> : ∂L/∂W = "comment l'erreur change avec W ?"</li>
                <li><strong>Mettre à jour W</strong> : W = W - (α × gradient) où α = learning rate (ex: 0.01)</li>
                <li><strong>Répéter</strong> : Faire ça pour tous les poids (Wₕₕ, Wₓₕ, Wₕᵧ, etc.)</li>
              </ol>
            </div>
          </div>

          {/* Forme de x */}
          <div className="concept-box vector-concept">
            <h4>❓ Question 3 : Quelle est la Forme de x ? Vecteur ou Nombre ?</h4>
            <div className="concept-content">
              <h5>💡 Réponse Simple</h5>
              <div className="highlight-box">
                <p>x est généralement un <strong>VECTEUR</strong> (un tableau de nombres)</p>
              </div>
              <div className="examples-box">
                <h6>📊 Exemples Concrets</h6>
                <div className="example-item">
                  <p><strong>Exemple 1 : Traitement de texte (Word Embedding)</strong></p>
                  <div className="code-example">x = [0.2, -0.5, 0.8, 0.1, ...]  ← 100 nombres (vecteur de dimension 100)</div>
                  <p className="example-note">Chaque mot est représenté par un vecteur de 100 nombres</p>
                </div>
                <div className="example-item">
                  <p><strong>Exemple 2 : Séries temporelles (une seule valeur par timestep)</strong></p>
                  <div className="code-example">x = [1.5]  ← 1 seul nombre (vecteur de dimension 1)</div>
                  <p className="example-note">Même un seul nombre est traité comme un vecteur de dimension 1 !</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture RNN Section */}
        <div className="info-panel">
          <h3>📖 Architecture RNN — Formules et Description</h3>
          
          <div className="definition-box">
            <h4>🎯 Qu'est-ce qu'un RNN ?</h4>
            <p>Un RNN (Recurrent Neural Network) est un réseau de neurones qui peut traiter des séquences de données en maintenant une mémoire des états précédents grâce à des connexions récurrentes.</p>
          </div>

          <div className="formulas-section">
            <div className="formula-card">
              <h5>1️⃣ Hidden State (État Caché) - hₜ</h5>
              <div className="formula-code">
                <strong>hₜ = tanh(Wₕₕ · hₜ₋₁ + Wₓₕ · xₜ + bₕ)</strong>
              </div>
              <p><strong>Explication :</strong> L'état caché combine l'état précédent (hₜ₋₁) multiplié par Wₕₕ avec l'input actuel (xₜ) multiplié par Wₓₕ, plus un biais. La fonction tanh normalise le résultat entre -1 et 1. C'est la <span className="highlight-blue">mémoire</span> du réseau.</p>
            </div>

            <div className="formula-card output-formula">
              <h5>2️⃣ Output (Sortie) - yₜ</h5>
              <div className="formula-code">
                <strong>yₜ = Wₕᵧ · hₜ + bᵧ</strong>
              </div>
              <p><strong>Explication :</strong> La sortie est simplement une transformation linéaire de l'état caché. Cette sortie peut être utilisée pour des prédictions ou passer au prochain timestep.</p>
            </div>
          </div>
        </div>

        {/* RNN Cell Visualization */}
        <div className="rnn-cell-container" id="rnn-cell">
          <div className="schema-wrapper" ref={schemaWrapperRef} id="schema-wrapper">
            <svg ref={svgRef} id="connections-svg">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
                </marker>
                <marker id="arrowhead-purple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#a855f7" />
                </marker>
                <marker id="arrowhead-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#22c55e" />
                </marker>
                <marker id="arrowhead-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#ef4444" />
                </marker>
              </defs>
            </svg>

            <div className="schema-label">ARCHITECTURE RNN</div>

            {/* Input/Previous State Block */}
            <div className="state-block state-block-input" id="input-block-h">
              <div className="state-item hidden">
                <div>h<sub>t-1</sub></div>
                <div className="value" id="h-prev-value">{h_prev.toFixed(3)}</div>
              </div>
            </div>
            <div className="state-block state-block-input" id="input-block-x">
              <div className="state-item input">
                <div>X<sub>t</sub></div>
                <div className="value" id="x-t-value">{X_t.toFixed(3)}</div>
              </div>
            </div>

            {/* Weight Multiplications */}
            <div className="operation operation-mult" id="mult-h"></div>
            <div className="operation operation-mult" id="mult-x"></div>
            
            {/* Weight Labels */}
            <div className="weight-label" id="weight-hh">Wₕₕ</div>
            <div className="weight-label" id="weight-xh">Wₓₕ</div>

            {/* Addition */}
            <div className="operation operation-add" id="add"></div>

            {/* Activation */}
            <div className="activation" id="tanh"></div>

            {/* Output/Current State Block */}
            <div className="state-block state-block-output" id="output-block-h">
              <div className="state-item hidden">
                <div>h<sub>t</sub></div>
                <div className="value" id="h-t-value">{details.h_t.toFixed(3)}</div>
              </div>
            </div>
            <div className="state-block state-block-output" id="output-block-y">
              <div className="state-item output">
                <div>Y<sub>t</sub></div>
                <div className="value" id="y-t-value">{details.y_t.toFixed(3)}</div>
              </div>
            </div>

            {/* Output Weight Label */}
            <div className="weight-label" id="weight-hy">Wₕᵧ</div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls">
          <button onClick={reset}>🔄 Reset</button>
          <button onClick={nextStep} disabled={step >= steps.length}>
            Étape Suivante ▶
          </button>
          <button onClick={handleShowGradientFlow}>📉 Voir Flux Gradient</button>
          <button onClick={handleShowGradientProblems}>🎬 Voir Vanishing & Exploding</button>
          <p className="controls-hint">
            💡 Utilisez les flèches <strong>→</strong> ou <strong>↓</strong> du clavier pour naviguer
          </p>
        </div>

        {/* Gradient Problems Section */}
        <div className="gradient-problem">
          <h4>⚠️ Les Problèmes : Vanishing Gradient & Exploding Gradient</h4>
          
          <div className="problems-grid">
            <div className="problem-card vanishing">
              <h5>🔻 Le Vanishing Gradient</h5>
              <p>Il se produit lorsque les gradients deviennent très petits pendant la rétro-propagation, presque nuls.</p>
              <p><strong>→</strong> Le réseau n'apprend plus, car les poids ne se mettent presque plus à jour.</p>
            </div>
            
            <div className="problem-card exploding">
              <h5>🚀 L'Exploding Gradient</h5>
              <p>Il se produit lorsque les gradients deviennent très grands pendant la rétro-propagation.</p>
              <p><strong>→</strong> Les mises à jour des poids deviennent instables, le modèle diverge, et la perte explose.</p>
            </div>
          </div>

          {/* Gradient Visual */}
          {showGradientFlow && (
            <div className="gradient-visual">
              <div className="gradient-item">
                <div className="gradient-item-title">Timestep 4 → 3</div>
                <div className="gradient-bar">
                  <div className="gradient-fill" id="grad-4" style={{width: '100%'}}>100%</div>
                </div>
                <div className="gradient-percentage">100%</div>
              </div>
              <div className="gradient-item">
                <div className="gradient-item-title">Timestep 3 → 2</div>
                <div className="gradient-bar">
                  <div className="gradient-fill" id="grad-3" style={{width: '50%'}}>50%</div>
                </div>
                <div className="gradient-percentage">50%</div>
              </div>
              <div className="gradient-item">
                <div className="gradient-item-title">Timestep 2 → 1</div>
                <div className="gradient-bar">
                  <div className="gradient-fill" id="grad-2" style={{width: '25%'}}>25%</div>
                </div>
                <div className="gradient-percentage">25%</div>
              </div>
              <div className="gradient-item">
                <div className="gradient-item-title">Timestep 1 → 0</div>
                <div className="gradient-bar">
                  <div className="gradient-fill" id="grad-1" style={{width: '12.5%'}}>12.5%</div>
                </div>
                <div className="gradient-percentage">12.5%</div>
              </div>
            </div>
          )}

          {/* Gradient Problems Schemas */}
          {showGradientProblems && (
            <div className="gradient-problems-container">
              {/* Vanishing Gradient Schema */}
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
              
              {/* Exploding Gradient Schema */}
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
            </div>
          )}
        </div>

        {/* Vector Visualization Section */}
        <div className="info-panel vector-viz-section">
          <h3>📊 Visualisation avec Vecteurs et Matrices</h3>
          
          <p className="vector-intro">
            Voici le même schéma mais avec x représenté comme un <strong>vecteur</strong> (M=3) et les opérations matricielles explicites
          </p>
          <p className="vector-hint">
            💡 Utilisez les flèches <strong>→</strong> ou <strong>↓</strong> du clavier pour naviguer étape par étape
          </p>

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

        {/* Gradient Recalculation Section */}
        <div className="info-panel recalc-section">
          <h3>🔄 Comment le Gradient est Recalculé ?</h3>
          
          <div className="simple-explanation">
            <h4>💡 Explication Simple</h4>
            <p><strong>Imaginez une chaîne de personnes qui se passent un message :</strong></p>
            <ul>
              <li>👤 <strong>La personne à la fin</strong> (t=4) a une erreur de <strong style={{color:'#dc2626'}}>1.0</strong></li>
              <li>📤 Elle doit <strong>transmettre cette erreur</strong> à la personne précédente (t=3)</li>
              <li>🔀 Mais en transmettant, le message devient <strong>plus petit</strong> car il passe par des multiplications</li>
              <li>📉 À chaque passage, le message se réduit : <strong>1.0 → 0.25 → 0.06 → 0.016 → 0.004</strong></li>
              <li>⚠️ Après 4 passages, le message est si petit (<strong>0.004</strong>) qu'il devient inutile !</li>
            </ul>
          </div>

          <div className="recalc-controls">
            <button onClick={handleStartGradientRecalc} disabled={showRecalc}>
              ▶️ Voir les Calculs Étape par Étape
            </button>
          </div>

          {showRecalc && (
            <div className="recalc-steps-container">
              {recalcData.map((stepData, idx) => (
                <React.Fragment key={idx}>
                  <div className="recalc-step" id={`recalc-step-${idx}`}>
                    <div className="recalc-step-header">
                      Étape {idx + 1} : De t={stepData.from} vers t={stepData.to}
                    </div>
                    <div className="recalc-content">
                      <div className="recalc-value-item gradient-received">
                        <span className="recalc-value-label">📥 Gradient reçu de t={stepData.from}:</span>
                        <span className="recalc-value-number" id={`grad-t1-${idx}`}>-</span>
                      </div>
                      <div className="recalc-multipliers">
                        <div className="recalc-value-item">
                          <span className="recalc-value-label">tanh'(z) =</span>
                          <span className="recalc-value-number">{stepData.tanh_prime}</span>
                        </div>
                        <div className="recalc-value-item">
                          <span className="recalc-value-label">Wₕₕ =</span>
                          <span className="recalc-value-number">{stepData.W_hh}</span>
                        </div>
                      </div>
                      <div className="recalc-calculation">
                        <span className="recalc-value-label">🔢 Calcul :</span>
                        <span className="recalc-value-number" id={`calc-${idx}`}>-</span>
                      </div>
                      <div className="recalc-result">
                        <span className="recalc-value-label">📤 Nouveau gradient à t={stepData.to}:</span>
                        <span className="recalc-value-number" id={`result-${idx}`}>-</span>
                        <div className="loss-percentage">
                          {((1 - stepData.result / stepData.grad_t1) * 100).toFixed(1)}% du gradient a été perdu !
                        </div>
                      </div>
                    </div>
                  </div>
                  {idx < recalcData.length - 1 && (
                    <div className="recalc-arrow" id={`recalc-arrow-${idx}`}>⬇️</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RNNArchitectureSlide
