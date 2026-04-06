'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// 1. Updated State type to include the token for the Client-side bridge
export type AuthState = {
    error: string;
    token?: string;
}

/**
 * AUTHORIZE SESSION
 * Handles the secure login handshake with the FastAPI backend.
 */
export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const email = formData.get('email')
    const password = formData.get('password')

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

        // SUCCESS HANDSHAKE
        if (data.access_token) {
            // A. Server-Side Security (Cookie)
            const cookieStore = await cookies()
            cookieStore.set('session_token', data.access_token, {
                httpOnly: true,
                path: '/',
                secure: true, // Required for Vercel HTTPS
                sameSite: 'lax',
                maxAge: 60 * 60 * 24
            })

            /**
             * B. Client-Side Bridge
             * We return the token in the state so the Login Page can save it to 
             * LocalStorage before the redirect happens.
             */
            return { error: "", token: data.access_token }
        }
    } catch (err) {
        console.error("Auth Exception:", err)
        return { error: "Studio Archive server is unreachable." }
    }

    return { error: "Authentication failed. Token not received." }
}

/**
 * ESTABLISH VENDOR STOREFRONT
 * Connects the user profile to the Professional Vendor tier.
 */
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
        // If it's a redirect, we must throw it so Next.js handles it
        if (error.message === 'NEXT_REDIRECT') throw error
        return { error: "The archive server is not responding. Please try again later." }
    }
}