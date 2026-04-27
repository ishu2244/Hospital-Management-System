import { getTenantDB } from '../../config/multiTenantDB.js';
import UserSchema from '../auth/user.model.js';
import crypto from 'crypto';

/**
 * Register a new hospital (tenant)
 */
export const registerHospital = async (req, res) => {
  try {
    const { hospitalName, address, adminName, adminEmail, password, licenseNumber } = req.body;

    // Validate required fields
    if (!hospitalName || !address || !adminName || !adminEmail || !password || !licenseNumber) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: hospitalName, address, adminName, adminEmail, password, licenseNumber',
      });
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(adminEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // Generate tenantId
    const baseTenantId = hospitalName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');

    const randomSuffix = crypto.randomBytes(4).toString('hex');
    const tenantId = `${baseTenantId}_${randomSuffix}`;

    // Split name
    const nameParts = adminName.trim().split(/\s+/);
    const firstName = nameParts[0] || adminName;
    const lastName = nameParts.slice(1).join(' ') || 'Admin';

    // DB connection
    const tenantDB = await getTenantDB(tenantId);

    const User = tenantDB.model('User', UserSchema);

    const existingUser = await User.findOne({ email: adminEmail.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    const adminUser = await User.create({
      firstName,
      lastName,
      email: adminEmail.toLowerCase(),
      password,
      role: 'HOSPITAL_ADMIN',
      tenantId,
    });

    const userResponse = adminUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'Hospital registered successfully',
      data: {
        tenantId,
        hospitalName,
        address,
        licenseNumber,
        admin: userResponse,
      },
    });

  } catch (error) {
    console.error('Hospital registration error:', error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Hospital registration failed',
      error: error.message,
    });
  }
};