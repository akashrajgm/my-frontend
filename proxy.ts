import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
    const token = request.cookies.get('session_token')?.value
    const { pathname } = request.nextUrl

    // Kill the backslash bug
    if (pathname.includes('%5C') || pathname.includes('\\')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const isAuth = pathname.startsWith('/login') || pathname.startsWith('/register')
    const isHome = pathname === '/'

    if (!token && !isAuth && !isHome) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && isAuth) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}