import { useState, useCallback } from 'react';
import taskService from '../services/task.service';

/**
 * Custom React hook managing local task state synchronizations and requests.
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Retrieve list of task items based on optional status/priority filters.
   */
  const fetchTasks = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await taskService.getTasks(filters);
      if (res.success) {
        setTasks(res.data.tasks);
      } else {
        setError(res.message || 'Failed to load tasks');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred while loading tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Submit and add a new task item.
   */
  const addTask = async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await taskService.createTask(taskData);
      if (res.success && res.data.task) {
        setTasks((prev) => [res.data.task, ...prev]);
        return { success: true, task: res.data.task };
      }
      return { success: false, message: res.message || 'Failed to create task' };
    } catch (err) {
      const msg = err.response?.data?.message || 'Error creating task';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Modify properties of an existing task item.
   */
  const editTask = async (id, taskData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await taskService.updateTask(id, taskData);
      if (res.success && res.data.task) {
        setTasks((prev) =>
          prev.map((t) => (t._id === id ? res.data.task : t))
        );
        return { success: true, task: res.data.task };
      }
      return { success: false, message: res.message || 'Failed to update task' };
    } catch (err) {
      const msg = err.response?.data?.message || 'Error updating task';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a task item.
   */
  const removeTask = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await taskService.deleteTask(id);
      if (res.success) {
        setTasks((prev) => prev.filter((t) => t._id !== id));
        return { success: true };
      }
      return { success: false, message: res.message || 'Failed to delete task' };
    } catch (err) {
      const msg = err.response?.data?.message || 'Error deleting task';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    editTask,
    removeTask,
  };
};

export default useTasks;
