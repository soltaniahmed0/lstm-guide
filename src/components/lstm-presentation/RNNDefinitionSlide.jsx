import React from 'react'
import './RNNDefinitionSlide.css'

function RNNDefinitionSlide() {
  return (
    <div className="slide rnn-definition-slide">
      <h1 className="slide-title-main">RNN : Définition</h1>
      <p className="subtitle">Réseau de Neurones Récurrent - Introduction aux concepts fondamentaux</p>
      
      <div className="definition-container">
        {/* Section 1: Définition principale */}
        <section className="section">
          <div className="definition-card main">
            <h2 className="section-title">🎯 Qu'est-ce qu'un RNN ?</h2>
            <div className="definition-content">
              <p className="definition-text">
                Un <strong>Réseau de Neurones Récurrent (RNN)</strong> est un type de réseau de neurones artificiels 
                conçu pour traiter des <strong>séquences de données</strong> où l'ordre et le contexte temporel sont importants.
              </p>
              <div className="definition-highlight">
                <p><strong>Point clé :</strong> Contrairement aux réseaux de neurones classiques, les RNN peuvent utiliser leur sortie précédente comme entrée, créant une mémoire interne.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Caractéristiques clés */}
        <section className="section">
          <h3 className="section-title">✨ Caractéristiques Clés</h3>
          <div className="characteristics-grid grid-4">
            <div className="characteristic-item feature-card">
              <div className="char-icon">🧠</div>
              <h4>Mémoire</h4>
              <p>Les RNN ont une mémoire interne qui leur permet de se souvenir des informations précédentes</p>
            </div>
            <div className="characteristic-item feature-card">
              <div className="char-icon">🔄</div>
              <h4>Récurrence</h4>
              <p>Les connexions forment des cycles, permettant à l'information de persister dans le temps</p>
            </div>
            <div className="characteristic-item feature-card">
              <div className="char-icon">⏱️</div>
              <h4>Séquentiel</h4>
              <p>Traite les données étape par étape, en tenant compte du contexte précédent</p>
            </div>
            <div className="characteristic-item feature-card">
              <div className="char-icon">⚖️</div>
              <h4>Paramètres Partagés</h4>
              <p>Les mêmes poids sont utilisés à chaque étape temporelle (efficacité computationnelle)</p>
            </div>
          </div>
        </section>

        {/* Section 3: Analogie */}
        <section className="section">
          <div className="analogy info-box">
            <h3 className="section-title">💡 Analogie</h3>
            <p>
              Comme lire un livre : vous vous souvenez de ce que vous avez lu précédemment pour comprendre la phrase actuelle.
              Un RNN fait la même chose avec les données séquentielles - il utilise le contexte passé pour traiter l'information présente.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default RNNDefinitionSlide

