import React from 'react';
import useAuth from '../../hooks/useAuth';
import { formatDate } from '../../utils/formatters';

/**
 * Task card visual container showing metrics and action buttons.
 */
const TaskCard = ({ task, onEdit, onDelete }) => {
  const { user } = useAuth();

  // Color mappings for task status
  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return { bg: 'rgba(16, 185, 129, 0.1)', border: 'var(--success)', text: 'var(--success)' };
      case 'IN_PROGRESS':
        return { bg: 'rgba(245, 158, 11, 0.1)', border: 'var(--warning)', text: 'var(--warning)' };
      case 'PENDING':
      default:
        return { bg: 'rgba(99, 102, 241, 0.1)', border: 'var(--primary)', text: 'var(--primary)' };
    }
  };

  // Color mappings for task priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH':
        return 'var(--error)';
      case 'MEDIUM':
        return 'var(--warning)';
      case 'LOW':
      default:
        return 'var(--success)';
    }
  };

  const statusStyle = getStatusColor(task.status);
  const priorityColor = getPriorityColor(task.priority);

  // Authorize modifications: User must be ADMIN, or User must be the Owner of the task
  const isOwner = task.owner?._id ? task.owner._id === user?.id : task.owner === user?.id;
  const canModify = user?.role === 'ADMIN' || isOwner;

  return (
    <div style={styles.card} className="glass-panel glow-hover">
      <div style={styles.header}>
        <span
          style={{
            ...styles.priorityIndicator,
            backgroundColor: priorityColor,
          }}
          title={`Priority: ${task.priority}`}
        />
        <span
          style={{
            ...styles.statusBadge,
            backgroundColor: statusStyle.bg,
            color: statusStyle.text,
            borderColor: statusStyle.border,
          }}
        >
          {task.status}
        </span>
      </div>

      <h3 style={styles.title}>{task.title}</h3>
      <p style={styles.description}>{task.description || 'No description provided.'}</p>

      <div style={styles.meta}>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>Due Date:</span>
          <span style={styles.metaValue}>{task.dueDate ? formatDate(task.dueDate) : 'No due date'}</span>
        </div>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>Owner:</span>
          <span style={styles.metaValue}>{task.owner?.name || 'Unknown'}</span>
        </div>
      </div>

      {canModify && (
        <div style={styles.actions}>
          <button style={styles.editBtn} onClick={() => onEdit(task)}>
            Edit
          </button>
          <button style={styles.deleteBtn} onClick={() => onDelete(task._id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    height: '100%',
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priorityIndicator: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },
  statusBadge: {
    padding: '4px 10px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '11px',
    fontWeight: '700',
    border: '1px solid',
    letterSpacing: '0.05em',
  },
  title: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#ffffff',
  },
  description: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    flexGrow: 1,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '12px',
  },
  metaItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
  },
  metaLabel: {
    color: 'var(--text-muted)',
    fontWeight: '600',
  },
  metaValue: {
    color: 'var(--text-secondary)',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '8px',
  },
  editBtn: {
    flex: 1,
    padding: '8px',
    backgroundColor: 'transparent',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-primary)',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
    ':hover': {
      borderColor: 'var(--primary)',
    },
  },
  deleteBtn: {
    flex: 1,
    padding: '8px',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--error)',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
  },
};

export default TaskCard;
