'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache' // FIXED: Added this import

// 1. FETCH ALL PRODUCTS (Landing Page Grid)
export async function getProducts() {
    try {
        const res = await fetch('https://interior-marketplace-api.onrender.com/products', {
            method: 'GET',
            next: { revalidate: 60 }, // ISR: Refresh data every 60 seconds
        })

        if (!res.ok) return []

        const data = await res.json()
        return Array.isArray(data) ? data : []
    } catch (error) {
        console.error("Marketplace Fetch Error:", error)
        return []
    }
}

// 2. CREATE A PRODUCT (Vendor Onboarding Form)
export async function createProduct(prevState: any, formData: FormData) {
    const name = formData.get('name')
    const description = formData.get('description')
    const price = formData.get('price')
    const category = formData.get('category')
    const imageUrl = formData.get('imageUrl')

    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('session_token')?.value

        if (!token) return { error: "Session expired. Please login again.", success: false }

        const res = await fetch('https://interior-marketplace-api.onrender.com/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
            const msg = typeof data.detail === 'string' ? data.detail : data.detail[0]?.msg
            return { error: String(msg), success: false }
        }

        // Refresh the lists so the new item shows up
        revalidatePath('/')
        revalidatePath('/dashboard/my-listings')

        return { success: true, error: "" }
    } catch (err) {
        return { error: "Failed to connect to the archive server.", success: false }
    }
}

// 3. GET SINGLE PRODUCT (Editorial Details Page)
export async function getProductById(id: string) {
    try {
        const res = await fetch(`https://interior-marketplace-api.onrender.com/products/${id}`)
        if (!res.ok) return null
        return await res.json()
    } catch (error) {
        console.error("Detail Fetch Error:", error)
        return null
    }
}

// 4. GET VENDOR PRODUCTS (Merchant Dashboard Table)
export async function getMyProducts() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('session_token')?.value

        if (!token) return []

        const res = await fetch('https://interior-marketplace-api.onrender.com/products/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        })

        if (!res.ok) return []

        const data = await res.json()
        return Array.isArray(data) ? data : []
    } catch (error) {
        return []
    }
}

// 5. PERMANENT DELETE (Merchant Dashboard Action)
export async function deleteProduct(productId: string) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('session_token')?.value

        if (!token) return { error: "Authentication required." }

        // Note: Using 'items' endpoint as per your backend structure for deletion
        const res = await fetch(`https://interior-marketplace-api.onrender.com/items/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (!res.ok) {
            const data = await res.json()
            return { error: data.detail || "Deletion failed on server.", success: false }
        }

        // FIXED: This now works because of the import at the top
        revalidatePath('/dashboard/my-listings')
        revalidatePath('/')

        return { success: true }
    } catch (error) {
        console.error("Delete Action Error:", error)
        return { error: "Archive server communication failed.", success: false }
    }
}