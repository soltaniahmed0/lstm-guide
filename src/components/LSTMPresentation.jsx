import React, { useState, useEffect } from 'react'
import './LSTMPresentation.css'
import TitleSlide from './lstm-presentation/TitleSlide'
import PlanSlide from './lstm-presentation/PlanSlide'
import IntroductionSlide from './lstm-presentation/IntroductionSlide'
import RNNDefinitionSlide from './lstm-presentation/RNNDefinitionSlide'
import RNNCasesSlide from './lstm-presentation/RNNCasesSlide'
import RNNSchemaSlide from './lstm-presentation/RNNSchemaSlide'
import RNNVectorSlide from './lstm-presentation/RNNVectorSlide'
import RNNWorkingSlide from './lstm-presentation/RNNWorkingSlide'
import RNNApplicationsSlide from './lstm-presentation/RNNApplicationsSlide'
import RNNFormulasSlide from './lstm-presentation/RNNFormulasSlide'
import RNNVanishingSlide from './lstm-presentation/RNNVanishingSlide'
import RNNExplodingSlide from './lstm-presentation/RNNExplodingSlide'
import LSTMDefinitionSlide from './lstm-presentation/LSTMDefinitionSlide'
import LSTMFormulasSlide from './lstm-presentation/LSTMFormulasSlide'
import LSTMArchitectureSlide from './lstm-presentation/LSTMArchitectureSlide'
import LSTMGatesSlide from './lstm-presentation/LSTMGatesSlide'
import LSTMCaseStudySlide from './lstm-presentation/LSTMCaseStudySlide'
import ConclusionSlide from './lstm-presentation/ConclusionSlide'
import WebographySlide from './lstm-presentation/WebographySlide'
import ThankYouSlide from './lstm-presentation/ThankYouSlide'

function LSTMPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const slides = [
    // 1. Titre
    { id: 'title', component: TitleSlide, title: 'Titre' },
    // 2. Plan
    { id: 'plan', component: PlanSlide, title: 'Plan' },
    // 3. Introduction (user story LSTM)
    { id: 'introduction', component: IntroductionSlide, title: 'Introduction' },
    // 4. RNN Section
    { id: 'rnn-definition', component: RNNDefinitionSlide, title: 'RNN - Définition' },
    { id: 'rnn-cases', component: RNNCasesSlide, title: 'RNN - Cas d\'Usage' },
    { id: 'rnn-applications', component: RNNApplicationsSlide, title: 'RNN - Applications (Many-to-Many, Many-to-One, One-to-Many)' },
    { id: 'rnn-formulas', component: RNNFormulasSlide, title: 'RNN - Architecture (Formules et Description)' },
    { id: 'rnn-schema', component: RNNSchemaSlide, title: 'RNN - Architecture (Schéma Animé)' },
    { id: 'rnn-vector', component: RNNVectorSlide, title: 'RNN - Architecture (Schéma avec Vecteurs)' },
    { id: 'rnn-working', component: RNNWorkingSlide, title: 'RNN - Comment Fonctionne (Calculs avec Valeurs Réelles)' },
    { id: 'rnn-vanishing', component: RNNVanishingSlide, title: 'RNN - Problème: Vanishing Gradient' },
    { id: 'rnn-exploding', component: RNNExplodingSlide, title: 'RNN - Problème: Exploding Gradient' },
    // 5. LSTM Section
    { id: 'lstm-definition', component: LSTMDefinitionSlide, title: 'LSTM - Définition' },
    { id: 'lstm-formulas', component: LSTMFormulasSlide, title: 'LSTM - Formules' },
    { id: 'lstm-architecture', component: LSTMArchitectureSlide, title: 'LSTM - Architecture' },
    { id: 'lstm-gates', component: LSTMGatesSlide, title: 'LSTM - Gates (5 Neurones)' },
    // 6. Étude de Cas
    { id: 'case-study', component: LSTMCaseStudySlide, title: 'Étude de Cas - Prédiction Prix de l\'Or' },
    // 7. Conclusion
    { id: 'conclusion', component: ConclusionSlide, title: 'Conclusion et Perspectives' },
    // 8. Webographie
    { id: 'webography', component: WebographySlide, title: 'Webographie' },
    // 9. Merci
    { id: 'thank-you', component: ThankYouSlide, title: 'Merci pour votre attention' }
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrevious()
      } else if (e.key === 'Escape') {
        setIsFullscreen(false)
        if (document.fullscreenElement) {
          document.exitFullscreen()
        }
      } else if (e.key === 'f' || e.key === 'F') {
        if (e.ctrlKey || e.metaKey || e.key === 'F11') {
          e.preventDefault()
          toggleFullscreen()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide])

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const elem = document.documentElement
      if (elem.requestFullscreen) {
        elem.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
      }
    }
  }

  const CurrentSlideComponent = slides[currentSlide].component
  const progress = ((currentSlide + 1) / slides.length) * 100

  return (
    <div className={`lstm-presentation ${isFullscreen ? 'fullscreen' : ''}`}>
      {!isFullscreen && (
        <div className="presentation-header">
          <div className="header-info">
            <span className="slide-counter">{currentSlide + 1} / {slides.length}</span>
            <span className="slide-title">{slides[currentSlide].title}</span>
          </div>
          <div className="header-controls">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <button className="fullscreen-btn" onClick={toggleFullscreen} title="Mode Présentation (F11)">
              ⛶
            </button>
          </div>
        </div>
      )}

      <div className="slide-container">
        <CurrentSlideComponent />
      </div>

      {!isFullscreen && (
        <div className="presentation-nav">
          <button
            className="nav-btn prev"
            onClick={handlePrevious}
            disabled={currentSlide === 0}
          >
            ← Précédent
          </button>
          <div className="slide-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => {
                  setCurrentSlide(index)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              />
            ))}
          </div>
          <button
            className="nav-btn next"
            onClick={handleNext}
            disabled={currentSlide === slides.length - 1}
          >
            Suivant →
          </button>
        </div>
      )}
    </div>
  )
}

export default LSTMPresentation

