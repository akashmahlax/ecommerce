import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request, { params }) {
  const { userId } = params;
  
  try {
    const db = (await clientPromise).db();
    const user = await db.collection('users').findOne({ clerkId: userId });
    
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { userId } = params;
  const data = await request.json();

  try {
    const db = (await clientPromise).db();
    const result = await db.collection('users').updateOne(
      { clerkId: userId },
      { $set: data },
      { upsert: true }
    );

    const updatedUser = await db.collection('users').findOne({ clerkId: userId });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user data' },
      { status: 500 }
    );
  }
}