import React, { useState, useEffect, useRef, useCallback } from 'react'
import './LSTMArchitectureSlide.css'

function LSTMArchitectureSlide() {
  const [step, setStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const stepRef = useRef(0)
  const valuesRef = useRef({
    C_prev: 0.0,
    h_prev: 0.0,
    X_t: 1.0,
    f_t: null,
    i_t: null,
    c_hat: null,
    C_t: null,
    o_t: null,
    h_t: null
  })

  // LSTM Parameters
  const W_f = 0.5, U_f = 0.8, b_f = 0.1
  const W_i = 0.5, U_i = 0.8, b_i = 0.1
  const W_c = 0.5, U_c = 0.8, b_c = 0.0
  const W_o = 0.5, U_o = 0.8, b_o = 0.1

  const [values, setValues] = useState(valuesRef.current)
  
  useEffect(() => {
    valuesRef.current = values
  }, [values])

  const steps = [
    'input',
    'forget-sigmoid', 'forget-gate', 'forget-mult',
    'input-sigmoid', 'input-gate', 'candidate-tanh', 'candidate-gate', 'candidate-mult',
    'add-C', 'output-tanh', 'output-sigmoid', 'output-gate', 'output-mult', 'complete'
  ]

  function sigmoid(x) { return 1 / (1 + Math.exp(-x)) }
  function tanh(x) { return Math.tanh(x) }

  const calculateLSTM = useCallback(() => {
    const v = valuesRef.current
    const z_f = W_f * v.h_prev + U_f * v.X_t + b_f
    const f_t = sigmoid(z_f)

    const z_i = W_i * v.h_prev + U_i * v.X_t + b_i
    const i_t = sigmoid(z_i)

    const z_c = W_c * v.h_prev + U_c * v.X_t + b_c
    const c_hat = tanh(z_c)

    const C_t = f_t * v.C_prev + i_t * c_hat

    const z_o = W_o * v.h_prev + U_o * v.X_t + b_o
    const o_t = sigmoid(z_o)

    const h_t = o_t * tanh(C_t)

    return { f_t, i_t, c_hat, C_t, o_t, h_t }
  }, [])

  function getElementCenter(id) {
    const el = document.getElementById(id)
    if (!el) return { x: 0, y: 0 }
    const rect = el.getBoundingClientRect()
    const container = containerRef.current
    if (!container) return { x: 0, y: 0 }
    const containerRect = container.getBoundingClientRect()
    return {
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top + rect.height / 2
    }
  }

  function drawConnection(id, from, to, color = '#3b82f6', marker = 'arrowhead') {
    const svg = svgRef.current
    if (!svg) return null

    const fromPos = getElementCenter(from)
    const toPos = getElementCenter(to)

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line.setAttribute('id', id)
    line.setAttribute('x1', fromPos.x)
    line.setAttribute('y1', fromPos.y)
    line.setAttribute('x2', toPos.x)
    line.setAttribute('y2', toPos.y)
    line.setAttribute('stroke', color)
    line.setAttribute('stroke-width', '4')
    line.setAttribute('stroke-dasharray', '10,5')
    line.setAttribute('class', 'flow-line')
    line.setAttribute('data-from', from)
    line.setAttribute('data-to', to)
    if (marker && marker !== '') {
      line.setAttribute('marker-end', `url(#${marker})`)
    }
    line.setAttribute('opacity', '0')

    svg.appendChild(line)
    return line
  }

  function drawCurvedConnection(id, from, to, color = '#3b82f6', marker = 'arrowhead', curvature = 0) {
    const svg = svgRef.current
    if (!svg) return null

    const fromPos = getElementCenter(from)
    const toPos = getElementCenter(to)

    const midX = (fromPos.x + toPos.x) / 2
    const midY = (fromPos.y + toPos.y) / 2
    const controlY = midY + curvature

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    const d = `M ${fromPos.x} ${fromPos.y} Q ${midX} ${controlY} ${toPos.x} ${toPos.y}`

    path.setAttribute('id', id)
    path.setAttribute('d', d)
    path.setAttribute('stroke', color)
    path.setAttribute('stroke-width', '4')
    path.setAttribute('stroke-dasharray', '10,5')
    path.setAttribute('fill', 'none')
    path.setAttribute('class', 'flow-line')
    path.setAttribute('data-from', from)
    path.setAttribute('data-to', to)
    if (marker && marker !== '') {
      path.setAttribute('marker-end', `url(#${marker})`)
    }
    path.setAttribute('opacity', '0')

    svg.appendChild(path)
    return path
  }

  function showConnection(id) {
    const line = document.getElementById(id)
    if (line) {
      line.classList.add('active')
      line.setAttribute('opacity', '1')
    }
  }

  function hideConnection(id) {
    const line = document.getElementById(id)
    if (line) {
      line.classList.remove('active')
      line.setAttribute('opacity', '0')
    }
  }

  function showWeight(weightId) {
    const weight = document.getElementById(weightId)
    if (weight) {
      weight.style.opacity = '1'
      weight.classList.add('active')
    }
  }

  function hideWeight(weightId) {
    const weight = document.getElementById(weightId)
    if (weight) {
      weight.style.opacity = '0'
      weight.classList.remove('active')
    }
  }

  function clearConnections() {
    const svg = svgRef.current
    if (!svg) return
    const lines = svg.querySelectorAll('.flow-line')
    lines.forEach(line => line.remove())
  }

  function positionWeightOnConnection(connectionId, weightElementId, offset = 0.5, offsetX = 0, offsetY = 0) {
    const path = document.getElementById(connectionId)
    if (!path) return

    let fromPos, toPos

    // Try to get from data attributes first (most reliable)
    const fromId = path.getAttribute('data-from')
    const toId = path.getAttribute('data-to')
    
    if (fromId && toId) {
      fromPos = getElementCenter(fromId)
      toPos = getElementCenter(toId)
    } else if (path.getAttribute('x1') && path.getAttribute('x2')) {
      // It's a line - use x1, y1, x2, y2
      fromPos = {
        x: parseFloat(path.getAttribute('x1')),
        y: parseFloat(path.getAttribute('y1'))
      }
      toPos = {
        x: parseFloat(path.getAttribute('x2')),
        y: parseFloat(path.getAttribute('y2'))
      }
    } else if (path.getAttribute('d')) {
      // It's a curved path - extract start and end points from the path
      const d = path.getAttribute('d')
      const match = d.match(/M\s+(\d+\.?\d*)\s+(\d+\.?\d*).*?(\d+\.?\d*)\s+(\d+\.?\d*)\s*$/)
      if (match) {
        fromPos = { x: parseFloat(match[1]), y: parseFloat(match[2]) }
        toPos = { x: parseFloat(match[3]), y: parseFloat(match[4]) }
      } else {
        return // Can't determine positions
      }
    } else {
      return // Unknown connection type
    }

    // Calculate position along the connection
    const midX = fromPos.x + (toPos.x - fromPos.x) * offset
    const midY = fromPos.y + (toPos.y - fromPos.y) * offset

    const weightEl = document.getElementById(weightElementId)
    if (weightEl) {
      weightEl.style.left = (midX + offsetX) + 'px'
      weightEl.style.top = (midY + offsetY) + 'px'
    }
  }

  function initializeConnections() {
    clearConnections()

    setTimeout(() => {
      // h_t-1 and X_t to gates
      drawCurvedConnection('conn-h-to-forget', 'h-prev', 'sigmoid-f', '#f59e0b', 'arrowhead-green', -50)
      drawCurvedConnection('conn-x-to-forget', 'X-t', 'sigmoid-f', '#3b82f6', '', 30)
      drawCurvedConnection('conn-h-to-input', 'h-prev', 'sigmoid-i', '#f59e0b', 'arrowhead-green', 0)
      drawCurvedConnection('conn-x-to-input', 'X-t', 'sigmoid-i', '#3b82f6', '', 30)
      drawCurvedConnection('conn-h-to-candidate', 'h-prev', 'tanh-c', '#f59e0b', 'arrowhead-green', 50)
      drawCurvedConnection('conn-x-to-candidate', 'X-t', 'tanh-c', '#3b82f6', '', 30)
      drawCurvedConnection('conn-h-to-output', 'h-prev', 'sigmoid-o', '#f59e0b', 'arrowhead-green', 100)
      drawCurvedConnection('conn-x-to-output', 'X-t', 'sigmoid-o', '#3b82f6', '', 100)

      // Sigmoid/Tanh to gates
      drawConnection('conn-sigmoid-f-to-gate', 'sigmoid-f', 'gate-f', '#4ade80', 'arrowhead-green')
      drawConnection('conn-sigmoid-i-to-gate', 'sigmoid-i', 'gate-i', '#4ade80', 'arrowhead-green')
      drawConnection('conn-sigmoid-o-to-gate', 'sigmoid-o', 'gate-o', '#4ade80', 'arrowhead-green')
      drawConnection('conn-tanh-c-to-gate', 'tanh-c', 'gate-c', '#a855f7', 'arrowhead-purple')

      // Forget gate flow
      drawCurvedConnection('conn-gate-f-to-mult', 'gate-f', 'mult-f', '#ea580c', 'arrowhead-orange', -100)
      drawConnection('conn-Cprev-to-mult-f', 'C-prev', 'mult-f', '#ea580c', 'arrowhead-orange')

      // Input gate flow
      drawCurvedConnection('conn-gate-i-to-mult-i', 'gate-i', 'mult-i', '#ea580c', 'arrowhead-orange', -80)
      drawCurvedConnection('conn-gate-c-to-mult-i', 'gate-c', 'mult-i', '#ea580c', 'arrowhead-orange', -80)

      // Add operation
      drawConnection('conn-mult-f-to-add', 'mult-f', 'add-C', '#ea580c', 'arrowhead-orange')
      drawCurvedConnection('conn-mult-i-to-add', 'mult-i', 'add-C', '#ea580c', 'arrowhead-orange', 100)

      // Output flow
      drawConnection('conn-add-to-Ct', 'add-C', 'C-t', '#ea580c', 'arrowhead-orange')
      drawConnection('conn-Ct-to-tanh', 'C-t', 'tanh-C', '#ea580c', 'arrowhead-orange')
      drawCurvedConnection('conn-tanh-C-to-mult-o', 'tanh-C', 'mult-o', '#a855f7', 'arrowhead-purple', 70)
      drawCurvedConnection('conn-gate-o-to-mult-o', 'gate-o', 'mult-o', '#ea580c', 'arrowhead-orange', 100)
      drawConnection('conn-mult-o-to-ht', 'mult-o', 'h-t', '#f59e0b', 'arrowhead-green')

      // Position weights
      setTimeout(() => {
        positionWeightOnConnection('conn-h-to-forget', 'weight-W-f', 0.4, -30, 0)
        positionWeightOnConnection('conn-x-to-forget', 'weight-U-f', 0.4, 30, 0)
        positionWeightOnConnection('conn-h-to-input', 'weight-W-i', 0.4, -30, 0)
        positionWeightOnConnection('conn-x-to-input', 'weight-U-i', 0.4, 30, 0)
        positionWeightOnConnection('conn-h-to-candidate', 'weight-W-c', 0.4, -30, 0)
        positionWeightOnConnection('conn-x-to-candidate', 'weight-U-c', 0.4, 30, 0)
        positionWeightOnConnection('conn-h-to-output', 'weight-W-o', 0.4, -30, 0)
        positionWeightOnConnection('conn-x-to-output', 'weight-U-o', 0.4, 30, 0)
      }, 100)
    }, 200)
  }

  const reset = useCallback(() => {
    stepRef.current = 0
    setStep(0)
    const resetValues = {
      C_prev: 0.0,
      h_prev: 0.0,
      X_t: 1.0,
      f_t: null,
      i_t: null,
      c_hat: null,
      C_t: null,
      o_t: null,
      h_t: null
    }
    valuesRef.current = resetValues
    setValues(resetValues)

    document.querySelectorAll('.node, .gate-box, .activation, .operation, .candidate-gate').forEach(el => {
      el.classList.remove('active')
    })

    document.querySelectorAll('.weight-label').forEach(weight => {
      weight.style.opacity = '0'
    })

    clearConnections()
    initializeConnections()
  }, [])

  const nextStep = useCallback(() => {
    const currentStepIndex = stepRef.current
    if (currentStepIndex >= steps.length) return

    const details = calculateLSTM()
    const currentStep = steps[currentStepIndex]

    // Always show inputs
    document.getElementById('C-prev')?.classList.add('active')
    document.getElementById('h-prev')?.classList.add('active')
    document.getElementById('X-t')?.classList.add('active')

    switch (currentStep) {
      case 'forget-sigmoid':
        document.getElementById('sigmoid-f')?.classList.add('active')
        showConnection('conn-h-to-forget')
        showConnection('conn-x-to-forget')
        showWeight('weight-W-f')
        showWeight('weight-U-f')
        break
      case 'forget-gate':
        document.getElementById('gate-f')?.classList.add('active')
        setValues(prev => ({ ...prev, f_t: details.f_t }))
        showConnection('conn-sigmoid-f-to-gate')
        break
      case 'forget-mult':
        document.getElementById('mult-f')?.classList.add('active')
        showConnection('conn-gate-f-to-mult')
        showConnection('conn-Cprev-to-mult-f')
        break
      case 'input-sigmoid':
        document.getElementById('sigmoid-i')?.classList.add('active')
        showConnection('conn-h-to-input')
        showConnection('conn-x-to-input')
        showWeight('weight-W-i')
        showWeight('weight-U-i')
        break
      case 'input-gate':
        document.getElementById('gate-i')?.classList.add('active')
        setValues(prev => ({ ...prev, i_t: details.i_t }))
        showConnection('conn-sigmoid-i-to-gate')
        break
      case 'candidate-tanh':
        document.getElementById('tanh-c')?.classList.add('active')
        showConnection('conn-h-to-candidate')
        showConnection('conn-x-to-candidate')
        showWeight('weight-W-c')
        showWeight('weight-U-c')
        break
      case 'candidate-gate':
        document.getElementById('gate-c')?.classList.add('active')
        setValues(prev => ({ ...prev, c_hat: details.c_hat }))
        showConnection('conn-tanh-c-to-gate')
        break
      case 'candidate-mult':
        document.getElementById('mult-i')?.classList.add('active')
        showConnection('conn-gate-i-to-mult-i')
        showConnection('conn-gate-c-to-mult-i')
        break
      case 'add-C':
        document.getElementById('add-C')?.classList.add('active')
        showConnection('conn-mult-f-to-add')
        showConnection('conn-mult-i-to-add')
        break
      case 'output-tanh':
        document.getElementById('tanh-C')?.classList.add('active')
        document.getElementById('C-t')?.classList.add('active')
        setValues(prev => ({ ...prev, C_t: details.C_t }))
        showConnection('conn-add-to-Ct')
        showConnection('conn-Ct-to-tanh')
        break
      case 'output-sigmoid':
        document.getElementById('sigmoid-o')?.classList.add('active')
        showConnection('conn-h-to-output')
        showConnection('conn-x-to-output')
        showWeight('weight-W-o')
        showWeight('weight-U-o')
        break
      case 'output-gate':
        document.getElementById('gate-o')?.classList.add('active')
        setValues(prev => ({ ...prev, o_t: details.o_t }))
        showConnection('conn-sigmoid-o-to-gate')
        break
      case 'output-mult':
        document.getElementById('mult-o')?.classList.add('active')
        showConnection('conn-tanh-C-to-mult-o')
        showConnection('conn-gate-o-to-mult-o')
        showConnection('conn-mult-o-to-ht')
        break
      case 'complete':
        document.getElementById('h-t')?.classList.add('active')
        setValues(prev => ({ ...prev, h_t: details.h_t }))
        showConnection('conn-mult-o-to-ht')
        break
    }

    stepRef.current = currentStepIndex + 1
    setStep(stepRef.current)
  }, [calculateLSTM])

  const animateAll = () => {
    reset()
    let delay = 0
    steps.forEach((s, idx) => {
      setTimeout(() => {
        setStep(idx)
        // Call nextStep after state update
        setTimeout(() => {
          const details = calculateLSTM()
          const currentStep = steps[idx]
          
          // Apply the step logic
          document.getElementById('C-prev')?.classList.add('active')
          document.getElementById('h-prev')?.classList.add('active')
          document.getElementById('X-t')?.classList.add('active')

          switch (currentStep) {
            case 'forget-sigmoid':
              document.getElementById('sigmoid-f')?.classList.add('active')
              showConnection('conn-h-to-forget')
              showConnection('conn-x-to-forget')
              showWeight('weight-W-f')
              showWeight('weight-U-f')
              break
            case 'forget-gate':
              document.getElementById('gate-f')?.classList.add('active')
              setValues(prev => ({ ...prev, f_t: details.f_t }))
              showConnection('conn-sigmoid-f-to-gate')
              break
            case 'forget-mult':
              document.getElementById('mult-f')?.classList.add('active')
              document.getElementById('cell-path')?.classList.add('active')
              showConnection('conn-gate-f-to-mult')
              showConnection('conn-Cprev-to-mult-f')
              break
            case 'input-sigmoid':
              document.getElementById('sigmoid-i')?.classList.add('active')
              showConnection('conn-h-to-input')
              showConnection('conn-x-to-input')
              showWeight('weight-W-i')
              showWeight('weight-U-i')
              break
            case 'input-gate':
              document.getElementById('gate-i')?.classList.add('active')
              setValues(prev => ({ ...prev, i_t: details.i_t }))
              showConnection('conn-sigmoid-i-to-gate')
              break
            case 'candidate-tanh':
              document.getElementById('tanh-c')?.classList.add('active')
              showConnection('conn-h-to-candidate')
              showConnection('conn-x-to-candidate')
              showWeight('weight-W-c')
              showWeight('weight-U-c')
              break
            case 'candidate-gate':
              document.getElementById('gate-c')?.classList.add('active')
              setValues(prev => ({ ...prev, c_hat: details.c_hat }))
              showConnection('conn-tanh-c-to-gate')
              break
            case 'candidate-mult':
              document.getElementById('mult-i')?.classList.add('active')
              showConnection('conn-gate-i-to-mult-i')
              showConnection('conn-gate-c-to-mult-i')
              break
            case 'add-C':
              document.getElementById('add-C')?.classList.add('active')
              showConnection('conn-mult-f-to-add')
              showConnection('conn-mult-i-to-add')
              break
            case 'output-tanh':
              document.getElementById('tanh-C')?.classList.add('active')
              document.getElementById('C-t')?.classList.add('active')
              setValues(prev => ({ ...prev, C_t: details.C_t }))
              showConnection('conn-add-to-Ct')
              showConnection('conn-Ct-to-tanh')
              break
            case 'output-sigmoid':
              document.getElementById('sigmoid-o')?.classList.add('active')
              showConnection('conn-h-to-output')
              showConnection('conn-x-to-output')
              showWeight('weight-W-o')
              showWeight('weight-U-o')
              break
            case 'output-gate':
              document.getElementById('gate-o')?.classList.add('active')
              setValues(prev => ({ ...prev, o_t: details.o_t }))
              showConnection('conn-sigmoid-o-to-gate')
              break
            case 'output-mult':
              document.getElementById('mult-o')?.classList.add('active')
              showConnection('conn-tanh-C-to-mult-o')
              showConnection('conn-gate-o-to-mult-o')
              showConnection('conn-mult-o-to-ht')
              break
            case 'complete':
              document.getElementById('h-t')?.classList.add('active')
              setValues(prev => ({ ...prev, h_t: details.h_t }))
              showConnection('conn-mult-o-to-ht')
              break
          }
        }, 50)
      }, delay)
      delay += 600
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      initializeConnections()
      reset()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const previousStep = useCallback(() => {
    const currentStepIndex = stepRef.current
    if (currentStepIndex <= 0) return

    stepRef.current = currentStepIndex - 1
    setStep(stepRef.current)

    // Remove active classes from current step
    const currentStep = steps[currentStepIndex]
    const prevStep = steps[currentStepIndex - 1]

    // Hide current step elements
    switch (currentStep) {
      case 'forget-sigmoid':
        document.getElementById('sigmoid-f')?.classList.remove('active')
        hideConnection('conn-h-to-forget')
        hideConnection('conn-x-to-forget')
        hideWeight('weight-W-f')
        hideWeight('weight-U-f')
        break
      case 'forget-gate':
        document.getElementById('gate-f')?.classList.remove('active')
        setValues(prev => ({ ...prev, f_t: null }))
        hideConnection('conn-sigmoid-f-to-gate')
        break
      case 'forget-mult':
        document.getElementById('mult-f')?.classList.remove('active')
        hideConnection('conn-gate-f-to-mult')
        hideConnection('conn-Cprev-to-mult-f')
        break
      case 'input-sigmoid':
        document.getElementById('sigmoid-i')?.classList.remove('active')
        hideConnection('conn-h-to-input')
        hideConnection('conn-x-to-input')
        hideWeight('weight-W-i')
        hideWeight('weight-U-i')
        break
      case 'input-gate':
        document.getElementById('gate-i')?.classList.remove('active')
        setValues(prev => ({ ...prev, i_t: null }))
        hideConnection('conn-sigmoid-i-to-gate')
        break
      case 'candidate-tanh':
        document.getElementById('tanh-c')?.classList.remove('active')
        hideConnection('conn-h-to-candidate')
        hideConnection('conn-x-to-candidate')
        hideWeight('weight-W-c')
        hideWeight('weight-U-c')
        break
      case 'candidate-gate':
        document.getElementById('gate-c')?.classList.remove('active')
        setValues(prev => ({ ...prev, c_hat: null }))
        hideConnection('conn-tanh-c-to-gate')
        break
      case 'candidate-mult':
        document.getElementById('mult-i')?.classList.remove('active')
        hideConnection('conn-gate-i-to-mult-i')
        hideConnection('conn-gate-c-to-mult-i')
        break
      case 'add-C':
        document.getElementById('add-C')?.classList.remove('active')
        hideConnection('conn-mult-f-to-add')
        hideConnection('conn-mult-i-to-add')
        break
      case 'output-tanh':
        document.getElementById('tanh-C')?.classList.remove('active')
        document.getElementById('C-t')?.classList.remove('active')
        setValues(prev => ({ ...prev, C_t: null }))
        hideConnection('conn-add-to-Ct')
        hideConnection('conn-Ct-to-tanh')
        break
      case 'output-sigmoid':
        document.getElementById('sigmoid-o')?.classList.remove('active')
        hideConnection('conn-h-to-output')
        hideConnection('conn-x-to-output')
        hideWeight('weight-W-o')
        hideWeight('weight-U-o')
        break
      case 'output-gate':
        document.getElementById('gate-o')?.classList.remove('active')
        setValues(prev => ({ ...prev, o_t: null }))
        hideConnection('conn-sigmoid-o-to-gate')
        break
      case 'output-mult':
        document.getElementById('mult-o')?.classList.remove('active')
        hideConnection('conn-tanh-C-to-mult-o')
        hideConnection('conn-gate-o-to-mult-o')
        hideConnection('conn-mult-o-to-ht')
        break
      case 'complete':
        document.getElementById('h-t')?.classList.remove('active')
        setValues(prev => ({ ...prev, h_t: null }))
        hideConnection('conn-mult-o-to-ht')
        break
    }
  }, [])

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only handle n/p keys when not typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault()
        nextStep()
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault()
        previousStep()
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [nextStep, previousStep])

  return (
    <div className="slide lstm-architecture-slide">
      <h1 className="slide-title-main">Architecture LSTM - Schéma Interactif</h1>
      
      <div className="schema-container-wrapper">
        <div className="schema-header">
          <h2 className="schema-title" style={{color: '#c2410c', fontSize: '28px', fontWeight: '700', marginBottom: '15px'}}>
            Visualisation du Flux de Données LSTM
          </h2>
          <div className="navigation-hint">
            <span className="key-hint">N</span> = Étape Suivante | 
            <span className="key-hint">P</span> = Étape Précédente
          </div>
        </div>
        
        <div className="lstm-animation-container">

        <div className="lstm-cell-container" ref={containerRef} id="lstm-cell">
          <svg ref={svgRef} id="connections-svg" className="connections-svg">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
              </marker>
              <marker id="arrowhead-orange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#ea580c" />
              </marker>
              <marker id="arrowhead-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#4ade80" />
              </marker>
              <marker id="arrowhead-purple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#a855f7" />
              </marker>
            </defs>
          </svg>

          <div className="section-label" style={{left:'80px', top:'30px'}}>ENTRÉES</div>
          <div className="section-label" style={{right:'80px', top:'30px'}}>SORTIES</div>

          {/* Input Nodes */}
          <div className="node node-cell-prev" id="C-prev" style={{left:'50px', top:'120px'}}>
            <div style={{fontSize:'20px'}}>C<sub>t-1</sub></div>
            <div className="value">{values.C_prev.toFixed(3)}</div>
          </div>

          <div className="node node-hidden-prev" id="h-prev" style={{left:'50px', top:'800px'}}>
            <div style={{fontSize:'20px'}}>h<sub>t-1</sub></div>
            <div className="value">{values.h_prev.toFixed(3)}</div>
          </div>

          <div className="node node-input" id="X-t" style={{left:'675px', top:'800px'}}>
            <div style={{fontSize:'20px'}}>X<sub>t</sub></div>
            <div className="value">{values.X_t.toFixed(3)}</div>
          </div>

          {/* FORGET GATE */}
          <div className="gate-dashed-box" id="forget-box" style={{left:'220px', top:'350px', width:'250px', height:'280px'}}></div>
          <div className="section-label" style={{left:'270px', top:'370px', fontSize:'12px', fontWeight:'bold'}}>FORGET GATE</div>
          <div className="weight-label" id="weight-W-f" dangerouslySetInnerHTML={{ __html: 'W<sub>f</sub>' }}></div>
          <div className="weight-label" id="weight-U-f" dangerouslySetInnerHTML={{ __html: 'W<sub>f</sub>' }}></div>
          <div className="gate-box gate-forget" id="gate-f" style={{left:'300px', top:'410px'}}>
            <div style={{fontSize:'16px'}}>f<sub>t</sub></div>
            <div className="value" style={{fontSize:'16px', marginTop:'5px'}}>
              {values.f_t !== null ? values.f_t.toFixed(3) : '-'}
            </div>
          </div>
          <div className="activation activation-sigmoid" id="sigmoid-f" style={{left:'300px', top:'540px'}}></div>
          <div className="operation operation-multiply" id="mult-f" style={{left:'420px', top:'128px'}}></div>

          {/* INPUT GATE */}
          <div className="gate-dashed-box" id="input-box" style={{left:'500px', top:'350px', width:'350px', height:'420px'}}></div>
          <div className="section-label" style={{left:'675px', top:'370px', fontSize:'12px', fontWeight:'bold', transform:'translateX(-50%)'}}>INPUT GATE</div>
          <div className="weight-label" id="weight-W-i" dangerouslySetInnerHTML={{ __html: 'W<sub>i</sub>' }}></div>
          <div className="weight-label" id="weight-U-i" dangerouslySetInnerHTML={{ __html: 'W<sub>i</sub>' }}></div>
          <div className="operation operation-multiply" id="mult-i" style={{left:'675px', top:'320px'}}></div>
          <div className="gate-box gate-input" id="gate-i" style={{left:'555px', top:'480px'}}>
            <div style={{fontSize:'16px'}}>i<sub>t</sub></div>
            <div className="value" style={{fontSize:'16px', marginTop:'5px'}}>
              {values.i_t !== null ? values.i_t.toFixed(3) : '-'}
            </div>
          </div>
          <div className="activation activation-sigmoid" id="sigmoid-i" style={{left:'560px', top:'640px'}}></div>

          {/* Candidate */}
          <div className="weight-label" id="weight-W-c" dangerouslySetInnerHTML={{ __html: 'W<sub>c</sub>' }}></div>
          <div className="weight-label" id="weight-U-c" dangerouslySetInnerHTML={{ __html: 'W<sub>c</sub>' }}></div>
          <div className="candidate-gate" id="gate-c" style={{left:'685px', top:'480px'}}>
            <div style={{fontSize:'16px'}}>ĉ<sub>t</sub></div>
            <div className="value" style={{fontSize:'16px', marginTop:'5px'}}>
              {values.c_hat !== null ? values.c_hat.toFixed(3) : '-'}
            </div>
          </div>
          <div className="activation activation-tanh" id="tanh-c" style={{left:'690px', top:'640px'}}></div>

          {/* OUTPUT GATE */}
          <div className="gate-dashed-box" id="output-box" style={{left:'890px', top:'350px', width:'250px', height:'280px'}}></div>
          <div className="section-label" style={{left:'940px', top:'370px', fontSize:'12px', fontWeight:'bold'}}>OUTPUT GATE</div>
          <div className="weight-label" id="weight-W-o" dangerouslySetInnerHTML={{ __html: 'W<sub>o</sub>' }}></div>
          <div className="weight-label" id="weight-U-o" dangerouslySetInnerHTML={{ __html: 'W<sub>o</sub>' }}></div>
          <div className="gate-box gate-output" id="gate-o" style={{left:'970px', top:'410px'}}>
            <div style={{fontSize:'16px'}}>o<sub>t</sub></div>
            <div className="value" style={{fontSize:'16px', marginTop:'5px'}}>
              {values.o_t !== null ? values.o_t.toFixed(3) : '-'}
            </div>
          </div>
          <div className="activation activation-sigmoid" id="sigmoid-o" style={{left:'970px', top:'540px'}}></div>

          {/* Add Operation */}
          <div className="operation operation-add" id="add-C" style={{left:'760px', top:'128px'}}></div>

          {/* Output Nodes */}
          <div className="node node-output" id="C-t" style={{left:'1180px', top:'120px'}}>
            <div style={{fontSize:'20px'}}>C<sub>t</sub></div>
            <div className="value">{values.C_t !== null ? values.C_t.toFixed(3) : '0.000'}</div>
          </div>

          <div className="activation activation-tanh" id="tanh-C" style={{left:'1180px', top:'460px'}}></div>
          <div className="operation operation-multiply" id="mult-o" style={{left:'1150px', top:'600px'}}></div>

          <div className="node node-hidden-out" id="h-t" style={{left:'1180px', top:'800px'}}>
            <div style={{fontSize:'20px'}}>h<sub>t</sub></div>
            <div className="value">{values.h_t !== null ? values.h_t.toFixed(3) : '0.000'}</div>
          </div>
        </div>

        <div className="legend">
          <div className="legend-item">
            <div className="legend-box" style={{background:'#3b82f6'}}></div>
            <span>Sigmoid (σ)</span>
          </div>
          <div className="legend-item">
            <div className="legend-box" style={{background:'#a855f7'}}></div>
            <span>Tanh</span>
          </div>
          <div className="legend-item">
            <div className="legend-box" style={{background:'#ea580c'}}></div>
            <span>Cell State</span>
          </div>
          <div className="legend-item">
            <div className="legend-box" style={{background:'#86efac'}}></div>
            <span>Gate (f, i, o)</span>
          </div>
          <div className="legend-item">
            <div className="legend-box" style={{background:'#fcd34d'}}></div>
            <span>Candidate (ĉ)</span>
          </div>
          <div className="legend-item">
            <div className="legend-box" style={{background:'#ea580c', borderRadius:'50%'}}></div>
            <span>Operation (×, +)</span>
          </div>
        </div>

        <div className="controls">
          <button onClick={reset}>🔄 Reset</button>
          <button onClick={nextStep} disabled={step >= steps.length}>
            Étape Suivante ▶
          </button>
          <button onClick={animateAll}>⚡ Animer Tout</button>
          <p className="controls-hint">
            💡 Utilisez <strong>N</strong> pour l'étape suivante et <strong>P</strong> pour l'étape précédente
          </p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default LSTMArchitectureSlide
