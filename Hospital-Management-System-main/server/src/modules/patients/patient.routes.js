import express from 'express';
const router = express.Router();

import { createPatient, getPatients, getPatientById } from './patient.controller.js';
import { protect, authorize } from '../../middleware/auth.js';
import resolveTenant from '../../middleware/tenantResolver.js';

// Apply middleware
router.use(resolveTenant);
router.use(protect);

// Register patient
router.post(
  '/',
  authorize('RECEPTIONIST', 'HOSPITAL_ADMIN', 'SUPER_ADMIN'),
  createPatient
);

// Get all patients
router.get('/', getPatients);

// Get single patient
router.get('/:id', getPatientById);

export default router;