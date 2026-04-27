import { verifyToken } from '../modules/auth/auth.utils.js';
import UserSchema from '../modules/auth/user.model.js';

/**
 * Middleware to protect routes - verifies JWT token
 */
const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }

    try {
      const decoded = verifyToken(token);

      if (req.tenantId && decoded.tenantId !== req.tenantId) {
        return res.status(403).json({
          success: false,
          message: 'Token tenant mismatch',
        });
      }

      if (!req.tenantDB) {
        return res.status(500).json({
          success: false,
          message: 'Tenant database connection not found',
        });
      }

      const User = req.tenantDB.model('User', UserSchema);

      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found',
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication error',
    });
  }
};

/**
 * Role-based authorization middleware
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized`,
      });
    }

    next();
  };
};

export { protect, authorize };