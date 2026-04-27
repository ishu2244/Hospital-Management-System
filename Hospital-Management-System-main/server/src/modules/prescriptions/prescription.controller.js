import PrescriptionSchema from './prescription.model.js';

/**
 * Create a new prescription
 */
export const createPrescription = async (req, res) => {
  try {
    const { patientId, diagnosis, medicines } = req.body;

    if (!patientId || !diagnosis || !medicines || !Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: patientId, diagnosis, medicines (array)',
      });
    }

    for (const medicine of medicines) {
      if (!medicine.name || !medicine.dosage || !medicine.frequency || !medicine.duration) {
        return res.status(400).json({
          success: false,
          message: 'Each medicine must have: name, dosage, frequency, duration',
        });
      }
    }

    const tenantId = req.tenantId;
    const doctorId = req.user._id;

    if (!tenantId) {
      return res.status(400).json({
        success: false,
        message: 'Tenant ID is required',
      });
    }

    if (!['DOCTOR', 'HOSPITAL_ADMIN', 'SUPER_ADMIN'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Only doctors can create prescriptions',
      });
    }

    const Prescription = req.tenantDB.model('Prescription', PrescriptionSchema);

    // ✅ FIX: import instead of require
    const PatientSchema = (await import('../patients/patient.model.js')).default;
    const Patient = req.tenantDB.model('Patient', PatientSchema);

    const patient = await Patient.findOne({ _id: patientId, tenantId });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    const count = await Prescription.countDocuments({ tenantId });
    const prescriptionId = `${tenantId}-RX-${count + 1}`;

    const newPrescription = await Prescription.create({
      prescriptionId,
      patientId,
      doctorId,
      diagnosis,
      medicines,
      tenantId,
    });

    res.status(201).json({
      success: true,
      message: 'Prescription created successfully',
      data: newPrescription,
    });

  } catch (error) {
    console.error('Create prescription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create prescription',
      error: error.message,
    });
  }
};

/**
 * Get prescriptions
 */
export const getPrescriptionsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const tenantId = req.tenantId;

    const Prescription = req.tenantDB.model('Prescription', PrescriptionSchema);

    const PatientSchema = (await import('../patients/patient.model.js')).default;
    const Patient = req.tenantDB.model('Patient', PatientSchema);

    const patient = await Patient.findOne({ _id: patientId, tenantId });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    const prescriptions = await Prescription.find({ patientId, tenantId })
      .populate('doctorId', 'firstName lastName role')
      .populate('patientId', 'firstName lastName patientId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: prescriptions,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch prescriptions',
    });
  }
};

/**
 * Dispense
 */
export const dispensePrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const tenantId = req.tenantId;

    const Prescription = req.tenantDB.model('Prescription', PrescriptionSchema);

    const prescription = await Prescription.findOne({ _id: id, tenantId });

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: 'Prescription not found',
      });
    }

    if (prescription.status === 'DISPENSED') {
      return res.status(400).json({
        success: false,
        message: 'Already dispensed',
      });
    }

    prescription.status = 'DISPENSED';
    await prescription.save();

    res.status(200).json({
      success: true,
      message: 'Dispensed successfully',
      data: prescription,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to dispense',
    });
  }
};