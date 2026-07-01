import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Collapsible vertical dashboard sidebar menu.
 */
const Sidebar = ({ isOpen }) => {
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Tasks Board', path: '/tasks', icon: '📋' },
  ];

  return (
    <aside style={{ ...styles.sidebar, width: isOpen ? '260px' : '80px' }} className="glass-panel">
      <div style={styles.logoSection}>
        <span style={styles.logoIcon}>🛡️</span>
        {isOpen && <span style={styles.logoText}>TaskSphere</span>}
      </div>

      <nav style={styles.navMenu}>
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            style={({ isActive }) => ({
              ...styles.navLink,
              backgroundColor: isActive ? 'var(--primary)' : 'transparent',
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              justifyContent: isOpen ? 'flex-start' : 'center',
            })}
            className="glow-hover"
          >
            <span style={styles.linkIcon}>{link.icon}</span>
            {isOpen && <span style={styles.linkLabel}>{link.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

const styles = {
  sidebar: {
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 101,
    borderRadius: 0,
    borderRight: '1px solid var(--border-color)',
    background: 'var(--bg-secondary)',
    transition: 'width var(--transition-normal)',
    overflow: 'hidden',
  },
  logoSection: {
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    gap: '12px',
    borderBottom: '1px solid var(--border-color)',
  },
  logoIcon: {
    fontSize: '24px',
  },
  logoText: {
    fontFamily: 'var(--font-title)',
    fontWeight: '800',
    fontSize: '18px',
    letterSpacing: '-0.02em',
    color: '#ffffff',
  },
  navMenu: {
    padding: '24px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderRadius: 'var(--radius-md)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'var(--transition-fast)',
    gap: '12px',
  },
  linkIcon: {
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkLabel: {
    whiteSpace: 'nowrap',
  },
};

export default Sidebar;
