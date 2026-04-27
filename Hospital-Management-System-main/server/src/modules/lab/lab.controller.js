import LabSchema from './lab.model.js';
import PatientSchema from '../patients/patient.model.js';

/**
 * Create a new lab result
 */
const createLabResult = async (req, res) => {
  try {
    const { patientId, testName, result, notes, fileData, fileType, fileName } = req.body;

    if (!patientId || !testName || !result) {
      return res.status(400).json({
        success: false,
        message: 'Patient ID, test name, and result are required',
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

    const Lab = req.tenantDB.model('Lab', LabSchema);
    const Patient = req.tenantDB.model('Patient', PatientSchema);

    const patient = await Patient.findOne({ _id: patientId, tenantId });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    const newLabResult = await Lab.create({
      patientId,
      recordedBy,
      testName,
      result,
      notes: notes || '',
      fileData: fileData || null,
      fileType: fileType || null,
      fileName: fileName || null,
      tenantId,
    });

    await newLabResult.populate('recordedBy', 'firstName lastName role');

    res.status(201).json({
      success: true,
      message: 'Lab result recorded successfully',
      data: newLabResult,
    });
  } catch (error) {
    console.error('Create lab result error:', error);

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
      message: 'Failed to create lab result',
      error: error.message,
    });
  }
};

/**
 * Get lab results by patient
 */
const getLabResultsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const tenantId = req.tenantId;

    if (!tenantId) {
      return res.status(400).json({
        success: false,
        message: 'Tenant ID is required',
      });
    }

    const Lab = req.tenantDB.model('Lab', LabSchema);
    const Patient = req.tenantDB.model('Patient', PatientSchema);

    const patient = await Patient.findOne({ _id: patientId, tenantId });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    const labResults = await Lab.find({ patientId, tenantId })
      .populate('recordedBy', 'firstName lastName role')
      .populate('patientId', 'firstName lastName patientId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: labResults,
      count: labResults.length,
    });
  } catch (error) {
    console.error('Get lab results by patient error:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid patient ID format',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to fetch lab results',
      error: error.message,
    });
  }
};

export {
  createLabResult,
  getLabResultsByPatient,
};