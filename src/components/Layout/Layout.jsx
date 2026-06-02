import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileNav from './MobileNav';
import './Layout.css';

const Layout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={`app-container ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-open'}`}>
      {/* Desktop Sidebar / Hamburger Menu */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
        onItemClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-sidebar-overlay"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(3, 7, 18, 0.4)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 55,
            animation: 'fadeIn 0.2s ease-out'
          }}
        />
      )}

      <div className="main-wrapper">
        <TopBar onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <main className="content-area">
          {children}
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Mobile Sidebar Overlay if needed */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1023px) {
          .sidebar {
             transform: translateX(${mobileMenuOpen ? '0' : '-100%'});
          }
        }
      `}} />
    </div>
  );
};

export default Layout;
