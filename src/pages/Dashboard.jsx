import React, { useState, useEffect } from 'react';
import { GlassCard, PremiumButton, ProgressIndicator, Matrix } from '../components/UI';
import { 
  Sparkles, Brain, Play, Trophy, Target, 
  Zap, Users, TrendingUp, ChevronRight, BookOpen, Clock, CheckCircle, ArrowRight,
  FileText, Sword, PlusCircle, Trash2, Edit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isTeacher = user?.role === 'ogretmen';
  
  const [myContent, setMyContent] = useState({ lessons: [], questions: [] });

  useEffect(() => {
    if (isTeacher) {
      const lessons = JSON.parse(localStorage.getItem('nashlab_custom_lessons') || '[]')
        .filter(l => l.teacherId === user?.email);
      const questions = JSON.parse(localStorage.getItem('nashlab_custom_questions') || '[]')
        .filter(q => q.teacherId === user?.email);
      setMyContent({ lessons, questions });
    }
  }, [isTeacher, user?.email]);

  const handleDelete = (type, id) => {
    const key = type === 'lesson' ? 'nashlab_custom_lessons' : 'nashlab_custom_questions';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    const filtered = existing.filter(item => item.id !== id);
    localStorage.setItem(key, JSON.stringify(filtered));
    
    // Refresh state
    setMyContent(prev => ({
      ...prev,
      [type === 'lesson' ? 'lessons' : 'questions']: prev[type === 'lesson' ? 'lessons' : 'questions'].filter(i => i.id !== id)
    }));
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Günaydın';
    if (hour < 18) return 'Tünaydın';
    return 'İyi akşamlar';
  };

  const nextModule = user?.completedLessons?.includes('nash_equilibrium') 
    ? { id: 'mixed_strategies', title: 'Karma Stratejiler' }
    : { id: 'nash_equilibrium', title: 'Nash Dengesi' };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontWeight: 800 }}>{getTimeGreeting()}, {user?.firstName}.</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            {isTeacher 
              ? 'Akademik içeriklerinizi ve öğrenci ilerlemelerini buradan yönetin.' 
              : `Bugün akademik hedeflerinin %${Math.floor((user?.completedLessons?.length || 0) * 33)}'ini tamamladın.`}
          </p>
        </div>
        {isTeacher && (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <PremiumButton onClick={() => navigate('/lesson-builder')} icon={PlusCircle}>Yeni Ders</PremiumButton>
            <PremiumButton onClick={() => navigate('/question-builder')} variant="glass" icon={Sword}>Yeni Senaryo</PremiumButton>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {isTeacher ? (
          <>
            <StatusCard icon={Users} color="#3b82f6" label="Aktif Öğrenci" val="42" sub="Kayıtlı: 50" />
            <StatusCard icon={FileText} color="#10b981" label="Yayınlanan Ders" val={myContent.lessons.length} sub="Tüm öğrenciler" />
            <StatusCard icon={Sword} color="#f59e0b" label="Özel Senaryo" val={myContent.questions.length} sub="Aktif yayında" />
          </>
        ) : (
          <>
            <GlassCard className="ai-panel" style={{ padding: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '8px' }}>
                  <Sparkles size={20} color="var(--accent-blue)" />
                </div>
                <h3 style={{ fontSize: '1.1rem' }}>AI Müfredat Önerisi</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Pratik analizlerine göre <strong>{nextModule.title}</strong> modülünde derinleşmen tavsiye ediliyor.
              </p>
              <PremiumButton icon={Play} onClick={() => navigate('/lessons')}>Eğitimi Başlat</PremiumButton>
            </GlassCard>

            <GlassCard style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>
                  <Brain size={20} color="#10b981" />
                </div>
                <h3 style={{ fontSize: '1.1rem' }}>Akademik İlerleme</h3>
              </div>
              <ProgressIndicator label="Temel Kavramlar" value={user?.completedLessons?.includes('nash_equilibrium') ? 100 : 35} />
              <ProgressIndicator label="Karma Stratejiler" value={user?.completedLessons?.includes('mixed_strategies') ? 100 : 15} />
            </GlassCard>

            <GlassCard style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px' }}>
                  <Target size={20} color="#f59e0b" />
                </div>
                <h3 style={{ fontSize: '1.1rem' }}>Bugünkü Görevler</h3>
              </div>
              <TaskItem done={user?.completedScenarios?.length > 0} text="1 Akademik Senaryo Çöz" />
              <TaskItem done={user?.completedLessons?.length > 0} text="Yeni Bir Kuramsal Modül Bitir" />
              <TaskItem done={false} text="Solver ile Kendi Matrisini Kur" />
            </GlassCard>
          </>
        )}
      </div>

      {isTeacher ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '1.5rem' }}>
           <GlassCard style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                 <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Benim İçeriklerim</h3>
                 <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>LMS Yönetim Paneli</div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 {myContent.lessons.length === 0 && myContent.questions.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', border: '2px dashed var(--glass-border)', borderRadius: '15px' }}>
                       <BookOpen size={48} color="var(--glass-border)" style={{ marginBottom: '1rem' }} />
                       <p style={{ color: 'var(--text-muted)' }}>Henüz içerik oluşturmadınız.</p>
                       <PremiumButton onClick={() => navigate('/lesson-builder')} variant="glass" size="small" style={{ marginTop: '1rem' }}>İlk Dersini Oluştur</PremiumButton>
                    </div>
                 )}
                 
                 {myContent.lessons.map(lesson => (
                    <ContentItem key={lesson.id} icon={FileText} color="var(--accent-blue)" title={lesson.title} type="Ders" date="Bugün" onDelete={() => handleDelete('lesson', lesson.id)} />
                 ))}
                 
                 {myContent.questions.map(q => (
                    <ContentItem key={q.id} icon={Sword} color="#10b981" title={q.title} type="Senaryo" date="Bugün" onDelete={() => handleDelete('question', q.id)} />
                 ))}
              </div>
           </GlassCard>

           <GlassCard style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem' }}>Sınıf İstatistikleri</h3>
              <ActivityRow user="Mert A." action="Karma Strateji Testini Tamamladı" score="95/100" />
              <ActivityRow user="Selin D." action="IDRDS Analizinde Takıldı" score="Destek Gerekli" />
              <ActivityRow user="Kaan Y." action="Nash Dengesi Modülünü Bitirdi" score="+250 XP" />
              <div style={{ marginTop: '2rem' }}>
                 <PremiumButton variant="glass" style={{ width: '100%', justifyContent: 'center' }}>Tüm Raporu Gör</PremiumButton>
              </div>
           </GlassCard>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
          <GlassCard style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Aktif Senaryo: Pazar Rekabeti</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', padding: '4px 10px', borderRadius: '50px' }}>Eğitim Modu</span>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
               <Matrix data={[[[2,2],[5,0]],[[0,5],[1,1]]]} playerA="Siz" playerB="Rakip" />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <PremiumButton variant="glass" style={{ flex: 1 }} onClick={() => navigate('/practice')}>Diğer Senaryolar</PremiumButton>
              <PremiumButton style={{ flex: 1 }} onClick={() => navigate('/solver')}>Analiz Aracını Aç</PremiumButton>
            </div>
          </GlassCard>

          <GlassCard style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '2rem' }}>Haftalık Başarı Sıralaması</h3>
            {[
              { name: 'Siz', xp: user?.xp || 0, rank: 1, current: true },
              { name: 'Dr. Strateji', xp: 2200, rank: 2 },
              { name: 'Oyun Teorisyeni', xp: 1950, rank: 3 },
              { name: 'Nash_Fan_92', xp: 1800, rank: 4 }
            ].sort((a,b) => b.xp - a.xp).map((p, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '1rem', 
                marginBottom: '0.75rem',
                background: p.current ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.02)',
                border: p.current ? '1px solid var(--accent-blue)' : '1px solid transparent',
                borderRadius: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: i === 0 ? '#fbbf24' : 'var(--text-muted)' }}>#{i+1}</span>
                  <div style={avatarCircle}>{p.name[0]}</div>
                  <span style={{ fontWeight: 600 }}>{p.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Trophy size={16} color="#fbbf24" />
                  <span style={{ fontWeight: 700 }}>{p.xp}</span>
                </div>
              </div>
            ))}
          </GlassCard>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </motion.div>
  );
};

const ContentItem = ({ icon: Icon, color, title, type, date, onDelete }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
           <Icon size={20} color={color} />
        </div>
        <div>
           <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{title}</div>
           <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{type} • {date}</div>
        </div>
     </div>
     <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button style={actionBtn}><Edit size={14} /></button>
        <button onClick={onDelete} style={{ ...actionBtn, color: '#ef4444' }}><Trash2 size={14} /></button>
     </div>
  </div>
);

const StatusCard = ({ icon: Icon, color, label, val, sub }) => (
  <GlassCard style={{ padding: '1.75rem', borderLeft: `5px solid ${color}` }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
      <Icon size={20} color={color} />
      <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>{label}</h3>
    </div>
    <p style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>{val}</p>
    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{sub}</p>
  </GlassCard>
);

const TaskItem = ({ done, text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', opacity: done ? 0.6 : 1 }}>
     <div style={{ 
       width: '24px', height: '24px', borderRadius: '6px', 
       background: done ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)',
       display: 'flex', alignItems: 'center', justifyContent: 'center',
       border: done ? '1px solid #10b981' : '1px solid var(--glass-border)'
     }}>
        {done && <CheckCircle size={14} color="#10b981" />}
     </div>
     <span style={{ fontSize: '0.9rem', textDecoration: done ? 'line-through' : 'none' }}>{text}</span>
  </div>
);

const ActivityRow = ({ user, action, score }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '1rem' }}>
    <div>
      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{user}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{action}</div>
    </div>
    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-blue)' }}>{score}</div>
  </div>
);

const avatarCircle = { width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 };
const actionBtn = { background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-muted)', width: '30px', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' };

export default Dashboard;
