import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // 1. Grab the session token from the user's cookies
    const token = request.cookies.get('session_token')?.value
    const { pathname } = request.nextUrl

    // 2. Define which routes need protection
    const isPrivatePage = pathname.startsWith('/dashboard') || pathname.startsWith('/vendor/setup')

    // 3. The "Bouncer" Logic: 
    // If they try to enter a private room without a ticket (token), kick them to Login.
    if (isPrivatePage && !token) {
        const loginUrl = new URL('/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

// 4. The Matcher: Only run this code for these specific paths to save performance
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/vendor/setup'
    ],
}