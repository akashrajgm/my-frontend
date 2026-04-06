'use server'

import { cookies } from 'next/headers'

export async function syncCartWithBackend(productId: number, quantity: number = 1) {
    try {
        const cookieStore = await cookies()
        // 1. Grab the "ID Badge" from the secure cookie we created during Login
        const token = cookieStore.get('session_token')?.value

        if (!token) {
            console.error("No token found. User must be logged in to sync cart.");
            return { success: false, error: "Authentication required" };
        }

        const baseUrl = 'https://interior-marketplace-api.onrender.com';

        // 2. The Handshake
        const response = await fetch(`${baseUrl}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // THARUN'S REQUIREMENT #1
            },
            body: JSON.stringify({
                product_id: productId, // THARUN'S REQUIREMENT #2
                quantity: quantity
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to sync cart');
        }

        return { success: true };
    } catch (error: any) {
        console.error("Cart Sync Error:", error.message);
        return { success: false, error: error.message };
    }
}