# Script de Présentation - Long Short-Term Memory (LSTM)

**Présentateurs :** RAJA HANNACHI & AHMED SOLTANI  
**Encadré par :** M. MOHAMED RIDHA AMAMOU  
**Module :** Machine Learning  
**Année Universitaire :** 2025-2026

---

## SLIDE 1 : TITRE

Bonjour à tous,

Nous sommes ravis de vous présenter aujourd'hui notre travail sur les réseaux de neurones récurrents, et plus particulièrement sur les LSTM - Long Short-Term Memory.

Cette présentation a été réalisée dans le cadre du module Machine Learning, sous l'encadrement de M. Mohamed Ridha Amamou.

---

## SLIDE 2 : PLAN DE PRÉSENTATION

Avant de commencer, voici le plan de notre présentation :

1. **Introduction** : Nous commencerons par un exemple concret qui illustre l'utilité des LSTM
2. **RNN** : Nous explorerons les réseaux de neurones récurrents, leur définition, leur architecture, leur fonctionnement, leurs applications et leurs limitations
3. **LSTM** : Nous verrons comment les LSTM résolvent les problèmes des RNN, leur définition, leur architecture et leurs portes
4. **Étude de Cas** : Nous présenterons une application pratique : la prédiction du prix de l'or avec une précision de 96%
5. **Conclusion** : Nous ferons un résumé et discuterons des perspectives, notamment la comparaison avec les Transformers
6. **Webographie** : Nous terminerons par nos références

---

## SLIDE 3 : INTRODUCTION

Commençons par un exemple concret qui illustre parfaitement le défi que nous essayons de résoudre.

**Le Défi** : Imaginez que vous êtes un investisseur et que vous souhaitez prédire les prix de l'or pour optimiser vos investissements. C'est un problème réel et complexe.

**Le Problème** : Les prix de l'or dépendent de nombreux facteurs interdépendants : les tendances historiques, les événements économiques mondiaux, les cycles saisonniers, et bien d'autres. Ces dépendances sont complexes et difficiles à modéliser.

**Solution Traditionnelle** : Les modèles classiques comme la régression linéaire ou les modèles ARIMA sont limités. Ils ne peuvent pas capturer ces dépendances complexes sur de longues périodes.

**Solution LSTM** : C'est là que les LSTM entrent en jeu. Ils peuvent apprendre ces patterns complexes et atteindre une précision de 96% dans la prédiction des prix de l'or.

**Résultat** : Avec cette précision, on peut prendre des décisions éclairées, réduire les risques et maximiser les profits.

Cet exemple illustre parfaitement la puissance des LSTM pour traiter des données séquentielles complexes.

---

## SLIDE 4 : RNN - DÉFINITION

Avant de parler des LSTM, il est essentiel de comprendre les RNN - Réseaux de Neurones Récurrents.

**Qu'est-ce qu'un RNN ?**

Un RNN est un type de réseau de neurones artificiels conçu pour traiter des séquences de données où l'ordre et le contexte temporel sont importants.

**Le point clé** : Contrairement aux réseaux de neurones classiques, les RNN peuvent utiliser leur sortie précédente comme entrée, créant ainsi une mémoire interne.

**Analogie** : C'est comme lire un livre. Vous vous souvenez de ce que vous avez lu précédemment pour comprendre la phrase actuelle. Un RNN fait la même chose avec les données séquentielles - il utilise le contexte passé pour traiter l'information présente.

---

## SLIDE 5 : RNN - CAS D'USAGE

Les RNN sont particulièrement adaptés à plusieurs types de problèmes :

- **Traitement du langage naturel** : Analyse de sentiment, traduction automatique
- **Séries temporelles** : Prédiction de prix, prévisions météorologiques
- **Reconnaissance vocale** : Transcription de la parole en texte
- **Génération de texte** : Création de contenu automatique

---

## SLIDE 6 : RNN - APPLICATIONS

Les RNN peuvent être configurés de différentes manières selon l'application :

- **Many-to-Many** : Traduction automatique (séquence d'entrée → séquence de sortie)
- **Many-to-One** : Analyse de sentiment (séquence d'entrée → une seule sortie)
- **One-to-Many** : Génération de texte (une entrée → séquence de sortie)

---

## SLIDE 7 : RNN - ARCHITECTURE (FORMULES)

Maintenant, regardons l'architecture mathématique d'un RNN.

**Hidden State (État Caché) - hₜ** :
```
hₜ = tanh(Wₕₕ · hₜ₋₁ + Wₓₕ · xₜ + bₕ)
```

L'état caché combine l'état précédent multiplié par Wₕₕ avec l'input actuel multiplié par Wₓₕ, plus un biais. La fonction tanh normalise le résultat entre -1 et 1. C'est la mémoire du réseau.

**Output (Sortie) - yₜ** :
```
yₜ = Wₕᵧ · hₜ + bᵧ
```

La sortie est simplement une transformation linéaire de l'état caché.

---

## SLIDE 8 : RNN - ARCHITECTURE (SCHÉMA ANIMÉ)

Voici une visualisation animée de l'architecture RNN. Vous pouvez voir comment les données circulent :

1. Les entrées hₜ₋₁ et xₜ sont reçues
2. Elles sont multipliées par leurs poids respectifs Wₕₕ et Wₓₕ
3. Les résultats sont additionnés
4. La fonction tanh est appliquée pour obtenir hₜ
5. hₜ est transformé pour produire yₜ
6. hₜ est également renvoyé comme hₜ₋₁ pour le prochain timestep

Cette boucle récurrente permet au réseau de maintenir une mémoire des états précédents.

---

## SLIDE 9 : RNN - ARCHITECTURE (VECTEURS)

Dans la pratique, x est généralement un vecteur, pas un simple nombre. Par exemple :
- Pour le traitement de texte : x peut être un vecteur de dimension 100 (word embedding)
- Pour les séries temporelles : x peut être un vecteur de dimension 1

Les opérations sont donc des multiplications matricielles :
- Wₓₕ est une matrice de forme (R, M) où R est le nombre de neurones cachés et M la dimension de l'input
- Wₕₕ est une matrice carrée de forme (R, R)

---

## SLIDE 10 : RNN - FONCTIONNEMENT (CALCULS)

Regardons un exemple concret avec des valeurs réelles. Supposons :
- Wₕₕ = 0.5
- Wₓₕ = 0.8
- bₕ = 0.1
- hₜ₋₁ = 0.0
- xₜ = 1.0

Le calcul donne :
- hₜ = tanh(0.5 × 0.0 + 0.8 × 1.0 + 0.1) = tanh(0.9) ≈ 0.716
- yₜ = 1.2 × 0.716 + 0.0 ≈ 0.859

Ces calculs se répètent à chaque timestep, permettant au réseau d'apprendre des patterns temporels.

---

## SLIDE 11 : RNN - PROBLÈME : VANISHING GRADIENT

Malheureusement, les RNN souffrent d'un problème majeur : le **Vanishing Gradient** - la disparition du gradient.

**Qu'est-ce que c'est ?**

Lors de la rétropropagation, les gradients deviennent très petits, presque nuls, au fur et à mesure qu'on remonte dans le temps.

**Pourquoi ?**

Parce que Wₕₕ < 1 et tanh'(z) ≤ 1, donc chaque multiplication réduit le gradient. Par exemple, si Wₕₕ = 0.5 et tanh' ≈ 0.5, chaque terme vaut environ 0.25.

**Conséquences** :
- Après 4 timesteps, le gradient n'est plus que 0.39% de sa valeur initiale !
- Après 10 timesteps, il est pratiquement nul
- Le réseau n'apprend plus car les poids ne se mettent presque plus à jour
- Pas de mémoire à long terme : le réseau ne peut pas apprendre des dépendances distantes

**Solutions** : C'est exactement pour cela que les LSTM ont été créés !

---

## SLIDE 12 : RNN - PROBLÈME : EXPLODING GRADIENT

Il existe aussi le problème inverse : l'**Exploding Gradient** - l'explosion du gradient.

**Qu'est-ce que c'est ?**

Lorsque Wₕₕ > 1, les gradients deviennent très grands pendant la rétropropagation.

**Exemple** : Si Wₕₕ = 2.0, après 4 timesteps, le gradient est 16 fois plus grand qu'au départ !

**Conséquences** :
- Instabilité numérique : les valeurs deviennent NaN ou Infinity
- Mises à jour trop grandes : les poids changent de manière erratique
- Perte qui explose : la fonction de perte augmente exponentiellement
- Impossibilité d'entraîner : le modèle ne peut pas converger

**Solutions** :
- Gradient Clipping : limiter la valeur maximale du gradient
- LSTM/GRU : utiliser des architectures qui contrôlent mieux le flux du gradient
- Initialisation appropriée des poids

---

## SLIDE 13 : LSTM - DÉFINITION

Maintenant, passons aux LSTM - la solution aux problèmes des RNN.

**Qu'est-ce que LSTM ?**

LSTM (Long Short-Term Memory) est un type spécial de RNN conçu pour résoudre le problème du Vanishing Gradient et permettre au réseau de se souvenir d'informations sur de très longues séquences.

**Pourquoi LSTM ?**

**RNN Classique** :
- Oublie rapidement (Vanishing Gradient)
- Limite à ~10 pas de temps
- Ne peut pas apprendre des dépendances longues

**LSTM** :
- Mémorise sur de longues séquences
- Peut traiter des centaines de pas
- Apprend des dépendances complexes

---

## SLIDE 14 : LSTM - GATES (5 NEURONES)

L'innovation clé des LSTM réside dans leur architecture avec 5 composants principaux :

1. **Forget Gate (Porte d'Oubli)** : Décide quelle information oublier de l'état précédent
2. **Input Gate (Porte d'Entrée)** : Décide quelle nouvelle information stocker
3. **Candidate Gate (Porte Candidate)** : Génère les nouvelles valeurs candidates
4. **Cell State (État de Cellule)** : La mémoire à long terme qui traverse le temps
5. **Output Gate (Porte de Sortie)** : Décide quelle partie de l'état de cellule utiliser pour la sortie

Ces 5 neurones travaillent ensemble pour contrôler précisément le flux d'information, permettant au gradient de circuler sans disparaître.

---

## SLIDE 15 : LSTM - ARCHITECTURE

Voici une visualisation interactive de l'architecture LSTM. Vous pouvez voir :

- Les entrées : Cₜ₋₁ (Cell State précédent), hₜ₋₁ (Hidden State précédent), et xₜ (input actuel)
- Les 3 portes (Forget, Input, Output) qui utilisent la fonction sigmoid
- La porte candidate qui utilise tanh
- Le flux de données à travers les multiplications et additions
- Les sorties : Cₜ (nouveau Cell State) et hₜ (nouveau Hidden State)

Cette architecture complexe permet au LSTM de :
- **Oublier** sélectivement des informations anciennes (Forget Gate)
- **Apprendre** de nouvelles informations (Input Gate)
- **Mémoriser** sur de longues périodes (Cell State)
- **Produire** des sorties pertinentes (Output Gate)

---

## SLIDE 16 : ÉTUDE DE CAS - PRÉDICTION DU PRIX DE L'OR

Passons maintenant à une application pratique : la prédiction du prix de l'or avec LSTM.

**Source** : Cette étude de cas est basée sur un projet Kaggle qui a atteint 96% de précision.

**Étapes de l'implémentation** :

1. **Importation des bibliothèques** : NumPy, Pandas, TensorFlow/Keras
2. **Chargement et préparation** : Normalisation Min-Max des données
3. **Création des séquences** : 60 jours de données pour prédire le jour suivant
4. **Architecture du modèle** : 3 couches LSTM de 50 neurones chacune, avec Dropout
5. **Compilation et entraînement** : Optimiseur Adam, fonction de perte MSE
6. **Prédiction** : Utilisation du modèle pour prédire les prix futurs
7. **Évaluation** : Calcul de la précision, MAE, et R² score

**Résultats** :
- **Précision** : 96%
- **MAE** : ~4%
- **R² Score** : > 0.95

Ces résultats démontrent l'efficacité des LSTM pour les séries temporelles financières.

---

## SLIDE 17 : CONCLUSION - RÉSUMÉ

Faisons un résumé de ce que nous avons couvert :

**RNN** :
- Réseaux récurrents pour séquences
- Problème : Vanishing/Exploding Gradient
- Limite : ~10 pas de temps
- Applications : NLP, séries temporelles

**LSTM** :
- Solution au problème des RNN
- 5 neurones : 3 gates + Cell State + Hidden State
- Peut traiter des centaines de pas
- Applications : Traduction, prédiction, NLP

**Étude de Cas** :
- Prédiction du prix de l'or
- Architecture : 3 couches LSTM
- Résultat : 96% de précision
- Démonstration pratique réussie

---

## SLIDE 18 : CONCLUSION - COMPARAISON LSTM VS TRANSFORMERS

Maintenant, comparons les LSTM avec les Transformers, l'architecture moderne qui domine actuellement le NLP.

**LSTM** :
- Architecture récurrente (séquentielle)
- Traitement séquentiel (pas par pas)
- Mémoire : Cell State + Hidden State
- Longueur : Quelques centaines
- Vitesse : Lente (séquentielle)
- Complexité : Modérée

**Transformers** :
- Architecture attention (parallèle)
- Traitement parallèle (tous les tokens)
- Mémoire : Attention Mechanism
- Longueur : Plusieurs milliers
- Vitesse : Rapide (parallèle)
- Complexité : Élevée

**Quand utiliser quoi ?**

**Utilisez LSTM pour** :
- Séries temporelles univariées
- Données séquentielles courtes à moyennes
- Ressources limitées
- Modèles plus simples à comprendre
- Applications temps réel

**Utilisez Transformers pour** :
- NLP avancé (traduction, génération)
- Très longues séquences
- Ressources computationnelles importantes
- Modèles de pointe (GPT, BERT)
- Attention explicite nécessaire

---

## SLIDE 19 : CONCLUSION - PERSPECTIVES

Regardons les perspectives futures :

**Évolutions** :
- **Hybridation** : Combinaison LSTM + Transformers
- **Efficacité** : Modèles plus légers et rapides
- **Domaines** : Expansion vers nouveaux domaines
- **Hardware** : Optimisation pour GPU/TPU

**Applications Émergentes** :
- Médecine prédictive
- Finance algorithmique
- IoT et capteurs
- Reconnaissance vocale avancée

**Défis** :
- Interprétabilité des modèles
- Consommation énergétique
- Biais et éthique
- Généralisation

---

## SLIDE 20 : WEBographie

Voici nos principales références et ressources utilisées pour cette présentation.

[Les références seront listées sur cette slide]

---

## SLIDE 21 : MERCI

Merci beaucoup pour votre attention !

Nous sommes maintenant disponibles pour répondre à vos questions.

---

## NOTES POUR LA PRÉSENTATION

### Timing suggéré :
- **Titre** : 30 secondes
- **Plan** : 1 minute
- **Introduction** : 2 minutes
- **RNN (toutes les slides)** : 10-12 minutes
- **LSTM (toutes les slides)** : 8-10 minutes
- **Étude de Cas** : 5-7 minutes
- **Conclusion** : 3-5 minutes
- **Questions** : 5-10 minutes

**Total : ~35-45 minutes**

### Conseils de présentation :
1. **Parlez lentement et clairement** : Les concepts sont complexes, prenez votre temps
2. **Utilisez les animations** : Les slides interactives sont là pour aider, utilisez-les
3. **Faites des pauses** : Après chaque section importante, faites une pause pour laisser le temps à l'audience d'assimiler
4. **Soyez prêts aux questions** : Préparez-vous à expliquer les concepts mathématiques en détail
5. **Montrez votre passion** : Votre enthousiasme rendra la présentation plus engageante

### Points clés à souligner :
- **Le problème** : Vanishing Gradient est le problème central que LSTM résout
- **L'innovation** : Les portes (gates) sont la clé de la solution
- **L'application** : L'étude de cas montre l'utilité pratique
- **L'avenir** : Les Transformers sont l'évolution, mais LSTM reste pertinent

---

**Bonne présentation ! 🎯**
