'use server'

import { cookies } from 'next/headers'

export async function getOrders() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('session_token')?.value

        const res = await fetch('https://interior-marketplace-api.onrender.com/orders/my-orders', {
            headers: { 'Authorization': `Bearer ${token}` }
        })

        if (!res.ok) throw new Error("Orders unreachable")
        return await res.json()

    } catch (error) {
        // MOCK DATA for Buyer Dashboard
        return [
            { id: "ORD-9921", status: "Paid", total: 4500, date: "2026-04-05", items: ["Eames Lounge"] },
            { id: "ORD-9810", status: "Shipped", total: 1200, date: "2026-04-01", items: ["Noguchi Table"] }
        ]
    }
}