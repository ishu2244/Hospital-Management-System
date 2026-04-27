import express from 'express';
const router = express.Router();

import { register, login, getMe, registerStaff } from './auth.controller.js';
import { protect, authorize } from '../../middleware/auth.js';
import resolveTenant from '../../middleware/tenantResolver.js';

// Apply tenant resolution middleware
router.use(resolveTenant);

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected
router.get('/me', protect, getMe);
router.post('/register-staff', protect, authorize('HOSPITAL_ADMIN'), registerStaff);

export default router;