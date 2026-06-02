import React from 'react';
import './UI.css';

export const GlassCard = ({ children, className = '', style = {}, onClick }) => (
  <div className={`glass-card ${className}`} style={{ ...style, cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
    {children}
  </div>
);

export const PremiumButton = ({ children, variant = 'primary', icon: Icon, className = '', ...props }) => (
  <button className={`btn-premium btn-${variant} ${className}`} {...props}>
    {Icon && <Icon size={18} />}
    {children}
  </button>
);

export const ProgressIndicator = ({ value, label }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
      <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontWeight: 600 }}>{value}%</span>
    </div>
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

export const Matrix = ({ data, playerA = 'Oyuncu A', playerB = 'Oyuncu B' }) => {
  // Use provided data or default demo matrix
  const matrixData = data || [
    [[1, 1], [5, 0]],
    [[0, 5], [3, 3]]
  ];

  return (
    <div className="matrix-wrapper" style={{ overflowX: 'auto', padding: '1rem' }}>
      <table className="game-matrix">
        <thead>
          <tr>
            <th></th>
            <th className="matrix-header">{playerB} - S1</th>
            <th className="matrix-header">{playerB} - S2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="matrix-header" style={{ verticalAlign: 'middle', fontWeight: 800 }}>{playerA}<br/>S1</td>
            <td className="matrix-cell">
              <div className="payoff" style={payoffStyle}>
                <span className="payoff-a">{matrixData[0][0][0]}</span>
                <span className="payoff-separator">,</span>
                <span className="payoff-b">{matrixData[0][0][1]}</span>
              </div>
            </td>
            <td className="matrix-cell">
              <div className="payoff" style={payoffStyle}>
                <span className="payoff-a">{matrixData[0][1][0]}</span>
                <span className="payoff-separator">,</span>
                <span className="payoff-b">{matrixData[0][1][1]}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="matrix-header" style={{ verticalAlign: 'middle', fontWeight: 800 }}>{playerA}<br/>S2</td>
            <td className="matrix-cell">
              <div className="payoff" style={payoffStyle}>
                <span className="payoff-a">{matrixData[1][0][0]}</span>
                <span className="payoff-separator">,</span>
                <span className="payoff-b">{matrixData[1][0][1]}</span>
              </div>
            </td>
            <td className="matrix-cell">
              <div className="payoff" style={payoffStyle}>
                <span className="payoff-a">{matrixData[1][1][0]}</span>
                <span className="payoff-separator">,</span>
                <span className="payoff-b">{matrixData[1][1][1]}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const payoffStyle = { display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800 };
