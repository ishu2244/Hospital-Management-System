import express from 'express';
const router = express.Router();

import { getDashboardStats } from './stats.controller.js';
import { protect } from '../../middleware/auth.js';
import resolveTenant from '../../middleware/tenantResolver.js';

// Apply middleware
router.use(resolveTenant);
router.use(protect);

// Dashboard route
router.get('/dashboard', getDashboardStats);

export default router;