import Task from '../models/Task.js';
import ApiError from '../utils/ApiError.js';
import { ROLES } from '../utils/constants.js';

/**
 * Service to create a new task.
 */
const createTask = async (taskData, userId) => {
  const task = await Task.create({
    ...taskData,
    owner: userId,
  });
  return task;
};

/**
 * Service to retrieve tasks based on user role and filters.
 */
const getTasks = async (userId, userRole, queryFilters = {}) => {
  const filter = {};

  // If regular USER role, restrict access to only their tasks
  if (userRole !== ROLES.ADMIN) {
    filter.owner = userId;
  }

  // Handle dynamic statuses filters if specified
  if (queryFilters.status) {
    filter.status = queryFilters.status;
  }

  // Handle priority filter if specified
  if (queryFilters.priority) {
    filter.priority = queryFilters.priority;
  }

  const tasks = await Task.find(filter).populate('owner', 'name email role');
  return tasks;
};

/**
 * Service to fetch a single task by ID.
 */
const getTaskById = async (taskId, userId, userRole) => {
  const task = await Task.findById(taskId).populate('owner', 'name email role');
  
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  // Ownership check: non-admins can only see their own tasks
  if (userRole !== ROLES.ADMIN && task.owner._id.toString() !== userId.toString()) {
    throw new ApiError(403, 'Access denied: You do not own this task');
  }

  return task;
};

/**
 * Service to update an existing task.
 */
const updateTask = async (taskId, updateData, userId, userRole) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  // Ownership check
  if (userRole !== ROLES.ADMIN && task.owner.toString() !== userId.toString()) {
    throw new ApiError(403, 'Access denied: You cannot update this task');
  }

  const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
    new: true,
    runValidators: true,
  }).populate('owner', 'name email role');

  return updatedTask;
};

/**
 * Service to delete a task.
 */
const deleteTask = async (taskId, userId, userRole) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  // Ownership check
  if (userRole !== ROLES.ADMIN && task.owner.toString() !== userId.toString()) {
    throw new ApiError(403, 'Access denied: You cannot delete this task');
  }

  await task.deleteOne();
  return { id: taskId };
};

export default {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
