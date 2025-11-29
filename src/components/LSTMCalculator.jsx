import React, { useState, useEffect } from 'react'
import './LSTMCalculator.css'

const weights = {
  forget: { h: 2.70, x: 1.63, bias: 1.62 },
  input: { h: 2.00, x: 1.65, bias: 0.62 },
  candidate: { h: 1.41, x: 0.94, bias: -0.32 },
  output: { h: 1.50, x: 1.20, bias: 0.50 }
}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x))
}

function tanh(x) {
  return Math.tanh(x)
}

function formatNum(num, decimals = 4) {
  return num.toFixed(decimals)
}

function LSTMCalculator({ inputs, setInputs, setSchemaValues, presentationMode = false }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState([])
  const [autoPlay, setAutoPlay] = useState(false)

  useEffect(() => {
    buildSteps()
  }, [inputs])

  useEffect(() => {
    if (autoPlay && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 3000)
      return () => clearTimeout(timer)
    } else if (autoPlay && currentStep === steps.length - 1) {
      setAutoPlay(false)
    }
  }, [autoPlay, currentStep, steps.length])

  useEffect(() => {
    if (steps.length > 0 && steps[currentStep]?.schemaValues) {
      setSchemaValues(steps[currentStep].schemaValues)
    }
  }, [currentStep, steps, setSchemaValues])

  function buildSteps() {
    const { ht_prev, xt, ct_prev } = inputs
    const newSteps = []

    // Initial step
    newSteps.push({
      title: "📋 Starting LSTM Calculation",
      content: (
        <div>
          <div className="formula">Initializing LSTM with input values</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Input Values:</strong><br />
              Cₜ₋₁ = {ct_prev}<br />
              hₜ₋₁ = {ht_prev}<br />
              Xₜ = {xt}
            </div>
          </div>
        </div>
      ),
      intermediate: 0,
      schemaValues: { ct_prev, ht_prev, xt }
    })

    // FORGET GATE
    const forget_weighted = (weights.forget.h * ht_prev) + (weights.forget.x * xt) + weights.forget.bias
    const forget_gate = sigmoid(forget_weighted)

    newSteps.push({
      title: "🚪 Forget Gate - Step 1: Multiply hₜ₋₁ by weight",
      content: (
        <div>
          <div className="formula">fₜ = σ(Wf · [hₜ₋₁, xₜ] + bf)</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Multiplying hₜ₋₁ by forget gate weight:</strong><br />
              Wf[h] × hₜ₋₁ = {weights.forget.h} × {ht_prev}
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(weights.forget.h * ht_prev)}</span>
            </div>
          </div>
        </div>
      ),
      intermediate: weights.forget.h * ht_prev
    })

    newSteps.push({
      title: "🚪 Forget Gate - Step 2: Multiply xₜ by weight",
      content: (
        <div>
          <div className="formula">fₜ = σ(Wf · [hₜ₋₁, xₜ] + bf)</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Multiplying xₜ by forget gate weight:</strong><br />
              Wf[x] × xₜ = {weights.forget.x} × {xt}
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(weights.forget.x * xt)}</span>
            </div>
          </div>
        </div>
      ),
      intermediate: weights.forget.x * xt
    })

    newSteps.push({
      title: "🚪 Forget Gate - Step 3: Add all terms together",
      content: (
        <div>
          <div className="formula">fₜ = σ(Wf · [hₜ₋₁, xₜ] + bf)</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Adding all terms:</strong><br />
              (Wf[h] × hₜ₋₁) + (Wf[x] × xₜ) + bf
            </div>
            <div className="math-operation">
              = ({formatNum(weights.forget.h * ht_prev)}) + ({formatNum(weights.forget.x * xt)}) + {weights.forget.bias}
            </div>
            <div className="math-operation">
              = {formatNum(weights.forget.h * ht_prev + weights.forget.x * xt)} + {weights.forget.bias}
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(forget_weighted)}</span>
            </div>
          </div>
        </div>
      ),
      intermediate: forget_weighted
    })

    const e_neg_x = Math.exp(-forget_weighted)
    newSteps.push({
      title: "🚪 Forget Gate - Step 4: Apply Sigmoid Activation",
      content: (
        <div>
          <div className="formula">σ(x) = 1 / (1 + e^(-x))</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Calculating e^(-x):</strong><br />
              e^(-{formatNum(forget_weighted)}) = {formatNum(e_neg_x)}
            </div>
            <div className="calculation-line">
              <strong>Calculating denominator:</strong><br />
              1 + e^(-{formatNum(forget_weighted)}) = 1 + {formatNum(e_neg_x)} = {formatNum(1 + e_neg_x)}
            </div>
            <div className="math-operation">
              <strong>Final sigmoid:</strong><br />
              σ({formatNum(forget_weighted)}) = 1 / {formatNum(1 + e_neg_x)}
            </div>
            <div className="result-box">
              fₜ = <span className="highlight">{formatNum(forget_gate)}</span>
            </div>
          </div>
        </div>
      ),
      intermediate: forget_gate,
      schemaValues: { ct_prev, ht_prev, xt, ft: forget_gate }
    })

    // INPUT GATE
    const input_weighted = (weights.input.h * ht_prev) + (weights.input.x * xt) + weights.input.bias
    const input_gate = sigmoid(input_weighted)

    newSteps.push({
      title: "📥 Input Gate - Step 1: Multiply hₜ₋₁ by weight",
      content: (
        <div>
          <div className="formula">iₜ = σ(Wi · [hₜ₋₁, xₜ] + bi)</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Multiplying hₜ₋₁ by input gate weight:</strong><br />
              Wi[h] × hₜ₋₁ = {weights.input.h} × {ht_prev}
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(weights.input.h * ht_prev)}</span>
            </div>
          </div>
        </div>
      ),
      intermediate: weights.input.h * ht_prev
    })

    newSteps.push({
      title: "📥 Input Gate - Step 2: Multiply xₜ by weight",
      content: (
        <div>
          <div className="formula">iₜ = σ(Wi · [hₜ₋₁, xₜ] + bi)</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Multiplying xₜ by input gate weight:</strong><br />
              Wi[x] × xₜ = {weights.input.x} × {xt}
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(weights.input.x * xt)}</span>
            </div>
          </div>
        </div>
      ),
      intermediate: weights.input.x * xt
    })

    newSteps.push({
      title: "📥 Input Gate - Step 3: Add all terms together",
      content: (
        <div>
          <div className="formula">iₜ = σ(Wi · [hₜ₋₁, xₜ] + bi)</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Adding all terms:</strong><br />
              (Wi[h] × hₜ₋₁) + (Wi[x] × xₜ) + bi
            </div>
            <div className="math-operation">
              = ({formatNum(weights.input.h * ht_prev)}) + ({formatNum(weights.input.x * xt)}) + {weights.input.bias}
            </div>
            <div className="math-operation">
              = {formatNum(weights.input.h * ht_prev + weights.input.x * xt)} + {weights.input.bias}
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(input_weighted)}</span>
            </div>
          </div>
        </div>
      ),
      intermediate: input_weighted
    })

    const e_neg_x_input = Math.exp(-input_weighted)
    newSteps.push({
      title: "📥 Input Gate - Step 4: Apply Sigmoid Activation",
      content: (
        <div>
          <div className="formula">σ(x) = 1 / (1 + e^(-x))</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Calculating e^(-x):</strong><br />
              e^(-{formatNum(input_weighted)}) = {formatNum(e_neg_x_input)}
            </div>
            <div className="calculation-line">
              <strong>Calculating denominator:</strong><br />
              1 + e^(-{formatNum(input_weighted)}) = 1 + {formatNum(e_neg_x_input)} = {formatNum(1 + e_neg_x_input)}
            </div>
            <div className="math-operation">
              <strong>Final sigmoid:</strong><br />
              σ({formatNum(input_weighted)}) = 1 / {formatNum(1 + e_neg_x_input)}
            </div>
            <div className="result-box">
              iₜ = <span className="highlight">{formatNum(input_gate)}</span>
            </div>
          </div>
        </div>
      ),
      intermediate: input_gate,
      schemaValues: { ct_prev, ht_prev, xt, ft: forget_gate, it: input_gate }
    })

    // CANDIDATE VALUES
    const candidate_weighted = (weights.candidate.h * ht_prev) + (weights.candidate.x * xt) + weights.candidate.bias
    const candidate_gate = tanh(candidate_weighted)

    newSteps.push({
      title: "🆕 Candidate Values - Step 1: Multiply hₜ₋₁ by weight",
      content: (
        <div>
          <div className="formula">C̃ₜ = tanh(WC · [hₜ₋₁, xₜ] + bC)</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Multiplying hₜ₋₁ by candidate weight:</strong><br />
              WC[h] × hₜ₋₁ = {weights.candidate.h} × {ht_prev}
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(weights.candidate.h * ht_prev)}</span>
            </div>
          </div>
        </div>
      ),
      intermediate: weights.candidate.h * ht_prev
    })

    newSteps.push({
      title: "🆕 Candidate Values - Step 2: Multiply xₜ by weight",
      content: (
        <div>
          <div className="formula">C̃ₜ = tanh(WC · [hₜ₋₁, xₜ] + bC)</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Multiplying xₜ by candidate weight:</strong><br />
              WC[x] × xₜ = {weights.candidate.x} × {xt}
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(weights.candidate.x * xt)}</span>
            </div>
          </div>
        </div>
      ),
      intermediate: weights.candidate.x * xt
    })

    newSteps.push({
      title: "🆕 Candidate Values - Step 3: Add all terms together",
      content: (
        <div>
          <div className="formula">C̃ₜ = tanh(WC · [hₜ₋₁, xₜ] + bC)</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Adding all terms:</strong><br />
              (WC[h] × hₜ₋₁) + (WC[x] × xₜ) + bC
            </div>
            <div className="math-operation">
              = ({formatNum(weights.candidate.h * ht_prev)}) + ({formatNum(weights.candidate.x * xt)}) + ({weights.candidate.bias})
            </div>
            <div className="math-operation">
              = {formatNum(weights.candidate.h * ht_prev + weights.candidate.x * xt)} + ({weights.candidate.bias})
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(candidate_weighted)}</span>
            </div>
          </div>
        </div>
      ),
      intermediate: candidate_weighted
    })

    newSteps.push({
      title: "🆕 Candidate Values - Step 4: Apply Tanh Activation",
      content: (
        <div>
          <div className="formula">tanh(x) = (e^x - e^(-x)) / (e^x + e^(-x))</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Applying tanh function:</strong><br />
              tanh({formatNum(candidate_weighted)})
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(candidate_gate)}</span>
            </div>
            <div className="result-box">
              C̃ₜ = <span className="highlight">{formatNum(candidate_gate)}</span>
            </div>
          </div>
        </div>
      ),
      intermediate: candidate_gate,
      schemaValues: { ct_prev, ht_prev, xt, ft: forget_gate, it: input_gate, ctilde: candidate_gate }
    })

    // OUTPUT GATE
    const output_weighted = (weights.output.h * ht_prev) + (weights.output.x * xt) + weights.output.bias
    const output_gate = sigmoid(output_weighted)

    newSteps.push({
      title: "📤 Output Gate - Step 1: Multiply hₜ₋₁ by weight",
      content: (
        <div>
          <div className="formula">oₜ = σ(Wo · [hₜ₋₁, xₜ] + bo)</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Multiplying hₜ₋₁ by output gate weight:</strong><br />
              Wo[h] × hₜ₋₁ = {weights.output.h} × {ht_prev}
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(weights.output.h * ht_prev)}</span>
            </div>
          </div>
        </div>
      ),
      intermediate: weights.output.h * ht_prev
    })

    newSteps.push({
      title: "📤 Output Gate - Step 2: Multiply xₜ by weight",
      content: (
        <div>
          <div className="formula">oₜ = σ(Wo · [hₜ₋₁, xₜ] + bo)</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Multiplying xₜ by output gate weight:</strong><br />
              Wo[x] × xₜ = {weights.output.x} × {xt}
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(weights.output.x * xt)}</span>
            </div>
          </div>
        </div>
      ),
      intermediate: weights.output.x * xt
    })

    newSteps.push({
      title: "📤 Output Gate - Step 3: Add all terms together",
      content: (
        <div>
          <div className="formula">oₜ = σ(Wo · [hₜ₋₁, xₜ] + bo)</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Adding all terms:</strong><br />
              (Wo[h] × hₜ₋₁) + (Wo[x] × xₜ) + bo
            </div>
            <div className="math-operation">
              = ({formatNum(weights.output.h * ht_prev)}) + ({formatNum(weights.output.x * xt)}) + {weights.output.bias}
            </div>
            <div className="math-operation">
              = {formatNum(weights.output.h * ht_prev + weights.output.x * xt)} + {weights.output.bias}
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(output_weighted)}</span>
            </div>
          </div>
        </div>
      ),
      intermediate: output_weighted
    })

    const e_neg_x_output = Math.exp(-output_weighted)
    newSteps.push({
      title: "📤 Output Gate - Step 4: Apply Sigmoid Activation",
      content: (
        <div>
          <div className="formula">σ(x) = 1 / (1 + e^(-x))</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Calculating e^(-x):</strong><br />
              e^(-{formatNum(output_weighted)}) = {formatNum(e_neg_x_output)}
            </div>
            <div className="calculation-line">
              <strong>Calculating denominator:</strong><br />
              1 + e^(-{formatNum(output_weighted)}) = 1 + {formatNum(e_neg_x_output)} = {formatNum(1 + e_neg_x_output)}
            </div>
            <div className="math-operation">
              <strong>Final sigmoid:</strong><br />
              σ({formatNum(output_weighted)}) = 1 / {formatNum(1 + e_neg_x_output)}
            </div>
            <div className="result-box">
              oₜ = <span className="highlight">{formatNum(output_gate)}</span>
            </div>
          </div>
        </div>
      ),
      intermediate: output_gate,
      schemaValues: { ct_prev, ht_prev, xt, ft: forget_gate, it: input_gate, ctilde: candidate_gate, ot: output_gate }
    })

    // CELL STATE UPDATE
    const cell_forget_part = forget_gate * ct_prev
    const cell_input_part = input_gate * candidate_gate
    const cell_state = cell_forget_part + cell_input_part

    newSteps.push({
      title: "🔄 Cell State - Step 1: Forget Previous State",
      content: (
        <div>
          <div className="formula">Cₜ = fₜ ⊙ Cₜ₋₁ + iₜ ⊙ C̃ₜ</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Multiplying forget gate by previous cell state:</strong><br />
              fₜ ⊙ Cₜ₋₁ = {formatNum(forget_gate)} × {ct_prev}
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(cell_forget_part)}</span>
            </div>
            <div className="weights-info">
              This determines how much of the previous cell state we keep.
            </div>
          </div>
        </div>
      ),
      intermediate: cell_forget_part,
      schemaValues: { ct_prev, ht_prev, xt, ft: forget_gate, it: input_gate, ctilde: candidate_gate, ot: output_gate, ft_ct: cell_forget_part }
    })

    newSteps.push({
      title: "🔄 Cell State - Step 2: Add New Information",
      content: (
        <div>
          <div className="formula">Cₜ = fₜ ⊙ Cₜ₋₁ + iₜ ⊙ C̃ₜ</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Multiplying input gate by candidate values:</strong><br />
              iₜ ⊙ C̃ₜ = {formatNum(input_gate)} × {formatNum(candidate_gate)}
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(cell_input_part)}</span>
            </div>
            <div className="weights-info">
              This determines how much new information we add to the cell state.
            </div>
          </div>
        </div>
      ),
      intermediate: cell_input_part,
      schemaValues: { ct_prev, ht_prev, xt, ft: forget_gate, it: input_gate, ctilde: candidate_gate, ot: output_gate, ft_ct: cell_forget_part, it_ctilde: cell_input_part }
    })

    newSteps.push({
      title: "🔄 Cell State - Step 3: Combine Both Parts",
      content: (
        <div>
          <div className="formula">Cₜ = fₜ ⊙ Cₜ₋₁ + iₜ ⊙ C̃ₜ</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Adding both parts together:</strong><br />
              Cₜ = (fₜ ⊙ Cₜ₋₁) + (iₜ ⊙ C̃ₜ)
            </div>
            <div className="math-operation">
              = {formatNum(cell_forget_part)} + {formatNum(cell_input_part)}
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(cell_state)}</span>
            </div>
            <div className="result-box">
              Cₜ = <span className="highlight">{formatNum(cell_state)}</span>
            </div>
          </div>
        </div>
      ),
      intermediate: cell_state,
      schemaValues: { ct_prev, ht_prev, xt, ft: forget_gate, it: input_gate, ctilde: candidate_gate, ot: output_gate, ft_ct: cell_forget_part, it_ctilde: cell_input_part, ct: cell_state }
    })

    // HIDDEN STATE UPDATE
    const cell_tanh = tanh(cell_state)
    const hidden_state = output_gate * cell_tanh

    newSteps.push({
      title: "✨ Hidden State - Step 1: Apply Tanh to Cell State",
      content: (
        <div>
          <div className="formula">hₜ = oₜ ⊙ tanh(Cₜ)</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Applying tanh to the new cell state:</strong><br />
              tanh(Cₜ) = tanh({formatNum(cell_state)})
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(cell_tanh)}</span>
            </div>
            <div className="weights-info">
              This scales the cell state to values between -1 and 1.
            </div>
          </div>
        </div>
      ),
      intermediate: cell_tanh,
      schemaValues: { ct_prev, ht_prev, xt, ft: forget_gate, it: input_gate, ctilde: candidate_gate, ot: output_gate, ft_ct: cell_forget_part, it_ctilde: cell_input_part, ct: cell_state, tanh_ct: cell_tanh }
    })

    newSteps.push({
      title: "✨ Hidden State - Step 2: Multiply by Output Gate",
      content: (
        <div>
          <div className="formula">hₜ = oₜ ⊙ tanh(Cₜ)</div>
          <div className="calculation-detail">
            <div className="calculation-line">
              <strong>Multiplying output gate by tanh(Cₜ):</strong><br />
              oₜ ⊙ tanh(Cₜ) = {formatNum(output_gate)} × {formatNum(cell_tanh)}
            </div>
            <div className="math-operation">
              = <span className="highlight">{formatNum(hidden_state)}</span>
            </div>
            <div className="result-box">
              hₜ = <span className="highlight">{formatNum(hidden_state)}</span>
            </div>
            <div className="weights-info" style={{marginTop: '15px', background: '#d4edda', borderLeftColor: '#28a745'}}>
              <strong>🎉 Calculation Complete!</strong><br />
              The LSTM has processed the input and updated both the cell state (Cₜ) and hidden state (hₜ).
            </div>
          </div>
        </div>
      ),
      intermediate: hidden_state,
      schemaValues: { ct_prev, ht_prev, xt, ft: forget_gate, it: input_gate, ctilde: candidate_gate, ot: output_gate, ft_ct: cell_forget_part, it_ctilde: cell_input_part, ct: cell_state, tanh_ct: cell_tanh, ht: hidden_state }
    })

    setSteps(newSteps)
    setCurrentStep(0)
  }

  function nextStep() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  function previousStep() {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  function resetValues() {
    setInputs({ ht_prev: 1, xt: 1, ct_prev: 2 })
    setCurrentStep(0)
    setAutoPlay(false)
  }

  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0

  return (
    <div className="calculator-container">
      <div className="controls">
        <div className="control-group">
          <label>Short-Term Memory (hₜ₋₁):</label>
          <input 
            type="number" 
            value={inputs.ht_prev} 
            onChange={(e) => setInputs({...inputs, ht_prev: parseFloat(e.target.value)})}
            step="0.1"
          />
        </div>
        <div className="control-group">
          <label>Input (xₜ):</label>
          <input 
            type="number" 
            value={inputs.xt} 
            onChange={(e) => setInputs({...inputs, xt: parseFloat(e.target.value)})}
            step="0.1"
          />
        </div>
        <div className="control-group">
          <label>Previous Cell State (Cₜ₋₁):</label>
          <input 
            type="number" 
            value={inputs.ct_prev} 
            onChange={(e) => setInputs({...inputs, ct_prev: parseFloat(e.target.value)})}
            step="0.1"
          />
        </div>
        <button onClick={resetValues}>Reset</button>
      </div>

      <div className="input-display">
        <div className="input-box">
          <div className="input-label">hₜ₋₁ (Previous Hidden State)</div>
          <div className="input-value">{inputs.ht_prev}</div>
        </div>
        <div className="input-box">
          <div className="input-label">xₜ (Current Input)</div>
          <div className="input-value">{inputs.xt}</div>
        </div>
        <div className="input-box">
          <div className="input-label">Cₜ₋₁ (Previous Cell State)</div>
          <div className="input-value">{inputs.ct_prev}</div>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{width: `${progress}%`}}>
          Step {currentStep + 1} / {steps.length}
        </div>
      </div>

      <div className="step-controls">
        <button onClick={previousStep} disabled={currentStep === 0}>◀ Previous Step</button>
        <button onClick={nextStep} disabled={currentStep === steps.length - 1}>Next Step ▶</button>
        <button onClick={() => setAutoPlay(!autoPlay)}>
          {autoPlay ? 'Stop Auto Play' : 'Auto Play'}
        </button>
      </div>

      {steps.length > 0 && (
        <div className="current-step">
          <div className="step-title">{steps[currentStep].title}</div>
          {steps[currentStep].content}
        </div>
      )}
    </div>
  )
}

export default LSTMCalculator

