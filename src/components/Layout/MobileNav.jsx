import React from 'react';
import { LayoutDashboard, BookOpen, Sword, BarChart3, Binary, User, PlusSquare } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MobileNav = () => {
  const { user } = useAuth();
  const isTeacher = user?.role === 'ogretmen';

  return (
    <>
      <nav className="mobile-nav">
        <NavLink to="/" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Panel</span>
        </NavLink>
        <NavLink to={isTeacher ? "/lesson-builder" : "/lessons"} className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <BookOpen size={20} />
          <span>{isTeacher ? 'Eğitim' : 'Dersler'}</span>
        </NavLink>
        
        <div style={{ width: '20px' }}></div> {/* Spacer for FAB */}
        
        <NavLink to={isTeacher ? "/student-analytics" : "/practice"} className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          {isTeacher ? <BarChart3 size={20} /> : <Sword size={20} />}
          <span>{isTeacher ? 'Analiz' : 'Alıştırma'}</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <User size={20} />
          <span>Profil</span>
        </NavLink>
      </nav>
      
      {!isTeacher ? (
        <NavLink to="/solver" className="fab-solver" title="AI Çözücü">
          <Binary size={28} />
        </NavLink>
      ) : (
        <NavLink to="/question-builder" className="fab-solver" title="Soru Oluştur" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>
          <PlusSquare size={28} />
        </NavLink>
      )}
    </>
  );
};

export default MobileNav;
