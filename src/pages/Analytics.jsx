import React from 'react';
import { GlassCard, ProgressIndicator } from '../components/UI';
import { BarChart3, TrendingUp, Award, Clock, Target, Brain, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Analytics = () => {
  const { user } = useAuth();

  // Extract dynamic stats
  const totalXP = user?.xp || 0;
  const completedLessons = user?.completedLessons?.length || 0;
  const completedScenarios = user?.completedScenarios?.length || 0;
  const totalCompleted = completedLessons + completedScenarios;
  const studyHours = user?.studyHours !== undefined ? user.studyHours : 0;
  const accuracy = user?.accuracy !== undefined ? `%${user.accuracy}` : '%82';

  // Weekly progress
  const rawWeeklyProgress = user?.weeklyProgress;
  const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

  // Normalize weekly progress to a clean array of numbers
  let weeklyProgressArray = [0, 0, 0, 0, 0, 0, 0];
  if (Array.isArray(rawWeeklyProgress)) {
    weeklyProgressArray = rawWeeklyProgress;
  } else if (rawWeeklyProgress && typeof rawWeeklyProgress === 'object') {
    weeklyProgressArray = days.map(day => rawWeeklyProgress[day] || 0);
  }

  // Empty data protection
  if (!weeklyProgressArray || weeklyProgressArray.length === 0) {
    weeklyProgressArray = [0, 0, 0, 0, 0, 0, 0];
  }

  // Ensure all values are numeric and fallback safely to 0
  weeklyProgressArray = weeklyProgressArray.map(val => Number(val) || 0);

  // Log weekly progress data to console before rendering for validation
  console.log("Weekly Progress:", weeklyProgressArray);

  // maxValue protection (never be 0)
  const maxValue = Math.max(...weeklyProgressArray, 1);

  // Determine today's day to highlight dynamically (Monday = 0, Tuesday = 1, ..., Sunday = 6)
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Performans Analizi</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Öğrenme eğrinizi ve stratejik yetkinliklerinizi detaylıca inceleyin.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Toplam Puan', val: totalXP.toLocaleString('tr-TR'), icon: Award, color: '#fbbf24' },
          { label: 'Tamamlanan', val: totalCompleted.toString(), icon: CheckCircle, color: '#10b981' },
          { label: 'Çalışma Saati', val: `${studyHours}s`, icon: Clock, color: '#3b82f6' },
          { label: 'Doğruluk', val: accuracy, icon: Target, color: '#a855f7' },
        ].map((stat, i) => (
          <GlassCard key={i} style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '10px', 
              background: 'rgba(255,255,255,0.03)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 1rem',
              border: '1px solid var(--glass-border)'
            }}>
              <stat.icon size={20} color={stat.color} />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>{stat.val}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{stat.label}</div>
          </GlassCard>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <GlassCard style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <TrendingUp size={20} color="var(--accent-blue)" />
            Haftalık İlerleme Grafiği
          </h3>
          <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', gap: '0.5rem', padding: '0 1rem', overflowX: 'auto' }}>
            {days.map((day, i) => {
               const dayXP = weeklyProgressArray[i];
               const normalizedHeight = maxValue > 0 ? (dayXP / maxValue) * 100 : 5;
               const finalHeight = dayXP > 0 ? Math.max(normalizedHeight, 8) : 4;
               const isToday = i === todayIndex;
               return (
                 <div key={i} style={{ flex: 1, minWidth: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ height: '180px', width: '100%', display: 'flex', alignItems: 'flex-end' }}>
                       <motion.div 
                         initial={{ height: 0 }}
                         animate={{ height: `${finalHeight}%` }}
                         title={`${dayXP} XP`}
                         style={{ 
                           width: '100%', 
                           minHeight: '4px',
                           background: isToday ? 'var(--accent-blue)' : 'rgba(59, 130, 246, 0.45)', 
                           borderRadius: '6px 6px 0 0',
                           boxShadow: isToday ? '0 0 20px rgba(59, 130, 246, 0.4)' : 'none',
                           cursor: 'pointer'
                         }} 
                       />
                    </div>
                    <span style={{ fontSize: '0.7rem', color: isToday ? 'var(--accent-blue)' : 'var(--text-muted)', fontWeight: isToday ? 700 : 400 }}>{day}</span>
                 </div>
               );
            })}
          </div>
        </GlassCard>

        <GlassCard style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Brain size={20} color="var(--accent-blue)" />
            Yetenek Analizi
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <ProgressIndicator label="Ardışık Oyunlar" value={35} />
            <ProgressIndicator label="Statik Denge Modelleri" value={88} />
            <ProgressIndicator label="Karma Strateji Çözümü" value={12} />
            <ProgressIndicator label="İşbirlikçi Mekanizmalar" value={56} />
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
};

export default Analytics;
