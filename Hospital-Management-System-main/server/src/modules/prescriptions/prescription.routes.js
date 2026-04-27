import express from 'express';
const router = express.Router();

import {
  createPrescription,
  getPrescriptionsByPatient,
  dispensePrescription
} from './prescription.controller.js';

import { protect, authorize } from '../../middleware/auth.js';
import resolveTenant from '../../middleware/tenantResolver.js';

// Apply middleware
router.use(resolveTenant);
router.use(protect);

// Create prescription
router.post(
  '/',
  authorize('DOCTOR', 'HOSPITAL_ADMIN', 'SUPER_ADMIN'),
  createPrescription
);

// Get prescriptions by patient
router.get('/patient/:patientId', getPrescriptionsByPatient);

// Dispense prescription
router.patch(
  '/:id/dispense',
  authorize('PHARMACIST', 'HOSPITAL_ADMIN', 'SUPER_ADMIN'),
  dispensePrescription
);

export default router;