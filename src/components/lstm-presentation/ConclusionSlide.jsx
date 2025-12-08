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
            Résumé
          </button>
          <button
            className={`section-btn ${selectedSection === 'transformers' ? 'active' : ''}`}
            onClick={() => setSelectedSection('transformers')}
          >
            Transformers vs LSTM
          </button>
          <button
            className={`section-btn ${selectedSection === 'future' ? 'active' : ''}`}
            onClick={() => setSelectedSection('future')}
          >
            Avenir
          </button>
        </div>

        {selectedSection === 'summary' && (
          <div className="summary-section">
            <h2>Résumé de la Présentation</h2>
            <div className="summary-grid">
              <div className="summary-card">
                <h3>✅ RNN</h3>
                <ul>
                  <li>Réseaux récurrents pour séquences</li>
                  <li>Problème : Vanishing/Exploding Gradient</li>
                  <li>Limite : ~10 pas de temps</li>
                  <li>Applications : NLP, séries temporelles</li>
                </ul>
              </div>
              <div className="summary-card">
                <h3>✅ LSTM</h3>
                <ul>
                  <li>Solution au problème des RNN</li>
                  <li>5 neurones : 3 gates + Cell State + Hidden State</li>
                  <li>Peut traiter des centaines de pas</li>
                  <li>Applications : Traduction, prédiction, NLP</li>
                </ul>
              </div>
              <div className="summary-card">
                <h3>✅ Étude de Cas</h3>
                <ul>
                  <li>Prédiction du prix de l'or</li>
                  <li>Architecture : 3 couches LSTM</li>
                  <li>Résultat : 96% de précision</li>
                  <li>Démonstration pratique réussie</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {selectedSection === 'transformers' && (
          <div className="transformers-section">
            <h2>Transformers vs LSTM</h2>
            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Caractéristique</th>
                    <th>LSTM</th>
                    <th>Transformers</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Architecture</strong></td>
                    <td>Récurrente (séquentielle)</td>
                    <td>Attention (parallèle)</td>
                  </tr>
                  <tr>
                    <td><strong>Traitement</strong></td>
                    <td>Séquentiel (pas par pas)</td>
                    <td>Parallèle (tous les tokens en même temps)</td>
                  </tr>
                  <tr>
                    <td><strong>Mémoire</strong></td>
                    <td>Cell State + Hidden State</td>
                    <td>Attention Mechanism</td>
                  </tr>
                  <tr>
                    <td><strong>Longueur de séquence</strong></td>
                    <td>Quelques centaines</td>
                    <td>Plusieurs milliers</td>
                  </tr>
                  <tr>
                    <td><strong>Vitesse d'entraînement</strong></td>
                    <td>Lente (séquentielle)</td>
                    <td>Rapide (parallèle)</td>
                  </tr>
                  <tr>
                    <td><strong>Complexité</strong></td>
                    <td>Modérée</td>
                    <td>Élevée</td>
                  </tr>
                  <tr>
                    <td><strong>Applications</strong></td>
                    <td>Séries temporelles, séquences courtes</td>
                    <td>NLP, traduction, GPT, BERT</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="when-to-use">
              <h3>Quand utiliser quoi ?</h3>
              <div className="use-cases">
                <div className="use-case">
                  <h4>✅ Utilisez LSTM pour :</h4>
                  <ul>
                    <li>Séries temporelles univariées</li>
                    <li>Données séquentielles courtes à moyennes</li>
                    <li>Ressources limitées</li>
                    <li>Modèles plus simples à comprendre</li>
                    <li>Applications temps réel</li>
                  </ul>
                </div>
                <div className="use-case">
                  <h4>✅ Utilisez Transformers pour :</h4>
                  <ul>
                    <li>NLP avancé (traduction, génération)</li>
                    <li>Très longues séquences</li>
                    <li>Ressources computationnelles importantes</li>
                    <li>Modèles de pointe (GPT, BERT)</li>
                    <li>Attention explicite nécessaire</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedSection === 'future' && (
          <div className="future-section">
            <h2>Perspectives Futures</h2>
            <div className="future-trends">
              <div className="trend-card">
                <h3>🔮 Évolutions</h3>
                <ul>
                  <li><strong>Hybridation</strong> : Combinaison LSTM + Transformers</li>
                  <li><strong>Efficacité</strong> : Modèles plus légers et rapides</li>
                  <li><strong>Domaines</strong> : Expansion vers nouveaux domaines</li>
                  <li><strong>Hardware</strong> : Optimisation pour GPU/TPU</li>
                </ul>
              </div>
              <div className="trend-card">
                <h3>📈 Applications Émergentes</h3>
                <ul>
                  <li>Médecine prédictive</li>
                  <li>Finance algorithmique</li>
                  <li>IoT et capteurs</li>
                  <li>Reconnaissance vocale avancée</li>
                </ul>
              </div>
              <div className="trend-card">
                <h3>🎯 Défis</h3>
                <ul>
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
