import React, { useState, useEffect } from 'react';
import { GlassCard, PremiumButton, ProgressIndicator } from '../components/UI';
import { 
  Sword, Brain, Zap, Target, HelpCircle, 
  ChevronRight, Eye, CheckCircle, XCircle, 
  ArrowRight, Award, TrendingUp, Info, List, User,
  BookOpen, Users, AlertTriangle, Compass, CheckSquare, BarChart, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { academicScenarios } from '../data/scenarios';
import { AcademicVisualizer } from '../components/UI/AcademicVisualizer';

const CATEGORIES = {
  all: 'Tüm Müfredat',
  staticGames: 'Statik Oyunlar',
  nashEquilibrium: 'Nash Dengesi',
  mixedStrategies: 'Karma Stratejiler',
  industrialOrganization: 'Endüstriyel Organizasyon',
  dynamicGames: 'Dinamik Oyunlar',
  publicEconomics: 'Kamu Ekonomisi ve Politika'
};

const Practice = () => {
  const { user, updateProgression } = useAuth();
  const [selectedId, setSelectedId] = useState(() => localStorage.getItem('nashlab_current_scenario_id') || null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [answer, setAnswer] = useState(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [scenarios, setScenarios] = useState(academicScenarios);
  
  // Solution Tabs state (1 to 7)
  const [activeSolutionTab, setActiveSolutionTab] = useState('interpretation');

  useEffect(() => {
    if (selectedId) {
      localStorage.setItem('nashlab_current_scenario_id', selectedId);
    } else {
      localStorage.removeItem('nashlab_current_scenario_id');
    }
  }, [selectedId]);

  useEffect(() => {
    // Load Teacher Created Content
    const customScenarios = JSON.parse(localStorage.getItem('nashlab_custom_questions') || '[]');
    const merged = [...academicScenarios, ...customScenarios.map(s => ({
      ...s,
      authorId: s.teacherId,
      author: 'Öğretmen',
      // Map custom teacher questions safely
      matrix: s.matrix || [[[0,0],[0,0]],[[0,0],[0,0]]],
      question: s.question || 'Bu oyunda Nash dengesi ve rasyonel davranışlar nedir?',
      options: s.options || [
        { id: 'a', text: 'Strateji A (İşbirliği)', correct: s.correctAnswer === 'a' },
        { id: 'b', text: 'Strateji B (Rekabet)', correct: s.correctAnswer === 'b' },
        { id: 'c', text: 'Strateji C (Farklılaşma)', correct: s.correctAnswer === 'c' },
        { id: 'd', text: 'Strateji D (Sapma)', correct: s.correctAnswer === 'd' }
      ],
      academicSolution: {
        interpretation: s.explanation || s.desc,
        players: 'Eğitmen tarafından belirtilen iki oyuncu.',
        dominant: 'Bu özel soru için dominant stratejileri kendiniz analiz ediniz.',
        bestResponse: 'En iyi tepkiler matris verilerinden bulunabilir.',
        nash: s.explanation || 'Analiz sonucu denge tespit edilmiştir.',
        pareto: 'Sosyal optimum ile Nash kıyaslaması.',
        economicComment: 'İlgili durumun sektörel/ekonomik yansıması.'
      },
      visualData: s.visualData || {
        type: 'matrix',
        brA: [[0, 0]],
        brB: [[0, 0]],
        nashCells: [[0, 0]]
      }
    }))];
    setScenarios(merged);
  }, []);

  const current = scenarios.find(s => s.id === selectedId);

  const filteredScenarios = activeCategory === 'all' 
    ? scenarios 
    : scenarios.filter(s => s.category === activeCategory);

  const handleEvaluate = () => {
    if (!answer) return;
    setIsEvaluated(true);
    setShowSolution(true); // Automatically open solution
    if (answer.correct) {
      updateProgression(parseInt(current.reward) || 200, null, current.id, current.category || 'staticGames');
    }
  };

  const handleNext = () => {
    const idx = scenarios.findIndex(s => s.id === selectedId);
    if (idx < scenarios.length - 1) {
      resetState();
      setSelectedId(scenarios[idx + 1].id);
    } else {
      setSelectedId(null);
      resetState();
    }
  };

  const resetState = () => {
    setAnswer(null);
    setIsEvaluated(false);
    setShowSolution(false);
    setActiveSolutionTab('interpretation');
  };

  const onOptionClick = (opt) => {
    if (isEvaluated) return;
    setAnswer(opt);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="practice-academic" style={{ paddingBottom: '4rem' }}>
      <AnimatePresence mode="wait">
        {!selectedId ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}>
            {/* Header Area */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 800 }}>NashLab Akademi Çalışma Odası</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Üniversite müfredatına uygun seviyelerde Oyun Teorisi teorisini ve matematiksel uygulamalarını interaktif senaryolarla kavrayın.</p>
            </div>

            {/* Category Navigation Bar */}
            <div style={categoryBar}>
              {Object.keys(CATEGORIES).map(catKey => (
                <button
                  key={catKey}
                  onClick={() => setActiveCategory(catKey)}
                  style={{
                    ...categoryTab,
                    background: activeCategory === catKey ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                    color: activeCategory === catKey ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    borderColor: activeCategory === catKey ? 'var(--accent-blue)' : 'transparent'
                  }}
                >
                  {CATEGORIES[catKey]}
                </button>
              ))}
            </div>

            {/* Main Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
              {/* Question list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {filteredScenarios.length > 0 ? (
                  filteredScenarios.map((s) => (
                    <GlassCard 
                      key={s.id} 
                      style={{ 
                        padding: '1.5rem', 
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        border: user?.completedScenarios?.includes(s.id) ? '1px solid #10b981' : '1px solid var(--glass-border)' 
                      }}
                      onClick={() => setSelectedId(s.id)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '1.25rem' }}>
                          <div style={iconBox}>
                            {user?.completedScenarios?.includes(s.id) ? (
                              <CheckCircle color="#10b981" />
                            ) : s.author === 'Öğretmen' ? (
                              <User color="#10b981" />
                            ) : (
                              <Brain color="var(--accent-blue)" />
                            )}
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{s.title}</h3>
                              {s.author === 'Öğretmen' && <span style={teacherBadge}>Eğitmen İçeriği</span>}
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0.5rem 0', lineClamp: '1', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {s.desc}
                            </p>
                            <div style={badgeRow}>
                              <span style={categoryTag}>{CATEGORIES[s.category] || s.category}</span>
                              <span style={diffTag}>{s.difficulty}</span>
                              <span style={xpTag}>{s.reward} XP</span>
                              {user?.completedScenarios?.includes(s.id) && <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓ Çözüldü</span>}
                            </div>
                          </div>
                        </div>
                        <PremiumButton size="small">Analize Başla</PremiumButton>
                      </div>
                    </GlassCard>
                  ))
                ) : (
                  <GlassCard style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>Bu kategoride henüz yayınlanmış bir akademik senaryo bulunmamaktadır.</p>
                  </GlassCard>
                )}
              </div>

              {/* Stats & Progress Sidebar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <GlassCard style={{ padding: '1.5rem' }}>
                   <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                      <Award size={48} color="#fbbf24" style={{ marginBottom: '0.5rem' }} />
                      <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>Seviye {user?.level || 1}</div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Toplam Başarı: {user?.xp || 0} XP</p>
                   </div>
                   <ProgressIndicator label="Sonraki Seviye İlerlemesi" value={(user?.xp % 100)} />
                </GlassCard>

                <GlassCard style={{ padding: '1.5rem' }}>
                   <h4 style={{ marginBottom: '1rem', fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Ders Yetkinlik Endeksi</h4>
                   <SkillStat label="Statik Oyunlar" value={user?.stats?.staticGames || 0} />
                   <SkillStat label="Karma Stratejiler" value={user?.stats?.mixedStrategies || 0} />
                   <SkillStat label="Dinamik Oyunlar" value={user?.stats?.dynamicGames || 0} />
                   <SkillStat label="Endüstriyel Organizasyon" value={user?.stats?.industrialOrganization || 0} />
                   <SkillStat label="Kamu Ekonomisi" value={user?.stats?.publicEconomics || 0} />
                </GlassCard>

                <GlassCard style={{ padding: '1.5rem' }}>
                  <h4 style={{ marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: 700 }}><Info size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Çalışma Tavsiyesi</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Nash dengesi analizi yaparken her zaman **"Best Response" (En İyi Tepki)** işaretleme metodunu kullanın. Karşılıklı en iyi tepkilerin çakıştığı hücreler, oyunun saf strateji dengeleridir.
                  </p>
                </GlassCard>
              </div>
            </div>
          </motion.div>
        ) : (
          current && (
            <motion.div key="game" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
               {/* Back navigation */}
               <button onClick={() => setSelectedId(null)} style={backLink}>
                 <ArrowRight size={16} style={{ transform: 'rotate(180deg)', marginRight: '6px' }} /> 
                 Akademi Müfredatına Dön
               </button>
               
               {/* Detail Grid */}
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
                  <div>
                     {/* Question area */}
                     <GlassCard style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                           <span style={catBadge}>{CATEGORIES[current.category] || 'Senaryo'}</span>
                           <span style={diffBadge}>{current.difficulty}</span>
                           {current.author === 'Öğretmen' && <span style={teacherBadgeSmall}>Eğitmen İçeriği</span>}
                        </div>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 800 }}>{current.title}</h2>
                        <p style={problemText}>{current.desc}</p>

                        {/* Embed the Dynamic Academic Visualizer */}
                        {current.visualData && (
                          <div style={{ margin: '1.5rem 0' }}>
                            <AcademicVisualizer 
                              scenario={current} 
                              isRevealed={isEvaluated || showSolution} 
                              userAnswer={answer} 
                            />
                          </div>
                        )}

                        <div style={questionHeader}>
                           <HelpCircle size={22} color="var(--accent-blue)" />
                           <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>{current.question}</h4>
                        </div>

                        {/* Options */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                           {current.options.map(opt => {
                              const isSelected = answer?.id === opt.id;
                              const isCorrect = opt.correct;
                              let btnBorderColor = 'var(--glass-border)';
                              let btnBackground = 'rgba(255,255,255,0.02)';
                              let btnOpacity = 1;
                              let circleBorderColor = 'rgba(255,255,255,0.2)';
                              let circleTextColor = 'white';

                              if (!isEvaluated) {
                                btnBorderColor = isSelected ? 'var(--accent-blue)' : 'var(--glass-border)';
                                btnBackground = isSelected ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255,255,255,0.02)';
                                circleBorderColor = isSelected ? 'var(--accent-blue)' : 'rgba(255,255,255,0.2)';
                                circleTextColor = isSelected ? 'var(--accent-blue)' : 'white';
                              } else {
                                if (isSelected) {
                                  if (isCorrect) {
                                    btnBorderColor = '#10b981';
                                    btnBackground = 'rgba(16, 185, 129, 0.12)';
                                    circleBorderColor = '#10b981';
                                    circleTextColor = '#10b981';
                                  } else {
                                    btnBorderColor = '#ef4444';
                                    btnBackground = 'rgba(239, 68, 68, 0.12)';
                                    circleBorderColor = '#ef4444';
                                    circleTextColor = '#ef4444';
                                  }
                                } else {
                                  if (isCorrect) {
                                    btnBorderColor = '#10b981';
                                    btnBackground = 'rgba(16, 185, 129, 0.05)';
                                    circleBorderColor = '#10b981';
                                    circleTextColor = '#10b981';
                                  } else {
                                    btnBorderColor = 'var(--glass-border)';
                                    btnBackground = 'rgba(255,255,255,0.01)';
                                    btnOpacity = 0.5;
                                    circleBorderColor = 'rgba(255,255,255,0.1)';
                                    circleTextColor = 'var(--text-muted)';
                                  }
                                }
                              }

                              return (
                                <button 
                                  key={opt.id}
                                  onClick={(e) => { e.preventDefault(); onOptionClick(opt); }}
                                  style={{ 
                                    ...optionBtn, 
                                    borderColor: btnBorderColor,
                                    background: btnBackground,
                                    opacity: btnOpacity,
                                    cursor: isEvaluated ? 'default' : 'pointer'
                                  }}
                                >
                                   <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                      <div style={{ 
                                         width: '28px', height: '28px', borderRadius: '50%', border: '2px solid',
                                         borderColor: circleBorderColor,
                                         color: circleTextColor,
                                         display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700
                                      }}>
                                         {opt.id.toUpperCase()}
                                      </div>
                                      <span style={{ fontSize: '0.95rem', color: isEvaluated && isCorrect ? '#10b981' : 'white' }}>{opt.text}</span>
                                   </div>
                                </button>
                              );
                           })}
                        </div>

                        {/* Action buttons */}
                        {!isEvaluated ? (
                          <PremiumButton 
                            disabled={!answer}
                            onClick={handleEvaluate}
                            style={{ width: '100%', justifyContent: 'center', marginTop: '2rem', height: '50px' }}
                          >
                             Stratejik Analizi Değerlendir
                          </PremiumButton>
                        ) : (
                          <div style={{ marginTop: '2rem' }}>
                             {answer.correct ? (
                                <div style={successBox}>
                                   <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                                      <CheckCircle color="#10b981" /> Doğru Analiz
                                   </h4>
                                   <p style={{ fontSize: '0.9rem' }}>Harika! Oyun dengesini ve rasyonel oyuncu davranışlarını kusursuz şekilde tespit ettiniz.</p>
                                   <div style={{ marginTop: '0.75rem', fontWeight: 800, color: '#fbbf24', fontSize: '1.1rem' }}>+{current.reward} XP Akademik Puan</div>
                                </div>
                             ) : (
                                <div style={errorBox}>
                                   <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                                      <XCircle color="#ef4444" /> Hatalı Analiz
                                   </h4>
                                   <p style={{ fontSize: '0.9rem' }}>Belirttiğiniz strateji dengesi, rasyonel kararlarla veya Nash en iyi tepki kesişimiyle örtüşmemektedir.</p>
                                </div>
                             )}
                             <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                <PremiumButton variant="glass" style={{ flex: 1 }} onClick={() => setShowSolution(!showSolution)} icon={Eye}>
                                  {showSolution ? 'Çözüm Rehberini Gizle' : '7 Aşamalı Çözüm Rehberi'}
                                </PremiumButton>
                                <PremiumButton style={{ flex: 1 }} onClick={handleNext} icon={ChevronRight}>Sıradaki Akademik Konu</PremiumButton>
                             </div>
                          </div>
                        )}
                     </GlassCard>

                     {/* 7-STEP RIGOROUS ACADEMIC SOLUTION SUITE */}
                     <AnimatePresence>
                      {showSolution && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0 }}>
                           <GlassCard style={{ padding: '2rem', marginTop: '1rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
                                <BookOpen size={24} color="var(--accent-blue)" />
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Üniversite Düzeyi Akademik Çözüm Rehberi</h3>
                              </div>

                              {/* Solution Tabs */}
                              <div style={solutionTabBar}>
                                <button onClick={() => setActiveSolutionTab('interpretation')} style={{...solutionTabButton, borderColor: activeSolutionTab === 'interpretation' ? 'var(--accent-blue)' : 'transparent', color: activeSolutionTab === 'interpretation' ? 'white' : 'var(--text-secondary)'}}>
                                  <Compass size={14} /> 1. Yorum
                                </button>
                                <button onClick={() => setActiveSolutionTab('players')} style={{...solutionTabButton, borderColor: activeSolutionTab === 'players' ? 'var(--accent-blue)' : 'transparent', color: activeSolutionTab === 'players' ? 'white' : 'var(--text-secondary)'}}>
                                  <Users size={14} /> 2. Aktörler
                                </button>
                                <button onClick={() => setActiveSolutionTab('dominant')} style={{...solutionTabButton, borderColor: activeSolutionTab === 'dominant' ? 'var(--accent-blue)' : 'transparent', color: activeSolutionTab === 'dominant' ? 'white' : 'var(--text-secondary)'}}>
                                  <Zap size={14} /> 3. Dominantlık
                                </button>
                                <button onClick={() => setActiveSolutionTab('bestResponse')} style={{...solutionTabButton, borderColor: activeSolutionTab === 'bestResponse' ? 'var(--accent-blue)' : 'transparent', color: activeSolutionTab === 'bestResponse' ? 'white' : 'var(--text-secondary)'}}>
                                  <Target size={14} /> 4. En İyi Tepki
                                </button>
                                <button onClick={() => setActiveSolutionTab('nash')} style={{...solutionTabButton, borderColor: activeSolutionTab === 'nash' ? 'var(--accent-blue)' : 'transparent', color: activeSolutionTab === 'nash' ? 'white' : 'var(--text-secondary)'}}>
                                  <Award size={14} /> 5. Nash Dengesi
                                </button>
                                <button onClick={() => setActiveSolutionTab('pareto')} style={{...solutionTabButton, borderColor: activeSolutionTab === 'pareto' ? 'var(--accent-blue)' : 'transparent', color: activeSolutionTab === 'pareto' ? 'white' : 'var(--text-secondary)'}}>
                                  <BarChart size={14} /> 6. Pareto Verimlilik
                                </button>
                                <button onClick={() => setActiveSolutionTab('economicComment')} style={{...solutionTabButton, borderColor: activeSolutionTab === 'economicComment' ? 'var(--accent-blue)' : 'transparent', color: activeSolutionTab === 'economicComment' ? 'white' : 'var(--text-secondary)'}}>
                                  <Globe size={14} /> 7. Ekonomik Çıkarım
                                </button>
                              </div>

                              {/* Tab Content */}
                              <div style={tabContentContainer}>
                                {activeSolutionTab === 'interpretation' && (
                                  <SolutionBlock 
                                    title="Problemin Stratejik ve Ekonomik Yorumu" 
                                    text={current.academicSolution.interpretation || 'Bu oyunun temel amacı oyuncuların bencil çıkarları ile kolektif ortak fayda arasındaki gerilimi analiz etmektir.'} 
                                    tip="Ekonomik aktörlerin stratejik hedefleri ve oyunun temel hikayesi bu aşamada özetlenmektedir."
                                  />
                                )}
                                {activeSolutionTab === 'players' && (
                                  <SolutionBlock 
                                    title="Oyuncular, Eylemler ve Kısıtlar" 
                                    text={current.academicSolution.players || 'Oyunda karar alıcı olan iki simetrik firma veya kurum yer almaktadır.'} 
                                    tip="Oyuncuların eylem uzayları (action space) ve ödeme fonksiyonlarının genel mantığı."
                                  />
                                )}
                                {activeSolutionTab === 'dominant' && (
                                  <SolutionBlock 
                                    title="Dominant (Baskın) Strateji Analizi" 
                                    text={current.academicSolution.dominant || 'Dominant strateji, karşı tarafın ne yaptığından tamamen bağımsız olarak daima en yüksek getiriyi sağlayan stratejidir.'} 
                                    tip="Dominant stratejiler belirlenerek oyun 'iteratif dominant strateji elemesi' ile sadeleştirilebilir."
                                  />
                                )}
                                {activeSolutionTab === 'bestResponse' && (
                                  <SolutionBlock 
                                    title="Best Response (En İyi Tepki) Analizi ve Koşulları" 
                                    text={current.academicSolution.bestResponse || 'Oyuncu A\'nın her bir hamlesine karşılık Oyuncu B\'nin getirisini maksimize eden seçimler işaretlenmiştir.'} 
                                    tip="Karşılıklı en iyi tepki (Best Response) fonksiyonlarının kesişimi Nash dengesini bulmamızı sağlar."
                                  />
                                )}
                                {activeSolutionTab === 'nash' && (
                                  <SolutionBlock 
                                    title="Nash Dengesi Türetilişi" 
                                    text={current.academicSolution.nash || 'Oyunun Nash dengesi karşılıklı en iyi tepkilerin kesiştiği kararlı hücredir.'} 
                                    tip="Hiçbir oyuncunun tek taraflı olarak strateji değiştirmek (sapmak) için bir teşvikinin olmadığı kararlı denge durumudur."
                                  />
                                )}
                                {activeSolutionTab === 'pareto' && (
                                  <SolutionBlock 
                                    title="Pareto Verimlilik ve Sosyal Optimum Kıyaslaması" 
                                    text={current.academicSolution.pareto || 'Nash dengesinin toplumsal toplam faydayı maksimize edip etmediği bu başlık altında sorgulanır.'} 
                                    tip="Pareto etkinsizlik, oyuncuların birbirine zarar vermeden durumlarını iyileştirebileceği ortak bir alternatifin varlığını gösterir."
                                  />
                                )}
                                {activeSolutionTab === 'economicComment' && (
                                  <SolutionBlock 
                                    title="Ekonomik Çıkarım ve Politika Önerileri" 
                                    text={current.academicSolution.economicComment || 'Denge sonucunun serbest piyasa ve kamu yönetimi üzerindeki reel yansımaları.'} 
                                    tip="Regülatörlerin veya piyasa yapıcılarının bu verimsiz dengeleri kırmak için uygulayabileceği ceza, vergi veya teşvik mekanizmaları."
                                  />
                                )}
                              </div>
                           </GlassCard>
                        </motion.div>
                      )}
                     </AnimatePresence>
                  </div>

                  {/* Sidebar Tip & Terminology */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                     <GlassCard style={{ padding: '1.5rem' }}>
                        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                          <Info size={18} color="var(--accent-blue)" /> Akademik Not
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                           {current.author === 'Öğretmen' 
                             ? 'Eğitmeniniz bu soruyu hazırlarken gerçek hayat senaryolarından esinlendi. Rasyonelliğe ve karşılıklı bağımlılığa odaklanın.' 
                             : 'Alt Oyun Kusursuz Dengesi (Subgame Perfect Equilibrium), ardışık oyunlarda inandırıcı olmayan tehditleri ayıklayarak ulaştığımız nihai dengedir.'}
                        </p>
                     </GlassCard>

                     <GlassCard style={{ padding: '1.5rem' }}>
                       <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 700 }}><List size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Terimler Sözlüğü</h4>
                       <div style={termBox}>
                         <strong>Nash Dengesi:</strong> Diğer oyuncuların stratejileri sabitken, hiçbir oyuncunun tek taraflı sapma teşvikinin olmadığı durum.
                       </div>
                       <div style={termBox}>
                         <strong>Pareto Etkinlik:</strong> Kimsenin durumunu kötüleştirmeden en az bir kişinin durumunu iyileştirmenin imkansız olduğu refah durumu.
                       </div>
                       <div style={termBox}>
                         <strong>SPE (Kusursuz Denge):</strong> Ardışık oyunun her bir alt oyununda (subgame) bir Nash Dengesi olan stratejiler seti.
                       </div>
                     </GlassCard>
                  </div>
               </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SkillStat = ({ label, value }) => (
  <div style={{ marginBottom: '1rem' }}>
     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
        <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{value} Çözüldü</span>
     </div>
     <div style={{ height: '5px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ width: `${Math.min(value * 20, 100)}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))', borderRadius: '3px' }}></div>
     </div>
  </div>
);

const SolutionBlock = ({ title, text, tip }) => (
  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
    <h5 style={{ color: 'white', fontSize: '1.05rem', marginBottom: '0.75rem', fontWeight: 700 }}>{title}</h5>
    
    {/* Format text linebreaks nicely */}
    <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
      {text}
    </div>

    {tip && (
      <div style={solutionTipBox}>
        <AlertTriangle size={16} color="#fbbf24" style={{ flexShrink: 0, marginTop: '2px' }} />
        <span style={{ fontSize: '0.8rem', color: '#fbbf24', lineHeight: 1.5 }}>
          <strong>Akademik İpucu:</strong> {tip}
        </span>
      </div>
    )}
  </motion.div>
);

// CSS-in-JS Styles for Practice Page
const categoryBar = {
  display: 'flex',
  gap: '0.5rem',
  overflowX: 'auto',
  paddingBottom: '0.75rem',
  marginBottom: '2rem',
  borderBottom: '1px solid rgba(255,255,255,0.05)',
  scrollbarWidth: 'thin'
};

const categoryTab = {
  padding: '0.6rem 1.25rem',
  borderRadius: '50px',
  fontSize: '0.85rem',
  fontWeight: 600,
  border: '1px solid transparent',
  transition: 'all 0.2s',
  whiteSpace: 'nowrap',
  cursor: 'pointer'
};

const iconBox = { 
  width: '50px', 
  height: '50px', 
  borderRadius: '14px', 
  background: 'rgba(255,255,255,0.02)', 
  border: '1px solid var(--glass-border)',
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center' 
};

const badgeRow = { display: 'flex', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700, marginTop: '0.5rem', flexWrap: 'wrap' };
const categoryTag = { padding: '3px 8px', background: 'rgba(59, 130, 246, 0.08)', color: 'var(--accent-blue)', borderRadius: '4px' };
const diffTag = { padding: '3px 8px', background: 'rgba(245, 158, 11, 0.08)', color: '#fbbf24', borderRadius: '4px' };
const xpTag = { padding: '3px 8px', background: 'rgba(16, 185, 129, 0.08)', color: '#10b981', borderRadius: '4px' };

const teacherBadge = { padding: '2px 8px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700, marginLeft: '0.5rem' };
const teacherBadgeSmall = { padding: '4px 10px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700 };

const backLink = { background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', fontSize: '0.9rem', fontWeight: 600, transition: 'color 0.2s' };
const catBadge = { padding: '4px 10px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700 };
const diffBadge = { padding: '4px 10px', background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700 };
const problemText = { fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' };
const questionHeader = { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', padding: '1.25rem', background: 'rgba(59, 130, 246, 0.05)', borderLeft: '3px solid var(--accent-blue)', borderRadius: '0 8px 8px 0' };
const optionBtn = { width: '100%', padding: '1.25rem', border: '1px solid', borderRadius: '12px', textAlign: 'left', color: 'white', transition: 'all 0.2s', fontSize: '1rem', pointerEvents: 'auto' };

const successBox = { padding: '1.5rem', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid #10b981', borderRadius: '12px' };
const errorBox = { padding: '1.5rem', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid #ef4444', borderRadius: '12px' };

// Solution tabs styles
const solutionTabBar = {
  display: 'flex',
  gap: '0.25rem',
  overflowX: 'auto',
  paddingBottom: '0.5rem',
  marginBottom: '1.5rem',
  borderBottom: '1px solid rgba(255,255,255,0.05)'
};

const solutionTabButton = {
  padding: '0.5rem 0.75rem',
  fontSize: '0.8rem',
  fontWeight: 700,
  borderBottom: '2px solid transparent',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  whiteSpace: 'nowrap'
};

const tabContentContainer = {
  padding: '1rem',
  background: 'rgba(0,0,0,0.15)',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.03)'
};

const solutionTipBox = {
  marginTop: '1.25rem',
  padding: '0.75rem 1rem',
  background: 'rgba(245, 158, 11, 0.04)',
  border: '1px solid rgba(245, 158, 11, 0.2)',
  borderRadius: '8px',
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'flex-start'
};

const termBox = {
  fontSize: '0.8rem',
  color: 'var(--text-secondary)',
  padding: '0.5rem 0',
  borderBottom: '1px solid rgba(255,255,255,0.03)',
  lineHeight: 1.5
};

export default Practice;
