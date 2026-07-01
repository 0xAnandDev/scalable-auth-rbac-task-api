import taskService from '../services/task.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Controller to handle creating a new task.
 */
export const createTask = asyncHandler(async (req, res) => {
  const taskData = req.body;
  const userId = req.user._id;

  const task = await taskService.createTask(taskData, userId);

  res.status(201).json(
    new ApiResponse(201, { task }, 'Task created successfully')
  );
});

/**
 * Controller to handle retrieving all tasks with optional filters.
 */
export const getTasks = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userRole = req.user.role;
  const { status, priority } = req.query;

  const tasks = await taskService.getTasks(userId, userRole, { status, priority });

  res.status(200).json(
    new ApiResponse(200, { tasks }, 'Tasks retrieved successfully')
  );
});

/**
 * Controller to handle fetching a single task by its Mongo ID.
 */
export const getTaskById = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user._id;
  const userRole = req.user.role;

  const task = await taskService.getTaskById(taskId, userId, userRole);

  res.status(200).json(
    new ApiResponse(200, { task }, 'Task retrieved successfully')
  );
});

/**
 * Controller to handle modifying a task's fields.
 */
export const updateTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const updateData = req.body;
  const userId = req.user._id;
  const userRole = req.user.role;

  const task = await taskService.updateTask(taskId, updateData, userId, userRole);

  res.status(200).json(
    new ApiResponse(200, { task }, 'Task updated successfully')
  );
});

/**
 * Controller to handle removing a task.
 */
export const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user._id;
  const userRole = req.user.role;

  const result = await taskService.deleteTask(taskId, userId, userRole);

  res.status(200).json(
    new ApiResponse(200, result, 'Task deleted successfully')
  );
});
export default {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
