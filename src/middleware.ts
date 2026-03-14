import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes - only allow access if authenticated
  if (pathname.startsWith('/admin') && pathname !== '/admin-21ed04066b135bdddc45a23e2bf2e061') {
    // Check for admin session cookie
    const adminSession = request.cookies.get('admin-session');
    
    if (!adminSession || adminSession.value !== process.env.ADMIN_SESSION_TOKEN) {
      // Return 404 instead of redirect - hide that admin exists
      return new NextResponse('Not Found', { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
