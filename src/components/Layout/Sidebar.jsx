import React from 'react';
import { 
  LayoutDashboard, 
  Binary, 
  BookOpen, 
  Sword, 
  BarChart3, 
  User, 
   ChevronLeft,
   ChevronRight,
   PlusSquare,
   FileText,
   HelpCircle,
   Users
 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ogrenciItems = [
  { icon: LayoutDashboard, label: 'Panel', path: '/' },
  { icon: Binary, label: 'Çözücü', path: '/solver' },
  { icon: BookOpen, label: 'Dersler', path: '/lessons' },
  { icon: Sword, label: 'Alıştırmalar', path: '/practice' },
  { icon: BarChart3, label: 'Analitik', path: '/analytics' },
  { icon: User, label: 'Profil', path: '/profile' },
];

const ogretmenItems = [
  { icon: LayoutDashboard, label: 'Eğitmen Paneli', path: '/' },
  { icon: PlusSquare, label: 'Soru Oluşturucu', path: '/question-builder' },
  { icon: FileText, label: 'Ders Oluşturucu', path: '/lesson-builder' },
  { icon: HelpCircle, label: 'Quiz Oluşturucu', path: '/quiz-builder' },
  { icon: Users, label: 'Öğrenci Analitikleri', path: '/student-analytics' },
  { icon: User, label: 'Profil', path: '/profile' },
];

const Sidebar = ({ collapsed, setCollapsed, onItemClick }) => {
  const { user } = useAuth();
  const sidebarItems = user?.role === 'ogretmen' ? ogretmenItems : ogrenciItems;

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header" style={{ 
        padding: '1.5rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: collapsed ? 'center' : 'space-between',
        height: 'var(--topbar-height)',
        borderBottom: '1px solid var(--glass-border)'
      }}>
        {!collapsed && (
          <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo" style={{ 
              background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <Binary size={20} />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.5px' }}>NashLab</span>
          </div>
        )}
        {collapsed && (
          <div className="logo" style={{ 
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <Binary size={20} />
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          style={{ 
            color: 'var(--text-muted)', 
            display: 'flex', 
            alignItems: 'center',
            background: 'rgba(255,255,255,0.05)',
            padding: '4px',
            borderRadius: '6px'
          }}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav" style={{ flex: 1, padding: '1rem 0' }}>
        {sidebarItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            title={collapsed ? item.label : ''}
            onClick={() => onItemClick && onItemClick()}
          >
            <item.icon />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
};

export default Sidebar;
