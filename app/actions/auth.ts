'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
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
        })

        const data = await res.json()

        if (!res.ok) {
            // If we get an error, we turn WHATEVER it is into a readable string
            console.log("Backend Error Raw:", data)

            let errorMessage = "Access Denied"
            if (data.detail) {
                if (typeof data.detail === 'string') {
                    errorMessage = data.detail
                } else if (Array.isArray(data.detail)) {
                    // This pulls the message out of Tharun's error objects
                    errorMessage = data.detail.map((err: any) => err.msg || "Invalid field").join(", ")
                }
            }
            return { error: String(errorMessage) }
        }

        if (data.access_token) {
            const cookieStore = await cookies()
            cookieStore.set('session_token', data.access_token, {
                httpOnly: true,
                path: '/',
                secure: true,
                maxAge: 60 * 60 * 24
            })
            success = true
        }
    } catch (err) {
        return { error: "Cannot reach the Studio Archive server." }
    }

    if (success) {
        redirect('/dashboard')
    }
}