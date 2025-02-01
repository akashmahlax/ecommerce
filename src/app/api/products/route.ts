import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { MongoClient } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const db = (await clientPromise).db();
    const products = await db.collection('products').find({}).toArray();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = (await clientPromise).db();
    const productData = await request.json();

    if (!productData.name || !productData.price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await db.collection('products').insertOne({
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const newProduct = await db.collection('products').findOne({ _id: result.insertedId });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/products:', error); // Capture error details
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
