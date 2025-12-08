import React from 'react'
import './RNNConceptsSlide.css'

function RNNConceptsSlide() {
  return (
    <div className="slide rnn-concepts-slide">
      <h1 className="slide-title-main">📚 Concepts Fondamentaux</h1>
      <p className="subtitle">Gradient, Poids W, et Forme des Données</p>

      <div className="container">
        {/* Qu'est-ce qu'un Gradient */}
        <div className="concept-box gradient-concept">
          <h4>❓ Question 1 : Qu'est-ce qu'un Gradient ?</h4>
          <div className="concept-content">
            <h5>💡 Explication Simple</h5>
            <p><strong>Imaginez que vous êtes sur une montagne et vous voulez descendre le plus rapidement possible :</strong></p>
            <ul>
              <li>🎯 <strong>Le gradient</strong> vous indique <strong>dans quelle direction</strong> la pente est la plus raide</li>
              <li>📉 Il vous montre <strong>comment changer</strong> vos poids (W) pour réduire l'erreur</li>
              <li>🔢 C'est un <strong>nombre</strong> qui dit "si j'augmente W de 0.1, l'erreur augmente ou diminue de combien ?"</li>
            </ul>
            <div className="formula-box">
              <h6>📐 Définition Mathématique Simple</h6>
              <div className="formula-code">
                <strong>Gradient = ∂(Erreur) / ∂(Poids)</strong>
              </div>
              <p>En français : "De combien change l'erreur quand je change un petit peu le poids ?"</p>
            </div>
            <div className="example-box">
              <h6>✅ Exemple Concret</h6>
              <p>
                Si le gradient de Wₕₕ est <strong>-0.5</strong>, cela signifie :
                <br/>→ Si j'augmente Wₕₕ de 0.1, l'erreur <strong>diminue</strong> de 0.05
                <br/>→ Donc je dois <strong>augmenter</strong> Wₕₕ pour réduire l'erreur !
              </p>
            </div>
          </div>
        </div>

        {/* Comment Recalculer les Poids W */}
        <div className="concept-box weights-concept">
          <h4>❓ Question 2 : Comment Recalculer les Poids W ?</h4>
          <div className="concept-content">
            <h5>💡 Explication Simple</h5>
            <p><strong>Pour améliorer le réseau, on ajuste les poids W petit à petit :</strong></p>
            <div className="formula-box">
              <h6>🔄 Formule de Mise à Jour</h6>
              <div className="formula-code">
                <strong>Nouveau W = Ancien W - (Learning Rate × Gradient)</strong><br/>
                W<sub>nouveau</sub> = W<sub>ancien</sub> - α × (∂L/∂W)
              </div>
            </div>
            <ol>
              <li><strong>Calculer l'erreur</strong> : Comparer la prédiction avec la vraie valeur</li>
              <li><strong>Calculer le gradient</strong> : ∂L/∂W = "comment l'erreur change avec W ?"</li>
              <li><strong>Mettre à jour W</strong> : W = W - (α × gradient) où α = learning rate (ex: 0.01)</li>
              <li><strong>Répéter</strong> : Faire ça pour tous les poids (Wₕₕ, Wₓₕ, Wₕᵧ, etc.)</li>
            </ol>
            <div className="example-box">
              <h6>✅ Exemple Numérique</h6>
              <p><strong>Situation initiale :</strong></p>
              <ul className="example-list">
                <li>Wₕₕ = 0.5 (ancien poids)</li>
                <li>Gradient = -0.3 (l'erreur diminue si j'augmente W)</li>
                <li>Learning Rate (α) = 0.1</li>
              </ul>
              <p><strong>Calcul :</strong></p>
              <div className="formula-code">
                Nouveau Wₕₕ = 0.5 - (0.1 × -0.3)<br/>
                Nouveau Wₕₕ = 0.5 - (-0.03)<br/>
                Nouveau Wₕₕ = 0.5 + 0.03 = <strong>0.53</strong>
              </div>
              <p>✅ Le poids a été <strong>augmenté</strong> pour réduire l'erreur !</p>
            </div>
          </div>
        </div>

        {/* Forme de x */}
        <div className="concept-box vector-concept">
          <h4>❓ Question 3 : Quelle est la Forme de x ? Vecteur ou Nombre ?</h4>
          <div className="concept-content">
            <h5>💡 Réponse Simple</h5>
            <div className="highlight-box">
              <p>x est généralement un <strong>VECTEUR</strong> (un tableau de nombres)</p>
            </div>
            <div className="examples-box">
              <h6>📊 Exemples Concrets</h6>
              <div className="example-item">
                <p><strong>Exemple 1 : Traitement de texte (Word Embedding)</strong></p>
                <div className="code-example">x = [0.2, -0.5, 0.8, 0.1, ...]  ← 100 nombres (vecteur de dimension 100)</div>
                <p className="example-note">Chaque mot est représenté par un vecteur de 100 nombres</p>
              </div>
              <div className="example-item">
                <p><strong>Exemple 2 : Séries temporelles (une seule valeur par timestep)</strong></p>
                <div className="code-example">x = [1.5]  ← 1 seul nombre (vecteur de dimension 1)</div>
                <p className="example-note">Même un seul nombre est traité comme un vecteur de dimension 1 !</p>
              </div>
              <div className="example-item">
                <p><strong>Exemple 3 : Données multi-variées (plusieurs caractéristiques)</strong></p>
                <div className="code-example">x = [température: 25.3, humidité: 0.6, pression: 1013.2]</div>
                <p className="example-note">Vecteur de dimension 3 avec température, humidité, pression</p>
              </div>
            </div>
            <div className="dimensions-table">
              <h6>📐 Dimensions et Formes</h6>
              <table>
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Forme</th>
                    <th>Exemple</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>xₜ</td>
                    <td>(M, 1) ou (M,)</td>
                    <td>[0.5, 0.3, 0.8] si M=3</td>
                  </tr>
                  <tr>
                    <td>hₜ</td>
                    <td>(R, 1) ou (R,)</td>
                    <td>[0.7, -0.2, 0.4] si R=3</td>
                  </tr>
                  <tr>
                    <td>Wₓₕ</td>
                    <td>(R, M)</td>
                    <td>Matrice R×M</td>
                  </tr>
                  <tr>
                    <td>Wₕₕ</td>
                    <td>(R, R)</td>
                    <td>Matrice carrée R×R</td>
                  </tr>
                </tbody>
              </table>
              <p className="dimension-note">
                <strong>M</strong> = dimension de l'input x (ex: 100 pour un mot)<br/>
                <strong>R</strong> = dimension du hidden state h (ex: 64 neurones)
              </p>
            </div>
            <div className="summary-box">
              <h6>✅ Résumé</h6>
              <ul>
                <li>✅ <strong>x est TOUJOURS un vecteur</strong> (même avec 1 seul nombre)</li>
                <li>✅ La dimension de x (M) dépend de vos données</li>
                <li>✅ Si vous avez 1 valeur par timestep → x est de dimension 1</li>
                <li>✅ Si vous avez des mots → x est de dimension 100 ou 300 (embedding)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RNNConceptsSlide

