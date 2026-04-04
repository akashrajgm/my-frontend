'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// 1. Explicitly define the state type for TypeScript
export type AuthState = {
    error: string;
}

export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const email = formData.get('email')
    const password = formData.get('password')
    let success = false

    try {
        // Tharun's FastAPI expects 'username' and 'password' as Form Data
        const params = new URLSearchParams()
        params.append('username', String(email))
        params.append('password', String(password))

        const res = await fetch('https://interior-marketplace-api.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params,
            cache: 'no-store'
        })

        const data = await res.json()

        if (!res.ok) {
            let errorMessage = "Access Denied."
            if (data.detail) {
                errorMessage = typeof data.detail === 'string'
                    ? data.detail
                    : data.detail.map((err: any) => err.msg).join(", ")
            }
            return { error: String(errorMessage) }
        }

        if (data.access_token) {
            const cookieStore = await cookies()
            cookieStore.set('session_token', data.access_token, {
                httpOnly: true,
                path: '/',
                secure: true, // Required for Vercel (HTTPS)
                sameSite: 'lax',
                maxAge: 60 * 60 * 24
            })
            success = true
        }
    } catch (err) {
        // If the error isn't a redirect, it's a network issue
        console.error("Auth Exception:", err)
        return { error: "Studio Archive server is unreachable." }
    }

    // 2. Redirect MUST happen outside the try/catch
    if (success) {
        redirect('/dashboard')
    }

    return { error: "" }
}