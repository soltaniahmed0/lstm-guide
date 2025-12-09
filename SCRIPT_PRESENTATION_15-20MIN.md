# Script de Présentation - LSTM (Version 15-20 minutes)

**Présentateurs :** RAJA HANNACHI & AHMED SOLTANI  
**Encadré par :** M. MOHAMED RIDHA AMAMOU  
**Module :** Machine Learning  
**Année Universitaire :** 2025-2026

---

## SLIDE 1 : TITRE (30 secondes)

Bonjour à tous,

Nous vous présentons aujourd'hui notre travail sur les LSTM - Long Short-Term Memory, dans le cadre du module Machine Learning.

---

## SLIDE 2 : PLAN (30 secondes)

Notre présentation couvrira :
1. Introduction avec un exemple concret
2. RNN : définition, architecture et problèmes
3. LSTM : solution et architecture
4. Étude de cas : prédiction du prix de l'or
5. Conclusion et perspectives

---

## SLIDE 3 : INTRODUCTION (1 minute 30)

**Le Défi** : Prédire les prix de l'or pour optimiser les investissements.

**Le Problème** : Les prix dépendent de facteurs complexes et interdépendants sur de longues périodes.

**Solution Traditionnelle** : Les modèles classiques sont limités.

**Solution LSTM** : Les LSTM apprennent ces patterns complexes avec **96% de précision**.

**Résultat** : Décisions éclairées, risques réduits, profits maximisés.

---

## SLIDE 4 : RNN - DÉFINITION (1 minute)

Un RNN est un réseau de neurones conçu pour traiter des **séquences de données** où l'ordre temporel est important.

**Point clé** : Contrairement aux réseaux classiques, les RNN utilisent leur sortie précédente comme entrée, créant une **mémoire interne**.

**Analogie** : Comme lire un livre - on se souvient du contexte précédent pour comprendre le présent.

**Applications** : Traitement du langage naturel, séries temporelles, reconnaissance vocale.

---

## SLIDE 5-7 : RNN - ARCHITECTURE (2 minutes)

**Formule principale** :
```
hₜ = tanh(Wₕₕ · hₜ₋₁ + Wₓₕ · xₜ + bₕ)
yₜ = Wₕᵧ · hₜ + bᵧ
```

L'état caché hₜ combine l'état précédent et l'input actuel. C'est la **mémoire** du réseau.

**Flux** : Entrées → Multiplications par poids → Addition → tanh → Sortie → Boucle récurrente

Dans la pratique, x est un **vecteur** et les opérations sont des **multiplications matricielles**.

---

## SLIDE 8-9 : RNN - PROBLÈMES (2 minutes 30)

**PROBLÈME 1 : VANISHING GRADIENT**

Lors de la rétropropagation, les gradients deviennent très petits (presque nuls) en remontant dans le temps.

**Pourquoi ?** Wₕₕ < 1 et tanh' ≤ 1 → chaque multiplication réduit le gradient.

**Conséquence** : Après 4 timesteps, le gradient n'est plus que **0.39%** de sa valeur initiale ! Le réseau n'apprend plus.

**PROBLÈME 2 : EXPLODING GRADIENT**

Quand Wₕₕ > 1, les gradients explosent → instabilité numérique, modèle diverge.

**Solution** : C'est pour cela que les **LSTM** ont été créés !

---

## SLIDE 10 : LSTM - DÉFINITION (1 minute)

**LSTM** = Long Short-Term Memory

Un type spécial de RNN qui résout le problème du Vanishing Gradient.

**Comparaison** :
- **RNN** : Oublie rapidement, limite à ~10 pas de temps
- **LSTM** : Mémorise sur de longues séquences, peut traiter des centaines de pas

---

## SLIDE 11 : LSTM - GATES (1 minute 30)

L'innovation clé : **5 composants** qui contrôlent le flux d'information :

1. **Forget Gate** : Décide quoi oublier
2. **Input Gate** : Décide quoi apprendre
3. **Candidate Gate** : Génère nouvelles valeurs
4. **Cell State** : Mémoire à long terme
5. **Output Gate** : Décide quoi produire

Ces portes permettent au gradient de circuler sans disparaître.

---

## SLIDE 12 : LSTM - ARCHITECTURE (1 minute 30)

**Flux LSTM** :
- Entrées : Cₜ₋₁, hₜ₋₁, xₜ
- 3 portes (sigmoid) + 1 candidate (tanh)
- Cell State traverse le temps sans dégradation
- Sorties : Cₜ, hₜ

**Avantages** :
- Oublie sélectivement (Forget Gate)
- Apprend sélectivement (Input Gate)
- Mémorise long terme (Cell State)
- Produit sorties pertinentes (Output Gate)

---

## SLIDE 13 : ÉTUDE DE CAS (3 minutes)

**Application** : Prédiction du prix de l'or (Kaggle)

**Architecture** :
- 3 couches LSTM de 50 neurones
- Dropout 0.2 pour éviter surapprentissage
- Séquences de 60 jours pour prédire le jour suivant

**Résultats** :
- **Précision : 96%**
- **MAE : ~4%**
- **R² Score : > 0.95**

**Étapes clés** :
1. Normalisation Min-Max
2. Création séquences (60 jours)
3. Entraînement avec Adam optimizer
4. Évaluation avec métriques standard

Démonstration pratique de l'efficacité des LSTM !

---

## SLIDE 14 : CONCLUSION - RÉSUMÉ (1 minute)

**RNN** : Réseaux récurrents, problème Vanishing Gradient, limite ~10 pas.

**LSTM** : Solution avec 5 neurones (gates), traite des centaines de pas.

**Étude de Cas** : 96% de précision sur prédiction prix de l'or.

---

## SLIDE 15 : CONCLUSION - COMPARAISON (1 minute 30)

**LSTM vs Transformers** :

**LSTM** : Séquentiel, quelques centaines de tokens, modéré, bon pour séries temporelles.

**Transformers** : Parallèle, plusieurs milliers de tokens, complexe, dominant en NLP.

**Quand utiliser LSTM ?**
- Séries temporelles univariées
- Ressources limitées
- Applications temps réel

**Quand utiliser Transformers ?**
- NLP avancé
- Très longues séquences
- Ressources importantes

---

## SLIDE 16 : CONCLUSION - PERSPECTIVES (1 minute)

**Évolutions** : Hybridation LSTM+Transformers, modèles plus efficaces.

**Applications** : Médecine prédictive, finance algorithmique, IoT.

**Défis** : Interprétabilité, consommation énergétique, éthique.

---

## SLIDE 17 : WEBographie (15 secondes)

Voici nos références principales.

---

## SLIDE 18 : MERCI (15 secondes)

Merci pour votre attention ! Questions ?

---

## TIMING DÉTAILLÉ (Total : 18 minutes)

| Slide | Contenu | Temps |
|-------|---------|-------|
| 1 | Titre | 0:30 |
| 2 | Plan | 0:30 |
| 3 | Introduction | 1:30 |
| 4 | RNN Définition | 1:00 |
| 5-7 | RNN Architecture | 2:00 |
| 8-9 | RNN Problèmes | 2:30 |
| 10 | LSTM Définition | 1:00 |
| 11 | LSTM Gates | 1:30 |
| 12 | LSTM Architecture | 1:30 |
| 13 | Étude de Cas | 3:00 |
| 14 | Conclusion Résumé | 1:00 |
| 15 | Comparaison | 1:30 |
| 16 | Perspectives | 1:00 |
| 17 | Webographie | 0:15 |
| 18 | Merci | 0:15 |
| | **TOTAL** | **18:00** |

**Buffer pour questions : 2 minutes** → **Total max : 20 minutes**

---

## CONSEILS POUR LA PRÉSENTATION

### ⏱️ Gestion du temps
- **Parlez à un rythme modéré** : ~150 mots/minute
- **Utilisez les animations** : Elles expliquent mieux que les mots
- **Passez rapidement** sur les détails techniques si vous êtes en retard
- **Gardez 2 minutes** pour les questions à la fin

### 🎯 Points essentiels à ne PAS manquer
1. **Le problème** : Vanishing Gradient (slide 8-9)
2. **La solution** : Les gates LSTM (slide 11)
3. **L'application** : 96% de précision (slide 13)

### 💡 Astuces
- **Montrez les animations** : Laissez-les jouer, elles sont explicites
- **Soyez concis** : Ne répétez pas ce qui est déjà sur les slides
- **Interagissez** : Posez des questions rhétoriques ("Pourquoi ?", "Comment ?")
- **Concluez fort** : Terminez sur les résultats de l'étude de cas

### ⚠️ Si vous êtes en retard
**À raccourcir en priorité** :
- Slide 5-7 (Architecture RNN) : Passez rapidement
- Slide 12 (Architecture LSTM) : Montrez juste le schéma
- Slide 15 (Comparaison) : Mentionnez juste les points clés

**À garder absolument** :
- Slide 3 (Introduction) : Hook important
- Slide 8-9 (Problèmes) : Le cœur du problème
- Slide 11 (Gates) : La solution clé
- Slide 13 (Étude de cas) : Preuve concrète

---

## VERSION ULTRA-RAPIDE (15 minutes)

Si vous devez absolument tenir 15 minutes :

| Section | Temps |
|---------|-------|
| Titre + Plan | 0:45 |
| Introduction | 1:00 |
| RNN (tout) | 4:00 |
| LSTM (tout) | 4:00 |
| Étude de Cas | 3:00 |
| Conclusion | 1:30 |
| Merci | 0:45 |
| **TOTAL** | **15:00** |

**Stratégie** :
- Parlez plus vite sur les slides techniques
- Passez rapidement sur les détails mathématiques
- Concentrez-vous sur les concepts clés
- Utilisez les animations comme support visuel principal

---

**Bonne présentation ! 🎯**

**Rappel** : Le timing est indicatif. Adaptez selon votre rythme et les réactions de l'audience.
