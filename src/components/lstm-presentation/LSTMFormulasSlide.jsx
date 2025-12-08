import React from 'react'
import './LSTMFormulasSlide.css'

function LSTMFormulasSlide() {
  return (
    <div className="slide lstm-formulas-slide">
      <h1 className="slide-title-main">Formules LSTM Complètes</h1>
      
      <div className="formulas-container">
        <div className="info-panel">
          <h3>📖 Description Complète - Architecture LSTM</h3>
          
          <div className="info-box">
            <h4>🎯 Objectif de LSTM</h4>
            <p>
              LSTM (Long Short-Term Memory) résout le problème de la disparition du gradient dans les RNN classiques 
              en utilisant un <strong>Cell State</strong> qui peut transporter l'information sur de longues séquences. 
              Il utilise trois portes pour contrôler ce flux d'information.
            </p>
          </div>

          <div className="formulas-section">
            <h4>📐 Formules LSTM Complètes</h4>
            
            <div className="formula-card forget">
              <h5>1️⃣ Forget Gate (Porte d'Oubli) - fₜ</h5>
              <div className="formula-code">
                {'fₜ = σ(W_f · hₜ₋₁ + U_f · xₜ + b_f)'}
              </div>
              <p>
                <strong>Pourquoi :</strong> Détermine quelle partie de l'information du Cell State précédent (Cₜ₋₁) 
                doit être <span style={{color:'#dc2626'}}>oubliée</span>. La sigmoid produit une valeur entre 0 (tout oublier) 
                et 1 (tout garder). Cela permet à LSTM de se débarrasser d'informations obsolètes.
              </p>
              <div className="formula-details">
                <p><strong>σ (Sigmoid) :</strong> Fonction d'activation qui produit des valeurs entre 0 et 1</p>
                <p><strong>W_f, U_f :</strong> Matrices de poids apprises</p>
                <p><strong>b_f :</strong> Vecteur de biais</p>
              </div>
            </div>

            <div className="formula-card input">
              <h5>2️⃣ Input Gate (Porte d'Entrée) - iₜ</h5>
              <div className="formula-code">
                {'iₜ = σ(W_i · hₜ₋₁ + U_i · xₜ + b_i)'}
              </div>
              <p>
                <strong>Pourquoi :</strong> Détermine quelle <span style={{color:'#22c55e'}}>nouvelle information</span> 
                doit être ajoutée au Cell State. La sigmoid contrôle l'importance des nouvelles valeurs candidates.
              </p>
              <div className="formula-details">
                <p><strong>iₜ :</strong> Décide quelles valeurs nous allons mettre à jour</p>
                <p><strong>W_i, U_i :</strong> Matrices de poids pour l'Input Gate</p>
                <p><strong>b_i :</strong> Vecteur de biais</p>
              </div>
            </div>

            <div className="formula-card candidate">
              <h5>3️⃣ Candidate Values (Valeurs Candidates) - ĉₜ</h5>
              <div className="formula-code">
                {'ĉₜ = tanh(W_c · hₜ₋₁ + U_c · xₜ + b_c)'}
              </div>
              <p>
                <strong>Pourquoi :</strong> Génère les <span style={{color:'#eab308'}}>nouvelles valeurs candidates</span> 
                qui pourraient être ajoutées au Cell State. Tanh produit des valeurs entre -1 et 1, permettant des mises 
                à jour positives et négatives. Ces valeurs sont ensuite filtrées par l'Input Gate.
              </p>
              <div className="formula-details">
                <p><strong>tanh :</strong> Fonction d'activation (valeurs entre -1 et 1)</p>
                <p><strong>W_c, U_c :</strong> Matrices de poids pour les valeurs candidates</p>
                <p><strong>b_c :</strong> Vecteur de biais</p>
              </div>
            </div>

            <div className="formula-card cell">
              <h5>4️⃣ Cell State Update (Mise à jour du Cell State) - Cₜ</h5>
              <div className="formula-code">
                {'Cₜ = fₜ ⊙ Cₜ₋₁ + iₜ ⊙ ĉₜ'}
                <br />
                <span style={{fontSize:'13px', color:'#666', fontStyle:'italic'}}>
                  où ⊙ = multiplication élément par élément
                </span>
              </div>
              <p>
                <strong>Pourquoi :</strong> C'est le <span style={{color:'#f97316'}}>cœur de la mémoire LSTM</span> ! 
                Cette formule combine deux opérations :
              </p>
              <ul className="formula-list">
                <li><strong>fₜ ⊙ Cₜ₋₁ :</strong> Oublie sélectivement l'ancien Cell State</li>
                <li><strong>iₜ ⊙ ĉₜ :</strong> Ajoute sélectivement de nouvelles informations</li>
              </ul>
              <p style={{marginTop:'10px'}}>
                Le Cell State peut transporter l'information sur de très longues séquences sans dégradation, 
                résolvant le problème de la disparition du gradient.
              </p>
            </div>

            <div className="formula-card output">
              <h5>5️⃣ Output Gate (Porte de Sortie) - oₜ</h5>
              <div className="formula-code">
                {'oₜ = σ(W_o · hₜ₋₁ + U_o · xₜ + b_o)'}
              </div>
              <p>
                <strong>Pourquoi :</strong> Détermine quelle partie du Cell State doit être <span style={{color:'#3b82f6'}}>exposée</span> 
                comme Hidden State. Cela permet à LSTM de décider quelles informations sont pertinentes pour le timestep actuel.
              </p>
              <div className="formula-details">
                <p><strong>oₜ :</strong> Décide quelles parties de l'état de la cellule seront envoyées à la sortie</p>
                <p><strong>W_o, U_o :</strong> Matrices de poids pour l'Output Gate</p>
                <p><strong>b_o :</strong> Vecteur de biais</p>
              </div>
            </div>

            <div className="formula-card hidden">
              <h5>6️⃣ Hidden State (État Caché) - hₜ</h5>
              <div className="formula-code">
                {'hₜ = oₜ ⊙ tanh(Cₜ)'}
              </div>
              <p>
                <strong>Pourquoi :</strong> Le Hidden State est la <span style={{color:'#a855f7'}}>sortie visible</span> 
                de la cellule LSTM. Il est calculé en filtrant le Cell State (via tanh pour normaliser entre -1 et 1) 
                puis en le multipliant par l'Output Gate. Ce hₜ sera utilisé comme hₜ₋₁ pour le prochain timestep et peut 
                être utilisé pour faire des prédictions.
              </p>
              <div className="formula-details">
                <p><strong>hₜ :</strong> La sortie filtrée de la cellule, utilisée pour la prédiction et comme entrée pour la prochaine étape</p>
                <p><strong>tanh(Cₜ) :</strong> Normalise le Cell State entre -1 et 1</p>
              </div>
            </div>
          </div>

          <div className="data-flow-section">
            <h4>🔄 Flux de Données</h4>
            <div className="flow-box">
              <div className="flow-inputs">
                <p><strong>Entrées :</strong></p>
                <ul>
                  <li><strong>Cₜ₋₁ :</strong> Cell State précédent (mémoire à long terme)</li>
                  <li><strong>hₜ₋₁ :</strong> Hidden State précédent (utilisé dans toutes les portes)</li>
                  <li><strong>xₜ :</strong> Input actuel (nouvelle information)</li>
                </ul>
              </div>
              <div className="flow-outputs">
                <p><strong>Sorties :</strong></p>
                <ul>
                  <li><strong>Cₜ :</strong> Nouveau Cell State (sera Cₜ₋₁ pour le prochain timestep)</li>
                  <li><strong>hₜ :</strong> Nouveau Hidden State (sera hₜ₋₁ pour le prochain timestep et peut être utilisé pour prédictions)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="power-section">
            <h4>💡 Pourquoi LSTM est Puissant</h4>
            <ul>
              <li><strong>Mémoire à long terme :</strong> Le Cell State peut transporter l'information sur des centaines de timesteps</li>
              <li><strong>Contrôle sélectif :</strong> Les portes permettent d'oublier, d'ajouter et d'exposer l'information de manière sélective</li>
              <li><strong>Résout le problème du gradient :</strong> Le gradient peut circuler à travers le Cell State sans disparaître</li>
              <li><strong>Flexibilité :</strong> Peut apprendre quelles informations sont importantes pour chaque contexte</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LSTMFormulasSlide

