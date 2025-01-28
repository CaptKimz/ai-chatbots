import { Client } from 'pg';
import { config } from '../config/config';

const connectionUrl = `postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`;

const client = new Client({
  connectionString: connectionUrl,
  ssl: config.environment === 'production' ? { rejectUnauthorized: false } : undefined,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => {
    console.error('Failed to connect to PostgreSQL database:', err);
    process.exit(1);
  });

export default client;
