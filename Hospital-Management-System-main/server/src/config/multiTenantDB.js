import mongoose from 'mongoose';

const connectionMap = new Map();

const getTenantDB = async (tenantId) => {
  const existingConn = connectionMap.get(tenantId);

  if (existingConn) {
    if (existingConn.readyState === 1) {
      return existingConn;
    }
    console.log(`⚠️ Detected stale connection for ${tenantId}. Reconnecting...`);
    connectionMap.delete(tenantId);
  }

  const dbName = tenantId.startsWith('phc_') ? tenantId : `phc_${tenantId}`;
  const mongoURI = process.env.MONGODB_URI;

  try {
    const conn = mongoose.createConnection(mongoURI, {
      dbName,
      autoIndex: true,
      maxPoolSize: 10,
    });

    conn.on('connected', () => console.log(`✅ Connected to Tenant DB: ${dbName}`));

    conn.on('error', (err) => {
      console.error(`❌ Connection Error [${dbName}]:`, err);
      connectionMap.delete(tenantId);
    });

    conn.on('disconnected', () => {
      console.warn(`🔌 Disconnected from [${dbName}]`);
      connectionMap.delete(tenantId);
    });

    await conn.asPromise();

    connectionMap.set(tenantId, conn);
    return conn;

  } catch (error) {
    console.error(`❌ Critical Error connecting to ${dbName}:`, error);
    throw error;
  }
};

export { getTenantDB };