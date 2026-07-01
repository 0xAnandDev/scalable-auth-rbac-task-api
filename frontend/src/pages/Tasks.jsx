import React, { useState, useEffect } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';

const Tasks = () => {
  const { tasks, loading, error, fetchTasks, addTask, editTask, removeTask } = useTasks();
  
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Filters state
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // Fetch tasks on component load or filter change
  useEffect(() => {
    fetchTasks({
      status: statusFilter || undefined,
      priority: priorityFilter || undefined,
    });
  }, [fetchTasks, statusFilter, priorityFilter]);

  const handleCreateClick = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleFormSubmit = async (taskData) => {
    let result;
    if (editingTask) {
      result = await editTask(editingTask._id, taskData);
    } else {
      result = await addTask(taskData);
    }

    if (result.success) {
      setFormOpen(false);
      setEditingTask(null);
    }
    return result;
  };

  const handleFormCancel = () => {
    setFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Tasks Board</h1>
          <p style={styles.subtitle}>Create, review, and manage collaborative team tasks here.</p>
        </div>
        <button style={styles.createBtn} onClick={handleCreateClick}>
          <span>+</span> Create Task
        </button>
      </header>

      {/* Filter panel bar */}
      <section style={styles.filterBar} className="glass-panel">
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Priority</label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
      </section>

      {/* Task list panel */}
      {error && <div style={styles.errorMsg}>{error}</div>}

      <TaskList
        tasks={tasks}
        loading={loading}
        onEditClick={handleEditClick}
        onDeleteClick={removeTask}
      />

      {/* Task form modal / slide panel */}
      {formOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent} className="glass-panel animate-fade-in">
            <h2 style={styles.modalTitle}>
              {editingTask ? 'Edit Task Details' : 'Create New Task'}
            </h2>
            <TaskForm
              initialData={editingTask}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '15px',
    color: 'var(--text-secondary)',
  },
  createBtn: {
    padding: '12px 20px',
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'var(--transition-fast)',
  },
  filterBar: {
    padding: '16px 24px',
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  filterLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
  },
  filterSelect: {
    padding: '8px 14px',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
  },
  errorMsg: {
    padding: '16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid var(--error)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--error)',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 7, 13, 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '16px',
    backdropFilter: 'blur(8px)',
  },
  modalContent: {
    width: '100%',
    maxWidth: '500px',
    padding: '32px',
    backgroundColor: 'var(--bg-secondary)',
  },
  modalTitle: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '24px',
  },
};

export default Tasks;
