import React, { useState, useEffect } from 'react';

/**
 * Task creation & editing form sheet.
 */
const TaskForm = ({ initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('PENDING');
  const [priority, setPriority] = useState('MEDIUM');
  const [dueDate, setDueDate] = useState('');
  
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Prepopulate form if editing task
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setStatus(initialData.status || 'PENDING');
      setPriority(initialData.priority || 'MEDIUM');
      setDueDate(
        initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ''
      );
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    setError('');
    setSubmitting(true);

    const taskData = {
      title,
      description,
      status,
      priority,
      dueDate: dueDate || undefined,
    };

    const res = await onSubmit(taskData);
    if (!res.success) {
      setError(res.message || 'Error occurred while saving task');
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {error && <div style={styles.errorAlert}>{error}</div>}

      <div style={styles.inputGroup}>
        <label style={styles.label}>Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write title..."
          style={styles.input}
          required
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write task details..."
          style={styles.textarea}
          rows="4"
        />
      </div>

      <div style={styles.row}>
        <div style={{ ...styles.inputGroup, flex: 1 }}>
          <label style={styles.label}>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={styles.select}>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div style={{ ...styles.inputGroup, flex: 1 }}>
          <label style={styles.label}>Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} style={styles.select}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.actions}>
        <button type="button" onClick={onCancel} style={styles.cancelBtn} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" style={styles.submitBtn} disabled={submitting}>
          {submitting ? 'Saving...' : initialData ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  errorAlert: {
    padding: '12px 16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid var(--error)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--error)',
    fontSize: '14px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  input: {
    padding: '10px 14px',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
  },
  textarea: {
    padding: '10px 14px',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
  },
  row: {
    display: 'flex',
    gap: '16px',
  },
  select: {
    padding: '10px 14px',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '10px',
  },
  cancelBtn: {
    padding: '10px 18px',
    backgroundColor: 'transparent',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-secondary)',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  submitBtn: {
    padding: '10px 20px',
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default TaskForm;
