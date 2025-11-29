import React, { useState } from 'react'
import './Quiz.css'

function Quiz({ quizData, presentationMode = false, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (showResults) return
    
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    })
  }

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    let correct = 0
    quizData.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    setScore(correct)
    setShowResults(true)
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setScore(0)
  }

  const currentQ = quizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100
  const answeredCount = Object.keys(selectedAnswers).length

  if (showResults) {
    const percentage = Math.round((score / quizData.questions.length) * 100)
    const isPassing = percentage >= 70

    return (
      <div className={`quiz-container ${presentationMode ? 'presentation-mode' : ''}`}>
        <div className="quiz-results">
          <div className={`results-header ${isPassing ? 'pass' : 'fail'}`}>
            <div className="results-icon">
              {isPassing ? '🎉' : '📚'}
            </div>
            <h2>Résultats du Quiz</h2>
            <div className="score-display">
              <div className="score-number">{score} / {quizData.questions.length}</div>
              <div className="score-percentage">{percentage}%</div>
            </div>
          </div>

          <div className="results-details">
            <p className={`results-message ${isPassing ? 'pass' : 'fail'}`}>
              {isPassing 
                ? `Félicitations ! Vous avez bien compris ${quizData.topic}.`
                : `Vous avez besoin de réviser ${quizData.topic}. Score minimum : 70%`
              }
            </p>

            <div className="questions-review">
              <h3>Révision des Questions :</h3>
              {quizData.questions.map((question, index) => {
                const isCorrect = selectedAnswers[index] === question.correctAnswer
                const userAnswer = selectedAnswers[index] !== undefined 
                  ? question.options[selectedAnswers[index]]
                  : "Non répondue"

                return (
                  <div key={index} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="review-question">
                      <strong>Question {index + 1} :</strong> {question.question}
                    </div>
                    <div className="review-answers">
                      <div className={`review-answer user ${isCorrect ? 'correct' : 'incorrect'}`}>
                        <span className="review-label">Votre réponse :</span>
                        {userAnswer}
                        {isCorrect ? ' ✓' : ' ✗'}
                      </div>
                      {!isCorrect && (
                        <div className="review-answer correct">
                          <span className="review-label">Bonne réponse :</span>
                          {question.options[question.correctAnswer]}
                        </div>
                      )}
                      {question.explanation && (
                        <div className="review-explanation">
                          <strong>💡 Explication :</strong> {question.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="results-actions">
            <button className="retry-button" onClick={handleRetry}>
              🔄 Réessayer
            </button>
            {onComplete && (
              <button className="continue-button" onClick={() => onComplete(percentage)}>
                {isPassing ? '✅ Continuer' : '📖 Réviser puis Continuer'}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`quiz-container ${presentationMode ? 'presentation-mode' : ''}`}>
      {!presentationMode && (
        <>
          <h2>📝 Quiz : {quizData.topic}</h2>
          <p className="quiz-description">{quizData.description}</p>
        </>
      )}

      <div className="quiz-progress">
        <div className="progress-info">
          <span>Question {currentQuestion + 1} sur {quizData.questions.length}</span>
          <span>{answeredCount} / {quizData.questions.length} répondues</span>
        </div>
        <div className="progress-bar-quiz">
          <div className="progress-fill-quiz" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="question-container">
        <div className="question-header">
          <div className="question-number">Question {currentQuestion + 1}</div>
          <div className="question-points">{currentQ.points || 1} point{currentQ.points > 1 ? 's' : ''}</div>
        </div>

        <div className="question-text">
          {currentQ.question}
        </div>

        {currentQ.image && (
          <div className="question-image">
            <img src={currentQ.image} alt="Question illustration" />
          </div>
        )}

        <div className="options-container">
          {currentQ.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestion] === index
            return (
              <div
                key={index}
                className={`option-item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(currentQuestion, index)}
              >
                <div className="option-radio">
                  {isSelected && <div className="radio-fill"></div>}
                </div>
                <div className="option-text">{option}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="quiz-navigation">
        <button
          className="nav-btn prev"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          ← Précédent
        </button>

        <div className="question-indicators">
          {quizData.questions.map((_, index) => (
            <button
              key={index}
              className={`question-dot ${
                index === currentQuestion ? 'active' : ''
              } ${
                selectedAnswers[index] !== undefined ? 'answered' : ''
              }`}
              onClick={() => setCurrentQuestion(index)}
              title={`Question ${index + 1}`}
            />
          ))}
        </div>

        {currentQuestion === quizData.questions.length - 1 ? (
          <button
            className="nav-btn submit"
            onClick={handleSubmit}
            disabled={answeredCount < quizData.questions.length}
          >
            {answeredCount < quizData.questions.length 
              ? `Répondre aux ${quizData.questions.length - answeredCount} questions restantes`
              : '✅ Soumettre'
            }
          </button>
        ) : (
          <button
            className="nav-btn next"
            onClick={handleNext}
          >
            Suivant →
          </button>
        )}
      </div>
    </div>
  )
}

export default Quiz

