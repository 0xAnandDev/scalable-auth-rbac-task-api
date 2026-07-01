import React from 'react';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  // Standard mock stats for visual demonstration (business logic not implemented yet)
  const stats = [
    { title: 'Total Tasks', value: 12, color: 'var(--primary)', shadow: 'var(--shadow-glow)' },
    { title: 'In Progress', value: 3, color: 'var(--warning)', shadow: 'none' },
    { title: 'Completed', value: 8, color: 'var(--success)', shadow: 'none' },
    { title: 'Pending Approval', value: 1, color: 'var(--error)', shadow: 'none' },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome back, {user?.name || 'User'}!</h1>
        <p style={styles.subtitle}>Here is an overview of your current task metrics and session parameters.</p>
      </header>

      {/* Grid containing metrics stat cards */}
      <section style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <div
            key={idx}
            style={{ ...styles.statCard, borderLeft: `4px solid ${stat.color}`, boxShadow: stat.shadow }}
            className="glass-panel glow-hover"
          >
            <h3 style={styles.statTitle}>{stat.title}</h3>
            <p style={{ ...styles.statValue, color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Profile & Role Access authorization info */}
      <section style={styles.infoSection} className="glass-panel">
        <h2 style={styles.sectionTitle}>Identity & RBAC Configuration</h2>
        <div style={styles.infoGrid}>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Email Account:</span>
            <span style={styles.infoValue}>{user?.email || 'N/A'}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Assigned Role:</span>
            <span
              style={{
                ...styles.roleBadge,
                backgroundColor: user?.role === 'ADMIN' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                color: user?.role === 'ADMIN' ? 'var(--primary)' : 'var(--success)',
                border: user?.role === 'ADMIN' ? '1px solid var(--primary)' : '1px solid var(--success)',
              }}
            >
              {user?.role || 'USER'}
            </span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Access Privilege:</span>
            <span style={styles.infoValue}>
              {user?.role === 'ADMIN'
                ? 'Full system administrative access. Allowed to read, create, update, and delete all user logs.'
                : 'Standard access. Allowed to manage and view only your owned tasks.'}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  header: {
    marginBottom: '8px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: 'var(--text-secondary)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  },
  statCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  statTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  statValue: {
    fontSize: '44px',
    fontWeight: '800',
    lineHeight: '1',
  },
  infoSection: {
    padding: '32px',
    marginTop: '12px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '24px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '12px',
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  infoLabel: {
    width: '140px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
  },
  infoValue: {
    fontSize: '15px',
    color: 'var(--text-primary)',
  },
  roleBadge: {
    padding: '4px 12px',
    borderRadius: 'var(--radius-full)',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.05em',
  },
};

export default Dashboard;
