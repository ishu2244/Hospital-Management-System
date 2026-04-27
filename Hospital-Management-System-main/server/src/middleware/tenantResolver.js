import { getTenantDB } from '../config/multiTenantDB.js';

const resolveTenant = async (req, res, next) => {
  try {
    const tenantId = req.headers['x-tenant-id'];

    if (!tenantId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing x-tenant-id header. Cannot identify Hospital.' 
      });
    }

    const tenantDB = await getTenantDB(tenantId);

    req.tenantDB = tenantDB;
    req.tenantId = tenantId;

    next();
  } catch (error) {
    console.error('Tenant Resolution Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Database Connection Error' 
    });
  }
};

export default resolveTenant;