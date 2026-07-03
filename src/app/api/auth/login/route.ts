import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { getDatabase } from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

interface LoginRequest {
  email: string;
  password: string;
  role: 'admin' | 'student';
}

// Mock users for demonstration (in production, these would come from database)
const mockUsers = {
  admin: {
    email: 'admin@highlanders.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
  },
  student: {
    email: 'student@highlanders.com',
    password: 'password',
    name: 'Student User',
    role: 'student',
  },
};

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password, role } = body;

    // Debug logging
    console.log('Login attempt:', { email, role, passwordLength: password?.length });

    // Validation
    if (!email || !password || !role) {
      console.log('Validation failed:', { hasEmail: !!email, hasPassword: !!password, hasRole: !!role });
      return NextResponse.json(
        { success: false, error: 'Email, password, and role are required' },
        { status: 400 }
      );
    }

    // For demo purposes, use mock users with plain text comparison
    // In production, you would query your database and use bcrypt.compare()
    const mockUser = mockUsers[role];
    
    console.log('Mock user found:', !!mockUser, 'Email matches:', mockUser?.email === email);
    
    if (!mockUser || mockUser.email !== email) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // For demo, compare plain text passwords
    // In production, you would use: const isPasswordValid = await bcrypt.compare(password, mockUser.password);
    const isPasswordValid = password === mockUser.password;
    
    console.log('Password valid:', isPasswordValid, 'Expected:', mockUser.password, 'Got:', password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: mockUser.email,
        email: mockUser.email,
        role: mockUser.role,
        name: mockUser.name,
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '24h' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = mockUser;

    return NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
