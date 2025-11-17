// Database abstraction layer supporting both Neon (PostgreSQL) and local MySQL
import { neon } from '@neondatabase/serverless';
import mysql from 'mysql2/promise';

type DBType = 'neon' | 'mysql' | 'auto';

class DatabaseClient {
  private dbType: DBType = 'auto';
  private neonClient: any = null;
  private mysqlPool: any = null;

  async initialize() {
    if (this.dbType !== 'auto') return;

    // Try Neon first (production/Vercel)
    if (process.env.DATABASE_URL?.includes('neon')) {
      try {
        this.neonClient = neon(process.env.DATABASE_URL);
        this.dbType = 'neon';
        console.log('[v0] Connected to Neon (PostgreSQL)');
        return;
      } catch (error) {
        console.log('[v0] Neon connection failed, trying MySQL');
      }
    }

    // Fall back to MySQL (local development)
    if (process.env.MYSQL_HOST) {
      try {
        this.mysqlPool = await mysql.createPool({
          host: process.env.MYSQL_HOST || 'localhost',
          user: process.env.MYSQL_USER || 'root',
          password: process.env.MYSQL_PASSWORD || '',
          database: process.env.MYSQL_DATABASE || 'commodities_db',
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });
        this.dbType = 'mysql';
        console.log('[v0] Connected to MySQL');
        return;
      } catch (error) {
        console.log('[v0] MySQL connection failed:', error);
      }
    }

    // Default to Neon if DATABASE_URL exists
    if (process.env.DATABASE_URL) {
      this.neonClient = neon(process.env.DATABASE_URL);
      this.dbType = 'neon';
      console.log('[v0] Using Neon as fallback');
    }
  }

  async query(sql: string, params: any[] = []) {
    await this.initialize();

    if (this.dbType === 'neon' && this.neonClient) {
      return this.neonClient(sql, params);
    }

    if (this.dbType === 'mysql' && this.mysqlPool) {
      const connection = await this.mysqlPool.getConnection();
      try {
        const [rows] = await connection.execute(sql, params);
        return rows;
      } finally {
        connection.release();
      }
    }

    throw new Error('No database connection available');
  }
}

export const db = new DatabaseClient();
