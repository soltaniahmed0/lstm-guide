import React from 'react'
import './RNNGeneralProblemSlide.css'
import problemImage from '../../img/10.png'

function RNNGeneralProblemSlide() {
  return (
    <div className="slide rnn-general-problem-slide">
      <h1 className="slide-title-main">Le Problème Général des RNN</h1>
      
      <div className="problem-content-wrapper">
        {/* Section principale du problème */}
        <div className="problem-main-section">
          <div>
            {/* Exemple visuel avec la photo */}
            <div className="example-visualization">
              <img src={problemImage} alt="Problème de mémoire RNN" className="problem-image" />
            </div>

            <div className="problem-description-card">
              <h2>🧠 Le Problème de Mémoire à Long Terme</h2>
              <p className="main-problem-text">
                Les RNN ont du mal à retenir des informations sur de <strong>longues séquences</strong>. 
                Quand ils traitent une phrase ou une série de données, ils <strong>"oublient" progressivement</strong> 
                les informations du début au fur et à mesure qu'ils avancent.
              </p>
              <p className="example-text">
                Par exemple, si vous avez une phrase longue, le réseau peut <strong>oublier le sujet mentionné au début</strong> 
                quand il arrive à la fin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RNNGeneralProblemSlide

