import { connectDatabase } from './config/database.js';
import { app, port } from './server.js';

try {
  await connectDatabase();
  console.log('Connected to octofit_db');
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening on port ${port}`);
  });
} catch (error) {
  console.error('Unable to start the OctoFit API:', error);
  process.exitCode = 1;
}