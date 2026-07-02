import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../../controllers/task.controller.js';
import {
  createTaskValidator,
  updateTaskValidator,
  taskIdParamValidator,
} from '../../validators/task.validator.js';
import { validate } from '../../middleware/validate.middleware.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = Router();

// Protect all task endpoints: user must be authenticated
router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management operations (with RBAC enforcement)
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Complete project documentation
 *               description:
 *                 type: string
 *                 example: Draft the system architecture and flowcharts.
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED]
 *                 example: PENDING
 *               priority:
 *                 type: string
 *                 enum: [LOW, MEDIUM, HIGH]
 *                 example: MEDIUM
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-07-15T00:00:00.000Z
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input values
 *       401:
 *         description: Unauthorized
 *   get:
 *     summary: Retrieve list of tasks
 *     description: Admins retrieve all tasks. Standard users retrieve only tasks they own.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED]
 *         description: Filter tasks by completion status
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [LOW, MEDIUM, HIGH]
 *         description: Filter tasks by urgency priority
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router
  .route('/')
  .post(createTaskValidator, validate, createTask)
  .get(getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get details of a single task
 *     description: Standard users can only fetch tasks they own. Admins can fetch any task.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mongo Object ID of the task
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Ownership check failed)
 *       404:
 *         description: Task not found
 *   put:
 *     summary: Update an existing task
 *     description: Standard users can only edit tasks they own. Admins can edit any task.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mongo Object ID of the task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED]
 *               priority:
 *                 type: string
 *                 enum: [LOW, MEDIUM, HIGH]
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Task not found
 *   delete:
 *     summary: Delete a task
 *     description: Standard users can only delete tasks they own. Admins can delete any task.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mongo Object ID of the task
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Task not found
 */
router
  .route('/:id')
  .get(taskIdParamValidator, validate, getTaskById)
  .put(updateTaskValidator, validate, updateTask)
  .delete(taskIdParamValidator, validate, deleteTask);

export default router;

