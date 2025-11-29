import React, { useState } from 'react'
import './LSTMPlayground.css'

function LSTMPlayground({ presentationMode = false }) {
  const [inputs, setInputs] = useState({
    ht_prev: 0.5,
    xt: 0.8,
    ct_prev: 1.0
  })
  const [weights, setWeights] = useState({
    forget: { h: 2.70, x: 1.63, bias: 1.62 },
    input: { h: 2.00, x: 1.65, bias: 0.62 },
    candidate: { h: 1.41, x: 0.94, bias: -0.32 },
    output: { h: 1.50, x: 1.20, bias: 0.50 }
  })
  const [results, setResults] = useState(null)

  function sigmoid(x) {
    return 1 / (1 + Math.exp(-x))
  }

  function tanh(x) {
    return Math.tanh(x)
  }

  function calculateLSTM() {
    const { ht_prev, xt, ct_prev } = inputs
    const w = weights

    // Forget Gate
    const ft_z = w.forget.h * ht_prev + w.forget.x * xt + w.forget.bias
    const ft = sigmoid(ft_z)

    // Input Gate
    const it_z = w.input.h * ht_prev + w.input.x * xt + w.input.bias
    const it = sigmoid(it_z)

    // Candidate Values
    const ctilde_z = w.candidate.h * ht_prev + w.candidate.x * xt + w.candidate.bias
    const ctilde = tanh(ctilde_z)

    // Cell State Update
    const ct = ft * ct_prev + it * ctilde

    // Output Gate
    const ot_z = w.output.h * ht_prev + w.output.x * xt + w.output.bias
    const ot = sigmoid(ot_z)

    // Hidden State
    const ht = ot * tanh(ct)

    setResults({
      ft: { z: ft_z, value: ft },
      it: { z: it_z, value: it },
      ctilde: { z: ctilde_z, value: ctilde },
      ct,
      ot: { z: ot_z, value: ot },
      ht,
      tanh_ct: tanh(ct)
    })
  }

  function resetWeights() {
    setWeights({
      forget: { h: 2.70, x: 1.63, bias: 1.62 },
      input: { h: 2.00, x: 1.65, bias: 0.62 },
      candidate: { h: 1.41, x: 0.94, bias: -0.32 },
      output: { h: 1.50, x: 1.20, bias: 0.50 }
    })
  }

  function resetInputs() {
    setInputs({
      ht_prev: 0.5,
      xt: 0.8,
      ct_prev: 1.0
    })
    setResults(null)
  }

  return (
    <div className={`lstm-playground-container ${presentationMode ? 'presentation-mode' : ''}`}>
      {!presentationMode && (
        <>
          <h2>🧪 LSTM Playground - Testez et Expérimentez</h2>
          <p className="playground-intro">
            Modifiez les poids des gates, les entrées et observez l'impact sur chaque gate et le résultat final. Expérimentez pour comprendre comment LSTM fonctionne !
          </p>
        </>
      )}

      <div className="playground-layout">
        <div className="inputs-panel">
          <h3>📥 Entrées</h3>
          <div className="input-controls">
            <div className="input-item">
              <label>hₜ₋₁ (Hidden State précédent)</label>
              <input
                type="number"
                value={inputs.ht_prev}
                onChange={(e) => setInputs({...inputs, ht_prev: parseFloat(e.target.value) || 0})}
                step="0.1"
              />
            </div>
            <div className="input-item">
              <label>xₜ (Entrée actuelle)</label>
              <input
                type="number"
                value={inputs.xt}
                onChange={(e) => setInputs({...inputs, xt: parseFloat(e.target.value) || 0})}
                step="0.1"
              />
            </div>
            <div className="input-item">
              <label>Cₜ₋₁ (Cell State précédent)</label>
              <input
                type="number"
                value={inputs.ct_prev}
                onChange={(e) => setInputs({...inputs, ct_prev: parseFloat(e.target.value) || 0})}
                step="0.1"
              />
            </div>
          </div>
        </div>

        <div className="weights-panel">
          <h3>⚙️ Poids des Gates (Modifiables)</h3>
          
          {Object.entries(weights).map(([gateName, gateWeights]) => (
            <div key={gateName} className="gate-weights">
              <div className="gate-title">
                {gateName === 'forget' && '🚪 Forget Gate'}
                {gateName === 'input' && '📥 Input Gate'}
                {gateName === 'candidate' && '📊 Candidate Values'}
                {gateName === 'output' && '📤 Output Gate'}
              </div>
              <div className="weights-row">
                <div className="weight-item">
                  <label>Wₕ (poids h)</label>
                  <input
                    type="number"
                    value={gateWeights.h}
                    onChange={(e) => setWeights({
                      ...weights,
                      [gateName]: {...gateWeights, h: parseFloat(e.target.value) || 0}
                    })}
                    step="0.1"
                  />
                </div>
                <div className="weight-item">
                  <label>Wₓ (poids x)</label>
                  <input
                    type="number"
                    value={gateWeights.x}
                    onChange={(e) => setWeights({
                      ...weights,
                      [gateName]: {...gateWeights, x: parseFloat(e.target.value) || 0}
                    })}
                    step="0.1"
                  />
                </div>
                <div className="weight-item">
                  <label>b (biais)</label>
                  <input
                    type="number"
                    value={gateWeights.bias}
                    onChange={(e) => setWeights({
                      ...weights,
                      [gateName]: {...gateWeights, bias: parseFloat(e.target.value) || 0}
                    })}
                    step="0.1"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="playground-actions">
        <button className="calculate-btn" onClick={calculateLSTM}>
          🧮 Calculer LSTM
        </button>
        <button className="reset-btn" onClick={resetWeights}>
          🔄 Réinitialiser Poids
        </button>
        <button className="reset-btn" onClick={resetInputs}>
          🔄 Réinitialiser Entrées
        </button>
      </div>

      {results && (
        <div className="results-panel">
          <h3>📊 Résultats Détaillés</h3>
          
          <div className="gates-results">
            <div className="gate-result">
              <div className="gate-header">🚪 Forget Gate</div>
              <div className="gate-formula">fₜ = σ(Wf·hₜ₋₁ + Wf·xₜ + bf)</div>
              <div className="gate-calculation">
                z = {weights.forget.h} × {inputs.ht_prev} + {weights.forget.x} × {inputs.xt} + {weights.forget.bias} = {results.ft.z.toFixed(4)}
              </div>
              <div className="gate-value">fₜ = σ({results.ft.z.toFixed(4)}) = <strong>{results.ft.value.toFixed(4)}</strong></div>
            </div>

            <div className="gate-result">
              <div className="gate-header">📥 Input Gate</div>
              <div className="gate-formula">iₜ = σ(Wi·hₜ₋₁ + Wi·xₜ + bi)</div>
              <div className="gate-calculation">
                z = {weights.input.h} × {inputs.ht_prev} + {weights.input.x} × {inputs.xt} + {weights.input.bias} = {results.it.z.toFixed(4)}
              </div>
              <div className="gate-value">iₜ = σ({results.it.z.toFixed(4)}) = <strong>{results.it.value.toFixed(4)}</strong></div>
            </div>

            <div className="gate-result">
              <div className="gate-header">📊 Candidate Values</div>
              <div className="gate-formula">C̃ₜ = tanh(WC·hₜ₋₁ + WC·xₜ + bC)</div>
              <div className="gate-calculation">
                z = {weights.candidate.h} × {inputs.ht_prev} + {weights.candidate.x} × {inputs.xt} + {weights.candidate.bias} = {results.ctilde.z.toFixed(4)}
              </div>
              <div className="gate-value">C̃ₜ = tanh({results.ctilde.z.toFixed(4)}) = <strong>{results.ctilde.value.toFixed(4)}</strong></div>
            </div>

            <div className="gate-result highlight">
              <div className="gate-header">💾 Cell State</div>
              <div className="gate-formula">Cₜ = fₜ ⊙ Cₜ₋₁ + iₜ ⊙ C̃ₜ</div>
              <div className="gate-calculation">
                Cₜ = {results.ft.value.toFixed(4)} × {inputs.ct_prev} + {results.it.value.toFixed(4)} × {results.ctilde.value.toFixed(4)}
              </div>
              <div className="gate-value">Cₜ = <strong>{results.ct.toFixed(4)}</strong></div>
            </div>

            <div className="gate-result">
              <div className="gate-header">📤 Output Gate</div>
              <div className="gate-formula">oₜ = σ(Wo·hₜ₋₁ + Wo·xₜ + bo)</div>
              <div className="gate-calculation">
                z = {weights.output.h} × {inputs.ht_prev} + {weights.output.x} × {inputs.xt} + {weights.output.bias} = {results.ot.z.toFixed(4)}
              </div>
              <div className="gate-value">oₜ = σ({results.ot.z.toFixed(4)}) = <strong>{results.ot.value.toFixed(4)}</strong></div>
            </div>

            <div className="gate-result final">
              <div className="gate-header">🎯 Hidden State Final</div>
              <div className="gate-formula">hₜ = oₜ ⊙ tanh(Cₜ)</div>
              <div className="gate-calculation">
                hₜ = {results.ot.value.toFixed(4)} × tanh({results.ct.toFixed(4)})
              </div>
              <div className="gate-value">hₜ = {results.ot.value.toFixed(4)} × {results.tanh_ct.toFixed(4)} = <strong>{results.ht.toFixed(4)}</strong></div>
            </div>
          </div>
        </div>
      )}

      <div className="experiment-tips">
        <h4>💡 Expériences à Essayer :</h4>
        <div className="tips-grid">
          <div className="tip-item">
            <strong>Test 1 : Forget Gate à 0</strong>
            <p>Mettez tous les poids du Forget Gate à 0. Que se passe-t-il au Cell State ?</p>
          </div>
          <div className="tip-item">
            <strong>Test 2 : Input Gate à 0</strong>
            <p>Mettez tous les poids de l'Input Gate à 0. Le Cell State change-t-il ?</p>
          </div>
          <div className="tip-item">
            <strong>Test 3 : Poids très grands</strong>
            <p>Augmentez les poids à 10. Que se passe-t-il aux gates ?</p>
          </div>
          <div className="tip-item">
            <strong>Test 4 : Biais négatif</strong>
            <p>Mettez un biais très négatif (-5). Comment cela affecte-t-il le gate ?</p>
          </div>
          <div className="tip-item">
            <strong>Test 5 : Cell State constant</strong>
            <p>Essayez fₜ = 1 et iₜ = 0. Le Cell State reste-t-il constant ?</p>
          </div>
          <div className="tip-item">
            <strong>Test 6 : Comparaison</strong>
            <p>Changez seulement Cₜ₋₁ et observez l'impact sur Cₜ et hₜ</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LSTMPlayground

