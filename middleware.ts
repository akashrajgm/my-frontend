import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('session_token')?.value
    const { pathname } = request.nextUrl

    // A. YOUR ORIGINAL "BACKSLASH BUG" FIX (KEEPING THIS SAFE)
    if (pathname.includes('%5C') || pathname.includes('\\')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register')
    const isHomePage = pathname === '/'

    // B. AUTH LOGIC (MERGED)
    // If no token and not on Home/Auth pages, kick to Login
    if (!token && !isAuthPage && !isHomePage) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // If logged in and trying to go to Login/Register, send to Dashboard
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

// C. YOUR ORIGINAL MATCHER (KEEPING THIS AS IS)
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}