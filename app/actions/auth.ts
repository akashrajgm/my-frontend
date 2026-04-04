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

        // MAKE SURE there is NO extra slash at the end of the URL or before /login
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
// Add this to the bottom of app/actions/auth.ts

export async function setupVendor(prevState: any, formData: FormData) {
    const businessName = formData.get('businessName')
    const gstNumber = formData.get('gstNumber')
    const location = formData.get('location')

    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('session_token')?.value

        if (!token) {
            return { error: "You must be logged in to establish a storefront." }
        }

        // Hit Tharun's Vendor Setup endpoint
        const res = await fetch('https://interior-marketplace-api.onrender.com/vendors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                business_name: String(businessName),
                gst_number: String(gstNumber),
                location: String(location)
            }),
        })

        const data = await res.json()

        if (!res.ok) {
            return { error: data.detail || "Failed to establish storefront." }
        }

        // Success! Redirect to the vendor dashboard
        redirect('/dashboard/my-listings')

    } catch (error: any) {
        if (error.message === 'NEXT_REDIRECT') throw error
        return { error: "The archive server is not responding. Please try again later." }
    }
}