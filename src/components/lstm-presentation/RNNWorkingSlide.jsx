import React, { useState, useEffect } from 'react'
import './RNNWorkingSlide.css'

function RNNWorkingSlide() {
  // RNN Parameters
  const W_hh = 0.5  // weight from hidden to hidden
  const W_xh = 0.8  // weight from input to hidden
  const b_h = 0.1   // bias for hidden
  const W_hy = 1.2  // weight from hidden to output
  const b_y = 0     // bias for output

  const [step, setStep] = useState(0) // Current timestep (0-4)
  const [substep, setSubstep] = useState(0) // Current substep: 0=input, 1=Whh*h, 2=Wxh*x, 3=h, 4=y
  const [inputs, setInputs] = useState([1.0, 0.5, 0.8, 0.3])
  const [hiddenStates, setHiddenStates] = useState([0]) // h₀ = 0
  const [outputs, setOutputs] = useState([])
  const [currentDetails, setCurrentDetails] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  function tanh(x) {
    return Math.tanh(x)
  }

  function calculateRNNStep(x_t, h_prev) {
    const W_hh_h_prev = W_hh * h_prev
    const W_xh_x_t = W_xh * x_t
    const sum_before_tanh = W_hh_h_prev + W_xh_x_t + b_h
    const h_t = tanh(sum_before_tanh)
    const y_t = W_hy * h_t + b_y

    return { 
      h_t, 
      y_t,
      W_hh_h_prev,
      W_xh_x_t,
      sum_before_tanh
    }
  }

  function reset() {
    setStep(0)
    setSubstep(0)
    setInputs([1.0, 0.5, 0.8, 0.3])
    setHiddenStates([0])
    setOutputs([])
    setCurrentDetails(null)
    setCurrentIndex(0)
    setIsAnimating(false)
  }

  function next() {
    if (isAnimating) return

    // If we're starting a new timestep, calculate everything first
    if (substep === 0 && step < 4) {
      const x_t = inputs[step]
      const h_prev = hiddenStates[hiddenStates.length - 1]
      const details = calculateRNNStep(x_t, h_prev)
      setCurrentDetails(details)
      setCurrentIndex(step + 1)
    }

    // Show current substep
    if (step < 4) {
      const x_t = inputs[step]
      const h_prev = hiddenStates[hiddenStates.length - 1]

      setSubstep(prev => {
        const newSubstep = prev + 1

        // If we finished all substeps for this timestep, move to next timestep
        if (newSubstep > 4) {
          // Store results
          const details = currentDetails || calculateRNNStep(x_t, h_prev)
          setHiddenStates(prev => [...prev, details.h_t])
          setOutputs(prev => [...prev, details.y_t])
          setStep(prev => prev + 1)
          return 0
        }

        return newSubstep
      })
    }
  }

  function calculateAll() {
    reset()
    setIsAnimating(true)

    let delay = 0
    const newHiddenStates = [0]
    const newOutputs = []

    inputs.forEach((x_t, idx) => {
      const index = idx + 1
      const h_prev = newHiddenStates[newHiddenStates.length - 1]
      const details = calculateRNNStep(x_t, h_prev)

      // Show input
      setTimeout(() => {
        setStep(idx)
        setSubstep(0)
        setCurrentIndex(index)
        setCurrentDetails(details)
      }, delay)
      delay += 600

      // Show W_hh * h_prev
      setTimeout(() => {
        setSubstep(1)
      }, delay)
      delay += 600

      // Show W_xh * x_t
      setTimeout(() => {
        setSubstep(2)
      }, delay)
      delay += 600

      // Show h
      setTimeout(() => {
        setSubstep(3)
      }, delay)
      delay += 600

      // Show y
      setTimeout(() => {
        setSubstep(4)
        newHiddenStates.push(details.h_t)
        newOutputs.push(details.y_t)
        setHiddenStates([...newHiddenStates])
        setOutputs([...newOutputs])
      }, delay)
      delay += 600
    })

    setTimeout(() => {
      setIsAnimating(false)
      setStep(4)
      setSubstep(5)
    }, delay)
  }

  function handleInputChange(index, value) {
    const newInputs = [...inputs]
    newInputs[index] = parseFloat(value) || 0
    setInputs(newInputs)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        next()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [step, substep, inputs, hiddenStates, currentDetails, currentIndex, isAnimating])

  // Calculate current values for display
  const getDisplayValues = (index) => {
    if (index === 0) {
      return { x: null, h: hiddenStates[0], y: null }
    }

    const isActive = currentIndex === index && step >= index - 1
    const isComplete = step > index - 1

    if (!isActive && !isComplete) {
      return { x: null, h: null, y: null }
    }

    if (isComplete) {
      return {
        x: inputs[index - 1],
        h: hiddenStates[index],
        y: outputs[index - 1]
      }
    }

    // Current step being calculated
    const x_t = inputs[index - 1]
    const h_prev = hiddenStates[index - 1]
    const details = currentDetails || calculateRNNStep(x_t, h_prev)

    return {
      x: substep >= 0 ? x_t : null,
      h: substep >= 3 ? details.h_t : null,
      y: substep >= 4 ? details.y_t : null
    }
  }

  const getBreakdownContent = () => {
    if (!currentDetails || currentIndex === 0) return null

    const x_val = inputs[currentIndex - 1]
    const h_prev = hiddenStates[currentIndex - 1]

    let content = `<div class="step"><strong>Calcul de h${currentIndex}:</strong><br>`

    if (substep >= 1) {
      content += `<span class="highlight">Étape 1:</span> Wₕₕ·h${currentIndex-1} = ${W_hh.toFixed(1)} × <span class="value">${h_prev.toFixed(3)}</span> = <span class="value">${currentDetails.W_hh_h_prev.toFixed(4)}</span> <span style="color:#ff6b6b">← depuis h${currentIndex-1}</span><br>`
    }
    if (substep >= 2) {
      content += `<span class="highlight">Étape 2:</span> Wₓₕ·x${currentIndex} = ${W_xh.toFixed(1)} × <span class="value">${x_val.toFixed(3)}</span> = <span class="value">${currentDetails.W_xh_x_t.toFixed(4)}</span><br>`
    }
    if (substep >= 3) {
      content += `<span class="highlight">Étape 3:</span> Somme = ${currentDetails.W_hh_h_prev.toFixed(4)} + ${currentDetails.W_xh_x_t.toFixed(4)} + ${b_h.toFixed(1)} = <span class="value">${currentDetails.sum_before_tanh.toFixed(4)}</span><br>`
      content += `<span class="highlight">Étape 4:</span> h${currentIndex} = tanh(${currentDetails.sum_before_tanh.toFixed(4)}) = <span class="value">${currentDetails.h_t.toFixed(4)}</span><br>`
    }
    if (substep >= 4) {
      content += `<span class="highlight">Étape 5:</span> y${currentIndex} = Wₕᵧ·h${currentIndex} = ${W_hy.toFixed(1)} × ${currentDetails.h_t.toFixed(4)} = <span class="value">${currentDetails.y_t.toFixed(4)}</span>`
    }

    content += `</div>`
    return content
  }

  const showBreakdown = currentDetails && currentIndex > 0 && substep > 0

  return (
    <div className="slide rnn-working-slide">
      <h1 className="slide-title-main">RNN - Fonctionnement avec Calculs Réels</h1>

      <div className="rnn-interactive-container">
        <div className="input-section">
          <h3>Entrez les valeurs d'entrée :</h3>
          <div className="input-group-container">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="input-group">
                <label>x<sub>{i + 1}</sub>:</label>
                <input
                  type="number"
                  value={inputs[i]}
                  onChange={(e) => handleInputChange(i, e.target.value)}
                  step="0.1"
                />
              </div>
            ))}
          </div>
          <div className="button-group">
            <button onClick={reset}>🔄 Reset</button>
            <button 
              onClick={next} 
              disabled={step >= 4 && substep > 4 || isAnimating}
            >
              {step >= 4 && substep > 4 ? '✓ Terminé' : 'Étape Suivante ▶'}
            </button>
            <button onClick={calculateAll} disabled={isAnimating}>
              ⚡ Calculate All
            </button>
          </div>
        </div>

        <p className="instruction-text">
          Cliquez étape par étape pour voir chaque calcul: <span className="highlight-red">Wₕₕ·hₜ₋₁</span> → <span className="highlight-cyan">Wₓₕ·xₜ</span> → <span className="highlight-purple">h</span> → <span className="highlight-green">y</span><br/>
          <span className="keyboard-hint">💡 Utilisez les flèches <strong>→</strong> ou <strong>↓</strong> du clavier pour naviguer</span>
        </p>

        <div className="rnn-visualization">
          {/* h0 */}
          <div className="block">
            <div className={`h0-box ${currentIndex === 1 && substep >= 1 ? 'prev-highlight' : ''}`}>
              <div className="label">h₀</div>
              <div className="value">{hiddenStates[0].toFixed(3)}</div>
            </div>
          </div>

          {/* Timesteps 1-4 */}
          {[1, 2, 3, 4].map(index => {
            const values = getDisplayValues(index)
            const isActive = currentIndex === index && step >= index - 1
            const isComplete = step > index - 1
            const showArrow = isActive && substep >= 1

            return (
              <div key={index} className="block">
                <div className={`y-circle ${values.y !== null ? 'active' : 'inactive'}`}>
                  <div className="label">y<sub>{index}</sub></div>
                  <div className="value">{values.y !== null ? values.y.toFixed(3) : '-'}</div>
                </div>
                <div className={`h-box ${values.h !== null ? 'active' : 'inactive'}`}>
                  <div className={`recurrent-arrow ${showArrow ? 'active' : ''}`}></div>
                  <div className="label">h<sub>{index}</sub></div>
                  <div className="value">{values.h !== null ? values.h.toFixed(3) : '-'}</div>
                </div>
                <div className={`x-circle ${values.x !== null ? 'active' : 'inactive'}`}>
                  <div className="label">x<sub>{index}</sub></div>
                  <div className="value">{values.x !== null ? values.x.toFixed(3) : '-'}</div>
                </div>
              </div>
            )
          })}

          <div className="ellipsis">...</div>
        </div>

        <div className="formula-display">
          <strong>Formule RNN:</strong><br/>
          hₜ = tanh(<span style={{color:'#ff6b6b'}}>Wₕₕ·hₜ₋₁</span> + Wₓₕ·xₜ + bₕ)<br/>
          yₜ = Wₕᵧ·hₜ + bᵧ<br/>
          <span className="formula-params">(Poids: Wₕₕ={W_hh}, Wₓₕ={W_xh}, bₕ={b_h}, Wₕᵧ={W_hy}, bᵧ={b_y})</span>
        </div>

        {showBreakdown && (
          <div className="calculation-breakdown">
            <h4>📊 Détail du Calcul Étape par Étape</h4>
            <div 
              className="breakdown-content"
              dangerouslySetInnerHTML={{ __html: getBreakdownContent() }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default RNNWorkingSlide
