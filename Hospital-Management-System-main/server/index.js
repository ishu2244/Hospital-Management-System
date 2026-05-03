import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";

// Import Middleware
import resolveTenant from './src/middleware/tenantResolver.js';

// Import Routes
import authRoutes from './src/modules/auth/auth.routes.js';
import patientRoutes from './src/modules/patients/patient.routes.js';
import vitalRoutes from './src/modules/vitals/vital.routes.js';
import prescriptionRoutes from './src/modules/prescriptions/prescription.routes.js';
import tenantRoutes from './src/modules/tenants/tenant.routes.js';
import statsRoutes from './src/modules/stats/stats.routes.js';
import labRoutes from './src/modules/lab/lab.routes.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: 'https://hospital-management-system-smoky-omega.vercel.app',
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('PHC Multi-Tenant API is Running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/vitals', vitalRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/lab', labRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});