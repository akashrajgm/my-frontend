'use server'

import { cookies } from 'next/headers'

// 1. FETCH ALL PRODUCTS (For the Landing Page Grid)
export async function getProducts() {
    try {
        const res = await fetch('https://interior-marketplace-api.onrender.com/products', {
            method: 'GET',
            next: { revalidate: 60 }, // Refresh data every minute
        })

        if (!res.ok) return []

        const data = await res.json()
        // Return the list of products or an empty array if none exist
        return Array.isArray(data) ? data : []
    } catch (error) {
        console.error("Marketplace Fetch Error:", error)
        return []
    }
}

// 2. CREATE A PRODUCT (For the 'Add Product' Form)
export async function createProduct(prevState: any, formData: FormData) {
    const name = formData.get('name')
    const description = formData.get('description')
    const price = formData.get('price')
    const category = formData.get('category')
    const imageUrl = formData.get('imageUrl')

    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('session_token')?.value

        if (!token) return { error: "Session expired. Please login again." }

        const res = await fetch('https://interior-marketplace-api.onrender.com/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // The Auth Handshake
            },
            body: JSON.stringify({
                name: String(name),
                description: String(description),
                price: Number(price),
                category: String(category),
                image_url: String(imageUrl)
            }),
        })

        const data = await res.json()

        if (!res.ok) {
            // Clean up the backend error for the UI
            const msg = typeof data.detail === 'string' ? data.detail : data.detail[0]?.msg
            return { error: String(msg), success: false }
        }

        return { success: true, error: "" }
    } catch (err) {
        return { error: "Failed to connect to the archive server.", success: false }
    }
}
// Add to bottom of app/actions/products.ts

// 3. GET SINGLE PRODUCT (For Details Page)
export async function getProductById(id: string) {
    try {
        const res = await fetch(`https://interior-marketplace-api.onrender.com/products/${id}`)
        if (!res.ok) return null
        return await res.json()
    } catch (error) {
        return null
    }
}

// 4. GET VENDOR PRODUCTS (For "My Listings" Table)
export async function getMyProducts() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('session_token')?.value

        const res = await fetch('https://interior-marketplace-api.onrender.com/products/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        return Array.isArray(data) ? data : []
    } catch (error) {
        return []
    }
}