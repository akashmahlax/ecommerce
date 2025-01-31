import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const db = (await clientPromise).db();
    const products = await db.collection('products').find().toArray();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const db = (await clientPromise).db();
    const productData = await request.json();
    
    // Validate product data
    if (!productData.name || !productData.price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert new product
    const result = await db.collection('products').insertOne({
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(result.ops[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}