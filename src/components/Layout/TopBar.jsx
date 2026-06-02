import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Trophy, Menu, LogOut, User, Settings, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const globalSearchData = [
  // Lessons
  { id: 'l1', title: 'Nash Dengesi ve Best Response', cat: 'Ders', path: '/lessons', keywords: 'nash, denge, best response, en iyi tepki, statik, kural, rasyonellik', desc: 'Oyun teorisinin kalbi ve rasyonel seçimler.' },
  { id: 'l2', title: 'Karma Stratejiler', cat: 'Ders', path: '/lessons', keywords: 'karma, mixed strategy, beklenen fayda, p ve q, olasılık, denetleme', desc: 'Olasılıksal hamleler ve rakip analizi.' },
  { id: 'l3', title: 'Dinamik Oyunlar ve SPE', cat: 'Ders', path: '/lessons', keywords: 'dinamik, ardışık, spe, backward induction, ağaç, tümevarım, pazara giriş', desc: 'Oyun ağaçları ve geriye doğru tümevarım.' },
  
  // Solver
  { id: 's1', title: 'Akademik Matris Çözücü', cat: 'Çözücü', path: '/solver', keywords: 'çözücü, solver, matris, hesaplama, p q, analiz, sıfır toplamlı, zero-sum', desc: '2x2 matris oyunları için akademik hesaplama aracı.' },
  
  // Practice
  { id: 'p1', title: 'Mahkum İkilemi Senaryosu', cat: 'Alıştırma', path: '/practice', keywords: 'mahkum ikilemi, prisoner dilemma, sosyal optimum, pazar, fiyat rekabeti, pareto', desc: 'Firma rekabeti ve toplumsal refah analizi.' },
  { id: 'p2', title: 'Karma Strateji Senaryosu', cat: 'Alıştırma', path: '/practice', keywords: 'denetleme oyunu, karma strateji pratik, denetçi, beklenen fayda', desc: 'Denetleme oyununda p ve q olasılık hesabı.' },
  { id: 'p3', title: 'SPE ve Geriye Tümevarım', cat: 'Alıştırma', path: '/practice', keywords: 'spe, geriye tümevarım, ardışık oyun, ağaç, bayesyen, geniş form', desc: 'Geniş formlu oyunlarda denge tespiti.' },
  
  // Analytics
  { id: 'a1', title: 'Performans Analizi', cat: 'Analitik', path: '/analytics', keywords: 'analiz, analitik, istatistik, grafik, ilerleme, rapor, yetkinlik', desc: 'Kategorik yetkinlik ve gelişim grafikleri.' },
];

const TopBar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Search States
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  // Notification Persistence
  const [hasUnread, setHasUnread] = useState(false);
  const notifications = [
    { id: 2, title: 'Sıralama Güncellendi', desc: 'Haftalık ligde 12. sıraya yükseldin.', time: '5sa önce' },
    { id: 1, title: 'Yeni Başarım!', desc: 'Nash Dengesi modülünü bitirdin.', time: '2sa önce' }
  ];

  useEffect(() => {
    const lastRead = localStorage.getItem(`nashlab_notif_read_${user?.email}`);
    const latestId = Math.max(...notifications.map(n => n.id));
    if (!lastRead || parseInt(lastRead) < latestId) {
      setHasUnread(true);
    }
  }, [user]);

  const markAllAsRead = () => {
    const latestId = Math.max(...notifications.map(n => n.id));
    localStorage.setItem(`nashlab_notif_read_${user?.email}`, latestId.toString());
    setHasUnread(false);
  };

  const toggleNotifications = () => {
    if (!showNotifications) {
      markAllAsRead();
    }
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const normalize = (text) => {
    return text.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .trim();
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      const query = normalize(searchTerm);
      const filtered = globalSearchData.filter(item => 
        normalize(item.title).includes(query) || 
        normalize(item.keywords).includes(query) ||
        normalize(item.cat).includes(query)
      );
      setSearchResults(filtered);
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  }, [searchTerm]);

  const handleSelectResult = (path) => {
    navigate(path);
    setSearchTerm('');
    setIsSearchOpen(false);
  };

  return (
    <header className="topbar">
      <div className="topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          className="mobile-menu-btn" 
          onClick={onMenuClick}
          style={{ display: 'none', color: 'var(--text-primary)' }}
        >
          <Menu size={24} />
        </button>

        <div className="search-bar-container" ref={searchRef} style={{ position: 'relative' }}>
          <div className="search-input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', color: isSearchOpen ? 'var(--accent-blue)' : 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Analiz veya ders ara..." 
              style={searchInputStyle}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchResults.length > 0) {
                  handleSelectResult(searchResults[0].path);
                }
              }}
            />
          </div>

          <AnimatePresence>
            {isSearchOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }}
                style={searchResultsPanel}
              >
                {searchResults.length > 0 ? (
                  searchResults.map(result => (
                    <div 
                      key={result.id} 
                      onClick={() => handleSelectResult(result.path)}
                      className="search-result-item"
                      style={resultItemStyle}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{result.title}</span>
                        <span style={{ ...badgeStyle, background: getCatColor(result.cat) }}>{result.cat}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{result.desc}</p>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <Search size={32} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                    <p style={{ fontSize: '0.85rem' }}>Sonuç bulunamadı.<br/>Farklı bir anahtar kelime deneyin.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={xpIndicatorStyle} onClick={() => navigate('/analytics')}>
          <Trophy size={16} color="#fbbf24" />
          <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{user?.xp?.toLocaleString() || 0} XP</span>
        </div>

        <div style={{ position: 'relative' }}>
          <button 
            style={{ color: showNotifications ? 'var(--accent-blue)' : 'var(--text-secondary)', position: 'relative' }}
            onClick={toggleNotifications}
          >
            <Bell size={20} />
            {hasUnread && <span style={notifBadgeStyle}></span>}
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={dropdownStyle}>
                <div style={{ ...dropdownHeader, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <span>Bildirimler</span>
                   <button onClick={markAllAsRead} style={markReadBtn}>
                      <CheckCircle2 size={12} /> Tümünü Oku
                   </button>
                </div>
                {notifications.map(n => (
                  <div key={n.id} style={notifItemStyle}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{n.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.desc}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ position: 'relative' }}>
          <div 
            onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          >
            <div style={{ 
              ...avatarStyle, 
              background: user?.role === 'ogretmen' ? 'linear-gradient(135deg, #10b981, #06b6d4)' : 'linear-gradient(135deg, #6366f1, #a855f7)'
            }}>
              {getInitials(user?.name)}
            </div>
            <div className="user-info">
              <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600 }}>{user?.firstName}</span>
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Seviye {user?.level}</span>
            </div>
          </div>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={dropdownStyle}>
                <DropdownItem icon={User} label="Profilim" onClick={() => navigate('/profile?tab=info')} />
                <DropdownItem icon={Settings} label="Ayarlar" onClick={() => navigate('/profile?tab=settings')} />
                <DropdownItem icon={HelpCircle} label="Yardım" onClick={() => window.open('https://google.com', '_blank')} />
                <div style={{ borderTop: '1px solid var(--glass-border)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                  <DropdownItem icon={LogOut} label="Çıkış Yap" onClick={logout} danger />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1023px) {
          .mobile-menu-btn { display: flex !important; }
          .search-bar-container { display: none !important; }
          .user-info { display: none !important; }
        }
        .search-result-item:hover {
          background: rgba(255,255,255,0.05);
        }
      `}} />
    </header>
  );
};

const getCatColor = (cat) => {
  switch (cat) {
    case 'Ders': return 'rgba(59, 130, 246, 0.2)';
    case 'Alıştırma': return 'rgba(16, 185, 129, 0.2)';
    case 'Çözücü': return 'rgba(168, 85, 247, 0.2)';
    case 'Analitik': return 'rgba(245, 158, 11, 0.2)';
    default: return 'rgba(255,255,255,0.1)';
  }
};

const DropdownItem = ({ icon: Icon, label, onClick, danger }) => (
  <button onClick={onClick} style={{ ...dropdownItemStyle, color: danger ? '#ef4444' : 'var(--text-primary)' }}>
    <Icon size={16} />
    <span>{label}</span>
  </button>
);

const searchInputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '0.6rem 1rem 0.6rem 2.5rem', color: 'white', width: '320px', fontSize: '0.85rem', outline: 'none', transition: '0.2s' };
const searchResultsPanel = { position: 'absolute', top: 'calc(100% + 12px)', left: 0, width: '400px', maxHeight: '450px', overflowY: 'auto', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '15px', boxShadow: '0 15px 40px rgba(0,0,0,0.6)', backdropFilter: 'blur(30px)', zIndex: 101, padding: '0.75rem' };
const resultItemStyle = { padding: '1rem', borderRadius: '10px', cursor: 'pointer', transition: '0.2s', marginBottom: '4px', border: '1px solid transparent' };
const badgeStyle = { fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '50px', color: 'white' };
const xpIndicatorStyle = { display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(5, 10, 24, 0.5)', padding: '0.4rem 0.8rem', borderRadius: '50px', border: '1px solid rgba(59, 130, 246, 0.2)', cursor: 'pointer' };
const notifBadgeStyle = { position: 'absolute', top: '-1px', right: '-1px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid var(--bg-color)' };
const avatarStyle = { width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', color: 'white', border: '2px solid var(--glass-border)' };
const dropdownStyle = { position: 'absolute', top: 'calc(100% + 15px)', right: 0, width: '220px', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', padding: '0.5rem', zIndex: 1000, backdropFilter: 'blur(20px)' };
const dropdownHeader = { padding: '0.5rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' };
const dropdownItemStyle = { width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', transition: 'background 0.2s', border: 'none', background: 'transparent' };
const notifItemStyle = { padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' };
const markReadBtn = { background: 'none', border: 'none', color: 'var(--accent-blue)', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '4px', transition: 'background 0.2s' };

export default TopBar;
