import React from 'react'
import './RNNDefinitionSlide.css'

function RNNDefinitionSlide() {
  return (
    <div className="slide rnn-definition-slide">
      <h1 className="slide-title-main">RNN : Définition</h1>
      
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

        {/* Section 2: Analogie */}
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

