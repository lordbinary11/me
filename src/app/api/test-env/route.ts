import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    adminPasswordConfigured: !!process.env.ADMIN_PASSWORD,
    sessionTokenConfigured: !!process.env.ADMIN_SESSION_TOKEN,
    sessionTokenLength: process.env.ADMIN_SESSION_TOKEN?.length || 0,
  });
}
