# 🧠 LSTM Guide - Interactive Learning Platform

Une application React interactive et éducative pour apprendre les RNN (Recurrent Neural Networks) et LSTM (Long Short-Term Memory) de manière complète et détaillée.

## ✨ Fonctionnalités

### 📚 Contenu Pédagogique Complet
- **Explication des RNN** : Architecture, fonctionnement, calculs, problèmes
- **Introduction à LSTM** : Pourquoi LSTM, architecture avec gates, avantages
- **Formules Mathématiques** : Toutes les formules LSTM expliquées en détail
- **Exemples Réels** : Analyse de sentiment, prédiction de séries temporelles, traduction, génération de texte
- **Exemples Textuels** : 5 exemples détaillés montrant comment LSTM fonctionne
- **Code Kaggle** : 4 exemples de code Python/Keras complets

### 🎯 Mode Présentation
- **Roadmap Structuré** : 20 slides organisées pédagogiquement
- **Mode Canva** : Présentation plein écran sans distractions
- **Navigation Fluide** : Flèches clavier, boutons, indicateurs
- **Barre de Progression** : Suivi visuel de l'avancement

### 📝 Quiz Interactifs
- **Quiz RNN** : 5 questions pour tester la compréhension
- **Quiz LSTM** : 8 questions sur les gates et formules
- **Quiz Comparaison** : 3 questions RNN vs LSTM
- **Feedback Détaillé** : Explications pour chaque réponse
- **Scores Sauvegardés** : Suivi des résultats dans le roadmap

### 🧮 Calculateur LSTM
- **Calculs Étape par Étape** : Toutes les opérations détaillées
- **Schéma Interactif** : Visualisation avec valeurs en temps réel
- **Navigation Interactive** : Next/Previous, Auto Play
- **Formules Détaillées** : Chaque calcul avec explication

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## 📖 Structure du Projet

```
lstm/
├── src/
│   ├── components/
│   │   ├── Presentation.jsx       # Composant principal de présentation
│   │   ├── RNNExplanation.jsx     # Explications RNN
│   │   ├── LSTMvsRNN.jsx          # Comparaison RNN vs LSTM
│   │   ├── LSTMFormulas.jsx       # Formules mathématiques LSTM
│   │   ├── LSTMCalculator.jsx     # Calculateur interactif
│   │   ├── LSTMSchema.jsx         # Schéma visuel LSTM
│   │   ├── RealExamples.jsx       # Exemples réels avec exécution
│   │   ├── LSTMTextExamples.jsx   # Exemples textuels
│   │   ├── LSTMCodeExamples.jsx   # Code Python/Keras
│   │   └── Quiz.jsx                # Système de quiz
│   ├── data/
│   │   └── quizData.js            # Données des quiz
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## 🎓 Parcours Pédagogique

1. **Introduction RNN** (6 slides)
   - Qu'est-ce qu'un RNN ?
   - Architecture
   - Fonctionnement
   - Calculs
   - Problèmes
   - Exemples

2. **Quiz RNN** - Test de compréhension

3. **RNN vs LSTM** - Comparaison

4. **Quiz Comparaison** - Test

5. **Introduction LSTM** (3 slides)
   - Qu'est-ce que LSTM ?
   - Formules Mathématiques
   - Avantages

6. **Quiz LSTM** - Test de compréhension

7. **Pratique** (5 slides)
   - Exemples Réels
   - Exemples Textuels
   - Code Kaggle
   - Calculateur LSTM
   - Schéma LSTM

8. **Conclusion** - Résumé et scores

## 🎮 Utilisation

### Navigation
- **Flèches ← →** : Naviguer entre les slides
- **Espace** : Slide suivante
- **F11 ou Cmd/Ctrl+F** : Mode présentation plein écran
- **ESC** : Quitter le mode présentation

### Quiz
- Répondez à toutes les questions
- Score minimum : 70% pour valider
- Révision détaillée après soumission
- Possibilité de réessayer

## 🛠️ Technologies

- **React 18** - Bibliothèque UI
- **Vite** - Build tool et dev server
- **CSS3** - Animations et styles modernes
- **SVG** - Schémas interactifs

## 📝 Licence

MIT

## 👤 Auteur

Ahmed Soltani

## 🔗 GitHub

https://github.com/soltaniahmed0/lstm-guide
