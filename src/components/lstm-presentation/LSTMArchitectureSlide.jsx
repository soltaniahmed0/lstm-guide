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

  function drawConnection(id, from, to, marker = 'arrowhead') {
    const svg = svgRef.current
    if (!svg) return null

    const fromPos = getElementCenter(from)
    const toPos = getElementCenter(to)

    // Calculate perpendicular offset for double parallel lines
    const dx = toPos.x - fromPos.x
    const dy = toPos.y - fromPos.y
    const length = Math.sqrt(dx * dx + dy * dy)
    const offset = 2.5 // Distance between parallel lines
    
    // Perpendicular unit vector (avoid division by zero)
    const perpX = length > 0 ? -dy / length : 0
    const perpY = length > 0 ? dx / length : 1

    // First parallel line (left/top) - no arrowhead
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line1.setAttribute('id', `${id}-line1`)
    line1.setAttribute('x1', fromPos.x + perpX * offset)
    line1.setAttribute('y1', fromPos.y + perpY * offset)
    line1.setAttribute('x2', toPos.x + perpX * offset)
    line1.setAttribute('y2', toPos.y + perpY * offset)
    line1.setAttribute('stroke', '#000000')
    line1.setAttribute('stroke-width', '3')
    line1.setAttribute('stroke-linecap', 'round')
    line1.setAttribute('class', 'flow-line flow-line-parallel')
    line1.setAttribute('opacity', '0')
    // Explicitly remove any marker-end - only line2 has arrowhead
    line1.removeAttribute('marker-end')
    svg.appendChild(line1)

    // Second parallel line (right/bottom)
    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line2.setAttribute('id', id)
    line2.setAttribute('x1', fromPos.x - perpX * offset)
    line2.setAttribute('y1', fromPos.y - perpY * offset)
    line2.setAttribute('x2', toPos.x - perpX * offset)
    line2.setAttribute('y2', toPos.y - perpY * offset)
    line2.setAttribute('stroke', '#000000')
    line2.setAttribute('stroke-width', '3')
    line2.setAttribute('stroke-linecap', 'round')
    line2.setAttribute('class', 'flow-line flow-line-parallel')
    line2.setAttribute('data-from', from)
    line2.setAttribute('data-to', to)
    if (marker && marker !== '') {
      line2.setAttribute('marker-end', `url(#${marker})`)
    }
    line2.setAttribute('opacity', '0')
    svg.appendChild(line2)
    
    return line2
  }

  function drawCurvedConnection(id, from, to, marker = 'arrowhead', curvature = 0) {
    const svg = svgRef.current
    if (!svg) return null

    const fromPos = getElementCenter(from)
    const toPos = getElementCenter(to)

    const midX = (fromPos.x + toPos.x) / 2
    const midY = (fromPos.y + toPos.y) / 2
    const controlY = midY + curvature

    // Calculate perpendicular offset for double parallel lines
    const dx = toPos.x - fromPos.x
    const dy = toPos.y - fromPos.y
    const length = Math.sqrt(dx * dx + dy * dy)
    const offset = 2.5 // Distance between parallel lines
    
    // Perpendicular unit vector (avoid division by zero)
    const perpX = length > 0 ? -dy / length : 0
    const perpY = length > 0 ? dx / length : 1

    // First parallel curved path (left/top) - no arrowhead
    const d1 = `M ${fromPos.x + perpX * offset} ${fromPos.y + perpY * offset} Q ${midX + perpX * offset} ${controlY + perpY * offset} ${toPos.x + perpX * offset} ${toPos.y + perpY * offset}`
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path1.setAttribute('id', `${id}-line1`)
    path1.setAttribute('d', d1)
    path1.setAttribute('stroke', '#000000')
    path1.setAttribute('stroke-width', '3')
    path1.setAttribute('stroke-linecap', 'round')
    path1.setAttribute('fill', 'none')
    path1.setAttribute('class', 'flow-line flow-line-parallel')
    path1.setAttribute('opacity', '0')
    // Explicitly remove any marker-end - only path2 has arrowhead
    path1.removeAttribute('marker-end')
    svg.appendChild(path1)

    // Second parallel curved path (right/bottom)
    const d2 = `M ${fromPos.x - perpX * offset} ${fromPos.y - perpY * offset} Q ${midX - perpX * offset} ${controlY - perpY * offset} ${toPos.x - perpX * offset} ${toPos.y - perpY * offset}`
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path2.setAttribute('id', id)
    path2.setAttribute('d', d2)
    path2.setAttribute('stroke', '#000000')
    path2.setAttribute('stroke-width', '3')
    path2.setAttribute('stroke-linecap', 'round')
    path2.setAttribute('fill', 'none')
    path2.setAttribute('class', 'flow-line flow-line-parallel')
    path2.setAttribute('data-from', from)
    path2.setAttribute('data-to', to)
    if (marker && marker !== '') {
      path2.setAttribute('marker-end', `url(#${marker})`)
    }
    path2.setAttribute('opacity', '0')
    svg.appendChild(path2)
    
    return path2
  }

  function showConnection(id) {
    const line = document.getElementById(id)
    const line1 = document.getElementById(`${id}-line1`)
    if (line) {
      line.classList.add('active')
      line.style.opacity = '1'
      line.style.transition = 'none'
      line.style.animation = 'none'
      line.setAttribute('opacity', '1')
    }
    if (line1) {
      line1.classList.add('active')
      line1.style.opacity = '1'
      line1.style.transition = 'none'
      line1.style.animation = 'none'
      line1.setAttribute('opacity', '1')
    }
  }

  function hideConnection(id) {
    const line = document.getElementById(id)
    const line1 = document.getElementById(`${id}-line1`)
    if (line) {
      line.classList.remove('active')
      line.style.opacity = '0'
      line.setAttribute('opacity', '0')
    }
    if (line1) {
      line1.classList.remove('active')
      line1.style.opacity = '0'
      line1.setAttribute('opacity', '0')
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
    const lines = svg.querySelectorAll('.flow-line, .flow-line-parallel, .flow-line-outline')
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
      drawCurvedConnection('conn-h-to-forget', 'h-prev', 'sigmoid-f', 'arrowhead', -35)
      drawCurvedConnection('conn-x-to-forget', 'X-t', 'sigmoid-f', 'arrowhead', 21)
      drawCurvedConnection('conn-h-to-input', 'h-prev', 'sigmoid-i', 'arrowhead', 0)
      drawCurvedConnection('conn-x-to-input', 'X-t', 'sigmoid-i', 'arrowhead', 21)
      drawCurvedConnection('conn-h-to-candidate', 'h-prev', 'tanh-c', 'arrowhead', 35)
      drawCurvedConnection('conn-x-to-candidate', 'X-t', 'tanh-c', 'arrowhead', 21)
      drawCurvedConnection('conn-h-to-output', 'h-prev', 'sigmoid-o', 'arrowhead', 70)
      drawCurvedConnection('conn-x-to-output', 'X-t', 'sigmoid-o', 'arrowhead', 70)

      // Sigmoid/Tanh to gates
      drawConnection('conn-sigmoid-f-to-gate', 'sigmoid-f', 'gate-f', 'arrowhead')
      drawConnection('conn-sigmoid-i-to-gate', 'sigmoid-i', 'gate-i', 'arrowhead')
      drawConnection('conn-sigmoid-o-to-gate', 'sigmoid-o', 'gate-o', 'arrowhead')
      drawConnection('conn-tanh-c-to-gate', 'tanh-c', 'gate-c', 'arrowhead')

      // Forget gate flow
      drawCurvedConnection('conn-gate-f-to-mult', 'gate-f', 'mult-f', 'arrowhead', -70)
      drawConnection('conn-Cprev-to-mult-f', 'C-prev', 'mult-f', 'arrowhead')

      // Input gate flow
      drawCurvedConnection('conn-gate-i-to-mult-i', 'gate-i', 'mult-i', 'arrowhead', -56)
      drawCurvedConnection('conn-gate-c-to-mult-i', 'gate-c', 'mult-i', 'arrowhead', -56)

      // Add operation
      drawConnection('conn-mult-f-to-add', 'mult-f', 'add-C', 'arrowhead')
      drawCurvedConnection('conn-mult-i-to-add', 'mult-i', 'add-C', 'arrowhead', 70)

      // Output flow
      drawConnection('conn-add-to-Ct', 'add-C', 'C-t', 'arrowhead')
      drawConnection('conn-Ct-to-tanh', 'C-t', 'tanh-C', 'arrowhead')
      drawCurvedConnection('conn-tanh-C-to-mult-o', 'tanh-C', 'mult-o', 'arrowhead', 49)
      drawCurvedConnection('conn-gate-o-to-mult-o', 'gate-o', 'mult-o', 'arrowhead', 70)
      drawConnection('conn-mult-o-to-ht', 'mult-o', 'h-t', 'arrowhead')

      // Position weights
      setTimeout(() => {
        positionWeightOnConnection('conn-h-to-forget', 'weight-W-f', 0.4, -21, 0)
        positionWeightOnConnection('conn-x-to-forget', 'weight-U-f', 0.4, 21, 0)
        positionWeightOnConnection('conn-h-to-input', 'weight-W-i', 0.4, -21, 0)
        positionWeightOnConnection('conn-x-to-input', 'weight-U-i', 0.4, 21, 0)
        positionWeightOnConnection('conn-h-to-candidate', 'weight-W-c', 0.4, -21, 0)
        positionWeightOnConnection('conn-x-to-candidate', 'weight-U-c', 0.4, 21, 0)
        positionWeightOnConnection('conn-h-to-output', 'weight-W-o', 0.4, -21, 0)
        positionWeightOnConnection('conn-x-to-output', 'weight-U-o', 0.4, 21, 0)
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

    const details = calculateLSTM()
    const currentStep = steps[currentStepIndex]
    const prevStepIndex = currentStepIndex - 1
    const prevStep = steps[prevStepIndex]

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

    // Re-show previous step elements
    stepRef.current = prevStepIndex
    setStep(prevStepIndex)

    // Always show inputs
    document.getElementById('C-prev')?.classList.add('active')
    document.getElementById('h-prev')?.classList.add('active')
    document.getElementById('X-t')?.classList.add('active')

    switch (prevStep) {
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
  }, [calculateLSTM])

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
              <filter id="arrowShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
                <feOffset dx="1" dy="1" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <marker id="arrowhead" markerWidth="20" markerHeight="20" refX="15" refY="5" orient="auto">
                {/* Solid black arrowhead - no animation */}
                <polygon 
                  points="0 0, 15 5, 0 10" 
                  fill="#000000" 
                  stroke="#000000" 
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </marker>
              <marker id="arrowhead-orange" markerWidth="20" markerHeight="20" refX="15" refY="5" orient="auto">
                <polygon 
                  points="0 0, 15 5, 0 10" 
                  fill="#000000" 
                  stroke="#000000" 
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </marker>
              <marker id="arrowhead-green" markerWidth="20" markerHeight="20" refX="15" refY="5" orient="auto">
                <polygon 
                  points="0 0, 15 5, 0 10" 
                  fill="#000000" 
                  stroke="#000000" 
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </marker>
              <marker id="arrowhead-purple" markerWidth="20" markerHeight="20" refX="15" refY="5" orient="auto">
                <polygon 
                  points="0 0, 15 5, 0 10" 
                  fill="#000000" 
                  stroke="#000000" 
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </marker>
            </defs>
          </svg>

          <div className="section-label" style={{left:'56px', top:'21px'}}>ENTRÉES</div>
          <div className="section-label" style={{right:'56px', top:'21px'}}>SORTIES</div>

          {/* Input Nodes */}
          <div className="node node-cell-prev" id="C-prev" style={{left:'35px', top:'84px'}}>
            <div style={{fontSize:'14px'}}>C<sub>t-1</sub></div>
            <div className="value">{values.C_prev.toFixed(3)}</div>
          </div>

          <div className="node node-hidden-prev" id="h-prev" style={{left:'35px', top:'560px'}}>
            <div style={{fontSize:'14px'}}>h<sub>t-1</sub></div>
            <div className="value">{values.h_prev.toFixed(3)}</div>
          </div>

          <div className="node node-input" id="X-t" style={{left:'472px', top:'560px'}}>
            <div style={{fontSize:'14px'}}>X<sub>t</sub></div>
            <div className="value">{values.X_t.toFixed(3)}</div>
          </div>

          {/* FORGET GATE */}
          <div className="gate-dashed-box" id="forget-box" style={{left:'154px', top:'245px', width:'175px', height:'196px'}}></div>
          <div className="section-label" style={{left:'189px', top:'259px', fontSize:'10px', fontWeight:'bold'}}>FORGET GATE</div>
          <div className="weight-label" id="weight-W-f" dangerouslySetInnerHTML={{ __html: 'W<sub>f</sub>' }}></div>
          <div className="weight-label" id="weight-U-f" dangerouslySetInnerHTML={{ __html: 'W<sub>f</sub>' }}></div>
          <div className="gate-box gate-forget" id="gate-f" style={{left:'210px', top:'287px'}}>
            <div style={{fontSize:'11px'}}>f<sub>t</sub></div>
            <div className="value" style={{fontSize:'11px', marginTop:'3px'}}>
              {values.f_t !== null ? values.f_t.toFixed(3) : '-'}
            </div>
          </div>
          <div className="activation activation-sigmoid" id="sigmoid-f" style={{left:'210px', top:'378px'}}></div>
          <div className="operation operation-multiply" id="mult-f" style={{left:'294px', top:'90px'}}></div>

          {/* INPUT GATE */}
          <div className="gate-dashed-box" id="input-box" style={{left:'350px', top:'245px', width:'245px', height:'294px'}}></div>
          <div className="section-label" style={{left:'472px', top:'259px', fontSize:'10px', fontWeight:'bold', transform:'translateX(-50%)'}}>INPUT GATE</div>
          <div className="weight-label" id="weight-W-i" dangerouslySetInnerHTML={{ __html: 'W<sub>i</sub>' }}></div>
          <div className="weight-label" id="weight-U-i" dangerouslySetInnerHTML={{ __html: 'W<sub>i</sub>' }}></div>
          <div className="operation operation-multiply" id="mult-i" style={{left:'472px', top:'224px'}}></div>
          <div className="gate-box gate-input" id="gate-i" style={{left:'388px', top:'336px'}}>
            <div style={{fontSize:'11px'}}>i<sub>t</sub></div>
            <div className="value" style={{fontSize:'11px', marginTop:'3px'}}>
              {values.i_t !== null ? values.i_t.toFixed(3) : '-'}
            </div>
          </div>
          <div className="activation activation-sigmoid" id="sigmoid-i" style={{left:'392px', top:'448px'}}></div>

          {/* Candidate */}
          <div className="weight-label" id="weight-W-c" dangerouslySetInnerHTML={{ __html: 'W<sub>c</sub>' }}></div>
          <div className="weight-label" id="weight-U-c" dangerouslySetInnerHTML={{ __html: 'W<sub>c</sub>' }}></div>
          <div className="candidate-gate" id="gate-c" style={{left:'479px', top:'336px'}}>
            <div style={{fontSize:'11px'}}>ĉ<sub>t</sub></div>
            <div className="value" style={{fontSize:'11px', marginTop:'3px'}}>
              {values.c_hat !== null ? values.c_hat.toFixed(3) : '-'}
            </div>
          </div>
          <div className="activation activation-tanh" id="tanh-c" style={{left:'483px', top:'448px'}}></div>

          {/* OUTPUT GATE */}
          <div className="gate-dashed-box" id="output-box" style={{left:'623px', top:'245px', width:'175px', height:'196px'}}></div>
          <div className="section-label" style={{left:'658px', top:'259px', fontSize:'10px', fontWeight:'bold'}}>OUTPUT GATE</div>
          <div className="weight-label" id="weight-W-o" dangerouslySetInnerHTML={{ __html: 'W<sub>o</sub>' }}></div>
          <div className="weight-label" id="weight-U-o" dangerouslySetInnerHTML={{ __html: 'W<sub>o</sub>' }}></div>
          <div className="gate-box gate-output" id="gate-o" style={{left:'679px', top:'287px'}}>
            <div style={{fontSize:'11px'}}>o<sub>t</sub></div>
            <div className="value" style={{fontSize:'11px', marginTop:'3px'}}>
              {values.o_t !== null ? values.o_t.toFixed(3) : '-'}
            </div>
          </div>
          <div className="activation activation-sigmoid" id="sigmoid-o" style={{left:'679px', top:'378px'}}></div>

          {/* Add Operation */}
          <div className="operation operation-add" id="add-C" style={{left:'532px', top:'90px'}}></div>

          {/* Output Nodes */}
          <div className="node node-output" id="C-t" style={{left:'826px', top:'84px'}}>
            <div style={{fontSize:'14px'}}>C<sub>t</sub></div>
            <div className="value">{values.C_t !== null ? values.C_t.toFixed(3) : '0.000'}</div>
          </div>

          <div className="activation activation-tanh" id="tanh-C" style={{left:'826px', top:'322px'}}></div>
          <div className="operation operation-multiply" id="mult-o" style={{left:'805px', top:'420px'}}></div>

          <div className="node node-hidden-out" id="h-t" style={{left:'826px', top:'560px'}}>
            <div style={{fontSize:'14px'}}>h<sub>t</sub></div>
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
