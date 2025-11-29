import React, { useState } from 'react'
import './LSTMvsRNN.css'

function LSTMvsRNN({ defaultTab, presentationMode = false }) {
  const [activeTab, setActiveTab] = useState(defaultTab || 'problem')

  return (
    <div className={`lstm-vs-rnn-container ${presentationMode ? 'presentation-mode' : ''}`}>
      {!presentationMode && <h2>🎯 Pourquoi LSTM au lieu de RNN ?</h2>}
      
      {!presentationMode && (
        <div className="tabs">
          <button 
            className={activeTab === 'problem' ? 'active' : ''}
            onClick={() => setActiveTab('problem')}
          >
            Le Problème RNN
          </button>
        <button 
          className={activeTab === 'solution' ? 'active' : ''}
          onClick={() => setActiveTab('solution')}
        >
          La Solution LSTM
        </button>
        <button 
          className={activeTab === 'comparison' ? 'active' : ''}
          onClick={() => setActiveTab('comparison')}
        >
          Comparaison
        </button>
        <button 
          className={activeTab === 'advantages' ? 'active' : ''}
          onClick={() => setActiveTab('advantages')}
        >
          Avantages
        </button>
        </div>
      )}

      {activeTab === 'problem' && (
        <div className="tab-content">
          <h3>❌ Le Problème du Gradient qui Disparaît (Vanishing Gradient)</h3>
          
          <div className="problem-box">
            <h4>Dans un RNN classique :</h4>
            <div className="rnn-diagram">
              <div className="rnn-cell">hₜ₋₁</div>
              <div className="arrow">→</div>
              <div className="rnn-cell">hₜ</div>
              <div className="arrow">→</div>
              <div className="rnn-cell">hₜ₊₁</div>
              <div className="arrow">→</div>
              <div className="rnn-cell">hₜ₊₂</div>
            </div>
            
            <div className="issue-list">
              <div className="issue-item">
                <span className="issue-icon">⚠️</span>
                <div>
                  <strong>Gradient qui disparaît :</strong> Lors de la rétropropagation, le gradient devient de plus en plus petit à chaque pas de temps. Après quelques étapes, il devient pratiquement nul.
                </div>
              </div>
              
              <div className="issue-item">
                <span className="issue-icon">⚠️</span>
                <div>
                  <strong>Mémoire limitée :</strong> Les RNN ont du mal à retenir des informations sur de longues séquences (plus de 10-20 pas de temps).
                </div>
              </div>
              
              <div className="issue-item">
                <span className="issue-icon">⚠️</span>
                <div>
                  <strong>Explosion du gradient :</strong> Parfois, le gradient peut aussi exploser et devenir très grand, causant une instabilité.
                </div>
              </div>
            </div>

            <div className="gradient-visualization">
              <h4>Évolution du Gradient dans un RNN :</h4>
              <div className="gradient-bar-container">
                <div className="gradient-step">
                  <div className="step-label">t-3</div>
                  <div className="gradient-bar" style={{width: '90%', background: '#4caf50'}}>
                    <span>0.9</span>
                  </div>
                </div>
                <div className="gradient-step">
                  <div className="step-label">t-2</div>
                  <div className="gradient-bar" style={{width: '60%', background: '#ff9800'}}>
                    <span>0.6</span>
                  </div>
                </div>
                <div className="gradient-step">
                  <div className="step-label">t-1</div>
                  <div className="gradient-bar" style={{width: '30%', background: '#f44336'}}>
                    <span>0.3</span>
                  </div>
                </div>
                <div className="gradient-step">
                  <div className="step-label">t</div>
                  <div className="gradient-bar" style={{width: '10%', background: '#9e9e9e'}}>
                    <span>0.1</span>
                  </div>
                </div>
              </div>
              <p className="gradient-note">Le gradient diminue rapidement → Impossible d'apprendre des dépendances à long terme</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'solution' && (
        <div className="tab-content">
          <h3>✅ Qu'est-ce que LSTM ?</h3>
          
          <div className="solution-box">
            <div className="lstm-definition">
              <h4>📖 Définition de LSTM :</h4>
              <p className="definition-text">
                <strong>LSTM (Long Short-Term Memory)</strong> est un type spécial de réseau de neurones récurrent (RNN) 
                conçu pour résoudre le problème du gradient qui disparaît. L'LSTM utilise un système de <strong>"gates"</strong> 
                (portes) pour contrôler le flux d'information, permettant de retenir ou oublier sélectivement des informations 
                sur de très longues séquences.
              </p>
              <p className="definition-text">
                Contrairement aux RNN classiques qui ont une seule couche de transformation, LSTM a une architecture plus complexe 
                avec un <strong>Cell State</strong> (état de cellule) qui peut transporter des informations sur de longues distances 
                sans être modifié, et un <strong>Hidden State</strong> (état caché) qui est filtré et utilisé pour les prédictions.
              </p>
            </div>

            <h4>🏗️ Architecture LSTM avec Gates :</h4>
            
            <div className="lstm-advantages">
              <div className="advantage-card">
                <div className="card-icon">🚪</div>
                <h5>Forget Gate (Porte d'Oubli)</h5>
                <p>Décide <strong>quoi oublier</strong> de la mémoire précédente. Permet de nettoyer la mémoire inutile.</p>
                <div className="formula-box-card">
                  <div className="formula-title">Formule :</div>
                  <div className="formula-content">fₜ = σ(Wf · [hₜ₋₁, xₜ] + bf)</div>
                  <div className="formula-explanation-card">
                    • σ = sigmoïde (0 à 1)<br/>
                    • Si fₜ ≈ 0 : oublie l'information<br/>
                    • Si fₜ ≈ 1 : garde l'information
                  </div>
                </div>
              </div>
              
              <div className="advantage-card">
                <div className="card-icon">📥</div>
                <h5>Input Gate (Porte d'Entrée)</h5>
                <p>Décide <strong>quelle nouvelle information</strong> stocker dans la cellule. Filtre les informations importantes.</p>
                <div className="formula-box-card">
                  <div className="formula-title">Formule :</div>
                  <div className="formula-content">iₜ = σ(Wi · [hₜ₋₁, xₜ] + bi)</div>
                  <div className="formula-explanation-card">
                    • Contrôle combien de nouvelle info stocker<br/>
                    • iₜ ≈ 1 : stocke beaucoup<br/>
                    • iₜ ≈ 0 : stocke peu
                  </div>
                </div>
              </div>
              
              <div className="advantage-card">
                <div className="card-icon">📊</div>
                <h5>Candidate Values (Valeurs Candidates)</h5>
                <p>Calcule les <strong>nouvelles valeurs</strong> potentielles à ajouter au Cell State.</p>
                <div className="formula-box-card">
                  <div className="formula-title">Formule :</div>
                  <div className="formula-content">C̃ₜ = tanh(WC · [hₜ₋₁, xₜ] + bC)</div>
                  <div className="formula-explanation-card">
                    • tanh normalise entre -1 et 1<br/>
                    • Représente la nouvelle information<br/>
                    • Sera filtrée par l'Input Gate
                  </div>
                </div>
              </div>
              
              <div className="advantage-card">
                <div className="card-icon">📤</div>
                <h5>Output Gate (Porte de Sortie)</h5>
                <p>Décide <strong>quelle partie</strong> de la mémoire cellulaire utiliser pour la sortie.</p>
                <div className="formula-box-card">
                  <div className="formula-title">Formule :</div>
                  <div className="formula-content">oₜ = σ(Wo · [hₜ₋₁, xₜ] + bo)</div>
                  <div className="formula-explanation-card">
                    • Filtre le Cell State pour la sortie<br/>
                    • oₜ ≈ 1 : utilise beaucoup<br/>
                    • oₜ ≈ 0 : utilise peu
                  </div>
                </div>
              </div>
            </div>

            <div className="cell-state-explanation">
              <h4>💾 État de la Cellule (Cell State) :</h4>
              <div className="cell-state-box">
                <div className="cell-state-formula">
                  Cₜ = fₜ ⊙ Cₜ₋₁ + iₜ ⊙ C̃ₜ
                </div>
                <div className="formula-breakdown">
                  <div className="breakdown-item">
                    <strong>fₜ ⊙ Cₜ₋₁</strong> : Partie de l'ancien état qu'on garde (forget)
                  </div>
                  <div className="breakdown-item">
                    <strong>iₜ ⊙ C̃ₜ</strong> : Nouvelle information qu'on ajoute (input)
                  </div>
                  <div className="breakdown-item">
                    <strong>⊙</strong> : Multiplication élément par élément (Hadamard product)
                  </div>
                </div>
                <p>L'état de la cellule peut <strong>rester constant</strong> sur de longues périodes grâce au forget gate 
                (si fₜ ≈ 1 et iₜ ≈ 0), permettant de retenir des informations sur des centaines de pas de temps.</p>
              </div>
            </div>

            <div className="hidden-state-explanation">
              <h4>🔍 État Caché (Hidden State) :</h4>
              <div className="hidden-state-box">
                <div className="hidden-state-formula">
                  hₜ = oₜ ⊙ tanh(Cₜ)
                </div>
                <div className="formula-breakdown">
                  <div className="breakdown-item">
                    <strong>tanh(Cₜ)</strong> : Normalise le Cell State entre -1 et 1
                  </div>
                  <div className="breakdown-item">
                    <strong>oₜ</strong> : Filtre pour choisir quelle partie utiliser
                  </div>
                  <div className="breakdown-item">
                    <strong>hₜ</strong> : Utilisé pour les prédictions et la prochaine étape
                  </div>
                </div>
                <p>L'état caché est la version filtrée et normalisée du Cell State. C'est ce qui est utilisé pour faire des 
                prédictions et passer à l'étape suivante du traitement de la séquence.</p>
              </div>
            </div>

            <div className="gradient-visualization">
              <h4>Évolution du Gradient dans un LSTM :</h4>
              <div className="gradient-bar-container">
                <div className="gradient-step">
                  <div className="step-label">t-100</div>
                  <div className="gradient-bar" style={{width: '85%', background: '#4caf50'}}>
                    <span>0.85</span>
                  </div>
                </div>
                <div className="gradient-step">
                  <div className="step-label">t-50</div>
                  <div className="gradient-bar" style={{width: '80%', background: '#4caf50'}}>
                    <span>0.80</span>
                  </div>
                </div>
                <div className="gradient-step">
                  <div className="step-label">t-10</div>
                  <div className="gradient-bar" style={{width: '75%', background: '#4caf50'}}>
                    <span>0.75</span>
                  </div>
                </div>
                <div className="gradient-step">
                  <div className="step-label">t</div>
                  <div className="gradient-bar" style={{width: '70%', background: '#4caf50'}}>
                    <span>0.70</span>
                  </div>
                </div>
              </div>
              <p className="gradient-note success">Le gradient reste stable → Peut apprendre des dépendances à très long terme</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="tab-content">
          <h3>⚖️ Comparaison RNN vs LSTM</h3>
          
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Caractéristique</th>
                  <th className="rnn-col">RNN Classique</th>
                  <th className="lstm-col">LSTM</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Mémoire à long terme</strong></td>
                  <td className="rnn-col">❌ Limité (5-10 pas)</td>
                  <td className="lstm-col">✅ Excellent (100+ pas)</td>
                </tr>
                <tr>
                  <td><strong>Gradient qui disparaît</strong></td>
                  <td className="rnn-col">❌ Problème majeur</td>
                  <td className="lstm-col">✅ Résolu</td>
                </tr>
                <tr>
                  <td><strong>Contrôle de la mémoire</strong></td>
                  <td className="rnn-col">❌ Aucun</td>
                  <td className="lstm-col">✅ 3 gates (Forget/Input/Output)</td>
                </tr>
                <tr>
                  <td><strong>Complexité</strong></td>
                  <td className="rnn-col">✅ Simple</td>
                  <td className="lstm-col">⚠️ Plus complexe</td>
                </tr>
                <tr>
                  <td><strong>Temps d'entraînement</strong></td>
                  <td className="rnn-col">✅ Rapide</td>
                  <td className="lstm-col">⚠️ Plus lent</td>
                </tr>
                <tr>
                  <td><strong>Paramètres</strong></td>
                  <td className="rnn-col">✅ Moins de paramètres</td>
                  <td className="lstm-col">⚠️ Plus de paramètres</td>
                </tr>
                <tr>
                  <td><strong>Cas d'usage</strong></td>
                  <td className="rnn-col">Séquences courtes</td>
                  <td className="lstm-col">Séquences longues, traduction, analyse de texte</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="use-cases">
            <h4>📚 Cas d'Usage où LSTM Excelle :</h4>
            <div className="use-case-grid">
              <div className="use-case-item">
                <span className="use-case-icon">🌐</span>
                <strong>Traduction automatique</strong>
                <p>Besoin de retenir le contexte sur toute la phrase</p>
              </div>
              <div className="use-case-item">
                <span className="use-case-icon">📝</span>
                <strong>Génération de texte</strong>
                <p>Comprendre le contexte sur plusieurs paragraphes</p>
              </div>
              <div className="use-case-item">
                <span className="use-case-icon">📊</span>
                <strong>Prédiction de séries temporelles</strong>
                <p>Analyser des tendances sur de longues périodes</p>
              </div>
              <div className="use-case-item">
                <span className="use-case-icon">🎵</span>
                <strong>Reconnaissance vocale</strong>
                <p>Comprendre le contexte dans une conversation</p>
              </div>
              <div className="use-case-item">
                <span className="use-case-icon">🤖</span>
                <strong>Chatbots</strong>
                <p>Retenir le contexte de la conversation</p>
              </div>
              <div className="use-case-item">
                <span className="use-case-icon">📈</span>
                <strong>Analyse de sentiment</strong>
                <p>Comprendre le contexte sur plusieurs phrases</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'advantages' && (
        <div className="tab-content">
          <h3>🎁 Avantages Clés de LSTM</h3>
          
          <div className="advantages-grid">
            <div className="advantage-item">
              <div className="advantage-number">1</div>
              <h4>Mémoire Sélective</h4>
              <p>Les gates permettent de <strong>choisir</strong> ce qui est important à retenir et ce qui peut être oublié. C'est comme avoir une mémoire sélective intelligente.</p>
            </div>

            <div className="advantage-item">
              <div className="advantage-number">2</div>
              <h4>Pas de Perte d'Information</h4>
              <p>L'état de la cellule (Cₜ) peut <strong>rester constant</strong> sur de longues périodes, permettant de transporter des informations importantes sur des centaines de pas de temps.</p>
            </div>

            <div className="advantage-item">
              <div className="advantage-number">3</div>
              <h4>Gradient Stable</h4>
              <p>Le gradient peut <strong>circuler librement</strong> à travers l'état de la cellule sans être multiplié par des matrices à chaque pas, évitant le problème du gradient qui disparaît.</p>
            </div>

            <div className="advantage-item">
              <div className="advantage-number">4</div>
              <h4>Flexibilité</h4>
              <p>Peut apprendre à <strong>ignorer</strong> certaines informations (forget gate), <strong>ajouter</strong> de nouvelles informations (input gate), et <strong>contrôler</strong> la sortie (output gate).</p>
            </div>

            <div className="advantage-item">
              <div className="advantage-number">5</div>
              <h4>Performance sur Longues Séquences</h4>
              <p>Excelle sur des tâches nécessitant de comprendre des <strong>dépendances à très long terme</strong>, comme la traduction de phrases complexes ou l'analyse de documents entiers.</p>
            </div>

            <div className="advantage-item">
              <div className="advantage-number">6</div>
              <h4>Robustesse</h4>
              <p>Plus <strong>robuste</strong> aux variations dans les données et peut gérer des séquences de longueurs variables efficacement.</p>
            </div>
          </div>

          <div className="visual-comparison">
            <h4>📊 Visualisation de la Capacité de Mémoire :</h4>
            <div className="memory-capacity">
              <div className="memory-item">
                <div className="memory-label">RNN</div>
                <div className="memory-bar rnn-memory" style={{width: '20%'}}>
                  <span>~10 pas</span>
                </div>
              </div>
              <div className="memory-item">
                <div className="memory-label">LSTM</div>
                <div className="memory-bar lstm-memory" style={{width: '100%'}}>
                  <span>100+ pas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LSTMvsRNN

