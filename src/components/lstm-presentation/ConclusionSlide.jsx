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
            <div className="comparison-simple">
              <div className="comparison-column">
                <h3 className="comparison-subtitle">🧠 LSTM</h3>
                <ul className="simple-list">
                  <li><strong>Architecture :</strong> Récurrente (séquentielle)</li>
                  <li><strong>Traitement :</strong> Séquentiel (pas par pas)</li>
                  <li><strong>Mémoire :</strong> Cell State + Hidden State</li>
                  <li><strong>Longueur :</strong> Quelques centaines</li>
                  <li><strong>Vitesse :</strong> Lente (séquentielle)</li>
                  <li><strong>Complexité :</strong> Modérée</li>
                </ul>
              </div>
              <div className="comparison-column">
                <h3 className="comparison-subtitle">🤖 Transformers</h3>
                <ul className="simple-list">
                  <li><strong>Architecture :</strong> Attention (parallèle)</li>
                  <li><strong>Traitement :</strong> Parallèle (tous les tokens)</li>
                  <li><strong>Mémoire :</strong> Attention Mechanism</li>
                  <li><strong>Longueur :</strong> Plusieurs milliers</li>
                  <li><strong>Vitesse :</strong> Rapide (parallèle)</li>
                  <li><strong>Complexité :</strong> Élevée</li>
                </ul>
              </div>
            </div>
            <div className="when-to-use-simple">
              <h3 className="when-title">💡 Quand utiliser quoi ?</h3>
              <div className="use-simple">
                <p className="use-paragraph"><strong>Utilisez LSTM pour :</strong> Séries temporelles univariées, données séquentielles courtes à moyennes, ressources limitées, modèles plus simples à comprendre, applications temps réel.</p>
                <p className="use-paragraph"><strong>Utilisez Transformers pour :</strong> NLP avancé (traduction, génération), très longues séquences, ressources computationnelles importantes, modèles de pointe (GPT, BERT), attention explicite nécessaire.</p>
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
            <div className="future-simple">
              <div className="future-section-item">
                <h3 className="future-subtitle">🔮 Évolutions</h3>
                <ul className="simple-list">
                  <li><strong>Hybridation :</strong> Combinaison LSTM + Transformers</li>
                  <li><strong>Efficacité :</strong> Modèles plus légers et rapides</li>
                  <li><strong>Domaines :</strong> Expansion vers nouveaux domaines</li>
                  <li><strong>Hardware :</strong> Optimisation pour GPU/TPU</li>
                </ul>
              </div>
              <div className="future-section-item">
                <h3 className="future-subtitle">📈 Applications Émergentes</h3>
                <ul className="simple-list">
                  <li>Médecine prédictive</li>
                  <li>Finance algorithmique</li>
                  <li>IoT et capteurs</li>
                  <li>Reconnaissance vocale avancée</li>
                </ul>
              </div>
              <div className="future-section-item">
                <h3 className="future-subtitle">🎯 Défis</h3>
                <ul className="simple-list">
                  <li>Interprétabilité des modèles</li>
                  <li>Consommation énergétique</li>
                  <li>Biais et éthique</li>
                  <li>Généralisation</li>
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
