import React from 'react';
import { 
  LayoutDashboard, 
  Binary, 
  BookOpen, 
  Sword, 
  BarChart3, 
  User, 
  PlusSquare, 
  FileText, 
  HelpCircle, 
  Users 
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ogrenciItems = [
  { icon: LayoutDashboard, label: 'Panel', path: '/' },
  { icon: BookOpen, label: 'Dersler', path: '/lessons' },
  { icon: Sword, label: 'Alıştırmalar', path: '/practice' },
  { icon: User, label: 'Profil', path: '/profile' },
];

const ogretmenItems = [
  { icon: LayoutDashboard, label: 'Panel', path: '/' },
  { icon: BookOpen, label: 'Eğitim', path: '/lesson-builder' },
  { icon: BarChart3, label: 'Analiz', path: '/student-analytics' },
  { icon: User, label: 'Profil', path: '/profile' },
];

const MobileNav = () => {
  const { user } = useAuth();
  const isTeacher = user?.role === 'ogretmen';
  const navItems = isTeacher ? ogretmenItems : ogrenciItems;

  return (
    <>
      <nav className="mobile-nav" style={{ gridTemplateColumns: `repeat(${navItems.length}, 1fr)` }}>
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      {!isTeacher ? (
        <NavLink to="/solver" className="fab-solver" title="AI Çözücü">
          <Binary size={22} className="fab-solver-icon" />
        </NavLink>
      ) : (
        <NavLink to="/question-builder" className="fab-solver" title="Soru Oluştur" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>
          <PlusSquare size={22} className="fab-solver-icon" />
        </NavLink>
      )}
    </>
  );
};

export default MobileNav;
