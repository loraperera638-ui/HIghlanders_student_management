import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { AuthService } from '@/lib/auth';
import bcrypt from 'bcryptjs';

async function getAuthAdmin(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = AuthService.extractTokenFromHeaders(authHeader || undefined);
  if (!token) return null;
  const user = await AuthService.getUserFromToken(token);
  if (!user || user.role !== 'admin') return null;
  return user;
}

// GET /api/admin/credentials - Get admin email
export async function GET(request: NextRequest) {
  try {
    const admin = await getAuthAdmin(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      data: { 
        email: admin.email,
        password: admin.password
      }
    });
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/credentials - Update admin credentials
export async function POST(request: NextRequest) {
  try {
    const admin = await getAuthAdmin(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }

    const db = await getDatabase();

    const finalEmail = email.trim().toLowerCase();

    const { ObjectId } = await import('mongodb');

    // Check if new email is taken by another user
    const emailTaken = await db.collection('users').findOne({
      email: finalEmail,
      _id: { $ne: admin._id as any }
    });
    if (emailTaken) {
      return NextResponse.json({ success: false, error: 'This email is already in use by another account' }, { status: 400 });
    }

    await db.collection('users').updateOne(
      { _id: admin._id as any },
      { 
        $set: { 
          email: finalEmail,
          password: password,
          updatedAt: new Date()
        } 
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Admin credentials successfully updated'
    });
  } catch (error) {
    console.error('Error updating admin credentials:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
