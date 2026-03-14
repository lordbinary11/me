import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logout successful'
  });

  // Clear the admin session cookie
  response.cookies.set('admin-session', '', {
    path: '/',
    maxAge: 0,
    secure: true,
    sameSite: 'strict'
  });

  return response;
}
