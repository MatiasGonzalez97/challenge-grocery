import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const registerRules = [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const loginRules = [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const itemRules = [
  body('name').notEmpty().withMessage('Item name is required'),
  body('quantity')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('Quantity must be a positive integer'),
  body('store').optional().isString(),
];