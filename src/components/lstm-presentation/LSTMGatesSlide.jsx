import React, { useState } from 'react'
import './LSTMGatesSlide.css'

function LSTMGatesSlide() {
  const [selectedGate, setSelectedGate] = useState('forget')

  const gates = {
    forget: {
      name: 'Forget Gate (Porte d\'Oubli)',
      symbol: 'fₜ',
      color: '#FFE66D',
      purpose: 'Décide quelle information oublier de l\'état précédent Cₜ₋₁',
      formula: 'fₜ = σ(W<sub>f</sub> · [hₜ₋₁, xₜ] + b<sub>f</sub>)',
      detailed: [
        'W<sub>f</sub> : Matrice de poids pour la Forget Gate',
        '[hₜ₋₁, xₜ] : Concatenation de l\'état caché précédent et de l\'entrée',
        'σ : Fonction sigmoid (produit des valeurs entre 0 et 1)',
        'b<sub>f</sub> : Biais (terme constant)'
      ],
      output: 'Valeur entre 0 (tout oublier) et 1 (tout garder)',
      example: 'Si fₜ = 0.3, on garde 30% de l\'information de Cₜ₋₁',
      role: 'Contrôle ce qui est oublié du Cell State précédent',
      mathOperation: 'Cₜ = fₜ * Cₜ₋₁ + iₜ * C̃ₜ',
      explanation: 'Multiplie élément par élément avec Cₜ₋₁ pour déterminer quelle information conserver.'
    },
    input: {
      name: 'Input Gate (Porte d\'Entrée)',
      symbol: 'iₜ',
      color: '#95E1D3',
      purpose: 'Décide quelle nouvelle information stocker dans le Cell State',
      formula: 'iₜ = σ(W<sub>i</sub> · [hₜ₋₁, xₜ] + b<sub>i</sub>)',
      detailed: [
        'W<sub>i</sub> : Matrice de poids pour l\'Input Gate',
        '[hₜ₋₁, xₜ] : Concatenation de l\'état caché précédent et de l\'entrée',
        'σ : Fonction sigmoid (produit des valeurs entre 0 et 1)',
        'b<sub>i</sub> : Biais (terme constant)'
      ],
      output: 'Valeur entre 0 (ne rien stocker) et 1 (tout stocker)',
      example: 'Si iₜ = 0.8, on stocke 80% de la nouvelle information',
      role: 'Contrôle quelle nouvelle information est ajoutée au Cell State',
      mathOperation: 'Cₜ = fₜ * Cₜ₋₁ + iₜ * C̃ₜ',
      explanation: 'Multiplie avec C̃ₜ pour déterminer quelle partie de la nouvelle information ajouter.'
    },
    candidate: {
      name: 'Candidate Values (Valeurs Candidates)',
      symbol: 'C̃ₜ',
      color: '#C7CEEA',
      purpose: 'Nouvelles valeurs candidates pour le Cell State',
      formula: 'C̃ₜ = tanh(W<sub>C</sub> · [hₜ₋₁, xₜ] + b<sub>C</sub>)',
      detailed: [
        'W<sub>C</sub> : Matrice de poids pour les valeurs candidates',
        '[hₜ₋₁, xₜ] : Concatenation de l\'état caché précédent et de l\'entrée',
        'tanh : Fonction d\'activation (produit des valeurs entre -1 et 1)',
        'b<sub>C</sub> : Biais (terme constant)'
      ],
      output: 'Valeurs candidates entre -1 et 1',
      example: 'C̃ₜ contient les nouvelles informations potentielles à stocker',
      role: 'Génère les nouvelles valeurs à ajouter au Cell State',
      mathOperation: 'Utilisé avec Input Gate : iₜ * C̃ₜ',
      explanation: 'Représente les nouvelles informations potentielles, filtrées par l\'Input Gate.'
    },
    output: {
      name: 'Output Gate (Porte de Sortie)',
      symbol: 'oₜ',
      color: '#F38181',
      purpose: 'Décide quelle partie du Cell State utiliser pour la sortie',
      formula: 'oₜ = σ(W<sub>o</sub> · [hₜ₋₁, xₜ] + b<sub>o</sub>)',
      detailed: [
        'W<sub>o</sub> : Matrice de poids pour l\'Output Gate',
        '[hₜ₋₁, xₜ] : Concatenation de l\'état caché précédent et de l\'entrée',
        'σ : Fonction sigmoid (produit des valeurs entre 0 et 1)',
        'b<sub>o</sub> : Biais (terme constant)'
      ],
      output: 'Valeur entre 0 (rien utiliser) et 1 (tout utiliser)',
      example: 'Si oₜ = 0.6, on utilise 60% du Cell State pour la sortie',
      role: 'Contrôle quelle partie du Cell State devient le Hidden State',
      mathOperation: 'hₜ = oₜ * tanh(Cₜ)',
      explanation: 'Filtre le Cell State (après tanh) pour produire le Hidden State final.'
    },
    cellState: {
      name: 'Cell State Update (Mise à Jour)',
      symbol: 'Cₜ',
      color: '#FF6B6B',
      purpose: 'Mémoire à long terme mise à jour',
      formula: 'Cₜ = fₜ * Cₜ₋₁ + iₜ * C̃ₜ',
      detailed: [
        'fₜ * Cₜ₋₁ : Partie conservée de l\'état précédent (via Forget Gate)',
        'iₜ * C̃ₜ : Nouvelle information ajoutée (via Input Gate)',
        '* : Multiplication élément par élément (Hadamard product)',
        'Résultat : Nouveau Cell State (mémoire à long terme)'
      ],
      output: 'Nouveau Cell State (mémoire à long terme)',
      example: 'Combine l\'information conservée (fₜ * Cₜ₋₁) et la nouvelle information (iₜ * C̃ₜ)',
      role: 'Stocke l\'information à long terme de manière stable',
      mathOperation: 'Cₜ = fₜ * Cₜ₋₁ + iₜ * C̃ₜ',
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
                <p className="main-formula" dangerouslySetInnerHTML={{ __html: currentGate.formula }}></p>
                <div className="formula-breakdown">
                  {currentGate.detailed.map((detail, index) => (
                    <p key={index} className="formula-detail" dangerouslySetInnerHTML={{ __html: `• ${detail}` }}></p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LSTMGatesSlide
