import { db } from './db';
import bcrypt from 'bcryptjs';

export interface AuthUser {
  id: string;
  email: string;
  role: 'manager' | 'store_keeper';
  name: string;
}

// Mock data for demo (replace with real DB queries)
export const mockUsers: Record<string, AuthUser & { password: string }> = {
  'manager@sloozify.com': {
    id: '1',
    email: 'manager@sloozify.com',
    password: 'manager123',
    role: 'manager',
    name: 'John Manager',
  },
  'keeper@sloozify.com': {
    id: '2',
    email: 'keeper@sloozify.com',
    password: 'keeper123',
    role: 'store_keeper',
    name: 'Sarah Keeper',
  },
};

export async function authenticateUser(
  email: string,
  password: string
): Promise<AuthUser | null> {
  // Try database first
  try {
    const result = await db.query(
      'SELECT id, email, role, name FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    
    if (Array.isArray(result) && result.length > 0) {
      const user = result[0];
      // In production, verify bcrypt hash here
      // For demo, compare plain passwords
      const storedUser = mockUsers[email];
      if (storedUser && storedUser.password === password) {
        return {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        };
      }
    }
  } catch (error) {
    console.log('[v0] Database query failed, using mock data');
  }

  // Fall back to mock data
  const user = mockUsers[email];
  if (user && user.password === password) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
}

export async function registerUser(
  email: string,
  password: string,
  name: string,
  role: 'manager' | 'store_keeper'
): Promise<AuthUser | null> {
  try {
    // Check if user already exists
    const existing = mockUsers[email];
    if (existing) {
      return null; // User already exists
    }

    // Hash password (in production, use bcrypt properly)
    // For demo, storing plain password
    const newUser: AuthUser & { password: string } = {
      id: Date.now().toString(),
      email,
      password,
      role,
      name,
    };

    // Store in mock data (in production, store in database)
    mockUsers[email] = newUser;

    try {
      await db.query(
        'INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)',
        [email, password, name, role]
      );
    } catch (error) {
      console.log('[v0] Database insert failed, using mock storage');
    }

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  } catch (error) {
    console.error('[v0] Registration error:', error);
    return null;
  }
}

export function getUserFromSession(sessionData: string): AuthUser | null {
  try {
    const user = JSON.parse(Buffer.from(sessionData, 'base64').toString());
    return user;
  } catch {
    return null;
  }
}

export function createSession(user: AuthUser): string {
  return Buffer.from(JSON.stringify(user)).toString('base64');
}
