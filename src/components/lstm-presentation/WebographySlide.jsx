import React from 'react'
import './WebographySlide.css'

function WebographySlide() {
  const references = [
    {
      category: 'Articles Fondamentaux',
      items: [
        {
          title: 'Long Short-Term Memory',
          authors: 'Hochreiter, S., & Schmidhuber, J.',
          year: '1997',
          link: 'https://www.bioinf.jku.at/publications/older/2604.pdf',
          description: 'Article original présentant l\'architecture LSTM'
        },
        {
          title: 'Understanding LSTM Networks',
          authors: 'Christopher Olah',
          year: '2015',
          link: 'https://colah.github.io/posts/2015-08-Understanding-LSTMs/',
          description: 'Explication visuelle et intuitive des LSTM'
        }
      ]
    },
    {
      category: 'Tutoriels et Guides',
      items: [
        {
          title: 'LSTM Networks - A Detailed Explanation',
          authors: 'Towards Data Science',
          link: 'https://towardsdatascience.com/lstm-networks-a-detailed-explanation',
          description: 'Guide détaillé sur les réseaux LSTM'
        },
        {
          title: 'Recurrent Neural Networks (RNN) and Long Short-Term Memory (LSTM)',
          authors: 'TensorFlow',
          link: 'https://www.tensorflow.org/guide/keras/rnn',
          description: 'Documentation officielle TensorFlow sur RNN et LSTM'
        }
      ]
    },
    {
      category: 'Kaggle et Projets Pratiques',
      items: [
        {
          title: 'Gold Price Prediction LSTM - 96% Accuracy',
          authors: 'Farzad Nekouei',
          link: 'https://www.kaggle.com/code/farzadnekouei/gold-price-prediction-lstm-96-accuracy',
          description: 'Notebook Kaggle utilisé dans l\'étude de cas'
        },
        {
          title: 'Time Series Forecasting with LSTM',
          authors: 'Kaggle Learn',
          link: 'https://www.kaggle.com/learn/time-series',
          description: 'Cours Kaggle sur les séries temporelles'
        }
      ]
    },
    {
      category: 'Cours et Vidéos',
      items: [
        {
          title: 'CS231n: Recurrent Neural Networks',
          authors: 'Stanford University',
          link: 'http://cs231n.stanford.edu/slides/2017/cs231n_2017_lecture10.pdf',
          description: 'Cours Stanford sur les RNN'
        },
        {
          title: 'Deep Learning Specialization - Sequence Models',
          authors: 'Andrew Ng - Coursera',
          link: 'https://www.coursera.org/learn/nlp-sequence-models',
          description: 'Spécialisation Deep Learning incluant LSTM'
        }
      ]
    },
    {
      category: 'Bibliothèques et Outils',
      items: [
        {
          title: 'Keras LSTM Documentation',
          authors: 'Keras Team',
          link: 'https://keras.io/api/layers/recurrent_layers/lstm/',
          description: 'Documentation officielle Keras pour LSTM'
        },
        {
          title: 'PyTorch LSTM',
          authors: 'PyTorch Team',
          link: 'https://pytorch.org/docs/stable/generated/torch.nn.LSTM.html',
          description: 'Documentation PyTorch pour LSTM'
        }
      ]
    },
    {
      category: 'Comparaisons et Analyses',
      items: [
        {
          title: 'The Unreasonable Effectiveness of Recurrent Neural Networks',
          authors: 'Andrej Karpathy',
          link: 'http://karpathy.github.io/2015/05/21/rnn-effectiveness/',
          description: 'Article sur l\'efficacité des RNN'
        },
        {
          title: 'Attention Is All You Need (Transformers)',
          authors: 'Vaswani et al.',
          year: '2017',
          link: 'https://arxiv.org/abs/1706.03762',
          description: 'Article fondateur sur les Transformers'
        }
      ]
    }
  ]

  return (
    <div className="slide webography-slide">
      <h1 className="slide-title-main">Webographie</h1>
      
      <div className="webography-container">
        {references.map((category, categoryIndex) => (
          <div key={categoryIndex} className="reference-category">
            <h2 className="category-title">{category.category}</h2>
            <div className="references-list">
              {category.items.map((ref, refIndex) => (
                <div key={refIndex} className="reference-item">
                  <div className="reference-header">
                    <h3 className="reference-title">{ref.title}</h3>
                    {ref.year && <span className="reference-year">({ref.year})</span>}
                  </div>
                  {ref.authors && (
                    <p className="reference-authors"><strong>Auteurs :</strong> {ref.authors}</p>
                  )}
                  <p className="reference-description">{ref.description}</p>
                  <a
                    href={ref.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="reference-link"
                  >
                    🔗 {ref.link}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="webography-note">
        <p>
          <strong>Note :</strong> Ces ressources sont recommandées pour approfondir votre compréhension 
          des RNN, LSTM et de leurs applications pratiques.
        </p>
      </div>
    </div>
  )
}

export default WebographySlide
