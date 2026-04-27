import VitalSchema from './vital.model.js';

/**
 * Record patient vitals
 */
export const createVital = async (req, res) => {
  try {
    const { patientId, bloodPressure, temperature, pulse, spO2, weight } = req.body;

    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: 'Patient ID is required',
      });
    }

    const tenantId = req.tenantId;
    const recordedBy = req.user._id;

    if (!tenantId) {
      return res.status(400).json({
        success: false,
        message: 'Tenant ID is required',
      });
    }

    const Vital = req.tenantDB.model('Vital', VitalSchema);

    // ✅ dynamic import (important)
    const PatientSchema = (await import('../patients/patient.model.js')).default;
    const Patient = req.tenantDB.model('Patient', PatientSchema);

    const patient = await Patient.findOne({ _id: patientId, tenantId });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    const newVital = await Vital.create({
      patientId,
      recordedBy,
      bloodPressure,
      temperature,
      pulse,
      spO2,
      weight,
      tenantId,
    });

    res.status(201).json({
      success: true,
      message: 'Vitals recorded successfully',
      data: newVital,
    });

  } catch (error) {
    console.error('Create vital error:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors,
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid patient ID format',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to record vitals',
      error: error.message,
    });
  }
};

/**
 * Get vitals history
 */
export const getVitalsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const tenantId = req.tenantId;

    if (!tenantId) {
      return res.status(400).json({
        success: false,
        message: 'Tenant ID is required',
      });
    }

    const Vital = req.tenantDB.model('Vital', VitalSchema);

    const PatientSchema = (await import('../patients/patient.model.js')).default;
    const Patient = req.tenantDB.model('Patient', PatientSchema);

    const patient = await Patient.findOne({ _id: patientId, tenantId });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    const vitals = await Vital.find({ patientId, tenantId })
      .populate('recordedBy', 'firstName lastName role')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: vitals,
      count: vitals.length,
    });

  } catch (error) {
    console.error('Get vitals by patient error:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid patient ID format',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to fetch vitals',
      error: error.message,
    });
  }
};