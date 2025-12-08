import React, { useState } from 'react'
import './LSTMGatesSlide.css'

function LSTMGatesSlide() {
  const [selectedGate, setSelectedGate] = useState('forget')

  const gates = {
    forget: {
      name: 'Forget Gate (Porte d\'Oubli)',
      symbol: 'f_t',
      color: '#FFE66D',
      purpose: 'Décide quelle information oublier de l\'état précédent C_{t-1}',
      formula: 'f_t = σ(W_f · [h_{t-1}, x_t] + b_f)',
      detailed: [
        'W_f : Matrice de poids pour la Forget Gate',
        '[h_{t-1}, x_t] : Concatenation de l\'état caché précédent et de l\'entrée',
        'σ : Fonction sigmoid (produit des valeurs entre 0 et 1)',
        'b_f : Biais (terme constant)'
      ],
      output: 'Valeur entre 0 (tout oublier) et 1 (tout garder)',
      example: 'Si f_t = 0.3, on garde 30% de l\'information de C_{t-1}',
      role: 'Contrôle ce qui est oublié du Cell State précédent',
      mathOperation: 'C_t = f_t * C_{t-1} + i_t * C̃_t',
      explanation: 'Multiplie élément par élément avec C_{t-1} pour déterminer quelle information conserver.'
    },
    input: {
      name: 'Input Gate (Porte d\'Entrée)',
      symbol: 'i_t',
      color: '#95E1D3',
      purpose: 'Décide quelle nouvelle information stocker dans le Cell State',
      formula: 'i_t = σ(W_i · [h_{t-1}, x_t] + b_i)',
      detailed: [
        'W_i : Matrice de poids pour l\'Input Gate',
        '[h_{t-1}, x_t] : Concatenation de l\'état caché précédent et de l\'entrée',
        'σ : Fonction sigmoid (produit des valeurs entre 0 et 1)',
        'b_i : Biais (terme constant)'
      ],
      output: 'Valeur entre 0 (ne rien stocker) et 1 (tout stocker)',
      example: 'Si i_t = 0.8, on stocke 80% de la nouvelle information',
      role: 'Contrôle quelle nouvelle information est ajoutée au Cell State',
      mathOperation: 'C_t = f_t * C_{t-1} + i_t * C̃_t',
      explanation: 'Multiplie avec C̃_t pour déterminer quelle partie de la nouvelle information ajouter.'
    },
    candidate: {
      name: 'Candidate Values (Valeurs Candidates)',
      symbol: 'C̃_t',
      color: '#C7CEEA',
      purpose: 'Nouvelles valeurs candidates pour le Cell State',
      formula: 'C̃_t = tanh(W_C · [h_{t-1}, x_t] + b_C)',
      detailed: [
        'W_C : Matrice de poids pour les valeurs candidates',
        '[h_{t-1}, x_t] : Concatenation de l\'état caché précédent et de l\'entrée',
        'tanh : Fonction d\'activation (produit des valeurs entre -1 et 1)',
        'b_C : Biais (terme constant)'
      ],
      output: 'Valeurs candidates entre -1 et 1',
      example: 'C̃_t contient les nouvelles informations potentielles à stocker',
      role: 'Génère les nouvelles valeurs à ajouter au Cell State',
      mathOperation: 'Utilisé avec Input Gate : i_t * C̃_t',
      explanation: 'Représente les nouvelles informations potentielles, filtrées par l\'Input Gate.'
    },
    output: {
      name: 'Output Gate (Porte de Sortie)',
      symbol: 'o_t',
      color: '#F38181',
      purpose: 'Décide quelle partie du Cell State utiliser pour la sortie',
      formula: 'o_t = σ(W_o · [h_{t-1}, x_t] + b_o)',
      detailed: [
        'W_o : Matrice de poids pour l\'Output Gate',
        '[h_{t-1}, x_t] : Concatenation de l\'état caché précédent et de l\'entrée',
        'σ : Fonction sigmoid (produit des valeurs entre 0 et 1)',
        'b_o : Biais (terme constant)'
      ],
      output: 'Valeur entre 0 (rien utiliser) et 1 (tout utiliser)',
      example: 'Si o_t = 0.6, on utilise 60% du Cell State pour la sortie',
      role: 'Contrôle quelle partie du Cell State devient le Hidden State',
      mathOperation: 'h_t = o_t * tanh(C_t)',
      explanation: 'Filtre le Cell State (après tanh) pour produire le Hidden State final.'
    },
    cellState: {
      name: 'Cell State Update (Mise à Jour)',
      symbol: 'C_t',
      color: '#FF6B6B',
      purpose: 'Mémoire à long terme mise à jour',
      formula: 'C_t = f_t * C_{t-1} + i_t * C̃_t',
      detailed: [
        'f_t * C_{t-1} : Partie conservée de l\'état précédent (via Forget Gate)',
        'i_t * C̃_t : Nouvelle information ajoutée (via Input Gate)',
        '* : Multiplication élément par élément (Hadamard product)',
        'Résultat : Nouveau Cell State (mémoire à long terme)'
      ],
      output: 'Nouveau Cell State (mémoire à long terme)',
      example: 'Combine l\'information conservée (f_t * C_{t-1}) et la nouvelle information (i_t * C̃_t)',
      role: 'Stocke l\'information à long terme de manière stable',
      mathOperation: 'C_t = f_t * C_{t-1} + i_t * C̃_t',
      explanation: 'Le Cell State peut traverser plusieurs étapes sans être modifié, permettant de conserver l\'information sur de longues séquences.'
    }
  }

  const currentGate = gates[selectedGate]

  return (
    <div className="slide lstm-gates-slide">
      <h1 className="slide-title-main">Les Gates de LSTM</h1>
      
      <div className="gates-container">
        <div className="gates-selector">
          {Object.keys(gates).map((gateKey) => (
            <button
              key={gateKey}
              className={`gate-btn ${selectedGate === gateKey ? 'active' : ''}`}
              onClick={() => setSelectedGate(gateKey)}
              style={{ borderColor: gates[gateKey].color }}
            >
              <div className="gate-btn-color" style={{ backgroundColor: gates[gateKey].color }}></div>
              <span>{gates[gateKey].symbol}</span>
            </button>
          ))}
        </div>

        <div className="gate-details">
          <div className="gate-header" style={{ borderLeftColor: currentGate.color }}>
            <h2>{currentGate.name}</h2>
            <p className="gate-purpose">{currentGate.purpose}</p>
          </div>

          <div className="gate-content">
            <div className="formula-section">
              <h3>📐 Formule Mathématique :</h3>
              <div className="formula-box" style={{ borderColor: currentGate.color }}>
                <p className="main-formula">{currentGate.formula}</p>
                <div className="formula-breakdown">
                  {currentGate.detailed.map((detail, index) => (
                    <p key={index} className="formula-detail">• {detail}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="operation-section">
              <h3>⚙️ Opération Mathématique :</h3>
              <div className="operation-box">
                <p className="operation-formula">{currentGate.mathOperation}</p>
                <p className="operation-explanation">{currentGate.explanation}</p>
              </div>
            </div>

            <div className="output-section">
              <h3>📤 Sortie :</h3>
              <div className="output-box">
                <p><strong>{currentGate.output}</strong></p>
                <p className="example-text">💡 {currentGate.example}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="gates-summary">
          <h3>Résumé des 5 Neurones LSTM :</h3>
          <div className="summary-grid">
            {Object.entries(gates).map(([key, gate]) => (
              <div 
                key={key} 
                className={`summary-item ${selectedGate === key ? 'active' : ''}`}
                onClick={() => setSelectedGate(key)}
              >
                <div className="summary-color" style={{ backgroundColor: gate.color }}></div>
                <div className="summary-info">
                  <strong>{gate.symbol}</strong>
                  <p>{gate.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="complete-formula">
          <h3>Formule Complète LSTM (Séquence Complète) :</h3>
          <div className="formula-sequence">
            <p><strong>1. Forget Gate :</strong> {'f_t = σ(W_f · [h_{t-1}, x_t] + b_f)'}</p>
            <p><strong>2. Input Gate :</strong> {'i_t = σ(W_i · [h_{t-1}, x_t] + b_i)'}</p>
            <p><strong>3. Candidate Values :</strong> {'C̃_t = tanh(W_C · [h_{t-1}, x_t] + b_C)'}</p>
            <p><strong>4. Cell State :</strong> {'C_t = f_t * C_{t-1} + i_t * C̃_t'}</p>
            <p><strong>5. Output Gate :</strong> {'o_t = σ(W_o · [h_{t-1}, x_t] + b_o)'}</p>
            <p><strong>6. Hidden State :</strong> {'h_t = o_t * tanh(C_t)'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LSTMGatesSlide
