import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { Class } from '@/types';

// GET /api/classes - Get all classes
export async function GET() {
  try {
    const db = await getDatabase();
    const classes = await db.collection('classes').find({ isVisible: true }).toArray();
    
    return NextResponse.json({
      success: true,
      data: classes,
    });
  } catch (error) {
    console.error('Error fetching classes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch classes' },
      { status: 500 }
    );
  }
}

// POST /api/classes - Create a new class (admin only)
export async function POST(request: NextRequest) {
  try {
    const classData: Omit<Class, '_id' | 'createdAt' | 'updatedAt'> = await request.json();
    
    // Validate required fields
    if (!classData.name || !classData.schedule || !classData.ageCategory) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const newClass = {
      ...classData,
      currentEnrollment: 0,
      isVisible: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('classes').insertOne(newClass);
    
    return NextResponse.json({
      success: true,
      data: { ...newClass, _id: result.insertedId.toString() },
    });
  } catch (error) {
    console.error('Error creating class:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create class' },
      { status: 500 }
    );
  }
}
