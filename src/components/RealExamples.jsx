import React, { useState, useEffect } from 'react'
import './RealExamples.css'

function RealExamples({ presentationMode = false }) {
  const [selectedExample, setSelectedExample] = useState(presentationMode ? 'sentiment' : null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [autoPlayInterval, setAutoPlayInterval] = useState(null)

  const examples = {
    sentiment: {
      title: "Analyse de Sentiment",
      description: "Déterminer si un texte est positif ou négatif",
      input: "J'adore ce produit, il est vraiment excellent !",
      steps: [
        {
          step: "Étape 1: Préparation du Texte",
          subtitle: "Nettoyage et préparation",
          description: "Nettoyer le texte en supprimant les caractères spéciaux et normaliser",
          calculation: "Texte original → Texte nettoyé",
          input: "J'adore ce produit, il est vraiment excellent !",
          output: "j adore ce produit il est vraiment excellent",
          values: { original_length: 45, cleaned_length: 42 }
        },
        {
          step: "Étape 2: Tokenisation",
          subtitle: "Découpage en mots",
          description: "Transformer le texte en liste de tokens (mots individuels)",
          calculation: "Texte → Liste de tokens",
          input: "j adore ce produit il est vraiment excellent",
          output: "['j', 'adore', 'ce', 'produit', 'il', 'est', 'vraiment', 'excellent']",
          values: { num_tokens: 8 }
        },
        {
          step: "Étape 3: Création du Vocabulaire",
          subtitle: "Indexation des mots",
          description: "Créer un dictionnaire qui associe chaque mot à un nombre unique",
          calculation: "Mots → Indices numériques",
          input: "['j', 'adore', 'ce', 'produit', 'il', 'est', 'vraiment', 'excellent']",
          output: "{'j': 1, 'adore': 2, 'ce': 3, 'produit': 4, 'il': 5, 'est': 6, 'vraiment': 7, 'excellent': 8}",
          values: { vocab_size: 8 }
        },
        {
          step: "Étape 4: Conversion en Indices",
          subtitle: "Transformation numérique",
          description: "Convertir chaque token en son indice numérique",
          calculation: "Tokens → Indices",
          input: "['j', 'adore', 'ce', 'produit', 'il', 'est', 'vraiment', 'excellent']",
          output: "[1, 2, 3, 4, 5, 6, 7, 8]",
          values: { sequence: [1, 2, 3, 4, 5, 6, 7, 8] }
        },
        {
          step: "Étape 5: Embedding - Mot 'j'",
          subtitle: "Vecteur de représentation",
          description: "Convertir l'indice 1 en vecteur dense de 128 dimensions",
          calculation: "Embedding[1] = vecteur de 128 dimensions",
          input: "Indice: 1",
          output: "Vecteur: [0.12, -0.45, 0.78, ..., 0.23] (128 valeurs)",
          values: { embedding_dim: 128, word: "j" }
        },
        {
          step: "Étape 6: Embedding - Mot 'adore'",
          subtitle: "Vecteur avec sentiment positif",
          description: "Le mot 'adore' a un embedding qui contient des informations sur le sentiment positif",
          calculation: "Embedding[2] = vecteur avec composantes sentimentales",
          input: "Indice: 2 (mot: 'adore')",
          output: "Vecteur: [0.45, 0.67, -0.12, ..., 0.89] (sentiment positif encodé)",
          values: { embedding_dim: 128, word: "adore", sentiment_score: 0.75 }
        },
        {
          step: "Étape 7: LSTM - Traitement du premier mot 'j'",
          subtitle: "Initialisation",
          description: "Traiter le premier mot avec h₀ = 0 et C₀ = 0",
          calculation: "h₀ = [0, 0, ..., 0], C₀ = [0, 0, ..., 0]",
          input: "Mot: 'j' (vecteur embedding)",
          output: "h₁ calculé, C₁ calculé",
          values: { h0: "zeros", c0: "zeros", word: "j" }
        },
        {
          step: "Étape 8: LSTM - Forget Gate pour 'j'",
          subtitle: "Calcul f₁",
          description: "Calculer combien d'information garder de l'état précédent (ici 0 car c'est le début)",
          calculation: "f₁ = σ(Wf · [h₀, x₁] + bf) = σ(Wf · [0, embedding('j')] + bf)",
          formula: "fₜ = σ(Wf · [hₜ₋₁, xₜ] + bf)\n\nOù:\n• σ(x) = 1/(1 + e⁻ˣ) - fonction sigmoïde\n• Wf = matrice de poids (apprise)\n• bf = biais (appris)\n• Résultat entre 0 et 1",
          input: "h₀ = 0, x₁ = embedding('j')",
          output: "f₁ = 0.65 (garde 65% de l'état précédent)",
          values: { ft: 0.65, calculation: "σ(-0.2) = 0.65", formula_detail: "Wf·[0,embedding('j')] + bf = -0.2 → σ(-0.2) = 1/(1+e^0.2) ≈ 0.65" }
        },
        {
          step: "Étape 9: LSTM - Input Gate pour 'j'",
          subtitle: "Calcul i₁",
          description: "Décider quelle nouvelle information stocker du mot 'j'",
          calculation: "i₁ = σ(Wi · [h₀, x₁] + bi) = σ(Wi · [0, embedding('j')] + bi)",
          formula: "iₜ = σ(Wi · [hₜ₋₁, xₜ] + bi)\n\nOù:\n• σ = sigmoïde (0 à 1)\n• Wi = matrice de poids pour input gate\n• bi = biais pour input gate\n• iₜ ≈ 1 → stocke beaucoup, iₜ ≈ 0 → stocke peu",
          input: "h₀ = 0, x₁ = embedding('j')",
          output: "i₁ = 0.72 (stocke 72% de l'information du mot 'j')",
          values: { it: 0.72, calculation: "σ(0.5) = 0.72", formula_detail: "Wi·[0,embedding('j')] + bi = 0.5 → σ(0.5) = 1/(1+e^-0.5) ≈ 0.72" }
        },
        {
          step: "Étape 10: LSTM - Candidate Values pour 'j'",
          subtitle: "Calcul C̃₁",
          description: "Calculer les valeurs candidates pour le nouveau contenu",
          calculation: "C̃₁ = tanh(WC · [h₀, x₁] + bC) = tanh(WC · [0, embedding('j')] + bC)",
          formula: "C̃ₜ = tanh(WC · [hₜ₋₁, xₜ] + bC)\n\nOù:\n• tanh(x) = (eˣ - e⁻ˣ)/(eˣ + e⁻ˣ) - tangente hyperbolique\n• WC = matrice de poids pour candidates\n• bC = biais pour candidates\n• Résultat entre -1 et 1",
          input: "h₀ = 0, x₁ = embedding('j')",
          output: "C̃₁ = 0.15 (nouvelle information à ajouter)",
          values: { ctilde: 0.15, calculation: "tanh(0.15) = 0.15", formula_detail: "WC·[0,embedding('j')] + bC = 0.15 → tanh(0.15) ≈ 0.15" }
        },
        {
          step: "Étape 11: LSTM - Mise à jour Cell State pour 'j'",
          subtitle: "Calcul C₁",
          description: "Mettre à jour l'état de la cellule en combinant forget et input",
          calculation: "C₁ = f₁ ⊙ C₀ + i₁ ⊙ C̃₁ = 0.65 × 0 + 0.72 × 0.15 = 0.108",
          formula: "Cₜ = fₜ ⊙ Cₜ₋₁ + iₜ ⊙ C̃ₜ\n\nOù:\n• ⊙ = multiplication élément par élément (Hadamard)\n• fₜ ⊙ Cₜ₋₁ = partie de l'ancien état gardée\n• iₜ ⊙ C̃ₜ = nouvelle information ajoutée\n• Cₜ peut rester stable si fₜ ≈ 1 et iₜ ≈ 0",
          input: "f₁ = 0.65, C₀ = 0, i₁ = 0.72, C̃₁ = 0.15",
          output: "C₁ = 0.108 (première information stockée)",
          values: { ct: 0.108, calculation: "0.65 × 0 + 0.72 × 0.15 = 0.108", formula_detail: "C₁ = (0.65 ⊙ [0]) + (0.72 ⊙ [0.15]) = [0] + [0.108] = [0.108]" }
        },
        {
          step: "Étape 12: LSTM - Output Gate pour 'j'",
          subtitle: "Calcul o₁",
          description: "Décider quelle partie de C₁ utiliser pour h₁",
          calculation: "o₁ = σ(Wo · [h₀, x₁] + bo) = σ(Wo · [0, embedding('j')] + bo)",
          formula: "oₜ = σ(Wo · [hₜ₋₁, xₜ] + bo)\n\nOù:\n• σ = sigmoïde (0 à 1)\n• Wo = matrice de poids pour output gate\n• bo = biais pour output gate\n• oₜ filtre le Cell State pour la sortie",
          input: "h₀ = 0, x₁ = embedding('j')",
          output: "o₁ = 0.68 (utilise 68% de C₁)",
          values: { ot: 0.68, calculation: "σ(0.3) = 0.68", formula_detail: "Wo·[0,embedding('j')] + bo = 0.3 → σ(0.3) ≈ 0.68" }
        },
        {
          step: "Étape 13: LSTM - Hidden State pour 'j'",
          subtitle: "Calcul h₁",
          description: "Calculer l'état caché final après traitement de 'j'",
          calculation: "h₁ = o₁ ⊙ tanh(C₁) = 0.68 × tanh(0.108) = 0.68 × 0.107 = 0.073",
          formula: "hₜ = oₜ ⊙ tanh(Cₜ)\n\nOù:\n• tanh(Cₜ) = normalise le Cell State entre -1 et 1\n• oₜ = filtre pour choisir quelle partie utiliser\n• ⊙ = multiplication élément par élément\n• hₜ est utilisé pour prédictions et prochaine étape",
          input: "o₁ = 0.68, C₁ = 0.108",
          output: "h₁ = 0.073 (état après 'j')",
          values: { ht: 0.073, calculation: "0.68 × 0.107 = 0.073", formula_detail: "h₁ = 0.68 ⊙ tanh(0.108) = 0.68 × 0.107 ≈ 0.073" }
        },
        {
          step: "Étape 14: LSTM - Traitement du mot 'adore'",
          subtitle: "Mot avec sentiment positif fort",
          description: "Traiter le mot 'adore' qui a un sentiment très positif",
          calculation: "Utiliser h₁ et embedding('adore') comme entrées",
          input: "h₁ = 0.073, x₂ = embedding('adore')",
          output: "Préparation pour calculer h₂",
          values: { previous_h: 0.073, word: "adore" }
        },
        {
          step: "Étape 15: LSTM - Forget Gate pour 'adore'",
          subtitle: "Calcul f₂",
          description: "Décider combien garder de l'information précédente (mot 'j')",
          calculation: "f₂ = σ(Wf · [h₁, x₂] + bf) = σ(Wf · [0.073, embedding('adore')] + bf)",
          input: "h₁ = 0.073, x₂ = embedding('adore')",
          output: "f₂ = 0.82 (garde 82% de l'information précédente)",
          values: { ft: 0.82, calculation: "σ(1.2) = 0.82" }
        },
        {
          step: "Étape 16: LSTM - Input Gate pour 'adore'",
          subtitle: "Calcul i₂",
          description: "Le mot 'adore' est important, on veut le stocker",
          calculation: "i₂ = σ(Wi · [h₁, x₂] + bi) = σ(Wi · [0.073, embedding('adore')] + bi)",
          input: "h₁ = 0.073, x₂ = embedding('adore')",
          output: "i₂ = 0.91 (stocke 91% - mot très important)",
          values: { it: 0.91, calculation: "σ(2.1) = 0.91" }
        },
        {
          step: "Étape 17: LSTM - Candidate pour 'adore'",
          subtitle: "Calcul C̃₂",
          description: "Calculer la nouvelle information positive du mot 'adore'",
          calculation: "C̃₂ = tanh(WC · [h₁, x₂] + bC) = tanh(WC · [0.073, embedding('adore')] + bC)",
          input: "h₁ = 0.073, x₂ = embedding('adore')",
          output: "C̃₂ = 0.68 (fort sentiment positif)",
          values: { ctilde: 0.68, calculation: "tanh(0.85) = 0.68" }
        },
        {
          step: "Étape 18: LSTM - Mise à jour Cell State pour 'adore'",
          subtitle: "Calcul C₂",
          description: "Combiner l'ancien état (de 'j') avec le nouveau (de 'adore')",
          calculation: "C₂ = f₂ ⊙ C₁ + i₂ ⊙ C̃₂ = 0.82 × 0.108 + 0.91 × 0.68 = 0.089 + 0.619 = 0.708",
          input: "f₂ = 0.82, C₁ = 0.108, i₂ = 0.91, C̃₂ = 0.68",
          output: "C₂ = 0.708 (sentiment positif accumulé)",
          values: { ct: 0.708, calculation: "0.82 × 0.108 + 0.91 × 0.68 = 0.708" }
        },
        {
          step: "Étape 19: LSTM - Traitement des mots suivants",
          subtitle: "Accumulation continue",
          description: "Traiter 'ce', 'produit', 'il', 'est', 'vraiment' de manière similaire",
          calculation: "Répéter les étapes 14-18 pour chaque mot",
          input: "Mots: 'ce', 'produit', 'il', 'est', 'vraiment'",
          output: "C₇ = 1.25 (sentiment positif continue d'augmenter)",
          values: { ct: 1.25, words_processed: 5 }
        },
        {
          step: "Étape 20: LSTM - Traitement du mot 'excellent'",
          subtitle: "Mot clé très positif",
          description: "Le mot 'excellent' renforce fortement le sentiment positif",
          calculation: "Traitement avec h₇ et embedding('excellent')",
          input: "h₇ = 0.85, x₈ = embedding('excellent')",
          output: "Préparation pour calcul final",
          values: { previous_h: 0.85, word: "excellent" }
        },
        {
          step: "Étape 21: LSTM - Forget Gate pour 'excellent'",
          subtitle: "Calcul f₈",
          description: "Garder l'information positive accumulée",
          calculation: "f₈ = σ(Wf · [h₇, x₈] + bf) = σ(Wf · [0.85, embedding('excellent')] + bf)",
          input: "h₇ = 0.85, x₈ = embedding('excellent')",
          output: "f₈ = 0.88 (garde 88% du sentiment positif accumulé)",
          values: { ft: 0.88, calculation: "σ(1.8) = 0.88" }
        },
        {
          step: "Étape 22: LSTM - Input Gate pour 'excellent'",
          subtitle: "Calcul i₈",
          description: "Le mot 'excellent' est très important, on veut tout stocker",
          calculation: "i₈ = σ(Wi · [h₇, x₈] + bi) = σ(Wi · [0.85, embedding('excellent')] + bi)",
          input: "h₇ = 0.85, x₈ = embedding('excellent')",
          output: "i₈ = 0.95 (stocke 95% - mot très important)",
          values: { it: 0.95, calculation: "σ(2.8) = 0.95" }
        },
        {
          step: "Étape 23: LSTM - Candidate pour 'excellent'",
          subtitle: "Calcul C̃₈",
          description: "Calculer la valeur très positive du mot 'excellent'",
          calculation: "C̃₈ = tanh(WC · [h₇, x₈] + bC) = tanh(WC · [0.85, embedding('excellent')] + bC)",
          input: "h₇ = 0.85, x₈ = embedding('excellent')",
          output: "C̃₈ = 0.92 (sentiment très positif)",
          values: { ctilde: 0.92, calculation: "tanh(1.5) = 0.92" }
        },
        {
          step: "Étape 24: LSTM - Mise à jour Cell State finale",
          subtitle: "Calcul C₈",
          description: "Combiner tout le sentiment positif accumulé",
          calculation: "C₈ = f₈ ⊙ C₇ + i₈ ⊙ C̃₈ = 0.88 × 1.25 + 0.95 × 0.92 = 1.10 + 0.874 = 1.974",
          input: "f₈ = 0.88, C₇ = 1.25, i₈ = 0.95, C̃₈ = 0.92",
          output: "C₈ = 1.974 (sentiment très positif final)",
          values: { ct: 1.974, calculation: "0.88 × 1.25 + 0.95 × 0.92 = 1.974" }
        },
        {
          step: "Étape 25: LSTM - Output Gate final",
          subtitle: "Calcul o₈",
          description: "Utiliser l'information pour la prédiction",
          calculation: "o₈ = σ(Wo · [h₇, x₈] + bo) = σ(Wo · [0.85, embedding('excellent')] + bo)",
          input: "h₇ = 0.85, x₈ = embedding('excellent')",
          output: "o₈ = 0.90 (utilise 90% de C₈)",
          values: { ot: 0.90, calculation: "σ(2.0) = 0.90" }
        },
        {
          step: "Étape 26: LSTM - Hidden State final",
          subtitle: "Calcul h₈",
          description: "État caché final contenant toute l'information du texte",
          calculation: "h₈ = o₈ ⊙ tanh(C₈) = 0.90 × tanh(1.974) = 0.90 × 0.96 = 0.864",
          input: "o₈ = 0.90, C₈ = 1.974",
          output: "h₈ = 0.864 (représentation finale du texte)",
          values: { ht: 0.864, calculation: "0.90 × 0.96 = 0.864" }
        },
        {
          step: "Étape 27: Couche Dense",
          subtitle: "Classification",
          description: "Passer h₈ à travers une couche dense pour la classification",
          calculation: "y = W · h₈ + b",
          input: "h₈ = 0.864 (vecteur de 256 dimensions)",
          output: "y = [0.94, 0.06] (probabilités: POSITIF=94%, NÉGATIF=6%)",
          values: { positive_prob: 0.94, negative_prob: 0.06 }
        },
        {
          step: "Étape 28: Prédiction Finale",
          subtitle: "Résultat",
          description: "Sélectionner la classe avec la plus haute probabilité",
          calculation: "argmax(y) = POSITIF",
          input: "Probabilités: [0.94, 0.06]",
          output: "Sentiment: POSITIF (confiance: 94%)",
          values: { prediction: "POSITIF", confidence: 0.94 }
        }
      ]
    },
    prediction: {
      title: "Prédiction de Série Temporelle",
      description: "Prédire le prix d'une action basé sur l'historique",
      input: "Prix historiques: [100, 102, 105, 103, 108, 110, 107]",
      steps: [
        {
          step: "Étape 1: Préparation des Données",
          subtitle: "Collecte des prix",
          description: "Collecter les prix historiques sur 7 jours",
          calculation: "Prix bruts",
          input: "Prix observés",
          output: "[100, 102, 105, 103, 108, 110, 107]",
          values: { min: 100, max: 110, mean: 105 }
        },
        {
          step: "Étape 2: Calcul des Statistiques",
          subtitle: "Min, Max, Moyenne",
          description: "Calculer les statistiques pour la normalisation",
          calculation: "min = 100, max = 110, mean = 105",
          input: "[100, 102, 105, 103, 108, 110, 107]",
          output: "min=100, max=110, mean=105",
          values: { min: 100, max: 110, mean: 105 }
        },
        {
          step: "Étape 3: Normalisation Min-Max",
          subtitle: "Mise à l'échelle entre 0 et 1",
          description: "Normaliser chaque prix: (prix - min) / (max - min)",
          calculation: "normalized = (prix - 100) / (110 - 100)",
          input: "Prix: 100, 102, 105, 103, 108, 110, 107",
          output: "[0.0, 0.2, 0.5, 0.3, 0.8, 1.0, 0.7]",
          values: { normalized: [0.0, 0.2, 0.5, 0.3, 0.8, 1.0, 0.7] }
        },
        {
          step: "Étape 4: Création des Séquences",
          subtitle: "Window de 5 pas",
          description: "Créer des séquences de 5 prix pour prédire le 6ème",
          calculation: "Séquence: [prix_t-4, prix_t-3, prix_t-2, prix_t-1, prix_t] → Target: prix_t+1",
          input: "Données normalisées",
          output: "Seq1: [0.0, 0.2, 0.5, 0.3, 0.8] → Target: 1.0",
          values: { sequence_length: 5, num_sequences: 2 }
        },
        {
          step: "Étape 5: LSTM - Traitement Séquence 1",
          subtitle: "Première séquence",
          description: "Traiter la première séquence [0.0, 0.2, 0.5, 0.3, 0.8]",
          calculation: "Entrée: 5 valeurs normalisées",
          input: "[0.0, 0.2, 0.5, 0.3, 0.8]",
          output: "h₅ calculé",
          values: { sequence: [0.0, 0.2, 0.5, 0.3, 0.8] }
        },
        {
          step: "Étape 6: LSTM - Forget Gate (t=1)",
          subtitle: "Premier prix",
          description: "Traiter le premier prix normalisé (0.0)",
          calculation: "f₁ = σ(Wf · [h₀, x₁] + bf) = σ(Wf · [0, 0.0] + bf)",
          input: "h₀ = 0, x₁ = 0.0",
          output: "f₁ = 0.70 (garde 70% de l'état initial)",
          values: { ft: 0.70, calculation: "σ(-0.4) = 0.70" }
        },
        {
          step: "Étape 7: LSTM - Input Gate (t=1)",
          subtitle: "Stockage premier prix",
          description: "Décider combien stocker du premier prix",
          calculation: "i₁ = σ(Wi · [h₀, x₁] + bi) = σ(Wi · [0, 0.0] + bi)",
          input: "h₀ = 0, x₁ = 0.0",
          output: "i₁ = 0.65 (stocke 65% de x₁)",
          values: { it: 0.65, calculation: "σ(-0.6) = 0.65" }
        },
        {
          step: "Étape 8: LSTM - Cell State (t=1)",
          subtitle: "C₁ après premier prix",
          description: "Mettre à jour l'état après le premier prix",
          calculation: "C₁ = f₁ ⊙ C₀ + i₁ ⊙ C̃₁ = 0.70 × 0 + 0.65 × 0.05 = 0.033",
          input: "f₁ = 0.70, C₀ = 0, i₁ = 0.65, C̃₁ = 0.05",
          output: "C₁ = 0.033",
          values: { ct: 0.033, calculation: "0.70 × 0 + 0.65 × 0.05 = 0.033" }
        },
        {
          step: "Étape 9: LSTM - Traitement Prix 2 (t=2)",
          subtitle: "Prix normalisé 0.2",
          description: "Traiter le deuxième prix (0.2) avec le contexte du premier",
          calculation: "Utiliser h₁ et x₂ = 0.2",
          input: "h₁ = 0.03, x₂ = 0.2",
          output: "Calcul de f₂, i₂, C₂",
          values: { previous_h: 0.03, current_price: 0.2 }
        },
        {
          step: "Étape 10: LSTM - Forget Gate (t=2)",
          subtitle: "Calcul f₂",
          description: "Décider combien garder de l'information du prix précédent",
          calculation: "f₂ = σ(Wf · [h₁, x₂] + bf) = σ(Wf · [0.03, 0.2] + bf)",
          input: "h₁ = 0.03, x₂ = 0.2",
          output: "f₂ = 0.78 (garde 78% de C₁)",
          values: { ft: 0.78, calculation: "σ(1.1) = 0.78" }
        },
        {
          step: "Étape 11: LSTM - Input Gate (t=2)",
          subtitle: "Calcul i₂",
          description: "Décider combien stocker du nouveau prix",
          calculation: "i₂ = σ(Wi · [h₁, x₂] + bi) = σ(Wi · [0.03, 0.2] + bi)",
          input: "h₁ = 0.03, x₂ = 0.2",
          output: "i₂ = 0.72 (stocke 72% de x₂)",
          values: { it: 0.72, calculation: "σ(0.9) = 0.72" }
        },
        {
          step: "Étape 12: LSTM - Cell State (t=2)",
          subtitle: "Calcul C₂",
          description: "Mettre à jour avec les deux premiers prix",
          calculation: "C₂ = f₂ ⊙ C₁ + i₂ ⊙ C̃₂ = 0.78 × 0.033 + 0.72 × 0.18 = 0.026 + 0.130 = 0.156",
          input: "f₂ = 0.78, C₁ = 0.033, i₂ = 0.72, C̃₂ = 0.18",
          output: "C₂ = 0.156 (tendance en cours de formation)",
          values: { ct: 0.156, calculation: "0.78 × 0.033 + 0.72 × 0.18 = 0.156" }
        },
        {
          step: "Étape 13: LSTM - Traitement Prix 3, 4, 5",
          subtitle: "Accumulation de la tendance",
          description: "Traiter les prix suivants (0.5, 0.3, 0.8) de manière similaire",
          calculation: "Répéter les étapes pour chaque prix",
          input: "Prix: 0.5, 0.3, 0.8",
          output: "C₅ = 0.65 (tendance haussière détectée)",
          values: { ct: 0.65, trend: "haussier" }
        },
        {
          step: "Étape 14: LSTM - Output Gate Final",
          subtitle: "Calcul o₅",
          description: "Générer la sortie pour la prédiction",
          calculation: "o₅ = σ(Wo · [h₄, x₅] + bo) = σ(Wo · [0.55, 0.8] + bo)",
          input: "h₄ = 0.55, x₅ = 0.8",
          output: "o₅ = 0.88 (utilise 88% de C₅)",
          values: { ot: 0.88, calculation: "σ(1.8) = 0.88" }
        },
        {
          step: "Étape 15: LSTM - Hidden State Final",
          subtitle: "Calcul h₅",
          description: "État final après traitement de la séquence",
          calculation: "h₅ = o₅ ⊙ tanh(C₅) = 0.88 × tanh(0.65) = 0.88 × 0.57 = 0.50",
          input: "o₅ = 0.88, C₅ = 0.65",
          output: "h₅ = 0.50 (représentation de la tendance)",
          values: { ht: 0.50, calculation: "0.88 × 0.57 = 0.50" }
        },
        {
          step: "Étape 16: Couche Dense",
          subtitle: "Prédiction",
          description: "Transformer h₅ en prédiction de prix",
          calculation: "prix_prédit = W · h₅ + b",
          input: "h₅ = 0.50",
          output: "prix_normalisé_prédit = 0.92",
          values: { predicted_normalized: 0.92 }
        },
        {
          step: "Étape 17: Dénormalisation",
          subtitle: "Conversion en prix réel",
          description: "Convertir le prix normalisé en prix réel",
          calculation: "prix_réel = prix_normalisé × (max - min) + min = 0.92 × (110 - 100) + 100 = 0.92 × 10 + 100 = 109.2",
          input: "prix_normalisé = 0.92, min = 100, max = 110",
          output: "Prix prédit: 109.2",
          values: { predicted_price: 109.2, calculation: "0.92 × 10 + 100 = 109.2" }
        },
        {
          step: "Étape 18: Résultat Final",
          subtitle: "Prédiction complète",
          description: "Le modèle prédit que le prochain prix sera 109.2",
          calculation: "Basé sur la tendance haussière détectée",
          input: "Séquence: [0.0, 0.2, 0.5, 0.3, 0.8]",
          output: "Prix prédit pour t+1: 109.2 (tendance haussière)",
          values: { final_prediction: 109.2, confidence: 0.85 }
        }
      ]
    },
    translation: {
      title: "Traduction Automatique",
      description: "Traduire 'Hello, how are you?' en français",
      input: "Hello, how are you?",
      steps: [
        {
          step: "Étape 1: Préparation du Texte Source",
          subtitle: "Nettoyage",
          description: "Nettoyer et préparer le texte anglais",
          calculation: "Texte → Texte nettoyé",
          input: "Hello, how are you?",
          output: "hello how are you",
          values: { original_length: 18, cleaned_length: 16 }
        },
        {
          step: "Étape 2: Tokenisation Source",
          subtitle: "Découpage en mots",
          description: "Transformer en liste de tokens",
          calculation: "Texte → Tokens",
          input: "hello how are you",
          output: "['hello', 'how', 'are', 'you']",
          values: { num_tokens: 4 }
        },
        {
          step: "Étape 3: Encodage - Embedding",
          subtitle: "Vecteurs de mots",
          description: "Convertir chaque mot anglais en vecteur",
          calculation: "Mots → Vecteurs de 256 dimensions",
          input: "['hello', 'how', 'are', 'you']",
          output: "4 vecteurs de 256 dimensions",
          values: { embedding_dim: 256, num_words: 4 }
        },
        {
          step: "Étape 4: LSTM Encoder - Mot 'hello'",
          subtitle: "Premier mot",
          description: "Encoder le premier mot avec h₀ = 0, C₀ = 0",
          calculation: "h₀ = 0, C₀ = 0, x₁ = embedding('hello')",
          input: "Mot: 'hello'",
          output: "h₁, C₁ calculés",
          values: { word: "hello" }
        },
        {
          step: "Étape 5: LSTM Encoder - Forget Gate (t=1)",
          subtitle: "Calcul f₁",
          description: "Calculer le forget gate pour 'hello'",
          calculation: "f₁ = σ(Wf · [h₀, x₁] + bf) = σ(Wf · [0, embedding('hello')] + bf)",
          input: "h₀ = 0, x₁ = embedding('hello')",
          output: "f₁ = 0.75 (garde 75%)",
          values: { ft: 0.75 }
        },
        {
          step: "Étape 6: LSTM Encoder - Input Gate (t=1)",
          subtitle: "Calcul i₁",
          description: "Stockage de 'hello'",
          calculation: "i₁ = σ(Wi · [h₀, x₁] + bi)",
          input: "h₀ = 0, x₁ = embedding('hello')",
          output: "i₁ = 0.80 (stocke 80%)",
          values: { it: 0.80 }
        },
        {
          step: "Étape 7: LSTM Encoder - Cell State (t=1)",
          subtitle: "Calcul C₁",
          description: "Mettre à jour l'état après 'hello'",
          calculation: "C₁ = f₁ ⊙ C₀ + i₁ ⊙ C̃₁ = 0.75 × 0 + 0.80 × 0.25 = 0.20",
          input: "f₁ = 0.75, C₀ = 0, i₁ = 0.80, C̃₁ = 0.25",
          output: "C₁ = 0.20 (information 'hello' encodée)",
          values: { ct: 0.20, calculation: "0.75 × 0 + 0.80 × 0.25 = 0.20" }
        },
        {
          step: "Étape 8: LSTM Encoder - Mots Suivants",
          subtitle: "Encodage complet",
          description: "Encoder 'how', 'are', 'you' de manière similaire",
          calculation: "Répéter pour chaque mot",
          input: "Mots: 'how', 'are', 'you'",
          output: "C₄ = 1.85 (représentation complète de la phrase)",
          values: { ct: 1.85, words_encoded: 4 }
        },
        {
          step: "Étape 9: LSTM Encoder - État Final",
          subtitle: "h₄ et C₄",
          description: "État final de l'encodeur contenant toute la phrase",
          calculation: "h₄ = 0.78, C₄ = 1.85",
          input: "Après encodage de tous les mots",
          output: "h₄ = 0.78, C₄ = 1.85 (contexte complet encodé)",
          values: { h_final: 0.78, c_final: 1.85 }
        },
        {
          step: "Étape 10: LSTM Decoder - Initialisation",
          subtitle: "Début de la traduction",
          description: "Initialiser le décodeur avec l'état final de l'encodeur",
          calculation: "h_decoder₀ = h_encoder₄ = 0.78, C_decoder₀ = C_encoder₄ = 1.85",
          input: "État encodeur final",
          output: "Décodeur initialisé avec le contexte",
          values: { h_decoder: 0.78, c_decoder: 1.85 }
        },
        {
          step: "Étape 11: LSTM Decoder - Génération 'Bonjour'",
          subtitle: "Premier mot français",
          description: "Générer le premier mot de la traduction",
          calculation: "Utiliser h_decoder₀ pour prédire le premier mot",
          input: "h_decoder₀ = 0.78, contexte = phrase anglaise",
          output: "Mot prédit: 'Bonjour' (probabilité: 0.95)",
          values: { word: "Bonjour", probability: 0.95 }
        },
        {
          step: "Étape 12: LSTM Decoder - Forget Gate (t=1)",
          subtitle: "Calcul f₁",
          description: "Décider combien garder du contexte encodé",
          calculation: "f₁ = σ(Wf · [h_decoder₀, embedding('Bonjour')] + bf)",
          input: "h_decoder₀ = 0.78, x₁ = embedding('Bonjour')",
          output: "f₁ = 0.85 (garde 85% du contexte)",
          values: { ft: 0.85 }
        },
        {
          step: "Étape 13: LSTM Decoder - Input Gate (t=1)",
          subtitle: "Calcul i₁",
          description: "Intégrer le mot généré 'Bonjour'",
          calculation: "i₁ = σ(Wi · [h_decoder₀, embedding('Bonjour')] + bi)",
          input: "h_decoder₀ = 0.78, x₁ = embedding('Bonjour')",
          output: "i₁ = 0.82 (intègre 82%)",
          values: { it: 0.82 }
        },
        {
          step: "Étape 14: LSTM Decoder - Cell State (t=1)",
          subtitle: "Calcul C₁",
          description: "Mettre à jour avec 'Bonjour'",
          calculation: "C₁ = f₁ ⊙ C_decoder₀ + i₁ ⊙ C̃₁ = 0.85 × 1.85 + 0.82 × 0.30 = 1.57 + 0.25 = 1.82",
          input: "f₁ = 0.85, C_decoder₀ = 1.85, i₁ = 0.82, C̃₁ = 0.30",
          output: "C₁ = 1.82 (contexte + 'Bonjour')",
          values: { ct: 1.82, calculation: "0.85 × 1.85 + 0.82 × 0.30 = 1.82" }
        },
        {
          step: "Étape 15: LSTM Decoder - Génération 'comment'",
          subtitle: "Deuxième mot",
          description: "Générer le deuxième mot basé sur le contexte",
          calculation: "Utiliser h₁ pour prédire le prochain mot",
          input: "h₁ = 0.72, contexte = 'Hello' + 'Bonjour'",
          output: "Mot prédit: 'comment' (probabilité: 0.92)",
          values: { word: "comment", probability: 0.92 }
        },
        {
          step: "Étape 16: LSTM Decoder - Génération 'allez-vous'",
          subtitle: "Mots suivants",
          description: "Générer les mots restants",
          calculation: "Continuer la génération",
          input: "Contexte accumulé",
          output: "Mots: 'allez-vous' (probabilité: 0.88)",
          values: { words: "allez-vous", probability: 0.88 }
        },
        {
          step: "Étape 17: Traduction Complète",
          subtitle: "Résultat final",
          description: "Assembler tous les mots générés",
          calculation: "Concaténation des mots",
          input: "Mots générés: 'Bonjour', 'comment', 'allez-vous'",
          output: "Traduction: 'Bonjour, comment allez-vous ?'",
          values: { translation: "Bonjour, comment allez-vous ?", confidence: 0.92 }
        }
      ]
    },
    textGeneration: {
      title: "Génération de Texte",
      description: "Générer la suite d'un texte",
      input: "Il était une fois",
      steps: [
        {
          step: "Étape 1: Tokenisation",
          subtitle: "Découpage",
          description: "Transformer le texte en tokens",
          calculation: "Texte → Tokens",
          input: "Il était une fois",
          output: "['Il', 'était', 'une', 'fois']",
          values: { num_tokens: 4 }
        },
        {
          step: "Étape 2: Embedding",
          subtitle: "Vecteurs",
          description: "Convertir en vecteurs",
          calculation: "Mots → Vecteurs",
          input: "['Il', 'était', 'une', 'fois']",
          output: "4 vecteurs de 256 dimensions",
          values: { embedding_dim: 256 }
        },
        {
          step: "Étape 3: LSTM - Traitement 'Il'",
          subtitle: "Premier mot",
          description: "Traiter le premier mot",
          calculation: "h₀ = 0, C₀ = 0, x₁ = embedding('Il')",
          input: "Mot: 'Il'",
          output: "h₁, C₁ calculés",
          values: { word: "Il" }
        },
        {
          step: "Étape 4: LSTM - Forget Gate (t=1)",
          subtitle: "Calcul f₁",
          description: "Forget gate pour 'Il'",
          calculation: "f₁ = σ(Wf · [h₀, x₁] + bf)",
          input: "h₀ = 0, x₁ = embedding('Il')",
          output: "f₁ = 0.72",
          values: { ft: 0.72 }
        },
        {
          step: "Étape 5: LSTM - Input Gate (t=1)",
          subtitle: "Calcul i₁",
          description: "Input gate pour 'Il'",
          calculation: "i₁ = σ(Wi · [h₀, x₁] + bi)",
          input: "h₀ = 0, x₁ = embedding('Il')",
          output: "i₁ = 0.75",
          values: { it: 0.75 }
        },
        {
          step: "Étape 6: LSTM - Cell State (t=1)",
          subtitle: "Calcul C₁",
          description: "Mise à jour après 'Il'",
          calculation: "C₁ = f₁ ⊙ C₀ + i₁ ⊙ C̃₁ = 0.72 × 0 + 0.75 × 0.20 = 0.15",
          input: "f₁ = 0.72, C₀ = 0, i₁ = 0.75, C̃₁ = 0.20",
          output: "C₁ = 0.15",
          values: { ct: 0.15, calculation: "0.72 × 0 + 0.75 × 0.20 = 0.15" }
        },
        {
          step: "Étape 7: LSTM - Traitement Mots Suivants",
          subtitle: "Accumulation",
          description: "Traiter 'était', 'une', 'fois'",
          calculation: "Répéter pour chaque mot",
          input: "Mots: 'était', 'une', 'fois'",
          output: "C₄ = 1.25 (contexte narratif accumulé)",
          values: { ct: 1.25, style: "narratif" }
        },
        {
          step: "Étape 8: LSTM - Output Gate Final",
          subtitle: "Calcul o₄",
          description: "Output gate pour génération",
          calculation: "o₄ = σ(Wo · [h₃, x₄] + bo)",
          input: "h₃ = 0.68, x₄ = embedding('fois')",
          output: "o₄ = 0.85",
          values: { ot: 0.85 }
        },
        {
          step: "Étape 9: LSTM - Hidden State Final",
          subtitle: "Calcul h₄",
          description: "État final après 'Il était une fois'",
          calculation: "h₄ = o₄ ⊙ tanh(C₄) = 0.85 × tanh(1.25) = 0.85 × 0.85 = 0.72",
          input: "o₄ = 0.85, C₄ = 1.25",
          output: "h₄ = 0.72 (contexte narratif)",
          values: { ht: 0.72, calculation: "0.85 × 0.85 = 0.72" }
        },
        {
          step: "Étape 10: Prédiction - Mot Suivant",
          subtitle: "Génération",
          description: "Prédire le prochain mot basé sur h₄",
          calculation: "y = softmax(W · h₄ + b)",
          input: "h₄ = 0.72",
          output: "Mot prédit: 'un' (probabilité: 0.45)",
          values: { word: "un", probability: 0.45 }
        },
        {
          step: "Étape 11: LSTM - Traitement 'un'",
          subtitle: "Nouveau mot",
          description: "Traiter le mot généré 'un'",
          calculation: "Utiliser h₄ et embedding('un')",
          input: "h₄ = 0.72, x₅ = embedding('un')",
          output: "h₅, C₅ calculés",
          values: { word: "un" }
        },
        {
          step: "Étape 12: Génération Continue",
          subtitle: "Plusieurs mots",
          description: "Continuer à générer les mots suivants",
          calculation: "Répéter le processus",
          input: "Contexte accumulé",
          output: "Mots suivants: 'prince', 'qui', 'vivait'",
          values: { generated_words: ["prince", "qui", "vivait"] }
        },
        {
          step: "Étape 13: Texte Généré Final",
          subtitle: "Résultat",
          description: "Assembler tous les mots générés",
          calculation: "Concaténation",
          input: "Texte initial + mots générés",
          output: "Texte complet: 'Il était une fois un prince qui vivait dans un château...'",
          values: { full_text: "Il était une fois un prince qui vivait dans un château...", length: 45 }
        }
      ]
    }
  }

  const currentExample = selectedExample ? examples[selectedExample] : null

  const handleExampleSelect = (exampleKey) => {
    setSelectedExample(exampleKey)
    setCurrentStep(0)
    setIsRunning(false)
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval)
      setAutoPlayInterval(null)
    }
  }

  const handleRun = () => {
    if (!currentExample) return
    
    if (isRunning) {
      // Stop
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval)
        setAutoPlayInterval(null)
      }
      setIsRunning(false)
    } else {
      // Start
      setIsRunning(true)
      setCurrentStep(0)
      
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < currentExample.steps.length - 1) {
            return prev + 1
          } else {
            clearInterval(interval)
            setIsRunning(false)
            setAutoPlayInterval(null)
            return prev
          }
        })
      }, 3000)
      
      setAutoPlayInterval(interval)
    }
  }

  const handleNext = () => {
    if (currentExample && currentStep < currentExample.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (index) => {
    setCurrentStep(index)
  }

  return (
    <div className={`real-examples-container ${presentationMode ? 'presentation-mode' : ''}`}>
      {!presentationMode && (
        <>
          <h2>🌍 Exemples Réels et Exécution Détaillée</h2>
          <p className="examples-intro">
            Découvrez comment LSTM fonctionne dans des applications réelles avec toutes les étapes détaillées et les calculs réels.
          </p>
        </>
      )}

      <div className="examples-grid">
        {Object.entries(examples).map(([key, example]) => (
          <div 
            key={key}
            className={`example-card ${selectedExample === key ? 'selected' : ''}`}
            onClick={() => handleExampleSelect(key)}
          >
            <div className="example-icon">
              {key === 'sentiment' && '😊'}
              {key === 'prediction' && '📈'}
              {key === 'translation' && '🌐'}
              {key === 'textGeneration' && '✍️'}
            </div>
            <h3>{example.title}</h3>
            <p>{example.description}</p>
            <div className="example-badge">
              {example.steps.length} étapes détaillées
            </div>
          </div>
        ))}
      </div>

      {currentExample && (
        <div className="execution-panel">
          <div className="execution-header">
            <div>
              <h3>{currentExample.title}</h3>
              <p className="execution-description">{currentExample.description}</p>
            </div>
            <div className="execution-controls">
              <button onClick={handlePrevious} disabled={currentStep === 0}>
                ◀ Précédent
              </button>
              <button onClick={handleRun} className={isRunning ? 'running' : ''}>
                {isRunning ? '⏸ Pause' : '▶ Exécuter'}
              </button>
              <button onClick={handleNext} disabled={currentStep === currentExample.steps.length - 1}>
                Suivant ▶
              </button>
            </div>
          </div>

          <div className="steps-navigation">
            <div className="steps-list">
              {currentExample.steps.map((step, index) => (
                <div
                  key={index}
                  className={`step-nav-item ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                  onClick={() => handleStepClick(index)}
                >
                  <span className="step-nav-number">{index + 1}</span>
                  <span className="step-nav-title">{step.step}</span>
                  {index < currentStep && <span className="step-nav-check">✓</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="execution-content">
            <div className="input-section">
              <h4>📥 Entrée :</h4>
              <div className="input-box">
                {currentExample.input}
              </div>
            </div>

            <div className="steps-section">
              <div className="step-indicator">
                <div className="step-info">
                  <span className="step-number-large">{currentStep + 1}</span>
                  <span className="step-total">/ {currentExample.steps.length}</span>
                </div>
                <div className="step-progress">
                  <div 
                    className="step-progress-bar" 
                    style={{width: `${((currentStep + 1) / currentExample.steps.length) * 100}%`}}
                  ></div>
                </div>
              </div>

              {currentExample.steps[currentStep] && (
                <div className="execution-step active">
                  <div className="step-header">
                    <div className="step-title-section">
                      <h5>{currentExample.steps[currentStep].step}</h5>
                      {currentExample.steps[currentStep].subtitle && (
                        <p className="step-subtitle">{currentExample.steps[currentStep].subtitle}</p>
                      )}
                    </div>
                    <span className="current-badge">Étape Active</span>
                  </div>
                  
                  <div className="step-description-box">
                    <p className="step-description">{currentExample.steps[currentStep].description}</p>
                  </div>

                  <div className="step-calculation">
                    <div className="calculation-box">
                      <div className="calculation-label">📐 Calcul :</div>
                      <div className="calculation-formula">{currentExample.steps[currentStep].calculation}</div>
                    </div>
                  </div>

                  {currentExample.steps[currentStep].formula && (
                    <div className="step-formula">
                      <div className="formula-box-detailed">
                        <div className="formula-label">📐 Formule Mathématique :</div>
                        <pre className="formula-content-detailed">{currentExample.steps[currentStep].formula}</pre>
                      </div>
                    </div>
                  )}

                  <div className="step-io">
                    <div className="io-box input-box-detailed">
                      <div className="io-label">📥 Entrée :</div>
                      <div className="io-content">{currentExample.steps[currentStep].input}</div>
                    </div>
                    <div className="io-arrow">→</div>
                    <div className="io-box output-box-detailed">
                      <div className="io-label">📤 Sortie :</div>
                      <div className="io-content">{currentExample.steps[currentStep].output}</div>
                    </div>
                  </div>

                  {Object.keys(currentExample.steps[currentStep].values).length > 0 && (
                    <div className="step-values">
                      <div className="values-title">📊 Valeurs Calculées :</div>
                      <div className="values-grid">
                        {Object.entries(currentExample.steps[currentStep].values).map(([key, value]) => (
                          <div key={key} className="value-item">
                            <span className="value-label">{key}:</span>
                            <span className="value-content">
                              {Array.isArray(value) 
                                ? `[${value.join(', ')}]`
                                : typeof value === 'object'
                                ? JSON.stringify(value)
                                : typeof value === 'number' && value < 1 && value > 0
                                ? value.toFixed(3)
                                : typeof value === 'number'
                                ? value.toFixed(2)
                                : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === currentExample.steps.length - 1 && (
                <div className="execution-complete">
                  <div className="complete-icon">✅</div>
                  <h4>Exécution Terminée !</h4>
                  <p>L'LSTM a traité avec succès toutes les étapes et produit le résultat final.</p>
                  <div className="complete-summary">
                    <strong>Résumé :</strong> {currentExample.steps[currentExample.steps.length - 1].output}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RealExamples
