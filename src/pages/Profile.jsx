import React, { useState, useEffect } from 'react';
import { GlassCard, PremiumButton } from '../components/UI';
import { 
  User, Mail, Shield, Bell, Globe, Camera, LogOut, Settings, 
  Save, X, Lock, RefreshCcw, CheckCircle2, AlertCircle, Trash2,
  Info, Sliders, ChevronRight, BookOpen, Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Profile = () => {
  const { user, logout, updateProfile, resetProgression } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'info';

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || ''
  });

  // Password State
  const [showPassForm, setShowPassForm] = useState(false);
  const [passData, setPassData] = useState({ current: '', new: '', confirm: '' });
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  // Notification State
  const [notifSettings, setNotifSettings] = useState(user?.settings || {
    notifications: true,
    xpAlerts: true,
    news: false
  });

  // Modals
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
    }
  }, [user]);

  const handleProfileSave = () => {
    updateProfile({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      name: `${profileData.firstName} ${profileData.lastName}`
    });
    setIsEditing(false);
  };

  const handlePassUpdate = (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (passData.new !== passData.confirm) {
      setPassError('Yeni şifreler eşleşmiyor.');
      return;
    }
    if (passData.new.length < 6) {
      setPassError('Yeni şifre en az 6 karakter olmalıdır.');
      return;
    }

    setPassSuccess('Şifre başarıyla güncellendi.');
    setPassData({ current: '', new: '', confirm: '' });
    setTimeout(() => setShowPassForm(false), 2000);
  };

  const handleNotifToggle = (key) => {
    const newSettings = { ...notifSettings, [key]: !notifSettings[key] };
    setNotifSettings(newSettings);
    updateProfile({ settings: newSettings });
  };

  const handleResetData = () => {
    resetProgression();
    setShowResetModal(false);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || '?'}${lastName?.[0] || '?'}`.toUpperCase();
  };

  const switchTab = (tab) => {
    setSearchParams({ tab });
    setIsEditing(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.4rem', fontWeight: 800 }}>Kişisel Alan</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <span>Hesap</span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{activeTab === 'info' ? 'Profil Bilgileri' : 'Sistem Ayarları'}</span>
          </div>
        </div>
        
        <div style={tabSwitcher}>
           <button onClick={() => switchTab('info')} style={{...tabBtn, color: activeTab === 'info' ? 'white' : 'var(--text-muted)', background: activeTab === 'info' ? 'var(--accent-blue)' : 'transparent' }}>
             <Info size={16} /> Profil Bilgileri
           </button>
           <button onClick={() => switchTab('settings')} style={{...tabBtn, color: activeTab === 'settings' ? 'white' : 'var(--text-muted)', background: activeTab === 'settings' ? 'var(--accent-blue)' : 'transparent' }}>
             <Settings size={16} /> Ayarlar
           </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: '2rem' }}>
        {/* Profile Card (Always visible) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <GlassCard style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 1.5rem' }}>
               <div style={{ 
                 width: '100%', height: '100%', borderRadius: '50%', 
                 background: user?.role === 'ogretmen' ? 'linear-gradient(135deg, #10b981, #06b6d4)' : 'linear-gradient(135deg, #3b82f6, #6366f1)',
                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                 fontSize: '2rem', fontWeight: 800, color: 'white', border: '3px solid var(--glass-border)'
               }}>
                 {getInitials(user?.firstName, user?.lastName)}
               </div>
               <button style={cameraBtn}><Camera size={14} /></button>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{user?.firstName} {user?.lastName}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', marginTop: '0.25rem' }}>
               {user?.role === 'ogretmen' ? 'Eğitmen / Akademisyen' : 'Lisans Öğrencisi'}
            </p>
            
            <div style={statsBox}>
               <div style={statItem}>
                  <div style={statVal}>{user?.xp || 0}</div>
                  <div style={statLabel}>XP</div>
               </div>
               <div style={statItem}>
                  <div style={statVal}>{user?.level || 1}</div>
                  <div style={statLabel}>Seviye</div>
               </div>
               <div style={statItem}>
                  <div style={statVal}>{user?.completedLessons?.length || 0}</div>
                  <div style={statLabel}>Ders</div>
               </div>
            </div>

            <PremiumButton 
              variant="glass" 
              onClick={logout} 
              style={{ width: '100%', justifyContent: 'center', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.1)', marginTop: '2rem' }}
            >
              Çıkış Yap
            </PremiumButton>
          </GlassCard>
        </div>

        {/* Dynamic Content Columns */}
        <AnimatePresence mode="wait">
          {activeTab === 'info' ? (
            <motion.div key="info" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <GlassCard style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <User size={20} color="var(--accent-blue)" /> Kimlik ve Hesap Bilgileri
                  </h3>
                  {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} style={editBtn}>Profili Düzenle</button>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button onClick={() => setIsEditing(false)} style={cancelBtn}><X size={14} /> Vazgeç</button>
                      <button onClick={handleProfileSave} style={saveBtn}><CheckCircle2 size={14} /> Kaydet</button>
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div style={inputGroup}>
                    <label style={labelStyle}>Ad</label>
                    <input type="text" value={isEditing ? profileData.firstName : user?.firstName} onChange={(e) => setProfileData({...profileData, firstName: e.target.value})} disabled={!isEditing} style={inputStyle} />
                  </div>
                  <div style={inputGroup}>
                    <label style={labelStyle}>Soyad</label>
                    <input type="text" value={isEditing ? profileData.lastName : user?.lastName} onChange={(e) => setProfileData({...profileData, lastName: e.target.value})} disabled={!isEditing} style={inputStyle} />
                  </div>
                  <div style={{ ...inputGroup, gridColumn: 'span 2' }}>
                    <label style={labelStyle}>E-posta</label>
                    <input type="email" value={isEditing ? profileData.email : user?.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} disabled={!isEditing} style={inputStyle} />
                  </div>
                </div>
              </GlassCard>

              <GlassCard style={{ padding: '2rem' }}>
                 <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Sliders size={20} color="var(--accent-blue)" /> Akademik İstatistikler
                 </h3>
                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    <BigStat label="Tamamlanan Modül" val={user?.completedLessons?.length || 0} icon={BookOpen} color="#3b82f6" />
                    <BigStat label="Çözülen Alıştırma" val={user?.completedScenarios?.length || 0} icon={CheckCircle2} color="#10b981" />
                    <BigStat label="Analiz Skoru" val={`${user?.level || 1}. Seviye`} icon={Trophy} color="#f59e0b" />
                 </div>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <GlassCard style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Bell size={20} color="var(--accent-blue)" /> Bildirim ve Hatırlatıcılar
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <PreferenceRow icon={Bell} title="Ders Hatırlatmaları" desc="Çalışma programınızla ilgili günlük bildirimler." active={notifSettings.notifications} onToggle={() => handleNotifToggle('notifications')} />
                  <PreferenceRow icon={Trophy} title="XP ve Seviye Bildirimleri" desc="Başarılarınız ve XP kazandığınız anlardaki uyarılar." active={notifSettings.xpAlerts} onToggle={() => handleNotifToggle('xpAlerts')} />
                  <PreferenceRow icon={Globe} title="Yeni İçerik Duyuruları" desc="Platformumuza eklenen yeni senaryo ve modül bildirimleri." active={notifSettings.news} onToggle={() => handleNotifToggle('news')} />
                </div>
              </GlassCard>

              <GlassCard style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Shield size={20} color="var(--accent-blue)" /> Güvenlik ve Veri Yönetimi
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                   <button onClick={() => setShowPassForm(true)} style={secBtn}><Lock size={16} /> Şifre Değiştir</button>
                   <button onClick={() => setShowResetModal(true)} style={{ ...secBtn, color: '#ef4444' }}><Trash2 size={16} /> Verileri Sıfırla</button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals (Password & Reset) */}
      <AnimatePresence>
        {showPassForm && (
          <div style={modalOverlay}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <GlassCard style={{ padding: '2.5rem', width: '400px' }}>
                 <h2 style={{ marginBottom: '1.5rem' }}>Şifre Güncelleme</h2>
                 <form onSubmit={handlePassUpdate}>
                    <div style={inputGroup}><label style={labelStyle}>Mevcut Şifre</label><input type="password" required style={inputStyle} value={passData.current} onChange={e => setPassData({...passData, current: e.target.value})} /></div>
                    <div style={inputGroup}><label style={labelStyle}>Yeni Şifre</label><input type="password" required style={inputStyle} value={passData.new} onChange={e => setPassData({...passData, new: e.target.value})} /></div>
                    <div style={inputGroup}><label style={labelStyle}>Yeni Şifre (Tekrar)</label><input type="password" required style={inputStyle} value={passData.confirm} onChange={e => setPassData({...passData, confirm: e.target.value})} /></div>
                    {passError && <div style={msgError}>{passError}</div>}
                    {passSuccess && <div style={msgSuccess}>{passSuccess}</div>}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                       <button type="button" onClick={() => setShowPassForm(false)} style={cancelBtn}>Vazgeç</button>
                       <PremiumButton type="submit" style={{ flex: 1 }}>Güncelle</PremiumButton>
                    </div>
                 </form>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showResetModal && (
          <div style={modalOverlay}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
              <GlassCard style={{ padding: '2.5rem', width: '400px', textAlign: 'center' }}>
                 <div style={alertCircle}><AlertCircle size={32} color="#ef4444" /></div>
                 <h2 style={{ marginBottom: '1rem' }}>Emin misiniz?</h2>
                 <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Bu işlem sadece ilerleme verilerinizi (XP ve Dersler) sıfırlar. Hesabınıza giriş yapmaya devam edebilirsiniz.</p>
                 <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => setShowResetModal(false)} style={cancelBtn}>Hayır, Vazgeç</button>
                    <PremiumButton style={{ flex: 1, background: '#ef4444' }} onClick={handleResetData}>Evet, Sıfırla</PremiumButton>
                 </div>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PreferenceRow = ({ icon: Icon, title, desc, active, onToggle }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
     <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={18} /></div>
        <div>
           <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{title}</div>
           <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{desc}</div>
        </div>
     </div>
     <div onClick={onToggle} style={{ width: '40px', height: '20px', background: active ? 'var(--accent-blue)' : 'rgba(255,255,255,0.1)', borderRadius: '20px', position: 'relative', cursor: 'pointer' }}>
        <motion.div animate={{ x: active ? 22 : 2 }} style={{ position: 'absolute', top: '2px', left: 0, width: '16px', height: '16px', background: 'white', borderRadius: '50%' }} />
     </div>
  </div>
);

const BigStat = ({ label, val, icon: Icon, color }) => (
  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
     <Icon size={18} color={color} style={{ marginBottom: '0.75rem' }} />
     <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{val}</div>
     <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.2rem' }}>{label}</div>
  </div>
);

// Styles
const tabSwitcher = { display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.02)', padding: '4px', borderRadius: '10px', border: '1px solid var(--glass-border)' };
const tabBtn = { border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '8px' };
const cameraBtn = { position: 'absolute', bottom: '0', right: '0', width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-blue)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' };
const statsBox = { display: 'flex', justifyContent: 'space-around', padding: '1rem 0', background: 'rgba(0,0,0,0.1)', borderRadius: '12px', marginTop: '1.5rem' };
const statItem = { textAlign: 'center' };
const statVal = { fontSize: '1rem', fontWeight: 800 };
const statLabel = { fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' };
const editBtn = { background: 'none', border: 'none', color: 'var(--accent-blue)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' };
const saveBtn = { background: 'var(--accent-blue)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' };
const cancelBtn = { background: 'none', border: '1px solid var(--glass-border)', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' };
const inputGroup = { marginBottom: '1.25rem' };
const labelStyle = { display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' };
const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '0.75rem', borderRadius: '8px', color: 'white', fontSize: '0.9rem', outline: 'none' };
const secBtn = { width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '10px', color: 'white', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' };
const modalOverlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const msgError = { color: '#ef4444', fontSize: '0.8rem', marginTop: '0.5rem' };
const msgSuccess = { color: '#10b981', fontSize: '0.8rem', marginTop: '0.5rem' };
const alertCircle = { width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' };

export default Profile;
