import React, { useState } from 'react'
import './ConclusionSlide.css'

function ConclusionSlide() {
  const [selectedSection, setSelectedSection] = useState('summary')

  return (
    <div className="slide conclusion-slide">
      <h1 className="slide-title-main">Conclusion et Perspectives</h1>
      
      <div className="conclusion-container">
        <div className="section-selector">
          <button
            className={`section-btn ${selectedSection === 'summary' ? 'active' : ''}`}
            onClick={() => setSelectedSection('summary')}
          >
            <span className="btn-icon">📋</span>
            <span className="btn-text">Résumé</span>
          </button>
          <button
            className={`section-btn ${selectedSection === 'transformers' ? 'active' : ''}`}
            onClick={() => setSelectedSection('transformers')}
          >
            <span className="btn-icon">⚖️</span>
            <span className="btn-text">Comparaison</span>
          </button>
          <button
            className={`section-btn ${selectedSection === 'future' ? 'active' : ''}`}
            onClick={() => setSelectedSection('future')}
          >
            <span className="btn-icon">🔮</span>
            <span className="btn-text">Perspectives</span>
          </button>
        </div>

        {selectedSection === 'summary' && (
          <div className="summary-section">
            <div className="section-header">
              <h2>📋 Résumé de la Présentation</h2>
              <p className="section-subtitle">Points clés abordés dans cette présentation</p>
            </div>
            <div className="summary-grid">
              <div className="summary-card rnn-card">
                <div className="card-header">
                  <div className="card-icon">🔄</div>
                  <h3>RNN</h3>
                </div>
                <ul>
                  <li><span className="bullet">•</span> Réseaux récurrents pour séquences</li>
                  <li><span className="bullet">•</span> Problème : Vanishing/Exploding Gradient</li>
                  <li><span className="bullet">•</span> Limite : ~10 pas de temps</li>
                  <li><span className="bullet">•</span> Applications : NLP, séries temporelles</li>
                </ul>
              </div>
              <div className="summary-card lstm-card">
                <div className="card-header">
                  <div className="card-icon">🧠</div>
                  <h3>LSTM</h3>
                </div>
                <ul>
                  <li><span className="bullet">•</span> Solution au problème des RNN</li>
                  <li><span className="bullet">•</span> 5 neurones : 3 gates + Cell State + Hidden State</li>
                  <li><span className="bullet">•</span> Peut traiter des centaines de pas</li>
                  <li><span className="bullet">•</span> Applications : Traduction, prédiction, NLP</li>
                </ul>
              </div>
              <div className="summary-card case-card">
                <div className="card-header">
                  <div className="card-icon">💼</div>
                  <h3>Étude de Cas</h3>
                </div>
                <ul>
                  <li><span className="bullet">•</span> Prédiction du prix de l'or</li>
                  <li><span className="bullet">•</span> Architecture : 3 couches LSTM</li>
                  <li><span className="bullet">•</span> Résultat : 96% de précision</li>
                  <li><span className="bullet">•</span> Démonstration pratique réussie</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {selectedSection === 'transformers' && (
          <div className="transformers-section">
            <div className="section-header">
              <h2>⚖️ LSTM vs Transformers</h2>
              <p className="section-subtitle">Comparaison des architectures pour choisir la meilleure solution</p>
            </div>
            <div className="comparison-container">
              <div className="comparison-cards">
                <div className="comparison-card lstm-comparison">
                  <div className="comparison-header">
                    <div className="comparison-icon">🧠</div>
                    <h3>LSTM</h3>
                  </div>
                  <div className="comparison-features">
                    <div className="feature-item">
                      <span className="feature-label">Architecture</span>
                      <span className="feature-value">Récurrente (séquentielle)</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-label">Traitement</span>
                      <span className="feature-value">Séquentiel (pas par pas)</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-label">Mémoire</span>
                      <span className="feature-value">Cell State + Hidden State</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-label">Longueur</span>
                      <span className="feature-value">Quelques centaines</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-label">Vitesse</span>
                      <span className="feature-value">Lente (séquentielle)</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-label">Complexité</span>
                      <span className="feature-value">Modérée</span>
                    </div>
                  </div>
                </div>
                <div className="comparison-card transformer-comparison">
                  <div className="comparison-header">
                    <div className="comparison-icon">🤖</div>
                    <h3>Transformers</h3>
                  </div>
                  <div className="comparison-features">
                    <div className="feature-item">
                      <span className="feature-label">Architecture</span>
                      <span className="feature-value">Attention (parallèle)</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-label">Traitement</span>
                      <span className="feature-value">Parallèle (tous les tokens)</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-label">Mémoire</span>
                      <span className="feature-value">Attention Mechanism</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-label">Longueur</span>
                      <span className="feature-value">Plusieurs milliers</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-label">Vitesse</span>
                      <span className="feature-value">Rapide (parallèle)</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-label">Complexité</span>
                      <span className="feature-value">Élevée</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="when-to-use">
              <h3>💡 Quand utiliser quoi ?</h3>
              <div className="use-cases">
                <div className="use-case lstm-use">
                  <div className="use-header">
                    <div className="use-icon">✅</div>
                    <h4>Utilisez LSTM pour :</h4>
                  </div>
                  <ul>
                    <li><span className="check">✓</span> Séries temporelles univariées</li>
                    <li><span className="check">✓</span> Données séquentielles courtes à moyennes</li>
                    <li><span className="check">✓</span> Ressources limitées</li>
                    <li><span className="check">✓</span> Modèles plus simples à comprendre</li>
                    <li><span className="check">✓</span> Applications temps réel</li>
                  </ul>
                </div>
                <div className="use-case transformer-use">
                  <div className="use-header">
                    <div className="use-icon">✅</div>
                    <h4>Utilisez Transformers pour :</h4>
                  </div>
                  <ul>
                    <li><span className="check">✓</span> NLP avancé (traduction, génération)</li>
                    <li><span className="check">✓</span> Très longues séquences</li>
                    <li><span className="check">✓</span> Ressources computationnelles importantes</li>
                    <li><span className="check">✓</span> Modèles de pointe (GPT, BERT)</li>
                    <li><span className="check">✓</span> Attention explicite nécessaire</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedSection === 'future' && (
          <div className="future-section">
            <div className="section-header">
              <h2>🔮 Perspectives Futures</h2>
              <p className="section-subtitle">Tendances et défis à venir dans le domaine des réseaux de neurones récurrents</p>
            </div>
            <div className="future-trends">
              <div className="trend-card evolution-card">
                <div className="trend-header">
                  <div className="trend-icon">🔮</div>
                  <h3>Évolutions</h3>
                </div>
                <ul>
                  <li>
                    <span className="trend-badge">Hybridation</span>
                    <span className="trend-text">Combinaison LSTM + Transformers</span>
                  </li>
                  <li>
                    <span className="trend-badge">Efficacité</span>
                    <span className="trend-text">Modèles plus légers et rapides</span>
                  </li>
                  <li>
                    <span className="trend-badge">Domaines</span>
                    <span className="trend-text">Expansion vers nouveaux domaines</span>
                  </li>
                  <li>
                    <span className="trend-badge">Hardware</span>
                    <span className="trend-text">Optimisation pour GPU/TPU</span>
                  </li>
                </ul>
              </div>
              <div className="trend-card application-card">
                <div className="trend-header">
                  <div className="trend-icon">📈</div>
                  <h3>Applications Émergentes</h3>
                </div>
                <ul>
                  <li><span className="app-dot"></span> Médecine prédictive</li>
                  <li><span className="app-dot"></span> Finance algorithmique</li>
                  <li><span className="app-dot"></span> IoT et capteurs</li>
                  <li><span className="app-dot"></span> Reconnaissance vocale avancée</li>
                </ul>
              </div>
              <div className="trend-card challenge-card">
                <div className="trend-header">
                  <div className="trend-icon">🎯</div>
                  <h3>Défis</h3>
                </div>
                <ul>
                  <li><span className="challenge-icon">⚠️</span> Interprétabilité des modèles</li>
                  <li><span className="challenge-icon">⚠️</span> Consommation énergétique</li>
                  <li><span className="challenge-icon">⚠️</span> Biais et éthique</li>
                  <li><span className="challenge-icon">⚠️</span> Généralisation</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConclusionSlide
