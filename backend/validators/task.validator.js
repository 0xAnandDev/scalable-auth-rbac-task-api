import { body, param } from 'express-validator';
import { TASK_STATUS, TASK_PRIORITY } from '../utils/constants.js';

/**
 * Validation schema rules for creating a task.
 */
export const createTaskValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Task title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
    
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
    
  body('status')
    .optional()
    .isIn(Object.values(TASK_STATUS))
    .withMessage(`Status must be one of: ${Object.values(TASK_STATUS).join(', ')}`),
    
  body('priority')
    .optional()
    .isIn(Object.values(TASK_PRIORITY))
    .withMessage(`Priority must be one of: ${Object.values(TASK_PRIORITY).join(', ')}`),
    
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid ISO8601 date string')
    .toDate(),
];

/**
 * Validation schema rules for updating a task.
 */
export const updateTaskValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid Task Mongo ID format'),

  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Task title cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
    
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
    
  body('status')
    .optional()
    .isIn(Object.values(TASK_STATUS))
    .withMessage(`Status must be one of: ${Object.values(TASK_STATUS).join(', ')}`),
    
  body('priority')
    .optional()
    .isIn(Object.values(TASK_PRIORITY))
    .withMessage(`Priority must be one of: ${Object.values(TASK_PRIORITY).join(', ')}`),
    
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid ISO8601 date string')
    .toDate(),
];

/**
 * Validation rules for task ID parameters.
 */
export const taskIdParamValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid Task Mongo ID format'),
];
