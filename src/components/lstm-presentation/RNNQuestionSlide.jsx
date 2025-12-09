import React from 'react'
import './RNNQuestionSlide.css'
import questionImage from '../../img/2.png'

function RNNQuestionSlide() {
  return (
    <div className="slide rnn-question-slide">
      <h1 className="slide-title-main">Pensez-vous pourquoi ?</h1>

      <div className="question-content">
        <img src={questionImage} alt="Question" className="question-image" />
        <div className="question-box">
          <p className="question-text">
            Face aux difficultés des RNN sur les longues séquences, pourquoi perdent-ils
            le contexte initial ? Quels signaux ou mécanismes manquent pour retenir
            l&apos;information sur toute la durée ?
          </p>
        </div>
      </div>
    </div>
  )
}

export default RNNQuestionSlide

