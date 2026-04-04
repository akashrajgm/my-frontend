'use server'

import { redirect } from 'next/navigation'

export type RegisterState = {
    error: string;
    success: boolean;
}

export async function register(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
    const email = formData.get('email')
    const password = formData.get('password')
    const fullName = formData.get('fullName')

    try {
        const res = await fetch('https://interior-marketplace-api.onrender.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: String(email),
                password: String(password),
                full_name: String(fullName) // MUST be snake_case for Tharun's FastAPI
            }),
        })

        const data = await res.json()

        if (!res.ok) {
            // Clean up the error message from the backend
            let msg = "Registration failed."
            if (data.detail) {
                msg = typeof data.detail === 'string' ? data.detail : data.detail[0]?.msg
            }
            return { error: String(msg), success: false }
        }

        // Success! We don't redirect here so the user can see the success message
        return { error: "", success: true }

    } catch (err) {
        console.error("Registration Error:", err)
        return { error: "Studio Archive server is unreachable.", success: false }
    }
}