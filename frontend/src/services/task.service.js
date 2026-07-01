import api from './api';

/**
 * Fetch task documents list with optional status and priority query parameters.
 */
const getTasks = async (filters = {}) => {
  const response = await api.get('/tasks', { params: filters });
  return response.data; // ApiResponse shape: { success, message, data: { tasks } }
};

/**
 * Fetch a single task by database ID.
 */
const getTaskById = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

/**
 * Create a new task.
 */
const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

/**
 * Update an existing task's attributes.
 */
const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};

/**
 * Remove a task from the system.
 */
const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export default {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
