import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { MemberRequest } from '@/types';

// GET /api/members - Get member requests (admin only)
export async function GET() {
  try {
    const db = await getDatabase();
    const memberRequests = await db.collection('memberRequests').find({}).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json({
      success: true,
      data: memberRequests,
    });
  } catch (error) {
    console.error('Error fetching member requests:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch member requests' },
      { status: 500 }
    );
  }
}

// POST /api/members - Submit member request
export async function POST(request: NextRequest) {
  try {
    const memberData: Omit<MemberRequest, '_id' | 'createdAt' | 'updatedAt' | 'status'> = await request.json();
    
    // Validate required fields
    if (!memberData.firstName || !memberData.lastName || !memberData.email || !memberData.phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const db = await getDatabase();
    const existingRequest = await db.collection('memberRequests').findOne({ email: memberData.email });
    if (existingRequest) {
      return NextResponse.json(
        { success: false, error: 'An application with this email already exists' },
        { status: 400 }
      );
    }

    const newMemberRequest = {
      ...memberData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('memberRequests').insertOne(newMemberRequest);
    
    return NextResponse.json({
      success: true,
      data: { ...newMemberRequest, _id: result.insertedId.toString() },
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error('Error submitting member request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
