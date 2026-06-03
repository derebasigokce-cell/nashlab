import React, { useState, useEffect } from 'react';
import { GlassCard, PremiumButton } from '../components/UI';
import { Plus, Trash2, Save, Eye, Settings, Binary, FileText, HelpCircle, Sword, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const QuestionBuilder = ({ title: initialTitle, subtitle: initialSubtitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Detect Mode
  const isLessonMode = location.pathname.includes('lesson');
  const isQuizMode = location.pathname.includes('quiz');
  const isPracticeMode = location.pathname.includes('question') || !isLessonMode && !isQuizMode;

  const [qData, setQData] = useState({
    title: '',
    desc: '',
    question: '',
    difficulty: 'Orta',
    category: isLessonMode ? 'Kuramsal' : (isQuizMode ? 'Test' : 'Senaryo'),
    reward: '250 XP',
    matrix: [[[0,0],[0,0]], [[0,0],[0,0]]],
    explanation: '',
    options: [
      { id: 'a', text: '', correct: false },
      { id: 'b', text: '', correct: false },
      { id: 'c', text: '', correct: false },
      { id: 'd', text: '', correct: false }
    ],
    correctAnswer: '',
    teacherId: user?.email,
    id: Date.now()
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const updateOptionText = (id, text) => {
    const nextOptions = qData.options.map(opt => 
      opt.id === id ? { ...opt, text } : opt
    );
    setQData({ ...qData, options: nextOptions });
  };

  const selectCorrectAnswer = (val) => {
    const nextOptions = qData.options.map(opt => ({
      ...opt,
      correct: opt.id === val
    }));
    setQData({ ...qData, correctAnswer: val, options: nextOptions });
  };

  const calculateVisualData = (matrix) => {
    const brA = [];
    const brB = [];
    const nashCells = [];

    // Find Best Responses for Player A (rows)
    for (let c = 0; c < 2; c++) {
      const val0 = matrix[0][c][0];
      const val1 = matrix[1][c][0];
      if (val0 > val1) {
        brA.push([0, c]);
      } else if (val1 > val0) {
        brA.push([1, c]);
      } else {
        brA.push([0, c]);
        brA.push([1, c]);
      }
    }

    // Find Best Responses for Player B (columns)
    for (let r = 0; r < 2; r++) {
      const val0 = matrix[r][0][1];
      const val1 = matrix[r][1][1];
      if (val0 > val1) {
        brB.push([r, 0]);
      } else if (val1 > val0) {
        brB.push([r, 1]);
      } else {
        brB.push([r, 0]);
        brB.push([r, 1]);
      }
    }

    // Find Nash Equilibria
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 2; c++) {
        const isBrA = brA.some(cell => cell[0] === r && cell[1] === c);
        const isBrB = brB.some(cell => cell[0] === r && cell[1] === c);
        if (isBrA && isBrB) {
          nashCells.push([r, c]);
        }
      }
    }

    return {
      type: 'matrix',
      brA,
      brB,
      nashCells
    };
  };

  const handleSave = () => {
    if (!qData.title || !qData.desc) {
      alert('Lütfen başlık ve açıklama alanlarını doldurunuz.');
      return;
    }

    if (!isLessonMode) {
      if (!qData.question) {
        alert('Lütfen soru cümlesini giriniz.');
        return;
      }
      if (qData.options.some(opt => !opt.text.trim())) {
        alert('Lütfen tüm seçenekleri (A, B, C, D) doldurunuz.');
        return;
      }
      if (!qData.correctAnswer) {
        alert('Lütfen doğru seçeneği işaretleyiniz.');
        return;
      }
    }

    const storageKey = isLessonMode ? 'nashlab_custom_lessons' : 'nashlab_custom_questions';
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    const visualData = !isLessonMode ? calculateVisualData(qData.matrix) : null;

    const newContent = { 
      ...qData, 
      visualData,
      id: Date.now(),
      teacherId: user?.email,
      author: 'Öğretmen'
    };

    existing.push(newContent);
    localStorage.setItem(storageKey, JSON.stringify(existing));
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate(isLessonMode ? '/lessons' : '/practice');
    }, 2000);
  };

  const updateMatrix = (r, c, p, v) => {
    const next = [...qData.matrix.map(row => row.map(cell => [...cell]))];
    next[r][c][p] = parseInt(v) || 0;
    setQData({ ...qData, matrix: next });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isLessonMode ? <FileText color="var(--accent-blue)" /> : <Sword color="#10b981" />}
            {initialTitle || (isLessonMode ? 'Ders Oluşturucu' : 'Alıştırma Tasarımcısı')}
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>{initialSubtitle || 'Öğrencileriniz için akademik içerikler hazırlayın.'}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <PremiumButton variant="glass" icon={Eye}>Önizleme</PremiumButton>
          <PremiumButton icon={Save} onClick={handleSave}>İçeriği Yayınla</PremiumButton>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <GlassCard style={{ padding: '2rem' }}>
             <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>{isLessonMode ? 'Ders Başlığı' : 'Senaryo Başlığı'}</label>
                <input value={qData.title} onChange={(e) => setQData({...qData, title: e.target.value})} type="text" placeholder="Örn: Nash Dengesi ve Piyasa Analizi" style={inputStyle} />
             </div>
             
             <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>{isLessonMode ? 'Ders İçeriği / Özeti' : 'Senaryo Metni'}</label>
                <textarea value={qData.desc} onChange={(e) => setQData({...qData, desc: e.target.value})} rows="6" placeholder="Akademik içeriğinizi veya oyunun kurgusunu buraya yazın..." style={{ ...inputStyle, resize: 'vertical' }}></textarea>
             </div>

             {!isLessonMode && (
               <>
                 <div style={{ marginBottom: '1.5rem' }}>
                   <label style={labelStyle}>Soru Cümlesi</label>
                   <input 
                     value={qData.question} 
                     onChange={(e) => setQData({...qData, question: e.target.value})} 
                     type="text" 
                     placeholder="Örn: Bu oyunda saf strateji Nash dengesi hangisidir?" 
                     style={inputStyle} 
                   />
                 </div>

                 <div style={{ marginBottom: '1.5rem' }}>
                   <label style={labelStyle}>Payoff Matrix (Ödeme Matrisi)</label>
                   <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Sırasıyla Oyuncu A ve Oyuncu B'nin kazançlarını girin.</p>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'rgba(0,0,0,0.1)', padding: '1.5rem', borderRadius: '15px' }}>
                     {[0, 1].map(r => [0, 1].map(c => (
                       <div key={`${r}-${c}`} style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                          <div style={{ textAlign: 'center' }}>
                             <div style={pLabel}>A</div>
                             <input type="number" style={cellIn} value={qData.matrix[r][c][0]} onChange={(e) => updateMatrix(r, c, 0, e.target.value)} />
                          </div>
                          <div style={{ width: '1px', height: '20px', background: 'var(--glass-border)' }}></div>
                          <div style={{ textAlign: 'center' }}>
                             <div style={pLabel}>B</div>
                             <input type="number" style={cellIn} value={qData.matrix[r][c][1]} onChange={(e) => updateMatrix(r, c, 1, e.target.value)} />
                          </div>
                       </div>
                     )))}
                   </div>
                 </div>

                 <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>Soru Seçenekleri (A, B, C, D)</label>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Her bir şıkkın metnini girin ve yanındaki radyo butonunu kullanarak doğru cevabı işaretleyin.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {qData.options.map((opt) => (
                        <div key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '10px 15px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input 
                              type="radio" 
                              name="correctAnswer" 
                              checked={qData.correctAnswer === opt.id}
                              onChange={() => selectCorrectAnswer(opt.id)}
                              style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: 'var(--accent-blue)' }} 
                            />
                            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-secondary)' }}>{opt.id.toUpperCase()}</span>
                          </div>
                          <input 
                            type="text" 
                            placeholder={`${opt.id.toUpperCase()} şıkkının metnini yazın...`} 
                            value={opt.text} 
                            onChange={(e) => updateOptionText(opt.id, e.target.value)} 
                            style={{ ...inputStyle, padding: '0.5rem 0.75rem' }} 
                          />
                        </div>
                      ))}
                    </div>
                 </div>
               </>
             )}

             <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Öğretici Çözüm / Analiz</label>
                <textarea value={qData.explanation} onChange={(e) => setQData({...qData, explanation: e.target.value})} rows="4" placeholder="İçeriğin akademik açıklamasını ve çözüm analizini ekleyin..." style={{ ...inputStyle, resize: 'vertical' }}></textarea>
             </div>
          </GlassCard>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           <GlassCard style={{ padding: '1.5rem' }}>
              <h4 style={{ marginBottom: '1.5rem', fontWeight: 800, fontSize: '1rem' }}>Yayın Ayarları</h4>
              <div style={{ marginBottom: '1.25rem' }}>
                 <label style={labelStyle}>Zorluk Seviyesi</label>
                 <select style={inputStyle} value={qData.difficulty} onChange={(e) => setQData({...qData, difficulty: e.target.value})}>
                    <option>Başlangıç</option><option>Orta</option><option>İleri Seviye</option><option>Akademik</option>
                 </select>
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                 <label style={labelStyle}>Kategori</label>
                 <input type="text" style={inputStyle} value={qData.category} onChange={(e) => setQData({...qData, category: e.target.value})} />
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                 <label style={labelStyle}>Başarı Ödülü (XP)</label>
                 <input type="text" style={inputStyle} value={qData.reward} onChange={(e) => setQData({...qData, reward: e.target.value})} />
              </div>
           </GlassCard>

           <GlassCard style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981' }}>
                 <Binary size={18} /> LMS Doğrulama
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                 İçeriğiniz NashLab müfredatıyla uyumlu görünüyor. Kaydettiğinizde tüm öğrencileriniz bu içeriğe erişebilecek.
              </p>
           </GlassCard>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <div style={overlay}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
               <GlassCard style={{ padding: '3rem', textAlign: 'center', minWidth: '350px' }}>
                  <div style={checkCircle}>
                     <Plus size={40} color="#10b981" />
                  </div>
                  <h2 style={{ marginBottom: '1rem' }}>Başarıyla Yayınlandı!</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>İçerik NashLab müfredatına eklendi ve tüm öğrencilerin erişimine açıldı.</p>
                  <div style={{ color: 'var(--accent-blue)', fontSize: '0.8rem', fontWeight: 600 }}>Yönlendiriliyorsunuz...</div>
               </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' };
const inputStyle = { width: '100%', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '0.75rem 1rem', color: 'white', outline: 'none', fontSize: '0.9rem', transition: '0.2s' };
const cellIn = { width: '40px', background: 'transparent', border: 'none', borderBottom: '2px solid var(--glass-border)', color: 'white', textAlign: 'center', fontWeight: 800, fontSize: '1.1rem', outline: 'none' };
const pLabel = { fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 800, marginBottom: '2px' };
const overlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const checkCircle = { width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', border: '2px solid #10b981' };

export default QuestionBuilder;
