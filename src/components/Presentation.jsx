import React, { useState, useEffect } from 'react'
import RNNExplanation from './RNNExplanation'
import LSTMvsRNN from './LSTMvsRNN'
import LSTMCalculator from './LSTMCalculator'
import LSTMSchema from './LSTMSchema'
import RealExamples from './RealExamples'
import LSTMCodeExamples from './LSTMCodeExamples'
import LSTMTextExamples from './LSTMTextExamples'
import LSTMFormulas from './LSTMFormulas'
import Quiz from './Quiz'
import RNNPlayground from './RNNPlayground'
import LSTMPlayground from './LSTMPlayground'
import { quizData } from '../data/quizData'
import './Presentation.css'

function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [presentationMode, setPresentationMode] = useState(false)
  const [quizScores, setQuizScores] = useState({})
  
  const handleQuizComplete = (quizId, percentage) => {
    setQuizScores({
      ...quizScores,
      [quizId]: percentage
    })
  }

  const [inputs, setInputs] = useState({
    ht_prev: 1,
    xt: 1,
    ct_prev: 2
  })
  const [schemaValues, setSchemaValues] = useState({
    ct_prev: 2,
    ht_prev: 1,
    xt: 1,
    ft: null,
    it: null,
    ctilde: null,
    ot: null,
    ft_ct: null,
    it_ctilde: null,
    ct: null,
    tanh_ct: null,
    ht: null
  })

  const slides = [
    {
      id: 'welcome',
      title: 'Bienvenue',
      component: 'welcome'
    },
    {
      id: 'rnn-intro',
      title: '1. Qu\'est-ce qu\'un RNN ?',
      component: 'rnn-intro',
      section: 'introduction'
    },
    {
      id: 'rnn-architecture',
      title: '2. Architecture RNN',
      component: 'rnn-architecture',
      section: 'architecture'
    },
    {
      id: 'rnn-how',
      title: '3. Fonctionnement RNN',
      component: 'rnn-how',
      section: 'how-it-works'
    },
    {
      id: 'rnn-calc',
      title: '4. Calculs RNN',
      component: 'rnn-calc',
      section: 'calculations'
    },
    {
      id: 'rnn-problems',
      title: '5. Problèmes des RNN',
      component: 'rnn-problems',
      section: 'problems'
    },
    {
      id: 'rnn-examples',
      title: '6. Exemples RNN',
      component: 'rnn-examples',
      section: 'examples'
    },
    {
      id: 'quiz-rnn',
      title: '📝 Quiz RNN',
      component: 'quiz-rnn',
      quizType: 'rnn'
    },
    {
      id: 'rnn-playground',
      title: '🧪 RNN Playground',
      component: 'rnn-playground'
    },
    {
      id: 'rnn-vs-lstm',
      title: '7. RNN vs LSTM',
      component: 'rnn-vs-lstm',
      tab: 'comparison'
    },
    {
      id: 'quiz-comparison',
      title: '📝 Quiz RNN vs LSTM',
      component: 'quiz-comparison',
      quizType: 'comparison'
    },
    {
      id: 'lstm-intro',
      title: '8. Qu\'est-ce que LSTM ?',
      component: 'lstm-intro',
      tab: 'solution'
    },
    {
      id: 'lstm-formulas',
      title: '9. Formules Mathématiques LSTM',
      component: 'lstm-formulas'
    },
    {
      id: 'lstm-advantages',
      title: '10. Avantages LSTM',
      component: 'lstm-advantages',
      tab: 'advantages'
    },
    {
      id: 'quiz-lstm',
      title: '📝 Quiz LSTM',
      component: 'quiz-lstm',
      quizType: 'lstm'
    },
    {
      id: 'lstm-playground',
      title: '🧪 LSTM Playground',
      component: 'lstm-playground'
    },
    {
      id: 'real-examples',
      title: '11. Exemples Réels',
      component: 'real-examples'
    },
    {
      id: 'lstm-text-examples',
      title: '12. Exemples Textuels LSTM',
      component: 'lstm-text-examples'
    },
    {
      id: 'lstm-code',
      title: '13. Code LSTM (Kaggle)',
      component: 'lstm-code'
    },
    {
      id: 'lstm-calculator',
      title: '14. Calculateur LSTM',
      component: 'lstm-calculator'
    },
    {
      id: 'lstm-schema',
      title: '15. Schéma LSTM',
      component: 'lstm-schema'
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      component: 'conclusion'
    }
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

  const handleSlideClick = (index) => {
    setCurrentSlide(index)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
        e.preventDefault()
        setPresentationMode(false)
      } else if (e.key === 'f' || e.key === 'F') {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          setPresentationMode(!presentationMode)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide, presentationMode])

  useEffect(() => {
    if (presentationMode) {
      // Essayer le mode plein écran
      const elem = document.documentElement
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(() => {
          // Si le fullscreen échoue, continuer quand même
        })
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {})
      }
    }
  }, [presentationMode])

  const currentSlideData = slides[currentSlide]
  const progress = ((currentSlide + 1) / slides.length) * 100

  const renderSlide = () => {
    switch (currentSlideData.component) {
      case 'welcome':
        return (
          <div className="welcome-slide">
            <div className="welcome-content">
              <h1>🧠 Apprentissage des RNN et LSTM</h1>
              <p className="welcome-subtitle">Un parcours pédagogique complet</p>
              <div className="welcome-info">
                <div className="info-item">
                  <span className="info-icon">📚</span>
                  <div>
                    <h3>14 Sections</h3>
                    <p>De RNN à LSTM, tout est expliqué en détail</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">🎯</span>
                  <div>
                    <h3>Roadmap Structuré</h3>
                    <p>Suivez le parcours étape par étape</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">💡</span>
                  <div>
                    <h3>Exemples Pratiques</h3>
                    <p>Avec calculs détaillés et visualisations</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">📝</span>
                  <div>
                    <h3>Quiz Interactifs</h3>
                    <p>Testez votre compréhension après chaque partie</p>
                  </div>
                </div>
              </div>
              <div className="navigation-hint">
                <p>💡 Utilisez les flèches ← → ou les boutons pour naviguer</p>
                <p>📝 Des quiz vous attendent après chaque section importante</p>
              </div>
            </div>
          </div>
        )

      case 'rnn-intro':
      case 'rnn-architecture':
      case 'rnn-how':
      case 'rnn-calc':
      case 'rnn-problems':
      case 'rnn-examples':
        return (
          <RNNExplanation 
            activeSection={currentSlideData.section}
            presentationMode={true}
          />
        )

      case 'quiz-rnn':
        return (
          <Quiz 
            quizData={quizData.rnn}
            presentationMode={true}
            onComplete={(score) => handleQuizComplete('rnn', score)}
          />
        )

      case 'rnn-playground':
        return (
          <RNNPlayground presentationMode={true} />
        )

      case 'rnn-vs-lstm':
        return (
          <LSTMvsRNN 
            defaultTab={currentSlideData.tab}
            presentationMode={true}
          />
        )

      case 'lstm-intro':
      case 'lstm-advantages':
        return (
          <LSTMvsRNN 
            defaultTab={currentSlideData.tab}
            presentationMode={true}
          />
        )

      case 'quiz-lstm':
        return (
          <Quiz 
            quizData={quizData.lstm}
            presentationMode={true}
            onComplete={(score) => handleQuizComplete('lstm', score)}
          />
        )

      case 'lstm-playground':
        return (
          <LSTMPlayground presentationMode={true} />
        )

      case 'quiz-comparison':
        return (
          <Quiz 
            quizData={quizData.comparison}
            presentationMode={true}
            onComplete={(score) => handleQuizComplete('comparison', score)}
          />
        )

      case 'lstm-formulas':
        return (
          <LSTMFormulas presentationMode={true} />
        )

      case 'real-examples':
        return (
          <RealExamples presentationMode={true} />
        )

      case 'lstm-text-examples':
        return (
          <LSTMTextExamples presentationMode={true} />
        )

      case 'lstm-code':
        return (
          <LSTMCodeExamples presentationMode={true} />
        )

      case 'lstm-calculator':
        return (
          <LSTMCalculator 
            inputs={inputs}
            setInputs={setInputs}
            setSchemaValues={setSchemaValues}
            presentationMode={true}
          />
        )

      case 'lstm-schema':
        return (
          <LSTMSchema 
            inputs={inputs}
            schemaValues={schemaValues}
            presentationMode={true}
          />
        )

      case 'conclusion':
        return (
          <div className="conclusion-slide">
            <div className="conclusion-content">
              <h1>🎉 Félicitations !</h1>
              <p className="conclusion-subtitle">Vous avez terminé le parcours complet</p>
              
              <div className="summary">
                <h2>Résumé de ce que vous avez appris :</h2>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-icon">🔄</span>
                    <h3>RNN</h3>
                    <p>Réseaux de neurones récurrents pour traiter les séquences</p>
                  </div>
                  <div className="summary-item">
                    <span className="summary-icon">⚠️</span>
                    <h3>Problèmes RNN</h3>
                    <p>Gradient qui disparaît, mémoire limitée</p>
                  </div>
                  <div className="summary-item">
                    <span className="summary-icon">✅</span>
                    <h3>LSTM</h3>
                    <p>Solution avec gates pour contrôler la mémoire</p>
                  </div>
                  <div className="summary-item">
                    <span className="summary-icon">🧮</span>
                    <h3>Calculs</h3>
                    <p>Forget, Input, Output gates et Cell State</p>
                  </div>
                </div>
              </div>

              {Object.keys(quizScores).length > 0 && (
                <div className="quiz-scores-summary">
                  <h2>📊 Résultats des Quiz :</h2>
                  <div className="scores-grid">
                    {quizScores.rnn !== undefined && (
                      <div className={`score-card ${quizScores.rnn >= 70 ? 'pass' : 'fail'}`}>
                        <div className="score-topic">Quiz RNN</div>
                        <div className="score-value">{quizScores.rnn}%</div>
                        {quizScores.rnn >= 70 ? '✅' : '📚'}
                      </div>
                    )}
                    {quizScores.lstm !== undefined && (
                      <div className={`score-card ${quizScores.lstm >= 70 ? 'pass' : 'fail'}`}>
                        <div className="score-topic">Quiz LSTM</div>
                        <div className="score-value">{quizScores.lstm}%</div>
                        {quizScores.lstm >= 70 ? '✅' : '📚'}
                      </div>
                    )}
                    {quizScores.comparison !== undefined && (
                      <div className={`score-card ${quizScores.comparison >= 70 ? 'pass' : 'fail'}`}>
                        <div className="score-topic">Quiz Comparaison</div>
                        <div className="score-value">{quizScores.comparison}%</div>
                        {quizScores.comparison >= 70 ? '✅' : '📚'}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="next-steps">
                <h2>Prochaines Étapes :</h2>
                <ul>
                  <li>Pratiquez avec le calculateur LSTM</li>
                  <li>Explorez les exemples réels</li>
                  <li>Implémentez votre propre LSTM</li>
                  <li>Apprenez d'autres architectures (GRU, Transformer)</li>
                </ul>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`presentation-container ${presentationMode ? 'canva-mode' : ''}`}>
      {!presentationMode && (
        <>
          <div className="presentation-header">
            <div className="header-left">
              <div className="slide-counter">
                Slide {currentSlide + 1} / {slides.length}
              </div>
              <div className="slide-title">{currentSlideData.title}</div>
            </div>
            <div className="header-right">
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
              <button 
                className="presentation-mode-btn"
                onClick={() => setPresentationMode(true)}
                title="Mode Présentation (F11 ou Cmd/Ctrl+F)"
              >
                🎬 Mode Présentation
              </button>
            </div>
          </div>

          <div className="roadmap-sidebar">
            <h3>🗺️ Roadmap</h3>
            <div className="roadmap-steps">
              {slides.map((slide, index) => {
                const isQuiz = slide.component && slide.component.startsWith('quiz-')
                const quizType = slide.quizType
                const quizScore = quizType ? quizScores[quizType] : null
                
                return (
                  <div
                    key={slide.id}
                    className={`roadmap-step ${index === currentSlide ? 'active' : ''} ${index < currentSlide ? 'completed' : ''} ${isQuiz ? 'quiz-step' : ''}`}
                    onClick={() => handleSlideClick(index)}
                  >
                    <div className="step-number">{index + 1}</div>
                    <div className="step-title">{slide.title}</div>
                    {index < currentSlide && !isQuiz && <span className="step-check">✓</span>}
                    {isQuiz && quizScore !== undefined && (
                      <div className={`quiz-score-badge ${quizScore >= 70 ? 'pass' : 'fail'}`}>
                        {quizScore}%
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}

      <div className={`slide-content ${presentationMode ? 'fullscreen' : ''}`}>
        {presentationMode && (
          <div className="presentation-overlay-header">
            <div className="overlay-slide-info">
              <span className="overlay-slide-number">{currentSlide + 1} / {slides.length}</span>
              <span className="overlay-slide-title">{currentSlideData.title}</span>
            </div>
            <button 
              className="exit-presentation-btn"
              onClick={() => setPresentationMode(false)}
              title="Quitter (ESC)"
            >
              ✕
            </button>
          </div>
        )}
        {renderSlide()}
      </div>

      {presentationMode ? (
        <div className="presentation-controls-overlay">
          <button 
            className="nav-button-overlay prev"
            onClick={handlePrevious}
            disabled={currentSlide === 0}
            title="Précédent (←)"
          >
            ←
          </button>
          
          <div className="slide-indicators-overlay">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator-overlay ${index === currentSlide ? 'active' : ''}`}
                onClick={() => handleSlideClick(index)}
                title={slides[index].title}
              />
            ))}
          </div>

          <button 
            className="nav-button-overlay next"
            onClick={handleNext}
            disabled={currentSlide === slides.length - 1}
            title="Suivant (→)"
          >
            →
          </button>
        </div>
      ) : (
        <div className="presentation-controls">
          <button 
            className="nav-button prev"
            onClick={handlePrevious}
            disabled={currentSlide === 0}
          >
            ← Précédent
          </button>
          
          <div className="slide-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => handleSlideClick(index)}
                title={slides[index].title}
              />
            ))}
          </div>

          <button 
            className="nav-button next"
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

export default Presentation

