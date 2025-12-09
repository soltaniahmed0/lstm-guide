import React, { useState, useEffect, useRef } from 'react'
import './RNNSchemaSlide.css'

function RNNSchemaSlide() {
  // RNN Parameters
  const W_hh = 0.5
  const W_xh = 0.8
  const b_h = 0.1
  const W_hy = 1.2
  const b_y = 0.0

  const [step, setStep] = useState(0)
  const [h_prev, setH_prev] = useState(0.0)
  const [X_t, setX_t] = useState(1.0)

  const schemaWrapperRef = useRef(null)
  const svgRef = useRef(null)

  const steps = ['input', 'mult-h', 'mult-x', 'add', 'tanh', 'output-h', 'mult-y', 'output-y', 'complete']

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
    
    document.querySelectorAll('.state-block, .activation, .operation, .flow-line').forEach(el => {
      el.classList.remove('active')
    })
  }

  function nextStep() {
    if (step >= steps.length) return

    const currentStep = steps[step]
    const details = calculateRNN()

    switch(currentStep) {
      case 'input':
        document.getElementById('input-block-h')?.classList.add('active')
        document.getElementById('input-block-x')?.classList.add('active')
        document.getElementById('weight-block-hh')?.classList.add('active')
        document.getElementById('weight-block-xh')?.classList.add('active')
        break
      case 'mult-h':
        document.getElementById('mult-h')?.classList.add('active')
        showConnection('conn-h-to-mult-h')
        showConnection('conn-weight-hh-to-mult-h')
        break
      case 'mult-x':
        document.getElementById('mult-x')?.classList.add('active')
        showConnection('conn-x-to-mult-x')
        showConnection('conn-weight-xh-to-mult-x')
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
      case 'output-h':
        document.getElementById('output-block-h')?.classList.add('active')
        document.getElementById('weight-block-hy')?.classList.add('active')
        const hTValue = document.getElementById('h-t-value')
        if (hTValue) hTValue.textContent = details.h_t.toFixed(3)
        showConnection('conn-tanh-to-ht')
        break
      case 'mult-y':
        document.getElementById('mult-y')?.classList.add('active')
        showConnection('conn-ht-to-mult-y')
        showConnection('conn-weight-hy-to-mult-y')
        break
      case 'output-y':
        document.getElementById('output-block-y')?.classList.add('active')
        const yTValue = document.getElementById('y-t-value')
        if (yTValue) yTValue.textContent = details.y_t.toFixed(3)
        showConnection('conn-mult-y-to-yt')
        break
      case 'complete':
        showConnection('conn-ht-to-hprev')
        break
    }

    setStep(prev => prev + 1)
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
    line.setAttribute('stroke-width', '6')
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
    path.setAttribute('stroke-width', '6')
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
      drawConnection('conn-weight-hh-to-mult-h', 'weight-block-hh', 'mult-h', '#f59e0b', 'arrowhead-orange')
      drawConnection('conn-x-to-mult-x', 'input-block-x', 'mult-x', '#3b82f6', 'arrowhead')
      drawConnection('conn-weight-xh-to-mult-x', 'weight-block-xh', 'mult-x', '#f59e0b', 'arrowhead-orange')
      drawConnection('conn-mult-h-to-add', 'mult-h', 'add', '#3b82f6', 'arrowhead')
      drawConnection('conn-mult-x-to-add', 'mult-x', 'add', '#3b82f6', 'arrowhead')
      drawConnection('conn-add-to-tanh', 'add', 'tanh', '#a855f7', 'arrowhead-purple')
      drawConnection('conn-tanh-to-ht', 'tanh', 'output-block-h', '#a855f7', 'arrowhead-purple')
      drawConnection('conn-ht-to-mult-y', 'output-block-h', 'mult-y', '#a855f7', 'arrowhead-purple')
      drawConnection('conn-weight-hy-to-mult-y', 'weight-block-hy', 'mult-y', '#f59e0b', 'arrowhead-orange')
      drawConnection('conn-mult-y-to-yt', 'mult-y', 'output-block-y', '#22c55e', 'arrowhead-green')
      drawCurvedConnection('conn-ht-to-hprev', 'output-block-h', 'input-block-h', '#ef4444', 'arrowhead-red', -250)
    }, 300)
  }

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

  useEffect(() => {
    setTimeout(() => {
      initializeConnections()
      reset()
    }, 500)
  }, [])

  const details = calculateRNN()

  return (
    <div className="slide rnn-schema-slide">
      <h1 className="slide-title-main">Architecture RNN — Visualisation Interactive</h1>

      <div className="container">
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
                <marker id="arrowhead-orange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#f59e0b" />
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

            {/* Weight Blocks */}
            <div className="state-block state-block-weight" id="weight-block-hh">
              <div className="state-item weight">
                <div>Wₕₕ</div>
                <div className="value">{W_hh.toFixed(1)}</div>
              </div>
            </div>
            <div className="state-block state-block-weight" id="weight-block-xh">
              <div className="state-item weight">
                <div>Wₓₕ</div>
                <div className="value">{W_xh.toFixed(1)}</div>
              </div>
            </div>

            {/* Weight Multiplications */}
            <div className="operation operation-mult" id="mult-h"></div>
            <div className="operation operation-mult" id="mult-x"></div>

            {/* Addition */}
            <div className="operation operation-add" id="add"></div>

            {/* Activation */}
            <div className="activation" id="tanh"></div>

            {/* Output/Current State Block - hₜ and Wₕᵧ on same line */}
            <div className="state-block state-block-output" id="output-block-h">
              <div className="state-item hidden">
                <div>h<sub>t</sub></div>
                <div className="value" id="h-t-value">{details.h_t.toFixed(3)}</div>
              </div>
            </div>
            <div className="state-block state-block-weight" id="weight-block-hy">
              <div className="state-item weight">
                <div>Wₕᵧ</div>
                <div className="value">{W_hy.toFixed(1)}</div>
              </div>
            </div>

            {/* Output Multiplication - hₜ * Wₕᵧ */}
            <div className="operation operation-mult" id="mult-y"></div>

            {/* Output Yₜ - under multiplication */}
            <div className="state-block state-block-output" id="output-block-y">
              <div className="state-item output">
                <div>Y<sub>t</sub></div>
                <div className="value" id="y-t-value">{details.y_t.toFixed(3)}</div>
              </div>
            </div>

            {/* Formules sous Wₓₕ */}
            <div className="formulas-panel">
              <div className="formula-item">
                <div className="formula-label">hₜ =</div>
                <div className="formula-content">
                  tanh(Wₕₕ · hₜ₋₁ + Wₓₕ · xₜ + bₕ)
                </div>
              </div>
              <div className="formula-item">
                <div className="formula-label">yₜ =</div>
                <div className="formula-content">
                  Wₕᵧ · hₜ + bᵧ
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls">
          <button onClick={reset}>🔄 Reset</button>
          <button onClick={nextStep} disabled={step >= steps.length}>
            Étape Suivante ▶
          </button>
          <p className="controls-hint">
            💡 Utilisez les flèches <strong>→</strong> ou <strong>↓</strong> du clavier pour naviguer
          </p>
        </div>

        <div className="info-panel">
          <h4>📝 Paramètres Utilisés</h4>
          <div className="params-grid">
            <div className="param-item">
              <strong>Wₕₕ</strong> = {W_hh}
            </div>
            <div className="param-item">
              <strong>Wₓₕ</strong> = {W_xh}
            </div>
            <div className="param-item">
              <strong>bₕ</strong> = {b_h}
            </div>
            <div className="param-item">
              <strong>Wₕᵧ</strong> = {W_hy}
            </div>
            <div className="param-item">
              <strong>bᵧ</strong> = {b_y}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RNNSchemaSlide

