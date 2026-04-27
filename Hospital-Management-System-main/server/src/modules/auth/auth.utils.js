import jwt from 'jsonwebtoken';

/**
 * Generate JWT token
 */
const generateToken = (userId, email, role, tenantId) => {
  return jwt.sign(
    { id: userId, email, role, tenantId },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    {
      expiresIn: process.env.JWT_EXPIRE || '30d',
    }
  );
};

/**
 * Verify JWT token
 */
const verifyToken = (token) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET || 'your-secret-key-change-in-production'
  );
};

export { generateToken, verifyToken };