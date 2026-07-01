import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

/**
 * Layout shell for authentication pages (Login / Register).
 * Redirects to dashboard if user is already authenticated.
 */
const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  // If already authenticated, redirect user immediately to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div style={styles.container}>
      {/* Decorative ambient background glows */}
      <div style={styles.glowTop}></div>
      <div style={styles.glowBottom}></div>

      <div style={styles.card} className="glass-panel animate-fade-in">
        <div style={styles.header}>
          <span style={styles.logoIcon}>🛡️</span>
          <h2 style={styles.title}>TaskSphere</h2>
          <p style={styles.subtitle}>Scalable RBAC Task Management</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
    background: 'var(--bg-primary)',
  },
  glowTop: {
    position: 'absolute',
    top: '-10%',
    right: '-10%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'var(--primary)',
    opacity: 0.1,
    filter: 'blur(100px)',
    pointerEvents: 'none',
  },
  glowBottom: {
    position: 'absolute',
    bottom: '-10%',
    left: '-10%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: '#10b981',
    opacity: 0.08,
    filter: 'blur(100px)',
    pointerEvents: 'none',
  },
  card: {
    width: '100%',
    maxWidth: '450px',
    padding: '40px',
    position: 'relative',
    zIndex: 2,
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logoIcon: {
    fontSize: '40px',
    display: 'inline-block',
    marginBottom: '12px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
  },
};

export default AuthLayout;
