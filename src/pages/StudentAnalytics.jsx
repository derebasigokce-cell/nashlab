import React from 'react';
import { GlassCard, ProgressIndicator, PremiumButton } from '../components/UI';
import { Users, UserCheck, AlertCircle, TrendingUp, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentAnalytics = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Öğrenci Analitikleri</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Sınıfınızın genel performansı ve bireysel öğrenci gelişimleri.</p>
        </div>
        <PremiumButton variant="glass" icon={Download}>Raporu İndir (.PDF)</PremiumButton>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {[
          { label: 'Aktif Öğrenci', val: '42', color: 'var(--accent-blue)', icon: Users },
          { label: 'Bitirme Oranı', val: '%78', color: '#10b981', icon: UserCheck },
          { label: 'Ort. Puan', val: '840', color: '#f59e0b', icon: TrendingUp },
          { label: 'Dikkat Gereken', val: '5', color: '#ef4444', icon: AlertCircle },
        ].map((stat, i) => (
          <GlassCard key={i} style={{ padding: '1.5rem', borderLeft: `4px solid ${stat.color}` }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{stat.label}</span>
                <stat.icon size={18} color={stat.color} />
             </div>
             <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem' }}>{stat.val}</div>
          </GlassCard>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
        <GlassCard style={{ padding: '1.5rem' }}>
           <h4 style={{ marginBottom: '1.5rem' }}>Öğrenci Listesi</h4>
           <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
               <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                     <th style={{ padding: '1rem', textAlign: 'left' }}>Öğrenci</th>
                     <th style={{ padding: '1rem', textAlign: 'left' }}>Gelişim</th>
                     <th style={{ padding: '1rem', textAlign: 'center' }}>Son Aktivite</th>
                     <th style={{ padding: '1rem', textAlign: 'right' }}>Durum</th>
                  </tr>
               </thead>
               <tbody>
                  {[
                     { name: 'Ahmet Yılmaz', progress: 92, last: '1 saat önce', status: 'Önde' },
                     { name: 'Ayşe Kaya', progress: 45, last: 'Dün', status: 'Geride' },
                     { name: 'Mehmet Demir', progress: 78, last: 'Bugün', status: 'Normal' },
                     { name: 'Fatma Şahin', progress: 15, last: '3 gün önce', status: 'Riskli' }
                  ].map((s, i) => (
                     <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                        <td style={{ padding: '1rem', fontWeight: 600 }}>{s.name}</td>
                        <td style={{ padding: '1rem', width: '200px' }}>
                           <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                              <div style={{ width: `${s.progress}%`, height: '100%', background: 'var(--accent-blue)', borderRadius: '10px' }}></div>
                           </div>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>{s.last}</td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                           <span style={{ 
                              padding: '4px 8px', 
                              borderRadius: '4px', 
                              fontSize: '0.75rem', 
                              background: s.status === 'Önde' ? 'rgba(16, 185, 129, 0.1)' : s.status === 'Riskli' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.05)',
                              color: s.status === 'Önde' ? '#10b981' : s.status === 'Riskli' ? '#ef4444' : 'white'
                           }}>{s.status}</span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
           </div>
        </GlassCard>

        <GlassCard style={{ padding: '1.5rem' }}>
           <h4 style={{ marginBottom: '1.5rem' }}>Konu Zorluk Analizi</h4>
           <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Sınıfın en çok zorlandığı konular:</p>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <ProgressIndicator label="Sıfır Toplamlı Oyun Dengesi" value={42} />
              <ProgressIndicator label="Karma Stratejiler" value={38} />
              <ProgressIndicator label="Bayesyen Oyunlar" value={15} />
           </div>
        </GlassCard>
      </div>
    </motion.div>
  );
};

export default StudentAnalytics;
