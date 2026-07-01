import React from 'react';
import TaskCard from './TaskCard';

/**
 * List container to map task documents into responsive card grid structures.
 */
const TaskList = ({ tasks = [], loading = false, onEditClick, onDeleteClick }) => {
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Fetching tasks board data...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div style={styles.emptyContainer} className="glass-panel">
        <span style={styles.emptyIcon}>📋</span>
        <h3 style={styles.emptyTitle}>No tasks found</h3>
        <p style={styles.emptySubtitle}>
          Try modifying search status filters or create a new task to get started.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.grid}>
      {tasks.map((task) => (
        <div key={task._id} style={styles.gridItem}>
          <TaskCard task={task} onEdit={onEditClick} onDelete={onDeleteClick} />
        </div>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
    width: '100%',
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 24px',
    gap: '16px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(255, 255, 255, 0.05)',
    borderTop: '4px solid var(--primary)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
  },
  emptyContainer: {
    padding: '60px 40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  emptyIcon: {
    fontSize: '48px',
  },
  emptyTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#ffffff',
  },
  emptySubtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    maxWidth: '320px',
  },
};

// Add standard inline CSS keyframe spinner rule to head document for animation
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default TaskList;
