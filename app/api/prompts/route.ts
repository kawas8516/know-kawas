import { getAllPrompts } from '@/lib/content';
import { NextResponse } from 'next/server';

export async function GET() {
  const prompts = getAllPrompts();
  return NextResponse.json(prompts);
}
