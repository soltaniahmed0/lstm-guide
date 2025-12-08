import React from 'react'
import './TitleSlide.css'

function TitleSlide() {
  return (
    <div className="slide title-slide">
      <div className="title-content">
        <h1 className="main-title">Long Short-Term Memory</h1>
        <div className="presenters-section">
          <div className="section">
            <h2 className="section-label">PRÉSENTÉE PAR :</h2>
            <div className="names">
              <div className="name">RAJA HANNACHI</div>
              <div className="name">AHMED SOLTANI</div>
            </div>
          </div>
          <div className="section">
            <h2 className="section-label">ENCADRÉ PAR :</h2>
            <div className="supervisor-name">M. MOHAMED RIDHA AMAMOU</div>
          </div>
          <div className="section">
            <div className="info-item">
              <span className="info-label">ANNÉE UNIVERSITAIRE</span>
              <span className="info-value">2025-2026</span>
            </div>
            <div className="info-item">
              <span className="info-label">MODULE :</span>
              <span className="info-value">MACHINE LEARNING</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TitleSlide

