import express from 'express';
const router = express.Router();

import { createLabResult, getLabResultsByPatient } from './lab.controller.js';
import { protect, authorize } from '../../middleware/auth.js';
import resolveTenant from '../../middleware/tenantResolver.js';

// Apply middleware
router.use(resolveTenant);
router.use(protect);

// Create lab result
router.post(
  '/',
  authorize('LAB_TECHNICIAN', 'DOCTOR', 'HOSPITAL_ADMIN', 'SUPER_ADMIN'),
  createLabResult
);

// Get lab results by patient
router.get('/patient/:patientId', getLabResultsByPatient);

export default router;