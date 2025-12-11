import React, { useState } from 'react'
import './LSTMGatesSlide.css'
import gatesImage from '../../img/6.png'

function LSTMGatesSlide() {
  const [selectedGate, setSelectedGate] = useState('forget')

  const gates = {
    forget: {
      name: 'Forget Gate (Porte d\'Oubli)',
      symbol: 'fₜ',
      color: '#FFE66D',
      purpose: 'Décide quelle information oublier de l\'état précédent Cₜ₋₁. Contrôle la rétention de la mémoire à long terme.',
      formula: 'f<sub>t</sub> = σ(W<sub>hf</sub>h<sub>t-1</sub> + W<sub>xf</sub>x<sub>t</sub> + b<sub>f</sub>)',
      detailed: [
        'W<sub>hf</sub> : Matrice de poids pour h<sub>t-1</sub> (hidden state précédent)',
        'W<sub>xf</sub> : Matrice de poids pour x<sub>t</sub> (input actuel)',
        'σ : Fonction sigmoid (produit des valeurs entre 0 et 1)',
        'b<sub>f</sub> : Biais (terme constant)',
        '0 : Oublier complètement',
        '1 : Garder complètement',
        'Résultat : Valeur entre 0 (tout oublier) et 1 (tout garder)'
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
      purpose: 'Décide quelle nouvelle information stocker dans le Cell State. Détermine l\'importance des nouvelles données.',
      formula: 'i<sub>t</sub> = σ(W<sub>hi</sub>h<sub>t-1</sub> + W<sub>xi</sub>x<sub>t</sub> + b<sub>i</sub>)',
      detailed: [
        'W<sub>hi</sub> : Matrice de poids pour h<sub>t-1</sub> (hidden state précédent)',
        'W<sub>xi</sub> : Matrice de poids pour x<sub>t</sub> (input actuel)',
        'σ : Fonction sigmoid (produit des valeurs entre 0 et 1)',
        'b<sub>i</sub> : Biais (terme constant)',
        'Résultat : Valeur entre 0 (ne rien stocker) et 1 (tout stocker)'
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
      purpose: 'Nouvelles valeurs candidates pour le Cell State. Génère les informations potentielles à ajouter à la mémoire.',
      formula: 'C̃<sub>t</sub> = tanh(W<sub>c̃h</sub>h<sub>t-1</sub> + W<sub>c̃x</sub>x<sub>t</sub> + b<sub>c̃</sub>)',
      detailed: [
        'W<sub>c̃h</sub> : Matrice de poids pour h<sub>t-1</sub> (hidden state précédent)',
        'W<sub>c̃x</sub> : Matrice de poids pour x<sub>t</sub> (input actuel)',
        'tanh : Fonction d\'activation (produit des valeurs entre -1 et 1)',
        'b<sub>c̃</sub> : Biais (terme constant)',
        'Résultat : Valeurs candidates entre -1 et 1, filtrées par l\'Input Gate'
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
      purpose: 'Décide quelle partie du Cell State utiliser pour la sortie. Un vecteur de valeurs entre 0 et 1.',
      formula: 'o<sub>t</sub> = σ(W<sub>ho</sub>h<sub>t-1</sub> + W<sub>xo</sub>x<sub>t</sub> + b<sub>o</sub>)',
      detailed: [
        'W<sub>ho</sub> : Matrice de poids pour h<sub>t-1</sub>',
        'W<sub>xo</sub> : Matrice de poids pour x<sub>t</sub>',
        'σ : Fonction sigmoid (produit des valeurs entre 0 et 1)',
        'b<sub>o</sub> : Biais (terme constant)',
        'Résultat : Un vecteur de valeurs entre 0 et 1 qui filtre le Cell State',
        '',
        'Produit final (h<sub>t</sub>) :',
        'h<sub>t</sub> = o<sub>t</sub> * tanh(c<sub>t</sub>)',
        'État caché qui sera utilisé comme sortie et comme entrée pour l\'étape suivante.'
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
      purpose: 'Mémoire à long terme mise à jour. Combine l\'information conservée et la nouvelle information pour créer la mémoire finale.',
      formula: 'c<sub>t</sub> = f<sub>t</sub> * c<sub>t-1</sub> + i<sub>t</sub> * C̃<sub>t</sub>',
      detailed: [
        'f<sub>t</sub> * c<sub>t-1</sub> : Partie conservée de l\'état précédent (via Forget Gate)',
        'i<sub>t</sub> * C̃<sub>t</sub> : Nouvelle information ajoutée (via Input Gate et Candidate Values)',
        '* : Multiplication élément par élément (Hadamard product)',
        '+ : Addition élément par élément',
        'Résultat : Nouveau Cell State (mémoire à long terme stable)'
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

      <h1 className="slide-title-main">Les Gates de LSTM</h1>
      
      <div className="gates-container">
        <div className="gates-image-section">
          <img src={gatesImage} alt="LSTM Gates" className="gates-image" />
        </div>

        <div className="gates-content-wrapper">

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
    </div>
  )
}

export default LSTMGatesSlide
