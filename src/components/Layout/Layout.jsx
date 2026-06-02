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
      {/* Desktop Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
      />

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
