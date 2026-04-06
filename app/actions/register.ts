'use server'

import { redirect } from 'next/navigation'

export type RegisterState = {
    error: string;
    success: boolean;
}

export async function register(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
    const email = formData.get('email')
    const password = formData.get('password')
    const username = formData.get('username') // Changed from fullName to match Tharun's Swagger

    try {
        const res = await fetch('https://interior-marketplace-api.onrender.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: String(email),
                password: String(password),
                username: String(username) // Matches Tharun's UserCreate schema
            }),
        })

        const data = await res.json()

        if (!res.ok) {
            let msg = "Registration failed."
            if (data.detail) {
                msg = typeof data.detail === 'string' ? data.detail : data.detail[0]?.msg
            }
            return { error: String(msg), success: false }
        }

        return { error: "", success: true }

    } catch (err) {
        return { error: "Studio Archive server unreachable.", success: false }
    }
}