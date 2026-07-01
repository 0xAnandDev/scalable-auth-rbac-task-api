import React from 'react';
import useAuth from '../../hooks/useAuth';

/**
 * Top dashboard navbar component.
 */
const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const { user, logout } = useAuth();

  return (
    <header style={styles.navbar} className="glass-panel">
      <div style={styles.leftSection}>
        <button style={styles.toggleBtn} onClick={toggleSidebar}>
          {isSidebarOpen ? '◀' : '▶'}
        </button>
        <span style={styles.brandTitle}>TaskSphere Workspace</span>
      </div>

      <div style={styles.rightSection}>
        <div style={styles.userInfo}>
          <span style={styles.userName}>{user?.name || 'User'}</span>
          <span style={styles.userRole}>{user?.role || 'USER'}</span>
        </div>
        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

const styles = {
  navbar: {
    height: '70px',
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    zIndex: 100,
    borderRadius: 0,
    borderBottom: '1px solid var(--border-color)',
    background: 'var(--glass-bg)',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: 'var(--radius-sm)',
    transition: 'var(--transition-fast)',
  },
  brandTitle: {
    fontFamily: 'var(--font-title)',
    fontWeight: '700',
    fontSize: '18px',
    letterSpacing: '-0.02em',
    color: '#ffffff',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    lineHeight: '1.2',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
  },
  userRole: {
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginTop: '2px',
  },
  logoutBtn: {
    padding: '8px 16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid var(--error)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--error)',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
  },
};

export default Navbar;
