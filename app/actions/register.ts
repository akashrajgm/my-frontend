'use server'

import { redirect } from 'next/navigation'

export type RegisterState = {
    error: string;
    success: boolean;
}

/**
 * INITIALIZE MEMBERSHIP
 * Sends the onboarding data to Tharun's FastAPI engine.
 */
export async function register(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
    const email = formData.get('email')
    const password = formData.get('password')
    const username = formData.get('username') // 1. Match the field name from RegisterPage.tsx

    try {
        const res = await fetch('https://interior-marketplace-api.onrender.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: String(username), // 2. MUST be 'username' for Tharun's API
                email: String(email),
                password: String(password)
            }),
        })

        const data = await res.json()

        if (!res.ok) {
            // Handle validation errors or existing user errors
            let msg = "Onboarding failed."
            if (data.detail) {
                // If FastAPI sends a list of errors, we grab the first one
                msg = typeof data.detail === 'string' ? data.detail : data.detail[0]?.msg
            }
            return { error: String(msg), success: false }
        }

        // 3. SUCCESS: The RegisterPage.tsx useEffect will see this and redirect to /login
        return { error: "", success: true }

    } catch (err) {
        console.error("Archive Connection Error:", err)
        return { error: "The Archive server is currently unreachable.", success: false }
    }
}