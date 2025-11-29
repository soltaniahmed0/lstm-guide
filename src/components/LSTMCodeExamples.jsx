import React, { useState } from 'react'
import './LSTMCodeExamples.css'

function LSTMCodeExamples({ presentationMode = false }) {
  const [activeExample, setActiveExample] = useState(0)

  const examples = [
    {
      title: "Exemple 1 : Analyse de Sentiment avec LSTM",
      description: "Classification de texte en positif/négatif",
      code: `import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Embedding
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# 1. Préparation des données
texts = [
    "J'adore ce film, il est excellent !",
    "Ce produit est vraiment mauvais.",
    "Le service était parfait, je recommande.",
    "Très déçu par la qualité."
]
labels = [1, 0, 1, 0]  # 1 = positif, 0 = négatif

# 2. Tokenisation
tokenizer = Tokenizer(num_words=1000)
tokenizer.fit_on_texts(texts)
sequences = tokenizer.texts_to_sequences(texts)

# 3. Padding pour avoir des séquences de même longueur
max_length = 20
X = pad_sequences(sequences, maxlen=max_length, padding='post')

# 4. Création du modèle LSTM
model = Sequential([
    # Couche d'embedding : convertit les mots en vecteurs
    Embedding(input_dim=1000,      # Taille du vocabulaire
              output_dim=128,       # Dimension des vecteurs
              input_length=max_length),
    
    # Couche LSTM : traite la séquence
    LSTM(units=64,                 # 64 neurones dans la couche LSTM
         return_sequences=False),  # Retourne seulement le dernier état
    
    # Couche dense pour la classification
    Dense(units=1,                 # 1 sortie (positif/négatif)
          activation='sigmoid')    # Sigmoid pour probabilité
])

# 5. Compilation du modèle
model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# 6. Entraînement
model.fit(X, np.array(labels), 
          epochs=10, 
          batch_size=32,
          validation_split=0.2)

# 7. Prédiction
new_text = "Ce film est génial !"
new_sequence = tokenizer.texts_to_sequences([new_text])
new_padded = pad_sequences(new_sequence, maxlen=max_length, padding='post')
prediction = model.predict(new_padded)
print(f"Sentiment: {'Positif' if prediction[0][0] > 0.5 else 'Négatif'}")`,
      explanation: {
        step1: "Tokenisation : Transforme chaque mot en nombre unique (ex: 'J'adore' → 1, 'ce' → 2)",
        step2: "Embedding : Chaque nombre devient un vecteur de 128 dimensions contenant la signification du mot",
        step3: "LSTM : Traite la séquence mot par mot, en gardant le contexte de tous les mots précédents",
        step4: "Dense : Transforme la sortie LSTM en probabilité (0 à 1) pour la classification",
        step5: "Le modèle apprend à reconnaître les patterns de mots qui indiquent un sentiment positif ou négatif"
      }
    },
    {
      title: "Exemple 2 : Prédiction de Série Temporelle",
      description: "Prédire le prix d'une action avec LSTM",
      code: `import numpy as np
import pandas as pd
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from sklearn.preprocessing import MinMaxScaler

# 1. Chargement des données
data = pd.read_csv('stock_prices.csv')
prices = data['Close'].values.reshape(-1, 1)

# 2. Normalisation (entre 0 et 1)
scaler = MinMaxScaler()
prices_scaled = scaler.fit_transform(prices)

# 3. Création des séquences
def create_sequences(data, seq_length=60):
    X, y = [], []
    for i in range(len(data) - seq_length):
        # Prendre 60 prix consécutifs
        X.append(data[i:i+seq_length])
        # Prédire le prix suivant
        y.append(data[i+seq_length])
    return np.array(X), np.array(y)

seq_length = 60
X, y = create_sequences(prices_scaled, seq_length)

# 4. Division train/test
split = int(0.8 * len(X))
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

# 5. Création du modèle LSTM
model = Sequential([
    # Première couche LSTM avec return_sequences=True
    LSTM(units=50,                 # 50 neurones
         return_sequences=True,    # Retourne toutes les sorties
         input_shape=(seq_length, 1)),
    Dropout(0.2),                 # Évite le surapprentissage
    
    # Deuxième couche LSTM
    LSTM(units=50, 
         return_sequences=False),  # Dernière couche LSTM
    Dropout(0.2),
    
    # Couche de sortie
    Dense(units=1)                 # Prédit un seul prix
])

# 6. Compilation
model.compile(optimizer='adam', loss='mean_squared_error')

# 7. Entraînement
model.fit(X_train, y_train,
          epochs=50,
          batch_size=32,
          validation_data=(X_test, y_test))

# 8. Prédiction
last_60_prices = prices_scaled[-60:].reshape(1, 60, 1)
predicted_scaled = model.predict(last_60_prices)
predicted_price = scaler.inverse_transform(predicted_scaled)
print(f"Prix prédit: {predicted_price[0][0]:.2f}")`,
      explanation: {
        step1: "Normalisation : Les prix sont mis à l'échelle entre 0 et 1 pour faciliter l'apprentissage",
        step2: "Séquences : On crée des fenêtres de 60 prix pour prédire le 61ème",
        step3: "LSTM empilées : La première garde toutes les sorties, la seconde ne garde que la dernière",
        step4: "Dropout : Réduit le surapprentissage en désactivant aléatoirement 20% des neurones",
        step5: "Le modèle apprend les patterns temporels (tendances, cycles) dans les prix"
      }
    },
    {
      title: "Exemple 3 : Génération de Texte",
      description: "Générer du texte avec LSTM (Char-RNN)",
      code: `import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.utils import to_categorical

# 1. Préparation du texte
text = """
Il était une fois un prince qui vivait dans un château.
Le château était très grand et magnifique.
"""
text = text.lower()

# 2. Création du vocabulaire (caractères)
chars = sorted(list(set(text)))
char_to_int = {char: i for i, char in enumerate(chars)}
int_to_char = {i: char for i, char in enumerate(chars)}
vocab_size = len(chars)

# 3. Création des séquences
seq_length = 40
X_data = []
y_data = []

for i in range(0, len(text) - seq_length):
    # Séquence de 40 caractères
    seq_in = text[i:i + seq_length]
    # Caractère suivant à prédire
    seq_out = text[i + seq_length]
    
    X_data.append([char_to_int[char] for char in seq_in])
    y_data.append(char_to_int[seq_out])

X = np.reshape(X_data, (len(X_data), seq_length, 1))
X = X / float(vocab_size)  # Normalisation
y = to_categorical(y_data)  # Encodage one-hot

# 4. Modèle LSTM pour génération
model = Sequential([
    LSTM(units=256,                # 256 neurones pour plus de capacité
         input_shape=(X.shape[1], X.shape[2]),
         return_sequences=True),     # Important pour génération
    Dropout(0.2),
    
    LSTM(units=256, 
         return_sequences=False),
    Dropout(0.2),
    
    Dense(units=vocab_size,         # Un neurone par caractère possible
          activation='softmax')      # Probabilité pour chaque caractère
])

model.compile(loss='categorical_crossentropy', 
              optimizer='adam')

# 5. Entraînement
model.fit(X, y, epochs=50, batch_size=128)

# 6. Génération de texte
def generate_text(model, seed_text, length=100):
    generated = seed_text
    
    for _ in range(length):
        # Préparer la séquence d'entrée
        x = np.array([[char_to_int[char] for char in seed_text]])
        x = np.reshape(x, (1, len(seed_text), 1))
        x = x / float(vocab_size)
        
        # Prédire le prochain caractère
        prediction = model.predict(x, verbose=0)
        index = np.argmax(prediction)
        result = int_to_char[index]
        
        generated += result
        seed_text = seed_text[1:] + result  # Décaler la fenêtre
    
    return generated

# Générer du texte
seed = "il était une fois"
generated = generate_text(model, seed, 200)
print(generated)`,
      explanation: {
        step1: "Vocabulaire de caractères : Chaque caractère unique a un nombre associé",
        step2: "Séquences de caractères : On prend 40 caractères pour prédire le 41ème",
        step3: "Softmax : Produit une probabilité pour chaque caractère possible du vocabulaire",
        step4: "Génération : On prédit caractère par caractère, en utilisant les caractères précédents comme contexte",
        step5: "Le LSTM apprend les patterns de langue (grammaire, style) du texte d'entraînement"
      }
    },
    {
      title: "Exemple 4 : Traduction Automatique (Encoder-Decoder)",
      description: "Traduire de l'anglais vers le français avec LSTM",
      code: `import numpy as np
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, LSTM, Dense, Embedding
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# 1. Données de traduction
english_sentences = [
    "Hello, how are you?",
    "What is your name?",
    "I love this place."
]
french_sentences = [
    "Bonjour, comment allez-vous ?",
    "Quel est votre nom ?",
    "J'adore cet endroit."
]

# 2. Tokenisation
eng_tokenizer = Tokenizer()
eng_tokenizer.fit_on_texts(english_sentences)
eng_sequences = eng_tokenizer.texts_to_sequences(english_sentences)

fr_tokenizer = Tokenizer()
fr_tokenizer.fit_on_texts(french_sentences)
fr_sequences = fr_tokenizer.texts_to_sequences(french_sentences)

# 3. Padding
max_eng_len = 10
max_fr_len = 12
eng_vocab_size = len(eng_tokenizer.word_index) + 1
fr_vocab_size = len(fr_tokenizer.word_index) + 1

encoder_inputs = pad_sequences(eng_sequences, maxlen=max_eng_len, padding='post')
decoder_inputs = pad_sequences(fr_sequences, maxlen=max_fr_len, padding='post')

# 4. Architecture Encoder-Decoder
# ENCODER : Encode la phrase anglaise
encoder_input = Input(shape=(None,))
encoder_embedding = Embedding(eng_vocab_size, 256)(encoder_input)
encoder_lstm = LSTM(256, return_state=True)
encoder_outputs, state_h, state_c = encoder_lstm(encoder_embedding)
encoder_states = [state_h, state_c]  # États finaux de l'encodeur

# DECODER : Décode en français
decoder_input = Input(shape=(None,))
decoder_embedding = Embedding(fr_vocab_size, 256)(decoder_input)
decoder_lstm = LSTM(256, return_sequences=True, return_state=True)
decoder_outputs, _, _ = decoder_lstm(decoder_embedding, 
                                     initial_state=encoder_states)
decoder_dense = Dense(fr_vocab_size, activation='softmax')
decoder_outputs = decoder_dense(decoder_outputs)

# 5. Modèle complet
model = Model([encoder_input, decoder_input], decoder_outputs)
model.compile(optimizer='adam', 
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# 6. Préparation des données pour l'entraînement
decoder_targets = np.zeros((len(fr_sequences), max_fr_len, fr_vocab_size))
for i, seq in enumerate(fr_sequences):
    for t, word_id in enumerate(seq):
        if t > 0:
            decoder_targets[i, t-1, word_id] = 1.0

# 7. Entraînement
model.fit([encoder_inputs, decoder_inputs], decoder_targets,
          batch_size=32,
          epochs=100,
          validation_split=0.2)

# 8. Modèle d'inférence pour la traduction
encoder_model = Model(encoder_input, encoder_states)

decoder_state_input_h = Input(shape=(256,))
decoder_state_input_c = Input(shape=(256,))
decoder_states_inputs = [decoder_state_input_h, decoder_state_input_c]

decoder_outputs, state_h, state_c = decoder_lstm(
    decoder_embedding, initial_state=decoder_states_inputs)
decoder_states = [state_h, state_c]
decoder_outputs = decoder_dense(decoder_outputs)

decoder_model = Model(
    [decoder_input] + decoder_states_inputs,
    [decoder_outputs] + decoder_states)

# 9. Fonction de traduction
def translate(input_text):
    # Encoder
    input_seq = eng_tokenizer.texts_to_sequences([input_text])
    input_seq = pad_sequences(input_seq, maxlen=max_eng_len, padding='post')
    states_value = encoder_model.predict(input_seq)
    
    # Décoder
    target_seq = np.zeros((1, 1))
    target_seq[0, 0] = fr_tokenizer.word_index['<start>']
    
    stop_condition = False
    decoded_sentence = ''
    
    while not stop_condition:
        output_tokens, h, c = decoder_model.predict(
            [target_seq] + states_value)
        
        sampled_token_index = np.argmax(output_tokens[0, -1, :])
        sampled_word = fr_tokenizer.index_word[sampled_token_index]
        decoded_sentence += sampled_word + ' '
        
        if sampled_word == '<end>' or len(decoded_sentence) > max_fr_len:
            stop_condition = True
        
        target_seq = np.zeros((1, 1))
        target_seq[0, 0] = sampled_token_index
        states_value = [h, c]
    
    return decoded_sentence

# Traduire
result = translate("Hello, how are you?")
print(result)`,
      explanation: {
        step1: "Encoder : LSTM qui lit la phrase anglaise et produit un vecteur de contexte",
        step2: "États finaux : Les états h et c de l'encodeur contiennent toute l'information de la phrase",
        step3: "Decoder : LSTM qui génère la traduction française mot par mot",
        step4: "Initialisation : Le décodeur commence avec les états de l'encodeur comme contexte",
        step5: "Génération séquentielle : Chaque mot français est généré en utilisant les mots précédents et le contexte anglais"
      }
    }
  ]

  return (
    <div className={`lstm-code-examples-container ${presentationMode ? 'presentation-mode' : ''}`}>
      {!presentationMode && (
        <>
          <h2>💻 Code LSTM - Exemples Kaggle</h2>
          <p className="intro-text">
            Exemples de code Python/Keras pour implémenter LSTM dans différents cas d'usage, avec explications détaillées.
          </p>
        </>
      )}

      <div className="examples-tabs">
        {examples.map((example, index) => (
          <button
            key={index}
            className={`example-tab ${activeExample === index ? 'active' : ''}`}
            onClick={() => setActiveExample(index)}
          >
            Exemple {index + 1}
          </button>
        ))}
      </div>

      {examples[activeExample] && (
        <div className="example-content">
          <div className="example-header">
            <h3>{examples[activeExample].title}</h3>
            <p className="example-description">{examples[activeExample].description}</p>
          </div>

          <div className="code-section">
            <div className="code-header">
              <span className="code-label">📝 Code Python/Keras</span>
              <button 
                className="copy-button"
                onClick={() => {
                  navigator.clipboard.writeText(examples[activeExample].code)
                  alert('Code copié !')
                }}
              >
                📋 Copier
              </button>
            </div>
            <pre className="code-block">
              <code>{examples[activeExample].code}</code>
            </pre>
          </div>

          <div className="explanation-section">
            <h4>🔍 Explication du Code :</h4>
            <div className="explanation-steps">
              {Object.entries(examples[activeExample].explanation).map(([key, value], idx) => (
                <div key={key} className="explanation-step">
                  <div className="step-number">{idx + 1}</div>
                  <div className="step-text">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="key-concepts">
            <h4>🎯 Concepts Clés :</h4>
            <div className="concepts-grid">
              {activeExample === 0 && (
                <>
                  <div className="concept-item">
                    <strong>Embedding</strong>
                    <p>Convertit les mots en vecteurs numériques denses</p>
                  </div>
                  <div className="concept-item">
                    <strong>LSTM units</strong>
                    <p>Nombre de neurones dans la couche LSTM (64 ici)</p>
                  </div>
                  <div className="concept-item">
                    <strong>return_sequences</strong>
                    <p>False = retourne seulement le dernier état</p>
                  </div>
                  <div className="concept-item">
                    <strong>Sigmoid</strong>
                    <p>Activation pour classification binaire (0 ou 1)</p>
                  </div>
                </>
              )}
              {activeExample === 1 && (
                <>
                  <div className="concept-item">
                    <strong>Sequences</strong>
                    <p>Fenêtres glissantes de données temporelles</p>
                  </div>
                  <div className="concept-item">
                    <strong>LSTM empilées</strong>
                    <p>Plusieurs couches LSTM pour capturer des patterns complexes</p>
                  </div>
                  <div className="concept-item">
                    <strong>Dropout</strong>
                    <p>Régularisation pour éviter le surapprentissage</p>
                  </div>
                  <div className="concept-item">
                    <strong>Normalisation</strong>
                    <p>Mise à l'échelle des données pour améliorer l'apprentissage</p>
                  </div>
                </>
              )}
              {activeExample === 2 && (
                <>
                  <div className="concept-item">
                    <strong>Char-RNN</strong>
                    <p>LSTM qui travaille au niveau des caractères</p>
                  </div>
                  <div className="concept-item">
                    <strong>Softmax</strong>
                    <p>Produit une probabilité pour chaque caractère possible</p>
                  </div>
                  <div className="concept-item">
                    <strong>Génération</strong>
                    <p>Prédiction séquentielle caractère par caractère</p>
                  </div>
                  <div className="concept-item">
                    <strong>One-hot encoding</strong>
                    <p>Représentation où chaque caractère est un vecteur binaire</p>
                  </div>
                </>
              )}
              {activeExample === 3 && (
                <>
                  <div className="concept-item">
                    <strong>Encoder-Decoder</strong>
                    <p>Architecture avec deux LSTM : encodeur et décodeur</p>
                  </div>
                  <div className="concept-item">
                    <strong>États cachés</strong>
                    <p>Les états h et c contiennent le contexte encodé</p>
                  </div>
                  <div className="concept-item">
                    <strong>Attention</strong>
                    <p>Le décodeur utilise le contexte de l'encodeur</p>
                  </div>
                  <div className="concept-item">
                    <strong>Génération conditionnelle</strong>
                    <p>La traduction dépend de la phrase source</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LSTMCodeExamples

