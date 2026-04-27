import express from 'express';
const router = express.Router();

import { createVital, getVitalsByPatient } from './vital.controller.js';
import { protect, authorize } from '../../middleware/auth.js';
import resolveTenant from '../../middleware/tenantResolver.js';

// Apply middleware
router.use(resolveTenant);
router.use(protect);

// Record vitals
router.post(
  '/',
  authorize('NURSE', 'DOCTOR', 'HOSPITAL_ADMIN', 'SUPER_ADMIN'),
  createVital
);

// Get vitals by patient
router.get('/patient/:patientId', getVitalsByPatient);

export default router;