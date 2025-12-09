import React from 'react'
import './LSTMSolutionQuestionSlide.css'
import solutionImage from '../../img/s.png'

function LSTMSolutionQuestionSlide() {
  return (
    <div className="slide lstm-solution-question-slide">
      <h1 className="slide-title-main">Pensez-vous quelle est la solution ?</h1>
      
      <div className="question-content-wrapper">
        <div className="question-image-section">
          <img src={solutionImage} alt="Solution" className="solution-image" />
        </div>
        <div className="question-text-section">
          <div className="question-card">
            <h2>💭 Réfléchissons...</h2>
            <p className="question-text">
              Après avoir vu les problèmes des RNN (oubli sur longues séquences, vanishing gradient, exploding gradient), 
              <strong> quelle pourrait être la solution ?</strong>
            </p>
            <p className="hint-text">
              Comment pourrait-on permettre au réseau de mieux retenir les informations sur de longues séquences ?
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LSTMSolutionQuestionSlide

