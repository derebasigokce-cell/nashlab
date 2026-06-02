import React, { useState, useEffect } from 'react';
import { GlassCard, PremiumButton, Matrix } from '../components/UI';
import { Brain, RefreshCcw, Save, TrendingUp, Info, Zap, ChevronRight, Play, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const examples = {
  mahkum: {
    name: 'Reklam Rekabeti (Static)',
    matrix: [[[1, 1], [5, 0]], [[0, 5], [3, 3]]],
    actions: ['Reklam Ver', 'Reklam Verme']
  },
  audit: {
    name: 'Denetleme Oyunu (Mixed)',
    matrix: [[[2, 10], [-5, 0]], [[10, 0], [-10, 5]]],
    actions: ['Denetle', 'Denetleme']
  },
  staghunt: {
    name: 'Koordinasyon (Geyik Avı)',
    matrix: [[[5, 5], [0, 3]], [[3, 0], [3, 3]]],
    actions: ['Geyik', 'Tavşan']
  }
};

const Solver = () => {
  const [matrix, setMatrix] = useState([
    [[1, 1], [5, 0]],
    [[0, 5], [3, 3]]
  ]);
  const [actions, setActions] = useState(['Strateji 1', 'Strateji 2']);
  const [results, setResults] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleUpdate = (r, c, p, val) => {
    const newMatrix = [...matrix.map(row => row.map(cell => [...cell]))];
    newMatrix[r][c][p] = parseFloat(val) || 0;
    setMatrix(newMatrix);
    setShowAnalysis(false);
  };

  const solveGame = () => {
    const nashEquilibria = [];
    const paretoOptima = [];
    
    // Nash Equilibrium (Pure)
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 2; c++) {
        const p1Val = matrix[r][c][0];
        const p2Val = matrix[r][c][1];
        const p1Best = p1Val >= matrix[1 - r][c][0];
        const p2Best = p2Val >= matrix[r][1 - c][1];
        if (p1Best && p2Best) nashEquilibria.push([r, c]);
      }
    }

    // Pareto Optimality
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 2; c++) {
        let isPareto = true;
        for (let r2 = 0; r2 < 2; r2++) {
          for (let c2 = 0; c2 < 2; c2++) {
            if (matrix[r2][c2][0] >= matrix[r][c][0] && matrix[r2][c2][1] >= matrix[r][c][1]) {
               if (matrix[r2][c2][0] > matrix[r][c][0] || matrix[r2][c2][1] > matrix[r][c][1]) {
                  isPareto = false;
                  break;
               }
            }
          }
        }
        if (isPareto) paretoOptima.push([r, c]);
      }
    }

    // Mixed Strategy (p for P1, q for P2)
    // P1's p found by P2 being indifferent: p*u2(1,1) + (1-p)*u2(2,1) = p*u2(1,2) + (1-p)*u2(2,2)
    // p * (A - B - C + D) = D - B => p = (D-B)/(A-B-C+D)
    const A = matrix[0][0][1], B = matrix[0][1][1], C = matrix[1][0][1], D = matrix[1][1][1];
    const denomP = (A - B - C + D);
    let p = denomP !== 0 ? (D - B) / denomP : null;

    const A2 = matrix[0][0][0], B2 = matrix[1][0][0], C2 = matrix[0][1][0], D2 = matrix[1][1][0];
    const denomQ = (A2 - B2 - C2 + D2);
    let q = denomQ !== 0 ? (D2 - B2) / denomQ : null;

    setResults({ 
      nashEquilibria, 
      paretoOptima, 
      mixed: (p > 0 && p < 1 && q > 0 && q < 1) ? { p: p.toFixed(2), q: q.toFixed(2) } : null
    });
    setShowAnalysis(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 800 }}>Akademik Oyun Çözücü</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Statik ve karma strateji dengelerini matematiksel olarak analiz edin.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
           <PremiumButton variant="glass" icon={RefreshCcw} onClick={() => setMatrix(examples.mahkum.matrix)}>Sıfırla</PremiumButton>
           <PremiumButton icon={Calculator} onClick={solveGame}>Dengeleri Hesapla</PremiumButton>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2.5rem' }}>
        <div>
           <GlassCard style={{ padding: '2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                 <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Ödeme Matrisi (2x2)</h3>
                 <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {Object.keys(examples).map(key => (
                       <button key={key} onClick={() => { setMatrix(examples[key].matrix); setActions(examples[key].actions); }} style={chipStyle}>{examples[key].name}</button>
                    ))}
                 </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: '1rem', alignItems: 'center' }}>
                 <div></div>
                 <div style={headerLabel}>{actions[0]}</div>
                 <div style={headerLabel}>{actions[1]}</div>

                 <div style={sideLabel}>{actions[0]}</div>
                 <EditableCell vals={matrix[0][0]} onUpdate={(p, v) => handleUpdate(0, 0, p, v)} 
                    isNash={results?.nashEquilibria?.some(n => n[0] === 0 && n[1] === 0)}
                 />
                 <EditableCell vals={matrix[0][1]} onUpdate={(p, v) => handleUpdate(0, 1, p, v)} 
                    isNash={results?.nashEquilibria?.some(n => n[0] === 0 && n[1] === 1)}
                 />

                 <div style={sideLabel}>{actions[1]}</div>
                 <EditableCell vals={matrix[1][0]} onUpdate={(p, v) => handleUpdate(1, 0, p, v)} 
                    isNash={results?.nashEquilibria?.some(n => n[1] === 0 && n[0] === 1)}
                 />
                 <EditableCell vals={matrix[1][1]} onUpdate={(p, v) => handleUpdate(1, 1, p, v)} 
                    isNash={results?.nashEquilibria?.some(n => n[0] === 1 && n[1] === 1)}
                 />
              </div>
           </GlassCard>

           <AnimatePresence>
            {showAnalysis && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                 <GlassCard style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                       <Brain size={24} color="var(--accent-blue)" /> Akademik Analiz Raporu
                    </h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                       <div>
                          <ResultSection title="Saf Strateji Nash Dengeleri" items={results.nashEquilibria.map(n => `(${actions[n[0]]}, ${actions[n[1]]})`)} />
                          <ResultSection title="Pareto Optimal Noktalar" items={results.paretoOptima.map(n => `(${actions[n[0]]}, ${actions[n[1]]})`)} />
                       </div>
                       <div>
                          <h4 style={sectionTitle}>Karma Strateji Analizi</h4>
                          <div style={mixedBox}>
                             {results.mixed ? (
                                <>
                                   <div style={mathRow}>P1 (p) = {results.mixed.p}</div>
                                   <div style={mathRow}>P2 (q) = {results.mixed.q}</div>
                                   <p style={mathDesc}>Oyuncu 1, {actions[0]} hamlesini %{results.mixed.p * 100} olasılıkla seçmelidir.</p>
                                </>
                             ) : (
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Bu matris için geçerli bir karma strateji dengesi bulunamadı (Saf bir denge muhtemelen dominanttır).</p>
                             )}
                          </div>
                       </div>
                    </div>
                 </GlassCard>
              </motion.div>
            )}
           </AnimatePresence>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           <GlassCard style={{ padding: '1.5rem', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid var(--accent-blue)' }}>
              <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <TrendingUp size={18} color="var(--accent-blue)" /> Stratejik Özet
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                 Matris değerlerine göre {results?.nashEquilibria?.length || 0} adet stabil denge noktası tespit edildi. {results?.mixed && "Karma stratejiler üzerinden rakibin tahmin edilemezliği sağlandı."}
              </p>
           </GlassCard>

           <GlassCard style={{ padding: '1.5rem' }}>
              <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem' }}><Info size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Çözüm Metotları</h4>
              <div style={methodItem}><strong>Cell-by-Cell:</strong> Her hücre için Best Response kontrolü.</div>
              <div style={methodItem}><strong>Expected Utility:</strong> Saf olmayan dengeler için olasılık hesabı.</div>
           </GlassCard>
        </div>
      </div>
    </motion.div>
  );
};

const ResultSection = ({ title, items }) => (
  <div style={{ marginBottom: '2rem' }}>
     <h4 style={sectionTitle}>{title}</h4>
     {items.length > 0 ? items.map((it, i) => (
        <div key={i} style={resItem}>{it}</div>
     )) : <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Yok</div>}
  </div>
);

const EditableCell = ({ vals, onUpdate, isNash }) => (
  <div style={{ 
    padding: '1.5rem', 
    background: isNash ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.03)',
    border: isNash ? '2px solid var(--accent-blue)' : '1px solid var(--glass-border)',
    borderRadius: '16px',
    display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.3s'
  }}>
    <input type="number" step="0.1" value={vals[0]} onChange={(e) => onUpdate(0, e.target.value)} style={cellInput} />
    <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>,</span>
    <input type="number" step="0.1" value={vals[1]} onChange={(e) => onUpdate(1, e.target.value)} style={cellInput} />
  </div>
);

const chipStyle = { padding: '5px 12px', fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-secondary)', cursor: 'pointer', transition: '0.2s' };
const cellInput = { width: '45px', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', color: 'white', textAlign: 'center', fontSize: '1.2rem', fontWeight: 800, outline: 'none' };
const headerLabel = { textAlign: 'center', padding: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 };
const sideLabel = { textAlign: 'right', padding: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 };
const sectionTitle = { fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px' };
const resItem = { padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-blue)' };
const mixedBox = { padding: '1.5rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '15px', border: '1px dashed rgba(59, 130, 246, 0.3)' };
const mathRow = { fontSize: '1.2rem', fontWeight: 800, color: '#60a5fa', marginBottom: '0.5rem' };
const mathDesc = { fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 };
const methodItem = { fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.8rem', lineHeight: 1.5 };

export default Solver;
