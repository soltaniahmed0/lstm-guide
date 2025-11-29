import React, { useState } from 'react'
import './RNNPlayground.css'

function RNNPlayground({ presentationMode = false }) {
  const [inputs, setInputs] = useState({
    x: [1, 0.5],
    h0: [0, 0, 0]
  })
  const [weights, setWeights] = useState({
    W: [[0.5, 0.3], [0.2, 0.4], [0.1, 0.6]],
    U: [[0.3, 0.2, 0.1], [0.4, 0.3, 0.2], [0.2, 0.4, 0.3]],
    b: [0.1, 0.2, 0.1]
  })
  const [results, setResults] = useState(null)
  const [showDetails, setShowDetails] = useState(true)

  function sigmoid(x) {
    return 1 / (1 + Math.exp(-x))
  }

  function tanh(x) {
    return Math.tanh(x)
  }

  function matrixMultiply(A, B) {
    if (typeof B[0] === 'number') {
      // Vector multiplication
      return A.map(row => row.reduce((sum, val, i) => sum + val * B[i], 0))
    }
    // Matrix multiplication
    return A.map(row => 
      B[0].map((_, j) => 
        row.reduce((sum, val, i) => sum + val * B[i][j], 0)
      )
    )
  }

  function vectorAdd(a, b) {
    return a.map((val, i) => val + b[i])
  }

  function calculateRNN() {
    const { x, h0 } = inputs
    const { W, U, b } = weights

    // z = W·x + U·h0 + b
    const Wx = matrixMultiply(W, x)
    const Uh0 = matrixMultiply(U, h0)
    const z = vectorAdd(vectorAdd(Wx, Uh0), b)

    // h = tanh(z)
    const h = z.map(val => tanh(val))

    setResults({
      z,
      h,
      calculations: {
        Wx,
        Uh0,
        b,
        z_intermediate: vectorAdd(Wx, Uh0)
      }
    })
  }

  function resetWeights() {
    setWeights({
      W: [[0.5, 0.3], [0.2, 0.4], [0.1, 0.6]],
      U: [[0.3, 0.2, 0.1], [0.4, 0.3, 0.2], [0.2, 0.4, 0.3]],
      b: [0.1, 0.2, 0.1]
    })
  }

  function resetInputs() {
    setInputs({
      x: [1, 0.5],
      h0: [0, 0, 0]
    })
    setResults(null)
  }

  return (
    <div className={`rnn-playground-container ${presentationMode ? 'presentation-mode' : ''}`}>
      {!presentationMode && (
        <>
          <h2>🧪 RNN Playground - Testez et Expérimentez</h2>
          <p className="playground-intro">
            Modifiez les poids, les entrées et observez les résultats en temps réel. Expérimentez pour comprendre comment les RNN fonctionnent !
          </p>
        </>
      )}

      <div className="playground-grid">
        <div className="playground-section inputs-section">
          <h3>📥 Entrées</h3>
          
          <div className="input-group">
            <label>Entrée (x) :</label>
            <div className="vector-input">
              <input
                type="number"
                value={inputs.x[0]}
                onChange={(e) => setInputs({
                  ...inputs,
                  x: [parseFloat(e.target.value) || 0, inputs.x[1]]
                })}
                step="0.1"
                placeholder="x[0]"
              />
              <input
                type="number"
                value={inputs.x[1]}
                onChange={(e) => setInputs({
                  ...inputs,
                  x: [inputs.x[0], parseFloat(e.target.value) || 0]
                })}
                step="0.1"
                placeholder="x[1]"
              />
            </div>
            <div className="vector-display">x = [{inputs.x[0]}, {inputs.x[1]}]</div>
          </div>

          <div className="input-group">
            <label>État Initial (h₀) :</label>
            <div className="vector-input">
              {inputs.h0.map((val, i) => (
                <input
                  key={i}
                  type="number"
                  value={val}
                  onChange={(e) => {
                    const newH0 = [...inputs.h0]
                    newH0[i] = parseFloat(e.target.value) || 0
                    setInputs({ ...inputs, h0: newH0 })
                  }}
                  step="0.1"
                  placeholder={`h₀[${i}]`}
                />
              ))}
            </div>
            <div className="vector-display">h₀ = [{inputs.h0.map(v => v.toFixed(2)).join(', ')}]</div>
          </div>
        </div>

        <div className="playground-section weights-section">
          <h3>⚙️ Poids (Modifiables)</h3>
          
          <div className="weights-group">
            <label>W (Poids pour l'entrée) :</label>
            <div className="matrix-input">
              {weights.W.map((row, i) => (
                <div key={i} className="matrix-row">
                  {row.map((val, j) => (
                    <input
                      key={j}
                      type="number"
                      value={val}
                      onChange={(e) => {
                        const newW = weights.W.map(r => [...r])
                        newW[i][j] = parseFloat(e.target.value) || 0
                        setWeights({ ...weights, W: newW })
                      }}
                      step="0.1"
                      className="matrix-cell"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="weights-group">
            <label>U (Poids pour l'état caché) :</label>
            <div className="matrix-input">
              {weights.U.map((row, i) => (
                <div key={i} className="matrix-row">
                  {row.map((val, j) => (
                    <input
                      key={j}
                      type="number"
                      value={val}
                      onChange={(e) => {
                        const newU = weights.U.map(r => [...r])
                        newU[i][j] = parseFloat(e.target.value) || 0
                        setWeights({ ...weights, U: newU })
                      }}
                      step="0.1"
                      className="matrix-cell"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="weights-group">
            <label>b (Biais) :</label>
            <div className="vector-input">
              {weights.b.map((val, i) => (
                <input
                  key={i}
                  type="number"
                  value={val}
                  onChange={(e) => {
                    const newB = [...weights.b]
                    newB[i] = parseFloat(e.target.value) || 0
                    setWeights({ ...weights, b: newB })
                  }}
                  step="0.1"
                  placeholder={`b[${i}]`}
                />
              ))}
            </div>
            <div className="vector-display">b = [{weights.b.map(v => v.toFixed(2)).join(', ')}]</div>
          </div>
        </div>
      </div>

      <div className="playground-actions">
        <button className="calculate-btn" onClick={calculateRNN}>
          🧮 Calculer h₁
        </button>
        <button className="reset-btn" onClick={resetWeights}>
          🔄 Réinitialiser Poids
        </button>
        <button className="reset-btn" onClick={resetInputs}>
          🔄 Réinitialiser Entrées
        </button>
      </div>

      {results && (
        <div className="results-section">
          <h3>📊 Résultats</h3>
          
          <div className="formula-box">
            <strong>Formule :</strong> h₁ = tanh(W·x + U·h₀ + b)
          </div>

          {showDetails && (
            <div className="calculation-steps">
              <div className="calc-step">
                <div className="step-label">1. W · x</div>
                <div className="step-result">
                  [{results.calculations.Wx.map(v => v.toFixed(4)).join(', ')}]
                </div>
              </div>
              <div className="calc-step">
                <div className="step-label">2. U · h₀</div>
                <div className="step-result">
                  [{results.calculations.Uh0.map(v => v.toFixed(4)).join(', ')}]
                </div>
              </div>
              <div className="calc-step">
                <div className="step-label">3. W·x + U·h₀</div>
                <div className="step-result">
                  [{results.calculations.z_intermediate.map(v => v.toFixed(4)).join(', ')}]
                </div>
              </div>
              <div className="calc-step">
                <div className="step-label">4. + b</div>
                <div className="step-result">
                  [{results.calculations.b.map(v => v.toFixed(4)).join(', ')}]
                </div>
              </div>
              <div className="calc-step">
                <div className="step-label">5. z = W·x + U·h₀ + b</div>
                <div className="step-result highlight">
                  [{results.z.map(v => v.toFixed(4)).join(', ')}]
                </div>
              </div>
              <div className="calc-step">
                <div className="step-label">6. h₁ = tanh(z)</div>
                <div className="step-result highlight final">
                  [{results.h.map(v => v.toFixed(4)).join(', ')}]
                </div>
              </div>
            </div>
          )}

          <div className="final-result">
            <div className="result-item">
              <div className="result-label">État Caché Final (h₁) :</div>
              <div className="result-value">
                [{results.h.map(v => v.toFixed(4)).join(', ')}]
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="experiment-tips">
        <h4>💡 Conseils pour Expérimenter :</h4>
        <ul>
          <li>Essayez de mettre tous les poids à 0 et observez le résultat</li>
          <li>Augmentez les poids de W et voyez l'impact sur h₁</li>
          <li>Modifiez h₀ et observez comment il influence le résultat</li>
          <li>Testez avec des valeurs négatives dans les poids</li>
          <li>Comparez les résultats avec différents biais</li>
        </ul>
      </div>
    </div>
  )
}

export default RNNPlayground

