import { db } from '../lib/db';
import fs from 'fs';
import path from 'path';

async function runMigration() {
  try {
    console.log('[v0] Starting database migration...');
    
    const sqlFile = path.join(__dirname, '01-init-database.sql');
    const sql = fs.readFileSync(sqlFile, 'utf-8');
    
    // Split and execute statements
    const statements = sql.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await db.query(statement);
        console.log('[v0] Executed:', statement.substring(0, 50) + '...');
      }
    }
    
    console.log('[v0] Migration completed successfully!');
  } catch (error) {
    console.error('[v0] Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
