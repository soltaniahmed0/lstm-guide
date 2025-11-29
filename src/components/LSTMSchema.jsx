import React from 'react'
import './LSTMSchema.css'

function LSTMSchema({ inputs, schemaValues, presentationMode = false }) {
  function formatNum(num, decimals = 4) {
    if (num === null || num === undefined) return '-'
    return num.toFixed(decimals)
  }

  return (
    <div className="schema-container">
      <div className="schema-title">📊 LSTM Cell Architecture (Live Values)</div>
      <div className="lstm-schema">
        <svg viewBox="0 0 1400 800" xmlns="http://www.w3.org/2000/svg" style={{width: '100%', height: '100%'}}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
            </marker>
            <filter id="softShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.1"/>
            </filter>
          </defs>

          {/* Dashed boxes for gates */}
          <rect x="240" y="60" width="320" height="240" rx="8" fill="none" stroke="#2196f3" strokeWidth="3" strokeDasharray="8 10" filter="url(#softShadow)"/>
          <text x="250" y="50" fontSize="16" fill="#2196f3" fontWeight="bold">Forget gate</text>

          <rect x="600" y="60" width="320" height="320" rx="8" fill="none" stroke="#f44336" strokeWidth="3" strokeDasharray="8 10" filter="url(#softShadow)"/>
          <text x="610" y="50" fontSize="16" fill="#f44336" fontWeight="bold">Input Gate</text>

          <rect x="600" y="480" width="320" height="280" rx="8" fill="none" stroke="#4caf50" strokeWidth="3" strokeDasharray="8 10" filter="url(#softShadow)"/>
          <text x="610" y="470" fontSize="16" fill="#4caf50" fontWeight="bold">Output Gate</text>

          {/* Input Values */}
          <foreignObject x="40" y="140" width="140" height="80">
            <div className="value-box schema-value" style={{padding: '15px', fontSize: '1.1em', minWidth: '120px'}}>
              <div style={{fontSize: '0.9em', marginBottom: '5px', color: '#1976d2', fontWeight: '600'}}>Cₜ₋₁</div>
              <div style={{fontSize: '1.4em', fontWeight: 'bold'}}>{formatNum(schemaValues.ct_prev)}</div>
            </div>
          </foreignObject>
          <line x1="180" y1="180" x2="240" y2="180" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>

          <foreignObject x="40" y="260" width="140" height="80">
            <div className="value-box schema-value" style={{padding: '15px', fontSize: '1.1em', minWidth: '120px'}}>
              <div style={{fontSize: '0.9em', marginBottom: '5px', color: '#1976d2', fontWeight: '600'}}>hₜ₋₁</div>
              <div style={{fontSize: '1.4em', fontWeight: 'bold'}}>{formatNum(schemaValues.ht_prev)}</div>
            </div>
          </foreignObject>
          <path d="M 180 300 Q 300 300, 400 200" fill="none" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>

          <foreignObject x="40" y="380" width="140" height="80">
            <div className="value-box schema-value" style={{padding: '15px', fontSize: '1.1em', minWidth: '120px'}}>
              <div style={{fontSize: '0.9em', marginBottom: '5px', color: '#1976d2', fontWeight: '600'}}>Xₜ</div>
              <div style={{fontSize: '1.4em', fontWeight: 'bold'}}>{formatNum(schemaValues.xt)}</div>
            </div>
          </foreignObject>
          <path d="M 180 420 Q 300 420, 400 200" fill="none" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>

          {/* Forget Gate Components */}
          <rect x="360" y="140" width="80" height="45" rx="6" fill="#c8e6c9" stroke="#4caf50" strokeWidth="2"/>
          <text x="380" y="170" fontSize="14" fill="#2e7d32" fontWeight="bold">Sig</text>
          
          <foreignObject x="340" y="210" width="120" height="60">
            <div className="value-box schema-value" style={{padding: '12px', fontSize: '1em', minWidth: '100px'}}>
              <div style={{fontSize: '0.85em', marginBottom: '3px', color: '#1976d2', fontWeight: '600'}}>fₜ</div>
              <div style={{fontSize: '1.3em', fontWeight: 'bold'}}>{formatNum(schemaValues.ft)}</div>
            </div>
          </foreignObject>

          {/* Multiply f_t × C_t-1 */}
          <g transform="translate(580,180)">
            <circle r="25" fill="#bbdefb" stroke="#2196f3" strokeWidth="3"/>
            <text x="-8" y="8" fontSize="24" fill="#1565c0" fontWeight="bold">×</text>
          </g>
          <path d="M 400 235 Q 480 235, 555 195" fill="none" stroke="#2196f3" strokeWidth="2" markerEnd="url(#arrow)"/>
          <path d="M 240 180 Q 400 180, 555 180" fill="none" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>

          <foreignObject x="620" y="150" width="140" height="60">
            <div className="value-box schema-value" style={{padding: '12px', fontSize: '1em', minWidth: '120px'}}>
              <div style={{fontSize: '0.85em', marginBottom: '3px', color: '#1976d2', fontWeight: '600'}}>fₜ × Cₜ₋₁</div>
              <div style={{fontSize: '1.2em', fontWeight: 'bold'}}>{formatNum(schemaValues.ft_ct)}</div>
            </div>
          </foreignObject>

          {/* Input Gate Components */}
          <rect x="720" y="140" width="70" height="45" rx="6" fill="#c8e6c9" stroke="#4caf50" strokeWidth="2"/>
          <text x="735" y="170" fontSize="14" fill="#2e7d32" fontWeight="bold">Sig</text>
          
          <foreignObject x="700" y="210" width="110" height="50">
            <div className="value-box schema-value" style={{padding: '10px', fontSize: '0.95em', minWidth: '90px'}}>
              <div style={{fontSize: '0.8em', marginBottom: '3px', color: '#1976d2', fontWeight: '600'}}>iₜ</div>
              <div style={{fontSize: '1.2em', fontWeight: 'bold'}}>{formatNum(schemaValues.it)}</div>
            </div>
          </foreignObject>

          <rect x="680" y="280" width="130" height="45" rx="6" fill="#fff9c4" stroke="#fbc02d" strokeWidth="2"/>
          <text x="710" y="310" fontSize="14" fill="#f57f17" fontWeight="bold">tanh</text>
          
          <foreignObject x="700" y="340" width="110" height="50">
            <div className="value-box schema-value" style={{padding: '10px', fontSize: '0.95em', minWidth: '90px'}}>
              <div style={{fontSize: '0.8em', marginBottom: '3px', color: '#1976d2', fontWeight: '600'}}>C̃ₜ</div>
              <div style={{fontSize: '1.2em', fontWeight: 'bold'}}>{formatNum(schemaValues.ctilde)}</div>
            </div>
          </foreignObject>

          {/* Multiply i_t × C̃_t */}
          <g transform="translate(980,260)">
            <circle r="25" fill="#ffccbc" stroke="#ff5722" strokeWidth="3"/>
            <text x="-8" y="8" fontSize="24" fill="#bf360c" fontWeight="bold">×</text>
          </g>
          <path d="M 755 235 Q 850 235, 955 245" fill="none" stroke="#f44336" strokeWidth="2" markerEnd="url(#arrow)"/>
          <path d="M 755 365 Q 850 365, 955 275" fill="none" stroke="#f44336" strokeWidth="2" markerEnd="url(#arrow)"/>

          <foreignObject x="1020" y="230" width="140" height="60">
            <div className="value-box schema-value" style={{padding: '12px', fontSize: '1em', minWidth: '120px'}}>
              <div style={{fontSize: '0.85em', marginBottom: '3px', color: '#1976d2', fontWeight: '600'}}>iₜ × C̃ₜ</div>
              <div style={{fontSize: '1.2em', fontWeight: 'bold'}}>{formatNum(schemaValues.it_ctilde)}</div>
            </div>
          </foreignObject>

          {/* Add Operation */}
          <g transform="translate(1200,180)">
            <circle r="22" fill="#ffccbc" stroke="#ff5722" strokeWidth="3"/>
            <line x1="-12" y1="0" x2="12" y2="0" stroke="#ff5722" strokeWidth="3"/>
            <line x1="0" y1="-12" x2="0" y2="12" stroke="#ff5722" strokeWidth="3"/>
          </g>
          <path d="M 760 180 Q 950 180, 1175 180" fill="none" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>
          <path d="M 1160 260 Q 1180 240, 1175 200" fill="none" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)"/>

          {/* C_t Output */}
          <foreignObject x="1240" y="150" width="130" height="60">
            <div className="value-box schema-value" style={{padding: '15px', fontSize: '1.1em', minWidth: '100px', background: '#fff9c4', borderColor: '#fbc02d', borderWidth: '3px'}}>
              <div style={{fontSize: '0.9em', marginBottom: '5px', color: '#f57f17', fontWeight: '600'}}>Cₜ</div>
              <div style={{fontSize: '1.5em', fontWeight: 'bold'}}>{formatNum(schemaValues.ct)}</div>
            </div>
          </foreignObject>

          {/* Output Gate Components */}
          <rect x="720" y="540" width="70" height="45" rx="6" fill="#c8e6c9" stroke="#4caf50" strokeWidth="2"/>
          <text x="735" y="570" fontSize="14" fill="#2e7d32" fontWeight="bold">Sig</text>
          
          <foreignObject x="700" y="610" width="110" height="50">
            <div className="value-box schema-value" style={{padding: '10px', fontSize: '0.95em', minWidth: '90px'}}>
              <div style={{fontSize: '0.8em', marginBottom: '3px', color: '#1976d2', fontWeight: '600'}}>Oₜ</div>
              <div style={{fontSize: '1.2em', fontWeight: 'bold'}}>{formatNum(schemaValues.ot)}</div>
            </div>
          </foreignObject>

          <rect x="900" y="540" width="100" height="45" rx="6" fill="#fff9c4" stroke="#fbc02d" strokeWidth="2"/>
          <text x="920" y="570" fontSize="14" fill="#f57f17" fontWeight="bold">tanh</text>
          
          <foreignObject x="920" y="610" width="110" height="50">
            <div className="value-box schema-value" style={{padding: '10px', fontSize: '0.95em', minWidth: '90px'}}>
              <div style={{fontSize: '0.75em', marginBottom: '3px', color: '#1976d2', fontWeight: '600'}}>tanh(Cₜ)</div>
              <div style={{fontSize: '1.2em', fontWeight: 'bold'}}>{formatNum(schemaValues.tanh_ct)}</div>
            </div>
          </foreignObject>

          {/* Connections to Output Gate */}
          <path d="M 180 300 Q 400 300, 600 580" fill="none" stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrow)"/>
          <path d="M 180 420 Q 400 420, 600 600" fill="none" stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrow)"/>
          <path d="M 1305 180 Q 1305 400, 950 540" fill="none" stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrow)"/>

          {/* Final Multiply */}
          <g transform="translate(1080,650)">
            <circle r="25" fill="#c8e6c9" stroke="#4caf50" strokeWidth="3"/>
            <text x="-8" y="8" fontSize="24" fill="#2e7d32" fontWeight="bold">×</text>
          </g>
          <path d="M 755 635 Q 900 635, 1055 650" fill="none" stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrow)"/>
          <path d="M 1030 635 Q 1050 640, 1055 650" fill="none" stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrow)"/>

          {/* h_t Output */}
          <foreignObject x="1120" y="630" width="130" height="60">
            <div className="value-box schema-value" style={{padding: '15px', fontSize: '1.1em', minWidth: '100px', background: '#c8e6c9', borderColor: '#4caf50', borderWidth: '3px'}}>
              <div style={{fontSize: '0.9em', marginBottom: '5px', color: '#2e7d32', fontWeight: '600'}}>hₜ</div>
              <div style={{fontSize: '1.5em', fontWeight: 'bold'}}>{formatNum(schemaValues.ht)}</div>
            </div>
          </foreignObject>

          {/* Legend */}
          <rect x="40" y="720" width="400" height="60" rx="8" fill="#fafafa" stroke="#ddd" strokeWidth="2"/>
          <text x="50" y="740" fontSize="13" fill="#666" fontWeight="bold">Legend:</text>
          <rect x="50" y="750" width="50" height="25" rx="4" fill="#c8e6c9" stroke="#4caf50" strokeWidth="2"/>
          <text x="55" y="767" fontSize="11" fill="#2e7d32" fontWeight="bold">Sig</text>
          <text x="110" y="767" fontSize="12" fill="#666">= Sigmoid</text>
          <rect x="200" y="750" width="50" height="25" rx="4" fill="#fff9c4" stroke="#fbc02d" strokeWidth="2"/>
          <text x="205" y="767" fontSize="11" fill="#f57f17" fontWeight="bold">tanh</text>
          <text x="260" y="767" fontSize="12" fill="#666">= Tanh</text>
          <circle cx="320" cy="762" r="12" fill="#bbdefb" stroke="#2196f3" strokeWidth="2"/>
          <text x="315" y="768" fontSize="16" fill="#1565c0" fontWeight="bold">×</text>
          <text x="340" y="767" fontSize="12" fill="#666">= Multiply</text>
        </svg>
      </div>
    </div>
  )
}

export default LSTMSchema

