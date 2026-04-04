'use server'

import { cookies } from 'next/headers'

export async function createPaymentOrder(amount: number) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('session_token')?.value

        if (!token) return { error: "Authentication required for purchase." }

        // MISSION PAY-2: This hits Tharun's backend
        const res = await fetch('https://interior-marketplace-api.onrender.com/payments/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount: amount * 100 }) // Razorpay expects paise (cents)
        })

        if (!res.ok) throw new Error("Payment server unreachable")

        return await res.json()

    } catch (error) {
        // MOCK DATA for local testing
        return {
            id: "order_mock_" + Math.random().toString(36).substring(7),
            amount: amount * 100,
            currency: "INR",
            success: true
        }
    }
}