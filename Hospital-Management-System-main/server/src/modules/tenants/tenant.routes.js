import express from 'express';
const router = express.Router();

import { registerHospital } from './tenant.controller.js';

// Public route
router.post('/register', registerHospital);

export default router;