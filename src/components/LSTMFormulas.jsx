import React, { useState } from 'react'
import './LSTMFormulas.css'

function LSTMFormulas({ presentationMode = false }) {
  const [activeGate, setActiveGate] = useState('forget')

  const gates = {
    forget: {
      name: "Forget Gate (Porte d'Oubli)",
      symbol: "fₜ",
      purpose: "Décide quelle information oublier de la mémoire précédente",
      formula: "fₜ = σ(Wf · [hₜ₋₁, xₜ] + bf)",
      formulaDetailed: `fₜ = σ(Wf · [hₜ₋₁, xₜ] + bf)

Où:
• σ = fonction sigmoïde (0 à 1)
• Wf = matrice de poids pour le forget gate
• hₜ₋₁ = état caché précédent
• xₜ = entrée actuelle
• bf = biais du forget gate`,
      explanation: "Le forget gate produit une valeur entre 0 et 1 pour chaque élément du Cell State précédent. Si fₜ ≈ 0, l'information est oubliée. Si fₜ ≈ 1, l'information est gardée.",
      example: "Si Cₜ₋₁ = [2.5, 0.3, 1.8] et fₜ = [0.9, 0.1, 0.8], alors fₜ ⊙ Cₜ₋₁ = [2.25, 0.03, 1.44]",
      visual: "fₜ proche de 1 → garde l'info\nfₜ proche de 0 → oublie l'info"
    },
    input: {
      name: "Input Gate (Porte d'Entrée)",
      symbol: "iₜ",
      purpose: "Décide quelle nouvelle information stocker dans le Cell State",
      formula: "iₜ = σ(Wi · [hₜ₋₁, xₜ] + bi)",
      formulaDetailed: `iₜ = σ(Wi · [hₜ₋₁, xₜ] + bi)

Où:
• σ = fonction sigmoïde
• Wi = matrice de poids pour l'input gate
• hₜ₋₁ = état caché précédent
• xₜ = entrée actuelle
• bi = biais de l'input gate`,
      explanation: "L'input gate contrôle combien de la nouvelle information candidate sera ajoutée au Cell State. iₜ ≈ 1 signifie qu'on veut stocker beaucoup d'information nouvelle.",
      example: "Si C̃ₜ = [0.8, 0.5, 0.9] et iₜ = [0.9, 0.7, 0.6], alors iₜ ⊙ C̃ₜ = [0.72, 0.35, 0.54]",
      visual: "iₜ proche de 1 → stocke beaucoup\niₜ proche de 0 → stocke peu"
    },
    candidate: {
      name: "Candidate Values (Valeurs Candidates)",
      symbol: "C̃ₜ",
      purpose: "Nouvelles valeurs candidates à ajouter au Cell State",
      formula: "C̃ₜ = tanh(WC · [hₜ₋₁, xₜ] + bC)",
      formulaDetailed: `C̃ₜ = tanh(WC · [hₜ₋₁, xₜ] + bC)

Où:
• tanh = fonction tangente hyperbolique (-1 à 1)
• WC = matrice de poids pour les valeurs candidates
• hₜ₋₁ = état caché précédent
• xₜ = entrée actuelle
• bC = biais pour les valeurs candidates`,
      explanation: "Les valeurs candidates représentent la nouvelle information potentielle. tanh produit des valeurs entre -1 et 1, permettant de représenter des informations positives et négatives.",
      example: "Si [hₜ₋₁, xₜ] = [0.5, 0.8] et WC · [hₜ₋₁, xₜ] + bC = [1.2, -0.5, 0.8], alors C̃ₜ = [tanh(1.2), tanh(-0.5), tanh(0.8)] ≈ [0.83, -0.46, 0.66]",
      visual: "tanh normalise entre -1 et 1\nPermet des valeurs positives et négatives"
    },
    cellState: {
      name: "Cell State Update (Mise à Jour du Cell State)",
      symbol: "Cₜ",
      purpose: "Mise à jour du Cell State en combinant forget et input gates",
      formula: "Cₜ = fₜ ⊙ Cₜ₋₁ + iₜ ⊙ C̃ₜ",
      formulaDetailed: `Cₜ = fₜ ⊙ Cₜ₋₁ + iₜ ⊙ C̃ₜ

Décomposition:
• fₜ ⊙ Cₜ₋₁ = partie de l'ancien état qu'on garde
• iₜ ⊙ C̃ₜ = nouvelle information qu'on ajoute
• ⊙ = multiplication élément par élément (Hadamard product)

Étape par étape:
1. Oublier: fₜ ⊙ Cₜ₋₁ (garder seulement ce qui est important)
2. Ajouter: iₜ ⊙ C̃ₜ (ajouter la nouvelle information filtrée)
3. Combiner: Cₜ = (1) + (2)`,
      explanation: "Le Cell State est mis à jour en deux étapes : d'abord on oublie une partie de l'ancien état (forget), puis on ajoute la nouvelle information (input). C'est ici que la mémoire à long terme est maintenue.",
      example: "Si Cₜ₋₁ = [2.0, 1.0], fₜ = [0.8, 0.9], C̃ₜ = [0.5, 0.3], iₜ = [0.7, 0.6]\nAlors Cₜ = [0.8×2.0 + 0.7×0.5, 0.9×1.0 + 0.6×0.3] = [1.6 + 0.35, 0.9 + 0.18] = [1.95, 1.08]",
      visual: "Cₜ = (ce qu'on garde) + (ce qu'on ajoute)\nLe Cell State peut rester stable sur de longues périodes"
    },
    output: {
      name: "Output Gate (Porte de Sortie)",
      symbol: "oₜ",
      purpose: "Décide quelle partie du Cell State utiliser pour la sortie",
      formula: "oₜ = σ(Wo · [hₜ₋₁, xₜ] + bo)",
      formulaDetailed: `oₜ = σ(Wo · [hₜ₋₁, xₜ] + bo)

Où:
• σ = fonction sigmoïde
• Wo = matrice de poids pour l'output gate
• hₜ₋₁ = état caché précédent
• xₜ = entrée actuelle
• bo = biais de l'output gate`,
      explanation: "L'output gate filtre le Cell State pour produire l'état caché. Il décide quelle partie de la mémoire est pertinente pour la sortie actuelle.",
      example: "Si Cₜ = [2.0, 1.5] et oₜ = [0.8, 0.9], alors hₜ = oₜ ⊙ tanh(Cₜ) = [0.8×tanh(2.0), 0.9×tanh(1.5)] ≈ [0.8×0.96, 0.9×0.91] ≈ [0.77, 0.82]",
      visual: "oₜ filtre le Cell State\nSeule la partie pertinente est utilisée"
    },
    hiddenState: {
      name: "Hidden State (État Caché)",
      symbol: "hₜ",
      purpose: "État caché final utilisé pour la prédiction",
      formula: "hₜ = oₜ ⊙ tanh(Cₜ)",
      formulaDetailed: `hₜ = oₜ ⊙ tanh(Cₜ)

Décomposition:
• tanh(Cₜ) = normalise le Cell State entre -1 et 1
• oₜ = filtre pour choisir quelle partie utiliser
• ⊙ = multiplication élément par élément

Pourquoi tanh?
• Le Cell State peut avoir des valeurs très grandes
• tanh les normalise pour éviter l'explosion
• Permet des gradients stables`,
      explanation: "L'état caché est la version filtrée et normalisée du Cell State. C'est ce qui est utilisé pour faire des prédictions et passer à l'étape suivante.",
      example: "Si Cₜ = [3.5, -2.1, 1.8] et oₜ = [0.9, 0.7, 0.8]\nAlors hₜ = [0.9×tanh(3.5), 0.7×tanh(-2.1), 0.8×tanh(1.8)]\n≈ [0.9×0.998, 0.7×(-0.97), 0.8×0.95]\n≈ [0.90, -0.68, 0.76]",
      visual: "hₜ = version filtrée de Cₜ\nUtilisé pour prédictions et prochaine étape"
    }
  }

  const completeFlow = {
    title: "Flux Complet LSTM - Toutes les Formules",
    steps: [
      {
        step: 1,
        name: "Forget Gate",
        formula: "fₜ = σ(Wf · [hₜ₋₁, xₜ] + bf)"
      },
      {
        step: 2,
        name: "Input Gate",
        formula: "iₜ = σ(Wi · [hₜ₋₁, xₜ] + bi)"
      },
      {
        step: 3,
        name: "Candidate Values",
        formula: "C̃ₜ = tanh(WC · [hₜ₋₁, xₜ] + bC)"
      },
      {
        step: 4,
        name: "Cell State Update",
        formula: "Cₜ = fₜ ⊙ Cₜ₋₁ + iₜ ⊙ C̃ₜ"
      },
      {
        step: 5,
        name: "Output Gate",
        formula: "oₜ = σ(Wo · [hₜ₋₁, xₜ] + bo)"
      },
      {
        step: 6,
        name: "Hidden State",
        formula: "hₜ = oₜ ⊙ tanh(Cₜ)"
      }
    ]
  }

  return (
    <div className={`lstm-formulas-container ${presentationMode ? 'presentation-mode' : ''}`}>
      {!presentationMode && (
        <>
          <h2>📐 Formules Mathématiques LSTM</h2>
          <p className="intro-text">
            Toutes les formules mathématiques utilisées dans LSTM, avec explications détaillées et exemples numériques.
          </p>
        </>
      )}

      <div className="gates-tabs">
        {Object.entries(gates).map(([key, gate]) => (
          <button
            key={key}
            className={`gate-tab ${activeGate === key ? 'active' : ''}`}
            onClick={() => setActiveGate(key)}
          >
            {gate.symbol}
          </button>
        ))}
      </div>

      {gates[activeGate] && (
        <div className="gate-content">
          <div className="gate-header">
            <h3>{gates[activeGate].name}</h3>
            <div className="gate-symbol">{gates[activeGate].symbol}</div>
          </div>

          <div className="gate-purpose">
            <strong>🎯 Rôle :</strong> {gates[activeGate].purpose}
          </div>

          <div className="formula-section">
            <h4>📐 Formule Principale :</h4>
            <div className="formula-box main-formula">
              {gates[activeGate].formula}
            </div>
          </div>

          <div className="formula-detailed">
            <h4>📖 Formule Détaillée :</h4>
            <pre className="formula-code">{gates[activeGate].formulaDetailed}</pre>
          </div>

          <div className="explanation-box">
            <h4>💡 Explication :</h4>
            <p>{gates[activeGate].explanation}</p>
          </div>

          <div className="example-box">
            <h4>🔢 Exemple Numérique :</h4>
            <pre className="example-code">{gates[activeGate].example}</pre>
          </div>

          <div className="visual-box">
            <h4>👁️ Visualisation :</h4>
            <pre className="visual-code">{gates[activeGate].visual}</pre>
          </div>
        </div>
      )}

      <div className="complete-flow-section">
        <h3>🔄 Flux Complet LSTM - Toutes les Formules</h3>
        <div className="flow-steps">
          {completeFlow.steps.map((step) => (
            <div key={step.step} className="flow-step-item">
              <div className="flow-step-number">{step.step}</div>
              <div className="flow-step-content">
                <div className="flow-step-name">{step.name}</div>
                <div className="flow-step-formula">{step.formula}</div>
              </div>
              {step.step < completeFlow.steps.length && (
                <div className="flow-arrow">→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="notations-section">
        <h3>📚 Notations et Symboles</h3>
        <div className="notations-grid">
          <div className="notation-item">
            <strong>σ</strong>
            <p>Fonction sigmoïde : σ(x) = 1/(1 + e⁻ˣ)<br/>Produit des valeurs entre 0 et 1</p>
          </div>
          <div className="notation-item">
            <strong>tanh</strong>
            <p>Tangente hyperbolique : tanh(x) = (eˣ - e⁻ˣ)/(eˣ + e⁻ˣ)<br/>Produit des valeurs entre -1 et 1</p>
          </div>
          <div className="notation-item">
            <strong>⊙</strong>
            <p>Produit de Hadamard (multiplication élément par élément)<br/>[a, b] ⊙ [c, d] = [a×c, b×d]</p>
          </div>
          <div className="notation-item">
            <strong>Wf, Wi, WC, Wo</strong>
            <p>Matrices de poids apprises pendant l'entraînement<br/>Une pour chaque gate et les valeurs candidates</p>
          </div>
          <div className="notation-item">
            <strong>bf, bi, bC, bo</strong>
            <p>Biais (biais) pour chaque gate<br/>Paramètres appris pour ajuster les calculs</p>
          </div>
          <div className="notation-item">
            <strong>hₜ, hₜ₋₁</strong>
            <p>État caché au temps t et t-1<br/>Représentation de la mémoire à court terme</p>
          </div>
          <div className="notation-item">
            <strong>Cₜ, Cₜ₋₁</strong>
            <p>Cell State au temps t et t-1<br/>Mémoire à long terme de LSTM</p>
          </div>
          <div className="notation-item">
            <strong>xₜ</strong>
            <p>Entrée au temps t<br/>Donnée de la séquence à traiter</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LSTMFormulas

