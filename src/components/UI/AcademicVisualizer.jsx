import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Info, Star, Award, Shield, ArrowRight } from 'lucide-react';

export const AcademicVisualizer = ({ scenario, isRevealed = false, userAnswer = null }) => {
  if (!scenario) return null;
  const { visualData } = scenario;
  const type = visualData?.type || 'matrix';

  switch (type) {
    case 'matrix':
      return <MatrixVisualizer scenario={scenario} isRevealed={isRevealed} userAnswer={userAnswer} />;
    case 'mixed':
      return <MixedStrategyPlot scenario={scenario} isRevealed={isRevealed} />;
    case 'tree':
      return <GameTreeDiagram scenario={scenario} isRevealed={isRevealed} />;
    case 'cournot':
      return <IOReactionCurves scenario={scenario} isRevealed={isRevealed} />;
    case 'public':
      return <PublicGoodsBar scenario={scenario} isRevealed={isRevealed} />;
    default:
      return null;
  }
};

// 1. GELİŞMİŞ MATRİS GÖRSELLEŞTİRİCİ
const MatrixVisualizer = ({ scenario, isRevealed, userAnswer }) => {
  const actions = scenario?.actions || ['Strateji 1', 'Strateji 2'];
  const actionsPlayerB = scenario?.actionsPlayerB || scenario?.actions || ['Strateji 1', 'Strateji 2'];
  const matrix = scenario?.matrix || [[[0, 0], [0, 0]], [[0, 0], [0, 0]]];
  const brA = scenario?.visualData?.brA || [];
  const brB = scenario?.visualData?.brB || [];
  const nashCells = scenario?.visualData?.nashCells || [];
  const actB = actionsPlayerB;

  const checkIsBR = (player, r, c) => {
    if (!isRevealed) return false;
    if (player === 'A') {
      return brA.some(cell => cell && cell[0] === r && cell[1] === c);
    }
    return brB.some(cell => cell && cell[0] === r && cell[1] === c);
  };

  const checkIsNash = (r, c) => {
    if (!isRevealed) return false;
    return nashCells.some(cell => cell && cell[0] === r && cell[1] === c);
  };

  const checkIsWrongCell = (r, c) => {
    if (!isRevealed || !userAnswer || userAnswer.correct) return false;
    const text = userAnswer.text || '';
    const pairStr1 = `(${actions[r] || ''}, ${actB[c] || ''})`;
    const pairStr2 = `${actions[r] || ''}, ${actB[c] || ''}`;
    const mentionsCell = text.includes(pairStr1) || text.includes(pairStr2);
    const isNash = nashCells.some(cell => cell && cell[0] === r && cell[1] === c);
    return mentionsCell && !isNash;
  };

  return (
    <div style={containerStyle}>
      <div style={labelHeader}>İNTERAKTİF ÖDEME MATRİSİ</div>
      <div style={legendStyle}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#f87171' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#f87171', borderRadius: '50%' }}></span>
          Firma A Tepkileri (Alt Çizgi)
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#60a5fa' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#60a5fa', borderRadius: '50%' }}></span>
          Firma B Tepkileri (*)
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: '0.75rem', alignItems: 'center', marginTop: '1rem' }}>
        {/* Row 1 Header */}
        <div></div>
        <div style={columnLabel}>{actB[0] || 'Strateji 1'}</div>
        <div style={columnLabel}>{actB[1] || 'Strateji 2'}</div>

        {/* Row 2 */}
        <div style={rowLabel}>{actions[0] || 'Strateji 1'}</div>
        <Cell r={0} c={0} matrix={matrix} isNash={checkIsNash(0, 0)} isWrong={checkIsWrongCell(0, 0)} isBrA={checkIsBR('A', 0, 0)} isBrB={checkIsBR('B', 0, 0)} />
        <Cell r={0} c={1} matrix={matrix} isNash={checkIsNash(0, 1)} isWrong={checkIsWrongCell(0, 1)} isBrA={checkIsBR('A', 0, 1)} isBrB={checkIsBR('B', 0, 1)} />

        {/* Row 3 */}
        <div style={rowLabel}>{actions[1] || 'Strateji 2'}</div>
        <Cell r={1} c={0} matrix={matrix} isNash={checkIsNash(1, 0)} isWrong={checkIsWrongCell(1, 0)} isBrA={checkIsBR('A', 1, 0)} isBrB={checkIsBR('B', 1, 0)} />
        <Cell r={1} c={1} matrix={matrix} isNash={checkIsNash(1, 1)} isWrong={checkIsWrongCell(1, 1)} isBrA={checkIsBR('A', 1, 1)} isBrB={checkIsBR('B', 1, 1)} />
      </div>
    </div>
  );
};

const Cell = ({ r, c, matrix, isNash, isWrong, isBrA, isBrB }) => {
  const payA = (matrix && matrix[r] && matrix[r][c] && matrix[r][c][0] !== undefined) ? matrix[r][c][0] : 0;
  const payB = (matrix && matrix[r] && matrix[r][c] && matrix[r][c][1] !== undefined) ? matrix[r][c][1] : 0;

  let borderColor = 'var(--glass-border)';
  let background = 'rgba(255,255,255,0.02)';
  let boxShadow = 'none';

  if (isNash) {
    borderColor = '#10b981';
    background = 'rgba(16, 185, 129, 0.12)';
    boxShadow = '0 0 15px rgba(16, 185, 129, 0.2)';
  } else if (isWrong) {
    borderColor = '#ef4444';
    background = 'rgba(239, 68, 68, 0.12)';
    boxShadow = '0 0 15px rgba(239, 68, 68, 0.2)';
  }

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      style={{
        ...cellStyle,
        borderColor,
        background,
        boxShadow,
        position: 'relative'
      }}
    >
      {isNash && (
        <span style={nashBadge}>NE</span>
      )}
      {isWrong && (
        <span style={{ ...nashBadge, background: '#ef4444' }}>Hata</span>
      )}
      <div style={{ display: 'flex', gap: '8px', fontSize: '1.25rem', fontWeight: 800 }}>
        {/* Player A Payoff */}
        <span style={{ 
          color: '#f87171', 
          textDecoration: isBrA ? 'underline' : 'none',
          textDecorationColor: '#f87171',
          textDecorationThickness: '2px'
        }}>
          {payA}
        </span>
        <span style={{ color: 'var(--text-muted)' }}>,</span>
        {/* Player B Payoff */}
        <span style={{ color: '#60a5fa', display: 'inline-flex', alignItems: 'center' }}>
          {payB}{isBrB && <Star size={10} color="#60a5fa" fill="#60a5fa" style={{ marginLeft: '2px', verticalAlign: 'super' }} />}
        </span>
      </div>
    </motion.div>
  );
};

// 2. KARMA STRATEJİ SVG GRAFİĞİ (Best Response step-functions)
const MixedStrategyPlot = ({ scenario, isRevealed }) => {
  const { actions } = scenario;
  const eq = scenario.visualData?.mixedEq || { p: 0.5, q: 0.5 };
  const p = eq.p;
  const q = eq.q;

  // Convert probability coordinate (0-1) to SVG coordinate (50-250)
  const toSvgX = (val) => 50 + val * 200;
  const toSvgY = (val) => 250 - val * 200; // Y axis is inverted in SVG

  return (
    <div style={containerStyle}>
      <div style={labelHeader}>KARMA STRATEJİ TEPKİ GRAFİĞİ</div>
      <div style={legendStyle}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#10b981' }}>
          <span style={{ display: 'inline-block', width: '12px', height: '2px', background: '#10b981' }}></span>
          Oyuncu 1 Tepkisi (p)
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#fbbf24' }}>
          <span style={{ display: 'inline-block', width: '12px', height: '2px', background: '#fbbf24' }}></span>
          Oyuncu 2 Tepkisi (q)
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <svg width="320" height="300" style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
          {/* Grid lines */}
          <line x1="50" y1="50" x2="250" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
          <line x1="250" y1="50" x2="250" y2="250" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />

          {/* Axes */}
          <line x1="50" y1="250" x2="270" y2="250" stroke="var(--text-muted)" strokeWidth="2" /> {/* X Axis */}
          <line x1="50" y1="250" x2="50" y2="30" stroke="var(--text-muted)" strokeWidth="2" />  {/* Y Axis */}
          
          {/* Axis Labels */}
          <text x="275" y="255" fill="var(--text-secondary)" fontSize="10" fontWeight="bold">q</text>
          <text x="45" y="25" fill="var(--text-secondary)" fontSize="10" fontWeight="bold">p</text>
          
          {/* Scale Labels */}
          <text x="40" y="255" fill="var(--text-muted)" fontSize="9">0</text>
          <text x="35" y="55" fill="var(--text-muted)" fontSize="9">1</text>
          <text x="245" y="265" fill="var(--text-muted)" fontSize="9">1</text>

          {/* Player 1's Best Response Curve (Green): p as function of q */}
          {/* If q < q*, p=1; If q > q*, p=0; If q=q*, p is [0,1] */}
          <path 
            d={`M ${toSvgX(0)} ${toSvgY(1)} L ${toSvgX(q)} ${toSvgY(1)} L ${toSvgX(q)} ${toSvgY(0)} L ${toSvgX(1)} ${toSvgY(0)}`}
            fill="none"
            stroke={isRevealed ? "#10b981" : "rgba(255,255,255,0.2)"}
            strokeWidth="3"
          />

          {/* Player 2's Best Response Curve (Yellow): q as function of p */}
          {/* If p < p*, q=0; If p > p*, q=1; If p=p*, q is [0,1] */}
          <path 
            d={`M ${toSvgX(0)} ${toSvgY(0)} L ${toSvgX(0)} ${toSvgY(p)} L ${toSvgX(1)} ${toSvgY(p)} L ${toSvgX(1)} ${toSvgY(1)}`}
            fill="none"
            stroke={isRevealed ? "#fbbf24" : "rgba(255,255,255,0.15)"}
            strokeWidth="3"
          />

          {/* Equilibrium helper lines */}
          {isRevealed && (
            <>
              <line x1="50" y1={toSvgY(p)} x2={toSvgX(q)} y2={toSvgY(p)} stroke="rgba(255,255,255,0.2)" strokeDasharray="3" />
              <line x1={toSvgX(q)} y1="250" x2={toSvgX(q)} y2={toSvgY(p)} stroke="rgba(255,255,255,0.2)" strokeDasharray="3" />
            </>
          )}

          {/* Intersection (Nash Equilibrium) */}
          {isRevealed && (
            <circle cx={toSvgX(q)} cy={toSvgY(p)} r="6" fill="#ef4444" stroke="white" strokeWidth="2" />
          )}
          
          {/* Eq Label text */}
          {isRevealed && (
            <text x={toSvgX(q) + 10} y={toSvgY(p) - 10} fill="white" fontSize="10" fontWeight="bold" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
              NE ({p}, {q})
            </text>
          )}
        </svg>
      </div>
      {isRevealed ? (
        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Sinyal Karışımı: P1 en yüksek fayda için {actions[0]} hamlesini %{Math.round(p*100)}, P2 ise {scenario.actionsPlayerB ? scenario.actionsPlayerB[0] : actions[0]} hamlesini %{Math.round(q*100)} olasılıkla seçmelidir.
        </div>
      ) : (
        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Karma strateji analiz grafikleri soru çözüldükten sonra detaylandırılacaktır.
        </div>
      )}
    </div>
  );
};

// 3. ARDIŞIK OYUNLAR İÇİN DİNAMİK OYUN AĞACI (Game Tree)
const GameTreeDiagram = ({ scenario, isRevealed }) => {
  const tree = scenario.visualData?.treeNodes || { nodes: [], edges: [] };
  const nodes = tree.nodes || [];
  const edges = tree.edges || [];

  return (
    <div style={containerStyle}>
      <div style={labelHeader}>ARDIŞIK KARAR AĞACI & SPE</div>
      {isRevealed && (
        <div style={legendStyle}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#fbbf24' }}>
            <span style={{ display: 'inline-block', width: '20px', height: '4px', background: '#fbbf24', borderRadius: '2px' }}></span>
            SPE Dengesi (Geriye Doğru Tümevarım Yolu)
          </span>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <svg width="400" height="320" style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="rgba(255,255,255,0.3)" />
            </marker>
            <marker id="arrow-spe" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="#fbbf24" />
            </marker>
          </defs>

          {/* Edges */}
          {edges.map((edge, idx) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            const isSpePath = isRevealed && edge.isSpe;

            return (
              <g key={`edge-${idx}`}>
                <line 
                  x1={fromNode.x} 
                  y1={fromNode.y} 
                  x2={toNode.x} 
                  y2={toNode.y} 
                  stroke={isSpePath ? '#fbbf24' : 'rgba(255,255,255,0.15)'} 
                  strokeWidth={isSpePath ? '4' : '2'}
                  style={{
                    filter: isSpePath ? 'drop-shadow(0 0 5px rgba(251, 191, 36, 0.6))' : 'none'
                  }}
                  markerEnd={isSpePath ? 'url(#arrow-spe)' : 'url(#arrow)'}
                />
                {/* Edge Label */}
                <text 
                  x={(fromNode.x + toNode.x) / 2} 
                  y={(fromNode.y + toNode.y) / 2 - 8} 
                  fill={isSpePath ? '#fbbf24' : 'var(--text-secondary)'} 
                  fontSize="10" 
                  fontWeight={isSpePath ? 'bold' : 'normal'}
                  textAnchor="middle"
                >
                  {edge.label}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node, idx) => {
            if (node.type === 'decision') {
              return (
                <g key={`node-${idx}`}>
                  <circle 
                    cx={node.x} 
                    cy={node.y} 
                    r="12" 
                    fill="var(--bg-surface)" 
                    stroke="var(--accent-blue)" 
                    strokeWidth="3" 
                  />
                  <text 
                    x={node.x} 
                    y={node.y - 18} 
                    fill="var(--text-primary)" 
                    fontSize="9" 
                    fontWeight="bold" 
                    textAnchor="middle"
                  >
                    {node.player}
                  </text>
                </g>
              );
            } else {
              // Terminal Node
              return (
                <g key={`node-${idx}`}>
                  <circle 
                    cx={node.x} 
                    cy={node.y} 
                    r="5" 
                    fill="#94a3b8" 
                  />
                  <text 
                    x={node.x + 10} 
                    y={node.y + 4} 
                    fill="#cbd5e1" 
                    fontSize="11" 
                    fontWeight="bold"
                  >
                    ({node.payoffs ? node.payoffs.join(',') : ''})
                  </text>
                </g>
              );
            }
          })}
        </svg>
      </div>
      <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
        Düğümler karar noktalarını, uçlardaki koordinatlar ise sırasıyla (P1, P2) ödemelerini gösterir. {isRevealed && "Alt oyun kusursuz dengesi kalın sarı renkle parlatılmıştır."}
      </div>
    </div>
  );
};

// 4. ENDÜSTRİYEL ORGANİZASYON - TEPKİ EĞRİLERİ (Cournot / Stackelberg)
const IOReactionCurves = ({ scenario, isRevealed }) => {
  const data = scenario.visualData?.cournotData || { a: 30, c: 6, eq: [8, 8], monopoly: [6, 6] };
  const { a, c, eq, monopoly } = data;
  
  // Scale function: maps quantity (0 to 24) to SVG pixels (50 to 250)
  const maxQty = a - c; // 24
  const toSvgX = (q1) => 50 + (q1 / maxQty) * 200;
  const toSvgY = (q2) => 250 - (q2 / maxQty) * 200;

  return (
    <div style={containerStyle}>
      <div style={labelHeader}>REAKSİYON / EN İYİ TEPKİ EĞRİLERİ</div>
      <div style={legendStyle}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#3b82f6' }}>
          <span style={{ display: 'inline-block', width: '12px', height: '2px', background: '#3b82f6' }}></span>
          Firma 1 Reaksiyon Eğrisi
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#ec4899' }}>
          <span style={{ display: 'inline-block', width: '12px', height: '2px', background: '#ec4899' }}></span>
          Firma 2 Reaksiyon Eğrisi
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <svg width="320" height="300" style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
          {/* Grid lines */}
          <line x1="50" y1="50" x2="250" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
          <line x1="250" y1="50" x2="250" y2="250" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />

          {/* Axes */}
          <line x1="50" y1="250" x2="270" y2="250" stroke="var(--text-muted)" strokeWidth="2" /> {/* q1 Axis */}
          <line x1="50" y1="250" x2="50" y2="30" stroke="var(--text-muted)" strokeWidth="2" />  {/* q2 Axis */}
          
          <text x="275" y="255" fill="var(--text-secondary)" fontSize="10" fontWeight="bold">q1</text>
          <text x="45" y="25" fill="var(--text-secondary)" fontSize="10" fontWeight="bold">q2</text>
          
          {/* Reaction Curve 1 (Blue): q1 = (maxQty - q2)/2 */}
          {/* Points: when q2 = 0, q1 = maxQty/2 = 12. when q2 = maxQty = 24, q1 = 0 */}
          <line 
            x1={toSvgX(maxQty / 2)} 
            y1={toSvgY(0)} 
            x2={toSvgX(0)} 
            y2={toSvgY(maxQty)} 
            stroke="#3b82f6" 
            strokeWidth="3" 
          />

          {/* Reaction Curve 2 (Pink): q2 = (maxQty - q1)/2 */}
          {/* Points: when q1 = 0, q2 = maxQty/2 = 12. when q1 = maxQty = 24, q2 = 0 */}
          <line 
            x1={toSvgX(0)} 
            y1={toSvgY(maxQty / 2)} 
            x2={toSvgX(maxQty)} 
            y2={toSvgY(0)} 
            stroke="#ec4899" 
            strokeWidth="3" 
          />

          {/* Intersection - Cournot-Nash Equilibrium */}
          {isRevealed && (
            <>
              <circle cx={toSvgX(eq[0])} cy={toSvgY(eq[1])} r="6" fill="#10b981" stroke="white" strokeWidth="2" />
              <text x={toSvgX(eq[0]) + 10} y={toSvgY(eq[1]) - 10} fill="white" fontSize="9" fontWeight="bold">
                Nash ({eq[0]}, {eq[1]})
              </text>
            </>
          )}

          {/* Monopoly / Cartel point */}
          {isRevealed && (
            <>
              <circle cx={toSvgX(monopoly[0])} cy={toSvgY(monopoly[1])} r="5" fill="#f59e0b" stroke="white" strokeWidth="1" />
              <text x={toSvgX(monopoly[0]) - 40} y={toSvgY(monopoly[1]) + 15} fill="#fbbf24" fontSize="9" fontWeight="bold">
                Kartel ({monopoly[0]}, {monopoly[1]})
              </text>
            </>
          )}

          {/* Labels for Axis intercepts */}
          <text x="35" y={toSvgY(maxQty / 2)} fill="var(--text-muted)" fontSize="8">{(maxQty / 2)}</text>
          <text x={toSvgX(maxQty / 2) - 10} y="265" fill="var(--text-muted)" fontSize="8">{(maxQty / 2)}</text>
        </svg>
      </div>
      {isRevealed ? (
        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Firmaların optimal üretim reaksiyon doğrularıdır. Yeşil nokta Cournot-Nash dengesini (istikrarlı), turuncu ise toplam kârı maksimize eden (verimli ama istikrarsız) kartel noktasını temsil eder.
        </div>
      ) : (
        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Tepki eğrilerinin kesişimi ve optimal üretim miktarları soru çözüldükten sonra gösterilecektir.
        </div>
      )}
    </div>
  );
};

// 5. KAMU EKONOMİSİ - REFAH / VERİMLİLİK BARI (Public Goods / Commons)
const PublicGoodsBar = ({ scenario, isRevealed }) => {
  const data = scenario.visualData?.publicData || { nash: 0, socialOptimum: 2 };
  
  if (!isRevealed) {
    return (
      <div style={containerStyle}>
        <div style={labelHeader}>TOPLUMSAL REFAH VE VERİMLİLİK BARI</div>
        <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', border: '1px dashed var(--glass-border)', borderRadius: '12px', background: 'rgba(0,0,0,0.1)' }}>
          Toplumsal refah analizi grafikleri soru çözüldükten sonra görüntülenecektir.
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={labelHeader}>TOPLUMSAL REFAH VE VERİMLİLİK BARI</div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Bireysel Çıkar Dengesi (Nash)</span>
            <span style={{ fontWeight: 800, color: '#ef4444' }}>Düşük Çevre Kalitesi (0)</span>
          </div>
          <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ width: '15%', height: '100%', background: '#ef4444' }}></div>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Kolektif Optimum (Social Optimum)</span>
            <span style={{ fontWeight: 800, color: '#10b981' }}>Maksimum Çevre Kalitesi (+2)</span>
          </div>
          <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: '#10b981' }}></div>
          </div>
        </div>
      </div>

      <div style={welfareLossBox}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Shield size={18} color="#f59e0b" />
          <h5 style={{ color: '#fbbf24', fontSize: '0.9rem', fontWeight: 700 }}>Piyasa Başarısızlığı Uçurumu</h5>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Ortak kamu malları ve çevre bütçeleri serbest piyasaya bırakıldığında, her ülke "bedavacılık" yapmak ister. Sonuçta kimse yatırım yapmaz ve refah seviyesi minimuma iner. Bu verimsizlik "Deadweight Loss" (Ölü Kayıp) olarak tanımlanır.
        </p>
      </div>
    </div>
  );
};

// CSS-in-JS Styles for Visualizers
const containerStyle = {
  padding: '1.5rem',
  background: 'var(--glass-bg)',
  border: '1px solid var(--glass-border)',
  borderRadius: '16px',
  backdropFilter: 'var(--glass-blur)',
  marginBottom: '1.5rem'
};

const labelHeader = {
  fontSize: '0.8rem',
  fontWeight: 800,
  color: 'var(--accent-blue)',
  letterSpacing: '1.5px',
  marginBottom: '0.75rem',
  textTransform: 'uppercase'
};

const legendStyle = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
  marginBottom: '0.75rem',
  paddingBottom: '0.5rem',
  borderBottom: '1px solid rgba(255,255,255,0.05)'
};

const cellStyle = {
  padding: '1.25rem',
  border: '1px solid',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '75px',
  cursor: 'default'
};

const columnLabel = {
  textAlign: 'center',
  fontWeight: 700,
  color: 'var(--text-secondary)',
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  padding: '0.5rem'
};

const rowLabel = {
  textAlign: 'right',
  fontWeight: 700,
  color: 'var(--text-secondary)',
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  paddingRight: '1rem'
};

const nashBadge = {
  position: 'absolute',
  top: '4px',
  right: '4px',
  background: '#10b981',
  color: 'white',
  fontSize: '0.6rem',
  fontWeight: 900,
  padding: '2px 6px',
  borderRadius: '4px',
  letterSpacing: '0.5px'
};

const welfareLossBox = {
  marginTop: '1.5rem',
  padding: '1rem',
  background: 'rgba(245, 158, 11, 0.05)',
  border: '1px dashed rgba(245, 158, 11, 0.3)',
  borderRadius: '10px'
};
