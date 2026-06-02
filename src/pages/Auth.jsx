import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { GlassCard, PremiumButton } from '../components/UI';
import { Mail, Lock, User, ShieldCheck, Binary, Sparkles, UserCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    ad: '',
    soyad: '',
    email: '',
    sifre: '',
    sifreOnayla: '',
    rol: 'ogrenci',
    beniHatirla: true
  });
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, go home
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const allUsers = JSON.parse(localStorage.getItem('nashlab_users') || '[]');

      if (!isLogin) {
        // REGISTRATION
        if (!formData.ad || !formData.soyad || !formData.email || !formData.sifre) {
          throw new Error('Lütfen tüm alanları doldurun.');
        }
        if (formData.sifre !== formData.sifreOnayla) {
          throw new Error('Şifreler eşleşmiyor.');
        }
        if (allUsers.find(u => u.email.toLowerCase() === formData.email.toLowerCase())) {
          throw new Error('Bu e-posta adresi zaten kayıtlı.');
        }

        const newUser = {
          id: Date.now(),
          name: `${formData.ad} ${formData.soyad}`,
          firstName: formData.ad,
          lastName: formData.soyad,
          email: formData.email.toLowerCase(),
          password: formData.sifre,
          role: formData.rol,
          xp: 0
        };

        allUsers.push(newUser);
        localStorage.setItem('nashlab_users', JSON.stringify(allUsers));
        
        setSuccess('Kayıt başarılı! Giriş yapılıyor...');
        login(newUser);
        navigate('/');

      } else {
        // LOGIN
        const foundUser = allUsers.find(u => 
          u.email.toLowerCase() === formData.email.toLowerCase() && 
          u.password === formData.sifre
        );

        if (foundUser) {
          setSuccess('Giriş başarılı! Hoş geldiniz.');
          login(foundUser);
          navigate('/');
        } else {
          throw new Error('E-posta veya şifre hatalı.');
        }
      }
    } catch (err) {
      setError(err.message || 'Bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoMode = (role) => {
    const demoUser = {
      id: role === 'ogrenci' ? 'demo_s' : 'demo_t',
      name: role === 'ogrenci' ? 'Demo Öğrenci' : 'Demo Öğretmen',
      firstName: 'Demo',
      lastName: role === 'ogrenci' ? 'Öğrenci' : 'Öğretmen',
      email: `demo_${role}@nashlab.com`,
      role: role,
      xp: 2500
    };
    login(demoUser);
    navigate('/');
  };

  return (
    <div style={containerStyle}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ width: '100%', maxWidth: '420px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            style={logoBoxStyle}
          >
            <Binary size={32} color="white" />
          </motion.div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: '0.25rem' }}>NashLab</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Akademik Oyun Teorisi Platformu</p>
        </div>

        <GlassCard style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={tabContainerStyle}>
            <button 
              type="button"
              onClick={() => setIsLogin(true)}
              style={{ ...tabStyle, borderBottomColor: isLogin ? 'var(--accent-blue)' : 'transparent', color: isLogin ? 'var(--text-primary)' : 'var(--text-muted)' }}
            >
              Giriş Yap
            </button>
            <button 
              type="button"
              onClick={() => setIsLogin(false)}
              style={{ ...tabStyle, borderBottomColor: !isLogin ? 'var(--accent-blue)' : 'transparent', color: !isLogin ? 'var(--text-primary)' : 'var(--text-muted)' }}
            >
              Kayıt Ol
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ pointerEvents: isSubmitting ? 'none' : 'auto' }}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="reg-fields"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}
                >
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Ad</label>
                    <div style={inputWrapperStyle}>
                      <User size={16} style={iconStyle} />
                      <input type="text" name="ad" value={formData.ad} placeholder="Ad" style={inputStyle} onChange={handleChange} required />
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Soyad</label>
                    <div style={inputWrapperStyle}>
                      <User size={16} style={iconStyle} />
                      <input type="text" name="soyad" value={formData.soyad} placeholder="Soyad" style={inputStyle} onChange={handleChange} required />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>E-posta</label>
              <div style={inputWrapperStyle}>
                <Mail size={16} style={iconStyle} />
                <input type="email" name="email" value={formData.email} placeholder="e-posta@adresiniz.com" style={inputStyle} onChange={handleChange} required />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Şifre</label>
              <div style={inputWrapperStyle}>
                <Lock size={16} style={iconStyle} />
                <input type="password" name="sifre" value={formData.sifre} placeholder="••••••••" style={inputStyle} onChange={handleChange} required />
              </div>
            </div>

            {!isLogin && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '1.5rem' }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>Şifreyi Onayla</label>
                  <div style={inputWrapperStyle}>
                    <ShieldCheck size={16} style={iconStyle} />
                    <input type="password" name="sifreOnayla" value={formData.sifreOnayla} placeholder="••••••••" style={inputStyle} onChange={handleChange} required />
                  </div>
                </div>

                <label style={labelStyle}>Kullanıcı Rolü</label>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <RoleSelector active={formData.rol === 'ogrenci'} label="Öğrenci" icon={User} onClick={() => setFormData(p => ({...p, rol: 'ogrenci'}))} />
                  <RoleSelector active={formData.rol === 'ogretmen'} label="Öğretmen" icon={UserCheck} onClick={() => setFormData(p => ({...p, rol: 'ogretmen'}))} />
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0 }} style={errorBoxStyle}>
                  <AlertCircle size={14} /> {error}
                </motion.div>
              )}
              {success && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0 }} style={successBoxStyle}>
                  <CheckCircle2 size={14} /> {success}
                </motion.div>
              )}
            </AnimatePresence>

            <PremiumButton 
              type="submit" 
              disabled={isSubmitting}
              style={{ width: '100%', justifyContent: 'center', height: '48px', marginTop: '1rem' }}
            >
              {isSubmitting ? 'İşleniyor...' : (isLogin ? 'Giriş Yap' : 'Hesap Oluştur')}
            </PremiumButton>
          </form>

          {isLogin && (
            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
               <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Test hesabı ile hızlı giriş yapın:</p>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button onClick={() => handleDemoMode('ogrenci')} style={demoButtonStyle}>
                     Öğrenci Modu
                  </button>
                  <button onClick={() => handleDemoMode('ogretmen')} style={demoButtonStyle}>
                     Öğretmen Modu
                  </button>
               </div>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
};

const RoleSelector = ({ active, label, onClick }) => (
  <button type="button" onClick={onClick} style={{ 
    flex: 1, padding: '0.75rem', borderRadius: '10px', border: '1px solid', 
    borderColor: active ? 'var(--accent-blue)' : 'var(--glass-border)',
    background: active ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
    color: active ? 'var(--accent-blue)' : 'var(--text-muted)',
    fontSize: '0.85rem', fontWeight: 600, transition: '0.2s'
  }}>
    {label}
  </button>
);

const containerStyle = { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 0% 0%, #0f172a 0%, #020617 100%)', padding: '1.5rem' };
const logoBoxStyle = { background: 'linear-gradient(135deg, #3b82f6, #2563eb)', width: '56px', height: '56px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 0 25px rgba(59, 130, 246, 0.3)' };
const tabContainerStyle = { display: 'flex', gap: '1rem', marginBottom: '2rem' };
const tabStyle = { flex: 1, padding: '0.75rem', background: 'transparent', border: 'none', borderBottom: '2px solid', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', transition: '0.2s' };
const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' };
const inputWrapperStyle = { position: 'relative', display: 'flex', alignItems: 'center' };
const inputStyle = { width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '0.75rem 1rem 0.75rem 2.5rem', color: 'white', fontSize: '0.95rem', outline: 'none', transition: 'border 0.2s' };
const iconStyle = { position: 'absolute', left: '12px', color: 'var(--text-muted)' };
const errorBoxStyle = { background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' };
const successBoxStyle = { background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' };
const demoButtonStyle = { padding: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' };

export default Auth;
