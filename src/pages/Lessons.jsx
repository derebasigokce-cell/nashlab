import React, { useState, useEffect } from 'react';
import { GlassCard, PremiumButton, ProgressIndicator, Matrix } from '../components/UI';
import { 
  Play, CheckCircle, Lock, Clock, BookOpen, Star, 
  ChevronLeft, ArrowRight, Brain, Calculator, TrendingUp, Info, List, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const academicLessons = [
  { 
    id: 'nash_equilibrium', 
    title: 'Nash Dengesi ve Best Response', 
    desc: 'Oyun teorisinin kalbi. Statik oyunlarda rasyonel seçimlerin kesişim noktası.',
    category: 'Statik Oyunlar',
    depth: 'Temel Kuram',
    duration: '35 dk',
    content: {
      intro: 'Nash dengesi, hiçbir oyuncunun diğer oyuncuların stratejileri sabitken tek başına strateji değiştirerek kazancını artıramayacağı bir durumdur.',
      theory: 'Strateji profili (s1*, s2*, ..., sn*) bir Nash dengesidir ancak ve ancak her i için si*, diğer oyuncuların s-i* stratejilerine en iyi tepki (Best Response) ise.',
      math: 'ui(si*, s-i*) ≥ ui(si, s-i*) ∀ si ∈ Si',
      example: 'Reklam savaşları, fiyat rekabeti ve Mahkumlar Açmazı bu modelin en klasik uygulama alanlarıdır.',
      sections: [
        { title: 'Best Response Analizi', text: 'Matris üzerinde her satır ve sütun için ödemeleri karşılaştırarak BR işaretlemesi yapmayı öğrenin.' },
        { title: 'Dominant Strateji Eleme', text: 'Kesin olarak domine edilen stratejileri eleyerek oyunu basitleştirme süreci (IDRDS).' }
      ]
    }
  },
  { 
    id: 'mixed_strategies', 
    title: 'Karma Stratejiler ve Beklenen Fayda', 
    desc: 'Olasılıksal hamleler ile rakipan tahmin edilebilirliğini kırma stratejileri.',
    category: 'İleri Teori',
    depth: 'Matematiksel Analiz',
    duration: '50 dk',
    content: {
      intro: 'Her oyunda saf strateji Nash dengesi yoktur. Bu durumlarda oyuncular hamlelerini rastgeleleştirirler.',
      theory: 'Kritik değerleri bulmak için bir oyuncunun stratejisi, diğer oyuncunun her iki hamlesinden de aynı beklenen faydayı (Expected Utility) alacak şekilde seçilmelidir.',
      math: 'E(u)_A = p * [q*u(1,1) + (1-q)*u(1,2)] + (1-p) * [q*u(2,1) + (1-q)*u(2,2)]',
      example: 'Yazı-Tura eşleme, denetleme oyunları ve spor müsabakalarındaki penaltı vuruşları.',
      sections: [
        { title: 'p ve q Hesaplama', text: 'Olasılık değişkenleri atayarak beklenen fayda denklemlerini çözme yöntemleri.' },
        { title: 'Grafiksel Çözüm', text: '2x2 oyunlarda beklenen fayda doğrularının kesişim noktasını görselleştirme.' }
      ]
    }
  },
  { 
    id: 'dynamic_games', 
    title: 'Dinamik Oyunlar ve SPE', 
    desc: 'Ardışık hamleler, oyun ağaçları ve geriye doğru tümevarım prensipleri.',
    category: 'Ardışık Oyunlar',
    depth: 'Stratejik Planlama',
    duration: '45 dk',
    content: {
      intro: 'Oyuncuların hamlelerini sırayla yaptığı, bilgilerin paylaşıldığı veya gizlendiği geniş formlu oyunlar.',
      theory: 'Alt Oyun Kusursuz Dengesi (Subgame Perfect Equilibrium), oyunun her bir alt bölümünde rasyonel davranışı zorunlu kılar.',
      math: 'V(h) = max a∈A(h) V(h, a)',
      example: 'Pazara giriş engelleme, taahhüt problemleri ve uzun dönemli müzakereler.',
      sections: [
        { title: 'Backward Induction', text: 'Oyun ağacının sonundan başlayarak geriye doğru rasyonel hamleleri işaretleme.' },
        { title: 'Incredible Threats', text: 'İnandırıcı olmayan tehditlerin elenmesi ve stratejik taahhüt (commitment).' }
      ]
    }
  }
];

const Lessons = () => {
  const { user, updateProgression } = useAuth();
  const [selectedId, setSelectedId] = useState(() => localStorage.getItem('nashlab_current_lesson_id') || null);
  const [lessons, setLessons] = useState(academicLessons);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedId) {
      localStorage.setItem('nashlab_current_lesson_id', selectedId);
    } else {
      localStorage.removeItem('nashlab_current_lesson_id');
    }
  }, [selectedId]);

  useEffect(() => {
    // Load Teacher Content
    const customDocs = JSON.parse(localStorage.getItem('nashlab_custom_lessons') || '[]');
    const merged = [...academicLessons, ...customDocs.map(d => ({
      ...d,
      author: 'Öğretmen',
      duration: '40 dk',
      depth: 'Öğretmen İçeriği',
      content: d.content || {
        intro: d.desc,
        theory: 'Bu ders içeriği eğitmeniniz tarafından hazırlanmıştır.',
        math: 'Analiz Modeli: ' + (d.title || 'Oyun Teorisi'),
        example: 'Eğitmeninizden detaylı bilgi isteyiniz.',
        sections: [{ title: 'Ders Özeti', text: d.desc }]
      }
    }))];
    setLessons(merged);
  }, []);

  const selected = lessons.find(l => l.id === selectedId);

  const handleComplete = () => {
    updateProgression(150, selected.id, null, 'staticGames');
    setSelectedId(null);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lessons-academic">
      <AnimatePresence mode="wait">
        {!selectedId ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Akademik Müfredat</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Teorik derinlikte oyun teorisi eğitimi ve modelleme yöntemleri.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {lessons.map((lesson) => (
                <GlassCard 
                  key={lesson.id} 
                  style={{ 
                    padding: '1.75rem', 
                    cursor: 'pointer',
                    border: user?.completedLessons?.includes(lesson.id) ? '1px solid #10b981' : '1px solid var(--glass-border)' 
                  }}
                  onClick={() => setSelectedId(lesson.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                       <span style={catBadge}>{lesson.category}</span>
                       {lesson.author === 'Öğretmen' && <span style={teacherBadgeTag}>Öğretmen</span>}
                    </div>
                    <span style={timeText}><Clock size={14} /> {lesson.duration}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{lesson.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{lesson.desc}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                     <Brain size={18} color="var(--accent-blue)" />
                     <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{lesson.depth}</span>
                  </div>

                  <PremiumButton 
                    style={{ width: '100%', justifyContent: 'center' }} 
                    icon={user?.completedLessons?.includes(lesson.id) ? CheckCircle : Play}
                    variant={user?.completedLessons?.includes(lesson.id) ? 'glass' : 'primary'}
                  >
                    {user?.completedLessons?.includes(lesson.id) ? 'Tekrar İncele' : 'Modüle Başla'}
                  </PremiumButton>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        ) : (
          selected && (
            <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <button onClick={() => setSelectedId(null)} style={backBtn}><ChevronLeft size={18} /> Müfredata Dön</button>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <GlassCard style={{ padding: '2.5rem' }}>
                       <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                          <span style={catBadge}>{selected.category}</span>
                          <span style={depthBadge}>{selected.depth}</span>
                          {selected.author === 'Öğretmen' && <span style={teacherBadgeTag}>Eğitmen İçeriği</span>}
                       </div>
                       <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{selected.title}</h2>
                       
                       <section style={contentSection}>
                          <h4 style={sectionHeader}>1. Giriş ve Kuramsal Temeller</h4>
                          <p style={mainText}>{selected.content?.intro}</p>
                       </section>

                       <section style={contentSection}>
                          <h4 style={sectionHeader}>2. Matematiksel Model</h4>
                          <div style={mathBox}>
                             <code>{selected.content?.math}</code>
                          </div>
                          <p style={mainText}>{selected.content?.theory}</p>
                       </section>

                       <section style={contentSection}>
                          <h4 style={sectionHeader}>3. Örnek Analiz</h4>
                          <p style={mainText}>{selected.content?.example}</p>
                       </section>

                       <div style={{ marginTop: '3rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem', display: 'flex', gap: '1rem' }}>
                          <PremiumButton icon={CheckCircle} onClick={handleComplete}>Modülü Tamamla</PremiumButton>
                          <PremiumButton variant="glass" icon={ArrowRight} onClick={() => navigate('/practice')}>Pratiğe Dönüştür</PremiumButton>
                       </div>
                    </GlassCard>
                 </div>

                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <GlassCard style={{ padding: '1.5rem' }}>
                       <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <List size={18} color="var(--accent-blue)" /> Önemli Konseptler
                       </h4>
                       {selected.content?.sections?.map((section, i) => (
                          <div key={i} style={subSection}>
                             <h5 style={{ fontSize: '0.9rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{section.title}</h5>
                             <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{section.text}</p>
                          </div>
                       ))}
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

const catBadge = { padding: '4px 12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700 };
const depthBadge = { padding: '4px 12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700 };
const teacherBadgeTag = { padding: '4px 12px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700 };
const timeText = { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: 'var(--text-muted)' };
const backBtn = { background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' };
const contentSection = { marginBottom: '2.5rem' };
const sectionHeader = { fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-blue)' };
const mainText = { fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 };
const mathBox = { padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', margin: '1rem 0', fontFamily: 'monospace', color: '#60a5fa', fontSize: '1rem', overflowX: 'auto' };
const subSection = { marginBottom: '1.25rem', paddingLeft: '1rem', borderLeft: '2px solid rgba(59, 130, 246, 0.3)' };

export default Lessons;
