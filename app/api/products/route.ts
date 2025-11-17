import { NextRequest, NextResponse } from 'next/server';

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'Wheat',
    category: 'Grains',
    price: 250,
    quantity: 150,
    description: 'High quality wheat for industrial use',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Rice',
    category: 'Grains',
    price: 350,
    quantity: 200,
    description: 'Premium basmati rice',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Crude Oil',
    category: 'Energy',
    price: 85,
    quantity: 5000,
    description: 'Crude oil barrel',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Gold Bars',
    category: 'Metals',
    price: 65000,
    quantity: 50,
    description: 'Pure gold bars 999',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Coffee Beans',
    category: 'Agricultural',
    price: 450,
    quantity: 300,
    description: 'Arabica coffee beans from Colombia',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Cotton',
    category: 'Textiles',
    price: 1200,
    quantity: 100,
    description: 'Raw cotton fiber',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    return NextResponse.json(mockProducts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newProduct = {
      id: String(mockProducts.length + 1),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockProducts.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
