import React, { useState } from 'react'
import './RNNExplanation.css'

function RNNExplanation({ activeSection: propActiveSection, presentationMode = false }) {
  const [internalActiveSection, setInternalActiveSection] = useState('introduction')
  const activeSection = propActiveSection || internalActiveSection

  return (
    <div className={`rnn-explanation-container ${presentationMode ? 'presentation-mode' : ''}`}>
      {!presentationMode && (
        <>
          <h2>📚 Apprendre les RNN (Recurrent Neural Networks)</h2>
          <p className="intro-text">
            Guide complet pour comprendre les réseaux de neurones récurrents, leurs avantages, leurs limites, et pourquoi LSTM a été créé.
          </p>
        </>
      )}

      {!presentationMode && (
        <div className="sections-nav">
          <button 
            className={activeSection === 'introduction' ? 'active' : ''}
            onClick={() => setInternalActiveSection('introduction')}
          >
            Introduction
          </button>
        <button 
          className={activeSection === 'architecture' ? 'active' : ''}
          onClick={() => setInternalActiveSection('architecture')}
        >
          Architecture
        </button>
        <button 
          className={activeSection === 'how-it-works' ? 'active' : ''}
          onClick={() => setInternalActiveSection('how-it-works')}
        >
          Fonctionnement
        </button>
        <button 
          className={activeSection === 'calculations' ? 'active' : ''}
          onClick={() => setInternalActiveSection('calculations')}
        >
          Calculs
        </button>
        <button 
          className={activeSection === 'problems' ? 'active' : ''}
          onClick={() => setInternalActiveSection('problems')}
        >
          Problèmes
        </button>
        <button 
          className={activeSection === 'examples' ? 'active' : ''}
          onClick={() => setInternalActiveSection('examples')}
        >
          Exemples
        </button>
        </div>
      )}

      {activeSection === 'introduction' && (
        <div className="section-content">
          <h3>🎯 Qu'est-ce qu'un RNN ?</h3>
          
          <div className="concept-box">
            <p className="concept-text">
              Un <strong>Réseau de Neurones Récurrent (RNN)</strong> est un type de réseau de neurones spécialement conçu pour traiter des <strong>séquences de données</strong> où l'ordre et le contexte temporel sont importants.
            </p>
          </div>

          <div className="comparison-grid">
            <div className="comparison-item">
              <h4>🔄 Réseaux Traditionnels</h4>
              <ul>
                <li>Traite chaque entrée <strong>indépendamment</strong></li>
                <li>Pas de mémoire des entrées précédentes</li>
                <li>Exemple: Classification d'images</li>
              </ul>
            </div>
            <div className="comparison-item">
              <h4>🔄 RNN</h4>
              <ul>
                <li>Traite les entrées de manière <strong>séquentielle</strong></li>
                <li>Garde une <strong>mémoire</strong> des entrées précédentes</li>
                <li>Exemple: Analyse de texte, prédiction de séries temporelles</li>
              </ul>
            </div>
          </div>

          <div className="use-cases">
            <h4>📋 Cas d'Usage des RNN :</h4>
            <div className="use-case-list">
              <div className="use-case-item">
                <span className="icon">📝</span>
                <div>
                  <strong>Analyse de texte</strong>
                  <p>Comprendre le sens d'une phrase en tenant compte de tous les mots précédents</p>
                </div>
              </div>
              <div className="use-case-item">
                <span className="icon">🎵</span>
                <div>
                  <strong>Reconnaissance vocale</strong>
                  <p>Reconnaître la parole en analysant la séquence de sons</p>
                </div>
              </div>
              <div className="use-case-item">
                <span className="icon">📈</span>
                <div>
                  <strong>Prédiction de séries temporelles</strong>
                  <p>Prédire les prix d'actions, la météo, etc. basé sur l'historique</p>
                </div>
              </div>
              <div className="use-case-item">
                <span className="icon">🌐</span>
                <div>
                  <strong>Traduction automatique</strong>
                  <p>Traduire des phrases en tenant compte du contexte</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'architecture' && (
        <div className="section-content">
          <h3>🏗️ Architecture d'un RNN</h3>

          <div className="architecture-diagram">
            <div className="rnn-visualization">
              <div className="rnn-cell previous">
                <div className="cell-label">hₜ₋₁</div>
                <div className="cell-value">État précédent</div>
              </div>
              <div className="arrow-right">→</div>
              <div className="rnn-cell current">
                <div className="cell-label">RNN Cell</div>
                <div className="cell-inputs">
                  <div className="input">xₜ</div>
                  <div className="input">hₜ₋₁</div>
                </div>
                <div className="cell-outputs">
                  <div className="output">hₜ</div>
                </div>
              </div>
              <div className="arrow-right">→</div>
              <div className="rnn-cell next">
                <div className="cell-label">hₜ</div>
                <div className="cell-value">Nouvel état</div>
              </div>
            </div>
          </div>

          <div className="architecture-explanation">
            <h4>🔑 Composants Principaux :</h4>
            
            <div className="component-item">
              <div className="component-header">
                <span className="component-icon">📥</span>
                <strong>Entrée (xₜ)</strong>
              </div>
              <p>L'élément de la séquence au temps t (ex: un mot, un prix, un son)</p>
            </div>

            <div className="component-item">
              <div className="component-header">
                <span className="component-icon">🧠</span>
                <strong>État Caché (hₜ)</strong>
              </div>
              <p>La mémoire du réseau qui contient l'information accumulée depuis le début de la séquence</p>
            </div>

            <div className="component-item">
              <div className="component-header">
                <span className="component-icon">⚙️</span>
                <strong>Poids (W, U, b)</strong>
              </div>
              <p>Les paramètres appris pendant l'entraînement qui déterminent comment combiner l'entrée et l'état précédent</p>
            </div>

            <div className="component-item">
              <div className="component-header">
                <span className="component-icon">📤</span>
                <strong>Sortie (yₜ)</strong>
              </div>
              <p>Le résultat produit à chaque pas de temps (optionnel, dépend de la tâche)</p>
            </div>
          </div>

          <div className="unfolded-diagram">
            <h4>📐 RNN Déroulé (Unfolded) :</h4>
            <div className="unfolded-visualization">
              <div className="time-step">
                <div className="step-label">t=1</div>
                <div className="step-cell">
                  <div className="step-input">x₁</div>
                  <div className="step-process">RNN</div>
                  <div className="step-output">h₁</div>
                </div>
              </div>
              <div className="time-step">
                <div className="step-label">t=2</div>
                <div className="step-cell">
                  <div className="step-input">x₂</div>
                  <div className="step-process">RNN</div>
                  <div className="step-output">h₂</div>
                </div>
              </div>
              <div className="time-step">
                <div className="step-label">t=3</div>
                <div className="step-cell">
                  <div className="step-input">x₃</div>
                  <div className="step-process">RNN</div>
                  <div className="step-output">h₃</div>
                </div>
              </div>
            </div>
            <p className="diagram-note">
              Le même réseau RNN est réutilisé à chaque pas de temps, mais avec des entrées différentes et en transmettant l'état caché.
            </p>
          </div>
        </div>
      )}

      {activeSection === 'how-it-works' && (
        <div className="section-content">
          <h3>⚙️ Comment Fonctionne un RNN ?</h3>

          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Initialisation</h4>
                <p>Au début (t=0), l'état caché h₀ est initialisé, généralement à zéro ou à une petite valeur aléatoire.</p>
                <div className="formula-box">
                  <code>h₀ = 0</code>
                </div>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Réception de l'Entrée</h4>
                <p>À chaque pas de temps t, le réseau reçoit une nouvelle entrée xₜ de la séquence.</p>
                <div className="formula-box">
                  <code>Entrée au temps t : xₜ</code>
                </div>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Combinaison</h4>
                <p>Le réseau combine l'entrée actuelle xₜ avec l'état caché précédent hₜ₋₁ en utilisant des poids appris.</p>
                <div className="formula-box">
                  <code>zₜ = W · xₜ + U · hₜ₋₁ + b</code>
                  <p className="formula-explanation">
                    W = poids pour l'entrée<br/>
                    U = poids pour l'état caché<br/>
                    b = biais
                  </p>
                </div>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Activation</h4>
                <p>Une fonction d'activation (comme tanh) est appliquée pour produire le nouvel état caché.</p>
                <div className="formula-box">
                  <code>hₜ = tanh(zₜ)</code>
                  <p className="formula-explanation">
                    tanh produit des valeurs entre -1 et 1, ce qui aide à stabiliser les gradients.
                  </p>
                </div>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h4>Mise à Jour</h4>
                <p>Le nouvel état caché hₜ remplace l'ancien et sera utilisé pour le prochain pas de temps.</p>
                <div className="formula-box">
                  <code>hₜ devient hₜ₋₁ pour le pas suivant</code>
                </div>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">6</div>
              <div className="step-content">
                <h4>Sortie (Optionnelle)</h4>
                <p>Si nécessaire, une sortie yₜ peut être calculée à partir de hₜ.</p>
                <div className="formula-box">
                  <code>yₜ = V · hₜ + c</code>
                  <p className="formula-explanation">
                    V = poids pour la sortie<br/>
                    c = biais de sortie
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="example-flow">
            <h4>📊 Exemple Concret : "Bonjour le monde"</h4>
            <div className="flow-diagram">
              <div className="flow-step">
                <div className="flow-input">"Bonjour"</div>
                <div className="flow-process">RNN</div>
                <div className="flow-state">h₁ = [0.2, 0.5, ...]</div>
                <p className="flow-note">État après "Bonjour"</p>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">
                <div className="flow-input">"le"</div>
                <div className="flow-process">RNN</div>
                <div className="flow-state">h₂ = [0.3, 0.6, ...]</div>
                <p className="flow-note">État après "Bonjour le"</p>
              </div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">
                <div className="flow-input">"monde"</div>
                <div className="flow-process">RNN</div>
                <div className="flow-state">h₃ = [0.4, 0.7, ...]</div>
                <p className="flow-note">État final avec tout le contexte</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'calculations' && (
        <div className="section-content">
          <h3>🧮 Calculs Détaillés d'un RNN</h3>

          <div className="calculation-example">
            <h4>Exemple Numérique :</h4>
            
            <div className="calc-step">
              <h5>Étape 1 : Initialisation</h5>
              <div className="calc-box">
                <p><strong>h₀ = [0, 0, 0]</strong> (état initial)</p>
              </div>
            </div>

            <div className="calc-step">
              <h5>Étape 2 : Première Entrée (t=1)</h5>
              <div className="calc-box">
                <p><strong>Entrée :</strong> x₁ = [1, 0.5]</p>
                <p><strong>Poids :</strong> W = [[0.5, 0.3], [0.2, 0.4], [0.1, 0.6]]</p>
                <p><strong>Poids état :</strong> U = [[0.3, 0.2, 0.1], [0.4, 0.3, 0.2], [0.2, 0.4, 0.3]]</p>
                <p><strong>Biais :</strong> b = [0.1, 0.2, 0.1]</p>
              </div>
            </div>

            <div className="calc-step">
              <h5>Étape 3 : Calcul de z₁</h5>
              <div className="calc-box">
                <p><strong>z₁ = W · x₁ + U · h₀ + b</strong></p>
                <p>z₁ = [[0.5, 0.3], [0.2, 0.4], [0.1, 0.6]] · [1, 0.5] + [[0.3, 0.2, 0.1], ...] · [0, 0, 0] + [0.1, 0.2, 0.1]</p>
                <p>z₁ = [0.5×1 + 0.3×0.5, 0.2×1 + 0.4×0.5, 0.1×1 + 0.6×0.5] + [0, 0, 0] + [0.1, 0.2, 0.1]</p>
                <p>z₁ = [0.65, 0.4, 0.4] + [0.1, 0.2, 0.1]</p>
                <p><strong>z₁ = [0.75, 0.6, 0.5]</strong></p>
              </div>
            </div>

            <div className="calc-step">
              <h5>Étape 4 : Application de tanh</h5>
              <div className="calc-box">
                <p><strong>h₁ = tanh(z₁)</strong></p>
                <p>h₁ = tanh([0.75, 0.6, 0.5])</p>
                <p>h₁ = [tanh(0.75), tanh(0.6), tanh(0.5)]</p>
                <p><strong>h₁ ≈ [0.635, 0.537, 0.462]</strong></p>
              </div>
            </div>

            <div className="calc-step">
              <h5>Étape 5 : Deuxième Entrée (t=2)</h5>
              <div className="calc-box">
                <p><strong>Entrée :</strong> x₂ = [0.8, 0.3]</p>
                <p><strong>État précédent :</strong> h₁ = [0.635, 0.537, 0.462]</p>
                <p><strong>z₂ = W · x₂ + U · h₁ + b</strong></p>
                <p>z₂ = [[0.5, 0.3], ...] · [0.8, 0.3] + [[0.3, 0.2, 0.1], ...] · [0.635, 0.537, 0.462] + [0.1, 0.2, 0.1]</p>
                <p>z₂ = [0.49, 0.32, 0.38] + [0.35, 0.38, 0.33] + [0.1, 0.2, 0.1]</p>
                <p><strong>z₂ = [0.94, 0.90, 0.81]</strong></p>
                <p><strong>h₂ = tanh(z₂) ≈ [0.736, 0.716, 0.669]</strong></p>
              </div>
            </div>

            <div className="calc-note">
              <p>💡 <strong>Observation :</strong> L'état h₂ contient maintenant l'information de x₁ ET x₂, car il a été calculé en utilisant h₁ qui contenait déjà l'information de x₁.</p>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'problems' && (
        <div className="section-content">
          <h3>⚠️ Problèmes des RNN Classiques</h3>

          <div className="problem-item">
            <h4>1. Le Gradient qui Disparaît (Vanishing Gradient)</h4>
            <div className="problem-explanation">
              <p><strong>Le problème :</strong> Lors de la rétropropagation à travers le temps (Backpropagation Through Time - BPTT), le gradient devient de plus en plus petit à chaque pas de temps.</p>
              
              <div className="gradient-visual">
                <div className="gradient-bar" style={{width: '90%', background: '#4caf50'}}>
                  <span>Gradient à t-10: 0.9</span>
                </div>
                <div className="gradient-bar" style={{width: '60%', background: '#ff9800'}}>
                  <span>Gradient à t-5: 0.6</span>
                </div>
                <div className="gradient-bar" style={{width: '30%', background: '#f44336'}}>
                  <span>Gradient à t-2: 0.3</span>
                </div>
                <div className="gradient-bar" style={{width: '10%', background: '#9e9e9e'}}>
                  <span>Gradient à t: 0.1</span>
                </div>
              </div>

              <p><strong>Pourquoi ?</strong> La fonction tanh a une dérivée qui est toujours ≤ 1. Quand on multiplie plusieurs dérivées ensemble (une pour chaque pas de temps), le produit devient très petit.</p>
              
              <div className="formula-box">
                <code>∂L/∂h₀ = (∂L/∂hₜ) × (∂hₜ/∂hₜ₋₁) × ... × (∂h₁/∂h₀)</code>
                <p className="formula-explanation">
                  Chaque terme ∂hₜ/∂hₜ₋₁ ≤ 1, donc le produit devient très petit après quelques multiplications.
                </p>
              </div>

              <p><strong>Conséquence :</strong> Le réseau ne peut pas apprendre des dépendances à long terme (plus de 5-10 pas de temps).</p>
            </div>
          </div>

          <div className="problem-item">
            <h4>2. Le Gradient qui Explose (Exploding Gradient)</h4>
            <div className="problem-explanation">
              <p><strong>Le problème :</strong> Parfois, au lieu de diminuer, le gradient peut exploser et devenir très grand.</p>
              
              <p><strong>Pourquoi ?</strong> Si les poids sont trop grands, la multiplication répétée peut faire exploser les valeurs.</p>
              
              <p><strong>Conséquence :</strong> Les poids deviennent instables, l'entraînement diverge, et on obtient des valeurs NaN (Not a Number).</p>
              
              <p><strong>Solution partielle :</strong> Gradient clipping (limiter la valeur maximale du gradient).</p>
            </div>
          </div>

          <div className="problem-item">
            <h4>3. Mémoire Limitée</h4>
            <div className="problem-explanation">
              <p><strong>Le problème :</strong> Les RNN ont du mal à retenir des informations sur de longues séquences.</p>
              
              <div className="memory-comparison">
                <div className="memory-item">
                  <strong>RNN Classique</strong>
                  <div className="memory-bar rnn-memory" style={{width: '20%'}}>
                    <span>~5-10 pas</span>
                  </div>
                </div>
                <div className="memory-item">
                  <strong>LSTM</strong>
                  <div className="memory-bar lstm-memory" style={{width: '100%'}}>
                    <span>100+ pas</span>
                  </div>
                </div>
              </div>

              <p><strong>Pourquoi ?</strong> L'état caché hₜ est mis à jour à chaque pas, et l'information ancienne est progressivement "écrasée" par la nouvelle.</p>
            </div>
          </div>

          <div className="problem-item">
            <h4>4. Pas de Contrôle Sélectif</h4>
            <div className="problem-explanation">
              <p><strong>Le problème :</strong> Les RNN traitent toutes les informations de la même manière, sans pouvoir choisir quoi oublier ou quoi retenir.</p>
              
              <p><strong>Exemple :</strong> Dans la phrase "Le chat que j'ai vu hier était mignon", le mot "chat" est important même s'il est loin du mot "mignon". Un RNN classique aura du mal à faire cette connexion.</p>
            </div>
          </div>

          <div className="solution-preview">
            <h4>✅ Solution : LSTM</h4>
            <p>Les LSTM (Long Short-Term Memory) ont été créés pour résoudre ces problèmes en introduisant :</p>
            <ul>
              <li><strong>Forget Gate :</strong> Décide quoi oublier</li>
              <li><strong>Input Gate :</strong> Décide quoi stocker</li>
              <li><strong>Output Gate :</strong> Décide quoi utiliser</li>
              <li><strong>Cell State :</strong> Permet au gradient de circuler librement</li>
            </ul>
          </div>
        </div>
      )}

      {activeSection === 'examples' && (
        <div className="section-content">
          <h3>💡 Exemples Pratiques</h3>

          <div className="example-item">
            <h4>Exemple 1 : Prédiction du Prochain Mot</h4>
            <div className="example-detail">
              <p><strong>Contexte :</strong> "Le chat est sur le ..."</p>
              <div className="rnn-process">
                <div className="word-step">
                  <div className="word">"Le"</div>
                  <div className="state">h₁ = [0.1, 0.2, ...]</div>
                </div>
                <div className="word-step">
                  <div className="word">"chat"</div>
                  <div className="state">h₂ = [0.3, 0.5, ...]</div>
                </div>
                <div className="word-step">
                  <div className="word">"est"</div>
                  <div className="state">h₃ = [0.4, 0.6, ...]</div>
                </div>
                <div className="word-step">
                  <div className="word">"sur"</div>
                  <div className="state">h₄ = [0.5, 0.7, ...]</div>
                </div>
                <div className="word-step">
                  <div className="word">"le"</div>
                  <div className="state">h₅ = [0.6, 0.8, ...]</div>
                </div>
              </div>
              <p><strong>Prédiction :</strong> Le RNN utilise h₅ pour prédire le prochain mot. Il "se souvient" qu'on parle d'un chat, donc il pourrait prédire "toit", "canapé", "sol", etc.</p>
            </div>
          </div>

          <div className="example-item">
            <h4>Exemple 2 : Analyse de Sentiment</h4>
            <div className="example-detail">
              <p><strong>Phrase :</strong> "Ce film n'est pas mauvais"</p>
              <div className="sentiment-process">
                <div className="sentiment-step">
                  <div className="word">"Ce"</div>
                  <div className="sentiment">neutre</div>
                </div>
                <div className="sentiment-step">
                  <div className="word">"film"</div>
                  <div className="sentiment">neutre</div>
                </div>
                <div className="sentiment-step">
                  <div className="word">"n'est"</div>
                  <div className="sentiment">négation détectée</div>
                </div>
                <div className="sentiment-step">
                  <div className="word">"pas"</div>
                  <div className="sentiment">négation renforcée</div>
                </div>
                <div className="sentiment-step">
                  <div className="word">"mauvais"</div>
                  <div className="sentiment">négatif, mais avec double négation</div>
                </div>
              </div>
              <p><strong>Résultat :</strong> Le RNN doit "se souvenir" de la négation au début pour comprendre que "pas mauvais" = positif.</p>
            </div>
          </div>

          <div className="example-item">
            <h4>Exemple 3 : Prédiction de Prix</h4>
            <div className="example-detail">
              <p><strong>Série temporelle :</strong> Prix d'une action sur 5 jours</p>
              <div className="price-process">
                <div className="price-step">
                  <div className="price">Jour 1: 100€</div>
                  <div className="trend">h₁ = tendance initiale</div>
                </div>
                <div className="price-step">
                  <div className="price">Jour 2: 102€</div>
                  <div className="trend">h₂ = légère hausse</div>
                </div>
                <div className="price-step">
                  <div className="price">Jour 3: 105€</div>
                  <div className="trend">h₃ = hausse confirmée</div>
                </div>
                <div className="price-step">
                  <div className="price">Jour 4: 103€</div>
                  <div className="trend">h₄ = correction</div>
                </div>
                <div className="price-step">
                  <div className="price">Jour 5: 108€</div>
                  <div className="trend">h₅ = reprise haussière</div>
                </div>
              </div>
              <p><strong>Prédiction :</strong> Le RNN utilise h₅ (qui contient l'historique complet) pour prédire le prix du jour 6.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RNNExplanation

