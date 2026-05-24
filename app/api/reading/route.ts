import { getAllReading } from '@/lib/content';
import { NextResponse } from 'next/server';

export async function GET() {
  const reading = getAllReading();
  return NextResponse.json(reading);
}
