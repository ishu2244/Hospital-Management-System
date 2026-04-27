import mongoose from 'mongoose';

const PrescriptionSchema = new mongoose.Schema({
  prescriptionId: {
    type: String,
    unique: true,
    required: [true, 'Prescription ID is required'],
    index: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Patient ID is required'],
    index: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Doctor ID is required'],
  },
  diagnosis: {
    type: String,
    required: [true, 'Diagnosis is required'],
    trim: true,
  },
  medicines: [
    {
      name: {
        type: String,
        required: [true, 'Medicine name is required'],
        trim: true,
      },
      dosage: {
        type: String,
        required: [true, 'Dosage is required'],
        trim: true,
      },
      frequency: {
        type: String,
        required: [true, 'Frequency is required'],
        trim: true,
      },
      duration: {
        type: String,
        required: [true, 'Duration is required'],
        trim: true,
      },
      instructions: {
        type: String,
        trim: true,
      },
    },
  ],
  tenantId: {
    type: String,
    required: [true, 'Tenant ID is required'],
    index: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'DISPENSED'],
    default: 'PENDING',
    index: true,
  },
}, {
  timestamps: true,
});

// ✅ export default
export default PrescriptionSchema;