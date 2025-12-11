import React, { useState } from 'react'
import './LSTMCaseStudySlide.css'

function LSTMCaseStudySlide() {
  const [currentStep, setCurrentStep] = useState(0)

  const codeSteps = [
    {
      step: 0,
      title: '1. Importation des Bibliothèques',
      code: `import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout`,
      explanation: 'Importation des bibliothèques nécessaires pour le traitement des données et la création du modèle LSTM.',
      math: null,
      mathExplanation: null
    },
    {
      step: 1,
      title: '2. Chargement et Préparation des Données',
      code: `# Charger les données
data = pd.read_csv('gold_price.csv')
prices = data['Price'].values.reshape(-1, 1)

# Normalisation (Min-Max Scaling)
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_prices = scaler.fit_transform(prices)`,
      explanation: 'Les données sont normalisées entre 0 et 1 pour améliorer la convergence du modèle et éviter les problèmes numériques.',
      math: 'x<sub>scaled</sub> = (x - x<sub>min</sub>) / (x<sub>max</sub> - x<sub>min</sub>)',
      mathExplanation: 'Normalisation Min-Max : transforme les valeurs dans l\'intervalle [0, 1]. Cela permet d\'éviter que certaines features dominent les autres et améliore la stabilité de l\'entraînement.'
    },
    {
      step: 2,
      title: '3. Création des Séquences',
      code: `def create_sequences(data, seq_length):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:i+seq_length])
        y.append(data[i+seq_length])
    return np.array(X), np.array(y)

seq_length = 60  # 60 jours de données
X_train, y_train = create_sequences(scaled_prices, seq_length)`,
      explanation: 'Création de séquences de 60 jours pour prédire le jour suivant. Chaque séquence X contient 60 valeurs consécutives, y contient la valeur suivante.',
      math: 'X[i] = [x<sub>i</sub>, x<sub>i+1</sub>, ..., x<sub>i+59</sub>]\ny[i] = x<sub>i+60</sub>',
      mathExplanation: 'Pour chaque position i, on prend 60 valeurs consécutives comme entrée (X[i]) et la 61ème valeur comme sortie (y[i]). Cela crée un dataset supervisé pour l\'entraînement.'
    },
    {
      step: 3,
      title: '4. Architecture du Modèle LSTM',
      code: `model = Sequential([
    LSTM(50, return_sequences=True, input_shape=(60, 1)),
    Dropout(0.2),
    LSTM(50, return_sequences=True),
    Dropout(0.2),
    LSTM(50),
    Dropout(0.2),
    Dense(1)
])`,
      explanation: 'Modèle avec 3 couches LSTM de 50 neurones chacune, avec Dropout pour éviter le surapprentissage. Chaque couche LSTM applique les formules vues précédemment.',
      math: 'h<sub>t</sub><sup>(l)</sup> = LSTM(h<sub>t-1</sub><sup>(l)</sup>, x<sub>t</sub><sup>(l)</sup>, C<sub>t-1</sub><sup>(l)</sup>)',
      mathExplanation: 'Chaque couche LSTM applique les formules LSTM (Forget Gate, Input Gate, Cell State, Output Gate). Le Dropout désactive aléatoirement 20% des neurones pendant l\'entraînement pour réduire le surapprentissage.'
    },
    {
      step: 4,
      title: '5. Compilation et Entraînement',
      code: `model.compile(optimizer='adam', loss='mean_squared_error')
model.fit(X_train, y_train, epochs=100, batch_size=32)`,
      explanation: 'Le modèle est entraîné avec l\'optimiseur Adam et la fonction de perte MSE. Adam adapte le taux d\'apprentissage pour chaque paramètre.',
      math: 'Loss = (1/n) Σ(y<sub>pred</sub> - y<sub>true</sub>)²',
      mathExplanation: 'Mean Squared Error : moyenne des carrés des différences entre prédictions et valeurs réelles. Adam optimise les poids (W<sub>f</sub>, W<sub>i</sub>, W<sub>C</sub>, W<sub>o</sub>) pour minimiser cette erreur via la rétropropagation.'
    },
    {
      step: 5,
      title: '6. Prédiction',
      code: `# Prédire les prix futurs
predictions = model.predict(X_test)
predicted_prices = scaler.inverse_transform(predictions)`,
      explanation: 'Les prédictions sont faites sur les données de test, puis dénormalisées pour obtenir les prix réels en dollars.',
      math: 'x<sub>original</sub> = x<sub>scaled</sub> × (x<sub>max</sub> - x<sub>min</sub>) + x<sub>min</sub>',
      mathExplanation: 'Dénormalisation inverse : on revient aux valeurs originales des prix en multipliant par l\'amplitude et en ajoutant le minimum.'
    },
    {
      step: 6,
      title: '7. Évaluation',
      code: `from sklearn.metrics import mean_absolute_error, r2_score

mae = mean_absolute_error(y_true, predicted_prices)
r2 = r2_score(y_true, predicted_prices)
accuracy = (1 - mae/mean_price) * 100  # ~96%`,
      explanation: 'Calcul de la précision : 96% signifie que l\'erreur moyenne est de 4% par rapport au prix moyen. R² mesure la qualité de l\'ajustement.',
      math: 'Accuracy = (1 - MAE / mean_price) × 100%\nMAE = (1/n) Σ|y<sub>pred</sub> - y<sub>true</sub>|',
      mathExplanation: 'MAE (Mean Absolute Error) mesure l\'erreur moyenne absolue. L\'accuracy est calculée comme le complément de l\'erreur relative. R² mesure la proportion de variance expliquée (proche de 1 = excellent).'
    }
  ]

  const currentStepData = codeSteps[currentStep]

  return (
    <div className="slide lstm-case-study-slide">
      <h1 className="slide-title-main">Étude de Cas : Prédiction du Prix de l'Or</h1>
      <p className="case-study-source">
        Source : <a href="https://www.kaggle.com/code/farzadnekouei/gold-price-prediction-lstm-96-accuracy" target="_blank" rel="noopener noreferrer">
          Kaggle - Gold Price Prediction LSTM (96% Accuracy)
        </a>
      </p>

      <div className="case-study-container">
        <div className="code-section">
          <div className="step-header">
            <h3>{currentStepData.title}</h3>
            <div className="step-navigation">
              <button
                className="nav-btn-small"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                ←
              </button>
              <span className="step-counter">{currentStep + 1} / {codeSteps.length}</span>
              <button
                className="nav-btn-small"
                onClick={() => setCurrentStep(Math.min(codeSteps.length - 1, currentStep + 1))}
                disabled={currentStep === codeSteps.length - 1}
              >
                →
              </button>
            </div>
          </div>

          <div className="code-box">
            <pre><code>{currentStepData.code}</code></pre>
          </div>

          <div className="explanation-box">
            <h4>💡 Explication :</h4>
            <p>{currentStepData.explanation}</p>
          </div>
        </div>

        {currentStepData.math && (
          <div className="math-section">
            <h3>📐 Formules Mathématiques :</h3>
            <div className="math-box">
              <p className="math-formula" dangerouslySetInnerHTML={{ __html: `<strong>${currentStepData.math}</strong>` }}></p>
              {currentStepData.mathExplanation && (
                <p className="math-explanation" dangerouslySetInnerHTML={{ __html: currentStepData.mathExplanation }}></p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="architecture-visualization">
        <h3>Architecture du Modèle :</h3>
        <div className="model-diagram">
          <div className="layer input-layer">
            <div className="layer-label">Input</div>
            <div className="layer-shape">(60, 1)</div>
          </div>
          <div className="arrow">→</div>
          <div className="layer lstm-layer">
            <div className="layer-label">LSTM(50)</div>
            <div className="layer-shape">50 neurones</div>
          </div>
          <div className="arrow">→</div>
          <div className="layer dropout-layer">
            <div className="layer-label">Dropout(0.2)</div>
          </div>
          <div className="arrow">→</div>
          <div className="layer lstm-layer">
            <div className="layer-label">LSTM(50)</div>
            <div className="layer-shape">50 neurones</div>
          </div>
          <div className="arrow">→</div>
          <div className="layer dropout-layer">
            <div className="layer-label">Dropout(0.2)</div>
          </div>
          <div className="arrow">→</div>
          <div className="layer lstm-layer">
            <div className="layer-label">LSTM(50)</div>
            <div className="layer-shape">50 neurones</div>
          </div>
          <div className="arrow">→</div>
          <div className="layer dropout-layer">
            <div className="layer-label">Dropout(0.2)</div>
          </div>
          <div className="arrow">→</div>
          <div className="layer output-layer">
            <div className="layer-label">Dense(1)</div>
            <div className="layer-shape">Prix prédit</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LSTMCaseStudySlide
