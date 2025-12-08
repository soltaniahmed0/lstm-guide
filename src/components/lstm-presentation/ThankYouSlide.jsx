import React from 'react'
import './ThankYouSlide.css'

function ThankYouSlide() {
  return (
    <div className="slide thank-you-slide">
      <div className="thank-you-content">
        <h1 className="thank-you-title">Merci pour votre attention</h1>
        <div className="thank-you-subtitle">
          <p>Questions ?</p>
        </div>
        <div className="presenters-final">
          <div className="presenter-final">
            <div className="presenter-name">RAJA HANNACHI</div>
          </div>
          <div className="presenter-final">
            <div className="presenter-name">AHMED SOLTANI</div>
          </div>
        </div>
        <div className="supervisor-final">
          <p>Encadré par</p>
          <p className="supervisor-name-final">M. MOHAMED RIDHA AMAMOU</p>
        </div>
        <div className="year-final">
          <p>Année Universitaire 2025-2026</p>
          <p>Module : Machine Learning</p>
        </div>
      </div>
    </div>
  )
}

export default ThankYouSlide

