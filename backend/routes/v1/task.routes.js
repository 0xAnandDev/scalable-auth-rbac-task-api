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

router
  .route('/')
  .post(createTaskValidator, validate, createTask)
  .get(getTasks);

router
  .route('/:id')
  .get(taskIdParamValidator, validate, getTaskById)
  .put(updateTaskValidator, validate, updateTask)
  .delete(taskIdParamValidator, validate, deleteTask);

export default router;
